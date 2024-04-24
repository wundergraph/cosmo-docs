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

The router configuration includes a Graph Plan, which encapsulates all the necessary information for planning and executing queries. It also specifies the URLs of your subgraphs. This configuration can be periodically fetched from the CDN or downloaded via `wgc` cli to the file system. In either scenario, the content originates from our platform. It is crucial to detect and mitigate tampering attacks, where an adversary might alter the configuration to reroute your traffic to an unauthorized server. To address this concern, we have developed a feature named "Config Validation & Signing" to identify and prevent such attacks.

When setting up a federated graph, you must use the `--admission-webhook-url` option, pointing it to your publicly accessible admission server. **For security reasons, ensure your admission server uses HTTPS as transport prototcol.**

Our system will invoke the `/validate-config` handler on your server each time a composition occurs. Only in case of a successful composition and proper response of your admission hook the config is made available to your router.

The payload for this operation will be structured as follows:

{% code title="POST - /validate-config" %}
```json
{
    "federatedGraphId": "1cab819a-c319-4fe1-a644-5360970eb083",
    "organizationId": "1e49b02a-72fb-458b-8d05-bb89cba2af05",
    "privateConfigUrl": "https://cdn.wundergraph.com/orgId/graphId/routerconfigs/draft.json?token=..."
}
```
{% endcode %}

It is your responsibility to retrieve the router configuration by making a GET request to the `privateConfigUrl` validate the configuration, and then return a [HMAC-SHA256](https://en.wikipedia.org/wiki/HMAC) of the configuration, encoded in BASE64. The `privateConfigUrl` contains a token that is short-lived (5min).

Webhook signature verification serves the same purpose as the signature verification of the router config. We want to ensure that the router config has not been tampered with after delivery. This procedure is very common today, almost all major webhook providers use the SHA-256 hash function in the [SHA-2](https://en.wikipedia.org/wiki/SHA-2) series for signature verification of their webhooks. These webhook providers include Stripe, GitHub and Okta.

After you have calculated the hash, the expected response must have a 200 status code and contain the **HMAC-SHA256** signature:

```json
{
    "signatureSha256": "3QYmdUS25ONvhWlm7K5ply65uvqoeGs4qxKWto5napo="
}
```

Alternatively, you can return a 400 status code with an error property to signal a validation error:

```json
{
    "error": "Invalid subgraph url detected"
}
```

This will prevent the controlplane to deploy the composition. The error will be visible on the composition detail page in the Studio.

### Router configuration

Upon receiving the signature, we will associate it with the artifact. The subsequent step involves initializing your router with the same signature key used during the hashing process on the admission server.

**Example configuration:**

{% code title="config.yaml" %}
```yaml
version: '1'
graph: 
  sign_key: 'sign_key' # or GRAPH_CONFIG_SIGN_KEY 
```
{% endcode %}

The router will then calculate the artifact's hash locally and compare it to the signature received from the CDN or filesystem. If the two match, the configuration is applied; otherwise, the router rejects it and terminates. If the router was already running successfully, it will continue to operate but will refuse to apply configurations that do not match the expected signature.

Instead of polling for updates from the CDN, the Graph Plan can also be passed via a file to the router. To leverage the same validation and signing mechanism in this approach, you must supply the `--graph-sign-key` parameter to the [`wgc router fetch`](../../cli/router/fetch.md) command as well. This ensures consistency in security measures, whether the configuration is obtained from the CDN or directly from a file.

## Example Implementation

The admission webook handler has to be publicly available. We provide an [example](https://github.com/wundergraph/cosmo/tree/main/admission-server) implementation In Hono, a framework that can be deployed to multiple platform like Cloudflare Worker, Fastly, Deno, Bun or Node.js.

