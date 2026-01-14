# Shared Playground State

Shareable playground sessions for team collaboration and reproducible debugging.

---

## Metadata

| Field | Value |
|-------|-------|
| **Capability ID** | `cap-dx-003` |
| **Category** | Developer Experience |
| **Status** | GA |
| **Availability** | Free / Pro / Enterprise |
| **Related Capabilities** | `cap-dx-001`, `cap-dx-002` |

---

## Quick Reference

### Name
Shared Playground State

### Tagline
Share complete GraphQL sessions with a single URL.

### Elevator Pitch
Cosmo's Shared Playground State lets you share complete GraphQL playground sessions - including queries, variables, and headers - with teammates using a single URL. No more copying and pasting queries in Slack or explaining how to reproduce an issue. Share the exact context and collaborate instantly.

---

## Problem & Solution

### The Problem
Sharing GraphQL queries for collaboration or debugging is tedious. Developers copy queries into chat, forget to include variables, lose header configurations, and spend time re-explaining context. Bug reports lack reproducibility, and onboarding new developers means walking them through query setup manually.

### The Solution
Shared Playground State generates a URL that encodes the complete playground session. Recipients open the link and see the exact query, variables, and headers the sender configured. The session opens in a new tab, ready to execute, with full context preserved.

### Before & After

| Before Cosmo | With Cosmo |
|--------------|------------|
| Copy/paste queries across chat tools | Share a single URL |
| Variables and headers often missing | Complete context included |
| Bug reports lack reproducibility | Exact reproduction every time |
| Manual onboarding for query examples | Link directly to example queries |

---

## Key Benefits

1. **One-Click Sharing**: Generate a shareable URL with a single click from the playground toolbar
2. **Complete Context**: Include operations, variables, and headers in the shared link
3. **Instant Reproduction**: Recipients see the exact session state without manual setup
4. **Team Collaboration**: Speed up debugging, code reviews, and knowledge sharing
5. **Documentation Integration**: Link to example queries in internal documentation or wikis

---

## Target Audience

### Primary Persona
- **Role**: GraphQL Developer / Support Engineer
- **Pain Points**: Explaining query context repeatedly; bug reports that can't be reproduced; slow onboarding
- **Goals**: Collaborate efficiently; share reproducible examples; accelerate debugging

### Secondary Personas
- Technical writers creating API documentation
- Developer advocates sharing examples
- Engineering managers reviewing query patterns

---

## Use Cases

### Use Case 1: Bug Reproduction
**Scenario**: A developer discovers a query returning unexpected results and needs to share the exact scenario with a teammate
**How it works**: The developer clicks the Share icon in the playground toolbar, selects which elements to include (operation, variables, headers), and copies the generated link. The teammate opens the link and sees the exact query ready to run.
**Outcome**: Bug is reproduced instantly; debugging time reduced significantly

### Use Case 2: Developer Onboarding
**Scenario**: A new team member needs to learn how to query the product catalog with proper authentication headers
**How it works**: A senior developer creates a reference query with correct headers and variables, generates a share link, and adds it to the team's internal documentation
**Outcome**: New developers have working examples they can execute immediately, reducing ramp-up time

### Use Case 3: Support Collaboration
**Scenario**: A customer reports an API issue and the support team needs to hand off to engineering with full context
**How it works**: Support recreates the customer's query in the playground, generates a share link with all relevant context, and includes it in the engineering ticket
**Outcome**: Engineers can reproduce the issue immediately without back-and-forth questions

---

## Technical Summary

### How It Works
When sharing a playground session, the selected state (operation, variables, headers) is compressed and encoded into the URL. The URL can be shared with anyone who has access to the same Cosmo Studio organization. When opened, the playground restores the encoded state into a new tab.

### Key Technical Features
- Selective sharing: choose which elements to include
- GraphQL operations always included (required)
- Variables and headers optional
- Compressed URL encoding
- New tab restoration

### What's Not Included
- Pre-flight scripts
- Pre-operation scripts
- Post-operation scripts

### Security Considerations
- Headers are encoded but accessible to anyone with the link
- Avoid including sensitive credentials in shared headers

### Integration Points
- Cosmo Studio Playground
- Any URL-sharing mechanism (Slack, email, documentation)

### Requirements & Prerequisites
- Cosmo Studio account
- Recipients need access to the same organization/graph

---

## Documentation References

- Primary docs: `/docs/studio/playground/shared-playground-state`
- Playground overview: `/docs/studio/playground`

---

## Keywords & SEO

### Primary Keywords
- Share GraphQL queries
- Playground collaboration
- GraphQL session sharing

### Secondary Keywords
- Reproducible bug reports
- Team collaboration GraphQL
- GraphQL onboarding

### Related Search Terms
- How to share GraphQL playground state
- Collaborate on GraphQL queries
- Share GraphQL request context

---

## Version History

| Date | Version | Changes |
|------|---------|---------|
| 2025-01-14 | 1.0 | Initial capability documentation |
