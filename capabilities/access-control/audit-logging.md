# Audit Logging

Complete audit trail of all user and API actions for security, compliance, and operational visibility.

---

## Metadata

| Field | Value |
|-------|-------|
| **Capability ID** | `cap-ac-006` |
| **Category** | Access Control |
| **Status** | GA |
| **Availability** | Pro, Scale, Enterprise |
| **Related Capabilities** | `cap-ac-001` (RBAC), `cap-ac-003` (API Keys), `cap-ac-008` (Sessions) |

---

## Quick Reference

### Name
Audit Logging

### Tagline
Complete visibility into all organization actions.

### Elevator Pitch
Audit Logging provides a detailed, immutable record of every action taken within your organization - whether by users directly or through API keys. Track who did what, when they did it, and how they authenticated, giving you the visibility needed for security analysis, compliance reporting, and incident investigation.

---

## Problem & Solution

### The Problem
When security incidents occur or compliance audits require documentation, organizations often struggle to answer basic questions: Who made this change? When did it happen? Was it a human or an automated system? Without comprehensive audit trails, incident response is slow, accountability is unclear, and compliance becomes a manual, error-prone exercise.

### The Solution
Cosmo's Audit Logging automatically captures every significant action in your organization with rich context including the actor (user or API key), the action performed, the affected resources, and the timestamp. Logs are presented in chronological order with clear visual indicators distinguishing human actions from automated ones, making it simple to investigate incidents and demonstrate compliance.

### Before & After

| Before Cosmo | With Cosmo |
|--------------|------------|
| Unknown who made changes | Clear actor attribution |
| No visibility into API key actions | Separate tracking for user vs key actions |
| Manual compliance documentation | Automatic audit trail |
| Slow incident investigation | Searchable, filterable log history |

---

## Key Benefits

1. **Complete Visibility**: Every action is logged with full context - actor, action, resource, and timestamp - providing end-to-end visibility into organization activity.

2. **Actor Attribution**: Clear distinction between actions performed by users directly versus actions performed through API keys, with visual indicators for quick identification.

3. **Compliance Ready**: Immutable audit records support compliance requirements for SOC 2, GDPR, and other regulatory frameworks requiring activity logging.

4. **Incident Response**: When issues occur, quickly identify what changed, who made the change, and when it happened, accelerating root cause analysis.

5. **Platform Events**: System-generated events from the Cosmo platform are also logged, providing visibility into automated platform actions alongside user activities.

---

## Target Audience

### Primary Persona
- **Role**: Security Engineer / Compliance Officer
- **Pain Points**: Demonstrating compliance during audits, investigating security incidents, understanding system changes
- **Goals**: Maintain comprehensive audit trails, enable fast incident response, satisfy compliance requirements

### Secondary Personas
- Platform administrators troubleshooting configuration issues
- Engineering managers understanding team activity
- DevOps engineers investigating production changes

---

## Use Cases

### Use Case 1: Security Incident Investigation
**Scenario**: An unexpected schema change was deployed to production and the team needs to understand what happened.

**How it works**:
1. Navigate to the Audit Log in your organization settings
2. Filter by the relevant time range and resource
3. Identify the exact action, actor, and timestamp
4. Determine if the action was via user interface or API key
5. Follow up with the appropriate team or review API key usage

**Outcome**: Root cause identified in minutes rather than hours, with clear accountability established.

### Use Case 2: Compliance Audit Documentation
**Scenario**: An auditor requires evidence of access control and change management processes for SOC 2 compliance.

**How it works**:
1. Access the Audit Log for the relevant time period
2. Export or screenshot evidence of role assignments and changes
3. Demonstrate that all changes are attributed to specific actors
4. Show separation of duties through role-based actions

**Outcome**: Compliance evidence readily available without manual documentation efforts.

### Use Case 3: API Key Activity Monitoring
**Scenario**: A security team wants to regularly review what actions are being performed by CI/CD API keys.

**How it works**:
1. Open the Audit Log and identify entries with the API key icon
2. Review the actions performed by each API key
3. Verify actions align with expected CI/CD operations
4. Investigate any unexpected actions or patterns

**Outcome**: Ongoing visibility into automated system behavior, enabling early detection of misuse or misconfiguration.

---

## Competitive Positioning

### Key Differentiators
1. Visual distinction between user and API key actions
2. Platform-generated events included alongside user actions
3. Chronological presentation with rich context per event

---

## Technical Summary

### How It Works
Every API call and user action in Cosmo is intercepted and logged with contextual metadata. The audit log captures the actor (user email or API key identifier), the action type, affected resources, and timestamp. Logs are stored immutably and presented in the Studio interface sorted by creation date in descending order.

### Key Technical Features
- Automatic capture of all significant actions
- User vs API key actor distinction with visual indicators
- Platform-generated event logging
- Chronological ordering by creation date
- Resource and action type metadata
- Namespace-aware action tracking

### Integration Points
- Cosmo Studio for log viewing
- All CLI (wgc) operations logged
- Platform API actions logged
- Studio UI actions logged

### Requirements & Prerequisites
- Pro plan or higher
- No additional configuration required - logging is automatic
- Access to organization settings to view logs

---

## Documentation References

- Primary docs: `/docs/studio/audit-log`
- RBAC: `/docs/studio/rbac`
- API keys: `/docs/studio/api-keys`

---

## Keywords & SEO

### Primary Keywords
- Audit logging
- Activity tracking
- Change management

### Secondary Keywords
- GraphQL audit trail
- Compliance logging
- Security audit log

### Related Search Terms
- How to track changes in GraphQL federation
- API activity monitoring
- SOC 2 compliance for GraphQL

---

## Version History

| Date | Version | Changes |
|------|---------|---------|
| 2025-01-14 | 1.0 | Initial capability documentation |
