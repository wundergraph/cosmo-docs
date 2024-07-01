---
description: An overview of feature-subgraph commands. Alias is fs.
---

# Feature Subgraphs

{% hint style="info" %}
Coming Soon! The Feature Subgraph has not been released yet. We expect the feature to be available in the coming weeks.
{% endhint %}

Federated graphs are composed of "base subgraphs". Feature subgraphs represent a replacement (or "override") for a specific base subgraph. A feature subgraph exists only as long as its base subgraph also exists.

Creating a feature subgraph does nothing in isolation. It must be added to an enabled [feature flag](../feature-flags/) to be considered by composition.

{% content-ref url="create-feature-subgraph.md" %}
[create-feature-subgraph.md](create-feature-subgraph.md)
{% endcontent-ref %}
