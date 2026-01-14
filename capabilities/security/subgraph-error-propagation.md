# Subgraph Error Propagation

## Metadata

| Field | Value |
|-------|-------|
| **Capability ID** | `cap-sec-007` |
| **Category** | Security |
| **Status** | GA |
| **Availability** | Free, Pro, Enterprise |
| **Related Capabilities** | `cap-sec-005` (Security Hardening) |

---

## Quick Reference

### Name
Subgraph Error Propagation

### Tagline
Control error exposure with sensitive data masking.

### Elevator Pitch
Cosmo Router provides fine-grained control over how subgraph errors are exposed to clients. Choose between wrapped mode that encapsulates errors generically or pass-through mode that forwards errors directly. Configure exactly which error fields and extensions are visible to prevent leaking sensitive internal information while still providing meaningful error messages for debugging.

---

## Problem & Solution

### The Problem
Subgraph error messages often contain sensitive internal information: stack traces, database errors, internal service names, infrastructure details, and debugging information. Exposing these details to clients creates security risks, leaking information that attackers can use to understand your architecture and identify vulnerabilities. However, completely hiding errors makes debugging difficult and provides poor user experience.

### The Solution
Cosmo Router's Subgraph Error Propagation feature provides configurable control over error exposure. Wrapped mode encapsulates subgraph errors in generic messages while preserving details for debugging. Pass-through mode forwards errors directly with configurable field filtering. Both modes support fine-grained control over which extension fields are exposed, allowing you to balance security with debugging needs.

### Before & After

| Before Cosmo | With Cosmo |
|--------------|------------|
| Raw subgraph errors exposed to clients | Configurable error wrapping and filtering |
| Sensitive stack traces leaked | Only approved fields exposed |
| No control over error extensions | Whitelist specific extension fields |
| Internal service names visible | Optional service name attachment |

---

## Key Benefits

1. **Configurable Error Modes**: Choose wrapped mode for maximum protection or pass-through mode for transparency, each with extensive configuration options.

2. **Extension Field Filtering**: Whitelist specific extension fields like "code" while blocking sensitive debugging information.

3. **Service Name Control**: Optionally include or exclude subgraph service names in errors for client-side routing or debugging.

4. **Location Stripping**: Remove subgraph-specific line/column locations that are irrelevant to clients and may reveal internal structure.

5. **Status Code Propagation**: Optionally include HTTP status codes for client-side error handling logic.

---

## Target Audience

### Primary Persona
- **Role**: Backend Developer / API Developer
- **Pain Points**: Balancing debugging information with security; preventing information leakage; providing useful error messages
- **Goals**: Secure error responses; meaningful client error messages; efficient debugging in production

### Secondary Personas
- Security engineers reviewing API error exposure
- Frontend developers consuming error responses
- DevOps engineers monitoring production errors

---

## Use Cases

### Use Case 1: Maximum Security Error Handling
**Scenario**: A financial services API must prevent any internal information from leaking through error messages.

**How it works**: Configure wrapped mode with `omit_extensions: true`. All subgraph errors are wrapped in generic "Failed to fetch from Subgraph" messages with no additional details exposed to clients.

**Outcome**: Zero information leakage through error responses, with details available only in server logs.

### Use Case 2: Structured Error Handling with Codes
**Scenario**: A client application implements error handling logic based on error codes, requiring the "code" extension field while hiding all other internal details.

**How it works**: Configure wrapped mode with `allowed_extension_fields: ["code"]` and `omit_extensions: false`. Only the "code" field from extensions is forwarded to clients.

**Outcome**: Client applications receive structured error codes for handling logic while sensitive extensions are filtered out.

### Use Case 3: Full Transparency for Internal APIs
**Scenario**: An internal API used only by trusted backend services needs complete error information for debugging.

**How it works**: Configure pass-through mode with `allow_all_extension_fields: true` and `attach_service_name: true`. All error details are forwarded including service names.

**Outcome**: Complete error transparency for internal debugging without the overhead of parsing wrapped errors.

---

## Technical Summary

### How It Works
When a subgraph returns an error, the router processes it according to the configured propagation mode. In wrapped mode, the original error is encapsulated in a generic message with details placed in the `extensions.errors` array. In pass-through mode, errors are forwarded directly to the client. Both modes apply field filtering based on configuration, stripping unauthorized fields before the response is sent.

### Key Technical Features

**Wrapped Mode (Default)**
```yaml
subgraph_error_propagation:
  mode: wrapped
  allowed_extension_fields:
    - "code"
```

**Wrapped Mode with Maximum Security**
```yaml
subgraph_error_propagation:
  mode: wrapped
  omit_extensions: true
```

**Wrapped Mode with Extended Information**
```yaml
subgraph_error_propagation:
  mode: wrapped
  omit_extensions: false
  propagate_status_codes: true
  attach_service_name: true
  allowed_extension_fields:
    - "code"
```

**Pass-Through Mode with Filtering**
```yaml
subgraph_error_propagation:
  mode: pass-through
  attach_service_name: true
  allow_all_extension_fields: false
  allowed_extension_fields:
    - "code"
  omit_locations: true
  allowed_fields:
    - "userId"
```

**Example Wrapped Error Response**
```json
{
  "errors": [
    {
      "message": "Failed to fetch from Subgraph 'employees'.",
      "extensions": {
        "serviceName": "employees",
        "statusCode": 200,
        "errors": [
          {
            "message": "error resolving field",
            "path": ["employees", 0, "name"],
            "extensions": {
              "code": "ERROR_CODE"
            }
          }
        ]
      }
    }
  ]
}
```

### Integration Points
- Client-side error handling logic
- Logging and monitoring systems
- Error tracking services (Sentry, Datadog)
- Development mode configuration

### Requirements & Prerequisites
- No specific version requirements (available in all modern router versions)
- Understanding of your error handling requirements
- Coordination with frontend teams on error format

---

## Documentation References

- Primary docs: `/docs/router/subgraph-error-propagation`
- Router configuration: `/docs/router/configuration#subgraph-error-propagation`
- Security hardening: `/docs/router/security/hardening-guide`

---

## Keywords & SEO

### Primary Keywords
- GraphQL error handling
- Subgraph error propagation
- GraphQL error security

### Secondary Keywords
- GraphQL error masking
- Error extension filtering
- GraphQL error responses

### Related Search Terms
- Hide GraphQL error details
- GraphQL error best practices
- Secure GraphQL error handling

---

## Version History

| Date | Version | Changes |
|------|---------|---------|
| 2025-01-14 | 1.0 | Initial capability documentation |
