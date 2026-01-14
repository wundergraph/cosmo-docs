# Timeout Configuration

Request and per-subgraph timeout management for federated GraphQL.

---

## Metadata

| Field | Value |
|-------|-------|
| **Capability ID** | `cap-traffic-003` |
| **Category** | Traffic Management |
| **Status** | GA |
| **Availability** | Free / Pro / Enterprise |
| **Related Capabilities** | `cap-traffic-001`, `cap-traffic-002`, `cap-traffic-004` |

---

## Quick Reference

### Name
Timeout Configuration

### Tagline
Fine-grained timeout control for every subgraph.

### Elevator Pitch
Cosmo's Timeout Configuration gives you precise control over how long the router waits for subgraph responses at every stage of the request lifecycle. Set global defaults for all subgraphs, then override specific services that need different treatment. From connection dial to TLS handshake to full request completion, every timeout is configurable.

---

## Problem & Solution

### The Problem
In federated GraphQL architectures, different subgraphs have different performance characteristics. A product catalog might respond in milliseconds, while an inventory check calls a slow legacy system. Without granular timeout control, teams either set timeouts too high (wasting resources on hung connections) or too low (failing legitimate slow requests). One-size-fits-all timeout settings don't work for diverse subgraph ecosystems.

### The Solution
Cosmo's Timeout Configuration provides multiple timeout controls at different stages of the request lifecycle. Set global defaults that apply to all subgraphs, then override specific subgraphs that need different treatment. Configure everything from connection dial timeouts to full request timeouts, ensuring each subgraph gets the time it needs—no more, no less.

### Before & After

| Before Cosmo | With Cosmo |
|--------------|------------|
| Single timeout for all services | Multiple timeout types for different stages |
| Same timeout for fast and slow services | Per-subgraph timeout overrides |
| Can't distinguish dial vs. request timeout | Separate dial, TLS, request, and response timeouts |
| Hung connections waste resources | Keep-alive management reclaims idle connections |

---

## Key Benefits

1. **Multi-Stage Timeout Control**: Configure separate timeouts for connection dial, TLS handshake, response headers, and full request completion.

2. **Per-Subgraph Overrides**: Set sensible global defaults, then customize timeouts for specific subgraphs that have different performance characteristics.

3. **Resource Efficiency**: Keep-alive idle timeout automatically closes idle connections, preventing resource exhaustion.

4. **Slow Service Accommodation**: Increase request timeout for known slow services without affecting the timeout budget for fast services.

5. **Zero-Downtime Configuration**: All timeout settings are in the router's YAML config, changeable without code deployments.

---

## Target Audience

### Primary Persona
- **Role**: Platform Engineer / SRE
- **Pain Points**: Balancing tight timeouts for responsiveness with generous timeouts for slow services; managing connection resources; debugging timeout issues
- **Goals**: Optimize timeout settings per service; maintain responsiveness; prevent resource exhaustion

### Secondary Personas
- Backend developers integrating slow legacy systems as subgraphs
- DevOps engineers optimizing connection pool behavior

---

## Use Cases

### Use Case 1: Accommodating Legacy Backend Integration
**Scenario**: A subgraph wraps a legacy system that can take up to 60 seconds for complex queries, but the default request timeout is 10 seconds.
**How it works**: Add a subgraph-specific override with `request_timeout: 60s` for just that subgraph while keeping the default tight for other services.
**Outcome**: The legacy subgraph gets the time it needs without affecting timeout behavior for other services.

### Use Case 2: Optimizing Connection Establishment
**Scenario**: Subgraphs are deployed in a different region, and connection establishment occasionally takes longer than expected.
**How it works**: Increase `dial_timeout` to give connections more time to establish across the network, while keeping the TLS handshake timeout tight.
**Outcome**: Cross-region connections succeed reliably without overly generous timeouts on other stages.

### Use Case 3: Managing Connection Pool Resources
**Scenario**: Under variable load, many idle connections accumulate and consume resources.
**How it works**: Configure `keep_alive_idle_timeout` to automatically close connections that have been idle for a specified duration, freeing up resources.
**Outcome**: Connection resources are automatically reclaimed during low-traffic periods.

