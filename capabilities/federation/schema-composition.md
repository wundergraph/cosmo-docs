# Schema Composition

Automatic composition of federated graphs from multiple subgraphs with comprehensive error detection and version tracking.

---

## Metadata

| Field | Value |
|-------|-------|
| **Capability ID** | `cap-fed-002` |
| **Category** | Federation |
| **Status** | GA |
| **Availability** | Free / Pro / Enterprise |
| **Related Capabilities** | `cap-fed-001`, `cap-fed-003`, `cap-fed-004` |

---

## Quick Reference

### Name
Schema Composition

### Tagline
Automatically compose subgraphs into a unified federated graph.

### Elevator Pitch
WunderGraph Cosmo's Schema Composition automatically merges multiple subgraph schemas into a single, cohesive federated graph. Every composition is tracked with detailed version history, error reporting, and change detection, giving teams complete visibility into their graph's evolution and ensuring routers always serve valid, optimized configurations.

---

## Problem & Solution

### The Problem
In federated GraphQL architectures, combining multiple subgraph schemas into a working supergraph is complex and error-prone. Schema conflicts, missing fields, incompatible types, and broken references can all cause composition failures. Without proper tooling, teams discover these issues only after deployment, leading to production incidents and frustrated developers trying to trace issues across multiple services.

### The Solution
Cosmo's composition engine automatically validates and merges subgraph schemas whenever changes are published. Every composition attempt is recorded with detailed inputs, outputs, and any errors encountered. Teams can track the complete history of their federated graph, understand what changed between versions, and know exactly which version is currently served by their routers.

### Before & After

| Before Cosmo | With Cosmo |
|--------------|------------|
| Manual schema merging with potential errors | Automatic composition on every publish |
| No visibility into composition history | Complete audit trail of all compositions |
| Difficult to identify what changed | Visual diff between schema versions |
| Unclear which version routers are using | Clear indication of active router configuration |

---

## Key Benefits

1. **Automatic Composition**: Schemas are composed automatically when subgraphs are published, with no manual intervention required
2. **Comprehensive Error Detection**: Composition errors are caught and reported before they can affect production routers
3. **Version History**: Every composition is tracked, enabling rollback and audit capabilities
4. **Change Visibility**: Visual diffs show exactly what changed in the federated graph after each composition
5. **Router Synchronization**: Clear visibility into which composed schema version is active on routers

---

## Target Audience

### Primary Persona
- **Role**: Platform Engineer / GraphQL Architect
- **Pain Points**: Managing schema evolution across multiple teams; ensuring composition validity before deployment; tracking changes for compliance
- **Goals**: Maintain a stable, well-documented federated graph that evolves safely over time

### Secondary Personas
- Backend developers publishing subgraph changes
- DevOps engineers monitoring graph health
- Compliance officers requiring audit trails

---

## Use Cases

### Use Case 1: Continuous Schema Evolution
**Scenario**: A development team publishes multiple subgraph updates daily and needs confidence that each change composes correctly.
**How it works**: When a developer runs `wgc subgraph publish`, Cosmo automatically attempts composition with all other subgraphs. If successful, the new composed schema is made available to routers. If not, detailed errors are logged and the existing valid schema remains active.
**Outcome**: Continuous delivery of schema changes with automatic validation and zero-downtime updates.

### Use Case 2: Debugging Composition Failures
**Scenario**: A new subgraph update fails to compose, and the team needs to understand why.
**How it works**: The Compositions page in Studio shows the failed composition attempt with detailed error messages indicating exactly which types, fields, or directives caused the conflict. Developers can see the input schemas and understand the root cause.
**Outcome**: Rapid identification and resolution of schema conflicts with clear, actionable error messages.

### Use Case 3: Schema Version Audit
**Scenario**: A compliance review requires documentation of all schema changes over the past quarter.
**How it works**: The Compositions page provides a complete history of all composition attempts with timestamps, triggering users, and resulting schemas. Teams can export this information and compare any two versions.
**Outcome**: Full audit trail for compliance requirements with minimal manual effort.

---

## Competitive Positioning

### Key Differentiators
1. Integrated with full lifecycle management (checks, registry, contracts)
2. Visual Studio interface for exploring composition history
3. Clear router synchronization status
4. Detailed error messages with actionable guidance

### Comparison with Alternatives

| Aspect | Cosmo | Apollo Studio | DIY Solution |
|--------|-------|---------------|--------------|
| Automatic composition | Yes | Yes | Manual |
| Composition history | Full | Limited | None |
| Visual diffs | Yes | Yes | No |
| Router sync visibility | Yes | Yes | No |
| Self-hosted option | Yes | No | Yes |

---

## Technical Summary

### How It Works
When a subgraph schema is published via the CLI or API, the control plane triggers a composition process. This process validates the new schema against all other subgraphs in the federated graph, checking for type conflicts, missing references, and federation directive compliance. If composition succeeds, the new router configuration is pushed to the CDN. Routers periodically check for updates and hot-reload the new configuration.

### Key Technical Features
- Real-time composition on subgraph publish
- Detailed composition error reporting with field-level precision
- Schema diff visualization showing additions, removals, and modifications
- Composition trigger tracking (who, when, what)
- Router configuration version tracking

### Integration Points
- CLI (`wgc subgraph publish`) for triggering compositions
- Studio for viewing composition history and errors
- CDN for distributing composed schemas to routers
- Schema Checks for pre-publish validation

### Requirements & Prerequisites
- At least one subgraph created in the namespace
- Federated graph configured with label matchers
- CLI authenticated with appropriate permissions

---

## Documentation References

- Primary docs: `/docs/studio/compositions`
- Publishing schemas: `/docs/cli/subgraph/publish`
- Schema checks: `/docs/studio/schema-checks`
- Federated graph setup: `/docs/cli/federated-graph/create`

---

## Keywords & SEO

### Primary Keywords
- Schema composition
- GraphQL federation composition
- Supergraph composition

### Secondary Keywords
- Subgraph merging
- Schema validation
- Federation errors

### Related Search Terms
- GraphQL schema composition errors
- Federated graph composition
- Subgraph composition validation

---

## Version History

| Date | Version | Changes |
|------|---------|---------|
| 2025-01-14 | 1.0 | Initial capability documentation |
