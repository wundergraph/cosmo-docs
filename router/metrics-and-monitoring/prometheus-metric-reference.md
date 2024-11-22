---
icon: arrow-trend-up
description: >-
  Overview of Prometheus metrics with explanations, queries, use cases, and
  error detection details
---

# Prometheus Metric Reference

## Recommended Metrics for Production

In a production environment, prioritize monitoring the following metrics to ensure system reliability and performance:

### Router Metrics

These metrics ensure efficient request handling, operation planning, and system responsiveness:

* [**`router_http_requests_total`**](prometheus-metric-reference.md#router_http_requests_total): Observes overall HTTP traffic trends and rates.
  * Using this with a `rate` function will show a change in traffic.&#x20;
  * A high rate indicates a lot of traffic on the router which could lead to higher latency.
* [**`router_http_requests_in_flight`**](prometheus-metric-reference.md#router_http_requests_in_flight): Tracks concurrent in-flight requests to avoid overloads.
  * **Increased Latency:** A high number of in-flight requests can lead to delayed responses as server resources become constrained, resulting in slower processing of new requests.
  * **Potential Overload:** Excessive in-flight requests can overwhelm the application, causing resource exhaustion, degraded performance, or even service outages.
* [**`router_http_request_duration_milliseconds`**](prometheus-metric-reference.md#router_http_request_duration_milliseconds_-sum-count): Measures average request duration to detect latency issues.
  * **Backend Performance Issues:** Prolonged durations can signal bottlenecks in the application or database, requiring investigation and optimization.
* [**`router_graphql_operation_planning_time`**](prometheus-metric-reference.md#router_graphql_operation_planning_time): Tracks GraphQL query planning time to identify performance inefficiencies.
  * **Increased Query Latency:** High planning times can delay the execution of GraphQL queries, negatively affecting response times.
  * **Scalability Challenges:** Excessive operation planning durations can lead to resource contention under heavy workloads, limiting scalability.
  * **Operation Design:** Complex queries can also lead to increased planning time as those are parsed and validated.

### Go Runtime Metrics

These metrics help monitor application memory usage, concurrency, and garbage collection efficiency:

* [**`go_memstats_sys_bytes`**](prometheus-metric-reference.md#go_memstats_sys_bytes): Monitors memory obtained from the system across all instances.
  * **Excessive Memory Usage:** High values suggest that the application is consuming more system memory than expected, which can impact other processes.
  * **Inefficient Allocation:** A mismatch between allocated and used memory may indicate suboptimal memory usage patterns.
* [**`go_memstats_heap_alloc_bytes`**](prometheus-metric-reference.md#go_memstats_heap_alloc_bytes): Number of heap bytes allocated and still in use across all instances. Focuses on heap memory usage for efficient memory management. The value is same as [**go\_memstats\_alloc\_bytes**](prometheus-metric-reference.md#go_memstats_alloc_bytes).
  * **Heap Saturation Risk:** High heap memory usage can lead to increased garbage collection frequency and performance degradation.
* [**`go_gc_duration_seconds`**](prometheus-metric-reference.md#go_gc_duration_seconds): Tracks garbage collection duration to identify performance bottlenecks.
  * **Performance Bottlenecks:** Long garbage collection pauses can cause application slowdowns, especially under high load.
  * **Request Latency:** Increased GC durations may directly impact request processing times, degrading user experience.
* [**`go_goroutines`**](prometheus-metric-reference.md#go_goroutines): Monitors active goroutines to prevent resource exhaustion.
  * **Resource Leaks:** An unexpected increase in goroutines can signal a leak, leading to excessive memory and CPU usage.
  * **Concurrency Bottlenecks:** High goroutine counts may indicate insufficient handling of concurrency or blocking operations

Focusing on these metrics enables comprehensive monitoring and proactive issue detection in a production environment.

***

Below is the extended documentation for common Prometheus metrics. Each section is structured with a clear explanation of the metric, an example PromQL query, and the importance of the metric, including potential error cases.

For more information and handy tips on writing PromQL queries, take a look at this [PromQL Cheat Sheet](https://promlabs.com/promql-cheat-sheet/).

## `router_graphql_operation_planning_time`

**Description:**

The `router_graphql_operation_planning_time` metric is a histogram. It consists of three different metric types, namely:

1. **`_count:`** This represents the total number of observed events.
2. **`_sum:`** This is the sum of all observed values, providing the cumulative planning time.
3. **`_bucket:`** This defines the range of values (buckets) into which observations can fall, useful for calculating percentiles and distribution.

### Get average operation planning performance

**Example PromQL Query:**

```promql
rate(router_graphql_operation_planning_time_sum[5m]) / 
rate(router_graphql_operation_planning_time_count[5m])
```

**Reason for Monitoring:**\
Monitoring the average operation planning time helps optimize GraphQL query planning performance and detect slowdowns.

**Error Cases Addressed:**

* High planning latency.
* Performance regressions.
* Possible inefficent query design

### `Analyze upper boundary of latency`

**Description:**\
The `router_graphql_operation_planning_time_bucket` metric is used to compute quantiles for operation planning time, providing deeper insights into the distribution of planning times rather than just averages.

**Example PromQL Query for Quantile:**

```promql
histogram_quantile(0.95, sum by (wg_operation_name, le)(rate(router_graphql_operation_planning_time_bucket[5m])))
```

**Explanation:**\
This query calculates the 95th percentile (or quantile) of the operation planning time over a 5-minute window. It helps identify the upper boundary of latency experienced by the 95% of operations, which is crucial for understanding tail latencies and ensuring performance consistency.

**Reason for Monitoring Quantiles:**\
Utilizing quantiles can help in understanding the worst-case scenarios and pinpointing latency outliers that might affect user experience.

**Error Cases Addressed:**

* High variation in operation planning times.
* Identifying latency spikes for certain operations.
* Tail latency issues that might not be visible with average metrics alone.

***

## `router_http_request_duration_milliseconds_{sum,count}`

**Description:**\
The request duration in milliseconds.

**Example PromQL Query:**

```promql
avg by(wg_operation_name) (
  rate(router_http_request_duration_milliseconds_sum[5m]) / 
  rate(router_http_request_duration_milliseconds_count[5m])
)
```

**Reason for Monitoring:**\
This metric provides the average request duration, grouped by operation name, helping to identify slow requests and optimize application performance.

**Error Cases Addressed:**

* High latency requests.
* Request duration anomalies.

***

## `router_http_requests_in_flight`

**Description:**\
The number of requests currently in flight.

**Example PromQL Query:**

```promql
avg by(wg_federated_graph_id) (router_http_requests_in_flight)
```

**Reason for Monitoring:**\
Tracking in-flight requests ensures that the application can handle concurrent requests effectively without overloading.

**Error Cases Addressed:**

* Resource exhaustion due to high concurrency.
* Application overloads.

***

## `router_http_requests_total`

**Description:**\
The total number of HTTP requests.

**Example PromQL Query:**

```promql
rate(router_http_requests_total[5m])
```

**Reason for Monitoring:**\
This metric provides the rate of HTTP requests over a 5-minute interval, helping to monitor traffic trends and detect unusual spikes or drops.

**Error Cases Addressed:**

* Sudden traffic surges.
* Unexpected drops in request rates.

***

## `go_memstats_alloc_bytes`

**Description:**\
The number of bytes allocated and still in use.

**Example PromQL Query:**

```promql
avg by (job) (go_memstats_alloc_bytes)
```

**Reason for Monitoring:**\
This metric provides an average of the memory currently reserved by the application. It helps track memory usage trends and can indicate potential memory leaks if the value grows unexpectedly over time.

**Error Cases Addressed:**

* Memory leaks.
* Inefficient memory utilization.

***

## `go_memstats_sys_bytes`

**Description:**\
The number of bytes obtained from the system.

**Example PromQL Query:**

```promql
avg by(job)(go_memstats_sys_bytes)
```

**Reason for Monitoring:**\
This metric reflects the total memory reserved across all process instances of a job. It is useful for identifying trends in memory consumption and ensuring the application does not exceed expected system memory usage.

**Error Cases Addressed:**

* Excessive memory consumption.
* Discrepancies in memory usage across instances.

***

## `go_memstats_alloc_bytes_total`

**Description:**\
The total number of bytes allocated, even if freed.

**Example PromQL Query:**

```promql
rate(go_memstats_alloc_bytes_total[5m])
```

**Reason for Monitoring:**\
Tracking the rate of memory allocations over a 5-minute interval helps identify periods of high memory allocation, which could indicate spikes in application load or inefficient memory allocation patterns.

**Error Cases Addressed:**

* Spikes in memory allocation.
* Potential over-allocation issues.

***

## `go_memstats_heap_objects`

**Description:**\
The number of allocated objects in the heap.

**Example PromQL Query:**

```promql
go_memstats_heap_objects
```

**Reason for Monitoring:**\
Monitoring the heap object count provides insights into the total number of objects currently in use. This is important for detecting memory fragmentation or inefficient object management.

**Error Cases Addressed:**

* Excessive heap object creation.
* Unreleased heap objects.

***

## `go_memstats_heap_alloc_bytes`

**Description:**\
The number of heap bytes allocated and still in use.

**Example PromQL Query:**

```promql
avg by(job) (go_memstats_heap_alloc_bytes)
```

**Reason for Monitoring:**\
This metric tracks heap memory usage. Monitoring its trend can reveal abnormal memory consumption, such as potential memory leaks or increased memory usage during peak loads.

**Error Cases Addressed:**

* Memory leaks.
* Abnormal heap memory growth.

***

## `go_memstats_heap_inuse_bytes`

**Description:**\
The number of heap bytes currently in use.

**Example PromQL Query:**

```promql
avg by(job) (go_memstats_heap_inuse_bytes)
```

**Reason for Monitoring:**\
This metric provides visibility into the active usage of heap memory, helping to ensure the application is operating efficiently.

**Error Cases Addressed:**

* Unexpected increases in active memory usage.
* Inefficient memory allocation patterns.

***

## `go_memstats_heap_idle_bytes`

**Description:**\
The number of heap bytes waiting to be used.

**Example PromQL Query:**

```promql
avg by(job) (go_memstats_heap_idle_bytes)
```

**Reason for Monitoring:**\
This metric shows idle heap memory, indicating memory availability and potential over-allocation issues.

**Error Cases Addressed:**

* Excessive unused memory allocation.
* Inefficient memory provisioning.

***

## `go_memstats_next_gc_bytes`

**Description:**\
The number of heap bytes at which the next garbage collection will take place.

**Example PromQL Query:**

```promql
avg by(job) (go_memstats_next_gc_bytes)
```

**Reason for Monitoring:**\
Understanding when garbage collection is triggered can help optimize memory management strategies and detect potential inefficiencies.

**Error Cases Addressed:**

* Suboptimal garbage collection configurations.
* Unexpected memory growth leading to increased GC frequency.

***

## `go_memstats_mallocs_total`

**Description:**\
The total number of `malloc` calls.

**Example PromQL Query:**

```promql
rate(go_memstats_mallocs_total[5m])
```

**Reason for Monitoring:**\
This metric provides insights into memory allocation rates over time. It is particularly useful for identifying changes in application behavior that result in increased memory allocations.

**Error Cases Addressed:**

* Inefficient allocation patterns.
* Potential performance degradation due to excessive `malloc` calls.

***

## `go_gc_duration_seconds`

**Description:**\
The `go_gc_duration_seconds` metric is a histogram that captures the distribution of garbage collection pause times. It helps to analyze how frequently pauses of different durations occur.

**Example PromQL Query:**

```promql
rate(go_gc_duration_seconds_sum[5m]) / rate(go_gc_duration_seconds_count[5m])
```

**Reason for Monitoring:**\
Monitoring garbage collection duration helps ensure it does not negatively impact application performance, particularly during high load.

**Error Cases Addressed:**

* Prolonged garbage collection pauses.
* Performance bottlenecks during peak usage.

#### Monitoring 95th Percentile of Garbage Collection Duration

**Example PromQL Query:**

```promql
histogram_quantile(0.95, sum(rate(go_gc_duration_seconds_bucket[5m])) by (le))
```

**Reason for Monitoring:**\
Understanding the 95th percentile of garbage collection duration provides insights into worst-case performance scenarios, ensuring that the application remains responsive even when experiencing longer GC pauses.

**Error Cases Addressed:**

* Occasional long garbage collection events.
* Ensuring consistent response times under varying load levels.

***

## `go_goroutines`

**Description:**\
The number of goroutines that currently exist.

**Example PromQL Query:**

```promql
go_goroutines
```

**Reason for Monitoring:**\
This metric tracks the number of active goroutines, ensuring that no goroutine leaks occur, which can lead to resource exhaustion.

**Error Cases Addressed:**

* Goroutine leaks.
* Unexpected growth in active goroutines.

***

**Note:** When crafting PromQL queries using range vectors, ensure that you adjust the time range according to your specific monitoring needs and system performance characteristics for accurate observability.
