---
description: How to get the latest release and stay up-to-date.
---

# Release Management

The Cosmo Platform is entirely Open Source.

## Releases

Tagged releases are published in the exact version to NPMJS.com and Github Container Registry.

### Release Notes

Every release contains a summary of features, bug fixes, breaking changes, and optionally a migration guide. You can find all official releases at [WunderGraph Cosmo Releases](https://github.com/wundergraph/cosmo/releases).

All published docker images are listed at [WunderGraph Cosmo Packages](https://github.com/orgs/wundergraph/packages?repo\_name=cosmo).

## Docker tagging strategy

For every pull request and merge into the main branch, we build separate Docker images.&#x20;

Official releases are tagged as follows:

```
ghcr.io/wundergraph/cosmo/router:0.9.0
```

Images built on main are tagged with:

```
ghcr.io/wundergraph/cosmo/router:latest
ghcr.io/wundergraph/cosmo/router:sha-12345
```

For more information, check out the release [documentation](https://github.com/wundergraph/cosmo/blob/main/docs/releasing.md).

## Router binaries

For every Router release, we build binaries for all operating systems and attach them to the [Github release](https://github.com/wundergraph/cosmo/releases/tag/router%400.22.1).

### Helm Charts

We publish Helm charts for the Cosmo Platform and the Router. You can find them on [Artifact Hub](https://artifacthub.io/packages/search?org=wundergraph).

* [cosmo-router](https://github.com/wundergraph/cosmo/tree/main/helm/cosmo/charts/router)
* [cosmo-platform](https://artifacthub.io/packages/helm/cosmo-platform/cosmo)

Both charts are part of the [Cosmo Repository](https://github.com/wundergraph/cosmo) :

* [Helm Chart Cosmo Router](https://github.com/wundergraph/cosmo/blob/main/helm/cosmo/charts/router/README.md)&#x20;
* [Helm Chart Cosmo Platform](https://github.com/wundergraph/cosmo/blob/main/helm/cosmo/README.md)

Versioned changes can be found in the respective changelog of each chart.

The charts are packaged as oci artifact here oci://ghcr.io/wundergraph/cosmo/helm-charts.

## Stay up-to-date

You can subscribe to notifications on the [Cosmo Repository](https://github.com/wundergraph/cosmo) for alerts when new releases are made available. Click on Watch -> Custom  -> Releases.&#x20;
