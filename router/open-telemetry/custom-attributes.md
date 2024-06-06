---
description: >-
  We already provide default attributes to every metric and span, but it is
  often necessary and desirable to add additional context to them. We allow
  static and dynamic values based on headers.
---

# Custom Attributes

{% hint style="warning" %}
**Available since Router version 0.92.0**. Please note that each attribute increases cardinality. Furthermore, attributes based on request header values may potentially leak sensitive information when stored on the telemetry storage provider.
{% endhint %}

There are scenarios where you may want to add additional attributes to your metrics and spans. One common use case is to add environment information, such as `env=prod`. We provide an easy way to achieve this by adding a few lines of configuration. All attributes are also added on the prometheus metrics.

## Static Attribute Value

```yaml
telemetry:
  resource_attributes:
    - key: env
      value: "prod"
  attributes:
    - key: service
      default: "static"
```

This configuration will add the resource attribute `env=prod` to every metric and span export. Additionally, the attribute `service=static` is also added. Resource attributes identify the entity producing the traces and metrics. Since Prometheus metrics rely on OpenTelemetry metrics, the resource attributes are also added to the Prometheus `target_info` series.

## Dynamic Attribute Value

We also support setting attributes based on client request headers. To do this, simply specify the mapping in the `value_from` property. If the headers could not be found, we will fallback to the default value. This functionality is only available to `attributes` **not** `resource_attributes`.

```yaml
cors:
  allow_headers:
    - "x-service"

telemetry:
  attributes:
    - key: service
      default: "static"
      value_from:
        request_header: "x-service"
```

This will add the attribute `service=static` unless the client has provided a request header `x-service`, in which case the value of this header will be used instead of the default value. Remember to add the header to the allowlist in the CORS configuration; otherwise, CORS issues will occur on the frontend.
