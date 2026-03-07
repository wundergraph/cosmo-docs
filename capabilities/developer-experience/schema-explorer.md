# Schema Explorer

Interactive schema browsing with search, usage tracking, and authentication visibility.

---

## Metadata

| Field | Value |
|-------|-------|
| **Capability ID** | `cap-dx-004` |
| **Category** | Developer Experience |
| **Status** | GA |
| **Availability** | Free / Pro / Enterprise |
| **Related Capabilities** | `cap-dx-005`, `cap-dx-008` |

---

## Quick Reference

### Name
Schema Explorer

### Tagline
Navigate your entire federated schema interactively.

### Elevator Pitch
Cosmo's Schema Explorer provides an interactive interface to browse your entire federated GraphQL schema. Navigate between types, view field details, search instantly with keyboard shortcuts, and see real-world usage data for every field. Identify deprecated fields, understand authentication requirements, and explore your schema without switching contexts.

---

## Problem & Solution

### The Problem
Understanding a large federated GraphQL schema is challenging. Developers struggle to find types, track field usage, and understand which fields require authentication. Schema documentation is often outdated, and there's no easy way to see how the schema has evolved or which fields are safe to deprecate.

### The Solution
The Schema Explorer provides a living, interactive view of your federated schema. Navigate from Query to nested types with clicks, search for any type with `Cmd/Ctrl + K`, and see real usage metrics alongside field definitions. View all deprecated fields in one place with their usage data, and instantly identify which fields require authentication scopes.

### Before & After

| Before Cosmo | With Cosmo |
|--------------|------------|
| Read raw SDL files to understand schema | Interactive navigation between types |
| No visibility into field usage | Usage metrics for every field |
| Search through files for types | Instant search with keyboard shortcut |
| Unclear which fields need auth | Authentication requirements displayed inline |

---

## Key Benefits

1. **Interactive Navigation**: Click through types, interfaces, unions, and enums to explore your schema naturally
2. **Instant Search**: `Cmd/Ctrl + K` opens search modal to jump to any type immediately
3. **Usage Tracking**: See real-world usage data for every field, powered by analytics
4. **Deprecated Fields View**: All deprecated fields in one place with their usage metrics
5. **Authentication Visibility**: View `@authenticated` and `@requiresScopes` directives with scope details

---

## Target Audience

### Primary Persona
- **Role**: GraphQL Developer / API Consumer
- **Pain Points**: Finding types in large schemas; understanding field usage; knowing auth requirements
- **Goals**: Quickly understand available fields; make informed decisions about field usage; know what auth is needed

### Secondary Personas
- Frontend developers discovering available API fields
- Platform engineers reviewing schema structure
- API designers planning schema evolution

---

## Use Cases

### Use Case 1: Schema Discovery
**Scenario**: A frontend developer needs to find all available fields for building a user profile page
**How it works**: The developer opens Schema Explorer, uses `Cmd + K` to search for "User", and navigates through the User type to see all available fields, their types, and descriptions
**Outcome**: Developer quickly identifies the exact fields needed without reading SDL files or asking teammates

### Use Case 2: Safe Deprecation Planning
**Scenario**: A platform team wants to deprecate a field but needs to know if it's still in use
**How it works**: The team views the deprecated fields list, checks usage metrics for the field in question, and sees it still has significant traffic
**Outcome**: Team decides to communicate deprecation to consumers before removal, avoiding breaking changes

### Use Case 3: Understanding Authentication Requirements
**Scenario**: A developer is building a feature and needs to know which fields require specific auth scopes
**How it works**: The developer opens the Authenticated Types and Fields view, finds the relevant types, and clicks "View scopes" to see the required scopes for each protected field
**Outcome**: Developer implements correct auth handling before making API calls, avoiding auth errors

---

## Technical Summary

### How It Works
The Schema Explorer parses the composed federated schema and renders it as an interactive UI. Each type links to its field types, enabling click-through navigation. Usage data is pulled from Cosmo's analytics pipeline and displayed alongside field definitions. Authentication directives are extracted from the router schema and presented in dedicated views.

### Key Technical Features
- Full type navigation: objects, interfaces, enums, unions, inputs
- Field details including arguments and descriptions
- `Cmd/Ctrl + K` global search
- Schema field usage metrics integration
- Deprecated fields aggregated view
- `@authenticated` and `@requiresScopes` directive visibility
- Scope requirements expandable per field

### Integration Points
- Cosmo Studio
- Cosmo Analytics (for usage data)
- Router Schema (for auth directives)

### Requirements & Prerequisites
- Federated graph deployed to Cosmo
- Analytics enabled for usage tracking (optional but recommended)

---

## Documentation References

- Primary docs: `/docs/studio/schema-explorer`
- Field usage analytics: `/docs/studio/analytics/schema-field-usage`

---

## Keywords & SEO

### Primary Keywords
- GraphQL schema explorer
- Schema documentation
- Field usage tracking

### Secondary Keywords
- Interactive schema browser
- Deprecated field management
- GraphQL authentication directives

### Related Search Terms
- How to explore GraphQL schema
- GraphQL field usage analytics
- Schema documentation tool

---

## Version History

| Date | Version | Changes |
|------|---------|---------|
| 2025-01-14 | 1.0 | Initial capability documentation |
