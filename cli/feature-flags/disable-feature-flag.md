---
description: How to disable a feature flag.
---

# Disable Feature Flag

## Description

Disable (deactivate) an existing feature flag within the specified (otherwise "default") namespace. A feature flag comprises one or more "alternative subgraph versions", i.e., [feature subgraphs](../feature-subgraphs/), that can be applied to one or more federated graphs.

## Usage

{% hint style="info" %}
If `feature-flag disable` is used when the feature flag is already disabled, no changes (nor errors) will occur.
{% endhint %}

```bash
wgc feature-flag disable my-flag
```

The alias for `feature-flag` is `ff`.

Note that unless specified by the `--namespace` parameter, the namespace will be automatically passed as "default".

## Parameters

* `<name>`: The name of the feature flag to disable. Returns an error if the feature flag does not exist in the specified (otherwise "default") namespace.

## Options

* `-n, --namespace` : The namespace of the feature flag (defaults to "default"). Returns an error if the feature flag does not exist in that namespace.

## Examples

Enable the existing feature flag "my-flag" in the namespace "prod":

```sh
wgc feature-flag disable my-flag -n prod
```

