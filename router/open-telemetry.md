---
description: Use OpenTelemetry with traces and metrics
---

# Open Telemetry

Cosmo router supports exporting tracing and metrics via OpenTelemetry. By default, both are exported to Cosmo Cloud, but these can be configured with additional exporters or disable the default ones. Both `http` and `grpc` are supported.

<pre class="language-yaml" data-title="config.yaml"><code class="lang-yaml">telemetry:
  service_name: "cosmo-router" # Service name for traces and metrics
  tracing:
    enabled: true
    # If no exporters are configured, telemetry is exported to Cosmo Cloud
    exporters:
    - endpoint: https://cosmo-otel.wundergraph.com # The default
      exporter: "http" # or "grpc" with port 4317
      headers: {Authorization: Bearer ${ROUTER_TOKEN}}
<strong>  metrics:
</strong>    otlp:
      enabled: true
      # If no exporters are configured, telemetry is exported to Cosmo Cloud
      exporters:
      - endpoint: https://cosmo-otel.wundergraph.com # The default
        exporter: "http" # or "grpc" with port 4317
        headers: {Authorization: Bearer ${ROUTER_TOKEN}}
</code></pre>

{% hint style="info" %}
If no exporters are configured, the default one is used instead (set by the `DEFAULT_TELEMETRY_EXPORTER` environment variable)
{% endhint %}

The router can also expose Prometheus metrics. It works with the same OTEL metrics we export over OTEL. See [metrics-and-monitoring.md](metrics-and-monitoring.md "mention")

## Tracing

### Multiple exporters

You can configure multiple exporters. A common case is to forward telemetry data to Cosmo Cloud and e.g. Datadog Agent which has native support to ingest  [OpenTelemetry](https://docs.datadoghq.com/opentelemetry/) data.

{% code title="config.yaml" %}
```yaml
telemetry:
  service_name: "cosmo-router" # Service name for traces and metrics
  
  # OpenTelemetry Tracing
  tracing:
    enabled: true
    # If no exporters are defined, the default one is used
    exporters:
    # Cosmo Cloud
    - endpoint: https://cosmo-otel.wundergraph.com
      exporter: "http"
      headers: {Authorization: Bearer ${MY_AUTH_TOKEN}}
    # Datadog Agent 
    - endpoint: http://datadog-agent:4318
      exporter: "http"
      
  # OpenTelemetry Metrics
  metrics:
    otlp:
      enabled: true
      # If no exporters are defined, the default one is used
      exporters:
        - exporter: http # or grpc
          disabled: false
          endpoint: https://my-otel-collector.example.com
```
{% endcode %}

### Trace Propagation

Propagation is the mechanism that allows the movement of data between services and processes. As a user of the router, you will interact with them in the form of headers to pass the trace context across service boundaries. By default, we enable the widely-used [Trace-Context](https://www.w3.org/TR/trace-context/) specification. You can disable or enable different specifications according to your needs.

{% code title="config.yaml" %}
```yaml
telemetry:
  tracing:
    propagation:
      # https://www.w3.org/TR/trace-context/
      trace_context: true
      # https://www.w3.org/TR/baggage/
      baggage: false
      # https://www.jaegertracing.io/ (compliant with opentracing)
      jaeger: false
      # https://github.com/openzipkin/b3-propagation (zipkin)
      b3: false   
```
{% endcode %}

#### Example: Enable B3 propagation

If you want to enable [B3](https://github.com/openzipkin/b3-propagation) for example, you can set `b3` to `true` but you also need to add the trace headers to the CORS config to not run into issues.

<pre class="language-yaml" data-title="config.yaml"><code class="lang-yaml"><strong># Cross-Origin Resource Sharing (CORS)
</strong>cors:
  allow_headers:
    - b3
</code></pre>

### GraphQL variables

GraphQL variables are useful for debugging to replay queries but they can pose a potential risk because they include request data. To mitigate this, you can disable variable export in the following way. In the future, we will provide tools to redact specific arguments.

```yaml
telemetry:
  tracing:
      export_graphql_variables: false # TRACING_EXPORT_GRAPHQL_VARIABLES
```

This will limit the capability to debug and replay GraphQL requests in the Studio.

### WebSockets

Tracing has not yet been implemented for WebSocket messages. If you require this feature, please do not hesitate to contact us.

## FAQ

### Can I export OTEL data from my application?

Yes, but this is currently limited to private backend applications e.g. subgraphs because we don't provide a secure mechanism to issue short-lived tokens in public applications. Avoid using your GRAPH\_TOKEN in web applications. A possible solution to make this work is to run an [otelcollector](https://docs.newrelic.com/docs/more-integrations/open-source-telemetry-integrations/opentelemetry/collector/opentelemetry-collector-intro/) and utilize the export functionality to forward telemetry data to Cosmo Cloud. This will enable you to configure your own authentication layer and observe malicious behaviors. It is also a [recommended](https://docs.newrelic.com/docs/more-integrations/open-source-telemetry-integrations/opentelemetry/best-practices/opentelemetry-best-practices-browser/) approach to ingest data to multiple OTEL platforms.

### Why aren't my traces showing up in the Studio?

In certain conditions, it can happen that traces are not listed in the Studio. We have observed these cases.&#x20;

1. Platforms like Google Cloud Run automatically propagate trace headers according to the Trace-Context specification in every service call.
2. Your client request has already set a trace context, but it did not send the span to Cosmo Cloud.
3. External, uncontrolled clients sent trace headers.

In both cases, the issue is that not all spans will be sent to the Cosmo Platform. The Studio's Traces view is configured to list only the root spans. As a workaround you can force the router to start the root span at the router.

{% code title="config.yaml" %}
```yaml
telemetry:
  tracing:
    with_new_root: true
```
{% endcode %}
