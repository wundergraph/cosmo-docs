# Create Feature Flag

## Usage

```bash
wgc feature-flag create my-flag --feature-graphs my-graph
```

## Description

Create Feature Flags for your Federated Graph. A name for the Feature Flag to be created must be provided as the first argument to the above command. Further, Feature Flags must be associated with at least one Feature Graph. To associate a Feature Flag with a given [Feature Graph](../feature-graphs/), supply the `--feature-graphs` or `--fg` parameter with a list of Feature Graph names.

**Create Feature Flag with Multiple Feature Graphs**

```shell
wgc feature-flag create my-flag \
    --feature-graphs my-graph my-other-graph
```

By default, Feature Flags are created in the `default` Namespace. To create a Feature Flag in a specific Namespace, supply the `--namespace` or `-n` parameter when executing the  `wgc feature-flag create` command.

**Create Feature Flag  in `production` Namespace**

```shell
wgc feature-flag create my-flag \
    --feature-graphs my-graph \
    --namespace production 
```

To apply Labels to the Feature Flag, utilize the `--label` parameter when executing the `feature-flag create` command with a list of `<key>=<value>`pairs to apply.

**Create Feature Flag  with `foo=bar` Label**

```shell
wgc feature-flag create my-flag \
    --feature-graphs my-graph \
    --label foo=bar 
```

If successful, a `Feature Flag was Created Successfully` message will be displayed in the console.&#x20;

Note that updating a Feature Flag will fail where either Composition Errors or Deployment Errors are detected. Composition Errors occur when errors are encountered in composing the Federated Graph. Deployment Errors occur when composition is successful but pushing the resulting schema to the associated WunderGraph CLI Router was not.&#x20;

Additionally, Feature Flag creation will fail where any of the following are true:

* A Feature Flag with the same name already exists in the same Namespace;
* The Feature Graph provided to the `--feature-graphs` parameter does not exist or cannot be found in the same Namespace in which the Feature Flag is to be created;

In the event that Feature Flag creation fails, check the output of the WunderGraph Cosmo CLI for added context and additional troubleshooting instructions.

## Parameters

* `<name>`: The name of the feature flag you want to create.

## Required Options

`--fg, --feature-graphs:` The names of the feature graphs that will form the feature flag. The feature graphs are passed in the format .The feature flag must have at least one feature graph. Multiple values are space separated.

## Options

* `-n, --namespace` : The namespace of the subgrah (Default: "default").
* `--label [labels...]:`The labels to apply to the feature flag. The labels are passed in the format `key=value.` Multiple values are space separated.
