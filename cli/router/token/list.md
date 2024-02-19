---
description: >-
  Lists router tokens of a federated graph. Only shows metadata not the actual
  token.
---

# List

## Usage

```bash
npx wgc router token list <name>
```

## Description

The `npx wgc router token list` command lists all the tokens of a federated graph.&#x20;

## Parameters

* `<name>`: The name of the federated graph.&#x20;

## Options

`-n, --namespace` : The namespace of the federated graph (Default: "default").

## Examples

```bash
npx wgc router token list production
```

Lists all the tokens of the federated graph named "mygraph" within the _default_ namespace.
