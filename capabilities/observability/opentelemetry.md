# OpenTelemetry (OTEL)

Full OpenTelemetry support for tracing and metrics with HTTP/gRPC exporters.

---

## Metadata

| Field | Value |
|-------|-------|
| **Capability ID** | `cap-obs-001` |
| **Category** | Observability |
| **Status** | GA |
| **Availability** | Free / Pro / Enterprise |
| **Related Capabilities** | `cap-obs-002`, `cap-obs-004`, `cap-obs-006` |

---

## Quick Reference

### Name
OpenTelemetry (OTEL) Integration

### Tagline
Native OpenTelemetry support for comprehensive observability.

### Elevator Pitch
Cosmo Router provides native OpenTelemetry support for exporting traces and metrics to any OTEL-compatible backend. Configure multiple exporters, customize attributes, and gain deep visibility into your federated GraphQL operations without vendor lock-in.

---

## Problem & Solution

### The Problem
Engineering teams running federated GraphQL need comprehensive observability but face challenges integrating with their existing monitoring stack. They need to export telemetry data to multiple platforms (Datadog, Jaeger, Prometheus, etc.) while maintaining consistency across traces and metrics. Without native OTEL support, teams must build custom integrations or accept fragmented observability.

### The Solution
Cosmo Router includes built-in OpenTelemetry instrumentation that exports both traces and metrics via HTTP or gRPC protocols. Teams can configure multiple exporters simultaneously, sending data to Cosmo Cloud while also forwarding to internal observability platforms. Custom attributes can be added statically or dynamically from request headers, enabling rich context for debugging and analysis.

### Before & After

| Before Cosmo | With Cosmo |
|--------------|------------|
| Manual instrumentation of GraphQL layer | Automatic OTEL instrumentation out of the box |
| Single exporter limitation | Multiple exporters to any OTEL-compatible backend |
| Static telemetry attributes only | Dynamic attributes from headers and expressions |
| Separate trace and metric pipelines | Unified OTEL foundation for all telemetry |

---

## Key Benefits

1. **Zero-Code Instrumentation**: Automatic tracing and metrics collection without modifying application code
2. **Multi-Exporter Support**: Send telemetry to Cosmo Cloud, Datadog, Jaeger, and any OTEL-compatible backend simultaneously
3. **Flexible Protocol Support**: Export via HTTP or gRPC based on your infrastructure requirements
4. **Custom Attributes**: Add static values or dynamic attributes from request headers and expressions
5. **Cardinality Control**: Built-in limits and exclusion patterns prevent metric explosion

---

## Target Audience

### Primary Persona
- **Role**: Platform Engineer / SRE
- **Pain Points**: Integrating GraphQL observability with existing monitoring stack; avoiding vendor lock-in
- **Goals**: Unified observability across all services; consistent metrics and traces

### Secondary Personas
- Backend developers needing debugging context
- DevOps engineers managing observability infrastructure
- Engineering managers tracking system health

---

## Use Cases

### Use Case 1: Multi-Platform Observability
**Scenario**: A platform team needs to send telemetry to both Cosmo Cloud for GraphQL-specific analytics and Datadog for company-wide dashboards.
**How it works**: Configure multiple exporters in the router config, each with its own endpoint and authentication headers. The router exports to all configured destinations simultaneously.
**Outcome**: Unified telemetry across platforms without data duplication or custom forwarding logic.

### Use Case 2: Environment-Aware Metrics
**Scenario**: Operations team needs to distinguish metrics by environment (dev, staging, prod) and client version for debugging.
**How it works**: Add static resource attributes for environment identification and dynamic attributes that extract client version from request headers.
**Outcome**: Rich dimensional data enables precise filtering and correlation during incident investigation.

### Use Case 3: Cardinality Management
**Scenario**: High-traffic application generates excessive metric cardinality, overwhelming the monitoring backend.
**How it works**: Configure metric and label exclusion patterns using regex, and rely on the built-in cardinality limit of 2000 unique combinations per metric.
**Outcome**: Controlled metric volume while retaining essential observability data.

---

## Competitive Positioning

### Key Differentiators
1. Native OTEL support with zero additional configuration required
2. Simultaneous export to unlimited backends
3. Built-in cardinality controls and exclusion patterns
4. Dynamic attribute support from request context

### Comparison with Alternatives

| Aspect | Cosmo | Apollo Router | DIY Solution |
|--------|-------|---------------|--------------|
| OTEL Native | Yes | Partial | Manual |
| Multi-Exporter | Yes | Limited | Complex |
| Custom Attributes | Static + Dynamic | Limited | Custom code |
| Cardinality Control | Built-in | Manual | Manual |

### Common Objections & Responses

| Objection | Response |
|-----------|----------|
| "We already use Prometheus" | OTEL metrics are the foundation for both OTEL export and Prometheus - you get both from the same instrumentation |
| "OTEL adds overhead" | Configurable export intervals (default 15s) and exclusion patterns minimize performance impact |
| "We need custom metrics" | Custom attributes let you add any dimension from headers or expressions |

---

## Technical Summary

### How It Works
The Cosmo Router uses the OpenTelemetry Go SDK to instrument all GraphQL operations. Traces capture the full request lifecycle including parsing, validation, planning, and execution across subgraphs. Metrics follow the R.E.D method (Rate, Errors, Duration) for both router and subgraph requests. Data is exported via configured exporters at regular intervals.

### Key Technical Features
- HTTP and gRPC exporter protocols
- W3C Trace Context propagation (default), with optional Jaeger, B3, and Baggage support
- Resource attributes for service identification
- Request-scoped attributes from headers or expressions
- Metric and trace exclusion via regex patterns
- Cardinality limit of 2000 per metric

### Integration Points
- Any OpenTelemetry-compatible backend (Jaeger, Zipkin, Datadog, etc.)
- OpenTelemetry Collector for data aggregation
- Prometheus via OTEL metrics export
- Cosmo Cloud for GraphQL-specific analytics

### Requirements & Prerequisites
- Cosmo Router 0.92.0+ for custom attributes
- Network access to configured exporter endpoints
- Authentication tokens for secured endpoints

---

## Proof Points

### Metrics & Benchmarks
- Default export interval: 15 seconds
- Maximum cardinality per metric: 2000 unique combinations
- Supports unlimited concurrent exporters

### Customer Quotes
> "The multi-exporter support let us integrate Cosmo with our existing Datadog setup while still using Cosmo Cloud for GraphQL-specific insights." - Platform Engineer

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

- Primary docs: `/docs/router/open-telemetry`
- Custom attributes: `/docs/router/open-telemetry/custom-attributes`
- Collector setup: `/docs/router/open-telemetry/setup-opentelemetry-collector`
- Configuration reference: `/docs/router/configuration#telemetry-2`

---

## Keywords & SEO

### Primary Keywords
- OpenTelemetry GraphQL
- OTEL federation
- GraphQL observability

### Secondary Keywords
- Distributed tracing GraphQL
- GraphQL metrics export
- OTEL exporter configuration

### Related Search Terms
- How to monitor federated GraphQL
- GraphQL tracing setup
- OpenTelemetry router configuration
- Multi-backend telemetry export

---

## Version History

| Date | Version | Changes |
|------|---------|---------|
| 2025-01-14 | 1.0 | Initial capability documentation |
