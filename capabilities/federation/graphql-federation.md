# GraphQL Federation v1 & v2

Full support for both Apollo Federation protocol versions with a mature, highly-optimized GraphQL engine.

---

## Metadata

| Field | Value |
|-------|-------|
| **Capability ID** | `cap-fed-001` |
| **Category** | Federation |
| **Status** | GA |
| **Availability** | Free / Pro / Enterprise |
| **Related Capabilities** | `cap-fed-002`, `cap-fed-006`, `cap-fed-007` |

---

## Quick Reference

### Name
GraphQL Federation v1 & v2

### Tagline
Run any Federation version with full compatibility.

### Elevator Pitch
WunderGraph Cosmo provides complete compatibility with both Apollo Federation v1 and v2 protocols, enabling teams to unify their GraphQL microservices into a single, cohesive API. Built on a mature, highly-optimized GraphQL engine implemented in Go, it delivers enterprise-grade performance while supporting all federation directives and features.

---

## Problem & Solution

### The Problem
Organizations adopting GraphQL Federation face a critical choice: which federation version to use, and whether their tooling will support both existing v1 implementations and new v2 features. Many teams have invested in v1 schemas and cannot immediately migrate, while new projects want access to v2's enhanced capabilities. Running incompatible federation versions creates fragmentation and blocks unified API strategies.

### The Solution
Cosmo's Router supports both Federation v1 and v2 protocols out of the box. Teams can run mixed environments, gradually migrate from v1 to v2, or start fresh with v2 features. The router automatically handles directive compatibility and query planning across both versions, removing migration friction and enabling unified graph strategies.

### Before & After

| Before Cosmo | With Cosmo |
|--------------|------------|
| Forced to choose between v1 or v2 exclusively | Support both versions simultaneously |
| Complex migration projects required | Gradual migration at your own pace |
| Limited directive support | Full directive compatibility matrix |
| Performance concerns with federation overhead | Highly-optimized Go-based query planner |

---

## Key Benefits

1. **Full Protocol Compatibility**: Support for all v1 directives (@extends, @external, @key, @provides, @requires, @tag) and v2 additions (@inaccessible, @override, @shareable, @authenticated, @requiresScopes)
2. **Zero Lock-in**: Apache 2.0 licensed router means no vendor dependency and full code transparency
3. **Enterprise Performance**: Go-based implementation provides superior performance for high-throughput federation scenarios
4. **Mixed Version Support**: Run v1 and v2 subgraphs together in the same federated graph
5. **Future-Ready**: Continuous updates to support new federation specifications as they emerge

---

## Target Audience

### Primary Persona
- **Role**: Platform Engineer / API Architect
- **Pain Points**: Need to unify multiple GraphQL services; concerned about federation version compatibility; want flexibility to evolve without rewrites
- **Goals**: Build a scalable, unified GraphQL API layer that supports both current and future team needs

### Secondary Personas
- Backend developers building federated subgraphs
- DevOps engineers managing GraphQL infrastructure
- Engineering managers evaluating federation platforms

---

## Use Cases

### Use Case 1: Gradual v1 to v2 Migration
**Scenario**: A company has 15 subgraphs built on Federation v1 and wants to adopt v2 features for new services without disrupting existing infrastructure.
**How it works**: Teams continue running v1 subgraphs unchanged while new services use v2 directives. The Cosmo Router composes both versions into a unified graph, handling compatibility automatically.
**Outcome**: New features available immediately; legacy services migrate at a comfortable pace with zero downtime.

### Use Case 2: Greenfield Federation Deployment
**Scenario**: A startup is building a new microservices architecture and wants to use the latest Federation v2 features from day one.
**How it works**: Teams define subgraphs using v2 directives like @shareable for cross-service field resolution and @authenticated for security policies. The router composes and serves the federated graph with full v2 support.
**Outcome**: Modern federation architecture with advanced authorization, field sharing, and composition capabilities.

### Use Case 3: Multi-Team Schema Ownership
**Scenario**: Different teams own different subgraphs and have varying levels of GraphQL expertise; some prefer simpler v1 patterns.
**How it works**: Each team uses the federation version that matches their expertise. The platform team manages the composed graph without forcing version standardization.
**Outcome**: Reduced friction between teams while maintaining a unified API for consumers.

---

## Competitive Positioning

### Key Differentiators
1. Open-source Apache 2.0 licensed router with no feature restrictions
2. Go-based implementation for superior performance versus Node.js alternatives
3. Simultaneous v1/v2 support without migration requirements
4. Integrated with full Cosmo platform (Studio, CLI, observability)

### Comparison with Alternatives

| Aspect | Cosmo | Apollo Router | Other Solutions |
|--------|-------|---------------|-----------------|
| License | Apache 2.0 | Elastic License | Varies |
| v1 Support | Full | Limited | Partial |
| v2 Support | Full | Full | Partial |
| Performance | High (Go) | High (Rust) | Medium |
| Self-hosted | Yes | Yes | Varies |

---

## Technical Summary

### How It Works
The Cosmo Router fetches the latest valid router configuration from the CDN and creates a highly-optimized query planner. This query planner is cached across requests for performance. The router periodically checks the CDN for updates and reconfigures its engine on the fly, ensuring zero-downtime schema updates.

### Key Technical Features
- Complete Federation v1 directive support: @extends, @external, @key (including composite keys), @provides, @requires, @tag
- Complete Federation v2 directive support: @inaccessible, @override, @shareable, @authenticated, @requiresScopes, @interfaceObject
- Interface entity support with @key on INTERFACE (v2.3)
- Resolvable key argument support (v2.0)
- Built on [graphql-go-tools](https://github.com/wundergraph/graphql-go-tools) - a mature, battle-tested GraphQL engine

### Integration Points
- Control Plane for router registration and health monitoring
- CDN for router configuration distribution
- Studio for graph visualization and management
- Observability stack for tracing and metrics

### Requirements & Prerequisites
- Cosmo Control Plane access (Cloud or self-hosted)
- Subgraphs implementing Federation v1 or v2 protocols
- Router deployment infrastructure (Docker, Kubernetes, etc.)

---

## Documentation References

- Primary docs: `/docs/router/intro`
- Compatibility matrix: `/docs/federation/federation-compatibility-matrix`
- Directives reference: `/docs/federation/federation-directives-index`
- Router configuration: `/docs/router/configuration`

---

## Keywords & SEO

### Primary Keywords
- GraphQL Federation
- Apollo Federation alternative
- Federation v2

### Secondary Keywords
- Federated GraphQL
- GraphQL microservices
- Subgraph composition

### Related Search Terms
- GraphQL federation router
- Federation v1 to v2 migration
- Open source federation gateway

---

## Version History

| Date | Version | Changes |
|------|---------|---------|
| 2025-01-14 | 1.0 | Initial capability documentation |
