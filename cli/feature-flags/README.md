---
description: An overview of feature-flag commands. Alias is ff.
---

# Feature Flags

{% hint style="info" %}
Coming Soon! The Feature Flags has not been released yet. We expect the feature to be available in the coming weeks.
{% endhint %}

A feature flag is a group of one or more [feature subgraphs](../feature-subgraphs/). Each feature subgraph represents a replacement of a specific base subgraph that composes a federated graph. Feature flags define labels that dictate the federated graphs to which they will apply when enabled. Setting the corresponding feature-flag header or cookie value allows different graph constellations to be served to clients.

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
