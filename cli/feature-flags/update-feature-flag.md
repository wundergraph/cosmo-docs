# Update Feature Flag

## Usage

```bash
wgc feature-flag update my-flag -n default --feature-graphs myfg1 myfg2
```

## Description

Update Feature Flags for your Federated Graph using the WunderGraph Cosmo CLI `feature-flag update` command. To update a Feature Flag in a specific Namespace, supply the `--namespace` or `-n` parameter when executing the `feature-flag update` command.

**Update Feature Flag**&#x20;

```shell
wgc feature-flag update my-flag ...
```

**Update Feature Flag  in `production` Namespace**

```shell
wgc feature-flag update my-flag --namespace production ...
```

To update the Labels applied to a Feature Flag, utilize the `--label` parameter when executing the `feature-flag update` command.

**Update Feature Flag with `foo=bar` Label**

```shell
wgc feature-flag update my-flag --label foo=bar
```

To update the Feature Graph associated with a Feature Flag, supply the `--feature-graphs` or `--fg` parameter with a list of Feature Graph names. Note that the Feature Graphs supplied to the `feature-flag update` command will overwrite any existing Feature Flag -> Feature Graph associations.

**Update Feature Flag Feature Graph Associations**

```shell
wgc feature-flag update my-flag --feature-graphs my-graph
```

If successful, a `Feature Flag was Updated Successfully` message will be displayed in the console.&#x20;

Note that updating a Feature Flag will fail where either Composition Errors or Deployment Errors are detected. Composition Errors occur when errors are encountered in composing the Federated Graph. Deployment Errors occur when composition is successful but pushing the resulting schema to the associated WunderGraph CLI Router was not.&#x20;

Additionally, Feature Flag updates will fail where any of the following are true:

* A Feature Flag with the same name already exists in the same Namespace;
* The Feature Graph provided to the `--feature-graphs` parameter does not exist or cannot be found in the same Namespace in which the Feature Flag is to be created;

In either event, check the output of the WunderGraph Cosmo CLI for added context and additional troubleshooting instructions.

## Parameters

* `<name>`: The name of the feature flag you want to update.

## Required Options

`--fg, --feature-graphs:` The names of the feature graphs that will form the feature flag. The feature graphs are passed in the format .The feature flag must have at least one feature graph. Multiple values are space separated.

## Options

* `-n, --namespace` : The namespace of the subgrah (Default: "default").
* `--label [labels...]:`The labels to apply to the feature flag. The labels are passed in the format `key=value.` Multiple values are space separated.
