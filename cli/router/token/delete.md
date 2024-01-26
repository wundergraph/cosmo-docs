---
description: Deletes a router token of a federated graph.
---

# Delete

## Usage

```bash
npx wgc router token delete <name> -g <graphName>
```

## Description

The `npx wgc router token delete` command deletes a token of a federated graph.

## Parameters

* `<name>`: The name of the token to be deleted.&#x20;

## Required Options

```bash
-g <graphName>, --graph-name <graphName>
```

The name of the federated graph that the token should be deleted from.

## Options

`-n, --namespace` : The namespace of the federated graph (Default: "default").

## Examples

```bash
npx wgc router token delete graphToken -g production
```

Deletes a token named "graphToken" of the federated graph named "production".&#x20;
