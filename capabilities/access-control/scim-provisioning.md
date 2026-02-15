# SCIM Provisioning

Automated user provisioning and deprovisioning through the SCIM standard for seamless identity lifecycle management.

---

## Metadata

| Field | Value |
|-------|-------|
| **Capability ID** | `cap-ac-005` |
| **Category** | Access Control |
| **Status** | GA |
| **Availability** | Enterprise |
| **Related Capabilities** | `cap-ac-003` (API Keys), `cap-ac-004` (SSO), `cap-ac-002` (Groups) |

---

## Quick Reference

### Name
SCIM Provisioning

### Tagline
Automate user lifecycle from your IdP.

### Elevator Pitch
SCIM (System for Cross-domain Identity Management) automates user provisioning, updates, and deprovisioning between your identity provider and Cosmo. When users are added to your IdP application, they automatically receive invitations to join Cosmo. When they're removed, their accounts are deactivated. This eliminates manual user management and ensures your Cosmo user base stays synchronized with your organization.

---

## Problem & Solution

### The Problem
Organizations with significant employee turnover face a constant challenge: ensuring that new employees get access to the tools they need immediately, while departing employees have their access revoked completely. Manual processes are slow, error-prone, and create security risks when offboarding is delayed or forgotten.

### The Solution
Cosmo's SCIM integration connects to your identity provider to automate the entire user lifecycle. New users added to the SCIM application automatically receive email invitations to join Cosmo. User attribute changes are synchronized in real-time. When users are removed from the SCIM application, their Cosmo accounts are immediately deactivated, ensuring no orphaned access remains.

### Before & After

| Before Cosmo | With Cosmo |
|--------------|------------|
| Manual user invitations | Automatic invitation on IdP addition |
| Delayed offboarding | Immediate deactivation on IdP removal |
| Attribute drift between systems | Real-time synchronization |
| Security risks from orphaned accounts | Clean user lifecycle management |

---

## Key Benefits

1. **Automated Onboarding**: Users added to your SCIM application automatically receive invitations to join Cosmo, reducing time-to-productivity.

2. **Immediate Offboarding**: User removal from the SCIM application instantly deactivates their Cosmo account, eliminating security gaps.

3. **Attribute Synchronization**: User attribute changes in your IdP are automatically reflected in Cosmo, keeping data consistent.

4. **Standards-Based**: Built on the SCIM 2.0 standard, ensuring compatibility with major identity providers and future-proofing your integration.

5. **SSO Complementary**: Works alongside SSO to provide complete identity management - SSO for authentication, SCIM for provisioning.

---

## Target Audience

### Primary Persona
- **Role**: IT Administrator / Identity Manager
- **Pain Points**: Manual user provisioning across multiple systems, security risks from delayed offboarding, keeping user data synchronized
- **Goals**: Automate user lifecycle management, ensure immediate access control on employee changes

### Secondary Personas
- HR teams managing employee onboarding/offboarding
- Security officers ensuring timely access revocation
- Compliance teams requiring audit trails of provisioning

---

## Use Cases

### Use Case 1: New Employee Onboarding
**Scenario**: A new developer joins the company and needs access to Cosmo as part of their day-one setup.

**How it works**:
1. HR adds the new employee to the company IdP (e.g., Okta)
2. Employee is assigned to the Cosmo SCIM application
3. Cosmo automatically sends an invitation email to the employee
4. Employee accepts the invitation and gains access with assigned permissions

**Outcome**: New employees have access to Cosmo on day one without any manual administrator intervention.

### Use Case 2: Employee Offboarding
**Scenario**: An employee leaves the company and all their access needs to be revoked immediately.

**How it works**:
1. HR removes the employee from the IdP or the SCIM application
2. SCIM automatically communicates the removal to Cosmo
3. Employee's Cosmo account is immediately deactivated
4. All active sessions are terminated

**Outcome**: Zero-gap offboarding with no manual steps required, eliminating the risk of unauthorized access by former employees.

### Use Case 3: Role/Department Change
**Scenario**: An employee transfers from the platform team to the security team and needs different access levels.

**How it works**:
1. HR updates the employee's group membership in the IdP
2. SCIM synchronizes the attribute changes to Cosmo
3. When combined with SSO role mappings, the user's permissions automatically update

**Outcome**: Access changes are handled through normal HR workflows without requiring separate Cosmo administration.

---

## Competitive Positioning

### Key Differentiators
1. Complete lifecycle support: create, update, and deactivate
2. Standards-compliant SCIM 2.0 implementation
3. Complementary to SSO for comprehensive identity management

---

## Technical Summary

### How It Works
SCIM uses RESTful APIs to communicate user lifecycle events between your identity provider (e.g., Okta) and Cosmo. An API key with SCIM permission serves as the authentication mechanism. When users are created, modified, or deleted in your IdP's SCIM application, those changes are pushed to Cosmo in real-time via the SCIM protocol.

### Key Technical Features
- SCIM 2.0 protocol support
- Create users: Triggers invitation email
- Update user attributes: Synchronizes profile data
- Deactivate users: Immediately disables account
- Password sync support (provider-dependent)
- HTTP Header authentication using Cosmo API key

### Integration Points
- Okta (with dedicated setup guide)
- Any SCIM 2.0 compliant identity provider
- Cosmo API key system for authentication
- SSO for complementary authentication management

### Requirements & Prerequisites
- Enterprise plan
- SCIM-compatible identity provider
- API key with SCIM permission enabled
- SSO recommended for complete identity management
- Matching user assignments between SSO and SCIM apps

---

## Documentation References

- Primary docs: `/docs/studio/scim`
- Okta setup guide: `/docs/studio/scim/okta`
- API keys: `/docs/studio/api-keys`
- SSO: `/docs/studio/sso`

---

## Keywords & SEO

### Primary Keywords
- SCIM provisioning
- User provisioning
- Automated user management

### Secondary Keywords
- Identity lifecycle management
- Okta SCIM integration
- GraphQL user provisioning

### Related Search Terms
- How to automate user provisioning for GraphQL
- SCIM integration for API platforms
- Automated onboarding for federation tools

---

## Version History

| Date | Version | Changes |
|------|---------|---------|
| 2025-01-14 | 1.0 | Initial capability documentation |
