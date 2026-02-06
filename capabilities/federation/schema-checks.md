# Schema Checks

Pre-deployment validation including composition errors, breaking changes, operation checks, and lint rules to ensure safe schema evolution.

---

## Metadata

| Field | Value |
|-------|-------|
| **Capability ID** | `cap-fed-003` |
| **Category** | Federation |
| **Status** | GA |
| **Availability** | Free / Pro / Enterprise |
| **Related Capabilities** | `cap-fed-002`, `cap-fed-004`, `cap-fed-007` |

---

## Quick Reference

### Name
Schema Checks

### Tagline
Validate schema changes before they reach production.

### Elevator Pitch
Schema Checks provide comprehensive pre-deployment validation for GraphQL schema changes. Before any modification reaches production, Cosmo validates composition compatibility, detects breaking changes, analyzes real client traffic to assess impact, and enforces lint rules. This multi-layered approach catches issues in CI/CD pipelines, enabling confident, safe schema evolution.

---

## Problem & Solution

### The Problem
Schema changes in federated GraphQL can have far-reaching consequences. A field removal might break mobile apps still using older queries. A type change could cause composition failures across multiple subgraphs. Traditional testing approaches miss these issues because they lack visibility into real client usage patterns and cross-subgraph dependencies.

### The Solution
Cosmo's Schema Checks run four types of validation before any schema change is published:

1. **Composition Errors**: Validates the schema can compose with all other subgraphs
2. **Breaking Change Detection**: Identifies changes that could break existing client operations
3. **Operation Checks**: Analyzes real client traffic to determine if breaking changes affect active operations
4. **Lint Checks**: Enforces schema design standards and best practices

### Before & After

| Before Cosmo | With Cosmo |
|--------------|------------|
| Breaking changes discovered in production | Breaking changes caught in CI/CD |
| No visibility into client impact | Real traffic analysis shows affected operations |
| Manual schema review for quality | Automated lint enforcement |
| Composition failures after deployment | Composition validated before publish |

---

## Key Benefits

1. **Four-Layer Validation**: Comprehensive checks covering composition, breaking changes, traffic impact, and lint rules
2. **Traffic-Aware Analysis**: Operation Checks use real client traffic data to determine actual impact of breaking changes
3. **CI/CD Integration**: Run checks automatically in pull request workflows with GitHub integration
4. **Override Capability**: Force necessary breaking changes with proper documentation when needed
5. **Historical Tracking**: Complete history of all checks performed with pass/fail status and details

---

## Target Audience

### Primary Persona
- **Role**: Backend Developer / API Developer
- **Pain Points**: Fear of breaking production clients; uncertainty about schema change impact; manual review processes slowing development
- **Goals**: Ship schema changes confidently with automated safety nets

### Secondary Personas
- Platform engineers building CI/CD pipelines
- QA engineers validating API changes
- Engineering managers tracking change risk

---

## Use Cases

### Use Case 1: Pull Request Validation
**Scenario**: A developer submits a PR that removes a deprecated field from a subgraph schema.
**How it works**: The CI pipeline runs `wgc subgraph check` with the proposed schema. Cosmo validates composition, detects the field removal as a breaking change, and checks 7 days of client traffic. If no active clients use the field, the check passes. If clients are affected, the PR shows exactly which operations would break.
**Outcome**: Developer knows the impact before merging; safe changes proceed automatically; risky changes require explicit review.

### Use Case 2: Safe Breaking Changes with Override
**Scenario**: A team needs to remove a field that some clients still use, but the change is necessary for a major refactor.
**How it works**: The schema check fails due to active client usage. The team uses the GitHub integration to manually override the check after coordinating with affected clients. The override is documented in the check history.
**Outcome**: Necessary breaking changes can proceed with proper governance and audit trail.

### Use Case 3: Schema Quality Enforcement
**Scenario**: An organization wants to enforce naming conventions and description requirements across all subgraphs.
**How it works**: Lint rules are configured in the namespace policies. Every schema check validates against these rules, flagging fields without descriptions, inconsistent naming, or other policy violations.
**Outcome**: Consistent, high-quality schema design across all teams and subgraphs.

---

## Competitive Positioning

### Key Differentiators
1. Real traffic analysis with Operation Checks (not just static analysis)
2. Native GitHub integration for PR-based workflows
3. Configurable check timeframes and policies
4. Combined composition, breaking change, traffic, and lint checks in one flow

### Comparison with Alternatives

| Aspect | Cosmo | Apollo Studio | DIY Solution |
|--------|-------|---------------|--------------|
| Composition validation | Yes | Yes | Partial |
| Breaking change detection | Yes | Yes | Manual |
| Traffic-based checks | Yes | Yes | No |
| Lint enforcement | Yes | Limited | Custom |
| GitHub integration | Native | Yes | Custom |
| Self-hosted | Yes | No | Yes |

---

## Technical Summary

### How It Works
The `wgc subgraph check` command sends the proposed schema to the control plane for validation. The check process:

1. Attempts composition with all other subgraphs in matching federated graphs
2. Compares the resulting schema against the current production schema for breaking changes
3. If breaking changes exist, queries the analytics database for client operations using affected fields (default: 7-day window)
4. Validates the schema against configured lint rules
5. Returns pass/fail status with detailed results for each check type

### Key Technical Features
- VCS context integration (author, commit, branch) for traceability
- Configurable traffic analysis windows via namespace policies
- Support for checking new subgraphs that don't exist yet
- Deletion impact analysis with `--delete` flag
- Warning suppression for known issues

### Integration Points
- CLI (`wgc subgraph check`) for running checks
- GitHub integration for PR workflows
- Studio for viewing check history and details
- Analytics pipeline for operation traffic data

### Requirements & Prerequisites
- Subgraph registered in namespace (or labels provided for new subgraphs)
- Router sending traffic to Cosmo Cloud for Operation Checks
- CLI authenticated with check permissions

---

## Documentation References

- Primary docs: `/docs/studio/schema-checks`
- CLI reference: `/docs/cli/subgraph/check`
- GitHub integration: `/docs/tutorial/pr-based-workflow-for-federation`
- Namespace policies: `/docs/studio/policies`

---

## Keywords & SEO

### Primary Keywords
- Schema checks
- GraphQL breaking changes
- Schema validation

### Secondary Keywords
- Operation checks
- GraphQL CI/CD
- Schema lint

### Related Search Terms
- GraphQL breaking change detection
- Federation schema validation
- GraphQL PR checks

---

## Version History

| Date | Version | Changes |
|------|---------|---------|
| 2025-01-14 | 1.0 | Initial capability documentation |
