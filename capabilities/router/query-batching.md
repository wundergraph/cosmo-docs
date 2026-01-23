# Query Batching

## Metadata

| Field | Value |
|-------|-------|
| **Capability ID** | `cap-router-003` |
| **Category** | Router |
| **Status** | GA |
| **Availability** | Free |
| **Related Capabilities** | `cap-router-001`, `cap-router-002` |

---

## Quick Reference

### Name
Query Batching

### Tagline
Execute multiple GraphQL operations in a single HTTP request.

### Elevator Pitch
Query batching allows clients to send multiple GraphQL operations in a single HTTP request, with the router processing them concurrently while maintaining response order. This capability supports legacy batch-based clients while providing configurable limits and full observability through dedicated tracing attributes.

---

## Problem & Solution

### The Problem
Some client applications and legacy systems are designed to batch multiple GraphQL operations into single HTTP requests for efficiency. When migrating to a new federation gateway, these existing patterns need to continue working. Teams need a way to support batched requests while maintaining control over resource consumption and gaining visibility into batch execution.

### The Solution
Cosmo Router supports processing batched GraphQL requests where multiple operations are sent as a JSON array. Each operation is processed concurrently with configurable limits on batch size and concurrency. Responses maintain the same order as requests, and comprehensive tracing attributes enable full observability of batch execution.

### Before & After

| Before Cosmo | With Cosmo |
|--------------|------------|
| Migration blockers from batch-dependent clients | Seamless support for existing batch patterns |
| No control over batch resource consumption | Configurable max entries and concurrency limits |
| Limited visibility into batch execution | Dedicated tracing attributes for batch operations |
| Serial batch processing | Concurrent processing with configurable parallelism |

---

## Key Benefits

1. **Migration Compatibility**: Support existing clients that rely on batched requests without requiring client-side changes
2. **Configurable Concurrency**: Control how many operations execute in parallel to manage resource usage
3. **Batch Size Limits**: Prevent resource exhaustion by limiting maximum operations per batch
4. **Response Order Preservation**: Responses always match the request order regardless of completion time
5. **Full Observability**: Dedicated tracing attributes identify batched requests and individual operation indices

---

## Target Audience

### Primary Persona
- **Role**: Backend Developer / Platform Engineer
- **Pain Points**: Need to support legacy clients using batch requests; require control over batch behavior; need visibility into batch execution
- **Goals**: Enable batch-based clients to work without modification; maintain system stability; understand batch performance

### Secondary Personas
- DevOps engineers monitoring system resource usage
- Client developers maintaining batch-based applications

---

## Use Cases

### Use Case 1: Legacy Client Migration
**Scenario**: A mobile application sends batched GraphQL requests and the team is migrating to Cosmo Router
**How it works**: Enable batching in the router configuration with appropriate limits; deploy the router; existing batch requests continue working without client changes
**Outcome**: Seamless migration with no client-side modifications required

### Use Case 2: Resource-Controlled Batch Processing
**Scenario**: A team needs to support batch requests but wants to prevent any single batch from consuming excessive resources
**How it works**: Configure `max_entries_per_batch: 50` and `max_concurrency: 5` to limit batch size and parallel execution
**Outcome**: Batch support with predictable resource consumption and protection against oversized requests

### Use Case 3: Batch Performance Analysis
**Scenario**: Operations team needs to understand batch request patterns and identify optimization opportunities
**How it works**: Use the dedicated batch tracing attributes (`wg.operation.batching.is_batched`, `wg.operation.batching.operations_count`, `wg.operation.batching.operation_index`) to analyze batch behavior in your observability platform
**Outcome**: Data-driven insights into batch patterns enabling targeted optimization

---

## Technical Summary

### How It Works
When batch mode is enabled, clients send POST requests with a JSON array of operations. The router processes operations concurrently (up to `max_concurrency` at a time) and assembles responses in the original request order. Each operation is independently planned and executed, with errors isolated to individual array positions.

### Key Technical Features
- Concurrent operation processing with configurable parallelism
- Response order guaranteed to match request order
- Independent error handling per operation
- Dedicated tracing attributes for observability
- Rate limiting applies per operation within batches
- Feature flags apply uniformly across batch operations

### Configuration Options
```yaml
batching:
  enabled: true
  max_concurrency: 10
  max_entries_per_batch: 100
  omit_extensions: false
```

### Integration Points
- OpenTelemetry tracing with batch-specific attributes
- Rate limiting integration (per-operation limits)
- Feature flags (uniform across batch)

### Requirements & Prerequisites
- Batching disabled by default (must explicitly enable)
- Subscriptions not supported within batches
- HTTP/2 multiplexing recommended as alternative for new implementations

---

## Competitive Positioning

### Key Differentiators
1. Configurable concurrency for fine-grained resource control
2. Comprehensive batch-specific tracing attributes
3. Clear guidance on when to use batching vs. HTTP/2 multiplexing

### Common Objections & Responses

| Objection | Response |
|-----------|----------|
| Why is batching disabled by default? | Cosmo recommends HTTP/2 multiplexing for new implementations due to better load balancing. Batching is provided for compatibility with existing clients. |
| How does batching affect rate limiting? | Rate limits apply per operation, so a batch of 20 operations counts as 20 towards rate limits, preventing circumvention through batching. |

---

## Documentation References

- Primary docs: `/docs/router/query-batching`
- Tracing reference: `/docs/router/open-telemetry`
- Rate limiting: `/docs/router/security/hardening-guide`
- Feature flags: `/docs/concepts/feature-flags`

---

## Keywords & SEO

### Primary Keywords
- GraphQL Query Batching
- GraphQL Batch Requests
- Multiple Operations Single Request

### Secondary Keywords
- GraphQL Request Batching
- Batch GraphQL Queries
- GraphQL Concurrent Operations

### Related Search Terms
- Send multiple GraphQL queries at once
- GraphQL batch endpoint
- Optimize GraphQL network requests
- GraphQL request aggregation
