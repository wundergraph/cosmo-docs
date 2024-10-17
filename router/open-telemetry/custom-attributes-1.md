---
description: >-
  We provide default attributes for every metric, but it’s often necessary to
  add extra context. To achieve this, we support both static and dynamic values
  based on headers and request context.
---

# Custom Metric Attributes

{% hint style="info" %}
**Available since Router version 0.126.0**.&#x20;
{% endhint %}

{% hint style="warning" %}
Please note that each attribute increases cardinality. Furthermore, attributes based on request header values may potentially leak sensitive information when stored on the telemetry storage provider. You should only attach headers that have been sanitized by your infrastructure.
{% endhint %}

There are scenarios where you may want to add additional attributes to your metrics. One common use case is to add&#x20;

### Prometheus

All attributes are also added to the Prometheus metrics. Since Prometheus does not support multi-value labels like `graphql_error_codes`, a separate metric series is emitted for each attribute value. This simplifies querying the data in Prometheus.

## Static Attribute Value

```yaml
telemetry: 
  metrics: 
    attributes:
      - key: "myAttribute"
        default: "router"
```

This configuration will add the resource attribute `env=prod` to every metric and span export. Additionally, the attribute `service=static` is also added. Resource attributes identify the entity producing the traces and metrics. Since Prometheus metrics rely on OpenTelemetry metrics, the resource attributes are also added to the Prometheus `target_info` series.

## Dynamic Attribute Value

We also support setting attributes based on client request headers or request context information. To configure this, specify the mapping in the `value_from` property.

Headers are pre-evaluated before metrics are emitted, while request context fields are determined at different stages. Consequently, request context fields may not be included in all metrics.

```yaml
cors:
  allow_headers:
    - "X-My-Header"

telemetry:
  metrics:
    attributes:
      - key: "myAttribute"
        default: "myValue"
        value_from:
          request_header: "X-My-Header"
        
      - key: "error_ocdes"
        value_from:
          context_field: graphql_error_codes
```

This will add the attribute `myAttribute=myValue` unless the client provides the request header `X-My-Header`. Ensure that this header is included in the allowlist in the CORS configuration to prevent CORS issues on the frontend.

Additionally, the unique list of subgraph error codes will be appended to all emitted metric values. This enables correlation between error cases and corresponding metrics.

For a complete list of available options, please refer to the relevant documentation [section](../configuration.md#telemetry).
