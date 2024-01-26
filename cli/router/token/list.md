---
description: Lists router tokens of a federated graph.
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

```bash
-o, --out [string]
```

The option to write the output to a file. Replace `[string]` with the file path.

```bash
-r, --raw
```

The option to write the output to the console.

## Examples

```bash
npx wgc router token list production
```

Lists all the tokens of the federated graph named "production".&#x20;
