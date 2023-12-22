# Metrics & Monitoring

The router offers built-in support for [Prometheus](https://prometheus.io/). Data is exposed at `http://127.0.0.1:8088/metrics`. We export the default Go and Process metrics. In addition, we export [(R.E.D)](https://thenewstack.io/monitoring-microservices-red-method/) metrics related to incoming GraphQL traffic:

* **`router_http_requests_total`**: Total count of incoming requests
* **`router_http_response_content_length_total`**: Total bytes of incoming requests
* **`router_http_request_content_length_total`**: Total bytes of outgoing responses
* **`router_http_request_duration_milliseconds`**: End-to-end duration of incoming requests in (histogram)
* **`router_http_requests_in_flight_count`**: Number of in-flight requests

All metrics are tracked along the following dimensions:

* **`wg_operation_name`**: The name of the operation
* **`wg_operation_type`**: The type of the operation e.g. `query`
* **`wg_federated_graph_name`**: The name of the running graph
* **`wg_operation_protocol`**: The used protocol `ws`, `sse` ,`sse-post` or `http`
* **`wg_router_version`**: The current router binary version
* **`wg_router_config_version`**: The current router config version
* **`http_status_code`**: The status code of the request
* **`wg_client_name`**: The client name
* **`wg_client_version`**: The client version
* **`wg_request_error`**: Identify if an error occurred. This applies to a request that didn't result in a successful response. Only set when it is `true`.

### Exclude certain metrics and labels

Sometimes it is useful to have the flexibility to exclude specific metrics or labels to reduce the load "cardinality" of your metrics server. You can do this easily by excluding them in the router config. We support a Go Regex string. You can test your Regex at [https://regex101.com/](https://regex101.com/).

```yaml
# config.yaml

telemetry:
  # OpenTelemetry Metrics
  metrics:
    # Expose OpenTelemetry metrics as Prometheus metrics
    prometheus:
      exclude_metrics:
        - "^router_http_requests_in_flight" # Without _count _total suffix
      exclude_metric_labels:
        - "^wg_client_version$"
```

This excludes `router_http_requests_in_flight_count` metric and the label `wg_client_version` from all metrics.

{% hint style="info" %}
Default process and Go metrics can't be excluded. If you haven't run a query against the router yet, you'll see no `router_*` metrics because no metrics have been generated.
{% endhint %}

### Summary

By collecting the metrics, you can find answers to the following questions:

* What is the error/success rate of my router or a specific operation?
* How is the performance of my router or a specific operation?
* What is the average request/response size of a specific operation?
* How much traffic went through a router instance?
* What's the distribution of Queries / Mutations and Subscription requests?

## Make metrics accessible on all networks

In container environments, it is necessary to expose your server on `0.0.0.0` to make the port accessible from outside.You can enable it by setting the following configuration.

```yaml
telemetry:
  metrics:
    prometheus:
      listen_addr: "0.0.0.0:8088"
```

Alternatively, you can use the environment variable.

```
PROMETHEUS_LISTEN_ADDR: 0.0.0.0:8088
```
