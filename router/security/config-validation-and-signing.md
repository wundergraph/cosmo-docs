---
description: >-
  The router configuration, updatable via CDN or file, employs a "Config
  Validation & Signing" feature to safeguard against tampering through external
  validation and signing.
---

# Config Validation & Signing

{% hint style="info" %}
Available since version [0.74.0](https://github.com/wundergraph/cosmo/releases/tag/router%400.74.0)
{% endhint %}

<figure><img src="../../.gitbook/assets/cosmo.wundergraph.com_wundergraph_default_graph_mygraph-with-admission_compositions (2).png" alt=""><figcaption><p>Validated &#x26; Signed composition</p></figcaption></figure>

The router configuration includes a Graph Plan, which encapsulates all the necessary information for planning and executing queries. It also specifies the URLs of your subgraphs. This configuration can be periodically fetched from the CDN or accessed directly from the file system. In either scenario, the content originates from our platform. It is crucial to detect and mitigate tampering attacks, where an adversary might alter the configuration to reroute your traffic to an unauthorized server. To address this concern, we have developed a feature named "Config Validation & Signing" to identify and prevent such attacks.

When setting up a federated graph, you must use the `--admission-webhook-url` option, pointing it to your publicly accessible admission server. Our system will invoke the `/validate-config` handler on your server each time a composition occurs. Only in case of a successful composition and proper response of your admission hook the config is made available to your router.

The payload for this operation will be structured as follows:

{% code title="POST - /validate-config" %}
```json
{
    "federated_graph": "1cab819a-c319-4fe1-a644-5360970eb083",
    "organization_id": "1e49b02a-72fb-458b-8d05-bb89cba2af05",
    "privateConfigUrl": "https://cdn.wundergraph.com/orgId/graphId/routerconfigs/draft.json?token=..."
}
```
{% endcode %}

It is your responsibility to retrieve the router configuration by making a GET request to the `privateConfigUrl`, validate the configuration, and then return a SHA-256 hash of the configuration, encoded in BASE64.

The expected response should have a 200 status code and contain the SHA-256 signature:

```json
{
    "signatureSHA256": "3QYmdUS25ONvhWlm7K5ply65uvqoeGs4qxKWto5napo="
}
```

Optionally, you can return a non 200 status code, to signal a validation error. This will prevent the controlplane to deploy the composition.

### Router configuration

Upon receiving the signature, we will associate it with the artifact. The subsequent step involves initializing your router with the same signature key used during the hashing process on the admission server.

**Example configuration:**

{% code title="config.yaml" %}
```yaml
version: '1'
graph: 
  sign_key: 'sign_key' # or AUTH_SIGNATURE_KEY 
```
{% endcode %}

The router will then calculate the artifact's hash locally and compare it to the signature received from the CDN. If the two match, the configuration is applied; otherwise, the router rejects it and terminates. If the router was already running successfully, it will continue to operate but will refuse to apply configurations that do not match the expected signature.

Instead of polling for updates from the CDN, the Graph Plan can also be transmitted via a file. To leverage the same validation and signing mechanism in this approach, you must supply the `--graph-sign-key` parameter to the [`wgc router fetch`](../../cli/router/fetch.md) command as well. This ensures consistency in security measures, whether the configuration is obtained from the CDN or directly from a file.

## Example Implementation

The admission webook handler has to be publicly available. We provide an [example](https://github.com/wundergraph/cosmo/tree/main/admission-server) implementation In Hono, a framework that can be deployed to multiple platform like Cloudflare Worker, Fastly, Bun or Node.js.

