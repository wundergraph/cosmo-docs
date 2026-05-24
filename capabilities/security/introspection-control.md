# Introspection Control

## Metadata

| Field | Value |
|-------|-------|
| **Capability ID** | `cap-sec-006` |
| **Category** | Security |
| **Status** | GA |
| **Availability** | Free, Pro, Enterprise |
| **Related Capabilities** | `cap-sec-005` (Security Hardening), `cap-sec-001` (JWT Authentication) |

---

## Quick Reference

### Name
Introspection Control

### Tagline
Disable schema introspection in production environments.

### Elevator Pitch
Cosmo Router allows you to control GraphQL introspection queries, a powerful feature that exposes your entire API schema. While essential for development and tooling, introspection in production reveals your API structure to potential attackers. Disable introspection to hide your schema or selectively bypass authentication for introspection in secure internal environments.

---

## Problem & Solution

### The Problem
GraphQL introspection allows clients to query the complete schema, including all types, fields, queries, mutations, and their descriptions. While invaluable during development, this feature in production environments provides attackers with a complete map of your API, revealing potential attack vectors, sensitive data types, and internal naming conventions. Organizations need control over when and how introspection is available.

### The Solution
Cosmo Router provides granular control over introspection behavior. In production, disable introspection entirely to hide your schema from potential attackers. For internal environments, selectively bypass authentication for introspection queries to support tooling while maintaining protection for regular queries. An optional introspection secret adds an additional layer of security.

### Before & After

| Before Cosmo | With Cosmo |
|--------------|------------|
| Schema exposed to all clients | Introspection disabled in production |
| No control over schema visibility | Granular introspection settings |
| All-or-nothing authentication | Optional introspection authentication bypass |
| No introspection-specific secrets | Dedicated secret for secure introspection |

---

## Key Benefits

1. **Schema Protection**: Hide your complete API schema from unauthorized users and potential attackers.

2. **Flexible Authentication Bypass**: Allow introspection queries without authentication for internal tooling while requiring authentication for all other queries.

3. **Dedicated Introspection Secret**: Optionally protect introspection access with a separate secret, independent of your authentication system.

4. **Development-Production Parity**: Maintain similar configurations between environments with just the introspection toggle changed.

5. **Tooling Compatibility**: Support schema-aware tools in controlled environments without exposing the schema publicly.

---

## Target Audience

### Primary Persona
- **Role**: Platform Engineer / DevOps Engineer
- **Pain Points**: Balancing tooling needs with security; preventing schema exposure; managing different requirements across environments
- **Goals**: Secure production deployments; functional development environments; controlled schema access

### Secondary Personas
- Security engineers defining API exposure policies
- Backend developers using GraphQL tooling
- Architects designing secure API gateways

---

## Use Cases

### Use Case 1: Secure Production Deployment
**Scenario**: An organization is deploying their GraphQL API to production and needs to prevent schema discovery by potential attackers.

**How it works**: Set `introspection.enabled: false` in the production router configuration. All introspection queries return an error, hiding the complete API structure.

**Outcome**: The API schema is hidden from clients, eliminating schema discovery as an attack vector.

### Use Case 2: Internal Tooling with Authentication
**Scenario**: A team uses GraphQL tooling (Postman, GraphQL Playground, custom IDEs) in their secure internal network but has authentication enabled on the router. They want tools to work without requiring token setup.

**How it works**: Enable `authentication.ignore_introspection: true` to bypass JWT validation for introspection queries only. Regular queries still require valid authentication tokens.

**Outcome**: Tooling works seamlessly in internal environments while all data queries remain protected by authentication.

### Use Case 3: Secret-Protected Introspection
**Scenario**: A team needs introspection available for specific tooling but wants an additional security layer beyond network access.

**How it works**: Configure `introspection.secret` with a dedicated value. Tools must include this secret in the Authorization header (without Bearer prefix) to perform introspection.

**Outcome**: Introspection is available only to tools configured with the secret, adding defense in depth.

---

## Technical Summary

### How It Works
The Cosmo Router intercepts all incoming GraphQL queries and checks if they are introspection queries (queries on `__schema` or `__type`). Based on configuration, the router either allows, blocks, or applies special authentication handling to these queries. When introspection is disabled, the router returns an error without executing the query. When authentication bypass is enabled for introspection, the router skips JWT validation for introspection queries while still requiring it for all other operations.

### Key Technical Features

**Disable Introspection**
```yaml
introspection:
  enabled: false
```

**Bypass Authentication for Introspection**
```yaml
authentication:
  ignore_introspection: true
  # other auth settings
```

**Introspection Secret**
```yaml
introspection:
  secret: 'dedicated_secret_for_introspection'
```

**Introspection Query Example**
```bash
curl -X POST http://localhost:3002/graphql \
  --header "Content-Type: application/json" \
  --header "Authorization: dedicated_secret_for_introspection" \
  --data '{"query": "{ __schema { types { name } } }"}'
```

### Integration Points
- JWT Authentication (for bypass configuration)
- GraphQL tooling (Postman, Apollo Studio, GraphQL Playground)
- CI/CD pipelines for schema validation
- Schema registries

### Requirements & Prerequisites
- Router configured with authentication for bypass feature
- Introspection secret if using secret-protected access
- Network security for internal tooling scenarios

---

## Documentation References

- Primary docs: `/docs/router/security/hardening-guide` (Disable Introspection section)
- Authentication configuration: `/docs/router/authentication-and-authorization`
- Router configuration: `/docs/router/configuration`

---

## Keywords & SEO

### Primary Keywords
- GraphQL introspection security
- Disable GraphQL introspection
- GraphQL schema protection

### Secondary Keywords
- GraphQL production security
- Hide GraphQL schema
- Introspection query control

### Related Search Terms
- Should I disable GraphQL introspection
- GraphQL introspection attack
- Secure GraphQL schema

---

## Version History

| Date | Version | Changes |
|------|---------|---------|
| 2025-01-14 | 1.0 | Initial capability documentation |
