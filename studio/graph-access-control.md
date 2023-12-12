---
description: >-
  Utilizing resource-based access control enables (RBAC) for graphs ensuring
  that machines or users can access and manipulate only specific federated- and
  sub-graphs.
---

# Graph Access Control

{% hint style="info" %}
Resource-Based Access Control is an enterprise feature, please contact us to enable it.
{% endhint %}

Resource-Based Access Control (RBAC) is a method for restricting system access to authorized users, based on the resources they need to access. In this context, we are referring specifically to **federated-** and **sub-graphs**. While a user can always see any resource in his organization, not everyone can modify it. Graph Access Control works primarily in combination with [API-Keys](api-keys.md).

### Enable Access-Control

<figure><img src="../.gitbook/assets/enable-graph-rbac.png" alt=""><figcaption></figcaption></figure>

Go to your organization settings page and navigate to "Resource Based Access Control (RBAC)". After you have enabled it, all API Keys will remain functional without any restriction on resources. **Only new keys are affected**. Once you have created a new API Key, you can restrict the key to specific resources.&#x20;

This becomes useful when you want to issue keys for different systems (CI, IaC) and teams. The concept can be simplified as follows:

> All members can only create API Keys for resources they have access to. Exceptions are organization Admin and the creator of the resource.

<figure><img src="../.gitbook/assets/add-api-key-scoped (1).png" alt=""><figcaption></figcaption></figure>

### Subgraph Membership

A User can be part of one or multiple subgraphs. You add members to subgraph who are responsible for it within your organization. Only an organization admin or the creator of the resource can add members to subgraphs. Once a user becomes a member of the subgraph, they can create API keys that allow for its modification.

<figure><img src="../.gitbook/assets/add-subgraph-member (1).png" alt=""><figcaption></figcaption></figure>

### Federated Graphs

After RBAC is enabled, only organization admins and the creator of the federated graph have the ability to create API keys for it or modify it. Modifying, for example, involves changing the routing URL. Subgraph members are still capable of maintaining the subgraph independently. As you see, federated graphs are handled special because they are shared good within an organization and should only be maintained by Admins.

{% hint style="info" %}
Only the organization's admins can create an API key which has permissions to all the present and future resources of the organization.
{% endhint %}
