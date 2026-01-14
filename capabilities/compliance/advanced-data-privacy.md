# Advanced Data Privacy

Field-level data obfuscation with custom value renderers for fine-grained access control.

---

## Metadata

| Field | Value |
|-------|-------|
| **Capability ID** | `cap-compliance-003` |
| **Category** | Compliance |
| **Status** | GA |
| **Availability** | Pro / Enterprise |
| **Related Capabilities** | `cap-compliance-001`, `cap-compliance-002`, `cap-compliance-004` |

---

## Quick Reference

### Name
Advanced Data Privacy

### Tagline
Field-level data obfuscation for sensitive information protection.

### Elevator Pitch
Cosmo's Advanced Data Privacy feature enables organizations to implement custom data obfuscation at the field level within GraphQL responses. Using Custom Modules, you can dynamically mask sensitive information like credit card numbers, social security numbers, or personal data based on user roles, request context, or any custom logic. This provides fine-grained data access control without modifying your subgraph implementations.

---

## Problem & Solution

### The Problem
Organizations often need to restrict access to sensitive data fields based on user roles or context. Developers debugging production issues might need to see query structures without exposing actual customer data. Data scientists analyzing patterns need to work with realistic data structures while protecting PII. AI models interacting with APIs should not have access to sensitive personal information. Implementing these restrictions at the subgraph level requires significant code changes and creates maintenance overhead.

### The Solution
Cosmo's Custom Modules allow you to implement custom value renderers that intercept and transform GraphQL response data at the Router level. You can obfuscate specific field types (String, Int, Float) or implement sophisticated logic based on authentication claims, user roles, or request context. This provides centralized, consistent data privacy enforcement without touching subgraph code.

### Before & After

| Before Cosmo | With Cosmo |
|--------------|------------|
| Implement data masking in each subgraph | Centralized obfuscation at the Router |
| Complex authorization logic in resolvers | Role-based obfuscation via request context |
| Separate data pipelines for AI/analytics | Same API with dynamic data filtering |
| Code changes required for new privacy rules | Configuration-based privacy policies |

---

## Key Benefits

1. **Centralized Privacy Control**: Implement data obfuscation once at the Router level, applied consistently across all subgraphs
2. **Role-Based Access**: Dynamically apply different obfuscation rules based on user roles or authentication claims
3. **AI-Safe Data Access**: Protect sensitive information when exposing APIs to AI models or third-party systems
4. **Developer-Friendly Debugging**: Allow developers to debug production queries without exposing actual customer data
5. **No Subgraph Changes**: Add privacy controls without modifying existing subgraph implementations

---

## Target Audience

### Primary Persona
- **Role**: Platform Engineer, Security Engineer
- **Pain Points**: Implementing consistent data masking across distributed services; providing safe data access for different user types; protecting data when integrating with AI systems
- **Goals**: Implement field-level access control; enable secure debugging workflows; protect sensitive data in all contexts

### Secondary Personas
- Data scientists needing to work with anonymized production data
- DevOps engineers setting up safe development environments
- AI/ML engineers integrating GraphQL APIs with models

---

## Use Cases

### Use Case 1: Developer Debugging with Masked Data
**Scenario**: Developers need to debug production GraphQL queries without seeing actual customer data like names, addresses, or payment information.
**How it works**: Implement a custom value renderer that checks for the "developer" role in authentication claims. When a developer makes a request, all String fields are replaced with "xxx" and numeric fields with placeholder values, preserving query structure while hiding data.
**Outcome**: Developers can debug query execution, response structures, and performance issues without exposure to sensitive customer information.

### Use Case 2: AI Model Data Access Control
**Scenario**: An organization wants to allow AI models to query their GraphQL API but needs to prevent exposure of sensitive fields like SSN, credit card numbers, or medical information.
**How it works**: Create a custom value renderer that identifies requests from AI systems (via headers or authentication) and obfuscates fields marked as sensitive. The AI model receives realistic response structures with placeholder data for protected fields.
**Outcome**: AI models can interact with the API for non-sensitive use cases while being prevented from accessing or learning from protected data.

### Use Case 3: Data Science Analytics Pipeline
**Scenario**: Data scientists need to analyze GraphQL query patterns and response structures using production data shapes without accessing actual PII.
**How it works**: Deploy a custom module that applies consistent obfuscation to all responses for data science service accounts. String values become masked, numbers become placeholder values, while maintaining accurate types and field structures.
**Outcome**: Data scientists can develop and test analytics pipelines using production-realistic data without compliance concerns.

---

## Technical Summary

### How It Works
Cosmo's Custom Modules feature allows you to implement a `CustomFieldValueRenderer` interface that intercepts response data before it's sent to the client. The renderer receives each field value with its GraphQL type information and can transform or replace the value based on any logic you implement. This is combined with the `RouterOnRequest` hook to apply different renderers based on request context.

### Key Technical Features
- Custom value renderer interface for field-level control
- Access to GraphQL type information (String, Int, Float, custom types)
- Integration with authentication claims and request context
- Per-request renderer selection via `RouterOnRequest` hook
- Written in Go for high performance

### Code Example
```go
func (c *CustomValueRenderer) RenderFieldValue(ctx *resolve.Context, value resolve.FieldValue, out io.Writer) error {
    switch value.Type {
    case "String":
        _, err = out.Write([]byte(`"xxx"`))
    case "Int", "Float":
        _, err = out.Write([]byte(`123`))
    default:
        _, err = out.Write(value.Data)
    }
    return err
}
```

### Integration Points
- Cosmo Router Custom Modules system
- Authentication/Authorization middleware
- Request context for conditional logic

### Requirements & Prerequisites
- Custom Module development capability (Go)
- Understanding of GraphQL response structure
- Router deployment with custom module support

---

## Documentation References

- Primary docs: `/docs/router/advanced-data-privacy`
- Custom Modules guide: `/docs/router/custom-modules`
- Router configuration: `/docs/router/configuration`

---

## Keywords & SEO

### Primary Keywords
- GraphQL data masking
- Field-level obfuscation
- PII protection GraphQL

### Secondary Keywords
- Data privacy API
- Role-based data access
- AI data protection

### Related Search Terms
- How to mask sensitive data in GraphQL
- GraphQL field-level security
- Obfuscate GraphQL response data

---

## Version History

| Date | Version | Changes |
|------|---------|---------|
| 2025-01-14 | 1.0 | Initial capability documentation |
