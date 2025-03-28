---
description: >-
  Fetches the latest valid SDL of a federated graph. The output can be piped to
  a file. This is primarily used for debugging purposes
---

# Fetch-Schema

## Usage

```bash
npx wgc federated-graph fetch-schema <name>
```

## Description

The `npx wgc federated-graph fetch-schema` command allows you to fetch the latest valid Schema Definition Language (SDL) of a federated graph from the Cosmo platform's control plane. You can use this command to retrieve the SDL and, if needed, pipe the output to a file.

{% hint style="info" %}
By default, the output schema is set to the **Router Schema**. To use the **Client Schema** instead, specify the `-c` or `--client-schema` flag to the command.
{% endhint %}

## Parameters

* `<name>`: The name of the federated graph you want to fetch. Replace `<name>` with the name of the federated graph you wish to retrieve the SDL for.

## Options

* `-n, --namespace` : The namespace of the federated graph (Default: "default").
* `-o, --out` : Destination file for the SDL. Prints to standard output if not provided.
* `-c, --client-schema`: Output the Client Schema instead of the default Router Schema.

## Examples

```bash
npx wgc federated-graph fetch-schema production
```

Fetch the latest valid SDL of the federated graph named "production."

```bash
npx wgc federated-graph fetch-schema production -o production-schema.graphql
```

Fetch the latest valid SDL of the federated graph named "production" and save it to a file named "production-schema.graphql."

```bash
npx wgc federated-graph fetch-schema production --client-schema
```

Fetch the latest valid client SDL of the federated graph named "production".

## Notes

* The `npx wgc federated-graph fetch-schema` command interacts with the Cosmo platform's control plane to fetch the latest valid SDL of the specified federated graph. Ensure that you have the necessary permissions to perform this operation.
