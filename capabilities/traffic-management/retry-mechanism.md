# Retry Mechanism

Intelligent retry policies with exponential backoff for federated GraphQL.

---

## Metadata

| Field | Value |
|-------|-------|
| **Capability ID** | `cap-traffic-002` |
| **Category** | Traffic Management |
| **Status** | GA |
| **Availability** | Free / Pro / Enterprise |
| **Related Capabilities** | `cap-traffic-001`, `cap-traffic-003`, `cap-traffic-004` |

---

## Quick Reference

### Name
Retry Mechanism

### Tagline
Recover from transient failures automatically.

### Elevator Pitch
The Cosmo Router's Retry Mechanism automatically retries failed GraphQL queries using intelligent exponential backoff with jitter. Configure retry conditions using expressions, set maximum attempts and durations, and let the router handle transient network failures and temporary service unavailability—all without changing your subgraph code.

---

## Problem & Solution

### The Problem
Transient network failures, temporary service unavailability, and brief outages are facts of life in distributed systems. Without automatic retries, these temporary issues result in failed requests that frustrate users. Implementing retry logic in every service leads to inconsistent behavior, duplicated code, and the risk of retry storms that make problems worse.

### The Solution
Cosmo's Retry Mechanism provides centralized, configurable retry logic at the router level. The router automatically retries failed query operations using the proven "Backoff and Jitter" algorithm, preventing retry storms while maximizing recovery from transient failures. Expression-based conditions let you precisely control when retries should occur.

### Before & After

| Before Cosmo | With Cosmo |
|--------------|------------|
| Retry logic scattered across services | Centralized configuration at the router |
| Inconsistent retry behavior | Uniform retry policy with per-subgraph overrides |
| Risk of retry storms | Exponential backoff with jitter prevents thundering herd |
| Hard to tune retry conditions | Expression-based conditions for precise control |

---

## Key Benefits

1. **Automatic Failure Recovery**: Transient failures are automatically retried without user-visible errors, improving perceived reliability.

2. **Backoff with Jitter**: The proven "Backoff and Jitter" algorithm (as recommended by AWS) prevents retry storms and distributes retry load over time.

3. **Expression-Based Conditions**: Use powerful expressions to control exactly when retries occur—by status code, error type, or custom conditions.

4. **Safe by Default**: Only queries are retried (mutations are not), preventing accidental duplicate operations on non-idempotent endpoints.

5. **Configurable Limits**: Set maximum attempts, intervals, and durations to bound retry behavior and prevent runaway retries.

---

## Target Audience

### Primary Persona
- **Role**: Platform Engineer / SRE
- **Pain Points**: Transient failures causing user-visible errors; implementing consistent retry logic across services; preventing retry storms
- **Goals**: Maximize availability; reduce user-facing errors; maintain consistent retry behavior

### Secondary Personas
- Backend developers who want reliability without implementing retry logic
- DevOps engineers tuning system behavior during incidents

---

## Use Cases

### Use Case 1: Recovering from Network Blips
**Scenario**: A subgraph experiences brief network connectivity issues that cause occasional request failures.
**How it works**: With default retry configuration, the router automatically detects connection errors and retries the query using exponential backoff. Helper functions like `IsConnectionError()` and `IsTimeout()` identify retryable conditions.
**Outcome**: Users don't see errors from transient network issues; the retry succeeds transparently.

### Use Case 2: Handling Subgraph Restarts
**Scenario**: During a deployment, a subgraph briefly returns 503 Service Unavailable while new pods start.
**How it works**: The default expression `IsRetryableStatusCode()` includes 503, so the router automatically retries these requests. With up to 5 attempts over 10 seconds, most requests succeed once new pods are ready.
**Outcome**: Deployments don't cause user-visible errors; requests are automatically routed to healthy instances.

### Use Case 3: Custom Retry for Rate-Limited APIs
**Scenario**: A subgraph wraps an external API that occasionally returns 429 Too Many Requests with a Retry-After header.
**How it works**: Configure a custom expression that includes `statusCode == 429`. When the subgraph returns 429, the router respects the Retry-After header (if present) or uses the configured backoff interval.
**Outcome**: Rate-limited requests are automatically retried after the appropriate delay, maximizing throughput while respecting API limits.

