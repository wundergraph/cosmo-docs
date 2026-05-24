# Schema Field Usage

## Metadata

| Field | Value |
|-------|-------|
| **Capability ID** | `cap-schema-field-usage` |
| **Category** | Analytics |
| **Status** | GA |
| **Availability** | Pro / Enterprise |
| **Related Capabilities** | `cap-analytics-dashboard`, `cap-operations-tracking`, `cap-client-identification` |

---

## Quick Reference

### Name
Schema Field Usage

### Tagline
Track field popularity and detect unused schema fields.

### Elevator Pitch
Schema Field Usage enables teams to evolve their GraphQL schema with confidence by providing detailed insights into how every field is used. See which clients and operations use each field, track request counts, identify first and last usage timestamps, and understand which subgraphs contribute to field resolution. Make data-driven decisions about deprecation and removal.

---

## Problem & Solution

### The Problem
Evolving a GraphQL schema in production is risky. Teams don't know which fields are actively used, which clients depend on specific fields, or when it's safe to remove deprecated fields. Without usage data, schema changes become guesswork that can break client applications and damage user trust.

### The Solution
Cosmo's Schema Field Usage provides comprehensive visibility into field-level usage across your entire federated graph. For every field, see exactly which clients use it, which operations include it, and how many requests touch it. Date-based filtering shows usage trends, while first/last seen timestamps reveal field lifecycle patterns. This data empowers teams to safely evolve their schema.

### Before & After

| Before Cosmo | With Cosmo |
|--------------|------------|
| Guessing which fields are safe to deprecate | Data-driven deprecation decisions |
| No visibility into client-specific field usage | Per-client breakdown of field consumption |
| Unknown impact of schema changes | Clear understanding of which operations use each field |
| Manual tracking of field lifecycle | Automatic first seen / last seen timestamps |

---

## Key Benefits

1. **Safe Schema Evolution**: Know exactly which fields are used before making changes
2. **Client-Aware Decisions**: See which clients depend on specific fields for targeted communication
3. **Operation Visibility**: Understand which operations use each field for impact analysis
4. **Usage Tracking**: Monitor request counts to identify popular vs. neglected fields
5. **Lifecycle Insights**: First seen and last seen timestamps reveal field usage patterns over time

---

## Target Audience

### Primary Persona
- **Role**: API / Schema Designer
- **Pain Points**: Uncertainty about field usage; risk of breaking clients with schema changes
- **Goals**: Evolve schema safely; deprecate fields with confidence; maintain clean, efficient schema

### Secondary Personas
- Platform engineers managing federated graphs
- Engineering managers planning schema migrations
- Technical leads making deprecation decisions

---

## Use Cases

### Use Case 1: Safe Field Deprecation
**Scenario**: A team wants to deprecate an old field that has been replaced by a new implementation.
**How it works**: Navigate to Schema Field Usage and search for the target field. Review which clients and operations still use it. Check the last seen timestamp to understand recent activity. Contact client teams if necessary before deprecation.
**Outcome**: Team deprecates the field with full knowledge of impact and clear communication to affected stakeholders.

### Use Case 2: Unused Field Discovery
**Scenario**: A team wants to clean up their schema by removing fields that are no longer used.
**How it works**: Use Schema Field Usage with a date range covering the past 90 days. Identify fields with zero requests or fields where the last seen timestamp is very old. Cross-reference with client teams before removal.
**Outcome**: Team identifies and safely removes unused fields, reducing schema complexity and maintenance burden.

### Use Case 3: Client Migration Planning
**Scenario**: A field is being removed and the team needs to coordinate migration with client teams.
**How it works**: View Schema Field Usage for the affected field. Get a complete list of clients using the field along with their request counts. Identify the most impacted clients for prioritized outreach. Set a deprecation timeline based on client usage patterns.
**Outcome**: Team creates a targeted migration plan with clear communication to each affected client team, prioritized by impact.

---

## Technical Summary

### How It Works
Schema Field Usage aggregates field-level usage data from requests processed by the Cosmo Router. Each GraphQL request is analyzed to identify which fields are accessed. This data is correlated with client information (from headers) and operation details to build a comprehensive usage profile for every field in the schema. The data is accessible from both the schema explorer and schema check page.

### Key Technical Features
- Per-field usage breakdown by client and operation
- Request count tracking per client per field
- First seen and last seen timestamps
- Subgraph contribution visibility (which subgraphs serve each field)
- Date and time filtering for trend analysis
- Available for all GraphQL types

### Integration Points
- Cosmo Router (usage data collection)
- Schema Explorer (field usage access point)
- Schema Check page (usage context during checks)
- Client identification headers (client attribution)

### Requirements & Prerequisites
- Cosmo Router with telemetry enabled
- Client applications configured with identification headers
- Sufficient traffic history for meaningful usage data

---

## Documentation References

- Primary docs: `/docs/studio/analytics/schema-field-usage`
- Analytics overview: `/docs/studio/analytics`
- Client identification: `/docs/studio/analytics/client-identification`
- Schema checks: `/docs/studio/schema-checks`

---

## Keywords & SEO

### Primary Keywords
- GraphQL field usage analytics
- Schema field tracking
- API field usage monitoring

### Secondary Keywords
- GraphQL deprecation planning
- Schema evolution analytics
- Field usage per client

### Related Search Terms
- GraphQL unused field detection
- Schema field popularity tracking
- GraphQL client field usage
- Safe schema deprecation

---

## Version History

| Date | Version | Changes |
|------|---------|---------|
| 2025-01-14 | 1.0 | Initial capability documentation |
