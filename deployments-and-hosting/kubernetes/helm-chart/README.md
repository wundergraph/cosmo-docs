---
description: >-
  Navigating the stars with the Cosmo Helm Chart. This chart is a collection of
  sub-charts that make up the Cosmo Platform. You can deploy it both locally and
  in production.
---

# Helm Chart

Please checkout to the Helm [directory](https://github.com/wundergraph/cosmo/tree/main/helm/cosmo) in the OpenSource repository. The structure is as follows:

1. [Local Development](https://github.com/wundergraph/cosmo/blob/main/helm/README.md) (`helm/README.md`): Instructions about how to develop the chart locally with Minikube or any other Kubernetes cluster.
2. [How to use the Chart ](https://github.com/wundergraph/cosmo/blob/main/helm/cosmo/README.md)(`helm/cosmo/README.md`): Explains how the umbrella chart is constructed.
3. [Sub-charts ](https://github.com/wundergraph/cosmo/tree/main/helm/cosmo/charts)(`helm/cosmo/charts`) The Cosmo Umbrella charts consist of multiple sub-charts.
   1. Controlplane
   2. GraphqlMetrics
   3. Studio
   4. Router
   5. CDN

Every helm chart contains a [CHART.md](https://github.com/wundergraph/cosmo/blob/main/helm/cosmo/CHART.md) that describes the available configuration options with default values and documentation. We auto-generate this on every update.

Storage components are managed through external Helm Charts from [Bitnami](https://artifacthub.io/packages/search?repo=bitnami\&sort=relevance\&page=1).

1. PostgresSQL
2. Keycloak
3. ClickHouse
4. Minio
5. Redis
