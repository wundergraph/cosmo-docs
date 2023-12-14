---
description: >-
  Navigating the stars with the Cosmo Helm Chart. This chart is a collection of
  sub-charts that make up the Cosmo Platform. You can deploy it both locally and
  in production.
---

# Helm Chart

{% hint style="info" %}
Not all charts have been published yet. The source code is available in the OSS Repository [here](https://github.com/wundergraph/cosmo/tree/main/helm/cosmo).
{% endhint %}

Please checkout to the Helm [directory](https://github.com/wundergraph/cosmo/tree/main/helm/cosmo) in the OpenSource repository. The structure is as follows:

1. [Local Development](https://github.com/wundergraph/cosmo/blob/main/helm/README.md) (helm/README.md): Instructions about how to develop the chart locally with Minikube or any other Kubernetes cluster.
2. [How to use the Chart ](https://github.com/wundergraph/cosmo/blob/main/helm/cosmo/README.md)(helm/cosmo/README.md): Explains how the umbrella chart is constructed.
3. [Sub-charts ](https://github.com/wundergraph/cosmo/tree/main/helm/cosmo/charts)helm/cosmo/charts) The Cosmo Umbrella charts consist of multiple sub-charts.
   1. Controlplane
   2. GraphqlMetrics
   3. Studio
   4. Router
   5. CDN

Every helm chart contains a [CHART.md](https://github.com/wundergraph/cosmo/blob/main/helm/cosmo/CHART.md) that describes the available configuration options with default values and documentation. We auto-generate this on every update.

## Install the Router

Install the router through our official [`OCI`](https://helm.sh/docs/topics/registries/) chart. Note that [Helm 3.8](https://helm.sh/docs/topics/registries/) or later is required.

Create the following file to not bother with cli flags.

{% code title="values.yaml" %}
```yaml
configuration:
  # -- The name of the graph to be served by the router (required)
  federatedGraphName: "production"
  # -- The router token is used to authenticate the router against the controlplane (required)
  graphApiToken: "replace-me"
```
{% endcode %}

After that you can install the chart.

<pre class="language-bash"><code class="lang-bash"><strong>helm install router oci://ghcr.io/wundergraph/cosmo/helm-charts/router \
</strong><strong>    --version 0.0.1 \
</strong><strong>    --values ./values.yaml
</strong></code></pre>

### Use a custom Router config

Managing environment variables can be tedious. We also support providing a custom router configuration. To do so, you only need to create one and specify its name in the chart values.

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

After running `helm upgrade router --values ./values.yaml`, your router should restart and pick up the changes.
