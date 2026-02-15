# Webhook Notifications

Custom webhook integration for receiving Cosmo events in your own systems and workflows.

---

## Metadata

| Field | Value |
|-------|-------|
| **Capability ID** | `cap-notifications-002` |
| **Category** | Notifications |
| **Status** | GA |
| **Availability** | Free, Pro, Enterprise |
| **Related Capabilities** | `cap-notifications-001`, `cap-notifications-003` |

---

## Quick Reference

### Name
Webhook Notifications

### Tagline
Receive graph events anywhere via secure webhooks.

### Elevator Pitch
Cosmo Webhook Notifications let you integrate federated graph events directly into your existing systems and workflows. Set up secure, verified webhook endpoints to receive real-time notifications about schema changes, trigger CI/CD pipelines, update documentation, or feed custom dashboards—all with cryptographic verification to ensure data integrity.

---

## Problem & Solution

### The Problem
Organizations need to react programmatically to changes in their federated GraphQL graphs. When schemas update, downstream systems—CI/CD pipelines, documentation generators, monitoring dashboards, and custom tooling—need to be notified automatically. Without a native webhook system, teams resort to polling APIs or building custom event infrastructure, wasting engineering time and introducing latency.

### The Solution
Cosmo's Webhook Notifications provide a first-class event delivery system that pushes graph events to any HTTP endpoint in real-time. Each webhook request includes HMAC signature verification, ensuring payloads are authentic and haven't been tampered with. Configure multiple webhooks per organization, each subscribing to specific events, and integrate seamlessly with your existing infrastructure.

### Before & After

| Before Cosmo | With Cosmo |
|--------------|------------|
| Polling APIs for changes | Real-time push notifications |
| Building custom event infrastructure | Out-of-the-box webhook system |
| No verification of event authenticity | HMAC-SHA256 signature verification |
| Single integration point | Multiple webhooks with independent configurations |

---

## Key Benefits

1. **Real-Time Event Delivery**: Receive notifications immediately when events occur, no polling required
2. **Cryptographic Verification**: HMAC-SHA256 signatures ensure webhook payloads are authentic and untampered
3. **Flexible Integration**: Connect to any system that can receive HTTP requests—CI/CD, monitoring, custom tools
4. **Structured Payloads**: Versioned JSON payloads with consistent schema for reliable parsing
5. **Multiple Webhooks**: Configure multiple endpoints per organization with independent event subscriptions

---

## Target Audience

### Primary Persona
- **Role**: Platform Engineer / DevOps Engineer
- **Pain Points**: Need to trigger automated workflows when graph changes occur; require secure, verifiable event delivery
- **Goals**: Automate responses to schema changes; integrate Cosmo events into existing infrastructure

### Secondary Personas
- Backend developers building custom tooling around the federated graph
- Security engineers requiring audit trails and verified event sources
- SRE teams integrating with monitoring and alerting systems

---

## Use Cases

### Use Case 1: Automated CI/CD Triggers
**Scenario**: An organization wants to automatically run integration tests whenever the federated graph schema updates.
**How it works**: Configure a webhook pointing to a CI/CD trigger endpoint (e.g., GitHub Actions webhook, Jenkins trigger). Subscribe to the `FEDERATED_GRAPH_SCHEMA_UPDATED` event. When the schema updates, the webhook fires and triggers the test pipeline.
**Outcome**: Every schema change automatically triggers integration tests, catching issues before they reach production.

### Use Case 2: Documentation Auto-Generation
**Scenario**: API documentation needs to stay synchronized with the current federated schema.
**How it works**: Set up a webhook endpoint that receives schema update events. The endpoint triggers a documentation generation workflow that fetches the latest schema and regenerates API docs.
**Outcome**: Documentation is always current, reducing support burden and improving developer experience for API consumers.

