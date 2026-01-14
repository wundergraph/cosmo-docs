# Schema Registry

Centralized schema management with version history, comparison tools, and easy access to both federated and subgraph schemas.

---

## Metadata

| Field | Value |
|-------|-------|
| **Capability ID** | `cap-fed-004` |
| **Category** | Federation |
| **Status** | GA |
| **Availability** | Free / Pro / Enterprise |
| **Related Capabilities** | `cap-fed-002`, `cap-fed-003`, `cap-fed-007` |

---

## Quick Reference

### Name
Schema Registry

### Tagline
Your single source of truth for all GraphQL schemas.

### Elevator Pitch
The Schema Registry provides a centralized, version-controlled repository for all your GraphQL schemas. View the current state of your federated graph, explore individual subgraph schemas, track changes over time, and export schemas for development tools. It is the authoritative source for understanding your graph's structure and evolution.

---

## Problem & Solution

### The Problem
In distributed GraphQL architectures, schemas are scattered across multiple repositories and services. Developers struggle to find the current production schema, understand how types are defined across subgraphs, or get an authoritative view of the federated graph. Without a central registry, teams work with outdated schemas, miss type definitions, and lack visibility into the complete API surface.

### The Solution
Cosmo's Schema Registry maintains the authoritative version of all schemas in one place. The composed federated graph schema and each individual subgraph schema are accessible through Studio, with copy and download capabilities for integration with development tools. Last-updated timestamps ensure developers always know when schemas changed.

### Before & After

| Before Cosmo | With Cosmo |
|--------------|------------|
| Schemas scattered across repositories | Single source of truth in Studio |
| Unclear which schema version is active | Current production schema always visible |
| Manual schema file management | One-click copy or download |
| No visibility into subgraph schemas | View any subgraph schema instantly |

---

## Key Benefits

1. **Centralized Access**: View the complete federated graph schema and all subgraph schemas in one place
2. **Always Current**: Registry reflects the latest successfully composed schema
3. **Export Capabilities**: Copy to clipboard or download as `.graphql` files for tooling integration
4. **Subgraph Visibility**: Dropdown selection to view any subgraph's individual schema
5. **Change Tracking**: Last-updated timestamps show when schemas were modified

---

## Target Audience

### Primary Persona
- **Role**: Backend Developer / Frontend Developer
- **Pain Points**: Finding the current production schema; understanding type definitions across services; keeping local development in sync with production
- **Goals**: Quickly access accurate schema information for development and debugging

### Secondary Personas
- API consumers needing schema documentation
- Technical writers documenting APIs
- Solution architects reviewing API design

---

## Use Cases

### Use Case 1: Development Environment Setup
**Scenario**: A new developer needs to set up their local environment with the current production schema for code generation.
**How it works**: The developer opens Studio, navigates to the Schema Registry, and downloads the federated graph schema as a `.graphql` file. They import this into their code generation tooling.
**Outcome**: Local development environment matches production exactly with minimal setup time.

### Use Case 2: Debugging Type Definitions
**Scenario**: A frontend developer needs to understand how a particular type is defined and which subgraph owns it.
**How it works**: The developer views the federated schema to see the complete type definition. They then use the subgraph dropdown to check each relevant subgraph's contribution to that type.
**Outcome**: Clear understanding of type ownership and field definitions for debugging.

### Use Case 3: API Documentation
**Scenario**: A technical writer needs to document the current API for external consumers.
**How it works**: The writer accesses the Schema Registry, copies the complete federated schema, and uses it as the source for API documentation tools like GraphQL Voyager or SpectaQL.
**Outcome**: Accurate, up-to-date API documentation generated from the authoritative schema source.

---

## Competitive Positioning

### Key Differentiators
1. Integrated with composition, checks, and contracts for full lifecycle management
2. Both federated and individual subgraph schema visibility
3. Simple copy/download workflow for tooling integration
4. Clear last-updated timestamps for version awareness

### Comparison with Alternatives

| Aspect | Cosmo | Apollo Studio | DIY Solution |
|--------|-------|---------------|--------------|
| Federated schema view | Yes | Yes | Manual |
| Subgraph schema view | Yes | Yes | Manual |
| Download capability | Yes | Yes | Manual |
| Version timestamps | Yes | Yes | Custom |
| Self-hosted option | Yes | No | Yes |

---

## Technical Summary

### How It Works
The Schema Registry displays the most recent successfully composed schema for your federated graph. When a composition succeeds (triggered by subgraph publishing), the new schema becomes the active version in the registry. The registry maintains both the Router Schema (used for query planning, includes @inaccessible fields) and the Client Schema (exposed via introspection).

### Key Technical Features
- SDL (Schema Definition Language) view of complete schemas
- Subgraph selector for viewing individual service schemas
- One-click copy to clipboard
- Download as `.graphql` file
- Last-updated timestamp display

### Integration Points
- Composition engine for schema updates
- Studio UI for visualization and access
- CDN for router configuration (uses registry schemas)
- Code generation tools (via downloaded schemas)

### Requirements & Prerequisites
- Federated graph with at least one successful composition
- Studio access for viewing schemas
- Appropriate namespace permissions

---

## Documentation References

- Primary docs: `/docs/studio/schema-registry`
- Composition overview: `/docs/studio/compositions`
- Schema explorer: `/docs/studio/schema-explorer`

---

## Keywords & SEO

### Primary Keywords
- Schema registry
- GraphQL schema management
- Schema versioning

### Secondary Keywords
- Schema repository
- GraphQL schema storage
- Federated schema

### Related Search Terms
- GraphQL schema version control
- Central schema repository
- Schema documentation

---

## Version History

| Date | Version | Changes |
|------|---------|---------|
| 2025-01-14 | 1.0 | Initial capability documentation |
