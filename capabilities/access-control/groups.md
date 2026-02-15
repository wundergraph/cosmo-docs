# Groups & Group Rules

Centralized user and API key access management with SSO rule mapping for streamlined team permissions.

---

## Metadata

| Field | Value |
|-------|-------|
| **Capability ID** | `cap-ac-002` |
| **Category** | Access Control |
| **Status** | GA |
| **Availability** | Scale, Enterprise |
| **Related Capabilities** | `cap-ac-001` (RBAC), `cap-ac-003` (API Keys), `cap-ac-004` (SSO), `cap-ac-005` (SCIM) |

---

## Quick Reference

### Name
Groups & Group Rules

### Tagline
Centralized team access without manual setup.

### Elevator Pitch
Groups provide a unified way to manage access for both organization members and API keys. By defining group rules that specify roles and resources, you can control exactly what each team or service can access. Combined with SCIM integration, groups enable fully automated access management that scales with your organization.

---

## Problem & Solution

### The Problem
Managing individual user permissions across a growing organization becomes increasingly complex. When team members join, leave, or change roles, administrators must manually update each user's access. This manual process is error-prone, time-consuming, and often results in permission drift where users accumulate more access than they need.

### The Solution
Cosmo Groups centralize access management by grouping users and API keys with shared permission requirements. Group rules define the roles and resource scopes for all group members, making it simple to grant, modify, or revoke access for entire teams at once. Integration with SSO and SCIM ensures group memberships stay synchronized with your identity provider.

### Before & After

| Before Cosmo | With Cosmo |
|--------------|------------|
| Individual permission management | Group-based access control |
| Manual onboarding/offboarding | Automated via SSO/SCIM integration |
| Permission drift over time | Consistent access through group rules |
| Separate user and API key management | Unified groups for both users and keys |

---

## Key Benefits

1. **Unified Access Management**: Manage both organization members and API keys through the same group system, eliminating duplicate configuration.

2. **Flexible Role Assignment**: Assign multiple roles per group with different resource scopes, enabling complex permission patterns.

3. **SSO/SCIM Integration**: Automatically assign users to groups based on identity provider attributes, eliminating manual group membership management.

4. **Safe Group Lifecycle**: Built-in safeguards when deleting groups ensure users and API keys are reassigned, preventing accidental access loss.

5. **Built-in Defaults**: Pre-configured admin, developer, and viewer groups provide sensible defaults while allowing custom group creation for specific needs.

---

## Target Audience

### Primary Persona
- **Role**: Platform Administrator / Security Engineer
- **Pain Points**: Manual user permission management, keeping access synchronized with HR systems, ensuring consistent permissions
- **Goals**: Automate access management and reduce administrative overhead while maintaining security

### Secondary Personas
- Team leads managing team member access
- DevOps engineers configuring CI/CD access
- IT administrators integrating identity systems

---

## Use Cases

### Use Case 1: Team Onboarding Automation
**Scenario**: New developers join the platform team and need immediate access to their team's subgraphs with read access to the broader system.

**How it works**:
1. Create a group named "Platform Team" with Subgraph Admin role scoped to the platform namespace and Graph Viewer for all graphs
2. Configure OIDC mapper or SCIM to automatically assign users with "platform-team" attribute to this group
3. When new developers are added in your identity provider, they automatically receive correct permissions

**Outcome**: Zero-touch onboarding with developers productive immediately without manual permission configuration.

### Use Case 2: Service Account Management
**Scenario**: Multiple CI/CD pipelines need different levels of access - some should only run checks, others need to publish schemas.

**How it works**:
1. Create a "CI Checkers" group with Subgraph Checker role
2. Create a "CI Publishers" group with Subgraph Publisher role scoped to specific namespaces
3. Generate API keys assigned to the appropriate group for each pipeline

**Outcome**: Each pipeline has precisely the permissions it needs, following the principle of least privilege.

### Use Case 3: Cross-Functional Access Patterns
**Scenario**: A platform architect needs admin access to production namespace but also needs to check schemas across all development namespaces.

**How it works**:
1. Create a custom group with multiple rules: Namespace Admin for production, Subgraph Checker for dev namespaces
2. Assign the architect to this group

**Outcome**: Complex access requirements are satisfied through a single group assignment without over-provisioning access.

---

## Competitive Positioning

### Key Differentiators
1. Unified groups for both human users and API keys
2. Multiple role assignments per group with different resource scopes
3. Safe deletion workflow with automatic reassignment options

---

## Technical Summary

### How It Works
Groups contain one or more group rules, each defining a role and optional resource scope. When a user or API key is assigned to a group, they inherit all permissions from the group's rules. If a rule has no explicit resources, it grants access to all resources of that type in the organization. Multiple roles can coexist in one group, and the most permissive access applies when scopes overlap.

### Key Technical Features
- Create custom groups with name and description
- Add multiple rules per group with different roles
- Scope rules to specific namespaces, graphs, or subgraphs
- Built-in groups (admin, developer, viewer) for common patterns
- Group reassignment workflow during deletion
- OIDC mapper support for automatic group assignment

### Integration Points
- SSO providers via OIDC for automatic group assignment
- SCIM for automated user provisioning into groups
- API key system for service account access

### Requirements & Prerequisites
- Scale plan or higher
- RBAC must be enabled in organization settings
- Built-in groups cannot be modified or deleted

---

## Documentation References

- Primary docs: `/docs/studio/groups`
- Group rules: `/docs/studio/groups/group-rules`
- RBAC overview: `/docs/studio/rbac`
- API keys: `/docs/studio/api-keys`

---

## Keywords & SEO

### Primary Keywords
- User group management
- Access control groups
- Team permissions

### Secondary Keywords
- GraphQL team access
- API access groups
- Permission groups

### Related Search Terms
- How to manage team access to GraphQL
- Group-based access control
- Federation team permissions

---

## Version History

| Date | Version | Changes |
|------|---------|---------|
| 2025-01-14 | 1.0 | Initial capability documentation |
