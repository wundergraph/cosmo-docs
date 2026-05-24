# GraphiQL Playground++

Enhanced GraphQL IDE with Advanced Request Tracing (ART) visualization for testing and optimizing federated queries.

---

## Metadata

| Field | Value |
|-------|-------|
| **Capability ID** | `cap-dx-001` |
| **Category** | Developer Experience |
| **Status** | GA |
| **Availability** | Free / Pro / Enterprise |
| **Related Capabilities** | `cap-dx-002`, `cap-dx-003`, `cap-dx-006` |

---

## Quick Reference

### Name
GraphiQL Playground++

### Tagline
Debug federation with visual query execution tracing.

### Elevator Pitch
Cosmo's enhanced GraphiQL Playground provides developers with visual representations of query execution plans, detailed timing information, and subgraph-level inputs and outputs. Understand exactly how your federated queries execute across services with tree view and waterfall visualizations.

---

## Problem & Solution

### The Problem
Developers working with federated GraphQL architectures struggle to understand how their queries are executed across multiple subgraphs. Traditional GraphQL IDEs only show the final result, leaving developers blind to performance bottlenecks, parallel execution opportunities, and the actual data flow between services.

### The Solution
Cosmo's Playground++ extends the standard GraphiQL experience with Advanced Request Tracing (ART) visualization. By including the `X-WG-TRACE` header, developers get detailed visual breakdowns of query execution including timing per subgraph, parallel vs sequential execution paths, and the data transformations at each step.

### Before & After

| Before Cosmo | With Cosmo |
|--------------|------------|
| Only see final query response | Visual tree and waterfall views of execution |
| No visibility into subgraph performance | Precise timing for each subgraph call |
| Guessing at parallel execution | Clear visualization of parallel vs sequential paths |
| Manual debugging of slow queries | Instant identification of bottlenecks |

---

## Key Benefits

1. **Visual Execution Insight**: Tree view and waterfall visualizations show exactly how queries flow through your federated graph
2. **Performance Debugging**: Identify slow subgraphs and understand where time is spent in query execution
3. **Parallel Execution Visibility**: See which subgraph calls execute in parallel vs sequentially
4. **Subgraph-Level Details**: View inputs and outputs for each subgraph call in the execution chain
5. **Zero Configuration**: Works out of the box with the Cosmo Router using a simple header

---

## Target Audience

### Primary Persona
- **Role**: GraphQL Developer / Backend Engineer
- **Pain Points**: Debugging slow federated queries; understanding how queries are routed across subgraphs
- **Goals**: Optimize query performance; understand federation behavior; debug production issues quickly

### Secondary Personas
- Platform engineers optimizing federated graph performance
- DevOps teams investigating latency issues
- New team members learning the federated architecture

---

## Use Cases

### Use Case 1: Performance Optimization
**Scenario**: A product catalog query is taking 2 seconds to respond and the team needs to identify the bottleneck
**How it works**: Developer runs the query in Playground++ with the `X-WG-TRACE` header, views the waterfall visualization, and immediately sees that the inventory subgraph is taking 1.5 seconds
**Outcome**: Targeted optimization of the inventory subgraph reduces overall query time by 75%

### Use Case 2: Understanding Query Execution
**Scenario**: A new developer joins the team and needs to understand how a complex query executes across 5 subgraphs
**How it works**: The developer runs the query with tracing enabled and uses the tree view to see the complete execution plan, including which fields come from which subgraphs
**Outcome**: Developer quickly understands the federation architecture and can make informed decisions about query design

### Use Case 3: Debugging Parallel Execution
**Scenario**: A query that should be fast is unexpectedly slow; the team suspects parallel execution isn't working as expected
**How it works**: Using the waterfall view, the team sees that calls they expected to be parallel are actually sequential due to field dependencies
**Outcome**: Query restructured to enable proper parallelization, cutting response time in half

---

## Technical Summary

### How It Works
The Playground++ integrates with Cosmo Router's Advanced Request Tracing (ART) feature. When the `X-WG-TRACE` header is included in a request, the router captures detailed execution metadata and returns it alongside the response. The Playground parses this trace data and renders it in two visualization modes: tree view (hierarchical execution) and waterfall view (timeline-based).

### Key Technical Features
- Tree view showing hierarchical query execution
- Waterfall view showing parallel execution timing
- Subgraph-level timing metrics
- Input/output data inspection for each subgraph call
- Integrated with Advanced Request Tracing (ART)

### Integration Points
- Cosmo Router (requires ART support)
- Cosmo Studio web interface

### Requirements & Prerequisites
- Cosmo Router deployed with ART enabled
- `X-WG-TRACE` header included in playground requests

---

## Documentation References

- Primary docs: `/docs/studio/playground`
- ART documentation: `/docs/router/advanced-request-tracing-art`

---

## Keywords & SEO

### Primary Keywords
- GraphQL playground
- Query execution visualization
- Federation debugging

### Secondary Keywords
- GraphiQL enhanced
- Request tracing
- Subgraph performance

### Related Search Terms
- How to debug federated GraphQL queries
- GraphQL query performance visualization
- Federation query execution plan

---

## Version History

| Date | Version | Changes |
|------|---------|---------|
| 2025-01-14 | 1.0 | Initial capability documentation |
