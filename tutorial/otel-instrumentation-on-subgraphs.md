---
description: How to setup OTEL instrumentation on subgraphs.
icon: newspaper
---

# OTEL Instrumentation on Subgraphs

The steps to instrument the subgraphs are as follows:

* Instrument your application with [OpenTelemetry](https://opentelemetry.io/docs/instrumentation/).
* Ensure you define a unique `serviceName.`
* If you’re running on Cosmo Cloud, the OTEL endpoint is [`https://cosmo-otel.wundergraph.com`](https://cosmo-otel.wundergraph.com)
* Set the endpoint URL path to `/v1/traces` (Usually the default)
* To authenticate against the collector, make your OpenTelemetry agent authenticate using your [federated graph token](../cli/router/token/create.md) as a bearer token, by adding the following HTTP header: `Authorization: Bearer <your token>`

### Examples

#### Go

```go
client := otlptracehttp.NewClient(
    otlptracehttp.WithEndpoint("https://cosmo-otel.wundergraph.com"),
    otlptracehttp.WithHeaders(map[string]string{
        "Authorization": "Bearer <secret>",
    }),
)

tp := sdktrace.NewTracerProvider(
    sdktrace.WithResource(resource.NewSchemaless(semconv.ServiceNameKey.String(otelOpts.ServiceName))),
    sdktrace.WithSampler(
	sdktrace.ParentBased(
    	    sdktrace.TraceIDRatioBased(c.Sampler),
    	    // When the parent span is sampled, the child span will be sampled.
    	),
    ),
)
```

#### TypeScript

```typescript
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-proto";

// Set OTEL_HTTP_ENDPOINT to https://cosmo-otel.wundergraph.com
// Set OTEL_AUTH_TOKEN to your graph authentication token
const otelAuthToken = process.env.OTEL_AUTH_TOKEN;
const otlpExporterHeaders = otelAuthToken
  ? { Authorization: `Bearer ${otelAuthToken}` }
  : undefined;

const otlpExporter = new OTLPTraceExporter({
  url: process.env.OTEL_HTTP_ENDPOINT,
  headers: otlpExporterHeaders,
});
```

## Sampling Rate

Ensure that your subgraphs use parent-based sampling to inherit the sampling rate.

## Example

Additionally, check our [TypeScript example with OTEL](https://github.com/wundergraph/graphql-federation-typescript-demo).

{% hint style="info" %}
Custom OTEL Metrics are currently not exposed but stored. Please contact us if you have advanced use cases.
{% endhint %}
