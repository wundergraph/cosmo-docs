# Cache Warmer

## Metadata

| Field | Value |
|-------|-------|
| **Capability ID** | `cap-perf-003` |
| **Category** | Performance |
| **Status** | GA |
| **Availability** | Enterprise |
| **Related Capabilities** | `cap-perf-005` (Performance Debugging) |

---

## Quick Reference

### Name
Cache Warmer

### Tagline
Pre-warm query plan cache for optimal performance.

### Elevator Pitch
The Cache Warmer proactively precomputes query plans for your slowest operations, storing them in the router cache before traffic arrives. This eliminates cold-start latency spikes during peak traffic events like flash sales, live broadcasts, and marketing campaigns - ensuring consistent performance when it matters most.

---

## Problem & Solution

### The Problem
In federated GraphQL, the first execution of a query requires building an optimized query plan, which adds latency. During traffic spikes or router restarts, this "cold cache" problem causes noticeable delays for users hitting uncached operations. For high-traffic applications, even brief latency increases during peak events can impact user experience and revenue.

### The Solution
Cosmo's Cache Warmer uses telemetry data to identify your slowest queries (by P90 latency) and precomputes their query plans at router startup. These plans are stored in the cache before any traffic arrives, ensuring that high-impact operations execute at full speed from the first request.

### Before & After

| Before Cosmo | With Cosmo Cache Warmer |
|--------------|-------------------------|
| First request for each query has planning overhead | Query plans ready before first request |
| Router restarts cause latency spikes | Consistent performance through restarts |
| Peak traffic events expose cold cache issues | Pre-warmed cache handles traffic surges |
| Manual cache warming scripts required | Automatic telemetry-driven warming |

---

## Key Benefits

1. **Eliminate Cold Start Latency**: Query plans are ready before the first request, removing planning overhead from user-facing latency.
2. **Telemetry-Driven Optimization**: Automatically targets your slowest queries using P90 latency measurements from real traffic data.
3. **Event-Ready Performance**: Ideal for flash sales, live broadcasts, and marketing events where consistent performance is critical.
4. **Automatic Updates**: Cache warming occurs at router startup and after configuration updates triggered by subgraph publishes.
5. **Manual Control**: Add specific operations to the warming list to ensure business-critical queries are always pre-cached.

---

## Target Audience

### Primary Persona
- **Role**: Platform Engineer / SRE
- **Pain Points**: Performance inconsistency during traffic spikes, cold start latency after deployments
- **Goals**: Ensure predictable, consistent API performance under all conditions

### Secondary Personas
- Engineering managers accountable for SLAs during peak events
- DevOps teams managing high-availability GraphQL deployments
- Product teams planning flash sales or promotional campaigns

---

## Use Cases

### Use Case 1: E-Commerce Flash Sale Preparation
**Scenario**: An online retailer is running a limited-time flash sale expected to generate 10x normal traffic.
**How it works**: The Cache Warmer identifies the slowest product listing and checkout queries from telemetry. At router startup before the sale, these query plans are precomputed and cached. When traffic surges, all queries execute at cached speed.
**Outcome**: Zero cold-start latency during the flash sale, maintaining sub-100ms response times throughout the event.

### Use Case 2: Post-Deployment Performance Consistency
**Scenario**: A team deploys new subgraph versions multiple times daily, each deployment restarting routers and clearing caches.
**How it works**: Cache Warmer is configured at the namespace level. Each time a subgraph is published and routers update their configuration, the cache warmer precomputes plans for known slow queries.
**Outcome**: Users experience consistent performance regardless of deployment frequency.

### Use Case 3: Live Event Traffic Handling
**Scenario**: A streaming platform expects a massive traffic spike when a popular show releases new episodes.
**How it works**: The platform manually adds critical video metadata queries using `wgc router cache push`. Combined with automatically detected slow queries, the full query set is pre-warmed.
**Outcome**: The release event handles 5x normal traffic with no performance degradation.

---

## Technical Summary

### How It Works
The Cache Warmer operates in three phases:
1. **Query Identification**: Telemetry data identifies high-latency operations using P90 latency measurements.
2. **Manifest Building**: The system compiles a manifest of queries to warm, stored in the CDN.
3. **Precomputation**: At router startup (and after configuration updates), the router fetches the manifest and precomputes query plans.

### Key Technical Features
- P90 latency-based query prioritization
- LIFO (Last-In, First-Out) policy for operation management
- Configurable maximum number of warmed operations
- Manual operation addition via `wgc router cache push`
- Studio-based manual recomputation triggers

### Integration Points
- Cosmo Studio for configuration and monitoring
- OpenTelemetry for latency metrics collection
- Cosmo CDN for manifest storage
- CLI (`wgc`) for manual operation management

### Requirements & Prerequisites
- Enterprise plan subscription
- Telemetry enabled with `wg.operation.hash` attribute
- Router configuration with `cache_warmup.enabled: true`

---

## Configuration Example

```yaml
cache_warmup:
  enabled: true

telemetry:
  metrics:
    attributes:
      - key: "wg.operation.hash"
        value_from:
          context_field: operation_hash
```

---

## Documentation References

- Primary docs: `/docs/concepts/cache-warmer`
- Router configuration: `/docs/router/configuration#cache-warmer`
- CLI reference: `/docs/cli/router/cache/push`

---

## Keywords & SEO

### Primary Keywords
- Cache warming
- Query plan cache
- GraphQL performance optimization

### Secondary Keywords
- Cold start latency
- Pre-computed query plans
- Federation performance

### Related Search Terms
- How to eliminate GraphQL cold start
- Preload GraphQL cache
- GraphQL flash sale performance

---

## Version History

| Date | Version | Changes |
|------|---------|---------|
| 2025-01-14 | 1.0 | Initial capability documentation |
