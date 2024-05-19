---
description: >-
  This command updates the tag filters for the contract. To update other aspects
  of the contract graph please use the federated-graph or monograph update
  commands.
---

# Update

## Usage

```bash
npx wgc contract update <name> --source <contract-graph> --exclude internal
```

## Description

The `npx wgc contract update` command allows you to update the tag filters for the contract. This will result in overwriting existing ones and causes a recomposition of the contract graph.

## Parameters

* `<name>`: The name of the contract graph you want to update.

## Options

* `-n, --namespace` : The namespace of the federated graph (Default: "default").
* `--exclude` : The list of tags that need to be excluded from the source graph schema.

## Examples

```bash
npx wgc contract update production-external --exlude experimental,deprecated
```

Updates a contract graph named `production-external` with the new exclude tags; exprimental and deprecated.

