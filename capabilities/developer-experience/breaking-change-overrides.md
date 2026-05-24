# Breaking Change Overrides

Manual override for approved breaking changes in schema checks.

---

## Metadata

| Field | Value |
|-------|-------|
| **Capability ID** | `cap-dx-009` |
| **Category** | Developer Experience |
| **Status** | GA |
| **Availability** | Free / Pro / Enterprise |
| **Related Capabilities** | `cap-dx-005`, `cap-dx-007` |

---

## Quick Reference

### Name
Breaking Change Overrides

### Tagline
Approve intentional breaking changes safely.

### Elevator Pitch
Breaking Change Overrides let teams approve specific breaking changes that have been intentionally reviewed and deemed safe. When a schema check fails due to breaking changes affecting known operations, teams can override the check for those specific operations. Future checks automatically pass for approved changes, enabling controlled schema evolution without blocking CI/CD pipelines.

---

## Problem & Solution

### The Problem
Schema checks are essential for catching breaking changes, but not all breaking changes are bad. Sometimes a type change is intentional and approved after consumer coordination. Without overrides, teams must either disable checks entirely (risky) or maintain workarounds that circumvent the safety system.

### The Solution
Breaking Change Overrides provide granular control over schema check outcomes. When a check fails due to breaking changes affecting specific operations, teams can mark those changes as safe for those operations. Future checks respect these overrides while continuing to catch new, unreviewed breaking changes.

### Before & After

| Before Cosmo | With Cosmo |
|--------------|------------|
| Approved breaking changes block CI/CD | Override approved changes per operation |
| All-or-nothing check enforcement | Granular operation-level control |
| Workarounds to bypass checks | Proper approval workflow |
| No visibility into approved exceptions | All overrides visible in one place |

---

## Key Benefits

1. **Granular Control**: Override specific operations, not entire checks
2. **Future-Proof Approvals**: Overrides apply to future checks automatically
3. **Ignore All Option**: One-click to ignore all current and future changes for an operation
4. **Central Visibility**: View all overrides across the namespace in one place
5. **Traceability**: Link from overrides to metrics and traces for usage verification

---

## Target Audience

### Primary Persona
- **Role**: Platform Engineer / Tech Lead
- **Pain Points**: Legitimate breaking changes blocking deployment; all-or-nothing check policies
- **Goals**: Enable safe schema evolution; maintain check integrity; approve changes properly

### Secondary Personas
- API architects managing schema governance
- DevOps engineers maintaining CI/CD pipelines
- Developers working on intentional type changes

---

## Use Cases

### Use Case 1: Coordinated Type Migration
**Scenario**: A field type is being changed from String to Int after coordinating with all consumers, but the schema check fails
**How it works**: The engineer views the failed check, sees the affected operations, and marks the changes as safe for those specific operations. The check can be re-run (or future checks pass automatically).
**Outcome**: Intentional migration proceeds; safety checks remain active for uncoordinated changes

### Use Case 2: Deprecation and Removal
**Scenario**: A deprecated field is being removed after the deprecation period, but one internal operation still uses it and will be updated separately
**How it works**: The team marks the breaking change as safe for the specific internal operation, allowing the removal to proceed while the operation is updated in a separate timeline
**Outcome**: Schema cleanup proceeds without blocking on internal tooling updates

### Use Case 3: Bulk Override for Known Operations
**Scenario**: A major refactoring affects multiple operations that have all been reviewed and approved
**How it works**: The team uses "Ignore All" to override all breaking changes for each affected operation, approving both current and future changes
**Outcome**: Large migration proceeds smoothly with documented approvals

---

## Technical Summary

### How It Works
When a schema check detects breaking changes, it associates each change with the operations it affects. The override UI allows marking specific operation/change combinations as safe. These overrides are stored per namespace and evaluated during future checks. The overrides dashboard provides a central view of all active overrides.

### Key Technical Features
- Per-operation override configuration
- "Ignore All" option for operation-level blanket override
- Overrides active across all graphs in a namespace
- Central override management dashboard
- Links to metrics and traces from override view
- Override timestamps and configuration details

### Important Notes
- Applying overrides does not change the outcome of the current check run
- Only future checks respect newly configured overrides
- Overrides should be used judiciously and with proper review

### Integration Points
- Cosmo Studio (check results page)
- Schema check pipeline
- Metrics and tracing system (for usage verification)

### Requirements & Prerequisites
- Cosmo account
- Schema checks enabled
- Namespace configured

---

## Documentation References

- Primary docs: `/docs/studio/overrides`
- Schema checks: `/docs/cli/subgraph/check`
- Changelog: `/docs/studio/changelog`

---

## Keywords & SEO

### Primary Keywords
- Breaking change override
- Schema check exceptions
- Approved breaking changes

### Secondary Keywords
- Schema governance
- Check bypass
- Change approval workflow

### Related Search Terms
- Override GraphQL breaking change check
- Approve breaking changes GraphQL
- Schema check exception handling

---

## Version History

| Date | Version | Changes |
|------|---------|---------|
| 2025-01-14 | 1.0 | Initial capability documentation |
