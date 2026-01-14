# Router Plugins

---

## Metadata

| Field | Value |
|-------|-------|
| **Capability ID** | `cap-grpc-002` |
| **Category** | gRPC |
| **Status** | Beta |
| **Availability** | Free, Pro, Enterprise |
| **Related Capabilities** | `cap-grpc-001`, `cap-grpc-003` |

---

## Quick Reference

### Name
Router Plugins

### Tagline
In-process gRPC extensions for high-performance GraphQL Federation.

### Elevator Pitch
Router Plugins are local processes managed by the Cosmo Router that extend your federated graph with custom functionality. Built on HashiCorp's battle-tested go-plugin framework, they provide the simplest deployment model with the highest performance, complete with Go and TypeScript SDKs that include HTTP client utilities, distributed tracing, and structured logging.

---

## Problem & Solution

### The Problem
Organizations adopting GraphQL Federation often need to integrate external APIs, legacy systems, or custom business logic into their supergraph. Traditional approaches require deploying and managing separate GraphQL subgraph services, adding infrastructure complexity, operational overhead, and network latency. Teams also struggle with the varying quality and spec compliance of different subgraph framework implementations.

### The Solution
Router Plugins run as local processes managed by the Cosmo Router, eliminating the need for separate service deployments. They communicate via high-performance gRPC with critical fault isolation - if a plugin crashes, it won't bring down the router. The Go and TypeScript SDKs provide production-ready utilities including HTTP clients with middleware support, automatic distributed tracing integration, and structured logging that integrates seamlessly with the router's observability stack.

### Before & After

| Before Cosmo | With Cosmo |
|--------------|------------|
| Deploy separate subgraph services for each integration | Run plugins alongside the router with unified deployment |
| Manage multiple CI/CD pipelines and infrastructure | Single deployment unit with hot-reload support |
| Network latency between router and subgraphs | Direct inter-process communication for minimal latency |
| Varying subgraph framework quality and spec compliance | Strongly-typed proto definitions guarantee correctness |

---

## Key Benefits

1. **Simplified Architecture**: Maintain fewer components with unified deployment and monitoring. Run multiple plugins on the same Router instance.

2. **Maximum Performance**: Achieve significantly lower latency with direct gRPC-based inter-process communication. Network and GraphQL framework overhead is eliminated.

3. **Production-Ready SDKs**: Go SDK includes HTTP client with middleware, automatic tracing propagation, and structured logging. TypeScript (Bun) support provides similar capabilities.

4. **Fault Isolation**: Plugins run as separate processes - if a plugin crashes, the router continues operating and can restart the plugin.

5. **Hot Reload Support**: Update plugins without service interruption. The router manages plugin lifecycle including hot-reloading.

---

## Target Audience

### Primary Persona
- **Role**: Platform Engineer / Backend Developer
- **Pain Points**: Too much infrastructure to manage; slow iteration cycles for API integrations; need lowest possible latency
- **Goals**: Rapidly integrate external APIs into the supergraph with minimal operational overhead

### Secondary Personas
- DevOps engineers seeking to reduce infrastructure complexity
- Go developers comfortable with the language and ecosystem
- Teams using AI coding assistants who benefit from strongly-typed interfaces

---

## Use Cases

### Use Case 1: Rapid API Integration with AI Assistance
**Scenario**: A team needs to expose a third-party REST API through their GraphQL supergraph during a sprint.
**How it works**: Define a GraphQL schema representing the API, run `wgc router plugin init` to scaffold the project, provide the OpenAPI spec to an AI coding assistant, and let it generate the adapter code against the strongly-typed proto definitions. Use `wgc router plugin build` and `make` to build, compose, and serve.
**Outcome**: A production-ready integration completed in hours with automatic tracing and logging, zero infrastructure to deploy.

### Use Case 2: Performance-Critical Data Access
**Scenario**: An e-commerce platform needs sub-millisecond access to product inventory data from a Redis cache.
**How it works**: Implement a router plugin that directly queries Redis using the Go SDK's HTTP client (or native Redis client). The plugin runs in the same process group as the router, eliminating network hops.
**Outcome**: Inventory queries complete in microseconds, enabling real-time stock updates without the overhead of a separate service.

### Use Case 3: Legacy System Wrapper
**Scenario**: A financial institution has a SOAP service that must be integrated into the modern GraphQL API without modification.
**How it works**: Create a plugin that wraps the SOAP service, using the SDK's HTTP client to make SOAP calls. The strongly-typed proto interface ensures the GraphQL schema matches the implementation. Tracing automatically captures the full request flow.
**Outcome**: Legacy SOAP service seamlessly integrated with full observability, no changes to existing systems.

