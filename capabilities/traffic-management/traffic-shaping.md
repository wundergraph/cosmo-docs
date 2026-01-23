# Traffic Shaping

Comprehensive traffic control for federated GraphQL APIs.

---

## Metadata

| Field | Value |
|-------|-------|
| **Capability ID** | `cap-traffic-001` |
| **Category** | Traffic Management |
| **Status** | GA |
| **Availability** | Free / Pro / Enterprise |
| **Related Capabilities** | `cap-traffic-002`, `cap-traffic-003`, `cap-traffic-004` |

---

## Quick Reference

### Name
Traffic Shaping

### Tagline
Take control of router traffic for maximum reliability.

### Elevator Pitch
Traffic Shaping provides comprehensive control over how the Cosmo Router manages traffic between clients and the router, and between the router and subgraphs. Configure retries, timeouts, and circuit breakers to build resilient federated GraphQL APIs that gracefully handle failures and maintain performance under load.

---

## Problem & Solution

### The Problem
In distributed federated GraphQL architectures, network failures, slow services, and cascading outages are inevitable. Without proper traffic management, a single failing subgraph can bring down your entire API. Teams struggle to configure appropriate timeouts, implement intelligent retry logic, and protect their systems from cascading failures—leading to poor user experiences and increased operational burden.

### The Solution
Cosmo's Traffic Shaping provides a unified configuration layer for managing all aspects of traffic between your router and subgraphs. Set global defaults that apply to all subgraphs, then override settings for specific services that need different treatment. The router handles retry logic with exponential backoff, enforces timeouts at multiple levels, and can automatically circuit-break failing services.

### Before & After

| Before Cosmo | With Cosmo |
|--------------|------------|
| Manual retry logic in each service | Centralized retry configuration with intelligent backoff |
| Inconsistent timeout settings across services | Unified timeout management with per-subgraph overrides |
| Cascading failures when one service goes down | Automatic circuit breaking isolates failing services |
| Complex traffic management code scattered everywhere | Single YAML configuration for all traffic rules |

---

## Key Benefits

1. **Unified Traffic Control**: Configure retries, timeouts, and circuit breakers from a single configuration file with consistent semantics across all subgraphs.

2. **Increased Reliability**: Intelligent retry mechanisms with exponential backoff and jitter automatically recover from transient failures without overwhelming downstream services.

3. **Failure Isolation**: Circuit breakers prevent cascading failures by automatically stopping requests to unhealthy subgraphs, allowing them time to recover.

4. **Granular Control**: Apply default rules globally while overriding specific settings for individual subgraphs that need different treatment.

5. **Zero Code Changes**: All traffic shaping is configured at the router level—no changes required to your subgraph implementations.

---

## Target Audience

### Primary Persona
- **Role**: Platform Engineer / SRE
- **Pain Points**: Managing reliability across multiple subgraphs; preventing cascading failures; tuning retry and timeout settings without code changes
- **Goals**: Build resilient federated APIs; reduce incident frequency; maintain SLAs during partial outages

### Secondary Personas
- Backend developers building subgraph services who need consistent reliability patterns
- DevOps engineers responsible for production stability
- Engineering managers tracking system reliability metrics

---

## Use Cases

### Use Case 1: Global Reliability Configuration
**Scenario**: A platform team needs to establish baseline reliability settings for all subgraphs in their federated graph.
**How it works**: Configure traffic shaping in the router's config.yaml with an `all` section that sets default retry attempts, timeouts, and circuit breaker thresholds for every subgraph.
**Outcome**: All subgraphs automatically benefit from intelligent retry logic and failure protection without any per-service configuration.

### Use Case 2: Slow Service Accommodation
**Scenario**: One subgraph calls a legacy backend that occasionally takes 30+ seconds to respond, but the default timeout is 10 seconds.
**How it works**: Add a subgraph-specific override in the `subgraphs` section with an increased `request_timeout` value for just that service.
**Outcome**: The slow service gets the time it needs while other subgraphs maintain tight timeout budgets.

### Use Case 3: High-Traffic Service Protection
**Scenario**: A critical subgraph handles payment processing and must be protected from retry storms during incidents.
**How it works**: Configure a subgraph-specific circuit breaker with conservative thresholds—lower request threshold, quick sleep window, and strict success requirements for recovery.
**Outcome**: The payment service is protected from being overwhelmed during failures, and recovers gracefully when the underlying issue is resolved.

---

## Competitive Positioning

### Key Differentiators
1. Unified configuration for all traffic management aspects (retries, timeouts, circuit breakers) in a single YAML file
2. Expression-based retry conditions allow sophisticated logic without code changes
3. Per-subgraph overrides provide granular control while maintaining sensible defaults

### Comparison with Alternatives

| Aspect | Cosmo | Service Mesh | Custom Implementation |
|--------|-------|--------------|----------------------|
| Configuration complexity | Simple YAML | Complex CRDs | Code in each service |
| Retry logic | Built-in with expressions | Varies | Must implement |
| Circuit breakers | Integrated | Separate config | Must implement |
| GraphQL-aware | Yes | No | Varies |

### Common Objections & Responses

| Objection | Response |
|-----------|----------|
| "We already have a service mesh" | Cosmo's traffic shaping is GraphQL-aware and works at the query level, complementing mesh capabilities |
| "Our services handle their own retries" | Centralizing retry logic at the router provides consistency and reduces duplicate code across services |
| "Configuration seems complex" | Start with sensible defaults in the `all` section; only add overrides when needed |

---

## Technical Summary

### How It Works
Traffic shaping is configured in the router's YAML configuration file. The `all` section defines defaults applied to every subgraph request. The `subgraphs` section allows per-service overrides. At runtime, the router applies these rules to every request flowing between the router and subgraphs, handling retries, enforcing timeouts, and managing circuit breaker state automatically.

### Key Technical Features
- Exponential backoff with jitter for retries
- Multiple timeout types (request, dial, TLS handshake, response header)
- Time-based sliding window circuit breakers
- Expression-based retry conditions
- Per-subgraph configuration overrides

### Integration Points
- Router configuration (config.yaml)
- Observability stack (metrics for circuit breaker state)
- Subgraph services (transparent—no changes required)

### Requirements & Prerequisites
- Cosmo Router deployed
- Access to router configuration

---

## Proof Points

### Metrics & Benchmarks
- Retry mechanism can recover from transient failures without client-visible errors
- Circuit breakers can prevent request pile-up during subgraph outages
- Configurable at runtime without router restart (via config reload)

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

- Primary docs: `/docs/router/traffic-shaping`
- Retry configuration: `/docs/router/traffic-shaping/retry`
- Timeout configuration: `/docs/router/traffic-shaping/timeout`
- Circuit breaker: `/docs/router/traffic-shaping/circuit-breaker`

---

## Keywords & SEO

### Primary Keywords
- GraphQL traffic shaping
- Federation reliability
- API traffic management

### Secondary Keywords
- GraphQL retries
- Subgraph timeouts
- Circuit breaker pattern

### Related Search Terms
- How to configure GraphQL API retries
- Federation timeout configuration
- Preventing cascading failures in GraphQL
- GraphQL router reliability

---

## Version History

| Date | Version | Changes |
|------|---------|---------|
| 2026-01-14 | 1.0 | Initial capability documentation |
