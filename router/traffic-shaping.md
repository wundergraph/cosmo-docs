---
description: >-
  Take Control of Router Traffic Management to increase reliability between the
  client and router and between the router and subgraphs.
---

# Traffic shaping

## Automatic Retry

By default, the router retries GraphQL operation of type `Query` on specific network errors and HTTP status codes (502, 503, 504, 429). We don't retry after the body is consumed. The default retry strategy is `Backoff and Jitter`. You can read more about our default retry strategy on the [AWS Architecture Blog](https://aws.amazon.com/de/blogs/architecture/exponential-backoff-and-jitter/).

```yaml
# config.yaml

# See https://cosmo-docs.wundergraph.com/router/configuration#config-file
# for the full list of configuration options.

traffic_shaping:
  all: # Rules are applied to all subgraph requests.
    retry: # Rule is only applied to GraphQL operations of type "query"
      enabled: true
      algorithm: "backoff_jitter"
      max_attempts: 5
      interval: 3s
      max_duration: 10s
```

* `enabled`: Enables the retry mechanism for GraphQL query operations.
* `algorithm`: Select the algorithm for the retry. Currently, only `backoff_jitter` is supported. Additional fields depend on the algorithm selection:
* &#x20;**backoff\_jitter**
  * `max_attempts`: The maximum number of attempts before the operation is considered a failure.
  * `interval`: The time duration between each retry attempt. Increase with every retry.
  * `max_duration`: The maximum allowable duration between retries (random).

## Subgraph timeouts

Although the router comes with good defaults, you can change the timeouts according to your needs. For example, if you need to operate with very slow upstream services, you can increase `request_timeout`, which defines the maximum amount of time a request can take. Zero means no limit.

```yaml
traffic_shaping:
  # Rules are applied to all subgraph requests.
  all:
    # Subgraph transport options
    request_timeout: 60s
    dial_timeout: 30s
    keep_alive_idle_timeout: 0s 
    keep_alive_probe_interval: 30s
    tls_handshake_timeout: 10s
    response_header_timeout: 0s
    expect_continue_timeout: 0s
```

* `request_timeout`: The maximum amount of time a request can take. The timeout includes connection time, any redirects, and reading the response body.
* `dial_timeout`: The maximum amount of time a dial will wait for a connect to complete
* `keep_alive_idle_timeout`: The maximum amount of time an idle (keep-alive) connection will remain idle before closing itself.
* `keep_alive_probe_interval`: Specifies the interval between keep-alive probes for an active network connection.
* `tls_handshake_timeout`: Specifies the maximum amount of time waiting to wait for a TLS handshake.
* `response_header_timeout`: If non-zero, specifies the amount of time to wait for a server's response headers after fully writing the request (including its body, if any).
* `expect_continue_timeout`: If non-zero, specifies the amount of time to wait for a server's first response headers after fully writing the request headers if the request has an "Expect: 100-continue" header.

### Debugging

You can see the attempts by enabling [debug](development/debugging.md#debug-log-level) mode.

{% hint style="warning" %}
Mutations won't be retried because they aren't idempotent.
{% endhint %}
