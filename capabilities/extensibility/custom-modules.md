# Custom Modules (Go)

## Metadata

| Field | Value |
|-------|-------|
| **Capability ID** | `cap-ext-001` |
| **Category** | Extensibility |
| **Status** | GA |
| **Availability** | Free / Pro / Enterprise |
| **Related Capabilities** | `cap-ext-002` |

---

## Quick Reference

### Name
Custom Modules (Go)

### Tagline
Extend router functionality with pure Go code.

### Elevator Pitch
Custom Modules allow you to extend the Cosmo Router by writing pure Go code that hooks into the request lifecycle. Implement custom authentication, caching, logging, header manipulation, and more without complex scripting or external proxies. Leverage the entire Go ecosystem to customize exactly how your GraphQL gateway behaves.

---

## Problem & Solution

### The Problem
Teams often need to customize their GraphQL gateway beyond what standard configuration allows. Whether implementing custom authentication logic, adding proprietary caching layers, integrating with internal systems, or enforcing company-specific policies, organizations find themselves stuck between limited configuration options and building a gateway from scratch. External proxy solutions add latency and operational complexity.

### The Solution
Cosmo's Custom Modules provide a clean extension API that lets you write pure Go code to intercept and modify requests at every stage of the request lifecycle. Multiple hook interfaces give you precise control over when your code executes, from early request validation to post-subgraph response handling. A single compilation command produces your extended router binary.

### Before & After

| Before Cosmo | With Cosmo |
|--------------|------------|
| External proxy layers adding latency | Direct in-router extensions with zero network hop |
| Complex scripting languages with limited capabilities | Full Go ecosystem and native performance |
| Limited hook points requiring workarounds | Six distinct interfaces for precise lifecycle control |
| Difficult module testing and debugging | Standard Go testing and debugging workflows |

---

## Key Benefits

1. **Native Performance**: Extensions run as compiled Go code within the router process, eliminating external proxy overhead and network latency.
2. **Full Request Lifecycle Control**: Six hook interfaces let you intercept requests at exactly the right moment - from early authentication to post-subgraph response processing.
3. **Leverage Go Ecosystem**: Use any Go library for authentication, caching, metrics, or integration with your existing systems.
4. **Type-Safe Development**: Go's strong typing catches errors at compile time, and the well-defined interfaces make extension development straightforward.
5. **Production-Ready Patterns**: Access to request context, GraphQL operation details, authentication info, and query plan statistics enables sophisticated production use cases.

---

## Target Audience

### Primary Persona
- **Role**: Platform Engineer / Backend Developer
- **Pain Points**: Need to customize gateway behavior beyond configuration; current solutions require external proxies or complex workarounds; want to integrate with existing Go-based infrastructure.
- **Goals**: Implement custom authentication, add proprietary caching, enforce company policies, integrate with internal systems.

### Secondary Personas
- Security Engineers implementing custom authentication and authorization logic
- DevOps Engineers adding custom logging, metrics, and observability
- Integration Specialists connecting the gateway to internal enterprise systems

---

## Use Cases

### Use Case 1: Custom Authentication Logic
**Scenario**: A company uses a proprietary identity system that doesn't follow standard OAuth/JWT patterns and needs to authenticate requests before they reach subgraphs.
**How it works**: Implement `RouterOnRequestHandler` to intercept requests before the router's built-in authentication. Extract credentials, validate against the internal system, and either allow the request to proceed or return an early error response.
**Outcome**: Seamless integration with existing identity infrastructure without modifying subgraphs or adding external proxy layers.

### Use Case 2: Response Caching Layer
**Scenario**: An e-commerce platform wants to cache certain expensive GraphQL queries at the gateway level to reduce subgraph load during high-traffic periods.
**How it works**: Use `EnginePreOriginHandler` to check cache before subgraph requests and `EnginePostOriginHandler` to populate cache after responses. Access operation hash and query plan stats to make intelligent caching decisions.
**Outcome**: Significant reduction in subgraph load and improved response times for cacheable operations.

### Use Case 3: Request Validation and Rate Limiting
**Scenario**: A SaaS platform needs to enforce per-tenant rate limits and validate that operations conform to tenant-specific policies.
**How it works**: Implement `RouterMiddlewareHandler` to access the GraphQL operation details and query plan statistics. Use `QueryPlanStats` to estimate operation cost based on subgraph fetches, then apply tenant-specific rate limiting logic.
**Outcome**: Fair resource allocation across tenants with protection against expensive queries, all enforced at the gateway layer.

### Use Case 4: Header Propagation and Transformation
**Scenario**: A microservices environment requires specific headers to be propagated to subgraphs, with transformations based on the target service.
**How it works**: Use `EnginePreOriginHandler` to access `ctx.ActiveSubgraph()` and conditionally add, modify, or remove headers based on the destination subgraph.
**Outcome**: Clean header management without subgraph modifications, enabling consistent tracing and authentication across services.

---

## Technical Summary

### How It Works
Custom Modules are pure Go code that implement one or more of six predefined interfaces. When you build your router with custom modules, they're compiled into the router binary. At runtime, modules are instantiated and their handlers are called at the appropriate points in the request lifecycle. Modules can be prioritized to control loading order, and configuration values can be passed via the router's YAML config file.

### Key Technical Features
- Six hook interfaces: `RouterOnRequestHandler`, `RouterMiddlewareHandler`, `EnginePreOriginHandler`, `EnginePostOriginHandler`, `Provisioner`, `Cleaner`
- Access to GraphQL operation details: name, type, hash, content, query plan stats
- Request context for sharing data across handlers
- Subgraph information access including name, ID, and URL
- Authentication information access and modification
- Configurable module priority for controlled loading order
- YAML-based module configuration with struct tag mapping

### Integration Points
- Go ecosystem libraries and frameworks
- External authentication systems
- Caching systems (Redis, Memcached, etc.)
- Logging and metrics platforms
- Internal enterprise APIs

### Requirements & Prerequisites
- Go development environment
- Familiarity with Go interfaces and HTTP handlers
- Access to router source for building custom binary

---

## Documentation References

- Primary docs: `/docs/router/custom-modules`
- Examples repository: https://github.com/wundergraph/router-examples
- Custom module with tests: https://github.com/wundergraph/cosmo/tree/main/router/cmd/custom
- Custom JWT example: https://github.com/wundergraph/cosmo/tree/main/router/cmd/custom-jwt
- ADR for future module system: https://github.com/wundergraph/cosmo/blob/main/adr/custom-modules-v1.md

---

## Keywords & SEO

### Primary Keywords
- GraphQL router extension
- Custom Go modules
- Router middleware

### Secondary Keywords
- GraphQL gateway customization
- Request lifecycle hooks
- Router plugins

### Related Search Terms
- How to extend GraphQL router
- Custom authentication GraphQL gateway
- Go GraphQL middleware
- Router request interceptor

---

## Version History

| Date | Version | Changes |
|------|---------|---------|
| 2025-01-14 | 1.0 | Initial capability documentation |
