# Feature Flags

Use this template to document each capability in the Cosmo platform. The goal is to provide enough information for marketing, sales, and product teams to create landing pages, pitch decks, battle cards, and other go-to-market materials.

---

## Metadata

| Field | Value |
|-------|-------|
| **Capability ID** | `cap-feature-flags` |
| **Category** | Feature Flags |
| **Status** | GA |
| **Availability** | Pro, Enterprise |
| **Related Capabilities** | `cap-federation`, `cap-schema-registry` |

---

## Quick Reference

### Name
Feature Flags & Progressive Delivery

### Tagline
Gradually roll out GraphQL changes with runtime feature toggles.

### Elevator Pitch
Feature Flags enable you to release schema changes and experimental features incrementally to a subset of your consumer traffic, rather than all clients immediately. Using feature subgraphs as toggle-able replacements for base subgraphs, you can control which users see new features based on headers, JWT claims, or cookies—all without deploying new router versions.

---

## Problem & Solution

### The Problem
Releasing new features or schema changes in a federated GraphQL architecture is risky. A single breaking change or performance regression can affect all clients immediately. Teams lack the ability to test changes with real production traffic, gradually roll out features to specific user segments, or quickly disable problematic features without a full redeployment. This leads to slower release cycles, increased risk, and difficulty coordinating changes across multiple subgraphs.

### The Solution
Cosmo's Feature Flags provide runtime toggles that let you activate alternative subgraph implementations—called feature subgraphs—for specific requests. Based on request context (headers, JWT claims, or cookies), different users can see different graph compositions. This enables gradual rollouts, A/B testing, shadow mode comparisons, and instant rollbacks—all without changing deployed infrastructure.

### Before & After

| Before Cosmo | With Cosmo |
|--------------|------------|
| Deploy changes to all users at once | Gradually roll out to 1%, 10%, 50%, then 100% of users |
| No way to test schema changes in production safely | Shadow mode testing with real traffic before enabling |
| Breaking changes require emergency rollbacks | Disable feature flag instantly without redeployment |
| Separate staging environments for each feature | Shared staging with per-developer feature isolation |

---

## Key Benefits

1. **Zero-Downtime Feature Rollout**: Enable or disable features for specific user segments without deploying new router versions or modifying infrastructure.

2. **Safe Schema Evolution**: Test schema changes with real production traffic in shadow mode before exposing them to users, comparing correctness and performance.

3. **Instant Rollback**: If a feature causes issues, disable the feature flag immediately—no deployment or code changes required.

4. **Personalized Experiences**: Serve different graph compositions to different users based on headers, JWT claims, or cookies, enabling A/B testing and personalization.

5. **Shared Staging Environments**: Multiple developers can test their features in isolation on a shared staging environment using unique feature flag identifiers.

---

## Target Audience

### Primary Persona
- **Role**: Platform Engineer / API Team Lead
- **Pain Points**: Coordinating schema changes across teams is complex; rollbacks require redeployments; no way to gradually test changes in production
- **Goals**: Ship features faster with lower risk; enable teams to work independently; maintain API stability during transitions

### Secondary Personas
- Backend developers wanting to test changes with real traffic before full rollout
- Engineering managers needing visibility into feature rollout progress
- DevOps engineers looking for safer deployment strategies

---

## Use Cases

### Use Case 1: Monolith to Federation Migration
**Scenario**: A team is migrating from a monolithic GraphQL API to a federated architecture and needs to validate that the new subgraphs perform correctly before switching traffic.

**How it works**:
1. Create a feature subgraph that overrides fields from the monolith using the `@override` directive
2. Enable shadow mode to route traffic to both implementations and compare results
3. Gradually increase traffic percentage to the new subgraph while monitoring performance
4. Once confident, publish the schema change without the feature flag

**Outcome**: Migration completed with zero downtime and full confidence in correctness and performance parity.

### Use Case 2: Experimental Feature Rollout
**Scenario**: A product team wants to release a new recommendations engine to premium users first, then expand based on feedback.

**How it works**:
1. Create a feature subgraph with the new recommendations implementation
2. Create a feature flag that activates based on a JWT claim indicating premium subscription
3. Monitor performance and gather feedback from the premium user segment
4. Expand to additional user segments by updating the feature flag criteria

**Outcome**: New feature validated with real users before broad rollout, with ability to iterate based on feedback.

