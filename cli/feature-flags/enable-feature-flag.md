# Enable Feature Flag

## Usage

```bash
wgc feature-flag enable my-flag -n default
```

## Description

Enable Feature Flags for your Federated Graph using the WunderGraph Cosmo CLI `feature-flag enable` command. By default, the WunderGraph Cosmo CLI `feature-flag enable` command will look for Feature Flags in the `default` Namespace. To enable a Feature Flag in a different Namespace, supply the `--namespace` or `-n` parameter when executing the `feature-flag enable` command.

**Enable Feature Flag**&#x20;

```sh
wgc feature-flag enable my-flag
```

**Enable Feature Flag  in `production` Namespace**

```shell
wgc feature-flag enable my-flag --namespace production
```

If successful, a `Feature Flag was Enabled Successfully` message will be displayed in the console. Note that enabling a Feature Flag will fail where either Composition Errors or Deployment Errors are detected. Composition Errors occur when errors are encountered in composing the Federated Graph. Deployment Errors occur when composition is successful but pushing the resulting schema to the associated WunderGraph CLI Router was not. In either event, check the output of the WunderGraph Cosmo CLI for added context and additional troubleshooting instructions.

## Parameters

* `<name>`: The name of the feature flag you want to enable.

## Options

* `-n, --namespace` : The namespace of the subgrah (Default: "default").
