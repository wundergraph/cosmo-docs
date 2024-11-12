# Move

## Usage

```bash
npx wgc federated-graph move <name> -n fromNS -t toNS
```

{% hint style="info" %}
Moving a federated graph will result in a new graph composition but only subgraphs from the target namespace are respected.
{% endhint %}

## Description

The `npx wgc federated-graph move` command allows you to move a federated-graph into a different namespace.

## Parameters

* `<name>`: The name of the federated-graph you want to move.

## Options

* `-n, --namespace` : The namespace of the federated-graph.
* `-t, --to`: The new namespace of the federated-graph.
* `--suppress-warnings`: This flag suppresses any warnings produced by composition.

## Examples

1.  Moves the federated-graph named "mygraph" into the "production" namespace.

    ```bash
    npx wgc subgraph move mygraph -n default -t production
    ```
