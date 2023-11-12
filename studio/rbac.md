---
description: >-
  Role-based access control allows you to limit access to resources based on a
  user's role.
---

# RBAC

Role-Based Access Control (RBAC) is a security model that plays a crucial role in managing access to resources within an organization. RBAC simplifies access control by assigning permissions to roles rather than individuals. Users are then associated with specific roles, and their access rights are determined by the permissions linked to those roles. RBAC is widely used in various industries to establish a robust and structured access control system.

The roles provided in Cosmo are as follows

1. **Admin** - Can create and manage all services.
2. **Developer** - Write and Read access to all objects in the organization.
3. **Viewer** - Only read-only access to all objects in the organization.

You have the option to modify the roles of all users not integrated with Single Sign-On (SSO). This serves as a precaution to ensure consistent synchronization with your authorization server, such as Okta or Auth0. For additional details on Single Sign-On (SSO), please refer to the following page.

{% hint style="info" %}
Please [contact us](https://wundergraph.com/contact/sales) if the current permission model cannot be aligned with your organization's structure.
{% endhint %}
