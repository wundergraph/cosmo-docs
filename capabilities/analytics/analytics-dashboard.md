# Analytics Dashboard

## Metadata

| Field | Value |
|-------|-------|
| **Capability ID** | `cap-analytics-dashboard` |
| **Category** | Analytics |
| **Status** | GA |
| **Availability** | Free / Pro / Enterprise |
| **Related Capabilities** | `cap-metrics-analytics`, `cap-trace-analytics`, `cap-schema-field-usage`, `cap-client-identification` |

---

## Quick Reference

### Name
Analytics Dashboard

### Tagline
Comprehensive request analytics with powerful filtering and grouping.

### Elevator Pitch
The Analytics Dashboard provides a detailed breakdown of all requests made to your federated graph. With built-in grouping, filtering, and date range selection, teams can quickly analyze API traffic patterns, identify performance bottlenecks, and understand how clients interact with their GraphQL services.

---

## Problem & Solution

### The Problem
Platform teams managing federated GraphQL APIs need visibility into request patterns, but raw logs and basic metrics lack the context needed to understand how different operations, clients, and time periods affect system behavior. Without proper analytics, teams struggle to identify trends, debug issues, and make data-driven decisions about their API.

### The Solution
Cosmo's Analytics Dashboard centralizes all request data into a single, intuitive interface. It provides multiple views including metrics, traces, schema field usage, and client identification, with powerful filtering and grouping capabilities that let teams slice and dice their data to answer any question about their API traffic.

### Before & After

| Before Cosmo | With Cosmo |
|--------------|------------|
| Scattered logs across multiple services | Unified analytics dashboard for entire federated graph |
| Manual correlation of metrics and traces | Integrated views linking metrics to individual requests |
| Limited filtering on raw data | Rich filtering by operation, client, date range, and more |
| No grouping capabilities | Group by operation name, client, or error message |

---

## Key Benefits

1. **Unified Visibility**: Single dashboard for all federated graph analytics including metrics, traces, and field usage
2. **Flexible Analysis**: Group data by operation name, client, or error message to identify patterns
3. **Time-Based Insights**: Select custom date ranges or predefined periods to analyze trends over time
4. **Filter-Driven Investigation**: Narrow down to specific requests using powerful filtering capabilities
5. **Integrated Views**: Seamlessly navigate between metrics overview, individual traces, and schema usage

---

## Target Audience

### Primary Persona
- **Role**: Platform Engineer / SRE
- **Pain Points**: Need comprehensive visibility into API traffic; difficulty correlating metrics across federated services
- **Goals**: Monitor system health; identify performance issues; understand client usage patterns

### Secondary Personas
- API developers debugging specific operations
- Engineering managers tracking API adoption and usage
- Product teams understanding feature usage through API traffic

---

## Use Cases

### Use Case 1: Traffic Pattern Analysis
**Scenario**: An engineering team wants to understand peak usage times and traffic distribution across their federated graph.
**How it works**: Use the Analytics Dashboard to select a date range spanning a week, then group by operation name to see which operations drive the most traffic. Use the metrics view to visualize request rates over time.
**Outcome**: Team identifies peak hours and most-used operations, enabling capacity planning and optimization prioritization.

### Use Case 2: Client Usage Monitoring
**Scenario**: A platform team needs to understand which client applications are consuming their API and how usage varies by client version.
**How it works**: Navigate to the Analytics Dashboard and group data by client. Filter by date range to compare usage across different time periods. Drill down into specific clients to see their operation patterns.
**Outcome**: Team gains visibility into client adoption, can identify outdated client versions, and prioritize client-specific optimizations.

### Use Case 3: Error Investigation
**Scenario**: A spike in errors is detected and the team needs to identify the root cause.
**How it works**: Use the Analytics Dashboard to filter by error status and group by error message. Identify the most common errors, then drill down to specific traces to understand the context of failures.
**Outcome**: Team quickly identifies the error pattern and can trace it back to specific operations or clients causing issues.

---

## Technical Summary

### How It Works
The Analytics Dashboard aggregates telemetry data collected by the Cosmo Router through OpenTelemetry instrumentation. Data is stored and indexed to enable fast querying with filters and grouping. The dashboard provides multiple views (metrics, traces, field usage) that share the same underlying data with consistent filtering capabilities.

### Key Technical Features
- Date range selection with predefined ranges and custom date/time picker
- Multiple grouping options: none, operation name, client, error message
- Cross-view navigation between metrics, traces, and field usage
- Real-time data with configurable auto-refresh intervals
- Filter persistence across views

### Integration Points
- Cosmo Router (data collection)
- OpenTelemetry (instrumentation standard)
- Cosmo Studio (visualization)

### Requirements & Prerequisites
- Cosmo Router deployed and configured
- OTEL instrumentation enabled on the router
- Client applications configured with proper headers for client identification

---

## Documentation References

- Primary docs: `/docs/studio/analytics`
- Metrics documentation: `/docs/studio/analytics/metrics`
- Traces documentation: `/docs/studio/analytics/traces`
- Schema Field Usage: `/docs/studio/analytics/schema-field-usage`
- Client Identification: `/docs/studio/analytics/client-identification`

---

## Keywords & SEO

### Primary Keywords
- GraphQL analytics
- Federated graph analytics
- API request analytics

### Secondary Keywords
- GraphQL metrics dashboard
- API traffic analysis
- Federation observability

### Related Search Terms
- GraphQL monitoring dashboard
- Federated GraphQL analytics
- API request filtering and grouping
- GraphQL client usage tracking

---

## Version History

| Date | Version | Changes |
|------|---------|---------|
| 2025-01-14 | 1.0 | Initial capability documentation |
