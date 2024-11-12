---
description: >-
  This command updates the tag filters for the contract. To update other aspects
  of the contract graph please use the federated-graph or monograph update
  commands.
---

# Update

## Usage

#### Exclude (the items that have the tag(s) specified will be removed from the source federated graph)

{% code fullWidth="false" %}
```bash
npx wgc contract update <name> --source <contract-name> --exclude internal
```
{% endcode %}

#### Include (the items that do _not_ have the tag(s) specified will be removed from the source federated graph)

{% code fullWidth="false" %}
```bash
npx wgc contract update <name> --source <contract-name> --include public
```
{% endcode %}

## Description

The `npx wgc contract update` command allows you to update the tag filters for the contract. This will result in overwriting existing ones and causes a recomposition of the contract graph.

## Parameters

* `<name>`: The name of the contract graph you want to update.

## Options

{% hint style="warning" %}
The --exclude and --include options are currently _mutually exclusive_. An error will be returned if more than one are defined. The undefined option will be automatically unset.
{% endhint %}

* `-n, --namespace` : The namespace of the federated graph (Default: "default").
* `--exclude` : The list of tags that should be excluded from the source graph schema.
* `--include` : The list of tags that should be included from the source graph schema.
* `--suppress-warnings`: This flag suppresses any warnings produced by composition.

## Examples

```bash
npx wgc contract update production-external --exclude experimental,deprecated
```

Updates a contract graph named `production-external` with the new exclude tags: `experimental` and `deprecated`.

```bash
npx wgc contract update production-external --include public,api
```

Updates a contract graph named `production-external` with the new include tags: `public` and `api`.
