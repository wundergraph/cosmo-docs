# Trace Analytics

## Metadata

| Field | Value |
|-------|-------|
| **Capability ID** | `cap-trace-analytics` |
| **Category** | Analytics |
| **Status** | GA |
| **Availability** | Free / Pro / Enterprise |
| **Related Capabilities** | `cap-analytics-dashboard`, `cap-metrics-analytics`, `cap-operations-tracking` |

---

## Quick Reference

### Name
Trace Analytics

### Tagline
Inspect every request with detailed trace visualization.

### Elevator Pitch
Trace Analytics lists all requests made to your router with detailed information including the operation performed, the requesting client, and any error messages. With powerful filtering, flexible grouping, and auto-refresh capabilities, teams can investigate individual requests, identify patterns, and debug issues in real-time.

---

## Problem & Solution

### The Problem
When issues occur in a federated GraphQL system, teams need to investigate individual requests to understand what happened. Without request-level visibility, debugging becomes guesswork, and correlating errors across services is nearly impossible. Teams waste time searching through logs and manually piecing together request flows.

### The Solution
Cosmo's Trace Analytics provides a comprehensive list of all requests with relevant details visible at a glance. Filters narrow down to specific requests, grouping reveals patterns across operations or clients, and drill-down capabilities let teams inspect individual traces in detail. Auto-refresh keeps the view current during active investigation.

### Before & After

| Before Cosmo | With Cosmo |
|--------------|------------|
| Searching through distributed logs | Centralized list of all requests |
| Manual correlation of request data | Filters and grouping reveal patterns instantly |
| Static log views during incidents | Auto-refresh keeps data current |
| Limited context for each request | Full details including operation, client, and errors |

---

## Key Benefits

1. **Complete Request Visibility**: See every request made to your federated graph with full details
2. **Powerful Filtering**: Narrow down to specific requests by date range, operation, client, or error
3. **Flexible Grouping**: Group by operation name, client, or error message to identify patterns
4. **Real-Time Monitoring**: Auto-refresh at configurable intervals (10s, 30s, 1min, 5min)
5. **Seamless Drill-Down**: Click on grouped rows to filter and investigate specific request sets

---

## Target Audience

### Primary Persona
- **Role**: Backend Developer / Platform Engineer
- **Pain Points**: Difficulty debugging production issues; need visibility into individual request behavior
- **Goals**: Quickly identify and resolve issues; understand request patterns

### Secondary Personas
- SREs investigating incidents
- QA engineers validating API behavior
- Support teams researching customer-reported issues

---

## Use Cases

### Use Case 1: Error Pattern Identification
**Scenario**: A team notices elevated error rates and needs to understand what types of errors are occurring.
**How it works**: Open Trace Analytics and group by error message. The view shows all unique error messages clustered together with occurrence counts. Identify the most common errors, then click on an error group to see all individual requests with that error.
**Outcome**: Team quickly identifies that 80% of errors are from a specific error message, directing investigation to the root cause.

### Use Case 2: Client Behavior Investigation
**Scenario**: A specific mobile app version is suspected of causing issues due to malformed queries.
**How it works**: Use Trace Analytics filters to select the specific client name and version. Review the operations being executed by this client, check for errors, and compare behavior to other client versions.
**Outcome**: Team confirms that a specific client version is sending problematic queries and can work with the mobile team to deploy a fix.

### Use Case 3: Real-Time Incident Monitoring
**Scenario**: During an active incident, the team needs to monitor requests in real-time to understand if a deployed fix is working.
**How it works**: Configure auto-refresh to 10-second intervals. Apply filters relevant to the incident (e.g., specific operation or error type). Watch the trace list update automatically to see if error patterns decrease after the fix is deployed.
**Outcome**: Team confirms fix effectiveness in real-time without manual refreshing, enabling faster incident resolution.

---

## Technical Summary

### How It Works
Trace Analytics collects request data from the Cosmo Router through OTEL instrumentation. The sampling rate configured on the router determines how many traces are captured. Each trace includes operation details, client information (from headers), timing data, and error information. The UI provides filtering, grouping, and pagination capabilities for exploring this data.

### Key Technical Features
- Date range selection with predefined ranges and custom date/time picker
- Filtering by operation, client, status, and other attributes
- Grouping by: None (individual requests), Operation Name, Client, Error Message
- Auto-refresh intervals: 10 seconds, 30 seconds, 1 minute, 5 minutes
- Click-through from grouped views to filtered individual traces

### Integration Points
- Cosmo Router (data collection via OTEL)
- Client applications (via GraphQL-Client-Name and GraphQL-Client-Version headers)
- Cosmo Studio (visualization interface)

### Requirements & Prerequisites
- Cosmo Router with OTEL instrumentation enabled
- Sampling rate configured to capture desired trace volume
- Client headers configured for proper client identification

---

## Documentation References

- Primary docs: `/docs/studio/analytics/traces`
- Analytics overview: `/docs/studio/analytics`
- Distributed tracing: `/docs/studio/analytics/distributed-tracing`
- Client identification: `/docs/studio/analytics/client-identification`

---

## Keywords & SEO

### Primary Keywords
- GraphQL request tracing
- API trace analysis
- Request debugging

### Secondary Keywords
- GraphQL trace filtering
- API request grouping
- Federation trace analytics

### Related Search Terms
- GraphQL request inspection
- API request debugging tool
- Federation request visibility
- GraphQL error trace analysis

---

## Version History

| Date | Version | Changes |
|------|---------|---------|
| 2025-01-14 | 1.0 | Initial capability documentation |
