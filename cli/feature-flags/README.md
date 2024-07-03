---
description: An overview of feature-flag (alias "ff") commands.
---

# Feature Flags

A feature flag is a group of one or more [feature subgraphs](../feature-subgraph/). Each feature subgraph represents a replacement of a specific base subgraph that composes a federated graph. Feature flags define labels that dictate the federated graphs to which they will apply when enabled. Setting the corresponding feature-flag header or cookie value allows different graph constellations to be served to clients.

## Minimum Requirements

| Package                         | Minimum version                                                                |
| ------------------------------- | ------------------------------------------------------------------------------ |
| [wgc](../intro.md)              | [0.58.0](https://github.com/wundergraph/cosmo/compare/wgc@0.57.7...wgc@0.58.0) |
| [router](../../router/intro.md) | [0.95.0](https://github.com/wundergraph/cosmo/releases/tag/router%400.95.0)    |

{% content-ref url="create-feature-flag.md" %}
[create-feature-flag.md](create-feature-flag.md)
{% endcontent-ref %}

{% content-ref url="disable-feature-flag.md" %}
[disable-feature-flag.md](disable-feature-flag.md)
{% endcontent-ref %}

{% content-ref url="enable-feature-flag.md" %}
[enable-feature-flag.md](enable-feature-flag.md)
{% endcontent-ref %}

{% content-ref url="update-feature-flag.md" %}
[update-feature-flag.md](update-feature-flag.md)
{% endcontent-ref %}
