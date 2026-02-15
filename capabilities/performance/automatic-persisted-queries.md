# Automatic Persisted Queries (APQ)

## Metadata

| Field | Value |
|-------|-------|
| **Capability ID** | `cap-perf-002` |
| **Category** | Performance |
| **Status** | GA |
| **Availability** | Free / Pro / Enterprise |
| **Related Capabilities** | `cap-perf-001` (Persisted Operations) |

---

## Quick Reference

### Name
Automatic Persisted Queries (APQ)

### Tagline
Hash-based query execution with automatic caching.

### Elevator Pitch
Automatic Persisted Queries automatically store queries the first time they are sent, allowing subsequent requests to reference them by hash. This reduces payload size, enables efficient CDN caching via GET requests, and requires zero upfront registration - queries are persisted on the fly.

---

## Problem & Solution

### The Problem
GraphQL queries can be large and complex, leading to increased bandwidth usage and slower response times. Traditional persisted queries require upfront registration, adding friction to the development process. Teams need a way to reduce payload size without manual operation management.

### The Solution
APQ automatically caches queries when they are first submitted with both the query body and its hash. Subsequent requests need only the hash, and the router retrieves the full query from cache. This works seamlessly with GET requests, enabling CDN caching for frequently used queries.

### Before & After

| Before Cosmo | With Cosmo APQ |
|--------------|----------------|
| Full query sent with every request | Query body sent once, then hash only |
| POST requests not CDN-cacheable | GET requests enable CDN caching |
| Manual operation registration required | Automatic persistence on first use |
| No cross-client query sharing | Any client can reuse persisted queries |

---

## Key Benefits

1. **Zero Configuration Persistence**: Queries are automatically stored on first use - no manual registration or CI/CD integration required.
2. **CDN-Compatible**: GET request support enables caching at CDN edge locations, dramatically reducing latency for repeat queries.
3. **Cross-Client Sharing**: Once a query is persisted, any client can execute it using the hash, enabling efficient query reuse.
4. **Flexible Storage Options**: Choose between in-memory caching for simplicity or Redis for persistence across router restarts.
5. **Reduced Bandwidth**: After initial registration, only 64-character hashes are transmitted instead of full query bodies.

---

## Target Audience

### Primary Persona
- **Role**: Backend Developer / API Developer
- **Pain Points**: Reducing GraphQL request latency, optimizing bandwidth usage
- **Goals**: Improve API performance without adding operational complexity

### Secondary Personas
- Frontend developers seeking faster GraphQL responses
- Platform engineers optimizing CDN utilization
- DevOps teams managing high-traffic GraphQL deployments

---

## Use Cases

### Use Case 1: CDN Edge Caching
**Scenario**: A news application serves the same homepage query to millions of users and wants to leverage CDN caching.
**How it works**: The first request sends the query body with its SHA-256 hash. The router caches the mapping. Subsequent requests use GET with only the hash and extensions parameter, which the CDN can cache at edge locations.
**Outcome**: Homepage queries are served from CDN edge locations, reducing origin traffic by 90%+ and cutting response times to milliseconds.

### Use Case 2: Mobile App Bandwidth Optimization
**Scenario**: A mobile app sends complex queries that consume significant user bandwidth, especially on slow networks.
**How it works**: The mobile GraphQL client computes query hashes locally. On first execution, it sends both query and hash. Subsequent executions send only the hash. The router retrieves the cached query.
**Outcome**: After the initial request, payload sizes drop from kilobytes to approximately 100 bytes, improving performance on cellular networks.

### Use Case 3: Development-to-Production Transition
**Scenario**: A team wants persisted query benefits without modifying their CI/CD pipeline or development workflow.
**How it works**: APQ is enabled in the router configuration. Developers work normally with full queries. In production, queries automatically become persisted after first use. High-traffic queries naturally get cached.
**Outcome**: Teams gain persisted query performance benefits with zero workflow changes.

---

## Technical Summary

### How It Works
When a client sends a query with both the body and a SHA-256 hash (via the `extensions.persistedQuery` parameter), the router stores the mapping. Future requests can omit the query body and send only the hash. The router looks up the hash and executes the stored query. If the hash is not found, the router returns an error prompting the client to resend with the full query.

### Key Technical Features
- SHA-256 hash-based query identification
- In-memory cache with configurable size and TTL
- Redis storage option for persistence across restarts
- GET request support for CDN compatibility
- Apollo-compatible protocol implementation

### Integration Points
- Apollo Client (built-in APQ support)
- urql and other GraphQL clients with APQ plugins
- Redis for distributed cache storage
- CDN layers (Cloudflare, Fastly, CloudFront)

### Requirements & Prerequisites
- Router configuration with `automatic_persisted_queries.enabled: true`
- Optional: Redis for persistent storage
- Client library with APQ support

---

## Configuration Examples

### Local Cache Configuration
```yaml
automatic_persisted_queries:
  enabled: true
  cache:
    size: 10MB
    ttl: 900  # 15 minutes
```

### Redis Cache Configuration
```yaml
automatic_persisted_queries:
  enabled: true
  storage:
    provider_id: "my_redis"
    object_prefix: cosmo_apq
  cache:
    ttl: 900

storage_providers:
  redis:
    - id: "my_redis"
      cluster_enabled: false
      urls:
        - "redis://localhost:6379"
```

---

## Documentation References

- Primary docs: `/docs/router/persisted-queries/automatic-persisted-queries-apq`
- Overview: `/docs/router/persisted-queries`
- Router configuration: `/docs/router/configuration`

---

## Keywords & SEO

### Primary Keywords
- Automatic Persisted Queries
- APQ GraphQL
- Query caching

### Secondary Keywords
- CDN GraphQL caching
- Hash-based queries
- GraphQL performance

### Related Search Terms
- How to cache GraphQL queries
- GraphQL CDN integration
- Reduce GraphQL payload size

---

## Version History

| Date | Version | Changes |
|------|---------|---------|
| 2025-01-14 | 1.0 | Initial capability documentation |
