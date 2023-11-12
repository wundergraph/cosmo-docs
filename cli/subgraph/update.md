---
description: Updates subgraph metadata like URL, labels on the control plane.
---

# Update

## Usage

```bash
npx wgc subgraph update <name> [-r, --routing-url <url>] [--label [labels...]]
```

{% hint style="info" %}
**Update** is an irreversible action. However, the change will only be visible to the routers once the composition has been successful. Until then, the routers will operate with the most recent valid composition. Please use [subgraph check](check.md) to understand the impact of your change.
{% endhint %}

## Description

The `npx wgc subgraph updatwe` command allows you to update an existing subgraph on the Cosmo platform's control plane. With this command, you can modify the routing URL and apply or change labels associated with the subgraph. Use `npx wgc subgraph update -h` to see all the available options.

## Parameters

* `<name>`: The name of the subgraph you want to update. This should be the exact name of the subgraph you wish to modify.

## Options

* `-r, --routing-url <url>`: The updated routing URL of your subgraph. This URL defines the endpoint where the subgraph will fetch data from. Use this option to change the subgraph's data source URL.
  * Example: `--routing-url http://new-domain.com/graphql`
* `--label [labels...]`: The labels to apply or change for the subgraph. Labels are passed in the format `<key>=<value> <key>=<value>`, where each `<key>=<value>` pair represents a label key and its corresponding value. Use this option to update the subgraph's metadata.
  * Example: `--label team=A`
* `--subscription-url:` Optionally, use a different URL for subscription requests. If no subscription URL is provided, the router URL is used for subscriptions. To remove a previously set subscription URL, use the flag without provided a URL argument.
* `--subscription-protocol:` Optionally, set a protocol to use for subscriptions. The available options are:
  * `ws` (default): Negotiate an appropriate protocol over websockets. Both `grapqhl-ws` and `subscription-transport-ws` are supported.
  * `sse`: Use Server-Sent Events with a GET request.
  * `sse_post`: Use Server-Sent events with a POST request.

## Examples

1.  Update the routing URL of the subgraph "products":

    ```bash
    npx wgc subgraph update products -r http://new-domain.com/graphql
    ```
2.  Update the labels for the subgraph "users":

    ```bash
    npx wgc subgraph update users --label team=B department=HR
    ```

## Notes

* The `npx wgc subgraph update` command interacts with the Cosmo platform's control plane to update the specified subgraph.
* If you want to update both the routing URL and labels, you can combine the options in a single command as demonstrated in the examples.
