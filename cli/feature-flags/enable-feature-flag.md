---
description: How to enable a feature flag.
---

# Enable Feature Flag

## Description

Enable (activate) an existing feature flag within the specified (otherwise "default") namespace. A feature flag comprises one or more "alternative subgraph versions", i.e., [feature subgraphs](../feature-subgraphs/), that can be applied to one or more federated graphs.

## Usage

{% hint style="info" %}
If `feature-flag enable` is used when the feature flag is already enabled, no changes (nor errors) will occur.
{% endhint %}

```bash
wgc feature-flag enable my-flag
```

The alias for `feature-flag` is `ff`.

Note that unless specified by the `--namespace` parameter, the namespace will be automatically passed as "default".

{% hint style="danger" %}
If either the base composition (the federated graph with the original subgraphs) or the feature flag composition fail, the router execution config will not be updated with the feature flag configuration.
{% endhint %}

## Parameters

* `<name>`: The name of the feature flag to enable. Returns an error if the feature flag does not exist in the specified (otherwise "default") namespace.

## Options

* `-n, --namespace` : The namespace of the feature flag (defaults to "default"). Returns an error if the feature flag does not exist in that namespace.

## Examples

Enable the existing feature flag "my-flag" in the namespace "prod":

```sh
wgc feature-flag enable my-flag -n prod
```

