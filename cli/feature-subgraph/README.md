---
description: An overview of feature-subgraph (alias "fs") commands.
---

# Feature Subgraph

Federated graphs are composed of "base subgraphs". Feature subgraphs represent a replacement (or "override") for a specific base subgraph. A feature subgraph exists only as long as its base subgraph also exists.

Creating a feature subgraph does nothing in isolation. It must be added to an enabled [feature flag](../../concepts/feature-flags.md) to be considered by composition.

## Minimum Requirements

| Package                    | Minimum version |
| -------------------------- | --------------- |
| [wgc](broken-reference)    | 0.58.0          |
| [router](broken-reference) | 0.95.0          |

{% content-ref url="create-feature-subgraph.md" %}
[create-feature-subgraph.md](create-feature-subgraph.md)
{% endcontent-ref %}
