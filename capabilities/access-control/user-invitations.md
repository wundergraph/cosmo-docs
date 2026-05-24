# User Invitations

Team member onboarding and collaboration through streamlined invitation workflows.

---

## Metadata

| Field | Value |
|-------|-------|
| **Capability ID** | `cap-ac-007` |
| **Category** | Access Control |
| **Status** | GA |
| **Availability** | Free, Pro, Scale, Enterprise |
| **Related Capabilities** | `cap-ac-001` (RBAC), `cap-ac-002` (Groups), `cap-ac-005` (SCIM) |

---

## Quick Reference

### Name
User Invitations

### Tagline
Simple team onboarding in clicks.

### Elevator Pitch
User Invitations provide a straightforward way for organization admins to bring team members into Cosmo. Invite colleagues via email, and they receive a link to join your organization with appropriate permissions. Whether they're new to Cosmo or existing users, the invitation flow guides them through setup and grants access to your organization's resources.

---

## Problem & Solution

### The Problem
Getting new team members access to shared tools often involves manual account creation, separate credential management, and unclear permission assignment. When colleagues from other teams need access, administrators must navigate complex provisioning processes, delaying collaboration and productivity.

### The Solution
Cosmo's invitation system enables admins to invite users with a simple email workflow. New users receive instructions to set up their password, while existing Cosmo users are directed to their invitations page. All invitees can accept or decline, and upon acceptance, they immediately gain access to organization resources based on their assigned permissions.

### Before & After

| Before Cosmo | With Cosmo |
|--------------|------------|
| Manual account creation | Email-based invitation flow |
| Unclear onboarding steps | Guided setup experience |
| Delayed access for new team members | Immediate access upon acceptance |
| Complex permission assignment | Permissions assigned at invitation |

---

## Key Benefits

1. **Frictionless Onboarding**: New team members receive clear email instructions and can be productive in minutes, not days.

2. **Choice for Invitees**: Users can accept or decline invitations, maintaining control over their organization memberships.

3. **Existing User Support**: Users already on Cosmo can easily join additional organizations without creating new accounts.

4. **New User Guided Setup**: Users new to Cosmo receive password setup instructions, ensuring a smooth first-time experience.

5. **Admin Control**: Organization admins manage who gets invited and can track pending invitations.

---

## Target Audience

### Primary Persona
- **Role**: Organization Admin / Team Lead
- **Pain Points**: Getting new team members access quickly, managing access for cross-functional collaborators
- **Goals**: Enable team productivity with minimal administrative overhead

### Secondary Personas
- New employees joining a team
- Contractors needing temporary access
- Cross-team collaborators requiring visibility

---

## Use Cases

### Use Case 1: New Employee Onboarding
**Scenario**: A new developer joins the platform team and needs access to the team's Cosmo organization.

**How it works**:
1. Admin navigates to organization settings and initiates an invitation
2. Enters the new employee's email address
3. New employee receives email with setup instructions
4. Employee creates password and accepts invitation
5. Employee gains immediate access to organization resources

**Outcome**: New team member is productive on day one with proper access to all necessary resources.

### Use Case 2: Cross-Team Collaboration
**Scenario**: A developer from another team needs read access to understand the federated graph architecture.

**How it works**:
1. Admin invites the developer with Viewer permissions
2. Developer (existing Cosmo user) receives notification
3. Developer navigates to invitations page and accepts
4. Developer gains read access to the organization

**Outcome**: Cross-team visibility enabled without compromising security or creating unnecessary access.

### Use Case 3: Contractor Onboarding
**Scenario**: An external contractor needs temporary access to contribute to a specific subgraph.

**How it works**:
1. Admin invites contractor email with scoped permissions via group assignment
2. Contractor receives setup email and creates account
3. Contractor accepts invitation and begins work
4. When contract ends, admin removes the user from the organization

**Outcome**: Controlled access for external contributors with clear onboarding and offboarding paths.

---

## Competitive Positioning

### Key Differentiators
1. Dual-path flow for new and existing users
2. Accept/decline choice for invitees
3. Integrated with RBAC for immediate permission assignment

---

## Technical Summary

### How It Works
Organization admins initiate invitations through the Studio interface. Cosmo sends an email to the invitee with instructions appropriate to their status - password setup for new users, or a direct link for existing users. Invitations appear on the invitee's invitations page where they can accept or decline. Acceptance immediately grants access to the organization with assigned permissions.

### Key Technical Features
- Email-based invitation delivery
- New user password setup flow
- Existing user direct acceptance
- Accept/decline options for invitees
- Invitations page for managing pending invitations
- Admin visibility into invitation status

### Integration Points
- Email delivery system
- Cosmo authentication system
- RBAC for permission assignment
- SCIM as an automated alternative

### Requirements & Prerequisites
- Admin role to send invitations
- Valid email address for invitees
- No plan restrictions - available on all tiers

---

## Documentation References

- Primary docs: `/docs/studio/invitations`
- RBAC: `/docs/studio/rbac`
- Groups: `/docs/studio/groups`
- SCIM (for automated provisioning): `/docs/studio/scim`

---

## Keywords & SEO

### Primary Keywords
- User invitations
- Team onboarding
- Member management

### Secondary Keywords
- GraphQL team access
- Organization invitations
- Collaboration access

### Related Search Terms
- How to invite team members to GraphQL platform
- Add users to federation organization
- Team onboarding for API management

---

## Version History

| Date | Version | Changes |
|------|---------|---------|
| 2025-01-14 | 1.0 | Initial capability documentation |
