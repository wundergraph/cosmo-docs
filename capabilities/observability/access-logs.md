# Access Logs

Configurable request logging to stdout or file with custom fields.

---

## Metadata

| Field | Value |
|-------|-------|
| **Capability ID** | `cap-obs-007` |
| **Category** | Observability |
| **Status** | GA |
| **Availability** | Free / Pro / Enterprise |
| **Related Capabilities** | `cap-obs-001`, `cap-obs-002` |

---

## Quick Reference

### Name
Access Logs

### Tagline
Detailed request logging for traffic analysis.

### Elevator Pitch
Access logs provide comprehensive visibility into every request flowing through your Cosmo Router. Log to stdout for container environments or to files for high-load scenarios. Customize logged fields to capture request headers, GraphQL operation details, and timing information - all in structured JSON format ready for analysis.

---

## Problem & Solution

### The Problem
Teams need detailed logs of GraphQL traffic for debugging, auditing, and compliance purposes. Standard HTTP logs lack GraphQL context like operation names, types, and error details. High-traffic systems need efficient file-based logging, while container deployments need stdout output. Custom fields are needed for correlation with internal systems.

### The Solution
Cosmo Router's access logs capture comprehensive request information including GraphQL-specific context. Teams can log to stdout for containerized environments or to files for high-load production systems. Custom fields extract values from headers, request context, or expressions, enabling rich correlation and debugging capabilities.

### Before & After

| Before Cosmo | With Cosmo |
|--------------|------------|
| Generic HTTP logs only | GraphQL-aware request logging |
| No operation context | Operation name, type, hash logged |
| Fixed log format | Customizable fields from headers/context |
| stdout only | stdout or file output options |

---

## Key Benefits

1. **GraphQL Context**: Log operation names, types, hashes, and timing breakdowns
2. **Flexible Output**: stdout for containers, file output for high-load scenarios
3. **Custom Fields**: Extract values from headers, context, or expressions
4. **Subgraph Logging**: Separate logs for router and subgraph requests
5. **Structured Format**: JSON output for easy parsing and analysis

---

## Target Audience

### Primary Persona
- **Role**: DevOps Engineer / SRE
- **Pain Points**: Lack of GraphQL context in logs; difficulty correlating requests; compliance requirements
- **Goals**: Comprehensive audit trail; efficient debugging; traffic analysis

### Secondary Personas
- Security teams requiring audit logs
- Backend developers debugging issues
- Compliance officers reviewing access patterns

---

## Use Cases

### Use Case 1: Request Debugging
**Scenario**: A specific GraphQL operation is failing intermittently and the team needs to understand the pattern.
**How it works**: Enable access logs with custom fields for operation name, error codes, and service names. Filter logs by operation to analyze failure patterns.
**Outcome**: Discovered that failures correlate with specific client versions; targeted fix deployed.

### Use Case 2: Compliance Auditing
**Scenario**: Security team requires logs of all API access with client identification.
**How it works**: Configure access logs with fields extracted from authentication headers and client identifiers. Store logs to file for retention.
**Outcome**: Complete audit trail for compliance review with client attribution.

### Use Case 3: Performance Analysis
**Scenario**: Team needs to understand operation timing breakdown for optimization.
**How it works**: Enable custom fields for parsing, planning, normalization, and validation times. Analyze logs to identify slow operations.
**Outcome**: Identified operations with excessive planning time; optimized schema structure.

---

## Competitive Positioning

### Key Differentiators
1. GraphQL-native log fields (operation name, type, hash)
2. Timing breakdown (parsing, planning, normalization, validation)
3. Subgraph-level logging for federated requests
4. Expression-based custom fields for complex extractions

### Comparison with Alternatives

| Aspect | Cosmo | Generic Logging | Custom Solution |
|--------|-------|-----------------|-----------------|
| GraphQL Context | Native | None | Manual |
| Custom Fields | Header + Expression | Limited | Manual |
| Subgraph Logs | Built-in | N/A | Manual |
| Performance | Optimized | Varies | Varies |

### Common Objections & Responses

| Objection | Response |
|-----------|----------|
| "Logging impacts performance" | File-based logging is optimized for high load; configurable fields minimize overhead |
| "We use centralized logging" | stdout output integrates with any log aggregator; JSON format enables easy parsing |
| "Too much data to store" | Configurable fields let you capture only what you need; log level controls verbosity |

---

## Technical Summary

### How It Works
Access logs capture request information at configurable points in the request lifecycle. Logs can be output to stdout (default) or to a file for high-load scenarios. Custom fields extract values from request headers, context (populated during request processing), or expressions. Structured JSON format enables easy parsing by log aggregation systems.

### Key Technical Features

**Default Fields:**
- `hostname`, `pid`, `request_id`, `trace_id`
- `status`, `method`, `path`, `query`
- `ip` (redacted by default), `user_agent`
- `config_version`, `latency`, `log_type`

**Custom Context Fields:**
- `operation_name`, `operation_type`, `operation_hash`
- `operation_sha256`, `persisted_operation_sha256`
- `operation_parsing_time`, `operation_planning_time`
- `operation_normalization_time`, `operation_validation_time`
- `graphql_error_codes`, `graphql_error_service_names`
- `request_error`, `response_error_message`

**Configuration Example:**
```yaml
access_logs:
  enabled: true
  level: info
  output:
    file:
      enabled: true
      path: /var/log/gateway/access.log
      mode: '0644'
  router:
    fields:
      - key: "operationName"
        value_from:
          context_field: operation_name
      - key: "service"
        value_from:
          request_header: "x-service"
```

### Integration Points
- Log aggregation systems (ELK, Splunk, etc.)
- Container logging (stdout for Docker, Kubernetes)
- File-based log rotation tools
- SIEM systems for security analysis

### Requirements & Prerequisites
- Cosmo Router 0.118.0+ for access logs
- Cosmo Router 0.146.0+ for subgraph access logs
- Cosmo Router 0.186.0+ for expression fields
- Write access for file-based logging

---

## Proof Points

### Metrics & Benchmarks
- File-based logging recommended for high-load scenarios
- Configurable file permissions (default: 0640)
- Structured JSON output for efficient parsing

### Customer Quotes
> "The timing breakdown fields in access logs helped us identify that query planning was our bottleneck. We couldn't have found this without the GraphQL-specific context." - Backend Engineer

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

- Primary docs: `/docs/router/access-logs`
- Expression fields: `/docs/router/configuration/template-expressions`
- Configuration reference: `/docs/router/configuration`

---

## Keywords & SEO

### Primary Keywords
- GraphQL access logs
- Request logging GraphQL
- Federation access logs

### Secondary Keywords
- GraphQL audit logging
- Custom log fields GraphQL
- Subgraph request logging

### Related Search Terms
- How to log GraphQL requests
- GraphQL operation logging
- Federation request tracing logs
- Custom fields access logs

---

## Version History

| Date | Version | Changes |
|------|---------|---------|
| 2025-01-14 | 1.0 | Initial capability documentation |
