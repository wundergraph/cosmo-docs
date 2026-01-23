# Lint Policies

Customizable schema linting rules to enforce conventions and best practices.

---

## Metadata

| Field | Value |
|-------|-------|
| **Capability ID** | `cap-dx-007` |
| **Category** | Developer Experience |
| **Status** | GA |
| **Availability** | Free / Pro / Enterprise |
| **Related Capabilities** | `cap-dx-008`, `cap-dx-009` |

---

## Quick Reference

### Name
Lint Policies

### Tagline
Enforce GraphQL schema conventions automatically.

### Elevator Pitch
Cosmo's Lint Policies enable teams to enforce GraphQL schema conventions and best practices automatically. Configure rules for naming conventions, field ordering, documentation requirements, and deprecation handling. Lint checks run on every schema check operation, catching issues before they reach production and ensuring consistency across your entire federated graph.

---

## Problem & Solution

### The Problem
GraphQL schemas across large teams become inconsistent over time. Naming conventions vary, types lack documentation, fields are deprecated without reasons, and the codebase becomes harder to maintain. Manual code review catches some issues but is inconsistent and time-consuming.

### The Solution
Lint Policies provide configurable rules that run automatically on every schema check. Teams define their conventions once, set severity levels (error or warning), and the linter enforces them consistently. Violations are caught early in the development process, before schemas are published.

### Before & After

| Before Cosmo | With Cosmo |
|--------------|------------|
| Inconsistent naming across subgraphs | Enforced naming conventions |
| Manual code review for style issues | Automated linting on every check |
| Missing documentation discovered late | Required descriptions caught early |
| Deprecated fields without context | Required deprecation reasons and dates |

---

## Key Benefits

1. **Consistent Naming**: Enforce camelCase fields, PascalCase types, UPPER_CASE enums automatically
2. **Documentation Requirements**: Ensure all types have descriptions before publishing
3. **Deprecation Standards**: Require reasons and dates for deprecated fields
4. **Configurable Severity**: Set rules as errors (block publish) or warnings (inform only)
5. **Namespace-Level Control**: Different policies for different environments

---

## Target Audience

### Primary Persona
- **Role**: Platform Engineer / API Architect
- **Pain Points**: Inconsistent schema styles; undocumented types; deprecated fields without context
- **Goals**: Enforce team conventions; maintain schema quality; reduce review burden

### Secondary Personas
- Tech leads ensuring code quality
- Developer experience teams establishing standards
- New team members learning conventions

---

## Use Cases

### Use Case 1: Establishing Team Standards
**Scenario**: A platform team wants to ensure all new schema types follow the team's naming conventions
**How it works**: The team enables lint policies with rules like `TYPE_NAMES_SHOULD_BE_PASCAL_CASE` and `FIELD_NAMES_SHOULD_BE_CAMEL_CASE` set to error severity. Any schema check with violations fails with clear error messages.
**Outcome**: All new schema additions follow conventions; no manual review needed for style issues

### Use Case 2: Requiring Documentation
**Scenario**: An organization's API governance requires all types to have descriptions for consumer clarity
**How it works**: The team enables `ALL_TYPES_REQUIRE_DESCRIPTION` as an error. Schema checks fail if any type (object, interface, enum, scalar, input, union) lacks a description comment.
**Outcome**: All published types have documentation; API consumers can understand the schema

### Use Case 3: Controlled Deprecation
**Scenario**: The team wants to ensure deprecated fields include context for consumers and a planned removal date
**How it works**: Rules `REQUIRE_DEPRECATION_REASON` and `REQUIRE_DEPRECATION_DATE` are enabled. Any `@deprecated` directive must include both a reason and date argument.
**Outcome**: Consumers know why fields are deprecated and when they'll be removed

---

## Technical Summary

### How It Works
Lint policies are configured per namespace in Cosmo Studio. When the linter is enabled, rules are evaluated during every `wgc subgraph check` operation. The linter parses the schema and evaluates it against the configured rules, reporting violations with their configured severity.

### Available Rule Categories

**Naming Convention Rules:**
- `FIELD_NAMES_SHOULD_BE_CAMEL_CASE`
- `TYPE_NAMES_SHOULD_BE_PASCAL_CASE`
- `SHOULD_NOT_HAVE_TYPE_PREFIX/SUFFIX`
- `SHOULD_NOT_HAVE_INPUT_PREFIX`
- `SHOULD_HAVE_INPUT_SUFFIX`
- `SHOULD_NOT_HAVE_ENUM_PREFIX/SUFFIX`
- `SHOULD_NOT_HAVE_INTERFACE_PREFIX/SUFFIX`
- `ENUM_VALUES_SHOULD_BE_UPPER_CASE`

**Alphabetical Sort Rules:**
- `ORDER_FIELDS`
- `ORDER_ENUM_VALUES`
- `ORDER_DEFINITIONS`

**Other Rules:**
- `ALL_TYPES_REQUIRE_DESCRIPTION`
- `DISALLOW_CASE_INSENSITIVE_ENUM_VALUES`
- `NO_TYPENAME_PREFIX_IN_TYPE_FIELDS`
- `REQUIRE_DEPRECATION_REASON`
- `REQUIRE_DEPRECATION_DATE`

### Severity Levels
- **Error**: Violations cause the check operation to fail
- **Warning**: Violations are flagged but don't fail the check

### Integration Points
- Cosmo Studio (configuration UI)
- CLI `wgc subgraph check` command
- CI/CD pipelines

### Requirements & Prerequisites
- Cosmo account
- Namespace configured in Cosmo

---

## Documentation References

- Primary docs: `/docs/studio/policies`
- Linter rules reference: `/docs/studio/lint-policy/linter-rules`
- Schema checks: `/docs/cli/subgraph/check`

---

## Keywords & SEO

### Primary Keywords
- GraphQL schema linting
- Schema conventions
- API style guide

### Secondary Keywords
- Naming conventions enforcement
- Schema documentation requirements
- Deprecation policies

### Related Search Terms
- GraphQL linter rules
- Enforce schema naming conventions
- GraphQL style guide automation

---

## Version History

| Date | Version | Changes |
|------|---------|---------|
| 2025-01-14 | 1.0 | Initial capability documentation |
