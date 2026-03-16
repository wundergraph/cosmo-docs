# Subgraph Check Extensions

## Metadata

| Field | Value |
|-------|-------|
| **Capability ID** | `cap-ext-002` |
| **Category** | Extensibility |
| **Status** | GA |
| **Availability** | Pro / Enterprise |
| **Related Capabilities** | `cap-ext-001` |

---

## Quick Reference

### Name
Subgraph Check Extensions

### Tagline
Custom validation logic for schema changes on your terms.

### Elevator Pitch
Subgraph Check Extensions let you hook into Cosmo's schema check pipeline with your own validation logic. When developers propose schema changes, your custom endpoint receives detailed information about the change and can return additional lint issues or errors that block deployment. Enforce company standards, integrate with external systems, and ensure every schema change meets your requirements before it reaches production.

---

## Problem & Solution

### The Problem
Organizations have unique policies and standards for their GraphQL schemas that go beyond generic linting rules. They may need to enforce naming conventions, validate against external systems, coordinate between teams when breaking changes occur, or integrate schema validation with internal compliance tools. Built-in validation tools, while powerful, cannot anticipate every organization's specific requirements.

### The Solution
Cosmo's Subgraph Check Extensions send a webhook to your custom endpoint whenever a schema check runs. Your service receives comprehensive information about the proposed changes - including the schema SDL, detected lint issues, schema changes, and affected operations. You can return custom lint issues that appear in the check results, or return errors that cause the check to fail. This enables unlimited customization of the validation pipeline while keeping your logic on your own infrastructure.

### Before & After

| Before Cosmo | With Cosmo |
|--------------|------------|
| Generic linting rules that miss company-specific requirements | Custom validation enforcing exact organizational standards |
| No integration with internal compliance systems | Webhook-based integration with any external system |
| Breaking changes deployed without team coordination | Automated notifications to affected teams before deployment |
| Schema standards enforced through manual review | Automated enforcement with clear feedback in CI/CD |

---

## Key Benefits

1. **Unlimited Custom Validation**: Write any validation logic in any language - check naming conventions, enforce deprecation policies, validate against external systems, or implement custom business rules.
2. **Seamless CI/CD Integration**: Extensions run automatically during schema checks, blocking non-compliant changes before they can be merged or deployed.
3. **Full Context Available**: Receive the complete picture - schema SDL (before and after), lint issues, schema changes, affected operations, VCS context, and more.
4. **Secure Communication**: HMAC signatures verify that requests originate from Cosmo and haven't been tampered with, ensuring your endpoint processes only legitimate requests.
5. **Flexible Response Options**: Return custom lint issues that appear alongside built-in checks, or return errors that explicitly fail the check - you control the severity.

---

## Target Audience

### Primary Persona
- **Role**: Platform Engineer / API Governance Lead
- **Pain Points**: Cannot enforce organization-specific schema standards automatically; need to integrate schema validation with internal tools; manual review process doesn't scale.
- **Goals**: Automate enforcement of API standards; integrate with internal compliance and notification systems; reduce manual review burden while maintaining quality.

### Secondary Personas
- Security Engineers validating schema changes against security policies
- Architecture Teams ensuring schemas follow design patterns
- DevOps Engineers integrating schema checks with CI/CD pipelines

---

## Use Cases

### Use Case 1: Custom Naming Convention Enforcement
**Scenario**: A company requires all GraphQL types and fields to follow specific naming conventions (e.g., camelCase for fields, PascalCase for types, specific prefixes for certain domains).
**How it works**: Configure the extension to receive schema SDL. Your service parses the schema, validates naming patterns, and returns `LintIssue` objects with `lintRuleType`, `severity`, `message`, and `issueLocation` for any violations.
**Outcome**: Developers receive immediate, precise feedback on naming violations directly in their check results, with exact line and column numbers for each issue.

### Use Case 2: Breaking Change Notifications
**Scenario**: When a backend team introduces a breaking change, the frontend team needs to be notified so they can prepare for the update.
**How it works**: Enable "Include Schema Changes" in the configuration. Your service analyzes the schema changes for breaking modifications, and when detected, sends notifications to the affected teams via Slack, email, or internal systems.
**Outcome**: Cross-team coordination happens automatically, reducing surprise breaking changes and enabling smoother deployments.

### Use Case 3: External Compliance Validation
**Scenario**: All API changes must be validated against an internal compliance system before deployment to production environments.
**How it works**: Your extension endpoint forwards the schema information to the compliance system, awaits validation results, and translates any compliance failures into check errors that block deployment.
**Outcome**: Compliance validation is seamlessly integrated into the development workflow, catching issues before they reach production.

### Use Case 4: Deprecation Policy Enforcement
**Scenario**: The organization requires that deprecated fields remain available for a minimum period and that deprecation reasons follow a specific format including sunset dates.
**How it works**: Parse the schema SDL to find `@deprecated` directives, validate that deprecation reasons contain required information, and check against historical data to ensure minimum deprecation periods.
**Outcome**: Consistent deprecation practices across all subgraphs, with clear communication to API consumers about upcoming changes.

---

## Technical Summary

### How It Works
When a subgraph check runs in a namespace with extensions enabled, Cosmo sends a POST request to your configured endpoint. The JSON payload contains detailed information about the check, including organization context, namespace, VCS information (when applicable), affected graphs, and subgraph details. A downloadable URL provides bulk data including SDL versions and lint issues. Your endpoint responds with 204 (no action needed) or 200 with optional lint issues and errors. HMAC signatures in the `X-Cosmo-Signature-256` header allow you to verify request authenticity.

### Key Technical Features
- Configurable data inclusion: SDL, lint issues, graph pruning issues, schema changes, affected operations
- Rich payload with organization, namespace, VCS context, and subgraph information
- Bulk data file accessible for 5 minutes containing detailed schema and lint information
- HMAC-SHA256 signature verification for secure webhook communication
- Flexible response: 204 for pass-through, 200 with custom lint issues and/or errors
- Lint issues include precise location (line, column) for highlighting in UI

### Integration Points
- Any HTTP endpoint capable of receiving webhooks
- VCS systems (GitHub, GitLab, etc.) through VCS context data
- Internal compliance and governance systems
- Team notification systems (Slack, Teams, email)
- Custom linting and validation frameworks

### Requirements & Prerequisites
- HTTP endpoint accessible from Cosmo's control plane
- Secret key for HMAC signature verification
- Namespace-level configuration in Cosmo Studio

---

## Documentation References

- Primary docs: `/docs/studio/subgraph-check-extensions`
- Request payload structure: `/docs/studio/sce/request-payload-structure`
- Response structure: `/docs/studio/sce/response-structure`
- Handler example: `/docs/studio/sce/handler-example`
- File content details: `/docs/studio/sce/file-content`

---

## Keywords & SEO

### Primary Keywords
- Schema validation webhook
- Custom schema checks
- GraphQL linting extension

### Secondary Keywords
- Subgraph validation
- Schema governance
- API compliance automation

### Related Search Terms
- Custom GraphQL schema validation
- Schema check webhook integration
- Automated API governance
- GraphQL CI/CD validation

---

## Version History

| Date | Version | Changes |
|------|---------|---------|
| 2025-01-14 | 1.0 | Initial capability documentation |