### Use Case 4: Excluding Slow Business Logic from Retries
**Scenario**: A subgraph performs complex calculations that can legitimately take a long time, and you don't want to retry these even on timeout.
**How it works**: Configure a custom expression like `!IsHttpReadTimeout() && IsTimeout()` to exclude HTTP read timeouts from retry conditions while still retrying on connection-level timeouts.
**Outcome**: Genuine slow operations aren't wastefully retried, but connection issues still trigger appropriate retries.

---

## Competitive Positioning

### Key Differentiators
1. Expression-based retry conditions provide sophisticated control without code changes
2. GraphQL-aware: only retries queries, not mutations
3. Respects Retry-After headers for 429 responses when enabled
4. Integrated with circuit breakers for comprehensive failure handling

### Comparison with Alternatives

| Aspect | Cosmo | Generic HTTP Retry | Service Mesh |
|--------|-------|-------------------|--------------|
| GraphQL-aware | Yes (query vs mutation) | No | No |
| Condition expressions | Yes | Usually no | Limited |
| Backoff algorithm | Jitter built-in | Varies | Varies |
| 429 Retry-After support | Yes | Varies | Varies |

### Common Objections & Responses

| Objection | Response |
|-----------|----------|
| "Retries can cause duplicate requests" | Mutations are never retried; only idempotent queries are automatically retried |
| "We need custom retry logic per service" | Per-subgraph configuration allows different retry settings for each service |
| "How do we debug retry behavior?" | Enable debug mode to see retry attempts in logs |

---

## Technical Summary

### How It Works
When a GraphQL query fails due to a retryable condition (network error, specific status codes), the router automatically retries using the configured backoff algorithm. The default algorithm is "Backoff and Jitter" which increases the delay between retries and adds random jitter to prevent thundering herd effects. An expression is evaluated for each failure to determine if a retry should be attempted.

### Key Technical Features
- Backoff and Jitter algorithm (AWS-recommended pattern)
- Configurable max attempts, interval, and max duration
- Expression-based retry conditions with helper functions
- Default retries on 502, 503, 504 and connection errors
- Respects Retry-After header for 429 responses (when enabled)
- Automatically retries on "unexpected EOF" errors

### Helper Functions
- `IsRetryableStatusCode()`: Returns true for 500, 502, 503, 504
- `IsConnectionError()`: Connection refused, reset, DNS, TLS failures
- `IsTimeout()`: Any timeout error (HTTP, network, deadline exceeded)
- `IsHttpReadTimeout()`: Specifically HTTP read timeouts
- `IsConnectionRefused()`: ECONNREFUSED errors
- `IsConnectionReset()`: ECONNRESET errors

### Integration Points
- Router configuration (config.yaml)
- Circuit breakers (retries stop when circuit opens)
- Debug logging for retry visibility

### Requirements & Prerequisites
- Cosmo Router deployed
- Access to router configuration

---

## Proof Points

### Metrics & Benchmarks
- Default configuration recovers from most transient failures (5 attempts, 10s max)
- Backoff with jitter prevents retry storms during outages
- Debug mode provides full visibility into retry attempts

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

- Primary docs: `/docs/router/traffic-shaping/retry`
- Traffic shaping overview: `/docs/router/traffic-shaping`
- Configuration reference: `/docs/router/configuration`
- Template expressions: `/docs/router/configuration/template-expressions`

---

## Keywords & SEO

### Primary Keywords
- GraphQL retry mechanism
- Federation retry configuration
- API retry with backoff

### Secondary Keywords
- Exponential backoff jitter
- Automatic failure recovery
- Retry expression conditions

### Related Search Terms
- How to configure GraphQL retries
- Backoff and jitter algorithm
- Federation transient failure handling
- GraphQL 503 retry

---

## Version History

| Date | Version | Changes |
|------|---------|---------|
| 2026-01-14 | 1.0 | Initial capability documentation |
