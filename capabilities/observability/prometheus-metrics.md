# Prometheus Metrics

R.E.D method metrics (Rate, Errors, Duration) with custom labels for comprehensive monitoring.

---

## Metadata

| Field | Value |
|-------|-------|
| **Capability ID** | `cap-obs-004` |
| **Category** | Observability |
| **Status** | GA |
| **Availability** | Free / Pro / Enterprise |
| **Related Capabilities** | `cap-obs-001`, `cap-obs-005` |

---

## Quick Reference

### Name
Prometheus Metrics

### Tagline
Production-grade metrics for GraphQL operations.

### Elevator Pitch
Cosmo Router exposes comprehensive Prometheus metrics following the R.E.D method (Rate, Errors, Duration). Monitor request rates, error rates, and latency distributions for both router and subgraph traffic. With rich dimensional labels and customizable exclusions, get the insights you need without metric explosion.

---

## Problem & Solution

### The Problem
Operations teams need production-grade metrics to monitor federated GraphQL systems. They need visibility into request rates, error rates, and latency distributions - broken down by operation, client, and subgraph. Generic HTTP metrics lack GraphQL context, while custom instrumentation requires significant development effort and maintenance.

### The Solution
Cosmo Router automatically exposes Prometheus metrics with GraphQL-aware dimensions. The R.E.D metrics cover incoming router requests and outgoing subgraph requests, with labels for operation name, type, client, and error status. Built-in cardinality controls and regex-based exclusions prevent metric explosion while retaining essential observability.

### Before & After

| Before Cosmo | With Cosmo |
|--------------|------------|
| Generic HTTP metrics only | GraphQL-aware dimensional metrics |
| Manual instrumentation required | Automatic metric collection |
| No subgraph-level visibility | Per-subgraph request metrics |
| Uncontrolled cardinality growth | Built-in exclusions and limits |

---

## Key Benefits

1. **R.E.D Method Compliance**: Industry-standard metrics for Rate, Errors, and Duration
2. **GraphQL-Aware Dimensions**: Labels for operation name, type, client name/version
3. **Subgraph Visibility**: Separate metrics for each subgraph with timing breakdowns
4. **Cardinality Control**: Regex exclusions for metrics and labels prevent explosion
5. **Runtime Metrics**: Go runtime statistics for memory, GC, and goroutines

---

## Target Audience

### Primary Persona
- **Role**: SRE / DevOps Engineer
- **Pain Points**: Lack of GraphQL-specific metrics; metric cardinality issues; missing subgraph visibility
- **Goals**: Monitor production health; set up alerting; track SLOs

### Secondary Personas
- Platform engineers building monitoring dashboards
- Engineering managers tracking system performance
- Backend developers investigating issues

---

## Use Cases

### Use Case 1: SLO Monitoring
**Scenario**: The team needs to track 99th percentile latency for critical operations against their SLO.
**How it works**: Use the `router_http_request_duration_milliseconds` histogram with `histogram_quantile()` function, filtered by operation name.
**Outcome**: Automated alerting when p99 latency exceeds SLO threshold.

### Use Case 2: Subgraph Health Monitoring
**Scenario**: Operations needs visibility into which subgraphs are causing errors.
**How it works**: Monitor `router_http_requests_error_total` filtered by `wg_subgraph_name` to identify problematic services.
**Outcome**: Rapid identification of failing subgraphs enables targeted incident response.

### Use Case 3: Capacity Planning
**Scenario**: Platform team needs to understand traffic patterns for capacity planning.
**How it works**: Analyze `router_http_requests_total` rate over time, broken down by operation type and client.
**Outcome**: Data-driven infrastructure scaling decisions based on actual usage patterns.

---

## Competitive Positioning

### Key Differentiators
1. GraphQL-native dimensions (operation name, type, client)
2. Automatic subgraph-level metrics without configuration
3. Built-in cardinality controls with regex exclusions
4. OTEL foundation enables both Prometheus and OTEL export

### Comparison with Alternatives

| Aspect | Cosmo | Generic Router | Custom Solution |
|--------|-------|----------------|-----------------|
| GraphQL Dimensions | Native | None | Manual |
| Subgraph Metrics | Automatic | N/A | Manual |
| Cardinality Control | Built-in | Manual | Manual |
| Setup Effort | Config only | N/A | Significant |

### Common Objections & Responses

| Objection | Response |
|-----------|----------|
| "Too many labels cause cardinality issues" | Regex exclusions let you remove high-cardinality labels; built-in limit of 2000 combinations per metric |
| "We need custom metrics" | Custom attributes can be added from headers or expressions |
| "We use OTEL, not Prometheus" | Same metrics available via OTEL export; Prometheus is built on OTEL foundation |

---

## Technical Summary

### How It Works
The Router uses the OpenTelemetry SDK internally to collect metrics, which are then exported via a Prometheus exporter on a configurable endpoint (default: `http://localhost:8088/metrics`). Metrics follow the Prometheus naming convention with snake_case and appropriate suffixes.

### Key Technical Features

**Synchronous Metrics:**
- `router_http_requests_total`: Request count (router and subgraph)
- `router_http_request_duration_milliseconds`: Request latency histogram
- `router_http_requests_error_total`: Error count
- `router_http_requests_in_flight`: Concurrent request gauge
- `router_graphql_operation_planning_time`: Query planning duration

**Dimensions:**
- `wg_operation_name`: GraphQL operation name
- `wg_operation_type`: query, mutation, subscription
- `wg_client_name` / `wg_client_version`: Client identification
- `wg_subgraph_name` / `wg_subgraph_id`: Subgraph identification
- `http_status_code`: Response status

**Additional Metrics (Optional):**
- Cache metrics: hit/miss ratios, costs, keys
- Engine metrics: connections, subscriptions, triggers
- Connection metrics: pool utilization, acquisition duration
- Circuit breaker metrics: state, short-circuits

### Integration Points
- Prometheus server via scrape config
- Grafana for visualization
- Alertmanager for alerting
- Any Prometheus-compatible monitoring system

### Requirements & Prerequisites
- Prometheus server configured to scrape the metrics endpoint
- Network access to the metrics port (default: 8088)
- Optional: Grafana for dashboards

---

## Proof Points

### Metrics & Benchmarks
- Default export endpoint: `http://localhost:8088/metrics`
- Default cardinality limit: 2000 per metric
- Export interval: Prometheus scrape interval (configurable)

### Customer Quotes
> "The subgraph-level metrics were exactly what we needed to identify which services were causing latency spikes." - SRE Lead

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

- Primary docs: `/docs/router/metrics-and-monitoring`
- Metric reference: `/docs/router/metrics-and-monitoring/prometheus-metric-reference`
- Grafana integration: `/docs/router/metrics-and-monitoring/grafana`
- Configuration: `/docs/router/configuration#telemetry-2`

---

## Keywords & SEO

### Primary Keywords
- Prometheus GraphQL metrics
- GraphQL monitoring
- Federation metrics

### Secondary Keywords
- R.E.D method GraphQL
- Subgraph metrics
- GraphQL SLO monitoring

### Related Search Terms
- How to monitor GraphQL with Prometheus
- GraphQL latency metrics
- Federation subgraph monitoring
- GraphQL error rate tracking

---

## Version History

| Date | Version | Changes |
|------|---------|---------|
| 2025-01-14 | 1.0 | Initial capability documentation |
