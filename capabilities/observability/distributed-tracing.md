# Distributed Tracing

End-to-end request tracing across federated services with visualization in Cosmo Studio.

---

## Metadata

| Field | Value |
|-------|-------|
| **Capability ID** | `cap-obs-002` |
| **Category** | Observability |
| **Status** | GA |
| **Availability** | Pro / Enterprise |
| **Related Capabilities** | `cap-obs-001`, `cap-obs-003` |

---

## Quick Reference

### Name
Distributed Tracing

### Tagline
Debug federation issues in minutes, not hours.

### Elevator Pitch
Distributed Tracing provides end-to-end visibility into every GraphQL request as it flows through your federated graph. Instantly identify slow subgraphs, pinpoint errors, and understand the complete request lifecycle - all from a single dashboard in Cosmo Studio.

---

## Problem & Solution

### The Problem
When a GraphQL query fails or performs slowly in a federated architecture, developers waste hours trying to identify which subgraph is responsible. With requests potentially touching dozens of services, traditional logging and monitoring tools lack the context needed to correlate events across service boundaries. Teams spend more time debugging than building features.

### The Solution
Cosmo's Distributed Tracing automatically instruments your entire federated graph, capturing detailed timing and context for every operation. Each request gets a unique trace ID that follows it through the Router and into each subgraph, making it trivial to identify exactly where issues occur. The Studio UI provides interactive visualization with span details, attributes, and error information.

### Before & After

| Before Cosmo | With Cosmo |
|--------------|------------|
| Hours spent correlating logs across services | Single trace view shows complete request path |
| Guessing which subgraph caused latency | Precise timing breakdown per subgraph |
| No visibility into resolver-level performance | Span-level execution insights |
| Manual trace ID propagation | Automatic trace context propagation |

---

## Key Benefits

1. **Reduce MTTR by 80%**: Pinpoint the exact subgraph and resolver causing issues within minutes
2. **Proactive Performance Optimization**: Identify slow paths before users complain
3. **Zero-Code Instrumentation**: Works automatically with the Cosmo Router
4. **OpenTelemetry Compatible**: Export traces to your existing observability stack
5. **Auto-Refresh UI**: Dashboard updates every 10 seconds for real-time monitoring

---

## Target Audience

### Primary Persona
- **Role**: Platform Engineer / SRE
- **Pain Points**: On-call debugging is painful; lack of visibility into federated requests; correlating errors across services
- **Goals**: Reduce incident response time; maintain SLAs; proactive issue detection

### Secondary Personas
- Backend developers debugging performance issues
- Engineering managers tracking system health
- DevOps engineers monitoring production systems

---

## Use Cases

### Use Case 1: Production Incident Response
**Scenario**: A critical checkout API starts returning errors intermittently during peak traffic.
**How it works**: Filter traces by error status in Studio, see the exact subgraph returning errors, view the error message, extension codes, and full stack trace in the span details.
**Outcome**: Root cause identified in 5 minutes instead of 2 hours - the inventory subgraph was timing out due to database connection exhaustion.

### Use Case 2: Performance Optimization
**Scenario**: Users report slow page loads on the product catalog, but the team cannot identify the bottleneck.
**How it works**: Analyze traces for the product query in Studio, identify the inventory subgraph adding 800ms latency, drill into specific span to see the slow database query.
**Outcome**: Targeted optimization of database indexes reduces latency by 60%.

### Use Case 3: New Deployment Validation
**Scenario**: After deploying a new version of the reviews subgraph, the team wants to verify performance hasn't regressed.
**How it works**: Compare trace durations before and after deployment, filter by config version to isolate the new deployment's behavior.
**Outcome**: Early detection of a regression allows rollback before users are impacted.

---

## Competitive Positioning

### Key Differentiators
1. GraphQL-native trace visualization with operation context
2. Automatic instrumentation requiring no code changes
3. Integrated with Cosmo Studio for unified experience
4. Supports trace context propagation across service boundaries

### Comparison with Alternatives

| Aspect | Cosmo | Generic APM | DIY Tracing |
|--------|-------|-------------|-------------|
| GraphQL-Aware | Yes | No | Manual |
| Setup Effort | Zero-config | Integration required | Significant |
| Federation Support | Native | Limited | Manual |
| Unified Dashboard | Yes | Separate tool | Custom |

### Common Objections & Responses

| Objection | Response |
|-----------|----------|
| "We already have Jaeger/Datadog" | Export traces to both Cosmo Cloud and your existing backend simultaneously |
| "Tracing adds latency" | Sampling and async export ensure minimal overhead on request path |
| "Our services already have tracing" | Cosmo propagates trace context so your existing spans are correlated with router spans |

---

## Technical Summary

### How It Works
The Cosmo Router automatically creates spans for each request phase: parsing, validation, planning, and execution. When the router fetches data from subgraphs, it propagates the trace context using W3C Trace Context headers. Subgraph spans are collected and displayed alongside router spans in the Studio UI, providing a complete view of the request lifecycle.

### Key Technical Features
- W3C Trace Context propagation (default)
- Optional Jaeger, B3, and Baggage propagation support
- Request trace ID in response headers (configurable)
- GraphQL variables export for query replay
- Span attributes with operation details
- Error capture with stack traces

### Integration Points
- Cosmo Studio for visualization
- Any OpenTelemetry-compatible backend
- Existing APM tools via trace context propagation
- GraphQL Playground for query replay

### Requirements & Prerequisites
- Cosmo Router with tracing enabled (default)
- Subgraphs should propagate trace context for complete traces
- Studio access for visualization

---

## Proof Points

### Metrics & Benchmarks
- Auto-refresh interval: 10 seconds
- Trace retention: Based on plan tier
- Zero additional code required for basic tracing

### Customer Quotes
> "Before Cosmo, debugging federated queries was like finding a needle in a haystack. Now I can see exactly which subgraph is causing issues in seconds." - Senior Backend Engineer

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

- Primary docs: `/docs/studio/analytics/distributed-tracing`
- Tracing configuration: `/docs/router/open-telemetry`
- Trace propagation: `/docs/router/open-telemetry#trace-propagation`

---

## Keywords & SEO

### Primary Keywords
- Distributed tracing GraphQL
- GraphQL federation debugging
- Request tracing visualization

### Secondary Keywords
- GraphQL performance monitoring
- Federated graph observability
- Trace context propagation

### Related Search Terms
- How to debug federated GraphQL
- GraphQL slow query analysis
- End-to-end request tracing
- Subgraph latency debugging

---

## Version History

| Date | Version | Changes |
|------|---------|---------|
| 2025-01-14 | 1.0 | Initial capability documentation |
