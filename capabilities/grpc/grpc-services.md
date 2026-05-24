# gRPC Services

---

## Metadata

| Field | Value |
|-------|-------|
| **Capability ID** | `cap-grpc-003` |
| **Category** | gRPC |
| **Status** | Beta |
| **Availability** | Free, Pro, Enterprise |
| **Related Capabilities** | `cap-grpc-001`, `cap-grpc-002` |

---

## Quick Reference

### Name
gRPC Services

### Tagline
Independent gRPC services for distributed GraphQL Federation.

### Elevator Pitch
gRPC Services enable you to deploy independent microservices that integrate into your GraphQL Federation through gRPC protocol. Define a GraphQL schema, generate Protocol Buffer definitions, and implement in any gRPC-supported language. Services scale independently, deploy anywhere in your infrastructure, and maintain full team autonomy while participating in the unified supergraph.

---

## Problem & Solution

### The Problem
Organizations with distributed teams and microservices architectures need their services to scale independently, deploy across different environments, and use different languages based on team expertise. Traditional GraphQL Federation approaches either couple all services together or require every team to adopt GraphQL frameworks, limiting flexibility and creating organizational friction.

### The Solution
gRPC Services are standalone microservices that communicate with the Cosmo Router over the network using standard gRPC protocol. Each service can be deployed, scaled, and managed independently in any infrastructure. Teams implement services in any gRPC-supported language (Python, Java, Go, C#, Node.js, Rust, etc.) while the Router handles all GraphQL translation and coordination. Field resolvers enable custom resolution logic with automatic batching to prevent N+1 problems.

### Before & After

| Before Cosmo | With Cosmo |
|--------------|------------|
| All services must use GraphQL frameworks | Services implement gRPC contracts in any language |
| Services coupled to gateway deployment | Independent deployment and release cycles |
| Single scaling model for all services | Each service scales based on its own requirements |
| Centralized team must manage integrations | Teams own their services end-to-end |

---

## Key Benefits

1. **Language Flexibility**: Implement services in any language that supports gRPC - Python, Java, C#, Node.js, Rust, Go, and many others. Choose the best language for each service's requirements.

2. **Independent Scaling**: Scale each service independently based on its specific load patterns and resource requirements without affecting the router or other services.

3. **Team Autonomy**: Different teams can own and operate their services independently using their preferred languages, frameworks, and deployment strategies with separate release cycles.

4. **Distributed Architecture**: Deploy services across different environments, datacenters, or cloud regions. Services can live anywhere in your infrastructure.

5. **Field Resolvers with Batching**: Implement custom field resolution logic with automatic DataLoader batching. Computed fields, complex transformations, and external data integration without N+1 problems.

---

## Target Audience

### Primary Persona
- **Role**: Platform Architect / Engineering Manager
- **Pain Points**: Need to integrate services from multiple teams with different tech stacks; services have different scaling requirements; teams want ownership over their deployments
- **Goals**: Create a unified API experience while maintaining microservices independence and team autonomy

### Secondary Personas
- Backend developers in multi-language organizations
- DevOps engineers managing distributed service deployments
- Teams migrating from monoliths to microservices

---

## Use Cases

### Use Case 1: Multi-Language Microservices Architecture
**Scenario**: A large organization has services written by different teams in Python (data science), Java (enterprise), Go (infrastructure), and Node.js (frontend BFF).
**How it works**: Each team defines their GraphQL subgraph schema, generates protobuf definitions using `wgc grpc-service generate`, implements the gRPC service in their preferred language, and deploys independently. The Router discovers and connects to all services over the network.
**Outcome**: Unified GraphQL API across all services while teams maintain complete technology independence and deployment autonomy.

### Use Case 2: Independent Service Scaling
**Scenario**: An e-commerce platform's product catalog service handles 100x more traffic than the order management service during sales events.
**How it works**: Both services are deployed as independent gRPC services with their own auto-scaling policies. During high-traffic events, the catalog service scales horizontally while the order service maintains baseline capacity.
**Outcome**: Optimal resource utilization with services scaling independently based on actual demand, reducing infrastructure costs.

### Use Case 3: Custom Field Resolution
**Scenario**: A service needs to provide computed fields that aggregate data from multiple sources based on field arguments.
**How it works**: Define field resolvers using the `@connect__fieldResolver` directive with context parameters. The generated protobuf includes RPC methods for each field resolver. Implement the resolution logic with access to both field arguments and parent context. The router automatically batches requests across entities.
**Outcome**: Complex computed fields (popularity scores, aggregations, transformations) with optimal performance and no N+1 problems.

---

## Competitive Positioning

### Key Differentiators
1. **True Language Agnosticism**: Unlike plugins (Go/TypeScript only), gRPC Services support any language with gRPC support.
2. **Field Resolvers with Batching**: Custom field resolution with automatic request batching, unlike declarative approaches prone to N+1.
3. **Schema-First Contract**: GraphQL schema serves as the source of truth with automatically generated, strongly-typed protobuf contracts.

### Comparison with Alternatives

| Aspect | gRPC Services | Router Plugins | Traditional Subgraphs |
|--------|---------------|----------------|----------------------|
| Language Support | Any gRPC language | Go, TypeScript (Bun) | Limited by framework |
| Deployment | Distributed microservices | Co-located with router | Distributed |
| Scaling | Independent per service | Coupled to router | Independent |
| Team Autonomy | High | Low | Medium |
| Latency | Network overhead | Minimal (IPC) | Network + GraphQL |
| Field Resolvers | Full support with batching | Full support | Framework-dependent |

### Common Objections & Responses

| Objection | Response |
|-----------|----------|
| "gRPC adds network latency" | For performance-critical paths, use Router Plugins. gRPC Services are optimized for distributed architectures where independence matters more than minimal latency. |
| "We already have GraphQL subgraphs" | gRPC Services are 100% compatible with existing Apollo Federation subgraphs - run both in the same federated graph. |
| "Managing distributed services is complex" | gRPC Services follow standard microservices patterns - use your existing Kubernetes, service mesh, and observability tools. |

---

## Technical Summary

### How It Works
gRPC Services are independent deployments that expose gRPC endpoints implementing the generated protobuf service definitions. The Cosmo Router discovers services, establishes network connections, and translates GraphQL operations into gRPC calls. Services handle their own scaling, monitoring, and lifecycle management. Field resolvers execute as dedicated RPC methods with automatic request batching via DataLoader.

### Key Technical Features
- **Protocol Buffer Generation**: Automatic generation from GraphQL schemas using `wgc grpc-service generate`
- **Field Resolvers**: Custom resolution logic via `@connect__fieldResolver` directive with context and argument support
- **Automatic Batching**: DataLoader integration batches field resolver requests across entities
- **Entity Lookups**: Support for single keys, multiple keys, and compound keys in federation
- **Type Support**: Full support for scalars, enums, interfaces, unions, recursive types, nested objects, and complex lists
- **Schema Linting**: Validation against gRPC compatibility requirements with clear error/warning reporting

### Integration Points
- Cosmo Router (network communication)
- Cosmo CLI (wgc) for code generation
- Any gRPC-compatible language runtime
- Standard service discovery mechanisms
- Kubernetes, Docker, or any deployment platform

### Requirements & Prerequisites
- Cosmo Router deployment
- Cosmo CLI (wgc) installed
- gRPC runtime for your chosen language
- Network connectivity between router and services
- Standard service deployment infrastructure

---

## Proof Points

### Metrics & Benchmarks
- Field resolver batching eliminates N+1 query patterns
- Independent scaling enables optimal resource utilization
- Protocol Buffer binary protocol provides efficient serialization

### Case Studies
- See the [gRPC Service Quickstart Tutorial](/tutorial/grpc-service-quickstart) for implementation examples

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

- Primary docs: `/docs/router/gRPC/grpc-services`
- Cosmo Connect overview: `/docs/connect/grpc-services`
- gRPC Concepts: `/docs/router/gRPC/concepts`
- Field Resolvers: `/docs/router/gRPC/field-resolvers`
- GraphQL Support: `/docs/router/gRPC/graphql-support`
- Tutorial: `/docs/tutorial/grpc-service-quickstart`

---

## Keywords & SEO

### Primary Keywords
- gRPC GraphQL Federation
- GraphQL microservices
- Protocol Buffer GraphQL

### Secondary Keywords
- Distributed GraphQL services
- GraphQL field resolvers
- Multi-language GraphQL Federation

### Related Search Terms
- How to integrate gRPC with GraphQL
- GraphQL Federation microservices architecture
- Independent GraphQL subgraph scaling
- Custom GraphQL field resolution

---

## Version History

| Date | Version | Changes |
|------|---------|---------|
| 2025-01-14 | 1.0 | Initial capability documentation |
