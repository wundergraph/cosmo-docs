# Query Plan Visualization

Visual query execution plans for debugging and understanding federated query routing.

---

## Metadata

| Field | Value |
|-------|-------|
| **Capability ID** | `cap-dx-006` |
| **Category** | Developer Experience |
| **Status** | GA |
| **Availability** | Free / Pro / Enterprise |
| **Related Capabilities** | `cap-dx-001` |

---

## Quick Reference

### Name
Query Plan Visualization

### Tagline
See how your queries execute across subgraphs.

### Elevator Pitch
Cosmo's Query Plan Visualization shows developers exactly how the router will execute a federated GraphQL query. View the query plan directly in the playground to understand subgraph routing, execution order, and data fetching strategies before your query even runs. Debug query behavior and optimize performance with complete visibility into federation mechanics.

---

## Problem & Solution

### The Problem
Federated GraphQL queries are executed across multiple subgraphs, but developers have no visibility into how the router plans this execution. When queries behave unexpectedly or perform poorly, there's no way to understand the underlying routing logic. Debugging requires guesswork and trial-and-error.

### The Solution
Query Plan Visualization exposes the router's internal query plan directly in the playground. By including the `X-WG-Include-Query-Plan` header, developers receive the complete execution plan in the response extensions. The plan shows which subgraphs will be called, in what order, and how data will be fetched and merged.

### Before & After

| Before Cosmo | With Cosmo |
|--------------|------------|
| Query routing is a black box | Full visibility into execution plan |
| Debugging requires guesswork | See exact subgraph calls before execution |
| No insight into fetch strategy | Understand parallel vs sequential execution |
| Performance issues hard to diagnose | Identify routing inefficiencies upfront |

---

## Key Benefits

1. **Execution Transparency**: See exactly which subgraphs will be called and in what order
2. **Pre-Execution Analysis**: View the plan without actually making subgraph requests using `X-WG-Skip-Loader`
3. **Performance Insight**: Understand parallel vs sequential execution before running queries
4. **Debug Without Traces**: Analyze plans without generating trace data using `X-WG-Disable-Tracing`
5. **Playground Integration**: View plans directly in Cosmo Studio's playground interface

---

## Target Audience

### Primary Persona
- **Role**: GraphQL Developer / Platform Engineer
- **Pain Points**: Understanding federation routing; debugging unexpected query behavior; optimizing query performance
- **Goals**: Understand how queries execute; identify optimization opportunities; debug federation issues

### Secondary Personas
- Performance engineers analyzing query efficiency
- Developers learning federation concepts
- DevOps teams troubleshooting production queries

---

## Use Cases

### Use Case 1: Understanding Query Routing
**Scenario**: A developer is new to federation and wants to understand how a complex query will be routed across 4 subgraphs
**How it works**: The developer writes the query in the playground, adds the `X-WG-Include-Query-Plan` header, and runs the query. The extensions field in the response contains the complete query plan showing each subgraph call.
**Outcome**: Developer understands federation routing without reading federation internals documentation

### Use Case 2: Pre-Execution Performance Analysis
**Scenario**: Before running an expensive query in production, an engineer wants to understand its execution plan without generating traffic
**How it works**: The engineer uses both `X-WG-Include-Query-Plan` and `X-WG-Skip-Loader` headers. This returns the query plan but skips actual subgraph requests (data returns as null).
**Outcome**: Complete execution plan analysis with zero production impact

### Use Case 3: Debugging Query Inefficiencies
**Scenario**: A query is making more subgraph calls than expected, and the team needs to understand why
**How it works**: The team examines the query plan to see the exact sequence of fetches. They discover that a field dependency is causing an extra round-trip that could be eliminated with schema changes.
**Outcome**: Schema optimized to reduce subgraph calls and improve query performance

---

## Technical Summary

### How It Works
When the `X-WG-Include-Query-Plan` header is included in a request, the Cosmo Router includes the query plan in the response's extensions field. The plan describes the fetch operations, their dependencies, and which subgraphs they target. Additional headers provide control over execution behavior.

### Key Technical Features
- `X-WG-Include-Query-Plan`: Request query plan in response extensions
- `X-WG-Skip-Loader`: Skip subgraph requests, return null data (for plan-only analysis)
- `X-WG-Disable-Tracing`: Exclude from tracing (avoid trace noise)
- Plan shows fetch operations and dependencies
- Integrated visualization in Cosmo Studio playground

### Integration Points
- Cosmo Router
- Cosmo Studio Playground

### Requirements & Prerequisites
- Cosmo Router deployed
- Access to Cosmo Studio playground

---

## Documentation References

- Primary docs: `/docs/router/query-plan`
- Playground overview: `/docs/studio/playground`

---

## Keywords & SEO

### Primary Keywords
- Query plan visualization
- GraphQL execution plan
- Federation query debugging

### Secondary Keywords
- Subgraph routing
- Query optimization
- Federation debugging

### Related Search Terms
- How to see GraphQL query plan
- Debug federated GraphQL queries
- Understand federation execution

---

## Version History

| Date | Version | Changes |
|------|---------|---------|
| 2025-01-14 | 1.0 | Initial capability documentation |
