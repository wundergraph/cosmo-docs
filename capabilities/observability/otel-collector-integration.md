# OTEL Collector Integration

OpenTelemetry Collector setup for centralized data aggregation and multi-destination export.

---

## Metadata

| Field | Value |
|-------|-------|
| **Capability ID** | `cap-obs-006` |
| **Category** | Observability |
| **Status** | GA |
| **Availability** | Free / Pro / Enterprise |
| **Related Capabilities** | `cap-obs-001`, `cap-obs-002` |

---

## Quick Reference

### Name
OpenTelemetry Collector Integration

### Tagline
Centralize and route telemetry data anywhere.

### Elevator Pitch
The OpenTelemetry Collector acts as a central hub for your observability pipeline, aggregating traces and metrics from Cosmo Router and routing them to multiple destinations. Configure a single exporter in the router while the Collector handles complex routing to Cosmo Cloud, Jaeger, Prometheus, and any other OTEL-compatible backend.

---

## Problem & Solution

### The Problem
Organizations often need to send telemetry data to multiple destinations - Cosmo Cloud for GraphQL analytics, Datadog for company dashboards, and Prometheus for infrastructure monitoring. Configuring multiple exporters in each application creates complexity, and some backends require specific protocols or authentication that are cumbersome to manage at the application level.

### The Solution
Deploy an OpenTelemetry Collector as an intermediary between the router and your observability backends. The router exports to a single Collector endpoint, and the Collector handles routing to multiple destinations with independent configurations. This centralizes telemetry management, enables data transformation, and simplifies application configuration.

### Before & After

| Before Cosmo | With Cosmo |
|--------------|------------|
| Multiple exporters in each app | Single exporter to Collector |
| Complex authentication per app | Centralized credential management |
| No data transformation | Processing pipelines available |
| Difficult multi-destination setup | Simple pipeline configuration |

---

## Key Benefits

1. **Centralized Management**: Single point of control for all telemetry routing
2. **Multi-Destination Export**: Route data to unlimited backends from one configuration
3. **Data Processing**: Transform, filter, and batch data before export
4. **Simplified Application Config**: Applications export to local Collector only
5. **Protocol Translation**: Collector handles protocol differences between backends

---

## Target Audience

### Primary Persona
- **Role**: Platform Engineer / SRE
- **Pain Points**: Complex telemetry routing; managing credentials across apps; protocol mismatches
- **Goals**: Unified observability pipeline; simplified application configuration

### Secondary Personas
- DevOps engineers managing infrastructure
- Security teams controlling data flow
- Engineering managers overseeing monitoring strategy

---

## Use Cases

### Use Case 1: Multi-Cloud Observability
**Scenario**: Organization uses Cosmo Cloud for GraphQL analytics and Datadog for company-wide dashboards.
**How it works**: Configure the router to export to a local Collector. The Collector has two pipelines: one exporting to Cosmo Cloud, another to Datadog.
**Outcome**: Single router configuration with data flowing to both platforms automatically.

### Use Case 2: Internal and External Routing
**Scenario**: Team needs traces in Jaeger for development debugging and in Cosmo Cloud for production analytics.
**How it works**: Collector receives all traces and routes them to both Jaeger (internal) and Cosmo Cloud (external) via separate pipelines.
**Outcome**: Development and production teams both have the data they need from the same source.

### Use Case 3: Data Processing Pipeline
**Scenario**: High-traffic system needs to batch and compress telemetry data before export to reduce costs.
**How it works**: Configure batch processor in Collector to aggregate data before export. Set appropriate timeout and batch sizes.
**Outcome**: Reduced export requests and lower bandwidth costs while maintaining complete telemetry coverage.

---

## Competitive Positioning

### Key Differentiators
1. Industry-standard OpenTelemetry protocol
2. Compatible with any OTEL-compliant backend
3. Flexible pipeline configuration
4. Custom collector builds available for specific needs

