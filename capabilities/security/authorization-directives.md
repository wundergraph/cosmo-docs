# Authorization Directives

## Metadata

| Field | Value |
|-------|-------|
| **Capability ID** | `cap-sec-002` |
| **Category** | Security |
| **Status** | GA |
| **Availability** | Free, Pro, Enterprise |
| **Related Capabilities** | `cap-sec-001` (JWT Authentication) |

---

## Quick Reference

### Name
Authorization Directives

### Tagline
Field-level access control with @authenticated and @requiresScopes.

### Elevator Pitch
Cosmo's authorization directives provide declarative, schema-driven access control for your federated GraphQL API. Using @authenticated and @requiresScopes directives, you can enforce authentication and fine-grained permission requirements directly in your schema, ensuring that sensitive data is protected at the field level without writing custom authorization logic.

---

## Problem & Solution

### The Problem
Traditional authorization approaches require implementing access control logic in resolvers, leading to scattered security code, inconsistent enforcement, and maintenance challenges. In federated architectures, this problem multiplies as each subgraph must independently implement authorization, risking security gaps and policy drift. Teams struggle to understand what data requires authentication and what permissions are needed to access specific fields.

### The Solution
Cosmo's authorization directives embed access control requirements directly in the GraphQL schema using @authenticated and @requiresScopes. The router evaluates these requirements before executing queries, returning clear authorization errors when requirements are not met. This approach provides a single source of truth for authorization policies, automatic enforcement across the federated graph, and clear documentation of access requirements visible in the schema itself.

### Before & After

| Before Cosmo | With Cosmo |
|--------------|------------|
| Authorization logic scattered across resolvers | Declarative directives in the schema |
| Inconsistent enforcement across subgraphs | Automatic propagation to federated graph |
| No visibility into access requirements | Schema documents authorization requirements |
| Custom code for every protected field | Zero-code authorization with directives |

---

## Key Benefits

1. **Schema-Driven Security**: Authorization requirements are visible directly in your GraphQL schema, serving as documentation and enforcement simultaneously.

2. **Automatic Federation**: Directives declared in any subgraph automatically propagate to the federated graph, ensuring consistent enforcement regardless of which subgraph resolves a field.

3. **Granular Control**: Apply directives at the field, object, interface, enum, or scalar level, with automatic propagation to all relevant field definitions.

4. **Flexible Scope Logic**: @requiresScopes supports complex AND/OR logic for permissions, enabling sophisticated access control policies like "(admin AND write) OR superuser".

5. **Graceful Degradation**: Nullable fields return partial data with authorization errors, while non-nullable fields fail the entire query, providing predictable behavior.

---

## Target Audience

### Primary Persona
- **Role**: Backend Developer / API Developer
- **Pain Points**: Implementing consistent authorization across services; documenting access requirements; preventing unauthorized data access
- **Goals**: Declarative security policies; reduced boilerplate code; clear authorization documentation

### Secondary Personas
- Security engineers auditing API access controls
- Architects designing secure data access patterns
- Compliance officers reviewing data protection measures

---

## Use Cases

### Use Case 1: Protecting Sensitive User Data
**Scenario**: A user profile API must ensure that personal information (email, phone, address) is only accessible to authenticated users, while public information (username, avatar) is available to everyone.

**How it works**: Apply @authenticated to sensitive fields in the User type. Unauthenticated requests receive partial data with public fields, while authenticated requests receive the complete profile.

**Outcome**: Sensitive data is automatically protected without resolver modifications, and the schema clearly documents which fields require authentication.

### Use Case 2: Role-Based Access Control
**Scenario**: An HR system has employee records with different access levels: basic info is readable by all employees, salary data requires HR permissions, and performance reviews require management access.

**How it works**: Use @requiresScopes with different scope requirements: `@requiresScopes(scopes: [["hr:read"]])` for salary fields and `@requiresScopes(scopes: [["management:read"], ["hr:admin"]])` for performance reviews (OR logic: managers OR HR admins).

**Outcome**: Fine-grained access control based on user roles, with clear error messages indicating required permissions when access is denied.

### Use Case 3: Multi-Subgraph Authorization Consistency
**Scenario**: A product catalog spans multiple subgraphs (inventory, pricing, reviews), and pricing data should only be visible to authenticated B2B customers.

**How it works**: Declare @authenticated on the price field in the pricing subgraph. The directive automatically propagates to the federated schema, enforcing authentication regardless of query path or subgraph resolution.

**Outcome**: Consistent authorization enforcement across the entire federated graph, with subgraph teams maintaining local control over their authorization requirements.

---

## Technical Summary

### How It Works
Authorization directives are evaluated at the router level before query execution. When a request includes fields with @authenticated or @requiresScopes directives, the router checks the authenticated claims from the JWT token. For @authenticated, any valid authentication satisfies the requirement. For @requiresScopes, the router evaluates the scope requirements using the specified AND/OR logic against the token's scope claims. Failed authorization results in error responses with clear messages indicating the requirement and actual permissions.

### Key Technical Features
- @authenticated directive for simple authentication checks
- @requiresScopes with nested array syntax for AND/OR logic
- Automatic directive propagation from types to fields
- Interface directive propagation to implementing types
- Cross-subgraph scope combination via matrix multiplication
- Partial data support for nullable fields
- Clear error messages with required vs. actual scopes

### Integration Points
- JWT Authentication for token validation and claim extraction
- Federation composition for directive propagation
- Custom modules for accessing authentication context
- GraphQL introspection for viewing authorization requirements

### Requirements & Prerequisites
- Router version 0.60.0 or higher
- Control plane version 0.58.0 or higher
- wgc CLI version 0.39.0 or higher
- JWT Authentication configured for the router

---

## Documentation References

- @authenticated directive: `/docs/federation/directives/authenticated`
- @requiresScopes directive: `/docs/federation/directives/requiresscopes`
- Authentication setup: `/docs/router/authentication-and-authorization`

---

## Keywords & SEO

### Primary Keywords
- GraphQL authorization
- Field-level access control
- GraphQL directives security

### Secondary Keywords
- @authenticated directive
- @requiresScopes directive
- Role-based access control GraphQL

### Related Search Terms
- GraphQL field authorization
- Federated GraphQL security
- Declarative authorization GraphQL

---

## Version History

| Date | Version | Changes |
|------|---------|---------|
| 2025-01-14 | 1.0 | Initial capability documentation |