### Use Case 3: Change Audit Logging
**Scenario**: A financial services company requires complete audit trails of all API schema changes for compliance.
**How it works**: Configure a webhook to send all schema events to a secure audit logging service. Each payload includes the federated graph details, error status, and actor ID. The logging service stores these with timestamps for compliance reporting.
**Outcome**: Complete, verifiable audit trail satisfying regulatory requirements with cryptographic proof of event authenticity.

---

## Competitive Positioning

### Key Differentiators
1. Built specifically for GraphQL federation events, providing rich, contextual payloads
2. HMAC signature verification included by default, not an add-on
3. Organization-level management supporting multiple independent webhook configurations

### Comparison with Alternatives

| Aspect | Cosmo Webhooks | Generic Event Systems | Custom Solutions |
|--------|----------------|----------------------|------------------|
| GraphQL-specific events | Yes | No | Requires implementation |
| Built-in HMAC verification | Yes | Varies | Requires implementation |
| Setup time | Minutes | Hours | Days/weeks |
| Maintenance burden | None | Medium | High |

### Common Objections & Responses

| Objection | Response |
|-----------|----------|
| "We need custom event formats" | Cosmo's versioned JSON payloads are standard and easily transformed in your receiving endpoint |
| "How do we know events are legitimate?" | Every webhook request includes HMAC-SHA256 signature in the X-Cosmo-Signature-256 header for cryptographic verification |
| "What if our endpoint is temporarily down?" | Configure multiple webhooks as backup, and implement standard retry logic in your infrastructure |

---

## Technical Summary

### How It Works
When you create a webhook in Cosmo, you provide an endpoint URL and a secret key. When subscribed events occur, Cosmo sends an HTTP POST request to your endpoint with a JSON payload. The request includes an `X-Cosmo-Signature-256` header containing an HMAC-SHA256 signature computed using your secret, allowing you to verify the payload's authenticity.

### Key Technical Features
- HTTP POST delivery to any accessible endpoint
- HMAC-SHA256 signature verification via `X-Cosmo-Signature-256` header
- Versioned JSON payloads (current version: 1)
- Event types: `FEDERATED_GRAPH_SCHEMA_UPDATED`
- Payload includes: federated graph details (id, name, namespace), error status, actor ID

### Integration Points
- CI/CD systems (GitHub Actions, GitLab CI, Jenkins, CircleCI)
- Monitoring platforms (Datadog, PagerDuty, custom dashboards)
- Documentation generators
- Audit and compliance systems
- Custom internal tooling

### Requirements & Prerequisites
- Publicly accessible HTTPS endpoint
- Ability to verify HMAC-SHA256 signatures
- Secret key for webhook verification (you provide this during setup)

---

## Proof Points

### Metrics & Benchmarks
- Sub-second event delivery
- Standard HMAC-SHA256 cryptographic verification
- Support for unlimited webhooks per organization

### Code Example: Signature Verification

```javascript
import crypto from 'crypto';

function verifySignature(body, receivedSignature, secret) {
  const computedSignature = crypto
    .createHmac('sha256', secret)
    .update(body)
    .digest('hex');

  return computedSignature === receivedSignature;
}

// Usage:
const isVerified = verifySignature(
  JSON.stringify(req.body),
  req.headers['x-cosmo-signature-256'],
  YOUR_SECRET
);
```

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

- Primary docs: `/docs/studio/alerts-and-notifications/webhooks`
- Overview: `/docs/studio/alerts-and-notifications`
- Platform webhooks: `/docs/control-plane/webhooks`

---

## Keywords & SEO

### Primary Keywords
- GraphQL webhooks
- Federation event webhooks
- Schema change webhooks

### Secondary Keywords
- GraphQL event notifications
- API webhook integration
- Federated graph events

### Related Search Terms
- How to receive GraphQL schema change events
- Webhook integration for GraphQL federation
- Secure webhook verification GraphQL
- HMAC webhook signature verification

---

## Version History

| Date | Version | Changes |
|------|---------|---------|
| 2025-01-14 | 1.0 | Initial capability documentation |
