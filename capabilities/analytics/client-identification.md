# Client Identification

## Metadata

| Field | Value |
|-------|-------|
| **Capability ID** | `cap-client-identification` |
| **Category** | Analytics |
| **Status** | GA |
| **Availability** | Free / Pro / Enterprise |
| **Related Capabilities** | `cap-analytics-dashboard`, `cap-schema-field-usage`, `cap-operations-tracking` |

---

## Quick Reference

### Name
Client Identification

### Tagline
Track client versions and usage patterns across your API.

### Elevator Pitch
Client Identification enables teams to distinguish and track different client applications consuming their federated GraphQL API. By adding simple headers to requests, clients are automatically identified and their usage is tracked throughout the analytics platform, enabling client-specific filtering, usage analysis, and targeted deprecation communication.

---

## Problem & Solution

### The Problem
When multiple client applications (web, mobile, partners) consume a GraphQL API, teams lose visibility into which clients are responsible for specific traffic patterns, errors, or field usage. Without client identification, it's impossible to make targeted performance optimizations, communicate breaking changes to affected teams, or understand client-specific behavior.

### The Solution
Cosmo's Client Identification uses standard HTTP headers to identify and track client applications. By adding client name and version headers to requests, all analytics data becomes client-aware. Teams can filter metrics, traces, and field usage by client, enabling targeted analysis and communication.

### Before & After

| Before Cosmo | With Cosmo |
|--------------|------------|
| Anonymous traffic with no client attribution | Every request identified by client and version |
| Unable to isolate client-specific issues | Filter analytics by specific client versions |
| Blanket communication about breaking changes | Targeted communication to affected clients only |
| No visibility into client version distribution | Track which versions are active across your API |

---

## Key Benefits

1. **Client-Aware Analytics**: Filter all analytics data by client name and version
2. **Version Tracking**: Understand which client versions are actively using your API
3. **Targeted Communication**: Identify exactly which clients use deprecated fields or problematic operations
4. **Easy Implementation**: Simple HTTP headers enable identification without SDK changes
5. **Ecosystem Compatibility**: Supports both vendor-neutral and Apollo-compatible header formats

---

## Target Audience

### Primary Persona
- **Role**: Platform Engineer / API Team Lead
- **Pain Points**: No visibility into which clients drive traffic; unable to target communication for breaking changes
- **Goals**: Understand client usage patterns; communicate changes effectively to client teams

### Secondary Personas
- Client application developers tracking their app's API usage
- Engineering managers overseeing multi-client API platforms
- Support teams investigating client-specific issues

---

## Use Cases

### Use Case 1: Client Version Monitoring
**Scenario**: A team wants to understand which versions of their mobile app are still actively calling the API to plan deprecation of older API features.
**How it works**: View analytics with client grouping to see all unique client name and version combinations. Identify older versions still making requests and their traffic volume. Use this data to set sunset timelines for older API features.
**Outcome**: Team has clear visibility into client version distribution and can make informed decisions about API evolution.

### Use Case 2: Client-Specific Performance Investigation
**Scenario**: Users of the iOS app report slow response times, but web users don't experience the same issue.
**How it works**: Filter metrics and traces by the iOS client name. Compare P95 latency and error rates against other clients. Analyze which operations the iOS client uses most frequently to identify potential optimization targets.
**Outcome**: Team isolates iOS-specific performance issues and can work with the mobile team on targeted optimizations.

### Use Case 3: Deprecation Impact Assessment
**Scenario**: A field is being deprecated and the team needs to notify affected client teams.
**How it works**: Use Schema Field Usage to identify which clients use the deprecated field. Get the list of client names and their request counts. Reach out to each client team with specific data about their usage.
**Outcome**: Client teams receive targeted, relevant communication with specific data about how the deprecation affects them.

---

## Technical Summary

### How It Works
Client Identification relies on HTTP headers sent with each GraphQL request. The Cosmo Router extracts these headers and associates the client information with all telemetry data. This enables client-aware filtering and grouping throughout the analytics platform.

### Header Formats

**Vendor-Neutral (Recommended):**
```
GraphQL-Client-Name: <client-name>
GraphQL-Client-Version: <version>
```

**Apollo-Compatible:**
```
ApolloGraphQL-Client-Name: <client-name>
ApolloGraphQL-Client-Version: <version>
```

### Key Technical Features
- Automatic header extraction by Cosmo Router
- Client attribution across all analytics data
- Support for both vendor-neutral and Apollo header formats
- Client-based filtering in metrics, traces, and field usage
- Client-based grouping in trace analytics

### Integration Points
- Cosmo Router (header extraction)
- All analytics views (client filtering)
- Schema Field Usage (per-client field usage)
- Trace Analytics (client grouping)

### Requirements & Prerequisites
- Client applications must include client identification headers
- Cosmo Router deployed (header extraction is automatic)
- No additional configuration required on Cosmo side

---

## Documentation References

- Primary docs: `/docs/studio/analytics/client-identification`
- Analytics overview: `/docs/studio/analytics`
- Schema Field Usage: `/docs/studio/analytics/schema-field-usage`
- Traces documentation: `/docs/studio/analytics/traces`

---

## Keywords & SEO

### Primary Keywords
- GraphQL client tracking
- API client identification
- Client version analytics

### Secondary Keywords
- GraphQL client headers
- API consumer tracking
- Multi-client GraphQL analytics

### Related Search Terms
- GraphQL client name header
- Track GraphQL client versions
- API client usage monitoring
- GraphQL consumer identification

---

## Version History

| Date | Version | Changes |
|------|---------|---------|
| 2025-01-14 | 1.0 | Initial capability documentation |
