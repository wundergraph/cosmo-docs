---
description: The following instructions help you install the Router Chart on Kubernetes.
---

# Router

**Chart Repository:** `oci://ghcr.io/wundergraph/cosmo/helm-charts/router`

**Source:** [Repository](https://github.com/wundergraph/cosmo/tree/main/helm/cosmo/charts/router)

{% hint style="info" %}
Helm releases are currently not part of any release automation. We update them as recent as possible in the repository above. Please reach out to us if you need something else.
{% endhint %}

## Install the Router

Install the router through our official [`OCI`](https://helm.sh/docs/topics/registries/) chart. Note that [Helm 3.8](https://helm.sh/docs/topics/registries/) or later is required.

Create the following file to not bother with cli flags.

{% code title="values.yaml" %}
```yaml
configuration:
  # -- The router token is used to authenticate the router against the controlplane (required)
  graphApiToken: "replace-me"
```
{% endcode %}

After that you can install the chart with the release name `router`. You can use the command also to upgrade a release e.g. after a configuration update.

<pre class="language-bash"><code class="lang-bash"><strong>helm upgrade --install router oci://ghcr.io/wundergraph/cosmo/helm-charts/router \
</strong><strong>    --version 0.0.1 \
</strong><strong>    --values ./values.yaml
</strong></code></pre>

### Use a custom Router config

Managing environment variables can be tedious. We also support providing a custom [router configuration](../../../router/configuration.md#config-file). To do so, you only need to create one and specify its name in the chart values. The config must exist in the same namespace as the router.

{% code title="router-config.yaml" %}
```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: router-config
  # Must be same as the router
  namespace: default
data:
  # key is important
  config.yaml: |
    log_level: debug
```
{% endcode %}

Now, specify the configuration name in the `existingConfigmap` of the chart values. Keep in mind that secrets should be passed as Kubernetes Secrets. Use `extraEnvVars` or  `extraEnvVarsSecret` to pass additional ones.

{% code title="values.yaml" %}
```yaml
existingConfigmap: "router-config"
```
{% endcode %}

### Inline router configuration

Instead of creating a separate configmap, you can also inline the configuration values as part of the router chart values. This is handy but should not be used for secrets. Secrets should be passed in the `configuration` section or through a custom secret map.

```yaml
# Use this section to pass the graphApiToken or to configure simple settings.
# -- You can use this to provide the router configuration via yaml. Values here have precedence over the configurations section.
# -- For a full list of available configuration options, see https://cosmo-docs.wundergraph.com/router/configuration
commonConfiguration: |-
  version: "1"
  log_level: "info"
```

### Install with a static Router Execution Config

If you follow the default instructions the execution config is polled from the controlplane. Sometimes this is not desired e.g. when you have a strict CI/CD workflow or SLA requirements. The following instructions, shows you how to deploy a Router with a static router execution config.

#### 1. Download the latest valid execution config

```bash
wgc router fetch <graph-name> -n <namespace> -o router.json
```

#### 2. Set the file content on the helm value

```bash
helm upgrade router oci://ghcr.io/wundergraph/cosmo/helm-charts/router \
    --version 0.0.1 \
    --set-file configuration.executionConfig=./router.json
    --values ./values.yaml
```

{% hint style="info" %}
Install the router with a static execution config is a legitimate way to deploy the schema but requires automation to update the router continuously.
{% endhint %}
