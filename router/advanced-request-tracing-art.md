---
description: >-
  This section is about Advanced Request Tracing (ART) and how you can leverage
  it to debug execution plans and understand exactly how the Router resolves a
  request.
---

# Advanced Request Tracing (ART)

{% hint style="warning" %}
Enabling Advanced Request Tracing can be a potential security risk and may also negatively impact the performance of the Router. This feature adds verbose information about the Execution Plan and its resolution to the response. Generating this information incurs a cost and adds performance overhead. Additionally, it poses a security risk as it exposes internals such as Subgraph requests, Headers, and potentially Secrets through the response. Keep all these factors in mind when enabling this feature. It is generally not advisable to enable this in a production environment. However, it can be very useful when running a Router locally or in a secure development environment.
{% endhint %}

Advanced Request Tracing (ART) renders the Execution Plan including verbose information about how it was resolved as a JSON and adds it to the GraphQL response in the "extensions" part of the response using the "trace" key.

You get the following information from ART

* planning timings, e.g. how long it took to generate an execution plan
* the general structure of the execution plan
* the types of fetches (load operations) the Router does, like parallel, serial, entity, batch entity, etc.
* what actual requests are being sent to the Subgraphs
* what data was used to render the input for a load operation
* the rendered input of a load operation
* the output of a load operation
* the timings, like latency, of a load operation

All of this information can be quite useful to fully understand how the Router resolves a request and why it might be slow or behave unexpectedly.

### Configuration

For convenience, **Advanced Request Tracing is enabled by default**. When starting the Router, a warning indicates if the feature is active.

To fully disable Advanced Request Tracing, set the following environment variable:

```bash
ENGINE_ENABLE_REQUEST_TRACING=false
```

### Request Parameters

To use Advanced Request Tracing, you need to either use Request Headers or Query Parameters. To disable ART, simply omit the "X-WG-Trace" Header or the "wg\_trace" Query Parameter.

#### Headers

You can set the following Header to enable tracing

```bash
X-WG-Trace=true
```

#### Query Parameter

It's also possible to use Query Parameters

```bash
POST http://example.com/graphql?wg_trace=true
```

#### Optional Arguments

Other (optional) arguments that are available:

* exclude\_planner\_stats (exclude planner timings in the trace)
* exclude\_raw\_input\_data (exclude the raw input data for a loader)
* exclude\_input (exclude the rendered input data for a loader)
* exclude\_output (exclude the output of a loader)
* exclude\_load\_stats (exclude load stats like latency)
* enable\_predictable\_debug\_timings (useful for debugging, makes timings constant)

### Examples

#### Enable Advanced Tracing but exclude planner stats and input via Header

```bash
X-WG-Trace=exclude_planner_stats,exclude_input
```

#### Enable Advanced Tracing but exclude output via Query Parameters

```bash
POST http://example.com/graphql?wg_trace=exclude_output
```
