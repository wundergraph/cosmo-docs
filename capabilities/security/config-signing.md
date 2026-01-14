# Config Signing

## Metadata

| Field | Value |
|-------|-------|
| **Capability ID** | `cap-sec-004` |
| **Category** | Security |
| **Status** | GA |
| **Availability** | Free, Pro, Enterprise |
| **Related Capabilities** | `cap-sec-005` (Security Hardening) |

---

## Quick Reference

### Name
Config Signing

### Tagline
HMAC-SHA256 signature verification for tamper-proof configurations.

### Elevator Pitch
Cosmo's Config Validation & Signing feature protects your router configuration from tampering attacks using cryptographic signatures. An admission webhook validates every composition before deployment, generating an HMAC-SHA256 signature that the router verifies before applying any configuration changes. This prevents attackers from redirecting your traffic to unauthorized servers.

---

## Problem & Solution

### The Problem
Router configurations contain critical information including subgraph URLs and execution rules. Whether fetched from CDN or deployed via files, these configurations could be tampered with by attackers who might modify subgraph URLs to redirect traffic to malicious servers, enabling data theft or service disruption. Without verification, routers have no way to detect if configurations have been modified in transit or at rest.

### The Solution
Cosmo's Config Signing implements a cryptographic chain of trust. When a composition occurs, the control plane calls your admission webhook with a private URL to fetch the configuration. Your webhook validates the configuration (checking subgraph URLs, policies, etc.) and returns an HMAC-SHA256 signature. This signature is stored with the configuration artifact. When the router fetches or loads a configuration, it independently calculates the hash and compares it to the stored signature, rejecting any configuration that doesn't match.

### Before & After

| Before Cosmo | With Cosmo |
|--------------|------------|
| Configurations trusted implicitly | Cryptographic verification of every configuration |
| No protection against tampering | HMAC-SHA256 signature validation |
| Subgraph URLs could be modified | Admission webhook validates all URLs |
| Silent acceptance of modified configs | Router rejects tampered configurations |

---

## Key Benefits

1. **Tamper Detection**: Cryptographic signatures detect any modification to the configuration, whether in transit or at rest.

2. **Custom Validation**: Your admission webhook can implement custom validation rules, such as ensuring all subgraph URLs belong to your organization's domain.

3. **Defense in Depth**: Combines signature verification with your own business logic validation for comprehensive protection.

4. **Seamless Integration**: Works with both CDN polling and file-based configuration deployment.

5. **Audit Trail**: Failed validations are visible in the Studio, providing visibility into configuration issues.

---

## Target Audience

### Primary Persona
- **Role**: Security Engineer / Platform Engineer
- **Pain Points**: Ensuring configuration integrity; preventing supply chain attacks; maintaining audit trails for compliance
- **Goals**: Cryptographic verification of all configurations; custom validation policies; tamper-evident deployments

### Secondary Personas
- DevOps engineers managing router deployments
- Compliance officers requiring configuration integrity verification
- Architects designing secure deployment pipelines

---

## Use Cases

### Use Case 1: Preventing Subgraph URL Manipulation
**Scenario**: An attacker gains access to the CDN or file system and attempts to modify subgraph URLs to redirect traffic to a malicious server for data exfiltration.

**How it works**: The admission webhook validates that all subgraph URLs belong to the organization's domain (e.g., *.wundergraph.com) and signs the configuration. The router verifies this signature before applying the configuration.

**Outcome**: Modified configurations are rejected by the router, which continues operating with the last known good configuration or refuses to start if no valid configuration exists.

### Use Case 2: Secure CI/CD Pipeline Deployment
**Scenario**: A team deploys router configurations via their CI/CD pipeline using `wgc router fetch` and needs to ensure configurations aren't modified during the deployment process.

**How it works**: The `wgc router fetch` command includes the `--graph-sign-key` parameter to fetch signed configurations. The router validates signatures before applying file-based configurations.

**Outcome**: End-to-end configuration integrity from composition through deployment, with cryptographic verification at every step.

### Use Case 3: Webhook Request Authentication
**Scenario**: An organization wants to ensure that webhook calls to their admission server genuinely originate from Cosmo's control plane.

**How it works**: Configure `--admission-webhook-secret` when creating the federated graph. The control plane includes an HMAC signature in the `X-Cosmo-Signature-256` header, which the admission server verifies before processing.

**Outcome**: Bidirectional authentication ensuring both the webhook request origin and the configuration integrity are verified.

---

## Technical Summary

### How It Works
1. When a composition occurs, the control plane calls your admission webhook's `/validate-config` endpoint with `federatedGraphId`, `organizationId`, and a short-lived `privateConfigUrl`.
2. Your webhook fetches the configuration from the private URL, validates it according to your policies, and calculates an HMAC-SHA256 hash using your signing key.
3. The webhook returns the BASE64-encoded signature (or an error to block deployment).
4. The control plane stores the signature with the configuration artifact.
5. When the router loads a configuration, it calculates the hash using the same signing key and compares it to the stored signature.
6. If signatures match, the configuration is applied; otherwise, it's rejected.

### Key Technical Features
- HMAC-SHA256 signature algorithm (industry standard)
- Short-lived private URLs for configuration retrieval (5-minute expiry)
- Admission webhook for custom validation logic
- Webhook request signing via X-Cosmo-Signature-256 header
- Support for both CDN and file-based configuration
- Configuration rejection without service disruption

### Integration Points
- Admission webhook server (Cloudflare Workers, Fastly, Deno, Bun, Node.js)
- CI/CD pipelines via wgc CLI
- CDN for configuration distribution
- Cosmo Studio for deployment status visibility

### Requirements & Prerequisites
- Router version 0.74.0 or higher
- Publicly accessible admission webhook server (HTTPS required)
- Signing key shared between admission server and router
- `@wundergraph/cosmo-shared` npm package for configuration parsing

---

## Documentation References

- Primary docs: `/docs/router/security/config-validation-and-signing`
- CLI reference: `/docs/cli/router/fetch`
- Example implementation: https://github.com/wundergraph/cosmo/tree/main/admission-server
- Hardening guide: `/docs/router/security/hardening-guide`

---

## Keywords & SEO

### Primary Keywords
- GraphQL configuration signing
- HMAC signature verification
- Tamper-proof configuration

### Secondary Keywords
- Admission webhook
- Configuration integrity
- Supply chain security GraphQL

### Related Search Terms
- GraphQL security best practices
- Prevent configuration tampering
- Signed configuration deployment

---

## Version History

| Date | Version | Changes |
|------|---------|---------|
| 2025-01-14 | 1.0 | Initial capability documentation |
