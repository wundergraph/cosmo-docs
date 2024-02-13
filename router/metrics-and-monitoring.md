# Metrics & Monitoring

The router offers built-in support for [OTEL](https://opentelemetry.io/) and [Prometheus](https://prometheus.io/). OTEL data is exported through exporters. For reference please take a look at the [OpenTelemetry](metrics-and-monitoring.md#open-telemetry) section.

In both configurations, we export [(R.E.D)](https://thenewstack.io/monitoring-microservices-red-method/) metrics related to incoming GraphQL traffic.

## Open Telemetry (OTEL) & Prometheus

OTEL metrics are the foundation for both the OTEL and Prometheus metric storage models. Internally, we track metrics using the OTEL instrumentation library and export them via a Prometheus exporter. This process converts the metrics to be compatible with both formats. As a result, we aim to expose the same metrics consistently across both models, with a few exceptions:

* We do not expose [asynchronous instruments](metrics-and-monitoring.md#asynchronous-instruments) through Prometheus. This decision is pending further feedback collection.
* In Prometheus, metrics are formatted in snake\_case and conclude with specific suffixes.

### Metrics

He is a summary of all metrics we collect. By default the router exports metrics periodically every 15 seconds.

#### Synchronous instruments

We collect the following metrics to get useful insights in the HTTP traffic.

* **`router.http.requests`**: Total count of incoming requests
* **`router.http.response.content_length`**: Total bytes of incoming requests
* **`router.http.request.content_length`**: Total bytes of outgoing responses
* **`router.http.request.duration_milliseconds`**: End-to-end duration of incoming requests in (histogram)
* **`router.http.requests.in_flight.count`**: Number of in-flight requests. (Only static and subgraph dimensions are attached)

#### Asynchronous instruments

We collect the following metrics to get useful insights of the router runtime behavior.

* **`runtime.uptime`**: Seconds since application was initialized
* **`process.cpu.usage`**: Total CPU usage of this process in percentage of host total CPU capacity
* **`process.runtime.go.mem.heap_alloc`**: Bytes of allocated heap objects
* **`process.runtime.go.mem.heap_idle`**: Bytes in idle (unused) spans
* **`process.runtime.go.mem.heap_inuse`**: Bytes in in-use spans
* **`process.runtime.go.mem.heap_objects`**: Number of allocated heap objects
* **`process.runtime.go.mem.heap_released`**: Bytes of idle spans whose physical memory has been returned to the OS
* **process.runtime.go.mem.heap\_sys**: Bytes of heap memory obtained from the OS
* **`process.runtime.go.mem.live_objects`**: Number of live objects is the number of cumulative Mallocs - Frees
* **`process.runtime.go.gc.count`**: Number of completed garbage collection cycles
* **`process.runtime.go.goroutines.count`**: Number of goroutines that currently exist
* **`process.runtime.go.info`**: Information about the Go runtime environment e.g. Go version

If you don't need runtime metrics, you can disable them in the config:

{% code title="config.yaml" %}
```yaml
telemetry:
  metrics:
    router_runtime: false
```
{% endcode %}

### Dimensions

All metrics are tracked along the following dimensions:

#### Static (Known before Router start):

* **`wg.federated_graph.id`**: The ID of the running graph
* **`wg.router.version`**: The current router binary version
* **`wg.router.config.version`**: The current router config version

#### Request/Response based:

* **`wg.operation.protocol`**: The used protocol `http` , `ws`
* **`wg.operation.name`**: The name of the operation
* **`wg.operation.type`**: The type of the operation e.g. `query`
* **`http.status_code`**: The status code of the request
* **`wg.client.name`**: The client name
* **`wg.client.version`**: The client version
* **`wg.request_error`**: Identify if an error occurred. This applies to a request that didn't result in a successful response. Only set when it is `true`. Be aware that a Status-Code `200` can still be an error in GraphQL.

#### Subgraph Request/ Response:

* **`wg.subgraph.name`**: The name of the subgraph
* **`wg.subgraph.id`**: The ID of the subgraph

### Resource attributes

In OTEL, resource attributes are special attributes, identifying metrics based on resource characteristics. Although stored differently, they affect metric cardinality. In Prometheus, this data is labeled on the `target_info` metric.

* **`service.name`**: The name of the router. Can be configured through the `telemetry.service_name` option.
* **`service.version`**: The version of the router binary.
* **`service.instance.id`**: The unique instance ID of the router. Can be configured through the `instance_id`option.
* **`process.pid`**: The id of the running process
* **`host.name`**: The hostname of the machine where the router is running.
* **`telemetry.sdk.version`**: The version of instrumentation library.
* **`telemetry.sdk.language`**: The programming language of the instrumented application.

Few attributes can configured through the route configuration:

{% code title="config.yaml" %}
```yaml
instance_id: my_replica_1 # Unique instance ID e.g. replica-1
cluster:
  name: us-central1-cosmo-cloud 
telemetry:
  service_name: my-application # Name of your application e.g. my-router
```
{% endcode %}

Please use meaningful names in the Studio to ensure clarity. The instance ID is particularly important because it allows for the identification of a router even after restarts. If not specified, a random unique ID is used.

## Prometheus

To get a list of all Prometheus metrics, we advise navigating to the Prometheus endpoint [http://127.0.0.1:8088/metrics](http://127.0.0.1:8088/metrics). However, it's important to initiate a request first; failing to do so will result in no request metrics being displayed.

### Exclude certain metrics and labels

Sometimes it is useful to have the flexibility to exclude specific metrics or labels to reduce the load "cardinality" of your metrics server. You can do this easily by excluding them in the router config. We support a Go Regex string. You can test your Regex at [https://regex101.com/](https://regex101.com/).

{% code title="config.yaml" %}
```yaml
telemetry:
  # OpenTelemetry Metrics
  metrics:
    # Expose OpenTelemetry metrics as Prometheus metrics
    prometheus:
      exclude_metrics:
        - "^router_http_requests_in_flight.*$" # Exclude the full histogram
      exclude_metric_labels:
        - "^wg_client_version$"
```
{% endcode %}

This excludes `router_http_requests_in_flight` histogram and the label `wg_client_version` from all metrics.

{% hint style="info" %}
Default process and Go metrics can't be excluded. If you haven't run a query against the router yet, you'll see no `router_*` metrics because no metrics have been generated.
{% endhint %}

### Make metrics accessible on all networks

In container environments, it is necessary to expose your server on `0.0.0.0` to make the port accessible from outside.You can enable it by setting the following configuration.

{% code title="config.yaml" %}
```yaml
telemetry:
  metrics:
    prometheus:
      listen_addr: "0.0.0.0:8088"
```
{% endcode %}

Alternatively, you can use the environment variable.

```
PROMETHEUS_LISTEN_ADDR: 0.0.0.0:8088
```

### Example Prometheus Queries

Here you can see a few example queries to query useful information about your client traffic:

### Get Router Request Rate (over 5min inverval) by Operation

```promql
sum by (wg_operation_name) (rate(router_http_requests_total{app="cosmo-router",wg_subgraph_name="",wg_operation_name!=""}[5m]))
```

### Get Subgraph's Request Rate (over 5min inverval) by Operation

```promql
sum by (wg_subgraph_name) (rate(router_http_requests_total{app="cosmo-router",wg_subgraph_name!=""}[5m]))
```

## Summary

By collecting the metrics, you can find answers to the following questions:

* What is the error/success rate of my router/subgraph or a specific operation?
* How is the performance of my router/subgraph or a specific operation?
* What is the average request/response size of a specific operation?
* How much traffic went through a router/subgraph instance?
* What's the distribution of Queries / Mutations and Subscription requests?
* What's the resource utilization in terms of CPU / Memory of my router instance?
* What're the Go runtime information of my router instance?&#x20;
