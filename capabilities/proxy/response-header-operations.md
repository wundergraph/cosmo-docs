# Response Header Operations

## Metadata

| Field | Value |
|-------|-------|
| **Capability ID** | `cap-proxy-002` |
| **Category** | Proxy |
| **Status** | GA |
| **Availability** | Free, Pro, Enterprise |
| **Related Capabilities** | `cap-proxy-001` (Request Header Operations), `cap-proxy-003` (Forward Client Extensions) |

---

## Quick Reference

### Name
Response Header Operations

### Tagline
Control response headers from subgraphs to clients.

### Elevator Pitch
Response Header Operations gives you precise control over which headers from your subgraphs reach the client. Choose from multiple propagation algorithms to handle headers from parallel subgraph requests, set custom response headers, and maintain tight control over caching directives and security headers.

---

## Problem & Solution

### The Problem
In federated GraphQL, a single client request often fans out to multiple subgraphs that execute in parallel. Each subgraph may return its own response headers - cache directives, rate limit info, custom metadata. Without intelligent aggregation, you either lose important headers or face unpredictable behavior when the same header comes from multiple sources. Traditional solutions require complex custom code to merge headers correctly.

### The Solution
Cosmo Router provides declarative response header operations with multiple propagation algorithms. Choose `first_write` to keep the first value, `last_write` to use the most recent, or `append` to combine values from all subgraphs. Apply rules globally or per-subgraph, use regex patterns for flexible matching, and set static headers for consistent client responses.

### Before & After

| Before Cosmo | With Cosmo |
|--------------|------------|
| Random header selection from parallel responses | Deterministic algorithms (first_write, last_write, append) |
| Lost cache headers from subgraphs | Controlled propagation of cache directives |
| Custom code needed for header merging | Declarative YAML configuration |
| Inconsistent response headers | Uniform, predictable header policies |

---

## Key Benefits

1. **Deterministic Behavior**: Choose from three algorithms to handle headers from multiple subgraphs predictably
2. **Cache Control**: Properly propagate cache headers from subgraphs to enable client-side and CDN caching
3. **Security by Default**: No response headers forwarded unless explicitly configured
4. **Flexible Matching**: Use exact names or regex patterns with optional negation
5. **Per-Subgraph Rules**: Apply different propagation rules to different subgraphs when needed

---

## Target Audience

### Primary Persona
- **Role**: Platform Engineer / API Gateway Administrator
- **Pain Points**: Needs predictable header behavior from federated responses; wants to enable proper caching; requires control over security headers sent to clients
- **Goals**: Implement consistent response header policies; enable CDN caching; ensure security headers reach clients correctly

### Secondary Personas
- Frontend developers who rely on specific response headers
- Performance engineers optimizing caching strategies
- Security engineers managing response header policies

---

## Use Cases

### Use Case 1: Cache Header Propagation
**Scenario**: Your subgraphs return `Cache-Control` headers, and you need to propagate appropriate caching directives to clients and CDNs.
**How it works**: Configure a propagate rule with `named: "Cache-Control"` and `algorithm: "first_write"` (to use the most restrictive first response) or `last_write` (to use the final response's directive).
**Outcome**: Clients and CDNs receive consistent cache directives, enabling proper caching and reducing unnecessary requests.

### Use Case 2: Aggregating Rate Limit Information
**Scenario**: Multiple subgraphs return rate limit headers, and you want to provide clients with a combined view of remaining quota.
**How it works**: Use the `append` algorithm on rate limit headers: `matching: (?i)^X-RateLimit-.*` with `algorithm: "append"`. Headers from all subgraphs are combined into comma-separated values.
**Outcome**: Clients receive comprehensive rate limit information from all services in a single response.

### Use Case 3: Security Header Injection
**Scenario**: You need to ensure certain security headers are always present in responses, regardless of what subgraphs return.
**How it works**: Use the `set` operation to add required headers: `name: "X-Content-Type-Options"` with `value: "nosniff"`. Apply globally to ensure consistent security posture.
**Outcome**: All client responses include required security headers, meeting compliance requirements without modifying subgraphs.

---

## Technical Summary

### How It Works
The Cosmo Router collects response headers from all subgraph responses during federated execution. For each configured propagation rule, it applies the specified algorithm to determine the final header value. The `first_write` algorithm keeps the first encountered value, `last_write` uses the last value, and `append` combines all values with comma separation. Static headers via `set` are added after propagation.

### Key Technical Features
- Three propagation algorithms: `first_write`, `last_write`, `append`
- Exact name matching with `named` parameter
- Regex pattern matching with `matching` parameter
- Negation support with `negate_match`
- Header renaming with `rename` parameter
- Default values when headers are missing
- Per-subgraph rule overrides
- Automatic hop-by-hop header filtering

### Integration Points
- Works with all response types (queries, mutations, subscriptions)
- Compatible with CDN caching strategies
- Integrates with client-side caching mechanisms

### Requirements & Prerequisites
- Cosmo Router with config.yaml access
- Understanding of HTTP response header semantics
- Awareness of subgraph response header behavior

---

## Documentation References

- Primary docs: `/docs/router/proxy-capabilities/response-header-operations`
- Configuration guide: `/docs/router/configuration#config-file`
- Request header operations: `/docs/router/proxy-capabilities/request-headers-operations`

---

## Keywords & SEO

### Primary Keywords
- GraphQL response headers
- Federated response header propagation
- API gateway response headers

### Secondary Keywords
- Cache header forwarding
- Response header aggregation
- GraphQL caching headers

### Related Search Terms
- How to propagate headers from subgraphs
- GraphQL federation response headers
- Merge headers from multiple GraphQL services

---

## Version History

| Date | Version | Changes |
|------|---------|---------|
| 2025-01-14 | 1.0 | Initial capability documentation |
