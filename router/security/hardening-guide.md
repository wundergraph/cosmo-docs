# Hardening Guide

The router is a complex component with many levels of customization. Understanding the correct production configuration can be quite overwhelming. This guide provides tips on avoiding the most common pitfalls. For a complete and certified review, please seek consultancy.

## Disable Introspection

GraphQL introspection is a powerful feature that allows clients to query a GraphQL server for information about the schema itself, including details about types, queries, mutations, and the overall structure of the API. However, in a production environment, this feature is often not used and poses a potential security risk, as it exposes your API schema to the public. Disabling introspection is recommended to enhance security.

By default introspection is enabled. The following configuration should be applied:

{% code title="router.yaml" %}
```yaml
introspection_enabled: false
```
{% endcode %}

## Disable Development Mode

The development mode enables certain configuration for a better developer experience. Beside pretty logs it enables [ART](../advanced-request-tracing-art.md) for local development. ART can expose sensitive information and should never be used in a production environment without Cosmo Studio.

By default the development mode is disabled. The following configuration should be applied:

{% code title="router.yaml" %}
```yaml
dev_mode: false
```
{% endcode %}

## Disable File Uploads

The router implements the spec [https://github.com/jaydenseric/graphql-multipart-request-spec](https://github.com/jaydenseric/graphql-multipart-request-spec), that defines an interoperable multipart form field structure for GraphQL requests. Due to the nature of file uploads, unnecessary pressure may be placed on the router.

By default file uploads are enabled. The following configuration should be applied:

{% code title="router.yaml" %}
```yaml
file_upload:
    enabled: false
```
{% endcode %}

## Enable Config Signing

The router configuration contains rules and settings for how your supergraph is executed. You can either allow the router to poll the configuration automatically or deploy the configuration with each router deployment. In both cases, you must trust the origin that provides the configuration. To prevent configuration tampering, we have implemented a feature called [Config-Signing](config-validation-and-signing.md).

By default every unsigned config can be used. The following configuration should be applied after signing has been activated.

{% code title="router.yaml" %}
```yaml
graph: 
  sign_key: 'sign_key' # or GRAPH_CONFIG_SIGN_KEY 
```
{% endcode %}

## Enable Rate Limiting

The router can protect your subgraphs from overloading by implementing a [GCRA](https://en.wikipedia.org/wiki/Generic_cell_rate_algorithm) (leaky bucket) rate limiter based on Redis. We encourage everyone to use it unless you already have protection in place. Before applying it to production, please test it thoroughly. We recommend setting higher limits initially to avoid any interruptions.

By default rate limiting is disabled. The following configuration should be applied:

{% code title="router.yaml" %}
```yaml
rate_limit:
  enabled: true
  storage:
    cluster_enabled: false # set to true to use a Redis Cluster
    urls: 
     - redis://localhost:6379
    key_prefix: cosmo_rate_limit
  simple_strategy:
    rate: 100
    burst: 200
    period: 1s
```
{% endcode %}

{% hint style="warning" %}
Prior to [router@0.169.0](https://github.com/wundergraph/cosmo/releases/tag/router%400.168.1), the redis configuration looks like:

```
rate_limit:
   storage:
    url: redis://localhost:6379
    key_prefix: cosmo_rate_limit
```
{% endhint %}

## Configure CORS

If you don't have an intermediate proxy handling CORS requests, we recommend allowing only the origins you trust. This also applies to headers and methods.

By default all origins are allowed. The following configuration should be applied

{% code title="router.yaml" %}
```yaml
cors: 
  allow_methods:
    - "POST"
    - "GET"
  allow_origins:
    - "mydomain.com"
    - "*.mydomain.com:*/api"    
  allow_headers:
    - "Authorization"
  max_age: 5m
  allow_credentials: true
```
{% endcode %}

## Configure subgraph overrides

If your router operates in the same network as your subgraphs, we recommend overwriting the URLs in the router configuration to avoid unnecessary roundtrips and potential attack vectors.

By default the subgraph routing URL from the [wgc subgraph create](../../cli/subgraph/create.md) is used. The subgraph name needs to match wih the name from the command. The following configuration should be applied:

{% code title="router.yaml" %}
```yaml
override_routing_url:
  subgraphs:
    "subgraph1": "http://localhost:8000"
```
{% endcode %}

## Leverage persistent operations

[Persistent operations](../persisted-operations.md) are a great way to save bandwidth but also to reduce the attack vectors by only allowing known queries to be executed.

By default, both persistent queries and regular queries are allowed. To allow only persistent queries, the following configuration should be applied:

{% code title="router.yaml" %}
```yaml
security:
  block_non_persisted_operations:
    enabled: true
```
{% endcode %}

We recommend reviewing the [persisted-operations.md](../persisted-operations.md "mention") page to learn more about the different levels of security you can enforce.

## Disable Subscriptions / Mutation if not used

Ideally, you should never expose more than necessary. Sometimes this is unavoidable or you want to enforce it for security reasons. In that case, you can disable subscriptions or mutation to avoid any surprises.

{% code title="router.yaml" %}
```yaml
security:
  block_subscriptions:
    enabled: true
  block_mutations:
    enabled: true
```
{% endcode %}

## Enable TLS and HTTP/2

To ensure a secure connection between your load balancer and router, you can enable [TLS](tls.md). When TLS is configured and your load balancer supports HTTP/2, all requests are upgraded. This enables all the benefits of the protocol, such as multiplexing.

By default TLS is not used. The following configuration should be applied:

{% code title="router.yaml" %}
```yaml
tls:
  server:
    enabled: true
    key_file: ../your/key.pem
    cert_file: ../your/cert.pem
```
{% endcode %}

## Log Level

When deploying GraphQL services in production, it's crucial to manage logging effectively to balance between capturing essential information and minimizing performance overhead and storage consumption. For those reasons, we recommend to use the log level `ERROR` in production.

By default the level is **INFO**. The following configuration should be applied

{% code title="router.yaml" %}
```yaml
log_level: "error"
```
{% endcode %}
