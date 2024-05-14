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

The development mode enabled certain configuration for a better developer experience. Beside pretty logs it enables [ART](../advanced-request-tracing-art.md) for local development. ART can expose sensitive information and should never be used in a production environment without Cosmo Studio.

By default the development mode disabled. The following configuration should be applied:

{% code title="router.yaml" %}
```yaml
dev_mode: false
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

The router can protect your subgraphs from overloading by implementing a [GCRA](https://en.wikipedia.org/wiki/Generic\_cell\_rate\_algorithm) (leaky bucket) rate limiter based on Redis. We encourage everyone to use it unless you already have protection in place. The exact limits depend on your usage pattern.

By default rate limiting is disabled. The following configuration should be applied:

{% code title="router.yaml" %}
```yaml
rate_limit:
  enabled: true
  storage:
    url: redis://localhost:6379
    key_prefix: cosmo_rate_limit
  simple_strategy:
    rate: 100
    burst: 200
    period: 1s
```
{% endcode %}

## Configure CORS

If you did not have an intermediate proxy in between that takes care about CORS requests, we recommend to only allow the origins that you trust.

By default all origins are allowed. The following configuration should be applied

{% code title="router.yaml" %}
```yaml
cors:
    allow_origins:
      - "your-origin.com"
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

Persistent operations are a great way to save bandwidth but also to reduce the attack vectors because only known queries can be executed from the clients.&#x20;

By default, both persistent queries and regular queries are allowed. To allow only persistent queries, the following configuration should be applied:

{% code title="router.yaml" %}
```yaml
security:
  block_non_persisted_operations: true
```
{% endcode %}

## Disable Subscriptions / Mutation if not used

Ideally, you should never expose more than necessary. Sometimes this is unavoidable or you want to enforce it for security reasons. In that case, you can disable subscriptions or mutation to avoid any surprises.

{% code title="router.yaml" %}
```yaml
security:
  block_subscriptions: true
  block_mutations: true
```
{% endcode %}

## Log Level

When deploying GraphQL services in production, it's crucial to manage logging effectively to balance between capturing essential information and minimizing performance overhead and storage consumption. For those reasons, we recommend to use the log level `ERROR` in production.

By default the level is **INFO**. The following configuration should be applied

{% code title="router.yaml" %}
```yaml
log_level: "ERROR"
```
{% endcode %}
