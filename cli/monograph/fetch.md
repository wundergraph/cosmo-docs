---
description: >-
  Fetches the latest valid SDL of a monograph. The output can be piped to a
  file. This is primarily used for debugging purposes
---

# Fetch

## Usage

```bash
npx wgc monograph fetch <name>
```

## Description

The `npx wgc monograph fetch` command allows you to fetch the latest valid Schema Definition Language (SDL) of a monograph from the Cosmo platform's control plane. You can use this command to retrieve the SDL and, if needed, pipe the output to a file.

## Parameters

* `<name>`: The name of the monograph you want to fetch. Replace `<name>` with the name of the monograph you wish to retrieve the SDL for.

## Options

* `-n, --namespace` : The namespace of the monograph (Default: "default").
* `-o, --out` : Destination file for the SDL. Prints to standard output if not provided.

## Examples

```bash
npx wgc monograph fetch production
```

Fetch the latest valid SDL of the monograph named "production."

```bash
npx wgc monograph fetch production -o production-schema.graphql
```

Fetch the latest valid SDL of the monograph named "production" and save it to a file named "production-schema.graphql."

## Notes

* The `npx wgc monograph fetch` command interacts with the Cosmo platform's control plane to fetch the latest valid SDL of the specified monograph. Ensure that you have the necessary permissions to perform this operation.
