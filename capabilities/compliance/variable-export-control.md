# Variable Export Control

Control which GraphQL variables are exported in telemetry for privacy and security.

---

## Metadata

| Field | Value |
|-------|-------|
| **Capability ID** | `cap-compliance-004` |
| **Category** | Compliance |
| **Status** | GA |
| **Availability** | Free / Pro / Enterprise |
| **Related Capabilities** | `cap-compliance-001`, `cap-compliance-002`, `cap-compliance-003` |

---

## Quick Reference

### Name
Variable Export Control

### Tagline
Opt-in variable export for secure query replay.

### Elevator Pitch
Cosmo provides granular control over whether GraphQL variables are included in telemetry exports. By default, variables are excluded to prevent sensitive data from being captured in traces. When you need query replay capabilities for debugging, you can explicitly opt in to variable export, maintaining a security-first approach while enabling powerful debugging workflows.

---

## Problem & Solution

### The Problem
GraphQL variables often contain sensitive request data such as user inputs, authentication tokens, personal information, or business-critical parameters. When telemetry data (traces, logs) captures these variables, it can create compliance risks, security vulnerabilities, and privacy violations. Organizations need to balance the debugging value of seeing exact query parameters against the risk of exposing sensitive data in observability systems.

### The Solution
Cosmo Router excludes GraphQL variables from telemetry exports by default, ensuring sensitive data never leaves your infrastructure through observability channels. When debugging requires exact query reproduction, you can explicitly enable variable export through configuration. This opt-in approach maintains security by default while providing flexibility when needed.

### Before & After

| Before Cosmo | With Cosmo |
|--------------|------------|
| Variables captured by default in traces | Variables excluded by default |
| Risk of sensitive data in observability systems | Security-first telemetry configuration |
| Manual filtering of variable data | Automatic exclusion, opt-in inclusion |
| Difficult to reproduce queries without variables | Enable variable export when needed for debugging |

---

## Key Benefits

1. **Secure by Default**: Variables are excluded from telemetry exports by default, preventing accidental data exposure
2. **Explicit Opt-In**: Enable variable export only when needed, maintaining conscious control over data exposure
3. **Query Replay Support**: When enabled, variables are captured to support exact query reproduction in Cosmo Studio
4. **Compliance Friendly**: Default behavior aligns with data minimization principles required by GDPR and other regulations
5. **Simple Configuration**: Single configuration option controls variable export behavior

---

## Target Audience

### Primary Persona
- **Role**: Platform Engineer, DevOps Engineer
- **Pain Points**: Balancing debugging capabilities with security requirements; preventing sensitive data from appearing in logs and traces; maintaining compliance while enabling observability
- **Goals**: Secure telemetry configuration by default; ability to enable detailed debugging when needed

### Secondary Personas
- Security engineers auditing telemetry data exposure
- Compliance officers ensuring data minimization
- Developers needing query replay for debugging

---

## Use Cases

### Use Case 1: Production Environment with Sensitive Data
**Scenario**: A financial services company processes transactions through their GraphQL API, with variables containing account numbers, amounts, and user identifiers.
**How it works**: Deploy Cosmo Router with default settings. Variables are automatically excluded from all telemetry exports. Traces capture operation names, timing, and structure without exposing sensitive transaction data.
**Outcome**: Full observability into API performance and errors without risk of sensitive financial data appearing in telemetry systems.

### Use Case 2: Debugging Environment with Query Replay
**Scenario**: A development team needs to reproduce and debug failing queries from production, requiring access to exact variable values.
**How it works**: Enable variable export in a dedicated debugging environment or during specific debugging sessions. Variables are captured in traces, enabling the Studio's query replay feature to reproduce exact queries.
**Outcome**: Developers can reproduce exact production scenarios for debugging while maintaining secure defaults in production.

### Use Case 3: Compliance Audit for Data Handling
**Scenario**: An organization needs to demonstrate to auditors that their API infrastructure does not capture or transmit sensitive customer data unnecessarily.
**How it works**: Show auditors the default Cosmo Router configuration where variable export is disabled. Demonstrate that operation content is normalized (user data removed) and variables are excluded from all telemetry.
**Outcome**: Clear audit trail showing data minimization practices are enforced by default at the infrastructure level.

---

## Technical Summary

### How It Works
The Cosmo Router processes GraphQL requests and exports telemetry data to OpenTelemetry-compatible systems. By default, the `export_graphql_variables` setting is disabled, meaning GraphQL variables are stripped from trace spans before export. Operation content is also normalized to remove any embedded user data. When explicitly enabled, variables are included in trace attributes, enabling query replay features in Cosmo Studio.

### Configuration Example
```yaml
version: "1"
telemetry:
  tracing:
    export_graphql_variables: true  # Default: false
```

Environment variable: `TRACING_EXPORT_GRAPHQL_VARIABLES`

### Key Technical Features
- Default exclusion of variables from OTEL traces
- Operation content normalization (user data removed)
- Single configuration toggle for variable export
- Environment variable support for deployment flexibility
- Integration with Cosmo Studio query replay

### Integration Points
- OpenTelemetry trace exports
- Cosmo Studio distributed tracing
- Studio query replay feature

### Requirements & Prerequisites
- Cosmo Router deployment
- Telemetry export configuration
- Studio access for query replay features (when variables enabled)

---

## Documentation References

- Primary docs: `/docs/router/compliance-and-data-management`
- Tracing configuration: `/docs/router/observability/tracing`
- Studio distributed tracing: `/docs/studio/analytics/distributed-tracing`
- Router configuration: `/docs/router/configuration`

---

## Keywords & SEO

### Primary Keywords
- GraphQL variable privacy
- Telemetry data control
- OTEL variable filtering

### Secondary Keywords
- Query replay security
- Trace data minimization
- GraphQL tracing privacy

### Related Search Terms
- How to exclude variables from GraphQL traces
- Secure GraphQL telemetry
- GDPR compliant GraphQL tracing

---

## Version History

| Date | Version | Changes |
|------|---------|---------|
| 2025-01-14 | 1.0 | Initial capability documentation |
