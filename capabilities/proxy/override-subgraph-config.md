# Override Subgraph Config

## Metadata

| Field | Value |
|-------|-------|
| **Capability ID** | `cap-proxy-004` |
| **Category** | Proxy |
| **Status** | GA |
| **Availability** | Free, Pro, Enterprise |
| **Related Capabilities** | `cap-proxy-001` (Request Header Operations), `cap-proxy-003` (Forward Client Extensions) |

---

## Quick Reference

### Name
Override Subgraph Config

### Tagline
Dynamic runtime subgraph configuration without redeployment.

### Elevator Pitch
Override Subgraph Config lets you change subgraph routing URLs and subscription settings at runtime without modifying the router execution config. Perfect for Kubernetes deployments where you need cluster-local DNS names, or any scenario where network topology differs between environments.

---

## Problem & Solution

### The Problem
In production environments, the subgraph URLs registered in the control plane often differ from where the router should actually send traffic. Kubernetes clusters use internal DNS names. Development environments point to localhost. Staging uses different ports. Teams end up maintaining multiple router configs, implementing complex environment variable substitution, or building custom routing logic - all to solve a simple address translation problem.

### The Solution
Cosmo Router's override configuration lets you define local routing URLs that take precedence over the execution config. Override just the routing URL, or fully customize subscription URLs and protocols per subgraph. The control plane maintains canonical URLs for public visibility while your router uses the addresses that match your network topology.

### Before & After

| Before Cosmo | With Cosmo |
|--------------|------------|
| Multiple router configs per environment | Single config with local overrides |
| Complex URL templating systems | Simple YAML override rules |
| Mismatch between control plane and runtime | Clear separation of concerns |
| Manual coordination of URL changes | Independent environment configuration |

---

## Key Benefits

1. **Environment Flexibility**: Use different URLs per environment without changing the control plane configuration
2. **Kubernetes Native**: Leverage cluster-local DNS names while keeping public URLs in the registry
3. **Full Protocol Control**: Override not just URLs but subscription protocols and WebSocket subprotocols
4. **Simple Configuration**: Straightforward YAML syntax with per-subgraph granularity
5. **No Redeployment Required**: Change routing at runtime by updating config

---

## Target Audience

### Primary Persona
- **Role**: DevOps Engineer / Platform Engineer
- **Pain Points**: Needs different routing URLs per environment; wants to use Kubernetes internal DNS; requires subscription protocol flexibility
- **Goals**: Simplify multi-environment deployments; optimize network paths; maintain clear configuration separation

### Secondary Personas
- Backend developers working in local development
- SREs managing production routing
- Infrastructure teams designing network architecture

---

## Use Cases

### Use Case 1: Kubernetes Internal Routing
**Scenario**: Your subgraphs are deployed in the same Kubernetes cluster as the router. The control plane knows the public URLs, but you want the router to use cluster-internal DNS names for lower latency and to avoid egress costs.
**How it works**: Configure overrides for each subgraph: `routing_url: http://products-service.default.svc.cluster.local:3002/graphql`. The router uses these internal URLs while the control plane maintains the external URLs for schema validation and external access.
**Outcome**: Reduced network latency, eliminated egress costs, and no NAT hairpinning - while maintaining a single source of truth in the control plane.

### Use Case 2: Subscription Protocol Migration
**Scenario**: You are migrating a subgraph from SSE subscriptions to WebSocket-based subscriptions, but need to deploy gradually without changing the control plane config.
**How it works**: Override the subscription settings for the specific subgraph: `subscription_url`, `subscription_protocol: ws`, and `subscription_websocket_subprotocol: graphql-ws`. Test the new protocol in staging before updating the control plane.
**Outcome**: Safe protocol migration with ability to test and rollback at the router level before committing changes to the control plane.

### Use Case 3: Local Development Environment
**Scenario**: Developers run a subset of subgraphs locally while pointing to shared staging services for others. They need to route some traffic to localhost without affecting the shared configuration.
**How it works**: Each developer maintains a local config override: `routing_url: http://localhost:4001/graphql` for the subgraphs they are developing. The router merges these overrides with the production execution config.
**Outcome**: Developers can work on individual subgraphs locally while still participating in the full federated graph.

---

## Technical Summary

### How It Works
The Cosmo Router loads its execution config from the control plane, which includes routing URLs for all subgraphs. When override configuration is present, the router replaces the execution config URLs with the override values before routing requests. Overrides can specify routing URLs, subscription URLs, subscription protocols (ws, sse, sse_post), and WebSocket subprotocols (graphql-ws, graphql-transport-ws, auto).

### Key Technical Features
- Override routing URLs per subgraph
- Override subscription URLs independently from query/mutation URLs
- Configure subscription protocol (ws, sse, sse_post)
- Set WebSocket subprotocol (graphql-ws, graphql-transport-ws, auto)
- Backward-compatible legacy syntax still supported
- Merges with execution config at runtime

### Integration Points
- Works with all subgraph types
- Compatible with Kubernetes service discovery
- Supports all subscription protocols

### Requirements & Prerequisites
- Cosmo Router with config.yaml access
- Understanding of your network topology
- Knowledge of subgraph subscription capabilities

---

## Documentation References

- Primary docs: `/docs/router/proxy-capabilities/override-subgraph-config`
- Configuration guide: `/docs/router/configuration#config-file`
- Subscriptions configuration: `/docs/router/subscriptions`

---

## Keywords & SEO

### Primary Keywords
- Subgraph routing override
- GraphQL federation routing
- Kubernetes GraphQL routing

### Secondary Keywords
- Dynamic subgraph configuration
- Subscription URL override
- Federation environment configuration

### Related Search Terms
- How to override subgraph URL in Cosmo
- Kubernetes internal routing for GraphQL
- Change subgraph address at runtime

---

## Version History

| Date | Version | Changes |
|------|---------|---------|
| 2025-01-14 | 1.0 | Initial capability documentation |
