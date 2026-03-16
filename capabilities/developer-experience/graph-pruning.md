# Graph Pruning

Detect unused fields and enforce deprecation policies to maintain a clean schema.

---

## Metadata

| Field | Value |
|-------|-------|
| **Capability ID** | `cap-dx-008` |
| **Category** | Developer Experience |
| **Status** | GA |
| **Availability** | Pro / Enterprise |
| **Related Capabilities** | `cap-dx-004`, `cap-dx-007` |

---

## Quick Reference

### Name
Graph Pruning

### Tagline
Keep your schema clean with usage-based analysis.

### Elevator Pitch
Graph Pruning analyzes real traffic to identify unused fields, track deprecated fields still in use, and enforce deprecation-before-deletion policies. Stop accumulating dead code in your schema and make informed decisions about field removal based on actual usage data. Maintain a lean, efficient API that's easier to understand and maintain.

---

## Problem & Solution

### The Problem
GraphQL schemas accumulate unused fields over time. Teams add fields speculatively, features get removed but fields remain, and deprecated fields linger indefinitely. Without usage data, teams can't safely remove fields, and schemas become bloated and confusing.

### The Solution
Graph Pruning combines schema analysis with real traffic data to identify unused and deprecated fields. Configurable rules flag issues during schema checks, with grace periods to avoid false positives. Teams can enforce policies requiring deprecation before deletion, ensuring consumers have time to migrate.

### Before & After

| Before Cosmo | With Cosmo |
|--------------|------------|
| Unknown which fields are actually used | Usage-based identification of unused fields |
| Deprecated fields never removed | Tracking of deprecated field usage |
| Fields deleted without warning | Required deprecation before deletion |
| Schema bloat over time | Continuous pruning enforcement |

---

## Key Benefits

1. **Usage-Based Analysis**: Identify truly unused fields based on real traffic, not guesswork
2. **Deprecated Field Tracking**: See which deprecated fields are still in use and by how much
3. **Deletion Safeguards**: Require deprecation before deletion to protect consumers
4. **Configurable Grace Periods**: Avoid false positives for new fields with time-based thresholds
5. **Actionable Enforcement**: Integrate with schema checks to block or warn on violations

---

## Target Audience

### Primary Persona
- **Role**: Platform Engineer / API Architect
- **Pain Points**: Schema bloat; fear of breaking changes; inability to remove unused fields safely
- **Goals**: Maintain a clean schema; remove dead code safely; enforce deprecation policies

### Secondary Personas
- Engineering managers concerned about technical debt
- Developer experience teams improving API usability
- Developers wanting clear, focused schemas

---

## Use Cases

### Use Case 1: Identifying Dead Code
**Scenario**: A schema has grown to hundreds of fields over several years, and the team suspects many are unused
**How it works**: Graph Pruning is enabled with the `UNUSED_FIELDS` rule. During schema checks, any fields with zero usage in the configured period are flagged.
**Outcome**: Team identifies 47 unused fields, prioritizes removal, and reduces schema size by 15%

### Use Case 2: Safe Deprecation Workflow
**Scenario**: A team wants to enforce that fields must be deprecated for at least 30 days before deletion
**How it works**: The `REQUIRE_DEPRECATION_BEFORE_DELETION` rule is enabled. If a schema check attempts to remove a field that wasn't previously marked as deprecated, the check fails.
**Outcome**: Consumers always have advance warning of field removals; no surprise breaking changes

### Use Case 3: Deprecated Field Cleanup
**Scenario**: Fields have been deprecated for months, but the team doesn't know if they're safe to remove
**How it works**: The `DEPRECATED_FIELDS` rule flags deprecated fields along with their current usage. Fields with zero usage are identified as safe to remove.
**Outcome**: Team removes 12 deprecated fields with zero usage, cleaning up the schema

---

## Technical Summary

### How It Works
Graph Pruning rules run during schema check operations. The linter analyzes the schema and queries the analytics pipeline for field usage data. Rules compare the schema state (new, deprecated, deleted) against usage patterns within configured time windows.

### Available Rules

1. **UNUSED_FIELDS**: Identifies fields with no usage within the check period
2. **DEPRECATED_FIELDS**: Flags deprecated fields that still appear in the schema
3. **REQUIRE_DEPRECATION_BEFORE_DELETION**: Fails checks when fields are deleted without prior deprecation

### Configuration Options

**Severity Level:**
- Error: Violations fail the check operation
- Warning: Violations are flagged but don't fail

**Grace Period:** Time after schema publication before rules are enforced (prevents false positives for new fields)

**Schema Usage Check Period:** Time window for usage analysis (Enterprise: configurable; other plans: based on billing plan limits)

### Integration Points
- Cosmo Studio (configuration UI)
- CLI `wgc subgraph check` command
- Analytics pipeline (usage data)

### Requirements & Prerequisites
- Cosmo Pro or Enterprise plan
- Analytics data collection enabled
- Namespace configured with Graph Pruning

---

## Documentation References

- Primary docs: `/docs/studio/graph-pruning`
- Schema checks: `/docs/cli/subgraph/check`
- Schema explorer (usage view): `/docs/studio/schema-explorer`

---

## Keywords & SEO

### Primary Keywords
- GraphQL unused fields
- Schema cleanup
- Deprecation enforcement

### Secondary Keywords
- Field usage analysis
- Schema pruning
- Dead code removal

### Related Search Terms
- Find unused GraphQL fields
- Safe field deprecation GraphQL
- GraphQL schema cleanup

---

## Version History

| Date | Version | Changes |
|------|---------|---------|
| 2025-01-14 | 1.0 | Initial capability documentation |
