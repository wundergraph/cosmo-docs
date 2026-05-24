# Security Hardening

## Metadata

| Field | Value |
|-------|-------|
| **Capability ID** | `cap-sec-005` |
| **Category** | Security |
| **Status** | GA |
| **Availability** | Free, Pro, Enterprise |
| **Related Capabilities** | `cap-sec-003` (TLS/HTTPS), `cap-sec-004` (Config Signing), `cap-sec-006` (Introspection Control), `cap-sec-007` (Subgraph Error Propagation) |

---

## Quick Reference

### Name
Security Hardening

### Tagline
Best practices for production-ready GraphQL deployments.

### Elevator Pitch
Cosmo's Security Hardening Guide provides comprehensive best practices for deploying GraphQL in production environments. From disabling introspection and development mode to enabling rate limiting and TLS, these recommendations help you minimize attack surface, protect sensitive data, and maintain a resilient API infrastructure.

---

## Problem & Solution

### The Problem
GraphQL APIs deployed with default configurations often expose unnecessary attack vectors. Development-friendly features like introspection, verbose error messages, and open CORS policies become security liabilities in production. Teams may not be aware of all the configuration options available to harden their deployments, leaving APIs vulnerable to abuse, data leaks, and denial-of-service attacks.

### The Solution
Cosmo's Security Hardening Guide provides a systematic checklist of security configurations for production deployments. Each recommendation addresses a specific attack vector with clear configuration examples. By following these guidelines, teams can significantly reduce their attack surface while maintaining the functionality needed for their use cases.

### Before & After

| Before Cosmo | With Cosmo |
|--------------|------------|
| Default configuration with all features enabled | Minimal attack surface with only required features |
| Schema exposed via introspection | Introspection disabled in production |
| Open CORS allowing any origin | Restricted CORS to trusted domains |
| All query types allowed | Unused operations (mutations/subscriptions) disabled |

---

## Key Benefits

1. **Reduced Attack Surface**: Disable features not needed in production like introspection, file uploads, and development mode.

2. **Rate Limiting Protection**: GCRA-based rate limiting protects subgraphs from overload and prevents abuse.

3. **Persistent Operations Security**: Block non-persisted queries to allow only pre-approved operations.

4. **CORS Hardening**: Restrict allowed origins, methods, and headers to trusted sources.

5. **TLS and HTTP/2**: Enable encrypted communication with automatic HTTP/2 performance benefits.

---

## Target Audience

### Primary Persona
- **Role**: DevOps Engineer / Platform Engineer
- **Pain Points**: Ensuring production security; understanding all configuration options; balancing security with functionality
- **Goals**: Hardened production deployments; compliance with security policies; reduced incident risk

### Secondary Personas
- Security engineers conducting deployment reviews
- Architects establishing security baselines
- Operations teams responding to security incidents

---

## Use Cases

### Use Case 1: Production Deployment Checklist
**Scenario**: A team is preparing to deploy their Cosmo Router to production and needs to ensure all security configurations are properly set.

**How it works**: Follow the hardening guide checklist: disable introspection, disable dev_mode, enable TLS, configure CORS restrictions, enable rate limiting, consider config signing, and review persistent operations.

**Outcome**: A production-ready deployment with minimized attack surface and appropriate security controls.

### Use Case 2: Protecting Against API Abuse
**Scenario**: An API is experiencing abuse from automated requests causing performance degradation.

**How it works**: Enable Redis-backed rate limiting with GCRA algorithm. Configure appropriate rate, burst, and period values. Consider enabling persistent operations to block arbitrary queries.

**Outcome**: Abuse is mitigated through rate limiting, and persistent operations ensure only approved queries execute.

### Use Case 3: Minimizing Data Exposure
**Scenario**: A financial services API must minimize the risk of data exposure through the GraphQL endpoint.

**How it works**: Disable introspection to hide the schema, enable config signing to prevent tampering, configure restrictive CORS, use TLS for encryption, and set log level to ERROR to reduce logging of sensitive data.

**Outcome**: Multiple layers of protection reducing the risk of data exposure through various attack vectors.

---

## Technical Summary

### How It Works
The Security Hardening Guide provides configuration-level controls across multiple security domains. Each setting is applied via the router's YAML configuration file, with sensible defaults that can be overridden for production environments. The router enforces these settings at runtime, rejecting requests that violate configured policies.

### Key Technical Features

**Introspection Control**
```yaml
introspection:
  enabled: false
```

**Development Mode**
```yaml
dev_mode: false
```

**File Upload Control**
```yaml
file_upload:
  enabled: false
```

**Rate Limiting**
```yaml
rate_limit:
  enabled: true
  storage:
    urls:
      - redis://localhost:6379
  simple_strategy:
    rate: 100
    burst: 200
    period: 1s
```

**CORS Restrictions**
```yaml
cors:
  allow_methods: ["POST", "GET"]
  allow_origins: ["mydomain.com"]
  allow_credentials: true
```

**Persistent Operations**
```yaml
security:
  block_non_persisted_operations:
    enabled: true
  block_subscriptions:
    enabled: true
  block_mutations:
    enabled: true
```

**TLS Configuration**
```yaml
tls:
  server:
    enabled: true
    key_file: ../your/key.pem
    cert_file: ../your/cert.pem
```

**Log Level**
```yaml
log_level: "error"
```

### Integration Points
- Redis for rate limiting storage
- Certificate management for TLS
- Config signing infrastructure
- Persistent operations registry

### Requirements & Prerequisites
- Redis instance for rate limiting
- TLS certificates for HTTPS
- Admission webhook for config signing
- Persistent operations uploaded via wgc CLI

---

## Documentation References

- Primary docs: `/docs/router/security/hardening-guide`
- TLS configuration: `/docs/router/security/tls`
- Config signing: `/docs/router/security/config-validation-and-signing`
- Persistent operations: `/docs/router/persisted-queries/persisted-operations`
- Rate limiting: `/docs/router/configuration`

---

## Keywords & SEO

### Primary Keywords
- GraphQL security hardening
- Production GraphQL security
- GraphQL best practices

### Secondary Keywords
- GraphQL rate limiting
- Disable GraphQL introspection
- GraphQL CORS configuration

### Related Search Terms
- Secure GraphQL deployment
- GraphQL security checklist
- Production GraphQL configuration

---

## Version History

| Date | Version | Changes |
|------|---------|---------|
| 2025-01-14 | 1.0 | Initial capability documentation |
