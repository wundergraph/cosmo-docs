# Automatic Persisted Queries (APQ)

## Understanding APQ

**Automatic Persisted Queries (APQ)** is a feature that enables the GraphQL router to automatically store queries it receives in a persisted format, allowing clients to resubmit these queries by simply referencing their hash. This can significantly reduce payload size, especially in cases where the same query is repeatedly sent.&#x20;

When a client sends a query, APQ stores it using a hash-based identifier. Future requests (even from different graphql clients) can then retrieve and execute the query using this hash, even through a GET operation, which is highly efficient for caching, especially over a Content Delivery Network (CDN).

## Setting up APQ

To enable APQ, ensure that the `automatic_persisted_queries` configuration section is defined in the GraphQL router configuration file. This setup supports both in-memory caching and Redis-based storage for persisted queries.

### Using Local Cache

The local cache allows the APQ feature to store queries directly within the router's in-memory cache. This approach is simple and fast, although it does not support persistence across router restarts. The local cache is recommended for smaller applications or testing environments where query persistence across server sessions is not critical.

<pre class="language-yaml" data-title="config.yaml"><code class="lang-yaml"># Example Configuration
<strong>automatic_persisted_queries:
</strong>  enabled: true
  cache:
    size: 10MB # Set the maximum size of the local cache in megabytes
    ttl: 900 # Time-to-live for each cached query, in seconds (15 minutes)
</code></pre>

### Using Redis Cache

For persistent query storage across server restarts, you can configure Redis as the storage provider. Redis allows queries to be stored with the specified TTL, and they remain available even if the router restarts, making this setup ideal for production environments.

{% code title="config.yaml" %}
```yaml
# Example Configuration
automatic_persisted_queries:
  enabled: true
  storage:
    provider_id: "my_redis"
    object_prefix: cosmo_apq 
# Every KV write will be in the form (object_prefix+cache_hache -> operation)
  cache:
    ttl: 900

storage_providers:
  redis:
    - id: "my_redis"
      cluster_enabled: false # Set to true to use a Redis Cluster
      urls: 
       - "redis://localhost:6379"
```
{% endcode %}

{% hint style="warning" %}
Prior to [router@v0.169.0](https://github.com/wundergraph/cosmo/releases/tag/router%400.168.1), the redis configuration looks like:

```
  redis:
    - id: "my_redis"
      url: "redis://localhost:6379"
```
{% endhint %}





## Testing APQ

To test APQ, you can run the following steps (using the built in `__typename` query)

First, ensure that this query fails first (because the query itself isn't persisted, and isn't recognized yet by the router)

{% code overflow="wrap" lineNumbers="true" %}
```bash
curl --get http://localhost:3002/graphql \
  --header 'content-type: application/json' \
  --data-urlencode 'extensions={"persistedQuery":{"version":1,"sha256Hash":"ecf4edb46db40b5132295c0291d62fb65d6759a9eedfa4d5d612dd5ec54a6b38"}}'
```
{% endcode %}

Then, send a follow up request that has both the query string, as well as the hash, in the form:

{% code overflow="wrap" lineNumbers="true" %}
```bash
curl --get http://localhost:3002/graphql \
  --header 'content-type: application/json' \
  --data-urlencode 'query={__typename}' \
  --data-urlencode 'extensions={"persistedQuery":{"version":1,"sha256Hash":"ecf4edb46db40b5132295c0291d62fb65d6759a9eedfa4d5d612dd5ec54a6b38"}}'
```
{% endcode %}

This time, the server persists the query string, and then responds with the result we'd expect to see:

```json
{
  "data": {
    "__typename": "Query"
  }
}
```

Finally, you can send the same query that we tried before, and you should be able to get the persisted query result

{% code overflow="wrap" lineNumbers="true" %}
```bash
curl --get http://localhost:3002/graphql \
  --header 'content-type: application/json' \
  --data-urlencode 'extensions={"persistedQuery":{"version":1,"sha256Hash":"ecf4edb46db40b5132295c0291d62fb65d6759a9eedfa4d5d612dd5ec54a6b38"}}'
```
{% endcode %}





