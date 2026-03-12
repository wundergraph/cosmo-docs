# Operations Tracking

## Metadata

| Field | Value |
|-------|-------|
| **Capability ID** | `cap-operations-tracking` |
| **Category** | Analytics |
| **Status** | GA |
| **Availability** | Free / Pro / Enterprise |
| **Related Capabilities** | `cap-analytics-dashboard`, `cap-trace-analytics`, `cap-schema-field-usage`, `cap-client-identification` |

---

## Quick Reference

### Name
Operations Tracking

### Tagline
Monitor and analyze every operation with detailed insights.

### Elevator Pitch
Operations Tracking provides a comprehensive view into all GraphQL operations executed against your federated graph. Monitor performance metrics, identify deprecated field usage, track client consumption patterns, and navigate seamlessly to detailed traces. Make safe schema changes with data-driven insights and debug performance issues by sorting operations by latency or error rate.

---

## Problem & Solution

### The Problem
Managing a federated GraphQL API requires understanding which operations are being executed, how they perform, and which clients use them. Without operation-level visibility, teams struggle to prioritize optimization efforts, plan schema migrations, or identify problematic queries impacting system reliability.

### The Solution
Cosmo's Operations Tracking centralizes all operation data into a searchable, filterable interface. Teams can sort operations by request count, latency, or error rate to identify priorities. Deprecated field indicators highlight operations needing migration attention. Client usage data enables targeted communication. Direct navigation to traces enables deep-dive debugging.

### Before & After

| Before Cosmo | With Cosmo |
|--------------|------------|
| Unknown operation inventory | Complete list of all executed operations |
| Guessing which operations cause issues | Sort by latency or error rate to find problems |
| Manual tracking of deprecated field usage | Automatic indicators for deprecated field usage |
| Disconnected metrics and traces | Seamless navigation from operations to traces |

---

## Key Benefits

1. **Complete Operation Inventory**: See every operation executed against your federated graph
2. **Performance Prioritization**: Sort by latency, request count, or error rate to focus optimization efforts
3. **Deprecated Field Tracking**: Identify operations using deprecated fields and affected clients
4. **Client Usage Visibility**: Track which clients use each operation for impact analysis
5. **Integrated Debugging**: Navigate directly to traces with pre-applied filters for deep investigation

---

## Target Audience

### Primary Persona
- **Role**: Platform Engineer / API Owner
- **Pain Points**: Difficulty prioritizing optimization; uncertainty about schema change impact
- **Goals**: Maintain API performance; evolve schema safely; understand operation usage

### Secondary Personas
- Backend developers debugging specific operations
- Engineering managers planning capacity and migrations
- SREs identifying problematic operations during incidents

---

## Use Cases

### Use Case 1: Performance Optimization Prioritization
**Scenario**: An engineering team has limited time for optimization and needs to identify which operations will have the most impact.
**How it works**: Open the Operations page and sort by request count to see highest-traffic operations. Then sort by latency to identify slowest operations. Cross-reference to find high-traffic, high-latency operations that would benefit most from optimization.
**Outcome**: Team prioritizes optimization efforts based on data, maximizing impact of limited engineering time.

### Use Case 2: Schema Migration Planning
**Scenario**: A team is planning to remove deprecated fields and needs to understand migration scope.
**How it works**: Use the deprecated fields filter to show only operations using deprecated fields. For each operation, view the client usage data to understand which teams need to migrate. Use this data to create a migration timeline and communication plan.
**Outcome**: Team creates a comprehensive migration plan with clear timelines and targeted client communication.

### Use Case 3: Incident Investigation
**Scenario**: An incident is detected with elevated error rates and the team needs to identify affected operations.
**How it works**: Open the Operations page and sort by error rate in descending order. Identify operations with highest error rates. Click through to traces with pre-applied filters to investigate specific failures. View the operation content to understand the query structure.
**Outcome**: Team quickly identifies problematic operations and traces specific failures for root cause analysis.

### Use Case 4: Client Impact Analysis
**Scenario**: Before making a change to an operation's behavior, the team needs to understand client impact.
**How it works**: Select the target operation and view the client usage section. See all clients using this operation along with their request counts. Identify high-usage clients for proactive communication about the upcoming change.
**Outcome**: Team communicates changes to affected clients before deployment, preventing unexpected breakage.

---

## Technical Summary

### How It Works
Operations Tracking aggregates data from all requests processed by the Cosmo Router. Operations are identified by name (or marked as "Unnamed Operation") and type (Query, Mutation, Subscription). Performance metrics are calculated for each operation, and usage is correlated with client identification headers. Deprecated field usage is determined by comparing operations against the current schema.

### Key Technical Features
- Searchable, filterable operation list
- Search by operation name or hash
- Sort by request count, latency, or error rate
- Deprecated fields filter and indicators
- Client name filtering
- Flexible date range selection with retention limit awareness
- Two-panel layout: operation list and detail view
- Client usage breakdown per operation
- Performance charts (request rate, P95 latency, error percentage)
- Direct navigation to traces with pre-applied filters
- Operation content inspection with syntax highlighting

### Integration Points
- Cosmo Router (operation data collection)
- Analytics Traces (navigation with filters)
- Schema (deprecated field detection)
- Client identification (usage attribution)

### Requirements & Prerequisites
- Cosmo Router deployed with telemetry enabled
- Client identification headers for client usage tracking
- Schema with deprecation directives for deprecated field detection

---

## Documentation References

- Primary docs: `/docs/studio/operations`
- Analytics overview: `/docs/studio/analytics`
- Traces documentation: `/docs/studio/analytics/traces`
- Schema Field Usage: `/docs/studio/analytics/schema-field-usage`
- Client identification: `/docs/studio/analytics/client-identification`

---

## Keywords & SEO

### Primary Keywords
- GraphQL operations monitoring
- API operation analytics
- GraphQL query tracking

### Secondary Keywords
- Operation performance metrics
- Deprecated field tracking
- GraphQL operation debugging

### Related Search Terms
- GraphQL operation list
- API operation performance
- Track GraphQL queries
- Monitor GraphQL mutations
- GraphQL operation client usage

---

## Version History

| Date | Version | Changes |
|------|---------|---------|
| 2025-01-14 | 1.0 | Initial capability documentation |
