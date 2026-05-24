# Cache Control

## Metadata

| Field | Value |
|-------|-------|
| **Capability ID** | `cap-perf-004` |
| **Category** | Performance |
| **Status** | GA |
| **Availability** | Free / Pro / Enterprise |
| **Related Capabilities** | `cap-perf-002` (APQ) |

---

## Quick Reference

### Name
Cache Control

### Tagline
CDN-friendly cache header management for federated graphs.

### Elevator Pitch
Cache Control provides intelligent HTTP caching header management across your federated graph. It automatically applies the most restrictive caching policy from all subgraphs, ensuring security-sensitive data is never inadvertently cached while maximizing cache efficiency for static content.

---

## Problem & Solution

### The Problem
In federated GraphQL, responses aggregate data from multiple subgraphs with different caching requirements. A product catalog might be cacheable for hours, while pricing data should never be cached. Without intelligent coordination, setting appropriate Cache-Control headers becomes complex and error-prone, risking either stale data or missed caching opportunities.

### The Solution
Cosmo's Cache Control policy automatically evaluates Cache-Control headers from all subgraphs and applies the most restrictive setting to the final response. You define global defaults and per-subgraph policies, and the router ensures the strictest policy always wins - including automatic `no-cache` for mutations and error responses.

### Before & After

| Before Cosmo | With Cosmo Cache Control |
|--------------|--------------------------|
| Manual cache header coordination across services | Automatic restrictive policy aggregation |
| Risk of caching sensitive data | `no-cache`/`no-store` always takes precedence |
| Complex CDN configuration per endpoint | Unified cache policy at the graph level |
| No automatic handling of errors/mutations | Automatic `no-cache` for mutations and errors |

---

## Key Benefits

1. **Automatic Policy Aggregation**: The most restrictive cache policy from any subgraph is automatically applied to the response.
2. **Security by Default**: `no-cache` and `no-store` directives always take precedence, ensuring sensitive data is never accidentally cached.
3. **Mutation Safety**: GraphQL mutations automatically receive `no-cache` headers, preventing mutation results from being cached.
4. **Error Protection**: Responses with errors automatically receive `no-store, no-cache, must-revalidate` headers.
5. **Granular Control**: Define global defaults and per-subgraph policies to match your exact caching requirements.

---

## Target Audience

### Primary Persona
- **Role**: Platform Engineer / Backend Developer
- **Pain Points**: Coordinating cache policies across multiple subgraphs, preventing cache-related security issues
- **Goals**: Maximize cache efficiency while ensuring data freshness and security

### Secondary Personas
- Security engineers concerned about caching sensitive data
- DevOps teams optimizing CDN utilization
- API architects designing federated graph caching strategies

---

## Use Cases

### Use Case 1: Multi-Tier Caching Strategy
**Scenario**: An e-commerce platform has product data (cacheable for 5 minutes), inventory (cacheable for 1 minute), and pricing (never cacheable due to real-time updates).
**How it works**: Configure global default of `max-age=300` for products, subgraph-specific `max-age=60` for inventory, and `no-cache` for pricing. The router automatically applies the most restrictive policy per request based on which subgraphs are accessed.
**Outcome**: Product-only queries cache for 5 minutes. Queries touching inventory cache for 1 minute. Any query including pricing returns `no-cache`.

### Use Case 2: Security-Sensitive Data Protection
**Scenario**: A financial services company needs to ensure user account data is never cached while allowing public market data to be cached.
**How it works**: The accounts subgraph is configured with `no-store`. Public market data subgraph has `max-age=60`. The restrictive policy algorithm ensures any request touching account data inherits `no-store`.
**Outcome**: Zero risk of sensitive account data being cached at any layer.

### Use Case 3: CDN Integration
**Scenario**: A media company wants to leverage CDN edge caching for static content queries while preventing caching of personalized recommendations.
**How it works**: Static content subgraphs configured with `max-age=3600, public`. Recommendations subgraph configured with `no-cache`. CDN honors the Cache-Control headers automatically set by the router.
**Outcome**: Static queries are served from CDN edges globally. Personalized queries always hit origin.

---

## Technical Summary

### How It Works
The Cache Control algorithm evaluates all subgraph responses and applies the strictest policy:
1. `no-cache` and `no-store` directives always take priority
2. The smallest `max-age` value across all subgraphs is selected
3. The earliest `Expires` header timestamp is used
4. Mutations automatically receive `no-cache`
5. Error responses automatically receive `no-store, no-cache, must-revalidate`

### Key Technical Features
- Global default cache policy configuration
- Per-subgraph cache policy overrides
- Automatic mutation and error handling
- Support for `max-age`, `no-cache`, `no-store`, and `Expires` headers
- Header propagation rule integration for advanced overrides

### Integration Points
- CDN layers (Cloudflare, Fastly, CloudFront, Akamai)
- Browser caching
- Reverse proxy caches (Varnish, nginx)
- Custom header propagation rules

### Requirements & Prerequisites
- Router configuration with `cache_control_policy.enabled: true`
- Understanding of subgraph caching requirements

---

## Configuration Examples

### Basic Configuration
```yaml
cache_control_policy:
  enabled: true
  value: "max-age=180, public"
  subgraphs:
    - name: "products"
      value: "max-age=60, public"
    - name: "pricing"
      value: "no-cache"
```

### Advanced Override with Header Propagation
```yaml
cache_control_policy:
  enabled: true
  value: "max-age=180, public"

headers:
  subgraphs:
    specific-subgraph:
      response:
        - op: "set"
          name: "Cache-Control"
          value: "max-age=5400"
```

---

## Documentation References

- Primary docs: `/docs/router/proxy-capabilities/adjusting-cache-control`
- Router configuration: `/docs/router/configuration#config-file`
- Header propagation: `/docs/router/proxy-capabilities`

---

## Keywords & SEO

### Primary Keywords
- Cache-Control headers
- GraphQL caching
- CDN cache policy

### Secondary Keywords
- HTTP caching
- Federated graph caching
- Cache header aggregation

### Related Search Terms
- How to cache GraphQL responses
- GraphQL CDN integration
- Cache-Control header management

---

## Version History

| Date | Version | Changes |
|------|---------|---------|
| 2025-01-14 | 1.0 | Initial capability documentation |
