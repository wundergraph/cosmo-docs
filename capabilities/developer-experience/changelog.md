# Changelog

Track all graph modifications with detailed attribution and chronological history.

---

## Metadata

| Field | Value |
|-------|-------|
| **Capability ID** | `cap-dx-005` |
| **Category** | Developer Experience |
| **Status** | GA |
| **Availability** | Free / Pro / Enterprise |
| **Related Capabilities** | `cap-dx-004`, `cap-dx-009` |

---

## Quick Reference

### Name
Changelog

### Tagline
Complete history of every schema change.

### Elevator Pitch
Cosmo's Changelog provides a detailed, chronological history of all schema changes to your federated graph. See exactly what types, fields, and directives were added or removed, when changes occurred, and track the evolution of your API over time. Color-coded additions and deletions make it easy to understand the impact of each change at a glance.

---

## Problem & Solution

### The Problem
Tracking schema evolution across a federated graph is difficult. Teams lack visibility into what changed, when it changed, and who made the change. Debugging issues requires piecing together information from multiple sources, and understanding the impact of historical changes means digging through git history across multiple repositories.

### The Solution
The Changelog automatically captures and displays every schema modification in chronological order. Additions appear in green, deletions in red, providing instant visual understanding. Each entry shows the specific elements affected - types, fields, directives - and when the change was made.

### Before & After

| Before Cosmo | With Cosmo |
|--------------|------------|
| Git archaeology across multiple repos | Single chronological view of all changes |
| No federated-level change visibility | See changes to the composed schema |
| Manual change tracking | Automatic capture of all modifications |
| Text-based diff hunting | Color-coded additions and deletions |

---

## Key Benefits

1. **Chronological History**: All changes ordered by time, most recent first
2. **Visual Clarity**: Green for additions, red for deletions - instant understanding
3. **Complete Coverage**: Types, fields, directives, and all schema elements tracked
4. **Impact Assessment**: Understand exactly what each change affected
5. **Automatic Capture**: No manual tracking required; changes recorded automatically

---

## Target Audience

### Primary Persona
- **Role**: Platform Engineer / Tech Lead
- **Pain Points**: Understanding schema evolution; debugging issues caused by schema changes; lack of change visibility
- **Goals**: Track schema changes; understand when breaking changes occurred; maintain schema governance

### Secondary Personas
- API developers debugging unexpected behavior
- Engineering managers reviewing API evolution
- Compliance teams auditing API changes

---

## Use Cases

### Use Case 1: Debugging Production Issues
**Scenario**: A production issue started occurring yesterday and the team suspects a recent schema change is the cause
**How it works**: The team opens the Changelog, filters to changes from the past two days, and identifies that a field type was changed from non-nullable to nullable
**Outcome**: Root cause identified quickly; team can revert or fix the change

### Use Case 2: API Evolution Review
**Scenario**: A tech lead needs to understand how the API has evolved over the past quarter for a planning meeting
**How it works**: The tech lead browses the Changelog, seeing all additions (new capabilities) and deletions (deprecated features removed) over the period
**Outcome**: Clear picture of API evolution supports informed planning decisions

### Use Case 3: Change Impact Analysis
**Scenario**: Before removing a deprecated field, the team wants to review all related changes that have been made
**How it works**: Using the Changelog, the team finds when the field was first deprecated, what related changes were made, and confirms the deprecation period has been sufficient
**Outcome**: Informed decision to proceed with removal, knowing the full history

---

## Technical Summary

### How It Works
The Changelog automatically captures schema changes when compositions occur. Each composition is compared against the previous version to identify additions and deletions. Changes are stored and presented in a chronological list, with detailed information about what elements were affected.

### Key Technical Features
- Automatic change detection on composition
- Color-coded diff visualization (green/red)
- Chronological ordering (newest first)
- Type, field, and directive level tracking
- Composition-level change grouping

### Change Categories Tracked
- Types (added/removed)
- Fields within types (added/removed)
- Directives (added/removed)
- Arguments (added/removed)

### Integration Points
- Cosmo Studio
- Composition pipeline

### Requirements & Prerequisites
- Federated graph deployed to Cosmo
- Compositions running through Cosmo

---

## Documentation References

- Primary docs: `/docs/studio/changelog`

---

## Keywords & SEO

### Primary Keywords
- Schema changelog
- API change history
- GraphQL version history

### Secondary Keywords
- Schema evolution tracking
- Change management
- API audit trail

### Related Search Terms
- Track GraphQL schema changes
- GraphQL change history
- Schema modification log

---

## Version History

| Date | Version | Changes |
|------|---------|---------|
| 2025-01-14 | 1.0 | Initial capability documentation |
