# API Keys

Granular API key permissions with resource-level access for secure automation and CI/CD integration.

---

## Metadata

| Field | Value |
|-------|-------|
| **Capability ID** | `cap-ac-003` |
| **Category** | Access Control |
| **Status** | GA |
| **Availability** | Free, Pro, Scale, Enterprise |
| **Related Capabilities** | `cap-ac-001` (RBAC), `cap-ac-002` (Groups), `cap-ac-005` (SCIM) |

---

## Quick Reference

### Name
API Keys

### Tagline
Secure automation with granular permissions.

### Elevator Pitch
API Keys enable secure programmatic access to Cosmo for automation, CI/CD pipelines, and CLI usage. Each key can be scoped to specific groups and permissions, ensuring your automated systems have exactly the access they need - no more, no less. Built-in expiration controls and group-based permissions make key management simple and secure.

---

## Problem & Solution

### The Problem
Automation and CI/CD systems need programmatic access to manage schemas, run checks, and deploy changes. Without proper controls, API keys often receive overly broad permissions, creating security risks. Managing multiple keys across different systems and environments becomes complex, and rotating or revoking keys is error-prone.

### The Solution
Cosmo API Keys integrate with the groups system, inheriting permissions from assigned groups. Keys can be created with specific expiration dates, assigned to groups with precisely scoped permissions, and managed centrally. Special permissions like SCIM can be enabled only when needed, maintaining the principle of least privilege.

### Before & After

| Before Cosmo | With Cosmo |
|--------------|------------|
| All-or-nothing API key access | Group-based granular permissions |
| No key expiration management | Configurable expiration dates |
| Unclear what each key can access | Permissions visible via group assignment |
| Separate permission systems for keys and users | Unified groups for both users and API keys |

---

## Key Benefits

1. **Group-Based Permissions**: API keys inherit permissions from assigned groups, using the same permission model as users for consistency.

2. **Flexible Expiration**: Set expiration dates when creating keys, or choose never-expiring keys for long-running automation with proper security controls.

3. **Scoped Access**: Through groups, limit keys to specific namespaces, graphs, or subgraphs, following the principle of least privilege.

4. **Special Permissions**: Enable additional capabilities like SCIM provisioning only when needed, keeping default keys minimal.

5. **Centralized Management**: View and manage all organization API keys from a single interface with visibility into creator, expiration, and group assignment.

---

## Target Audience

### Primary Persona
- **Role**: DevOps Engineer / Platform Engineer
- **Pain Points**: Managing CI/CD credentials securely, ensuring automation has correct permissions, rotating keys safely
- **Goals**: Enable automation without security risks, maintain visibility into what automated systems can do

### Secondary Personas
- Security engineers auditing API access
- Developers using CLI tools locally
- Infrastructure teams managing multiple environments

---

## Use Cases

### Use Case 1: CI/CD Pipeline Integration
**Scenario**: A development team needs their GitHub Actions workflow to publish schema changes to their subgraph on every merge to main.

**How it works**:
1. Create a group with Subgraph Publisher role scoped to the team's subgraph
2. Generate an API key assigned to this group
3. Store the key in GitHub Secrets
4. Configure the workflow to use the key with the wgc CLI

**Outcome**: Automated schema publishing with permissions limited to exactly what the pipeline needs.

### Use Case 2: Local Development Access
**Scenario**: Developers need CLI access to check schemas and explore the graph during development without admin permissions.

**How it works**:
1. Create a group with Subgraph Checker role for dev namespace and Graph Viewer for visibility
2. Generate personal API keys for each developer assigned to this group
3. Developers configure their local wgc CLI with their personal key

**Outcome**: Developers can work productively while production resources remain protected.

### Use Case 3: SCIM Integration Setup
**Scenario**: An organization wants to automate user provisioning from Okta to Cosmo.

**How it works**:
1. Create an API key with SCIM permission enabled
2. Set expiration to "Never" for long-running integration
3. Configure Okta SCIM connector with the API key as the authorization header
4. Users added in Okta automatically receive invitations to join the organization

**Outcome**: Fully automated user lifecycle management without manual intervention.

---

## Competitive Positioning

### Key Differentiators
1. Unified permission model for users and API keys through groups
2. SCIM permission enables enterprise identity automation
3. Clear visibility into key permissions via group assignment

---

## Technical Summary

### How It Works
API keys are created through Cosmo Studio and assigned to a group at creation time. The key inherits all permissions from the assigned group's rules. When making API calls using the key, Cosmo validates the request against the group's permissions. Special permissions like SCIM are configured separately during key creation.

### Key Technical Features
- Create keys with name, expiration, and group assignment
- One-time key display with secure copy functionality
- Configurable expiration: 30 days, 6 months, 1 year, or never
- SCIM permission for identity management integration
- Keys visible to Admin and Developer roles only
- Legacy resource-scoped keys migrated to groups system

### Integration Points
- wgc CLI for local and automation use
- CI/CD platforms (GitHub Actions, GitLab CI, Jenkins, etc.)
- SCIM-compatible identity providers (Okta, etc.)
- Custom automation scripts and tools

### Requirements & Prerequisites
- Admin or Developer role to create API keys
- RBAC enabled for group-based permissions
- Secure storage for keys (shown only once at creation)

---

## Documentation References

- Primary docs: `/docs/studio/api-keys`
- API key permissions: `/docs/studio/api-keys/api-key-permissions`
- API key resources: `/docs/studio/api-keys/api-key-resources`
- Groups: `/docs/studio/groups`
- CLI reference: `/docs/cli/intro`

---

## Keywords & SEO

### Primary Keywords
- API key management
- GraphQL API keys
- Automation credentials

### Secondary Keywords
- CI/CD API access
- Programmatic GraphQL access
- Federation automation

### Related Search Terms
- How to create API keys for GraphQL
- Secure CI/CD credentials for federation
- SCIM API key configuration

---

## Version History

| Date | Version | Changes |
|------|---------|---------|
| 2025-01-14 | 1.0 | Initial capability documentation |
