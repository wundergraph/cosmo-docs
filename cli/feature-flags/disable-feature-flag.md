---
description: How to disable a feature flag.
---

# Disable Feature Flag

## Description

Disable (deactivate) an existing feature flag within the specified namespace (or the "default" namespace if unspecified). A feature flag is a group of one or more [feature subgraphs](../feature-subgraphs/). Each feature subgraph represents a replacement of a specific base subgraph that composes a federated graph.

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

