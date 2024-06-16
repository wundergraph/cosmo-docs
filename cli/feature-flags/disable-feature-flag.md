# Disable Feature Flag

## Usage

```bash
wgc feature-flag disable my-flag -n default
```

## Description

Disable Feature Flags for your Federated Graph using the WunderGraph Cosmo CLI `feature-flag disable` command. By default, the WunderGraph Cosmo CLI `feature-flag disable` command will look for Feature Flags in the `default` Namespace. To disable a Feature Flag in a different Namespace, supply the `--namespace` or `-n` parameter when executing the `feature-flag disable` command.

**Disable Feature Flag**&#x20;

```sh
wgc feature-flag disable my-flag
```

**Disable Feature Flag  in `production` Namespace**

```shell
wgc feature-flag disable my-flag --namespace production
```

If successful, a `Feature Flag was Disabled Successfully` message will be displayed in the console. Note that disabling a Feature Flag will fail where either Composition Errors or Deployment Errors are detected. Composition Errors occur when errors are encountered in composing the Federated Graph. Deployment Errors occur when composition is successful but pushing the resulting schema to the associated WunderGraph CLI Router was not. In either event, check the output of the WunderGraph Cosmo CLI for added context and additional troubleshooting instructions.

## Parameters

* `<name>`: The name of the feature flag you want to disable.

## Options

* `-n, --namespace` : The namespace of the subgrah (Default: "default").
