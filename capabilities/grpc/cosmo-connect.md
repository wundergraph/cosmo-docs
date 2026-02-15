# Cosmo Connect

---

## Metadata

| Field | Value |
|-------|-------|
| **Capability ID** | `cap-grpc-001` |
| **Category** | gRPC |
| **Status** | Beta |
| **Availability** | Free, Pro, Enterprise |
| **Related Capabilities** | `cap-grpc-002`, `cap-grpc-003` |

---

## Quick Reference

### Name
Cosmo Connect

### Tagline
Federate without boundaries: integrate any backend into your supergraph.

### Elevator Pitch
Cosmo Connect enables GraphQL Federation without requiring backend teams to run GraphQL servers or frameworks. By compiling GraphQL into gRPC, it moves the complexity of the query language into the Router, allowing teams to implement familiar gRPC contracts in any supported language while gaining all the benefits of federation.

---

## Problem & Solution

### The Problem
Organizations wanting to adopt GraphQL Federation face a significant barrier: backend teams must learn GraphQL and migrate their existing REST, gRPC, SOAP, or legacy services to a Federation-compatible framework. This requirement creates friction, slows adoption, and limits the languages and frameworks teams can use. Poor GraphQL server library support in certain ecosystems further compounds the challenge.

### The Solution
Cosmo Connect eliminates this barrier by allowing teams to define an Apollo-compatible Subgraph Schema, compile it into a protobuf definition, and implement it using any gRPC stack (Go, Java, C#, Python, Rust, and many others). No GraphQL knowledge or specific framework is required. The Cosmo Router handles all GraphQL query planning, batching, and response aggregation, while backend teams work with familiar request/response semantics.

### Before & After

| Before Cosmo | With Cosmo |
|--------------|------------|
| Backend teams must learn GraphQL to participate in federation | Teams implement familiar gRPC contracts without GraphQL knowledge |
| Limited language options due to poor GraphQL library support | Any language with gRPC support can participate in the supergraph |
| Migrating legacy systems requires full GraphQL subgraph rewrites | Wrap existing APIs (REST, SOAP) without building full subgraphs |
| Each subgraph framework has varying spec compliance and quality | Strongly-typed proto definitions guarantee correct implementations |

---

## Key Benefits

1. **Federation Without GraphQL Servers**: Backend teams implement gRPC contracts instead of GraphQL resolvers, eliminating the need for GraphQL expertise across all teams.

2. **Language Flexibility**: Leverage gRPC code generation across nearly all ecosystems, including those with limited GraphQL server library support.

3. **Reduced Migration Effort**: Wrap existing APIs (REST, SOAP, legacy systems) without writing full subgraphs, lowering the cost of moving from monoliths to federation.

4. **All Cosmo Platform Benefits**: Breaking change detection, centralized telemetry, governance, and observability work out of the box.

5. **No N+1 Problems**: Unlike declarative approaches, Cosmo Connect leverages the Router's DataLoader capabilities which batch requests by default.

---

## Target Audience

### Primary Persona
- **Role**: Platform Engineer / API Architect
- **Pain Points**: Difficulty getting all backend teams to adopt GraphQL; existing investments in REST/gRPC services; heterogeneous tech stacks across teams
- **Goals**: Unify APIs under a single GraphQL gateway without forcing organizational-wide technology changes; accelerate federation adoption

### Secondary Personas
- Backend developers who prefer working with gRPC over GraphQL
- Engineering managers looking to reduce migration costs and timelines
- Teams maintaining legacy systems that need integration with modern APIs

---

## Use Cases

### Use Case 1: Integrating Legacy REST APIs
**Scenario**: A financial services company has dozens of critical REST APIs that cannot be rewritten but need to be exposed through a unified GraphQL API.
**How it works**: Define a GraphQL subgraph schema representing the REST API's capabilities, generate protobuf definitions, implement a thin gRPC adapter that calls the REST endpoints, and connect it to the federated graph.
**Outcome**: Legacy APIs become first-class citizens in the GraphQL federation without rewriting any existing business logic.

### Use Case 2: Multi-Language Microservices
**Scenario**: An e-commerce platform has services written in Java, Python, and Go, and each team wants to use their preferred language.
**How it works**: Each team defines their subgraph schema, generates protobuf definitions, and implements the gRPC service in their language of choice. The Router handles all cross-service coordination.
**Outcome**: Teams maintain autonomy over their technology choices while contributing to a unified API experience.

### Use Case 3: AI-Assisted Adapter Generation
**Scenario**: A development team needs to quickly expose multiple internal APIs through GraphQL during a hackathon.
**How it works**: Define subgraph schemas, provide OpenAPI documents or curl commands to an AI coding assistant (Cursor, Copilot, Windsurf), and let the LLM generate adapter code against the strongly-typed proto definitions.
**Outcome**: Multiple API integrations completed in hours instead of weeks, with type-safe guarantees.

---

## Competitive Positioning

### Key Differentiators
1. **No GraphQL Runtime Required**: Unlike Apollo Federation which requires GraphQL servers for each subgraph, Cosmo Connect uses gRPC natively.
2. **LLM-Friendly Architecture**: Strongly-typed proto definitions enable AI coding assistants to generate adapter code reliably.
3. **Built-in Batching**: DataLoader integration eliminates N+1 problems that plague declarative connector approaches.

### Comparison with Alternatives

| Aspect | Cosmo Connect | Apollo Connectors | Traditional Subgraphs |
|--------|---------------|-------------------|----------------------|
| Backend Knowledge Required | gRPC only | REST/HTTP mapping | GraphQL + Federation |
| Language Support | Any gRPC language | N/A (declarative) | Limited by library quality |
| Performance | Native gRPC batching | N+1 prone | Framework-dependent |
| Migration Effort | Low (wrap existing) | Medium | High (rewrite) |

### Common Objections & Responses

| Objection | Response |
|-----------|----------|
| "Our team already knows GraphQL" | Cosmo Connect is fully compatible with existing Apollo Federation subgraphs - use both approaches together. |
| "gRPC adds complexity" | gRPC is simpler than GraphQL for most backend teams, and code generation handles the complexity. |
| "We need real-time subscriptions" | Subscriptions support is on the roadmap; use traditional subgraphs for subscription-heavy services today. |

---

## Technical Summary

### How It Works
Cosmo Connect works by compiling GraphQL schemas into Protocol Buffer definitions. Developers define a standard Apollo-compatible subgraph schema, then use the Cosmo CLI to generate protobuf files and mapping configurations. Backend teams implement the generated gRPC service interfaces in their preferred language. At runtime, the Cosmo Router translates GraphQL operations into gRPC calls, batches requests via DataLoader, and assembles responses.

### Key Technical Features
- Schema-first GraphQL to protobuf compilation
- Automatic code generation for multiple languages
- DataLoader integration for request batching
- Hot-reload support for plugins
- Full Apollo Federation compatibility
- Support for entities, keys, and cross-service field resolution

### Integration Points
- Cosmo Router (required)
- Cosmo CLI (wgc) for code generation
- Any gRPC-compatible language runtime
- Existing REST, SOAP, or database backends

### Requirements & Prerequisites
- Cosmo Router deployment
- Cosmo CLI installed
- gRPC runtime for your chosen language
- Basic understanding of Protocol Buffers

---

## Proof Points

### Metrics & Benchmarks
- Eliminates GraphQL framework overhead with native gRPC communication
- DataLoader batching prevents N+1 query patterns
- Hot-reload capability enables zero-downtime plugin updates

### Case Studies
- See the [Cosmo Plugin Demo](https://github.com/wundergraph/cosmo-plugin-demo) for a complete working example

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

- Primary docs: `/docs/connect/overview`
- Router Plugins: `/docs/router/gRPC/plugins`
- gRPC Services: `/docs/router/gRPC/grpc-services`
- gRPC Concepts: `/docs/router/gRPC/concepts`
- Tutorial (Plugins): `/docs/tutorial/using-grpc-plugins`
- Tutorial (Services): `/docs/tutorial/grpc-service-quickstart`

---

## Keywords & SEO

### Primary Keywords
- GraphQL to gRPC
- GraphQL Federation without GraphQL
- gRPC GraphQL integration

### Secondary Keywords
- Protocol Buffer GraphQL
- Federation API gateway
- Subgraph alternatives

### Related Search Terms
- How to add REST API to GraphQL Federation
- GraphQL Federation without rewriting services
- gRPC microservices GraphQL
- Apollo Federation alternatives

---

## Version History

| Date | Version | Changes |
|------|---------|---------|
| 2025-01-14 | 1.0 | Initial capability documentation |
