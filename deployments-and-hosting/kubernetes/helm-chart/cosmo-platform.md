---
description: >-
  The following instructions help you to install the Cosmo platform through our
  official Umbrella Chart on Kubernetes.
---

# Cosmo Platform

**Chart Repository:** `ghcr.io/wundergraph/cosmo/helm-charts/cosmo`

**ArtifactHub**: [https://artifacthub.io/packages/helm/cosmo-platform/cosmo](https://artifacthub.io/packages/helm/cosmo-platform/cosmo)

**Source:** [Repository](https://github.com/wundergraph/cosmo/tree/main/helm/cosmo)

{% hint style="info" %}
Helm releases are currently not part of any release automation. We update them as recent as possible in the repository above. Please reach out to us if you need something else.
{% endhint %}

## Install Cosmo

Install the chart through our official [`OCI`](https://helm.sh/docs/topics/registries/) chart. Note that [Helm 3.8](https://helm.sh/docs/topics/registries/) or later is required. Please copy the following chart [`values`](https://github.com/wundergraph/cosmo/blob/main/helm/cosmo/values.full.yaml) and adjust them according to your needs.

While we use only production-grade Helm Charts, we did not configure all of them for production. You can adjust them to your needs yourself, or you can [contact us](https://wundergraph.com/contact/sales) for assistance in configuration and deployment options.

After that, you can install the full Cosmo Platform with the following command.

<pre class="language-bash"><code class="lang-bash"><strong>helm upgrade --install cosmo oci://ghcr.io/wundergraph/cosmo/helm-charts/cosmo \
</strong><strong>    --version 0.0.1 \
</strong><strong>    --values ./values.yaml
</strong></code></pre>

This can take up to a minute depending on the hardware. It will provision all components and bootstrap the platform with a demo organization. The following credentials can be used to log into the Studio:

```bash
Username: foo@wundergraph.com
Password: wunder@123
```

If you want to interact from [wgc](broken-reference) with the controlplane, you can use the following credentials:

```bash
export COSMO_API_KEY="cosmo_669b576aaadc10ee1ae81d9193425705"
export COSMO_API_URL="<url-to-your-controlplane>"
npx wgc -h
```

{% hint style="warning" %}
Don't forget to change the credentials before going into production.
{% endhint %}
