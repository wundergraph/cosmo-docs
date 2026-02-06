# Request Header Operations

## Metadata

| Field | Value |
|-------|-------|
| **Capability ID** | `cap-proxy-001` |
| **Category** | Proxy |
| **Status** | GA |
| **Availability** | Free, Pro, Enterprise |
| **Related Capabilities** | `cap-proxy-002` (Response Header Operations), `cap-proxy-003` (Forward Client Extensions) |

---

## Quick Reference

### Name
Request Header Operations

### Tagline
Inject and control headers flowing to your subgraphs.

### Elevator Pitch
Request Header Operations gives you complete control over HTTP headers sent from the Cosmo Router to your subgraphs. Propagate client headers, set static values, or dynamically compute headers using template expressions - all through simple YAML configuration without writing code.

---

## Problem & Solution

### The Problem
In federated GraphQL architectures, subgraphs often need context from the original client request - authentication tokens, user IDs, correlation IDs, or custom metadata. Without proper header management, teams either expose all headers (security risk) or manually implement forwarding logic in each subgraph. This leads to inconsistent security postures, duplicated code, and difficulty maintaining cross-cutting concerns like tracing and authentication.

### The Solution
Cosmo Router provides declarative header operations that let you precisely control which headers reach your subgraphs. Use exact matching or regex patterns to propagate client headers, set static values for service-to-service authentication, or use dynamic expressions to compute header values based on request context. Apply rules globally or per-subgraph, with predictable ordering and sensible defaults.

### Before & After

| Before Cosmo | With Cosmo |
|--------------|------------|
| All headers forwarded, creating security exposure | Explicit allowlist with propagate rules |
| Custom middleware needed for header manipulation | Declarative YAML configuration |
| Inconsistent header handling across services | Centralized, uniform header policies |
| No dynamic header computation | Template expressions for context-aware values |

---

## Key Benefits

1. **Security by Default**: No headers are forwarded automatically - you explicitly define what reaches subgraphs
2. **Flexible Matching**: Use exact names or regex patterns to propagate headers, with support for negation
3. **Dynamic Values**: Compute header values using template expressions with access to authentication claims and request context
4. **Per-Subgraph Control**: Apply different header rules to different subgraphs while maintaining global defaults
5. **Zero Code Required**: All configuration through YAML - no custom middleware or code changes needed

---

## Target Audience

### Primary Persona
- **Role**: Platform Engineer / API Gateway Administrator
- **Pain Points**: Needs to enforce consistent header policies across all subgraphs; wants to avoid custom code for header manipulation; requires security control over what data reaches backend services
- **Goals**: Implement secure, maintainable header forwarding; enable authentication context propagation; support tracing and observability headers

### Secondary Personas
- Backend developers who need specific headers in their subgraphs
- Security engineers reviewing data flow between services
- DevOps engineers implementing service mesh patterns

---

## Use Cases

### Use Case 1: Authentication Context Propagation
**Scenario**: Your subgraphs need the authenticated user's ID to authorize data access, but you use JWT authentication at the router level.
**How it works**: Configure a dynamic header using template expressions: `expression: "request.auth.isAuthenticated ? request.auth.claims.sub : ''"`. The router extracts the user ID from the validated JWT and forwards it as a header.
**Outcome**: Subgraphs receive user identity without parsing JWTs themselves, simplifying authorization logic and improving security.

### Use Case 2: Service-to-Service Authentication
**Scenario**: Your subgraphs require a shared secret header to verify requests come from the trusted router, not directly from external sources.
**How it works**: Use the `set` operation to add a static secret header: `name: "X-Internal-Auth"` with `value: "your-secret-key"`. Apply this globally or to specific subgraphs.
**Outcome**: Subgraphs can verify request authenticity, enabling zero-trust networking within your infrastructure.

### Use Case 3: Correlation ID Forwarding
**Scenario**: For distributed tracing, you need to propagate correlation IDs from client requests through to all subgraphs.
**How it works**: Configure a propagate rule with regex matching: `matching: (?i)^X-Correlation-.*` to forward all correlation headers. Set a `default` value for cases where clients don't provide one.
**Outcome**: Complete request tracing across your federated graph with consistent correlation IDs.

---

## Technical Summary

### How It Works
The Cosmo Router intercepts all incoming requests and applies configured header rules before forwarding to subgraphs. Rules are evaluated in order, with support for propagation (forwarding client headers), setting (adding new headers), and transformation (renaming headers). Template expressions provide access to request context including authentication claims.

### Key Technical Features
- Exact name matching with `named` parameter
- Regex pattern matching with `matching` parameter (Go regex syntax)
- Negation support with `negate_match` for inverse matching
- Header renaming with `rename` parameter
- Default values when headers are missing
- Template expressions for dynamic computation
- Per-subgraph override capability
- Automatic header canonicalization handling

### Integration Points
- Works with all subgraph types (HTTP, WebSocket)
- Integrates with router authentication for accessing claims in expressions
- Compatible with Custom Modules for advanced use cases

### Requirements & Prerequisites
- Cosmo Router with config.yaml access
- Understanding of HTTP header semantics
- For dynamic expressions: familiarity with template expression syntax

---

## Documentation References

- Primary docs: `/docs/router/proxy-capabilities/request-headers-operations`
- Configuration guide: `/docs/router/configuration#config-file`
- Template expressions: `/docs/router/configuration/template-expressions`
- Custom Modules: `/docs/router/custom-modules`

---

## Keywords & SEO

### Primary Keywords
- GraphQL header forwarding
- Request header propagation
- API gateway header manipulation

### Secondary Keywords
- Subgraph authentication
- HTTP header rules
- Federation header management

### Related Search Terms
- How to forward headers in GraphQL federation
- GraphQL router header configuration
- Propagate authentication headers to subgraphs

---

## Version History

| Date | Version | Changes |
|------|---------|---------|
| 2025-01-14 | 1.0 | Initial capability documentation |
