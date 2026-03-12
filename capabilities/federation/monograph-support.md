# Monograph Support

Single-service GraphQL without federation complexity, with the option to migrate to federation when ready.

---

## Metadata

| Field | Value |
|-------|-------|
| **Capability ID** | `cap-fed-008` |
| **Category** | Federation |
| **Status** | GA |
| **Availability** | Free / Pro / Enterprise |
| **Related Capabilities** | `cap-fed-001`, `cap-fed-007`, `cap-fed-005` |

---

## Quick Reference

### Name
Monograph Support

### Tagline
Start simple, scale to federation when you are ready.

### Elevator Pitch
Monographs provide a streamlined path to using Cosmo for single-service GraphQL APIs. Get all the benefits of the Cosmo platform (schema registry, checks, analytics, contracts) without federation complexity. When your architecture grows, seamlessly migrate to a federated graph without changing your infrastructure or losing your schema history.

---

## Problem & Solution

### The Problem
Not every GraphQL deployment needs federation from day one. Many teams start with a single GraphQL service and want professional tooling for schema management, analytics, and security. However, most federation-focused platforms require federation overhead even for simple deployments. Teams face a choice: use basic tooling now and migrate later, or adopt federation complexity before it is needed.

### The Solution
Cosmo's Monograph support provides a first-class experience for single-service GraphQL. Create a monograph, publish your schema, and access all Cosmo platform features (Studio, schema checks, analytics, contracts) without configuring federation. When you are ready to scale to multiple services, a single CLI command migrates your monograph to a federated graph, preserving your schema history and configurations.

### Before & After

| Before Cosmo | With Cosmo |
|--------------|------------|
| Limited tooling for non-federated GraphQL | Full platform features for monographs |
| Painful migration to federation later | Single-command migration when ready |
| No schema registry for simple APIs | Complete schema management |
| Basic analytics only | Full analytics and observability |

---

## Key Benefits

1. **Zero Federation Overhead**: Deploy single-service GraphQL without federation complexity
2. **Full Platform Access**: Schema registry, checks, analytics, and contracts available for monographs
3. **Seamless Migration**: Convert to federated graph with one CLI command when ready
4. **Contract Support**: Create filtered schema contracts even for single-service APIs
5. **Future-Proof**: Start simple with a clear path to scale

---

## Target Audience

### Primary Persona
- **Role**: Backend Developer / API Developer
- **Pain Points**: Wants professional GraphQL tooling but does not need federation yet; concerned about future migration complexity
- **Goals**: Get started quickly with good tooling and a clear path to scale

### Secondary Personas
- Startup CTOs evaluating GraphQL platforms
- Teams modernizing from REST to GraphQL
- Small teams with single-service architectures

---

## Use Cases

### Use Case 1: Quick API Deployment
**Scenario**: A startup wants to deploy a GraphQL API with professional tooling but has only one service.
**How it works**: The team creates a monograph with `wgc monograph create production --routing-url http://router.example.com --graph-url http://api.example.com`. They publish their schema and start using Studio for schema management and analytics.
**Outcome**: Full Cosmo platform benefits without federation complexity.

### Use Case 2: API with Multiple Audiences
**Scenario**: A single GraphQL service needs to expose different schemas to internal and external consumers.
**How it works**: The monograph schema uses @tag directives. Schema Contracts are created to filter the schema for different audiences. Each contract has its own router deployment.
**Outcome**: Multi-audience support without federation, using schema contracts.

### Use Case 3: Migration to Federation
**Scenario**: A growing application needs to split into multiple services for scalability.
**How it works**: When ready, the team runs `wgc monograph migrate production`. The monograph becomes a federated graph with the original schema as its first subgraph. New subgraphs can now be added.
**Outcome**: Seamless transition from monograph to federation with preserved history.

### Use Case 4: Schema Validation Workflow
**Scenario**: A team wants pre-deployment schema validation even for their single-service API.
**How it works**: The CI pipeline runs `wgc monograph check production --schema ./schema.graphql` before deployment. Breaking changes and lint issues are caught before reaching production.
**Outcome**: Safe schema evolution with automated validation.

---

## Competitive Positioning

### Key Differentiators
1. Full platform features available for non-federated deployments
2. Single-command migration to federation
3. Schema Contracts work identically for monographs
4. No artificial limitations compared to federated graphs
5. Internal subgraph automatically managed

### Comparison with Alternatives

| Aspect | Cosmo | Apollo Studio | DIY Solution |
|--------|-------|---------------|--------------|
| Non-federated support | Full | Limited | Full |
| Schema management | Yes | Partial | Manual |
| Migration to federation | Built-in | Manual | Major effort |
| Analytics | Yes | Limited | Custom |
| Schema contracts | Yes | No | Custom |

---

## Technical Summary

### How It Works
A monograph is essentially a federated graph with a single, automatically managed subgraph. When you create a monograph, Cosmo internally creates both the graph and its subgraph. You interact only with the monograph, and the internal subgraph is transparent. All publishing, checking, and management happens at the monograph level.

The routing URL is where clients connect to the Cosmo Router, while the graph URL is your actual GraphQL server endpoint. The router proxies requests to your server, providing the full benefits of the Cosmo Router (security, analytics, caching) without federation overhead.

### Key Technical Features

**Create Operations:**
```bash
# Create a monograph
wgc monograph create production \
  --routing-url http://router.example.com/graphql \
  --graph-url https://api.example.com/graphql
```

**Publish Operations:**
```bash
# Publish schema to monograph
wgc monograph publish production --schema ./schema.graphql
```

**Check Operations:**
```bash
# Check schema before publishing
wgc monograph check production --schema ./schema.graphql
```

**Migration:**
```bash
# Migrate to federated graph
wgc monograph migrate production
```

**Additional Options:**
- `--subscription-url`: Separate URL for subscription requests
- `--subscription-protocol`: ws (default), sse, or sse_post
- `--admission-webhook-url`: Admission control webhook
- `--readme`: Documentation file for the monograph

### Integration Points
- CLI (`wgc monograph *`) for all operations
- Studio for schema viewing and analytics
- Router for serving GraphQL requests
- Schema Contracts for filtered schemas

### Requirements & Prerequisites
- GraphQL server accessible from router
- Router deployment infrastructure
- CLI authenticated with monograph permissions

---

## Documentation References

- Primary docs: `/docs/cli/monograph`
- Create command: `/docs/cli/monograph/create`
- Publish command: `/docs/cli/monograph/publish`
- Check command: `/docs/cli/monograph/check`
- Migrate command: `/docs/cli/monograph/migrate`
- Schema contracts: `/docs/concepts/schema-contracts`

---

## Keywords & SEO

### Primary Keywords
- Monograph GraphQL
- Single-service GraphQL
- GraphQL without federation

### Secondary Keywords
- GraphQL migration
- Simple GraphQL deployment
- GraphQL starter

### Related Search Terms
- Start with GraphQL
- GraphQL single service
- Migrate to federation

---

## Version History

| Date | Version | Changes |
|------|---------|---------|
| 2025-01-14 | 1.0 | Initial capability documentation |
