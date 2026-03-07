# Session Management

User session tracking and activity monitoring with security-focused timeouts and authentication controls.

---

## Metadata

| Field | Value |
|-------|-------|
| **Capability ID** | `cap-ac-008` |
| **Category** | Access Control |
| **Status** | GA |
| **Availability** | Free, Pro, Scale, Enterprise |
| **Related Capabilities** | `cap-ac-004` (SSO), `cap-ac-006` (Audit Logging) |

---

## Quick Reference

### Name
Session Management

### Tagline
Secure sessions with smart timeouts.

### Elevator Pitch
Session Management in Cosmo follows industry security standards to balance user convenience with security. Sessions automatically renew during active use, timeout after inactivity, and have a maximum lifetime to ensure regular reauthentication. High-risk operations are protected with additional confirmation steps, and users can leverage their existing identity providers for enhanced security.

---

## Problem & Solution

### The Problem
Balancing security and usability in session management is challenging. Sessions that never expire create security risks, while sessions that expire too quickly frustrate users. Without proper controls, organizations face risks from abandoned sessions, shared credentials, and inadequate protection for sensitive operations.

### The Solution
Cosmo implements session management following security standards established by Auth0, Cloudflare, and other industry leaders. Sessions renew automatically every 8 hours during active use, terminate after 72 hours of inactivity, and have a maximum lifetime of 14 days. High-risk operations require email confirmation, providing defense-in-depth for the most sensitive actions.

### Before & After

| Before Cosmo | With Cosmo |
|--------------|------------|
| Indefinite session concerns | 14-day maximum session lifetime |
| No inactivity timeout | 72-hour inactivity timeout |
| All operations equally trusted | High-risk operations require confirmation |
| Password-only authentication | SSO and social login integration |

---

## Key Benefits

1. **Industry-Standard Security**: Session policies follow best practices from Auth0, Cloudflare, and other security leaders, ensuring appropriate protection.

2. **Seamless Active Use**: Sessions automatically renew every 8 hours during active use, minimizing disruption for users who are actively working.

3. **Automatic Cleanup**: 72-hour inactivity timeout ensures abandoned sessions don't remain active indefinitely, reducing security exposure.

4. **Maximum Lifetime Protection**: 14-day session limit ensures users reauthenticate regularly, reducing risk from compromised sessions.

5. **High-Risk Operation Protection**: Sensitive actions like organization deletion require email confirmation, preventing accidental or unauthorized destructive changes.

---

## Target Audience

### Primary Persona
- **Role**: Security Administrator / Platform Administrator
- **Pain Points**: Ensuring appropriate session security, protecting sensitive operations, meeting compliance requirements for session management
- **Goals**: Implement secure session management without frustrating users

### Secondary Personas
- Compliance officers verifying security controls
- End users expecting secure, convenient access
- IT administrators managing authentication methods

---

## Use Cases

### Use Case 1: Active Developer Workflow
**Scenario**: A developer works in Cosmo Studio throughout the day, managing schemas and reviewing analytics.

**How it works**:
1. Developer logs in at start of day
2. Session automatically renews every 8 hours during active use
3. Developer works uninterrupted throughout their workday
4. Session remains valid as long as activity continues

**Outcome**: Productive workflow without constant reauthentication, while maintaining security through regular renewal.

### Use Case 2: Abandoned Session Protection
**Scenario**: An engineer leaves for vacation without explicitly logging out.

**How it works**:
1. Engineer's last activity was Friday afternoon
2. No activity over the weekend or following week
3. After 72 hours of inactivity, session automatically terminates
4. If someone accesses the browser later, they must reauthenticate

**Outcome**: Automatic protection against abandoned sessions without requiring explicit logout.

### Use Case 3: Sensitive Operation Protection
**Scenario**: An admin attempts to delete an organization (potentially accidental click or unauthorized access).

**How it works**:
1. Admin initiates organization deletion
2. System requires email confirmation before proceeding
3. Confirmation email sent to admin's registered email
4. Only after confirmation does deletion proceed

**Outcome**: Defense-in-depth protection ensures destructive operations require multi-factor confirmation.

---

## Competitive Positioning

### Key Differentiators
1. Session policies based on industry-leading security standards
2. Email confirmation for high-risk operations
3. Flexible authentication via SSO/social providers

---

## Technical Summary

### How It Works
Sessions are created upon successful authentication and tracked server-side. During active use, sessions renew every 8 hours. Inactivity for 72 hours triggers automatic session termination. Regardless of activity, sessions have a maximum lifetime of 14 days, after which reauthentication is required. High-risk operations trigger an additional email confirmation flow.

### Key Technical Features
- 8-hour session renewal during active use
- 72-hour inactivity timeout
- 14-day maximum session lifetime
- Email confirmation for high-risk operations (e.g., organization deletion)
- Google and GitHub social login support
- SSO integration for enterprise identity providers

### Integration Points
- Google OAuth for social login
- GitHub OAuth for social login
- SSO via OIDC for enterprise identity
- Email system for high-risk confirmations

### Requirements & Prerequisites
- No special configuration required - session management is automatic
- SSO available for organizations wanting IdP-controlled authentication
- Email access required for high-risk operation confirmation

---

## Documentation References

- Primary docs: `/docs/studio/sessions`
- SSO: `/docs/studio/sso`
- Audit logging: `/docs/studio/audit-log`

---

## Keywords & SEO

### Primary Keywords
- Session management
- Authentication security
- Session timeout

### Secondary Keywords
- GraphQL session security
- Login session control
- Access timeout

### Related Search Terms
- How long do GraphQL sessions last
- API platform session security
- Federation authentication timeouts

---

## Version History

| Date | Version | Changes |
|------|---------|---------|
| 2025-01-14 | 1.0 | Initial capability documentation |
