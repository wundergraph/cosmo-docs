# Federation Directives

Extended directive support including @shareable, @authenticated, @requiresScopes, and more for advanced federation scenarios and security policies.

---

## Metadata

| Field | Value |
|-------|-------|
| **Capability ID** | `cap-fed-006` |
| **Category** | Federation |
| **Status** | GA |
| **Availability** | Free / Pro / Enterprise |
| **Related Capabilities** | `cap-fed-001`, `cap-fed-002`, `cap-fed-005` |

---

## Quick Reference

### Name
Federation Directives

### Tagline
Complete directive support for sophisticated federation patterns.

### Elevator Pitch
WunderGraph Cosmo supports a comprehensive set of federation directives for building sophisticated distributed GraphQL architectures. From core federation patterns (@key, @external, @requires) to advanced authorization (@authenticated, @requiresScopes) and cross-subgraph field sharing (@shareable), Cosmo provides the building blocks for enterprise-grade federated APIs with built-in security.

---

## Problem & Solution

### The Problem
Building federated GraphQL architectures requires expressing complex relationships between subgraphs: entity resolution, field dependencies, cross-service sharing, and access control. Without comprehensive directive support, teams resort to workarounds, custom middleware, or are blocked from implementing required patterns. Authorization is particularly challenging, requiring custom code in every subgraph.

### The Solution
Cosmo supports the full spectrum of federation directives plus extensions for common enterprise needs:
- **Core Federation**: @key, @external, @requires, @provides, @extends for entity relationships
- **Field Sharing**: @shareable, @override for multi-subgraph field resolution
- **Visibility Control**: @inaccessible, @tag for schema filtering
- **Authorization**: @authenticated, @requiresScopes for declarative security policies
- **Subscription Filtering**: @openfed__subscriptionFilter for event filtering

### Before & After

| Before Cosmo | With Cosmo |
|--------------|------------|
| Limited directive support | Full v1 and v2 directive compatibility |
| Custom authorization middleware | Declarative @authenticated and @requiresScopes |
| Complex field sharing logic | Simple @shareable directive |
| No subscription filtering | @openfed__subscriptionFilter for real-time |

---

## Key Benefits

1. **Complete Federation Support**: All Apollo Federation v1 and v2 directives fully implemented
2. **Declarative Authorization**: @authenticated and @requiresScopes enforce security at the router level
3. **Cross-Subgraph Sharing**: @shareable enables the same field to be resolved from multiple subgraphs
4. **Interface Entities**: @interfaceObject and @key on interfaces for advanced type patterns
5. **Custom Extensions**: Cosmo-specific directives for subscription filtering and description configuration

---

## Target Audience

### Primary Persona
- **Role**: Backend Developer / GraphQL Architect
- **Pain Points**: Implementing complex federation patterns; securing federated graphs; sharing fields across services
- **Goals**: Build sophisticated, secure, maintainable federated architectures using declarative patterns

### Secondary Personas
- Security engineers implementing authorization policies
- Platform engineers designing federation patterns
- DevOps engineers understanding router behavior

---

## Use Cases

### Use Case 1: Declarative Authentication
**Scenario**: An API requires certain fields to be accessible only to authenticated users.
**How it works**: Fields or types are annotated with `@authenticated`. The router automatically validates authentication tokens before resolving these fields. Unauthenticated requests receive authorization errors without hitting subgraphs.
**Outcome**: Security enforced at the router level with zero subgraph code changes.

### Use Case 2: Scope-Based Authorization
**Scenario**: Different API consumers have different permission levels based on JWT scopes.
**How it works**: Fields are annotated with `@requiresScopes(scopes: [["read:users"], ["admin"]])`. The router validates that the request's JWT contains the required scopes before allowing access.
**Outcome**: Fine-grained, declarative authorization based on token scopes.

