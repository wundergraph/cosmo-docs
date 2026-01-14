# Role-Based Access Control (RBAC)

Granular permission management by role for secure, structured access to your federated graph platform.

---

## Metadata

| Field | Value |
|-------|-------|
| **Capability ID** | `cap-ac-001` |
| **Category** | Access Control |
| **Status** | GA |
| **Availability** | Scale, Enterprise |
| **Related Capabilities** | `cap-ac-002` (Groups), `cap-ac-003` (API Keys), `cap-ac-004` (SSO) |

---

## Quick Reference

### Name
Role-Based Access Control (RBAC)

### Tagline
Secure access through role-based permissions.

### Elevator Pitch
Role-Based Access Control simplifies managing who can do what within your organization by assigning permissions to roles rather than individuals. Users are associated with specific roles, and their access rights are automatically determined by those roles, ensuring consistent security policies across your entire federated graph infrastructure.

---

## Problem & Solution

### The Problem
As organizations scale their GraphQL federation deployments, managing individual user permissions becomes unmanageable. Without structured access control, teams face security risks from overly permissive access, compliance challenges from inconsistent permissions, and administrative overhead from manually managing each user's access rights.

### The Solution
Cosmo's RBAC system assigns permissions to roles at organizational, namespace, graph, and subgraph levels. Users inherit permissions through their assigned roles, ensuring consistent access policies. Integration with SSO providers keeps role assignments synchronized with your existing identity infrastructure.

### Before & After

| Before Cosmo | With Cosmo |
|--------------|------------|
| Manual permission management per user | Role-based permissions inherited automatically |
| Inconsistent access across environments | Unified access control across namespaces |
| No visibility into who can access what | Clear role hierarchy with defined permissions |
| Security risks from permission sprawl | Principle of least privilege enforced by design |

---

## Key Benefits

1. **Simplified Administration**: Manage permissions through roles instead of individual user assignments, reducing administrative overhead significantly.

2. **Consistent Security Policies**: Apply uniform access policies across your organization through well-defined role hierarchies at organization, namespace, graph, and subgraph levels.

3. **SSO Integration**: Seamlessly synchronize roles with your identity provider, ensuring users always have the correct permissions based on your authorization server.

4. **Granular Control**: Define access at multiple levels - from organization-wide admin access down to specific subgraph permissions.

5. **Compliance Ready**: Maintain clear audit trails of role assignments for regulatory and security compliance requirements.

---

## Target Audience

### Primary Persona
- **Role**: Platform Engineer / Security Administrator
- **Pain Points**: Managing access for growing teams, ensuring least-privilege access, maintaining compliance
- **Goals**: Implement secure access control that scales with the organization without manual overhead

### Secondary Personas
- Engineering Managers overseeing team access
- DevOps teams managing CI/CD pipeline access
- Compliance officers ensuring appropriate access controls

---

## Use Cases

### Use Case 1: Team-Based Access Segmentation
**Scenario**: A platform team needs to give different development teams access only to their specific subgraphs while maintaining read-only visibility into the overall federated graph.

**How it works**: Create groups for each team with Subgraph Admin roles scoped to their namespaces, plus a Graph Viewer role for the federated graph. Team members automatically receive appropriate permissions.

**Outcome**: Teams can publish and manage their subgraphs independently while understanding the broader system context without risking accidental changes.

### Use Case 2: CI/CD Pipeline Access Control
**Scenario**: An organization needs to grant their CI/CD systems the ability to publish schema changes but not modify organization settings or create new graphs.

**How it works**: Create a dedicated group with Subgraph Publisher role, then generate API keys assigned to that group for pipeline use.

**Outcome**: Automated systems have precisely the permissions needed for deployments with no risk of unintended administrative actions.

### Use Case 3: Environment Isolation
**Scenario**: A company wants to ensure developers can freely experiment in dev namespaces but have restricted access to production.

**How it works**: Configure group rules with Namespace Admin for dev namespace and Namespace Viewer for production. Only senior engineers receive Admin access to production.

**Outcome**: Development velocity is maintained while production environments remain protected from unauthorized changes.

---

## Competitive Positioning

### Key Differentiators
1. Multi-level permission hierarchy (Organization, Namespace, Graph, Subgraph)
2. Native SSO integration ensures role synchronization with identity providers
3. Unified access control for both users and API keys through the groups system

---

## Technical Summary

### How It Works
RBAC in Cosmo operates through a groups-based permission system. Each group contains rules that define roles and their associated resources. Users and API keys are assigned to groups, inheriting all permissions from that group's rules. When access is checked, the system evaluates all applicable role assignments to determine if the action is permitted.

### Key Technical Features
- Organization-level roles: Admin, Developer, API Key Manager, Viewer
- Namespace-level roles: Admin, Viewer
- Graph-level roles: Admin, Viewer
- Subgraph-level roles: Admin, Publisher, Checker, Viewer
- Built-in groups for common permission patterns
- Custom group creation for specific access requirements

### Integration Points
- OpenID Connect (OIDC) providers for SSO synchronization
- SCIM for automated user provisioning with role assignment
- API key system for programmatic access

### Requirements & Prerequisites
- Scale plan or higher
- RBAC must be enabled in organization settings
- SSO configuration recommended for role synchronization

---

## Documentation References

- Primary docs: `/docs/studio/rbac`
- Groups configuration: `/docs/studio/groups`
- Group rules: `/docs/studio/groups/group-rules`
- SSO integration: `/docs/studio/sso`

---

## Keywords & SEO

### Primary Keywords
- GraphQL RBAC
- Role-based access control
- Federation access management

### Secondary Keywords
- GraphQL permissions
- API access control
- Team access management

### Related Search Terms
- How to manage GraphQL API permissions
- Federation security best practices
- Subgraph access control

---

## Version History

| Date | Version | Changes |
|------|---------|---------|
| 2025-01-14 | 1.0 | Initial capability documentation |
