# GraphQL Federation Router

## Metadata

| Field | Value |
|-------|-------|
| **Capability ID** | `cap-router-001` |
| **Category** | Router |
| **Status** | GA |
| **Availability** | Free (Apache 2.0 Licensed) |
| **Related Capabilities** | `cap-router-002`, `cap-router-004`, `cap-router-005` |

---

## Quick Reference

### Name
GraphQL Federation Router

### Tagline
High-performance Go-based router for federated GraphQL at scale.

### Elevator Pitch
The Cosmo Router is a production-ready, Apache 2.0 licensed GraphQL Federation router built in Go. It intelligently routes requests across your distributed GraphQL services, aggregates responses, and operates independently while maintaining seamless integration with the Cosmo Control Plane for configuration updates.

---

## Problem & Solution

### The Problem
Organizations adopting GraphQL Federation need a reliable gateway to orchestrate requests across multiple subgraphs. Existing solutions often suffer from performance bottlenecks, lack of optimization for federated queries, or vendor lock-in through proprietary licensing. Teams struggle with complex query planning, high latency in distributed environments, and the operational burden of managing federation at scale.

### The Solution
Cosmo Router provides a battle-tested, open-source federation gateway powered by graphql-go-tools - a mature and highly-optimized GraphQL engine. It automatically fetches the latest configuration from the CDN, creates highly-optimized query plans that are cached across requests, and seamlessly updates its engine on-the-fly when schema changes occur.

### Before & After

| Before Cosmo | With Cosmo |
|--------------|------------|
| Manual query routing logic across services | Automatic intelligent routing based on federation spec |
| Performance degradation at scale | Highly-optimized query planner with request caching |
| Downtime during configuration updates | Hot-reload configuration without service interruption |
| Proprietary licensing constraints | Apache 2.0 open-source freedom |

---

## Key Benefits

1. **High Performance**: Built in Go with a focus on performance and maintainability, leveraging graphql-go-tools for optimized query execution
2. **Full Federation Support**: Compatible with GraphQL Federation v1 and v2 specifications out of the box
3. **Independent Operation**: Functions autonomously without depending on Control Plane availability, ensuring resilience
4. **Automatic Updates**: Periodically checks the CDN for configuration updates and reconfigures the engine on-the-fly
5. **Open Source**: Apache 2.0 licensed, eliminating vendor lock-in and enabling customization

---

## Target Audience

### Primary Persona
- **Role**: Platform Engineer / Infrastructure Architect
- **Pain Points**: Need to run a reliable, high-performance federation gateway; concerns about vendor lock-in; require flexibility to customize and extend
- **Goals**: Deploy a production-ready federation layer that scales with the organization; minimize operational overhead; maintain full control over the infrastructure

### Secondary Personas
- Backend developers implementing federated services
- DevOps engineers managing API gateway infrastructure
- Engineering managers evaluating federation solutions

---

## Use Cases

### Use Case 1: Production Federation Gateway
**Scenario**: A large e-commerce platform needs to unify multiple GraphQL services (products, inventory, orders, users) into a single federated graph
**How it works**: Deploy the Cosmo Router as the gateway, configure subgraph routing through the Control Plane, and the router automatically handles query planning and response aggregation
**Outcome**: Single unified GraphQL endpoint for clients with optimized query execution across all backend services

### Use Case 2: Zero-Downtime Schema Updates
**Scenario**: Development teams need to deploy schema changes without interrupting production traffic
**How it works**: Publish schema updates through the CLI; the router automatically detects changes via CDN polling, creates new query plans, and gracefully transitions traffic to the new configuration
**Outcome**: Continuous deployment of schema changes with zero client disruption

### Use Case 3: Self-Hosted Federation Infrastructure
**Scenario**: An enterprise requires complete control over their federation infrastructure due to compliance requirements
**How it works**: Deploy the router in their own infrastructure, configure it with a static execution config, and integrate with their existing observability stack
**Outcome**: Full federation capabilities with complete infrastructure ownership and compliance adherence

---

## Technical Summary

### How It Works
The Cosmo Router fetches the latest valid router configuration from the CDN and creates a highly-optimized query planner. This query planner is cached across requests for maximum performance. At configurable intervals, it checks the CDN for new updates and reconfigures its engine on-the-fly. The router registers itself with the Control Plane API to enable reporting on the status and health of the router fleet.

### Key Technical Features
- GraphQL Federation v1 and v2 protocol support
- Highly-optimized query planner with request-level caching
- Automatic configuration polling and hot-reload
- Health check endpoints for Kubernetes deployments
- GraphQL Playground for development and testing
- Configurable logging, metrics, and tracing

### Integration Points
- Cosmo Control Plane for configuration and monitoring
- CDN for configuration distribution
- OpenTelemetry for observability
- Any GraphQL Federation v1/v2 compatible subgraph

### Requirements & Prerequisites
- Graph API token from Cosmo Control Plane (or static execution config)
- Network access to subgraphs
- Optional: Control Plane access for centralized management

---

## Documentation References

- Primary docs: `/docs/router/intro`
- Configuration guide: `/docs/router/configuration`
- Deployment guide: `/docs/deployments-and-hosting/`
- Development setup: `/docs/router/development`

---

## Keywords & SEO

### Primary Keywords
- GraphQL Federation Router
- GraphQL Gateway
- Federation Gateway

### Secondary Keywords
- GraphQL API Gateway
- Federated GraphQL
- GraphQL Router

### Related Search Terms
- Apollo Federation alternative
- Open source GraphQL federation
- Go GraphQL router
- High performance GraphQL gateway
