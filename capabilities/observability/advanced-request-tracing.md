# Advanced Request Tracing (ART)

Detailed execution plan tracing with Playground visualization for deep debugging.

---

## Metadata

| Field | Value |
|-------|-------|
| **Capability ID** | `cap-obs-003` |
| **Category** | Observability |
| **Status** | GA |
| **Availability** | Free / Pro / Enterprise |
| **Related Capabilities** | `cap-obs-002`, `cap-obs-001` |

---

## Quick Reference

### Name
Advanced Request Tracing (ART)

### Tagline
See exactly how the Router resolves every request.

### Elevator Pitch
Advanced Request Tracing (ART) reveals the complete execution plan for every GraphQL request, showing exactly how the Router resolves queries across your federated graph. Debug complex queries, understand fetch patterns, and optimize performance with detailed timing and data flow visibility - directly in the GraphQL Playground.

---

## Problem & Solution

### The Problem
When GraphQL queries behave unexpectedly in a federated architecture, developers struggle to understand why. They cannot see the execution plan the router generates, what subgraph requests are made, in what order, or how data flows between fetches. Without this visibility, optimizing query performance or debugging unexpected behavior becomes guesswork.

### The Solution
ART renders the complete execution plan as JSON in the GraphQL response extensions. Developers see exactly what fetches the router performs (parallel, serial, entity, batch), the actual requests sent to subgraphs, input/output data for each operation, and precise timing information. This deep visibility enables rapid debugging and optimization directly from the Playground.

### Before & After

| Before Cosmo | With Cosmo |
|--------------|------------|
| Guessing how queries are executed | Complete execution plan visibility |
| Unknown subgraph request patterns | See parallel, serial, and batch fetches |
| No insight into data flow | View input/output for each fetch |
| Unclear latency sources | Precise timing for every operation |

---

## Key Benefits

1. **Complete Execution Visibility**: See the full execution plan including fetch order and dependencies
2. **Subgraph Request Details**: View actual requests sent to each subgraph with input data
3. **Performance Analysis**: Precise timing for planning and each load operation
4. **Production-Safe Debugging**: Secure mechanism enables debugging production routers from Studio
5. **Playground Integration**: Results displayed directly in the GraphQL Playground interface

---

## Target Audience

### Primary Persona
- **Role**: Backend Developer / GraphQL Engineer
- **Pain Points**: Cannot understand how federated queries are executed; difficulty optimizing complex queries
- **Goals**: Debug unexpected behavior; optimize query performance; understand federation execution

### Secondary Personas
- Platform engineers troubleshooting production issues
- DevOps engineers investigating slow requests
- Technical leads reviewing query patterns

---

## Use Cases

### Use Case 1: Query Optimization
**Scenario**: A product page query takes 2 seconds but the team cannot identify the bottleneck.
**How it works**: Enable ART in Playground, execute the query, examine the trace to see that 5 serial fetches are being made when they could be parallelized.
**Outcome**: Schema restructuring enables parallel fetches, reducing latency to 400ms.

### Use Case 2: Understanding Federation Behavior
**Scenario**: A developer is new to federation and wants to understand how their query is being resolved.
**How it works**: Enable ART for their query, see the execution plan showing entity fetches, key fields used, and data flow between subgraphs.
**Outcome**: Developer gains understanding of federation execution patterns and designs more efficient queries.

### Use Case 3: Production Debugging
**Scenario**: A specific query works in staging but fails intermittently in production.
**How it works**: Use the secure ART mechanism to trace the query against production router, compare execution plans between environments.
**Outcome**: Discover that production has different subgraph response shapes causing data mapping issues.

---

## Competitive Positioning

### Key Differentiators
1. Complete execution plan visibility including fetch dependencies
2. Secure production debugging via Cosmo Studio integration
3. Granular control over what trace data is included
4. Direct integration with GraphQL Playground

### Comparison with Alternatives

| Aspect | Cosmo ART | Query Plans | Manual Logging |
|--------|-----------|-------------|----------------|
| Execution Plan | Full detail | Partial | None |
| Fetch Details | Input/Output | Limited | Manual |
| Production Safe | Yes | N/A | Risk |
| Setup Required | Enabled by default | Schema changes | Code changes |

### Common Objections & Responses

| Objection | Response |
|-----------|----------|
| "Security concern in production" | ART requires secure authentication via control plane connection; never exposes data to unauthorized users |
| "Performance overhead" | ART is only active when explicitly requested via header; no overhead on normal requests |
| "Too much information" | Configurable exclusions let you omit planner stats, input data, or output data as needed |

---

## Technical Summary

### How It Works
When ART is enabled via the `X-WG-Trace` header or `wg_trace` query parameter, the Router captures detailed execution information and includes it in the response under `extensions.trace`. This includes the execution plan structure, fetch types (parallel, serial, entity, batch), actual subgraph requests, input/output data, and timing information.

### Key Technical Features
- Enabled by default (can be disabled via `ENGINE_ENABLE_REQUEST_TRACING=false`)
- Activated per-request via header (`X-WG-Trace=true`) or query parameter (`wg_trace=true`)
- Configurable exclusions: planner stats, raw input, rendered input, output, load stats
- Secure production access requires control plane connection (Router 0.42.3+)
- Debug mode available in development via `DEV_MODE=true`

### Integration Points
- GraphQL Playground for visualization
- Cosmo Studio for secure production access
- Control Plane for authentication

### Requirements & Prerequisites
- Cosmo Router 0.42.3+ for production debugging
- Control Plane connection for secure access
- Development mode (`DEV_MODE=true`) for local debugging

---

## Proof Points

### Metrics & Benchmarks
- Zero overhead when not activated
- Complete trace data in response extensions
- Works with all GraphQL operation types (except subscriptions currently)

### Customer Quotes
> "ART changed how we debug federation issues. Being able to see exactly what requests go to which subgraphs saved us countless hours." - GraphQL Platform Engineer

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

- Primary docs: `/docs/router/advanced-request-tracing-art`
- Configuration reference: `/docs/router/configuration`

---

## Keywords & SEO

### Primary Keywords
- GraphQL execution plan
- Federation request tracing
- Query debugging GraphQL

### Secondary Keywords
- GraphQL performance debugging
- Federated query optimization
- Subgraph request visibility

### Related Search Terms
- How to debug GraphQL federation
- GraphQL query execution plan
- Federation fetch optimization
- GraphQL slow query debugging

---

## Version History

| Date | Version | Changes |
|------|---------|---------|
| 2025-01-14 | 1.0 | Initial capability documentation |
