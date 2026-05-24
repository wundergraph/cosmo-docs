# Custom Playground Scripts

Pre-flight and operation scripts with dynamic variables for authentication, validation, and advanced workflows.

---

## Metadata

| Field | Value |
|-------|-------|
| **Capability ID** | `cap-dx-002` |
| **Category** | Developer Experience |
| **Status** | GA |
| **Availability** | Free / Pro / Enterprise |
| **Related Capabilities** | `cap-dx-001`, `cap-dx-003` |

---

## Quick Reference

### Name
Custom Playground Scripts

### Tagline
Automate authentication and workflows in your playground.

### Elevator Pitch
Custom Scripts enable developers to run JavaScript code before and after GraphQL operations in the Cosmo Playground. Handle OAuth token refresh, inject dynamic headers, validate responses, and transform data - all without leaving the playground. Scripts support environment variables, external API calls, and cryptographic operations.

---

## Problem & Solution

### The Problem
Testing authenticated GraphQL APIs is cumbersome. Developers must manually obtain tokens, copy them into headers, and repeat this process whenever tokens expire. Response validation requires external tools, and there's no way to chain operations or transform data within the playground environment.

### The Solution
Cosmo's Custom Scripts provide a programmable layer around playground operations. Pre-flight scripts run globally across all tabs (perfect for authentication), while pre-operation and post-operation scripts run per-tab for specific workflows. Environment variables keep secrets out of scripts, and the built-in CryptoJS library enables secure token handling.

### Before & After

| Before Cosmo | With Cosmo |
|--------------|------------|
| Manually copy/paste tokens for each request | Pre-flight scripts auto-refresh tokens |
| No response validation in playground | Post-operation scripts validate responses |
| Secrets hardcoded or exposed | Environment variables stored securely in browser |
| Switch tools for complex workflows | Complete workflows within the playground |

---

## Key Benefits

1. **Automated Authentication**: Pre-flight scripts handle OAuth flows, token refresh, and header injection automatically
2. **Response Validation**: Post-operation scripts verify responses meet expectations before moving forward
3. **Secure Secret Management**: Environment variables keep sensitive data out of scripts and stored locally in your browser
4. **External API Integration**: Fetch data from external services and incorporate it into your GraphQL workflows
5. **Cryptographic Operations**: Built-in CryptoJS support for encryption, decryption, and token handling

---

## Target Audience

### Primary Persona
- **Role**: API Developer / Frontend Developer
- **Pain Points**: Repetitive authentication setup; manual token management; inability to validate responses inline
- **Goals**: Streamline API testing; automate repetitive tasks; validate API behavior efficiently

### Secondary Personas
- QA engineers testing authenticated endpoints
- DevOps teams creating reproducible test scenarios
- Security engineers testing auth flows

---

## Use Cases

### Use Case 1: OAuth Token Automation
**Scenario**: An API requires Bearer tokens that expire every 15 minutes, and developers waste time manually refreshing them
**How it works**: A pre-flight script calls the OAuth endpoint with client credentials from environment variables, receives a new token, and stores it in an environment variable. The header `{{token}}` syntax automatically injects the fresh token into every request.
**Outcome**: Zero manual token management; developers can focus on actual API testing

### Use Case 2: Response Validation
**Scenario**: A team needs to ensure that user queries always return the expected fields before proceeding with dependent operations
**How it works**: A post-operation script checks that `playground.response.body.data.user` exists and contains required fields. If validation fails, it logs a warning to the console.
**Outcome**: Immediate feedback on API response structure without switching to external tools

### Use Case 3: Data Transformation and Logging
**Scenario**: A developer needs to anonymize PII in responses before sharing screenshots or recordings
**How it works**: A post-operation script accesses the response, replaces sensitive fields like email with masked values, and logs the transformed response to the console
**Outcome**: Safe sharing of API responses without exposing user data

---

## Technical Summary

### How It Works
Scripts are JavaScript code blocks executed at specific points in the request lifecycle:
1. **Pre-Flight Scripts**: Run first, across all playground tabs. Ideal for authentication.
2. **Pre-Operation Scripts**: Run per-tab, after pre-flight but before the request. Tab-specific header injection or variable setup.
3. **Post-Operation Scripts**: Run per-tab, after the response. Validation, transformation, and logging.

Scripts access the `playground` API object for environment variables, request/response bodies, and CryptoJS.

### Key Technical Features
- Three script types: pre-flight, pre-operation, post-operation
- `playground.env.get/set` for environment variable management
- `playground.request.body` for request inspection
- `playground.response.body` for response inspection
- `playground.CryptoJS` for cryptographic operations
- `{{variable}}` syntax for header injection
- External fetch API support

### Integration Points
- Cosmo Studio Playground
- External OAuth/auth providers
- Any REST API accessible from the browser

### Requirements & Prerequisites
- Cosmo Studio account
- Scripts are stored at the organization level
- Environment variables are browser-local

---

## Documentation References

- Primary docs: `/docs/studio/playground/custom-scripts`
- Playground overview: `/docs/studio/playground`

---

## Keywords & SEO

### Primary Keywords
- GraphQL playground scripts
- API authentication automation
- Pre-request scripts

### Secondary Keywords
- OAuth token refresh
- Response validation
- Playground environment variables

### Related Search Terms
- Automate GraphQL authentication
- GraphQL playground pre-flight scripts
- Postman-like scripts for GraphQL

---

## Version History

| Date | Version | Changes |
|------|---------|---------|
| 2025-01-14 | 1.0 | Initial capability documentation |