### Use Case 3: Cross-Subgraph Field Resolution
**Scenario**: Multiple subgraphs can resolve the same field (e.g., a User's name), and any should be able to serve requests.
**How it works**: The field is marked `@shareable` in all subgraphs that can resolve it. The query planner chooses the optimal subgraph based on the query plan.
**Outcome**: Flexible field resolution with automatic load distribution.

### Use Case 4: Entity Interface Patterns
**Scenario**: An interface needs to be resolvable across subgraphs with consistent entity resolution.
**How it works**: The interface is declared with `@key(fields: "id")`. Subgraphs that contribute fields to implementing types use `@interfaceObject` to add fields to all implementations.
**Outcome**: Clean interface-based entity patterns with proper federation support.

---

## Competitive Positioning

### Key Differentiators
1. Complete v1 and v2 directive support in a single router
2. Extended authorization directives (@authenticated, @requiresScopes) with router-level enforcement
3. Cosmo-specific extensions for subscription filtering
4. Clear documentation of directive behavior and normalization

### Comparison with Alternatives

| Aspect | Cosmo | Apollo Router | Other Solutions |
|--------|-------|---------------|-----------------|
| v1 Directives | Full | Partial | Varies |
| v2 Directives | Full | Full | Partial |
| @authenticated | Yes | Yes | Custom |
| @requiresScopes | Yes | Yes | Custom |
| Custom extensions | Yes | Limited | Varies |

---

## Technical Summary

### How It Works
Directives are processed during schema composition and query planning. Authorization directives (@authenticated, @requiresScopes) are evaluated at the router level before subgraph requests. Field-level directives (@shareable, @provides, @requires) influence query planning decisions. The router normalizes directive declarations across subgraphs to produce a consistent federated schema.

### Key Technical Features

**Core Federation Directives:**
- `@key`: Declares entity primary keys (supports composite keys and resolvable argument)
- `@external`: Marks fields owned by other subgraphs
- `@requires`: Declares field dependencies from other subgraphs
- `@provides`: Indicates conditionally available fields
- `@extends`: Marks type extensions (v1 compatibility)

**Federation v2 Directives:**
- `@shareable`: Enables multi-subgraph field resolution
- `@inaccessible`: Hides fields from client schema
- `@override`: Migrates field ownership between subgraphs
- `@interfaceObject`: Contributes fields to interface implementers
- `@tag`: Attaches metadata for contracts and tooling

**Authorization Directives:**
- `@authenticated`: Requires valid authentication
- `@requiresScopes`: Requires specific JWT scopes (AND/OR logic)

**Cosmo Extensions:**
- `@openfed__subscriptionFilter`: Filters subscription events
- `@openfed__configureDescription`: Controls description propagation
- `@semanticNonNull`: Indicates semantic non-nullability

### Integration Points
- Composition engine for directive validation
- Router for authorization enforcement
- Query planner for field resolution decisions
- Authentication providers for token validation

### Requirements & Prerequisites
- Subgraph schemas with proper directive declarations
- For authorization: JWT provider configuration on router
- For subscriptions: Event-driven federation setup

---

## Documentation References

- Primary docs: `/docs/federation/federation-directives-index`
- @shareable: `/docs/federation/directives/shareable`
- @authenticated: `/docs/federation/directives/authenticated`
- @requiresScopes: `/docs/federation/directives/requiresscopes`
- Compatibility matrix: `/docs/federation/federation-compatibility-matrix`
- Authentication setup: `/docs/router/authentication-and-authorization`

---

## Keywords & SEO

### Primary Keywords
- Federation directives
- GraphQL authorization directives
- @shareable directive

### Secondary Keywords
- @authenticated GraphQL
- @requiresScopes
- Federation v2 directives

### Related Search Terms
- GraphQL federation @key directive
- Declarative GraphQL authorization
- Cross-subgraph field sharing

---

## Version History

| Date | Version | Changes |
|------|---------|---------|
| 2025-01-14 | 1.0 | Initial capability documentation |