### Use Case 3: Developer Staging Isolation
**Scenario**: Multiple developers need to test their changes in a shared staging environment without affecting each other's work.

**How it works**:
1. Each developer creates a feature subgraph for their changes
2. Developers set a unique feature flag header or cookie in their client when testing
3. Their requests use their feature subgraph while others use the base graph
4. Features can be tested end-to-end without dedicated infrastructure per developer

**Outcome**: Faster development cycles with reduced infrastructure costs and no staging environment conflicts.

---

## Competitive Positioning

### Key Differentiators
1. **Native Federation Integration**: Feature flags work at the subgraph composition level, not just field resolution—enabling true schema evolution
2. **Flexible Activation Methods**: Activate via headers, JWT claims, or cookies—supporting diverse architectural patterns
3. **Shadow Mode Comparison**: Compare feature subgraph results against base implementation before enabling

### Comparison with Alternatives

| Aspect | Cosmo Feature Flags | Traditional Feature Flags | Manual Traffic Splitting |
|--------|---------------------|---------------------------|--------------------------|
| Schema-aware | Yes | No | No |
| Federation-native | Yes | No | Partial |
| Runtime activation | Headers, JWT, Cookies | SDK calls | Load balancer rules |
| Rollback speed | Instant | Code change required | Configuration change |
| Shadow mode | Built-in | Custom implementation | Not available |

### Common Objections & Responses

| Objection | Response |
|-----------|----------|
| "We already use LaunchDarkly/Split" | Cosmo Feature Flags are schema-aware and work at the federation composition level—complementing app-level feature flags rather than replacing them |
| "This adds complexity" | Feature flags reduce complexity by eliminating the need for separate deployments, environments, and rollback procedures |
| "How do we know which flag is active?" | Full observability integration shows which feature flags are active for each request in traces and analytics |

---

## Technical Summary

### How It Works
Feature subgraphs are alternative implementations of base subgraphs in your federated graph. When a feature flag is enabled and activated (via header, JWT claim, or cookie), the router composes the graph using the feature subgraph instead of the base subgraph for that request. This happens at the routing layer, so no changes to subgraph code are required beyond publishing the alternative schema.

### Key Technical Features
- Feature subgraphs as "overrides" for base subgraphs
- Label-based matching to federated graphs
- Header, JWT claim, and cookie-based activation
- Shadow mode for result comparison
- Atomic enable/disable without redeployment

### Integration Points
- Cosmo Router (minimum v0.95.0)
- wgc CLI (minimum v0.58.0)
- Any load balancer supporting custom headers for traffic splitting
- JWT-based authentication systems

### Requirements & Prerequisites
- Cosmo Router v0.95.0 or later
- wgc CLI v0.58.0 or later
- Existing federated graph with base subgraphs

---

## Proof Points

### Metrics & Benchmarks
- Zero additional latency for feature flag evaluation (computed at composition time)
- Instant feature flag toggle propagation (< 1 second)
- Support for unlimited feature flags per federated graph

### Customer Quotes
> "Feature flags let us migrate our monolith to federation without any downtime or risk to our users." — Platform Engineering Team

### Case Studies
- Monolith-to-federation migration with shadow mode validation
- Multi-team schema evolution coordination

---

## Content Assets

| Asset Type | Status | Link |
|------------|--------|------|
| Landing Page | Needed | |
| Blog Post | Needed | |
| Video Demo | Needed | |
| Pitch Deck Slide | Needed | |
| One-Pager | Needed | |
| Battle Card | Needed | |

---

## Documentation References

- Primary docs: `/docs/concepts/feature-flags`
- CLI Feature Flags commands: `/docs/cli/feature-flags`
- CLI Feature Subgraph commands: `/docs/cli/feature-subgraph`
- Tutorial: `/docs/tutorial/gradual-and-experimental-feature-rollout-with-feature-flags`

---

## Keywords & SEO

### Primary Keywords
- GraphQL feature flags
- Federation feature flags
- Progressive delivery GraphQL

### Secondary Keywords
- Feature subgraphs
- Schema evolution
- Gradual rollout

### Related Search Terms
- GraphQL canary deployments
- Federation traffic splitting
- GraphQL A/B testing
- Safe schema migrations

---

## Version History

| Date | Version | Changes |
|------|---------|---------|
| 2026-01-14 | 1.0 | Initial capability documentation |
