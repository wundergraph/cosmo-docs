---
description: An overview of feature-flag (alias "ff") commands.
---

# Feature Flags

A feature flag is a group of one or more [feature subgraphs](../feature-subgraph/). Each feature subgraph represents a replacement of a specific base subgraph that composes a federated graph. Feature flags define labels that dictate the federated graphs to which they will apply when enabled. Setting the corresponding feature-flag header or cookie value allows different graph constellations to be served to clients.

## Minimum Requirements

<table><thead><tr><th width="119">Package</th><th>Minimum version</th></tr></thead><tbody><tr><td><a href="../intro.md">wgc</a></td><td><a href="https://github.com/wundergraph/cosmo/compare/wgc@0.57.7...wgc@0.58.0">0.58.0</a></td></tr><tr><td><a href="../../router/intro.md">router</a></td><td><a href="https://github.com/wundergraph/cosmo/releases/tag/router%400.95.0">0.95.0</a></td></tr></tbody></table>

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
