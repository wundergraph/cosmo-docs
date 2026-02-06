# Persisted Operations

## Metadata

| Field | Value |
|-------|-------|
| **Capability ID** | `cap-perf-001` |
| **Category** | Performance |
| **Status** | GA |
| **Availability** | Free / Pro / Enterprise |
| **Related Capabilities** | `cap-perf-002` (APQ) |

---

## Quick Reference

### Name
Persisted Operations

### Tagline
Pre-register trusted operations for security and performance.

### Elevator Pitch
Persisted Operations allow you to pre-register GraphQL queries, mutations, and subscriptions with your federated graph. Clients send only a hash identifier instead of the full operation body, reducing bandwidth, improving performance, and enabling a security safe-list that blocks unauthorized operations.

---

## Problem & Solution

### The Problem
In production GraphQL environments, sending full query bodies with every request wastes bandwidth and exposes your API surface to arbitrary operations. Teams struggle to control which operations can be executed against their graph, and without a whitelist mechanism, any valid GraphQL query can be run - including potentially expensive or malicious ones.

### The Solution
Cosmo's Persisted Operations let you register trusted operations during your CI/CD pipeline. The control plane stores these operations and replicates them to the CDN for router access. Clients reference operations by hash, reducing payload size and enabling strict operation allowlists in production.

### Before & After

| Before Cosmo | With Cosmo |
|--------------|------------|
| Full query bodies sent with every request | Only hash identifiers transmitted |
| Any arbitrary operation can be executed | Only registered operations allowed |
| No visibility into which operations clients use | Full audit trail of registered operations |
| Larger request payloads increase latency | Minimal payloads improve response times |

---

## Key Benefits

1. **Reduced Bandwidth**: Clients send only a short hash instead of potentially large query bodies, significantly reducing network overhead.
2. **Enhanced Security**: Block non-registered operations to prevent unauthorized or malicious queries from executing against your graph.
3. **Audit Trail**: Track exactly which operations are registered and used by each client application.
4. **CI/CD Integration**: Register operations automatically during your release pipeline, ensuring development flexibility while maintaining production security.
5. **Client-Specific Operations**: Associate operations with specific client applications using the `graphql-client-name` header.

---

## Target Audience

### Primary Persona
- **Role**: Platform Engineer / Security Engineer
- **Pain Points**: Controlling API access, preventing abuse, reducing attack surface
- **Goals**: Lock down production to only trusted operations while maintaining developer velocity

### Secondary Personas
- Frontend developers who want faster API responses
- DevOps engineers integrating GraphQL security into CI/CD pipelines
- Security teams requiring operation allowlists

---

## Use Cases

### Use Case 1: Production Security Lockdown
**Scenario**: An e-commerce company wants to ensure only vetted operations run against their production federated graph.
**How it works**: During the release pipeline, the team runs `wgc operations push` to register all client operations. The router is configured with `block_non_persisted_operations: true`. Any request without a registered hash is rejected.
**Outcome**: Only pre-approved operations execute in production, eliminating the risk of arbitrary query execution.

### Use Case 2: Bandwidth Optimization for Mobile Apps
**Scenario**: A mobile application sends complex GraphQL queries that increase data usage and latency over cellular networks.
**How it works**: The mobile client library generates operation hashes. Operations are pushed during the app's build process. At runtime, the app sends only the hash identifier.
**Outcome**: Request payloads shrink from kilobytes to bytes, improving load times and reducing user data consumption.

### Use Case 3: Incremental Migration to Strict Mode
**Scenario**: A team wants to adopt persisted operations gradually without breaking existing clients.
**How it works**: First, enable `log_unknown` to identify non-persisted operations in logs. Then enable `safelist` mode to allow operations matching persisted bodies. Finally, enable full blocking once all clients are migrated.
**Outcome**: Safe, incremental rollout of operation restrictions with zero client disruption.

---

## Technical Summary

### How It Works
Operations are registered via the `wgc operations push` command during CI/CD, which sends them to the control plane. The control plane replicates operations to the Cosmo CDN. Routers fetch operations from the CDN and validate incoming requests against the registered hashes. Clients must send a SHA-256 hash that matches a registered operation.

### Key Technical Features
- SHA-256 hash-based operation identification
- Client-specific operation namespacing via `graphql-client-name` header
- Multiple enforcement modes: log-only, safelist, full blocking
- CDN-backed operation storage for fast router access
- JSON output support for CI/CD tooling integration

### Integration Points
- CI/CD pipelines (GitHub Actions, GitLab CI, etc.)
- GraphQL client libraries (Apollo, urql, Relay)
- Cosmo CDN and Control Plane

### Requirements & Prerequisites
- Cosmo CLI (`wgc`) for pushing operations
- Client-side tooling to generate operation manifests
- Router configuration to enable persisted operations enforcement

---

## Documentation References

- Primary docs: `/docs/router/persisted-queries`
- Persisted operations guide: `/docs/router/persisted-queries/persisted-operations`
- CLI reference: `/docs/cli/operations/push`
- Tutorial: `/docs/tutorial/using-persisted-operations`
- Router security configuration: `/docs/router/configuration#security`

---

## Keywords & SEO

### Primary Keywords
- Persisted operations
- Trusted documents
- GraphQL safe-list

### Secondary Keywords
- Operation allowlist
- Query whitelist
- GraphQL security

### Related Search Terms
- How to secure GraphQL API
- Block arbitrary GraphQL queries
- GraphQL operation registration

---

## Version History

| Date | Version | Changes |
|------|---------|---------|
| 2025-01-14 | 1.0 | Initial capability documentation |
