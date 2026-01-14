# Query Planning

## Metadata

| Field | Value |
|-------|-------|
| **Capability ID** | `cap-router-002` |
| **Category** | Router |
| **Status** | GA |
| **Availability** | Free |
| **Related Capabilities** | `cap-router-001`, `cap-router-003` |

---

## Quick Reference

### Name
Query Planning

### Tagline
Intelligent query plan generation for optimal federated execution.

### Elevator Pitch
Cosmo Router's query planning engine intelligently breaks down GraphQL operations into optimized execution plans across your federated subgraphs. Visualize query plans in the Studio Playground, batch generate plans for testing, and gain deep insights into how your federated queries are resolved.

---

## Problem & Solution

### The Problem
In federated GraphQL architectures, a single client query may need to fetch data from multiple subgraphs in a specific order while respecting entity relationships. Without proper query planning, this leads to inefficient execution patterns, excessive network calls, and unpredictable performance. Teams lack visibility into how queries are decomposed and executed across their distributed services.

### The Solution
The Cosmo Router creates highly-optimized query plans that determine the most efficient execution strategy for each operation. Plans are cached across requests to maximize performance. Developers can inspect query plans directly in the Studio Playground using special headers, and batch generate plans offline for testing and CI/CD validation.

### Before & After

| Before Cosmo | With Cosmo |
|--------------|------------|
| Black-box query execution | Transparent query plan visualization |
| Guessing at query efficiency | Clear execution path with timing data |
| Manual testing of query plans | Automated batch plan generation for CI/CD |
| No insight into resolver paths | Visual breakdown of subgraph calls |

---

## Key Benefits

1. **Execution Transparency**: View the complete query plan showing how operations are decomposed and which subgraphs handle each part
2. **Performance Optimization**: Understand query execution paths to identify optimization opportunities and reduce latency
3. **Plan Caching**: Query plans are cached across requests, eliminating redundant planning overhead
4. **Batch Generation**: Generate query plans for entire operation libraries offline for validation and testing
5. **CI/CD Integration**: Fail builds if operations become unplannable after schema changes

---

## Target Audience

### Primary Persona
- **Role**: Backend Developer / API Developer
- **Pain Points**: Difficulty understanding how federated queries resolve; need to validate queries before deployment; troubleshooting slow operations
- **Goals**: Gain visibility into query execution; ensure operations are optimal; catch planning issues before production

### Secondary Personas
- Platform engineers optimizing federation performance
- QA engineers validating schema changes
- Technical architects designing federated schemas

---

## Use Cases

### Use Case 1: Debugging Slow Queries
**Scenario**: A GraphQL operation is performing slower than expected, and the team needs to understand why
**How it works**: Add the `X-WG-Include-Query-Plan` header to the request; the query plan is returned in the response extensions field showing the complete execution path and subgraph calls
**Outcome**: Clear visibility into which subgraphs are called and in what order, enabling targeted optimization

### Use Case 2: CI/CD Query Validation
**Scenario**: A team wants to ensure all production queries remain valid and plannable after schema changes
**How it works**: Use the `router query-plan` CLI command to batch generate query plans for all operations; configure `-fail-on-error` to fail the CI build if any query cannot be planned
**Outcome**: Automated prevention of breaking changes reaching production

### Use Case 3: Schema Change Impact Analysis
**Scenario**: Before merging a schema change, the team wants to understand how it affects query execution
**How it works**: Generate query plans using both the current and proposed execution configs; compare the plans and timing reports to identify changes in execution patterns
**Outcome**: Data-driven decision making for schema evolution with clear understanding of execution impact

---

## Technical Summary

### How It Works
When a GraphQL operation arrives, the router's query planner analyzes the federated schema and generates an execution plan. This plan specifies which subgraphs to query, in what order, and how to combine the results. Plans are cached using the operation hash, so subsequent identical operations skip the planning phase entirely.

### Key Technical Features
- Request the query plan via `X-WG-Include-Query-Plan` header
- Skip subgraph execution with `X-WG-Skip-Loader` for plan-only inspection
- Disable tracing for plan requests with `X-WG-Disable-Tracing`
- Batch plan generation with configurable concurrency
- JSON or text output format for query plans
- Detailed timing metrics (parse, normalize, validate, plan times)

### Integration Points
- Cosmo Studio Playground for visual inspection
- CI/CD pipelines via CLI command
- Execution config from CDN or local file
- Report generation in JSON format

### Requirements & Prerequisites
- Router version 0.185.0 or later for batch generation
- Execution configuration file (from CDN or `wgc router compose`)
- Operations folder for batch generation

---

## Documentation References

- Primary docs: `/docs/router/query-plan`
- Batch generation: `/docs/router/query-plan/batch-generate-query-plans`
- Local development tutorial: `/docs/tutorial/mastering-local-development-for-graphql-federation`

---

## Keywords & SEO

### Primary Keywords
- GraphQL Query Planning
- Federation Query Plan
- Query Plan Visualization

### Secondary Keywords
- GraphQL Query Optimization
- Federated Query Execution
- Query Plan Generation

### Related Search Terms
- How GraphQL federation works
- Optimize federated GraphQL queries
- GraphQL query debugging
- Federation execution plan