---

## Competitive Positioning

### Key Differentiators
1. **HashiCorp go-plugin Foundation**: Built on the same framework powering Vault and Terraform, with millions of production deployments.
2. **Integrated Observability**: Automatic tracing propagation and structured logging without additional configuration.
3. **LLM-Optimized Development**: Proto-based code generation creates a strongly-typed foundation that AI tools can effectively understand and extend.

### Comparison with Alternatives

| Aspect | Router Plugins | Apollo Connectors | Standalone Subgraphs |
|--------|----------------|-------------------|---------------------|
| Deployment | Co-located with router | N/A (declarative) | Separate services |
| Latency | Minimal (IPC) | Network + parsing | Network + GraphQL |
| Language Support | Go, TypeScript (Bun) | N/A | Many (varying quality) |
| Observability | Built-in tracing/logging | Manual setup | Manual setup |
| Batching | DataLoader built-in | N+1 prone | Framework-dependent |

### Common Objections & Responses

| Objection | Response |
|-----------|----------|
| "We need language flexibility" | Use gRPC Services for multi-language needs; plugins are optimized for Go/TypeScript teams. |
| "What if a plugin crashes?" | Plugins run as separate processes with fault isolation - the router continues operating and can restart plugins. |
| "We need independent scaling" | For high-scale scenarios, gRPC Services offer independent deployment and scaling. |

---

## Technical Summary

### How It Works
Router Plugins are separate processes that communicate with the Cosmo Router via gRPC using HashiCorp's go-plugin framework. At startup, plugins register with the router and their schemas integrate into the federated graph. When GraphQL requests arrive, the router routes relevant portions to appropriate plugins over the IPC channel. The router manages plugin lifecycle including startup, health checking, and hot-reloading.

### Key Technical Features
- **HTTP Client SDK**: Fluent API with middleware support (auth, user-agent, custom), generic response handling, and automatic tracing integration
- **Distributed Tracing**: OpenTelemetry-based tracing with automatic context propagation from router through plugins to downstream services
- **Structured Logging**: Integration with router's zap logger, context injection, panic recovery with stack traces
- **Health Checks**: Built-in gRPC health check protocol support
- **Hot Reload**: Update plugins without service interruption
- **Cosmo Cloud Registry**: Push plugins directly to the platform without re-deploying the router

### Integration Points
- Cosmo Router (manages plugin lifecycle)
- Cosmo CLI (wgc) for scaffolding, building, and testing
- Cosmo Cloud Plugin Registry for deployment
- OpenTelemetry for distributed tracing
- Any HTTP/REST/SOAP backend via SDK HTTP client

### Requirements & Prerequisites
- Cosmo Router deployment
- Cosmo CLI (wgc) installed
- Go compiler or Bun runtime (installed automatically by CLI)
- Protobuf compiler (installed automatically by CLI)

---

## Proof Points

### Metrics & Benchmarks
- Eliminates network latency with inter-process communication
- HashiCorp go-plugin framework powers production systems like Vault and Terraform
- DataLoader batching prevents N+1 query patterns
- Hot-reload enables zero-downtime updates

### Case Studies
- See the [Cosmo Plugin Demo](https://github.com/wundergraph/cosmo-plugin-demo) for a complete working example with Users plugin and Products subgraph

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

- Primary docs: `/docs/router/gRPC/plugins`
- Cosmo Connect overview: `/docs/connect/plugins`
- Go Plugin SDK: `/docs/router/gRPC/plugins/go-plugin/overview`
- HTTP Client: `/docs/router/gRPC/plugins/go-plugin/http-client`
- Telemetry: `/docs/router/gRPC/plugins/go-plugin/telemetry`
- Logging: `/docs/router/gRPC/plugins/go-plugin/logging`
- TypeScript Plugin: `/docs/router/gRPC/plugins/ts-plugin/overview`
- CLI Commands: `/docs/cli/router/plugin`
- Tutorial: `/docs/tutorial/using-grpc-plugins`

---

## Keywords & SEO

### Primary Keywords
- GraphQL router plugins
- gRPC GraphQL integration
- In-process GraphQL extensions

### Secondary Keywords
- HashiCorp go-plugin GraphQL
- GraphQL Federation plugins
- Cosmo Router extensions

### Related Search Terms
- How to extend GraphQL gateway
- GraphQL subgraph alternatives
- High-performance GraphQL resolvers
- GraphQL API integration patterns

---

## Version History

| Date | Version | Changes |
|------|---------|---------|
| 2025-01-14 | 1.0 | Initial capability documentation |
