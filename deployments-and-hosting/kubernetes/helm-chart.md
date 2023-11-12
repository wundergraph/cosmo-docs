---
description: >-
  Navigating the stars with the Cosmo Helm Chart. This chart is a collection of
  sub-charts that make up the Cosmo Platform. You can deploy it both locally and
  in production.
---

# Helm Chart

{% hint style="info" %}
The chart isn't published yet on a registry but is available in the OSS Repository [here](https://github.com/wundergraph/cosmo/tree/main/helm/cosmo).
{% endhint %}

Please checkout to the Helm directory in the OpenSource repository. The structure is as follows:

1. [Local Development](https://github.com/wundergraph/cosmo/blob/main/helm/README.md) (helm/README.md): Instructions about how to develop the chart locally with Minikube or any other Kubernetes cluster.
2. [How to use the Chart ](https://github.com/wundergraph/cosmo/blob/main/helm/cosmo/README.md)(helm/cosmo/README.md): Explains how the umbrella chart is constructed.
3. [Sub-charts ](https://github.com/wundergraph/cosmo/tree/main/helm/cosmo/charts)helm/cosmo/charts) The Cosmo Umbrella charts consist of multiple sub-charts.

Every helm chart contains a [CHART.md](https://github.com/wundergraph/cosmo/blob/main/helm/cosmo/CHART.md) that describes the available configuration options with default values and documentation. We auto-generate this on every update.

