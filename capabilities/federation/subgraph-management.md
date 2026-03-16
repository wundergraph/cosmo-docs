# Subgraph Management

Create, publish, update, and delete subgraphs with full lifecycle management through CLI and Studio interfaces.

---

## Metadata

| Field | Value |
|-------|-------|
| **Capability ID** | `cap-fed-007` |
| **Category** | Federation |
| **Status** | GA |
| **Availability** | Free / Pro / Enterprise |
| **Related Capabilities** | `cap-fed-001`, `cap-fed-002`, `cap-fed-003` |

---

## Quick Reference

### Name
Subgraph Management

### Tagline
Complete lifecycle control for your federated services.

### Elevator Pitch
Subgraph Management provides comprehensive tools for managing the building blocks of your federated graph. From initial creation through publishing, updating, and eventual deprecation, Cosmo's CLI and Studio give teams complete control over subgraph lifecycles. Labels enable flexible composition rules, while namespace isolation supports multi-environment workflows.

---

## Problem & Solution

### The Problem
Managing subgraphs in a federated architecture involves multiple operations: registering new services, publishing schema changes, updating routing URLs, managing labels for composition, and safely retiring old services. Without unified tooling, teams juggle multiple systems, risk configuration drift, and lack visibility into subgraph states across environments.

### The Solution
Cosmo provides a complete subgraph lifecycle management solution:
- **Create**: Register new subgraphs with labels and routing URLs
- **Publish**: Push schema changes with automatic composition
- **Check**: Validate changes before publishing
- **Update**: Modify metadata like URLs and labels
- **Delete**: Safely remove subgraphs with impact analysis

All operations are available via CLI for automation and Studio for visual management.

### Before & After

| Before Cosmo | With Cosmo |
|--------------|------------|
| Manual subgraph registration | CLI/API-driven creation |
| Ad-hoc schema file distribution | Centralized publish workflow |
| Unclear subgraph-to-graph relationships | Label-based composition rules |
| Risky subgraph removal | Pre-deletion impact analysis |

---

## Key Benefits

1. **Full Lifecycle Control**: Create, publish, update, delete operations for complete management
2. **Label-Based Composition**: Flexible labeling system matches subgraphs to federated graphs
3. **Namespace Isolation**: Separate environments (dev, staging, prod) with namespace support
4. **Pre-Change Validation**: Check command validates impact before publishing
5. **Automation-Friendly**: CLI and API access for CI/CD integration

---

## Target Audience

### Primary Persona
- **Role**: Backend Developer / Platform Engineer
- **Pain Points**: Managing multiple subgraphs across environments; ensuring safe schema deployments; tracking subgraph configurations
- **Goals**: Efficiently manage subgraph lifecycle with confidence in deployment safety

### Secondary Personas
- DevOps engineers automating deployments
- Team leads tracking subgraph ownership
- Release managers coordinating schema changes

---

## Use Cases

### Use Case 1: New Subgraph Registration
**Scenario**: A team is launching a new microservice that needs to join the federated graph.
**How it works**: The team runs `wgc subgraph create products --label team=backend --routing-url http://products:4001/graphql`. This registers the subgraph with its routing URL and labels. They then publish the initial schema with `wgc subgraph publish products --schema ./schema.graphql`.
**Outcome**: New service is registered and composed into the federated graph automatically.

### Use Case 2: Safe Schema Update
**Scenario**: A developer needs to add new fields and deprecate old ones in an existing subgraph.
**How it works**: The developer first runs `wgc subgraph check products --schema ./new-schema.graphql` to validate the changes won't break existing clients. If checks pass, they run `wgc subgraph publish products --schema ./new-schema.graphql`.
**Outcome**: Schema changes deployed safely with pre-validation preventing breaking changes.

### Use Case 3: Environment Promotion
**Scenario**: A schema change tested in staging needs to be promoted to production.
**How it works**: The same schema file is published to the production namespace: `wgc subgraph publish products --namespace production --schema ./schema.graphql`. Labels match production federated graphs for automatic composition.
**Outcome**: Consistent schema promotion across environments with namespace isolation.

### Use Case 4: Subgraph Retirement
**Scenario**: A legacy subgraph is being deprecated and needs to be removed from the federated graph.
**How it works**: The team first runs `wgc subgraph check products --delete` to see the impact on all connected federated graphs. After confirming no critical dependencies, they run `wgc subgraph delete products`.
**Outcome**: Safe removal with pre-deletion impact analysis preventing accidental breakage.

---

## Competitive Positioning

### Key Differentiators
1. Combined create-and-publish in single command for streamlined workflows
2. Label-based composition for flexible graph membership
3. Pre-deletion impact analysis with `--delete` check
4. Event-Driven Graph support with `--edg` flag
5. Subscription protocol configuration per subgraph

### Comparison with Alternatives

| Aspect | Cosmo | Apollo Studio | DIY Solution |
|--------|-------|---------------|--------------|
| CLI management | Full | Full | Custom |
| Label-based composition | Yes | No (variants) | Custom |
| Pre-delete checks | Yes | Limited | Manual |
| Subscription config | Per-subgraph | Global | Custom |
| Self-hosted | Yes | No | Yes |

---

## Technical Summary

### How It Works
Subgraphs are registered in the control plane with unique names within their namespace. Each subgraph has:
- **Routing URL**: Where the router sends requests
- **Labels**: Key-value pairs for federated graph matching
- **Subscription settings**: Protocol and URL configuration
- **Schema**: The GraphQL SDL published via CLI

When a subgraph is published, the control plane triggers composition with all federated graphs whose label matchers include the subgraph's labels.

### Key Technical Features

**Create Operations:**
```bash
# Regular subgraph
wgc subgraph create products --label team=A --routing-url http://localhost:4001/graphql

# Event-Driven Graph
wgc subgraph create events --label team=A --edg
```

**Publish Operations:**
```bash
# Publish to existing subgraph
wgc subgraph publish products --schema ./schema.graphql

# Create and publish in one step
wgc subgraph publish products --schema ./schema.graphql --routing-url http://localhost:4001/graphql --label team=A
```

**Update Operations:**
```bash
# Update routing URL
wgc subgraph update products -r http://new-domain.com/graphql

# Update labels
wgc subgraph update products --label team=B department=eng
```

**Delete Operations:**
```bash
# Check deletion impact
wgc subgraph check products --delete

# Delete subgraph
wgc subgraph delete products
```

### Integration Points
- CLI (`wgc subgraph *`) for all operations
- Studio for visual management and schema viewing
- Composition engine for automatic graph updates
- Schema checks for pre-publish validation

### Requirements & Prerequisites
- Namespace access with appropriate permissions
- Routing URL accessible from router (for non-EDG subgraphs)
- Schema file in GraphQL SDL format

---

## Documentation References

- Primary docs: `/docs/cli/subgraph`
- Create command: `/docs/cli/subgraph/create`
- Publish command: `/docs/cli/subgraph/publish`
- Update command: `/docs/cli/subgraph/update`
- Delete command: `/docs/cli/subgraph/delete`
- Check command: `/docs/cli/subgraph/check`

---

## Keywords & SEO

### Primary Keywords
- Subgraph management
- GraphQL subgraph
- Federation subgraph

### Secondary Keywords
- Subgraph lifecycle
- GraphQL microservices
- Federated service management

### Related Search Terms
- Create GraphQL subgraph
- Publish subgraph schema
- Manage federation subgraphs

---

## Version History

| Date | Version | Changes |
|------|---------|---------|
| 2025-01-14 | 1.0 | Initial capability documentation |
