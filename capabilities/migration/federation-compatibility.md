# Federation Compatibility

## Metadata

| Field | Value |
|-------|-------|
| **Capability ID** | `cap-mig-003` |
| **Category** | Migration |
| **Status** | GA |
| **Availability** | Free |
| **Related Capabilities** | `cap-mig-001`, `cap-mig-002` |

---

## Quick Reference

### Name
Federation v1/v2 Compatibility

### Tagline
Full compatibility with Apollo Federation v1 and v2.

### Elevator Pitch
WunderGraph Cosmo provides comprehensive compatibility with Apollo Federation specifications, supporting both v1 and v2 directives. Teams can migrate existing federated graphs without modifying subgraph schemas, ensuring a smooth transition path while gaining access to Cosmo's enhanced features.

---

## Problem & Solution

### The Problem
Teams with existing Apollo Federation implementations need assurance that their schemas, directives, and subgraph configurations will work correctly when migrating to a new platform. Incomplete directive support could mean extensive schema rewrites, breaking changes, and extended migration timelines.

### The Solution
Cosmo implements comprehensive Federation compatibility, supporting all standard Federation v1 directives and the vast majority of v2 directives through version 2.5. This means your existing federated schemas work out of the box, with no modifications required for core Federation functionality.

### Before & After

| Before Cosmo | With Cosmo |
|--------------|------------|
| Uncertainty about directive support | Clear compatibility matrix |
| Fear of schema rewrites | Existing schemas work unchanged |
| Version compatibility concerns | Support for v1 through v2.5 |
| Migration risk | Validated compatibility |

---

## Key Benefits

1. **Complete v1 Support**: All Federation v1 directives (@key, @extends, @external, @provides, @requires, @tag) fully supported
2. **Extensive v2 Support**: Comprehensive support for v2 directives through version 2.5 including @shareable, @inaccessible, @override, @authenticated, @requiresScopes
3. **Zero Schema Changes**: Migrate existing federated schemas without modification
4. **Future-Ready**: Ongoing development to support new Federation features as they're released
5. **Transparent Roadmap**: Clear documentation of supported vs. planned directives

---

## Target Audience

### Primary Persona
- **Role**: API Architect / Backend Developer
- **Pain Points**: Schema compatibility concerns, directive support uncertainty, migration complexity
- **Goals**: Ensure existing Federation schemas work without modification; understand exactly what's supported

### Secondary Personas
- Platform engineers evaluating migration feasibility
- Technical leads assessing platform compatibility
- DevOps teams planning migration timelines

---

## Use Cases

### Use Case 1: Federation v1 Migration
**Scenario**: A team running Federation v1 with @key, @extends, @external, @provides, and @requires directives
**How it works**: All v1 directives are fully supported; schemas migrate directly without changes
**Outcome**: Complete schema compatibility with zero modifications required

### Use Case 2: Federation v2 with Authorization
**Scenario**: A team using Federation v2.5 with @authenticated and @requiresScopes for field-level authorization
**How it works**: Cosmo supports both @authenticated and @requiresScopes directives natively
**Outcome**: Authorization logic continues working identically after migration

### Use Case 3: Mixed Version Subgraphs
**Scenario**: An organization with some subgraphs using v1 directives and others using v2
**How it works**: Cosmo's composition engine handles mixed-version subgraphs, supporting all directives appropriately
**Outcome**: No need to standardize subgraph versions before migration

---

## Competitive Positioning

### Key Differentiators
1. Transparent compatibility matrix with clear support status for each directive
2. Support for latest Federation 2.5 features including authorization directives
3. Composite key support for complex entity resolution scenarios

### Comparison with Alternatives

| Directive Category | Cosmo | Federation Spec |
|-------------------|-------|-----------------|
| Core v1 (@key, @extends, @external, @provides, @requires) | Full Support | Reference |
| v2.0 (@shareable, @inaccessible, @override) | Full Support | Reference |
| v2.3 (@interfaceObject, @key on INTERFACE) | Full Support | Reference |
| v2.5 (@authenticated, @requiresScopes) | Full Support | Reference |
| @composeDirective | Planned | v2.1 |

### Common Objections & Responses

| Objection | Response |
|-----------|----------|
| "Do you support composite keys?" | Yes—@key with composite keys is fully supported |
| "What about @interfaceObject?" | Fully supported as of Federation 2.3 compatibility |
| "Is @shareable supported?" | Yes—full support for shareable fields across subgraphs |

---

## Technical Summary

### How It Works
Cosmo's composition engine processes subgraph schemas and applies Federation directives according to the specification. The router generates optimized query plans that respect entity resolution, key fields, and cross-subgraph references defined by Federation directives.

### Key Technical Features
- **Federation v1 Directives**: @extends, @external, @key (including composite keys), @provides, @requires, @tag
- **Federation v2.0 Directives**: @inaccessible, @override, @shareable, @key "resolvable" argument, @link
- **Federation v2.1 Directives**: @requires "fields" argument (supported), @composeDirective (planned)
- **Federation v2.3 Directives**: @key on INTERFACE, @interfaceObject
- **Federation v2.5 Directives**: @authenticated, @requiresScopes

### Integration Points
- Apollo Federation-compatible subgraphs
- Any GraphQL server implementing Federation spec
- Schema registries and CI/CD pipelines

### Requirements & Prerequisites
- Subgraphs implementing Federation v1 or v2 specification
- Valid Federation schema with proper directive usage
- Cosmo account for graph management

---

## Documentation References

- Compatibility matrix: `/docs/federation/federation-compatibility-matrix`
- @shareable directive: `/docs/federation/directives/shareable`
- @authenticated directive: `/docs/federation/directives/authenticated`
- @requiresScopes directive: `/docs/federation/directives/requiresscopes`
- Federation overview: `/docs/federation`

---

## Keywords & SEO

### Primary Keywords
- Federation compatibility
- Apollo Federation support
- Federation v2 compatibility

### Secondary Keywords
- GraphQL Federation directives
- Federation migration
- Subgraph compatibility

### Related Search Terms
- Does Cosmo support Federation v2
- Federation directive compatibility matrix
- Apollo Federation alternatives with v2 support

---

## Version History

| Date | Version | Changes |
|------|---------|---------|
| 2025-01-14 | 1.0 | Initial capability documentation |
