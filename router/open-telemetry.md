---
description: Use OpenTelemetry with traces and metrics
---

# Open Telemetry

Cosmo router supports exporting tracing and metrics via OpenTelemetry. By default, both are exported to Cosmo Cloud, but these can be configured with additional exporters or disable the default ones. Both `http` and `grpc` are supported.

<pre class="language-yaml"><code class="lang-yaml">telemetry:
  service_name: "cosmo-router" # Service name for traces and metrics
  tracing:
    enabled: true
    # If no exporters are configured, telemetry is exported to Cosmo Cloud
    exporters:
    - endpoint: https://cosmo-otel.wundergraph.com:4318 # The default
      exporter: "http" # or "grpc" with port 4317
      headers: {Authorization: Bearer ${ROUTER_TOKEN}}
<strong>  metrics:
</strong>    otlp:
      enabled: true
      # If no exporters are configured, telemetry is exported to Cosmo Cloud
      exporters:
      - endpoint: https://cosmo-otel.wundergraph.com:4318 # The default
        exporter: "http" # or "grpc" with port 4317
        headers: {Authorization: Bearer ${ROUTER_TOKEN}}
</code></pre>

{% hint style="info" %}
If no exporters are configured, the default one is used instead (set by the `DEFAULT_TELEMETRY_EXPORTER` environment variable)
{% endhint %}

The router can also expose Prometheus metrics. It works with the same OTEL metrics we export to Cosmo Cloud. See [metrics-and-monitoring.md](metrics-and-monitoring.md "mention")

## Multiple exporters

You can configure multiple exporters. A common case is to forward telemetry data to Cosmo Cloud and e.g. Datadog Agent which has native support to ingest  [OpenTelemetry](https://docs.datadoghq.com/opentelemetry/) data.

```yaml
telemetry:
  service_name: "cosmo-router" # Service name for traces and metrics
  tracing:
    enabled: true
    exporters:
    # Cosmo Cloud
    - endpoint: https://cosmo-otel.wundergraph.com:4318
      exporter: "http"
      headers: {Authorization: Bearer ${MY_AUTH_TOKEN}}
    # Datadog Agent 
    - endpoint: http://datadog-agent
      exporter: "http"
```
