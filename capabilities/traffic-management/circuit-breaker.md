# Circuit Breaker

Fault tolerance with automatic circuit state management for federated GraphQL.

---

## Metadata

| Field | Value |
|-------|-------|
| **Capability ID** | `cap-traffic-004` |
| **Category** | Traffic Management |
| **Status** | GA |
| **Availability** | Free / Pro / Enterprise |
| **Related Capabilities** | `cap-traffic-001`, `cap-traffic-002`, `cap-traffic-003` |

---

## Quick Reference

### Name
Circuit Breaker

### Tagline
Prevent cascading failures with automatic circuit protection.

### Elevator Pitch
Cosmo's Circuit Breaker protects your federated GraphQL API from cascading failures. When a subgraph starts failing, the circuit breaker automatically stops sending requests to it, giving it time to recover. Once healthy, traffic is gradually restored. This pattern keeps your router responsive during partial outages and prevents a single failing service from bringing down your entire API.

---

## Problem & Solution

### The Problem
In federated architectures, a single failing subgraph can cascade failures across your entire system. When a service becomes slow or unresponsive, requests pile up, resources are exhausted, and eventually the entire router becomes unresponsive. Without circuit breakers, your system has no automatic protection against this cascading failure pattern.

### The Solution
Cosmo's Circuit Breaker implements the proven circuit breaker pattern, automatically detecting when subgraphs are failing and stopping traffic to them. Using a time-based sliding window, the circuit breaker tracks error rates and opens when thresholds are exceeded. After a configurable sleep window, it cautiously tests if the service has recovered before fully restoring traffic.

### Before & After

| Before Cosmo | With Cosmo |
|--------------|------------|
| Failing subgraph brings down entire API | Failed service is automatically isolated |
| Requests pile up waiting for slow services | Circuit opens instantly, freeing resources |
| Manual intervention needed to stop traffic | Automatic protection triggers on threshold |
| Hard to know when service has recovered | Gradual recovery testing with half-open state |

---

## Key Benefits

1. **Automatic Failure Detection**: Time-based sliding window with configurable thresholds detects when subgraphs are failing.

2. **Instant Protection**: When a circuit opens, requests are immediately rejected without waiting for timeouts, keeping your router responsive.

3. **Graceful Recovery**: The half-open state cautiously tests if services have recovered before fully restoring traffic.

4. **Per-Subgraph Configuration**: Different services can have different circuit breaker settings based on their reliability characteristics.

5. **Observable State**: Metrics and monitoring provide visibility into circuit breaker state for operational awareness.

---

## Target Audience

### Primary Persona
- **Role**: Platform Engineer / SRE
- **Pain Points**: Cascading failures during outages; manual intervention to stop traffic to failing services; lack of automatic recovery
- **Goals**: Automatic failure isolation; fast recovery from partial outages; maintain overall system stability

### Secondary Personas
- DevOps engineers managing production stability
- Engineering managers responsible for system reliability

---

## Use Cases

### Use Case 1: Protecting Against Cascading Failures
**Scenario**: A subgraph's database becomes overloaded, causing the service to respond slowly or not at all.
**How it works**: As requests fail, the circuit breaker's sliding window tracks the error rate. When the error threshold is exceeded (e.g., 50% errors over 60 seconds), the circuit opens. All subsequent requests to that subgraph are immediately rejected, freeing router resources.
**Outcome**: The failing subgraph is isolated; other subgraphs continue working; the router remains responsive.

### Use Case 2: Automatic Recovery After Outage
**Scenario**: After a circuit opens due to failures, the underlying issue is resolved and the subgraph is healthy again.
**How it works**: After the sleep window expires (e.g., 30 seconds), the circuit enters half-open state. A limited number of test requests are allowed through. If enough succeed (e.g., 3 out of 5), the circuit closes and normal traffic resumes.
**Outcome**: Traffic is automatically restored without manual intervention; gradual recovery prevents overwhelming the just-recovered service.

### Use Case 3: Critical Service Protection
**Scenario**: A payment processing subgraph is critical and must be protected from retry storms during incidents.
**How it works**: Configure a subgraph-specific circuit breaker with conservative settings: low request threshold, quick sleep window, and strict success requirements. This ensures fast protection with careful recovery.
**Outcome**: The payment service is protected aggressively, with careful recovery to prevent re-triggering issues.

