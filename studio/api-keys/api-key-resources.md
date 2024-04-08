---
description: Configure the resources accessible to your api keys.
---

# API Key Resources

{% hint style="info" %}
Available only when RBAC (Resource-based access control) is enabled.
{% endhint %}

Once RBAC (Role-Based Access Control) is enabled, only users with access to specific graphs can create API keys for those resources. Administrators retain the ability to create API keys with access to all resources.&#x20;

Access to graphs follows these rules: for subgraphs, users must be a member of the subgraph or an admin; for federated graphs, users must either be an admin or the creator of the federated graph.

Once the API key is configured with specific resources, it will possess permissions solely to perform operations on those designated resources.

<figure><img src="../../.gitbook/assets/Screenshot 2024-04-08 at 2.13.54 AM.png" alt=""><figcaption></figcaption></figure>
