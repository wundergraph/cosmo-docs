---
description: Move a subgraph into a different namespace
---

# Move

## Usage

```bash
npx wgc subgraph move <name> -n fromNS -t toNS
```

{% hint style="info" %}
**Moving** is an irreversible action. Only federated graphs from the target namespace are respected. However, the change will only be visible to the routers once the composition has been successful. Until then, the routers will operate with the most recent valid composition.
{% endhint %}

## Description

The `npx wgc subgraph move` command allows you to move a subgraph into a different namespace.

## Parameters

* `<name>`: The name of the subgraph you want to move.

## Options

* `-n, --namespace` : The namespace of the subgraph.
* `-t, --to`: The new namespace of the subgraph.

## Examples

1.  Moves the subgraph named "products" into the "production" namespace.

    ```bash
    npx wgc subgraph move products -n default -t production
    ```
