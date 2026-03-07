# Single Sign-On (SSO)

OIDC-based authentication supporting Okta, Auth0, Keycloak, and Microsoft Entra for unified identity management.

---

## Metadata

| Field | Value |
|-------|-------|
| **Capability ID** | `cap-ac-004` |
| **Category** | Access Control |
| **Status** | GA |
| **Availability** | Enterprise |
| **Related Capabilities** | `cap-ac-001` (RBAC), `cap-ac-002` (Groups), `cap-ac-005` (SCIM) |

---

## Quick Reference

### Name
Single Sign-On (SSO)

### Tagline
Unified authentication with your identity provider.

### Elevator Pitch
Cosmo integrates with your existing identity provider through OpenID Connect, enabling seamless authentication for your entire organization. Users sign in with their existing credentials and automatically receive appropriate permissions based on your configured role mappings. No separate password management, no manual user provisioning - just secure, unified access.

---

## Problem & Solution

### The Problem
Organizations managing multiple tools face authentication sprawl - separate passwords, inconsistent access controls, and manual user management for each system. When employees join, leave, or change roles, each system requires individual updates, creating security risks and administrative burden.

### The Solution
Cosmo's SSO integration connects to your existing OpenID Connect identity provider, centralizing authentication through your established identity infrastructure. Users are automatically enrolled in your organization when they sign in, receiving roles based on your configured mappings. When SSO is disconnected, all users are safely downgraded to viewer access as a security measure.

### Before & After

| Before Cosmo | With Cosmo |
|--------------|------------|
| Separate credentials per system | Single sign-on with existing identity |
| Manual user provisioning | Automatic enrollment on first sign-in |
| Inconsistent role management | Centralized role mapping from IdP |
| Password management overhead | Leverages existing IdP security |

---

## Key Benefits

1. **Seamless User Experience**: Users sign in with their existing organizational credentials - no new passwords to remember or manage.

2. **Automatic User Enrollment**: When users sign in via SSO for the first time, they are automatically added to your organization with appropriate permissions.

3. **Role Synchronization**: Roles are assigned based on mappings configured during SSO setup, ensuring permissions stay synchronized with your authorization server.

4. **Security by Default**: Disconnecting SSO automatically downgrades all SSO users to viewer role, preventing unauthorized access if synchronization is lost.

5. **Provider Flexibility**: Support for major OIDC providers including Okta, Auth0, Keycloak, and any OIDC-compliant identity provider.

---

## Target Audience

### Primary Persona
- **Role**: IT Administrator / Identity Manager
- **Pain Points**: Managing multiple identity systems, ensuring consistent access across tools, user lifecycle management
- **Goals**: Centralize identity management, reduce security risks from separate credentials, streamline onboarding/offboarding

### Secondary Personas
- Security officers ensuring compliance with identity policies
- Platform administrators managing user access
- End users seeking simpler authentication

---

## Use Cases

### Use Case 1: Enterprise Okta Integration
**Scenario**: A company uses Okta for all employee authentication and wants Cosmo access managed through Okta.

**How it works**:
1. Configure OIDC integration in Cosmo with Okta credentials
2. Set up role mappings to assign Cosmo roles based on Okta groups
3. Share the generated Login URL with employees
4. Employees sign in using "Login with SSO" and receive appropriate permissions

**Outcome**: Employees access Cosmo using existing Okta credentials with permissions automatically assigned based on their Okta group membership.

### Use Case 2: Multi-Environment Access Control
**Scenario**: Different teams need different access levels based on their identity provider group membership.

**How it works**:
1. Configure SSO with role mappings linking IdP groups to Cosmo groups
2. Map "platform-admins" IdP group to Organization Admin role
3. Map "developers" IdP group to Developer role
4. Map "viewers" IdP group to Viewer role

**Outcome**: Team permissions are automatically determined by IdP group membership, ensuring consistent access across environments.

### Use Case 3: Contractor Access Management
**Scenario**: An organization needs to provide contractors limited access that can be easily revoked when the contract ends.

**How it works**:
1. Create contractors in IdP with specific group membership
2. Map contractor IdP group to a Cosmo group with Viewer access only
3. When contract ends, remove user from IdP - they lose Cosmo access immediately

**Outcome**: Contractor access is fully controlled through the existing HR/identity workflow with no separate Cosmo management needed.

---

## Competitive Positioning

### Key Differentiators
1. Automatic security downgrade when SSO is disconnected
2. Unique organization-specific login URLs for each SSO integration
3. Native support for major enterprise identity providers

---

## Technical Summary

### How It Works
SSO integration uses the OpenID Connect (OIDC) protocol to authenticate users through your identity provider. When users sign in via the organization-specific Login URL, Cosmo validates their identity with the IdP and applies role mappings to determine their permissions. Sessions are maintained according to Cosmo's session management policies.

### Key Technical Features
- OIDC 2.0 protocol compliance
- Support for Okta, Auth0, Keycloak, Microsoft Entra
- Custom OIDC provider support for compliant systems
- Organization-specific Login URLs
- Automatic user enrollment on first sign-in
- Role mapping configuration during setup
- Secure disconnection with automatic access downgrade

### Integration Points
- Okta (with dedicated setup guide)
- Auth0 (with dedicated setup guide)
- Keycloak (with dedicated setup guide)
- Any OIDC-compliant identity provider
- SCIM for enhanced user lifecycle management

### Requirements & Prerequisites
- Enterprise plan
- OIDC-compliant identity provider
- Administrator access to both Cosmo and IdP
- Configuration of role mappings during setup

---

## Documentation References

- Primary docs: `/docs/studio/sso`
- Okta setup: `/docs/studio/sso/okta`
- Auth0 setup: `/docs/studio/sso/auth0`
- Keycloak setup: `/docs/studio/sso/keycloak`
- RBAC: `/docs/studio/rbac`

---

## Keywords & SEO

### Primary Keywords
- GraphQL SSO
- Single sign-on
- OIDC authentication

### Secondary Keywords
- Enterprise authentication
- Identity provider integration
- Okta GraphQL integration

### Related Search Terms
- How to set up SSO for GraphQL
- Federation identity management
- OIDC integration for API management

---

## Version History

| Date | Version | Changes |
|------|---------|---------|
| 2025-01-14 | 1.0 | Initial capability documentation |
