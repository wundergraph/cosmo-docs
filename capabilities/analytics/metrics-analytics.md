# Metrics Analytics

## Metadata

| Field | Value |
|-------|-------|
| **Capability ID** | `cap-metrics-analytics` |
| **Category** | Analytics |
| **Status** | GA |
| **Availability** | Free / Pro / Enterprise |
| **Related Capabilities** | `cap-analytics-dashboard`, `cap-trace-analytics`, `cap-operations-tracking` |

---

## Quick Reference

### Name
Metrics Analytics

### Tagline
Request rate, latency, and error tracking at a glance.

### Elevator Pitch
Metrics Analytics provides a high-level performance overview of your federated graph with key indicators including request rate, P95 latency, and error percentage. Teams can quickly assess system health, identify trends over time, and drill down into specific time ranges or filter by operation name, client, and version.

---

## Problem & Solution

### The Problem
Engineering teams need to quickly understand the health and performance of their federated GraphQL API. Without aggregated metrics, teams must piece together information from multiple sources, making it difficult to get a quick overview of system status or identify when performance degraded.

### The Solution
Cosmo's Metrics Analytics presents the most important performance indicators in a clear, visual format. Request rate shows throughput, P95 latency reveals performance characteristics, and error rate highlights reliability issues. Time-based charts show how these metrics evolve, while filters allow teams to zoom in on specific operations or clients.

### Before & After

| Before Cosmo | With Cosmo |
|--------------|------------|
| Multiple dashboards for different metrics | Single unified metrics view |
| Delayed awareness of performance issues | Real-time visibility into request rate and latency |
| Aggregating error data from multiple services | Consolidated error rate across entire federated graph |
| Manual calculation of percentiles | Automatic P95 latency calculation |

---

## Key Benefits

1. **Instant Health Assessment**: See request rate, P95 latency, and error rate at a glance
2. **Trend Visualization**: Track how metrics change over time with visual charts
3. **Granular Filtering**: Filter metrics by operation name, client name, and client version
4. **Time Range Flexibility**: Analyze metrics across custom date ranges or predefined periods
5. **Error Breakdown**: Understand error distribution including 4xx and 5xx error types

---

## Target Audience

### Primary Persona
- **Role**: Site Reliability Engineer (SRE)
- **Pain Points**: Need quick visibility into system health; difficulty identifying performance degradation
- **Goals**: Maintain SLAs; proactively identify and address performance issues

### Secondary Personas
- Platform engineers monitoring API performance
- Engineering managers tracking reliability metrics
- DevOps teams maintaining operational dashboards

---

## Use Cases

### Use Case 1: Performance Baseline Establishment
**Scenario**: A team is launching a new federated graph and needs to establish performance baselines for SLA definition.
**How it works**: Use Metrics Analytics to observe request rate, P95 latency, and error rate over a representative time period. Filter by different operation types to understand performance characteristics of various query patterns.
**Outcome**: Team establishes realistic SLAs based on actual performance data and identifies operations that may need optimization.

### Use Case 2: Incident Detection
**Scenario**: An on-call engineer receives an alert and needs to quickly assess the situation.
**How it works**: Open Metrics Analytics to see current request rate (checking for traffic spikes or drops), P95 latency (identifying slowdowns), and error rate (quantifying failure impact). Use the error rate over time chart to identify when the issue started.
**Outcome**: Engineer quickly understands incident scope and timeline, enabling faster triage and communication.

### Use Case 3: Client-Specific Performance Analysis
**Scenario**: A mobile team reports that their app is experiencing slow GraphQL responses.
**How it works**: Filter metrics by the mobile client name and version to isolate their traffic. Compare P95 latency and error rate against other clients to determine if the issue is client-specific or systemic.
**Outcome**: Team determines whether the issue is specific to the mobile client's queries or a broader system problem, directing investigation appropriately.

---

## Technical Summary

### How It Works
Metrics Analytics aggregates telemetry data from the Cosmo Router collected via OpenTelemetry instrumentation. The system calculates request rate (average requests per minute), P95 latency (95th percentile response time), and error rate (percentage of 4xx and 5xx responses) for the selected time range. Data is visualized in charts showing trends over time.

### Key Technical Features
- Request rate (requests per minute) calculation
- P95 latency percentile computation
- Error rate aggregation including 4xx and 5xx responses
- Time-series visualization of errors and requests
- Filtering by operation name, client name, and client version

### Integration Points
- Cosmo Router (data source)
- OpenTelemetry (instrumentation)
- Cosmo Studio (visualization interface)

### Requirements & Prerequisites
- Cosmo Router with OTEL instrumentation enabled
- Sufficient traffic to generate meaningful metrics
- Client headers configured for client-specific filtering

---

## Documentation References

- Primary docs: `/docs/studio/analytics/metrics`
- Analytics overview: `/docs/studio/analytics`
- Traces documentation: `/docs/studio/analytics/traces`
- Client identification: `/docs/studio/analytics/client-identification`

---

## Keywords & SEO

### Primary Keywords
- GraphQL metrics
- API performance metrics
- Request rate monitoring

### Secondary Keywords
- P95 latency tracking
- GraphQL error rate
- Federation performance analytics

### Related Search Terms
- GraphQL latency monitoring
- API throughput metrics
- GraphQL error tracking
- Federation request metrics

---

## Version History

| Date | Version | Changes |
|------|---------|---------|
| 2025-01-14 | 1.0 | Initial capability documentation |
