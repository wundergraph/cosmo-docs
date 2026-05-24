# Schema Contracts

Filter graph sections for different audiences using @tag directives to create tailored API experiences while maintaining a single source graph.

---

## Metadata

| Field | Value |
|-------|-------|
| **Capability ID** | `cap-fed-005` |
| **Category** | Federation |
| **Status** | GA |
| **Availability** | Pro / Enterprise |
| **Related Capabilities** | `cap-fed-001`, `cap-fed-002`, `cap-fed-006` |

---

## Quick Reference

### Name
Schema Contracts

### Tagline
One graph, multiple tailored API experiences.

### Elevator Pitch
Schema Contracts enable you to create filtered versions of your federated graph for different audiences. Using simple @tag directives, you can exclude sensitive fields from public APIs, create partner-specific views, or simplify schemas for specific use cases. Maintain one source of truth while serving multiple tailored API experiences through separate router deployments.

---

## Problem & Solution

### The Problem
As federated graphs grow, they serve increasingly diverse audiences: internal teams, external partners, public consumers, and different tenants. Each audience has different access needs and should only see relevant parts of the schema. Without proper tooling, teams either expose too much (security risk) or maintain multiple duplicate graphs (maintenance nightmare).

### The Solution
Schema Contracts allow you to annotate your schema with @tag directives and then create filtered views (contracts) that include or exclude tagged elements. Each contract gets its own router deployment serving a tailored schema, while all contracts automatically stay in sync with the source graph. One graph to maintain, multiple APIs to serve.

### Before & After

| Before Cosmo | With Cosmo |
|--------------|------------|
| Duplicate graphs for different audiences | Single source graph with filtered contracts |
| Manual schema maintenance across versions | Automatic synchronization on source changes |
| Risk of exposing sensitive fields | Explicit tag-based filtering |
| Complex multi-graph deployment | Contract-based router deployment |

---

## Key Benefits

1. **Multi-Audience Support**: Serve different schemas to internal, partner, and public consumers from one source
2. **Security by Design**: Explicitly filter sensitive fields using @tag directives and exclude patterns
3. **Automatic Synchronization**: Contracts recompose automatically when the source graph changes
4. **Independent Routing**: Each contract has its own router with separate analytics and persisted operations
5. **Simplified Maintenance**: Update the source graph once; all contracts update accordingly

---

## Target Audience

### Primary Persona
- **Role**: API Product Manager / Platform Engineer
- **Pain Points**: Serving different API versions to different consumers; protecting internal fields from external access; maintaining multiple graph versions
- **Goals**: Deliver tailored API experiences efficiently while maintaining security and reducing maintenance burden

### Secondary Personas
- Security engineers concerned about data exposure
- Partner integration teams needing customized APIs
- Enterprise architects managing multi-tenant platforms

---

## Use Cases

### Use Case 1: Public vs. Internal API
**Scenario**: A company wants to expose a public GraphQL API while keeping internal fields (like social security numbers) hidden from external consumers.
**How it works**: Internal fields are tagged with `@tag(name: "internal")` or `@tag(name: "sensitive")`. A public contract is created that excludes these tags. The public router serves only the filtered schema.
**Outcome**: External consumers see a clean, safe API while internal applications access the full graph.

### Use Case 2: Partner-Specific APIs
**Scenario**: Different partners need access to different subsets of the API based on their integration agreements.
**How it works**: Fields are tagged with partner-specific identifiers like `@tag(name: "partner-a")`. Separate contracts are created for each partner, including only their relevant tags.
**Outcome**: Each partner gets a customized API experience without maintaining separate graphs.

### Use Case 3: Legacy System Integration
**Scenario**: A company is modernizing its API but needs to maintain backward compatibility with legacy consumers during migration.
**How it works**: New fields are tagged with `@tag(name: "v2")`. A legacy contract excludes v2 tags, serving the original schema to legacy consumers. A modern contract includes all fields.
**Outcome**: Gradual migration without breaking legacy integrations.

### Use Case 4: Multi-Tenant Isolation
**Scenario**: A SaaS platform serves multiple tenants who should only see their relevant schema portions.
**How it works**: Tenant-specific features are tagged appropriately. Contracts are created per tenant, filtering to their authorized feature set.
**Outcome**: Tenant data isolation at the schema level with customized feature visibility.

---

## Competitive Positioning

### Key Differentiators
1. Simple @tag-based annotation (no complex configuration)
2. Automatic recomposition on source changes
3. Independent router deployments per contract
4. Full schema checks applied to contracts automatically
5. Works with both federated graphs and monographs

### Comparison with Alternatives

| Aspect | Cosmo | Apollo Contracts | DIY Solution |
|--------|-------|------------------|--------------|
| Tag-based filtering | Yes | Yes | Custom |
| Automatic sync | Yes | Yes | Manual |
| Independent routers | Yes | Yes | Custom |
| Schema checks | Included | Separate | Manual |
| Self-hosted | Yes | No | Yes |

---

## Technical Summary

### How It Works
Schema Contracts use @tag directives to mark schema elements for filtering. When creating a contract via CLI, you specify which tags to exclude. The control plane generates two schemas:

1. **Router Schema**: Used internally for query planning, includes @inaccessible fields needed for federation
2. **Client Schema**: Exposed via introspection, excludes all filtered elements

Contracts recompose automatically when:
- The contract is created
- Any subgraph is created, updated, moved, or deleted
- The source graph moves to a new namespace
- Label matchers on the source graph change
- A monograph source publishes a new schema

### Key Technical Features
- @tag directive on objects, interfaces, inputs, types, and fields
- Exclude patterns for filtering (e.g., `--exclude sensitive --exclude private`)
- Inherited labels from source graph (cannot be independently modified)
- Automatic namespace following of source graph
- Same graph type as source (federated or monograph)

### Integration Points
- CLI (`wgc contract create`, `wgc contract update`) for management
- Studio for viewing contract schemas and compositions
- Router deployment for serving contract schemas
- Schema Checks automatically validate contracts

### Requirements & Prerequisites
- Source graph (federated graph or monograph) with @tag annotations
- CLI authenticated with contract management permissions
- Router deployment infrastructure for each contract

---

## Documentation References

- Primary docs: `/docs/concepts/schema-contracts`
- Studio guide: `/docs/studio/schema-contracts`
- CLI reference: `/docs/cli/schema-contracts`
- Contract creation: `/docs/cli/schema-contracts/create`

---

## Keywords & SEO

### Primary Keywords
- Schema contracts
- GraphQL API versioning
- Multi-tenant GraphQL

### Secondary Keywords
- Schema filtering
- API segmentation
- Tag-based schema

### Related Search Terms
- GraphQL multiple audiences
- Filter GraphQL schema
- GraphQL public vs internal API

---

## Version History

| Date | Version | Changes |
|------|---------|---------|
| 2025-01-14 | 1.0 | Initial capability documentation |
