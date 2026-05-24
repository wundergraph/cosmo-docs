# IP Anonymization

Protect user privacy by automatically redacting or hashing IP addresses in telemetry and logs.

---

## Metadata

| Field | Value |
|-------|-------|
| **Capability ID** | `cap-compliance-002` |
| **Category** | Compliance |
| **Status** | GA |
| **Availability** | Free / Pro / Enterprise |
| **Related Capabilities** | `cap-compliance-001`, `cap-compliance-003`, `cap-compliance-004` |

---

## Quick Reference

### Name
IP Anonymization

### Tagline
Privacy-first telemetry with automatic IP redaction.

### Elevator Pitch
Cosmo Router automatically anonymizes IP addresses by default, ensuring user privacy without any configuration. Choose between complete redaction for maximum privacy or hashing for anonymous analytics. This built-in feature ensures compliance with privacy regulations like GDPR while maintaining full observability capabilities.

---

## Problem & Solution

### The Problem
IP addresses are considered personally identifiable information (PII) under privacy regulations like GDPR. Organizations collecting telemetry data, logs, or analytics from their GraphQL APIs face the challenge of maintaining useful observability while protecting user privacy. Manual anonymization is error-prone and often overlooked, creating compliance risks.

### The Solution
Cosmo Router enables IP anonymization by default, ensuring that no raw IP addresses are exported from your infrastructure. With a simple configuration option, you can choose between complete redaction (removing IP addresses entirely) or hashing (allowing anonymous user tracking for analytics while preserving privacy).

### Before & After

| Before Cosmo | With Cosmo |
|--------------|------------|
| Manual implementation of IP anonymization | Automatic, enabled by default |
| Risk of accidentally exposing user IPs | Privacy safeguards built into the platform |
| Complex configuration for GDPR compliance | Simple one-line configuration |
| Inconsistent anonymization across services | Consistent privacy protection at the gateway |

---

## Key Benefits

1. **Privacy by Default**: IP anonymization is enabled out of the box, no configuration required for basic protection
2. **Flexible Anonymization Methods**: Choose between redaction (complete removal) or hashing (anonymous tracking) based on your needs
3. **Regulatory Compliance**: Built-in support for GDPR data minimization requirements
4. **Zero Performance Impact**: Anonymization happens efficiently at the router level without affecting request latency
5. **Consistent Protection**: All telemetry, logs, and analytics are protected uniformly

---

## Target Audience

### Primary Persona
- **Role**: Platform Engineer, DevOps Engineer
- **Pain Points**: Implementing privacy controls across distributed systems; ensuring consistent anonymization; maintaining compliance without sacrificing observability
- **Goals**: Deploy privacy-compliant infrastructure with minimal configuration; meet regulatory requirements efficiently

### Secondary Personas
- Data Protection Officers ensuring GDPR compliance
- Security engineers implementing privacy controls
- Compliance teams auditing data collection practices

---

## Use Cases

### Use Case 1: GDPR-Compliant Analytics
**Scenario**: A European e-commerce company needs to collect API analytics while complying with GDPR data minimization principles.
**How it works**: Deploy Cosmo Router with default IP anonymization settings. All analytics and telemetry automatically exclude raw IP addresses. For user journey analysis, switch to hash mode to enable anonymous user tracking.
**Outcome**: Full analytics capabilities maintained while meeting GDPR requirements for data minimization.

### Use Case 2: Privacy-First Logging
**Scenario**: An organization needs to maintain detailed request logs for debugging but wants to minimize PII in log files.
**How it works**: Cosmo Router's default redact mode removes IP addresses from all request logs. Logs contain all other useful debugging information (user agent, request path, response status, latency) without exposing user IP addresses.
**Outcome**: Comprehensive request logging for operational needs without PII exposure.

### Use Case 3: Anonymous User Analytics
**Scenario**: A SaaS platform wants to analyze user behavior patterns across their GraphQL API without storing identifiable information.
**How it works**: Configure IP anonymization with hash mode. IP addresses are converted to consistent hashes, allowing user session tracking and behavior analysis without storing the actual IP address.
**Outcome**: Rich analytics on user behavior patterns while maintaining user privacy and compliance.

---

## Technical Summary

### How It Works
The Cosmo Router intercepts all incoming requests and applies IP anonymization before the IP address is used in any telemetry, logging, or analytics. Two methods are available:

- **Redact**: Completely removes the IP address, replacing it with a placeholder value
- **Hash**: Applies a one-way hash function to the IP address, producing a consistent anonymous identifier

### Key Technical Features
- Enabled by default with redact mode
- Configurable via YAML configuration or environment variables
- Applied consistently across all telemetry exports (OTEL traces, metrics)
- Applied to request logging
- No plaintext IP addresses in exported data

### Configuration Example
```yaml
compliance:
  anonymize_ip:
    enabled: true
    method: redact # or "hash"
```

### Integration Points
- OpenTelemetry trace exports
- OpenTelemetry metric exports
- Request logging system
- Cosmo Analytics

### Requirements & Prerequisites
- Cosmo Router deployment
- No additional configuration required for default behavior

---

## Documentation References

- Primary docs: `/docs/router/compliance-and-data-management`
- Router configuration: `/docs/router/configuration`
- Security overview: `/docs/security-and-compliance`

---

## Keywords & SEO

### Primary Keywords
- IP anonymization
- GraphQL privacy
- GDPR compliant API

### Secondary Keywords
- PII protection
- Privacy by design
- Data anonymization

### Related Search Terms
- How to anonymize IP addresses in GraphQL
- GDPR GraphQL logging
- Privacy compliant telemetry

---

## Version History

| Date | Version | Changes |
|------|---------|---------|
| 2025-01-14 | 1.0 | Initial capability documentation |
