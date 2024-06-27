---
description: How to update a feature flag.
---

# Update Feature Flag

## Description

Update an existing feature flag within the specified (otherwise "default") namespace. A feature flag comprises one or more "alternative subgraph versions", i.e., [feature subgraphs](../feature-subgraphs/), that can be applied to one or more Federated Graphs.

## Usage

```bash
wgc feature-flag update my-flag --feature-subgraphs fs1 fs2
```

The alias for `feature-flag` is `ff`.

Note that unless specified by the `--namespace` parameter, the namespace will be automatically passed as "default".

{% hint style="danger" %}
If either the base composition (the federated graph with the original subgraphs) or the feature flag composition fail, the router execution configuration will not be updated with the feature flag configuration.
{% endhint %}

## Parameters

* `<name>`: The name of the existing feature flag to update. Returns an error if the feature flag does not exist in the specified (otherwise "default") namespace.

## Options

* `--fs, --feature-subgraphs:` A list of names of the feature subgraphs that compose the feature flag. At least one feature subgraph name must be included, and multiple names are space delimited. Including a non-feature subgraph or a feature subgraph that does not exist in the specified (otherwise "default") namespace will produce an error. Including this option will overwrite the existing list.
* `-n, --namespace` : The namespace of the feature flag (defaults to "default"). Returns an error if the feature flag does not exist in that namespace.
* `--label [labels...]:`The labels to apply to the feature flag. The labels are passed in the format `key=value`, and multiple values are space delimited. Including this option will overwrite the existing list.

## Example

Update the existing feature flag "my-flag" in the namespace "prod" with multiple feature subgraphs and the labels `team=A` and `team=B`:

```shell
wgc feature-flag update my-flag \
    --feature-subgraphs my-graph my-other-graph \
    -n prod
    --label team=A team=B
```
