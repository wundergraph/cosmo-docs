# Capability Documentation Template

Use this template to document each capability in the Cosmo platform. The goal is to provide enough information for marketing, sales, and product teams to create landing pages, pitch decks, battle cards, and other go-to-market materials.

---

## Metadata

| Field | Value |
|-------|-------|
| **Capability ID** | `cap-xxx` (unique identifier) |
| **Category** | (e.g., Federation, Observability, Security, Developer Experience, Operations) |
| **Status** | GA / Beta / Coming Soon |
| **Availability** | Free / Pro / Enterprise |
| **Related Capabilities** | (list of related cap-xxx IDs) |

---

## Quick Reference

### Name
<!-- The official, marketable name of the capability -->

### Tagline
<!-- One sentence (max 10 words) that captures the essence. Used in feature matrices and quick overviews. -->

### Elevator Pitch
<!-- 2-3 sentences explaining the capability for someone unfamiliar with the product. Should be understandable by non-technical stakeholders. -->

---

## Problem & Solution

### The Problem
<!-- What pain point does this capability address? Be specific about who experiences this pain and in what context. Use customer language, not technical jargon. -->

### The Solution
<!-- How does Cosmo solve this problem? Focus on outcomes, not implementation details. -->

### Before & After
<!-- Optional: A concrete before/after scenario that illustrates the transformation -->

| Before Cosmo | With Cosmo |
|--------------|------------|
| | |

---

## Key Benefits

<!-- List 3-5 benefits. Each should be outcome-focused and quantifiable where possible. -->

1. **Benefit Name**: Brief description
2. **Benefit Name**: Brief description
3. **Benefit Name**: Brief description

---

## Target Audience

### Primary Persona
<!-- Who benefits most from this capability? -->
- **Role**: (e.g., Platform Engineer, API Developer, Engineering Manager)
- **Pain Points**: What specific challenges do they face?
- **Goals**: What are they trying to achieve?

### Secondary Personas
<!-- Other stakeholders who benefit -->

---

## Use Cases

### Use Case 1: [Name]
**Scenario**: Describe a real-world situation
**How it works**: Step-by-step of how the capability is used
**Outcome**: The result/benefit achieved

### Use Case 2: [Name]
**Scenario**:
**How it works**:
**Outcome**:

### Use Case 3: [Name]
**Scenario**:
**How it works**:
**Outcome**:

---

## Competitive Positioning

### Key Differentiators
<!-- What makes Cosmo's implementation unique or better? -->
1.
2.
3.

### Comparison with Alternatives
<!-- How does this compare to competitors or alternative approaches? -->

| Aspect | Cosmo | Alternative A | Alternative B |
|--------|-------|---------------|---------------|
| | | | |

### Common Objections & Responses
<!-- Sales enablement: anticipated pushback and how to address it -->

| Objection | Response |
|-----------|----------|
| | |

---

## Technical Summary

<!-- For technical buyers and solution architects. Keep it digestible but accurate. -->

### How It Works
<!-- High-level technical explanation (3-5 sentences) -->

### Architecture Diagram
<!-- Optional: Reference to architecture diagram -->
![Architecture](/images/capabilities/cap-xxx-architecture.png)

### Key Technical Features
- Feature 1
- Feature 2
- Feature 3

### Integration Points
<!-- What does this integrate with? -->
-
-

### Requirements & Prerequisites
<!-- What's needed to use this capability? -->
-
-

---

## Proof Points

### Metrics & Benchmarks
<!-- Quantifiable performance data, if available -->
-
-

### Customer Quotes
<!-- Testimonials or quotes related to this capability -->
> "Quote here" — Customer Name, Title, Company

### Case Studies
<!-- Links to relevant case studies -->
-

---

## Content Assets

<!-- Track what marketing/sales content exists or is needed -->

| Asset Type | Status | Link |
|------------|--------|------|
| Landing Page | ✅ Exists / 🔲 Needed | |
| Blog Post | | |
| Video Demo | | |
| Pitch Deck Slide | | |
| One-Pager | | |
| Battle Card | | |

---

## Documentation References

<!-- Links to detailed technical documentation -->
- Primary docs: `/docs/path/to/main-doc`
- Configuration guide: `/docs/path/to/config`
- Tutorial: `/docs/path/to/tutorial`
- API Reference: `/docs/path/to/api`

---

## Keywords & SEO

<!-- For marketing to optimize content -->

### Primary Keywords
-
-

### Secondary Keywords
-
-

### Related Search Terms
<!-- What might someone search for when looking for this capability? -->
-
-

---

## Version History

| Date | Version | Changes |
|------|---------|---------|
| YYYY-MM-DD | 1.0 | Initial capability documentation |

---

# Example: Completed Capability

Below is an example of a completed capability document for reference.

---

## Metadata

| Field | Value |
|-------|-------|
| **Capability ID** | `cap-001` |
| **Category** | Observability |
| **Status** | GA |
| **Availability** | Pro, Enterprise |
| **Related Capabilities** | `cap-012`, `cap-015` |

## Quick Reference

### Name
Distributed Tracing

### Tagline
Debug federation issues in minutes, not hours.

### Elevator Pitch
Distributed Tracing provides end-to-end visibility into every GraphQL request as it flows through your federated graph. Instantly identify slow subgraphs, pinpoint errors, and understand the complete request lifecycle—all from a single dashboard.

## Problem & Solution

### The Problem
When a GraphQL query fails or performs slowly in a federated architecture, developers waste hours trying to identify which subgraph is responsible. With requests potentially touching dozens of services, traditional logging and monitoring tools lack the context needed to correlate events across service boundaries.

### The Solution
Cosmo's Distributed Tracing automatically instruments your entire federated graph, capturing detailed timing and context for every operation. Each request gets a unique trace ID that follows it through the Router and into each subgraph, making it trivial to identify exactly where issues occur.

### Before & After

| Before Cosmo | With Cosmo |
|--------------|------------|
| Hours spent correlating logs across services | Single trace view shows complete request path |
| Guessing which subgraph caused latency | Precise timing breakdown per subgraph |
| No visibility into resolver-level performance | Field-level execution insights |

## Key Benefits

1. **Reduce MTTR by 80%**: Pinpoint the exact subgraph and resolver causing issues
2. **Proactive Performance Optimization**: Identify slow paths before users complain
3. **Zero-Code Instrumentation**: Works automatically with the Cosmo Router
4. **OpenTelemetry Compatible**: Export traces to your existing observability stack

## Target Audience

### Primary Persona
- **Role**: Platform Engineer / SRE
- **Pain Points**: On-call debugging is painful; lack of visibility into federated requests
- **Goals**: Reduce incident response time; maintain SLAs

### Secondary Personas
- Backend developers debugging performance issues
- Engineering managers tracking system health

## Use Cases

### Use Case 1: Production Incident Response
**Scenario**: A critical checkout API starts returning errors intermittently
**How it works**: Filter traces by error status, see the exact subgraph returning errors, view the error message and stack trace
**Outcome**: Root cause identified in 5 minutes instead of 2 hours

### Use Case 2: Performance Optimization
**Scenario**: Users report slow page loads on the product catalog
**How it works**: Analyze traces for the product query, identify the inventory subgraph adding 800ms latency, drill into specific resolver
**Outcome**: Targeted optimization reduces latency by 60%

## Documentation References

- Primary docs: `/docs/studio/tracing`
- Configuration guide: `/docs/router/observability/tracing`
- Tutorial: `/docs/tutorial/observability-setup`
