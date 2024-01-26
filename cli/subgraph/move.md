---
description: Move a subgraph into a different namespace
---

# Move

## Usage

```bash
npx wgc subgraph move <name> -n fromNS -t toNS
```

{% hint style="info" %}
Moving a subgraph will result in a new graph composition but only federated graphs from the target namespace are respected.
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