### Use Case 4: Detecting Slow Response Headers
**Scenario**: A subgraph occasionally hangs after accepting the connection but before sending response headers.
**How it works**: Set `response_header_timeout` to detect when a subgraph accepts the request but fails to start responding within a reasonable time.
**Outcome**: Hung requests are detected early, freeing up router resources and triggering potential retries.

---

## Competitive Positioning

### Key Differentiators
1. Multiple timeout types for different request lifecycle stages
2. Per-subgraph configuration overrides for heterogeneous service landscapes
3. Integrated with retry and circuit breaker for comprehensive traffic management
4. Keep-alive management for connection resource optimization

### Comparison with Alternatives

| Aspect | Cosmo | Generic Proxy | Service Mesh |
|--------|-------|---------------|--------------|
| Timeout granularity | 7 different types | Usually 1-2 | Varies |
| Per-service override | Yes | Often manual | Yes |
| Keep-alive management | Built-in | Varies | Varies |
| GraphQL integration | Native | No | No |

### Common Objections & Responses

| Objection | Response |
|-----------|----------|
| "We don't need so many timeout types" | Use the defaults; configure only what you need. The granularity is there when you need it. |
| "How do we know what values to set?" | Start with defaults, use observability to identify timeout issues, then tune specific values |
| "Per-subgraph config seems complex" | Most use cases only need global defaults; per-subgraph is for exceptions |

---

## Technical Summary

### How It Works
Timeout configuration is specified in the router's YAML config file under `traffic_shaping`. The `all` section sets defaults for all subgraph requests. The `subgraphs` section allows overriding any timeout for specific subgraphs. The router enforces these timeouts at runtime, failing requests that exceed their configured limits.

### Key Technical Features
- `request_timeout`: Maximum total time for the complete request lifecycle
- `dial_timeout`: Maximum time to establish a connection
- `tls_handshake_timeout`: Maximum time for TLS negotiation
- `response_header_timeout`: Maximum time to receive response headers
- `expect_continue_timeout`: Time to wait for 100-continue response
- `keep_alive_idle_timeout`: Time before closing idle connections
- `keep_alive_probe_interval`: Interval between keep-alive probes

### Configuration Example
```yaml
traffic_shaping:
  all:
    request_timeout: 60s
    dial_timeout: 30s
    tls_handshake_timeout: 10s
  subgraphs:
    legacy-service:
      request_timeout: 120s  # Override for slow service
```

### Integration Points
- Router configuration (config.yaml)
- Retry mechanism (timeouts can trigger retries)
- Circuit breaker (timeout failures affect circuit state)

### Requirements & Prerequisites
- Cosmo Router deployed
- Access to router configuration

---

## Proof Points

### Metrics & Benchmarks
- Granular timeouts prevent resource waste on hung connections
- Per-subgraph configuration accommodates diverse service characteristics
- Keep-alive management optimizes connection pool resource usage

---

## Content Assets

| Asset Type | Status | Link |
|------------|--------|------|
| Landing Page | Needed | |
| Blog Post | Needed | |
| Video Demo | Needed | |
| Pitch Deck Slide | Needed | |
| One-Pager | Needed | |
| Battle Card | Needed | |

---

## Documentation References

- Primary docs: `/docs/router/traffic-shaping/timeout`
- Traffic shaping overview: `/docs/router/traffic-shaping`
- Configuration reference: `/docs/router/configuration`

---

## Keywords & SEO

### Primary Keywords
- GraphQL timeout configuration
- Federation subgraph timeout
- API request timeout

### Secondary Keywords
- Connection timeout settings
- Keep-alive configuration
- TLS handshake timeout

### Related Search Terms
- How to configure GraphQL timeouts
- Federation slow service timeout
- Router connection management
- Subgraph request timeout

---

## Version History

| Date | Version | Changes |
|------|---------|---------|
| 2026-01-14 | 1.0 | Initial capability documentation |