### Use Case 4: Disabling Circuit Breaker for Testing
**Scenario**: During development or testing, you want to see all failures rather than having them circuit-broken.
**How it works**: Disable the circuit breaker for specific subgraphs using `enabled: false` in the subgraph-specific configuration.
**Outcome**: Test subgraphs show all failures for debugging while production subgraphs remain protected.

---

## Competitive Positioning

### Key Differentiators
1. Time-based sliding window with configurable buckets for accurate error rate tracking
2. Three-state model (closed, open, half-open) with configurable transitions
3. Per-URL circuit breaker grouping with subgraph-specific overrides
4. Integrated metrics for operational visibility

### Comparison with Alternatives

| Aspect | Cosmo | Service Mesh | Custom Implementation |
|--------|-------|--------------|----------------------|
| Configuration | Simple YAML | Complex CRDs | Code in each service |
| Sliding window | Time-based buckets | Varies | Must implement |
| Half-open testing | Configurable attempts | Usually fixed | Must implement |
| Metrics integration | Built-in | Separate | Must implement |

### Common Objections & Responses

| Objection | Response |
|-----------|----------|
| "Circuit breakers can hide real problems" | Metrics and monitoring make circuit state visible; alerts can be set on open circuits |
| "We need different settings per service" | Per-subgraph configuration allows complete customization |
| "What about services sharing URLs?" | Subgraph-specific config creates dedicated circuit breakers even for shared URLs |

---

## Technical Summary

### How It Works
The circuit breaker uses a time-based sliding window divided into buckets to track request outcomes. When the error rate exceeds the configured threshold and minimum request count is met, the circuit opens. All requests are rejected until the sleep window expires. Then, a half-open state allows limited test requests. If enough succeed, the circuit closes; if any fail, it reopens.

### Circuit States
- **Closed**: Normal operation; requests pass through; errors are tracked
- **Open**: Protection mode; all requests immediately rejected
- **Half-Open**: Recovery testing; limited requests allowed to test service health

### Key Technical Features
- Time-based sliding window with configurable buckets
- Error rate and request count thresholds
- Configurable sleep window before recovery testing
- Half-open state with configurable test attempts and success requirements
- Execution timeout for circuit breaker error tracking
- Per-subgraph configuration overrides

### What Counts as a Failure
- Network-level failures (connection refused, DNS errors, TLS failures)
- Transport errors (broken connections, read/write timeouts)
- Execution timeouts (configurable circuit breaker-specific timeout)

### What Does NOT Count as a Failure
- HTTP error status codes (4xx, 5xx) if a response is received
- Request cancellations or client-side timeouts

### Configuration Example
```yaml
traffic_shaping:
  all:
    circuit_breaker:
      enabled: true
      request_threshold: 20
      error_threshold_percentage: 50
      sleep_window: 30s
      half_open_attempts: 5
      required_successful: 3
      rolling_duration: 60s
      num_buckets: 10
```

### Integration Points
- Router configuration (config.yaml)
- Retry mechanism (retries stop when circuit opens)
- Metrics and monitoring (circuit breaker state and events)

### Requirements & Prerequisites
- Cosmo Router deployed
- Access to router configuration
- Rolling duration must be evenly divisible by number of buckets

---

## Proof Points

### Metrics & Benchmarks
- Circuits open within the configured rolling window when thresholds are exceeded
- Half-open state provides controlled recovery testing
- Per-subgraph circuits isolate failures to specific services

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

- Primary docs: `/docs/router/traffic-shaping/circuit-breaker`
- Traffic shaping overview: `/docs/router/traffic-shaping`
- Configuration reference: `/docs/router/configuration#circuit-breaker`
- Metrics: `/docs/router/metrics-and-monitoring#circuit-breaker-specific-metrics`

---

## Keywords & SEO

### Primary Keywords
- GraphQL circuit breaker
- Federation fault tolerance
- API circuit breaker pattern

### Secondary Keywords
- Cascading failure prevention
- Half-open circuit breaker
- Sliding window error rate

### Related Search Terms
- How to configure GraphQL circuit breaker
- Preventing cascading failures in GraphQL
- Federation subgraph failure isolation
- Circuit breaker pattern implementation

---

## Version History

| Date | Version | Changes |
|------|---------|---------|
| 2026-01-14 | 1.0 | Initial capability documentation |