### Comparison with Alternatives

| Aspect | OTEL Collector | Direct Export | Custom Proxy |
|--------|----------------|---------------|--------------|
| Multi-Destination | Native | Per-app config | Custom |
| Data Processing | Built-in | None | Custom |
| Protocol Support | Extensive | Limited | Custom |
| Community Support | Large | N/A | None |

### Common Objections & Responses

| Objection | Response |
|-----------|----------|
| "Another component to manage" | The Collector provides significant simplification for multi-destination scenarios; single management point |
| "We don't need data processing" | Even without processing, centralized routing simplifies credential management and protocol handling |
| "Adds latency" | Collector is designed for high throughput; batch processing actually reduces overall network overhead |

---

## Technical Summary

### How It Works
The OpenTelemetry Collector runs as a separate service (container or process) that receives telemetry data via OTLP protocol (gRPC or HTTP). It processes data through configurable pipelines (receivers -> processors -> exporters) and forwards to configured destinations. The router is configured to export to the Collector endpoint instead of directly to backends.

### Key Technical Features

**Collector Configuration:**
```yaml
receivers:
  otlp:
    protocols:
      grpc:
        endpoint: 0.0.0.0:4317
      http:
        endpoint: 0.0.0.0:4318

processors:
  batch:
    timeout: 1s
    send_batch_size: 1024

exporters:
  otlphttp:
    endpoint: "https://cosmo-otel.wundergraph.com:443"
    headers:
      "Authorization": "<token>"

service:
  pipelines:
    metrics:
      receivers: [otlp]
      processors: [batch]
      exporters: [otlphttp]
    traces:
      receivers: [otlp]
      processors: [batch]
      exporters: [otlphttp]
```

**Router Configuration:**
```yaml
telemetry:
  tracing:
    exporters:
      - endpoint: http://otel-collector:4318
        exporter: http
  metrics:
    otlp:
      exporters:
        - endpoint: http://otel-collector:4318
          exporter: http
```

### Integration Points
- Cosmo Router as data source
- Cosmo Cloud for GraphQL analytics
- Jaeger, Zipkin for tracing
- Prometheus, Graphite for metrics
- Any OTEL-compatible backend

### Requirements & Prerequisites
- OpenTelemetry Collector deployed and accessible
- Network connectivity from router to Collector
- Collector configured with appropriate exporters
- Authentication tokens for secured backends

---

## Proof Points

### Metrics & Benchmarks
- Supports OTLP via both gRPC (4317) and HTTP (4318)
- Batch processing reduces export overhead
- Scales horizontally for high-traffic deployments

### Customer Quotes
> "The Collector simplified our observability pipeline dramatically. We went from managing 5 different exporters per service to one Collector configuration." - Platform Architect

---

## Content Assets

| Asset Type | Status | Link |
|------------|--------|------|
| Landing Page | Needed | |
| Blog Post | Needed | |
| Video Demo | Needed | |
| Pitch Deck Slide | Needed | |
| One-Pager | Needed | |
| Battle Card | Needed | |

---

## Documentation References

- Primary docs: `/docs/router/open-telemetry/setup-opentelemetry-collector`
- OTEL configuration: `/docs/router/open-telemetry`
- Collector quick start: `https://opentelemetry.io/docs/collector/quick-start/`
- Custom collector: `https://opentelemetry.io/docs/collector/custom-collector/`

---

## Keywords & SEO

### Primary Keywords
- OpenTelemetry Collector
- OTEL Collector GraphQL
- Telemetry aggregation

### Secondary Keywords
- Multi-destination telemetry
- Centralized observability
- OTEL pipeline configuration

### Related Search Terms
- How to setup OpenTelemetry Collector
- GraphQL telemetry routing
- Multi-backend observability
- OTEL Collector Cosmo integration

---

## Version History

| Date | Version | Changes |
|------|---------|---------|
| 2025-01-14 | 1.0 | Initial capability documentation |
