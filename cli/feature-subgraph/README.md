---
description: An overview of feature-subgraph (alias "fs") commands.
---

# Feature Subgraph

Federated graphs are composed of "base subgraphs". Feature subgraphs represent a replacement (or "override") for a specific base subgraph. A feature subgraph exists only as long as its base subgraph also exists.

Creating a feature subgraph does nothing in isolation. It must be added to an enabled [feature flag](../../concepts/feature-flags.md) to be considered by composition.

## Minimum Requirements

| Package                         | Minimum version                                                                |
| ------------------------------- | ------------------------------------------------------------------------------ |
| [wgc](../intro.md)              | [0.58.0](https://github.com/wundergraph/cosmo/compare/wgc@0.57.7...wgc@0.58.0) |
| [router](../../router/intro.md) | [0.95.0](https://github.com/wundergraph/cosmo/releases/tag/router%400.95.0)    |

{% content-ref url="create-feature-subgraph.md" %}
[create-feature-subgraph.md](create-feature-subgraph.md)
{% endcontent-ref %}

{% content-ref url="publish-feature-subgraph.md" %}
[publish-feature-subgraph.md](publish-feature-subgraph.md)
{% endcontent-ref %}

{% content-ref url="update-feature-subgraph.md" %}
[update-feature-subgraph.md](update-feature-subgraph.md)
{% endcontent-ref %}

{% content-ref url="delete-feature-subgraph.md" %}
[delete-feature-subgraph.md](delete-feature-subgraph.md)
{% endcontent-ref %}
