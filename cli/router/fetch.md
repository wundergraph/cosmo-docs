---
description: Fetches the latest valid router execution config of a federated graph.
---

# Fetch

## Usage

```bash
npx wgc router fetch production -o config.json
```

## Description

The `npx wgc router fetch` command allows you to fetch the latest valid router execution config of a federated graph from the Cosmo platform's control plane. The config can be piped into a file, which the router can read with the `ROUTER_CONFIG_PATH` environment variable.

## Parameters

* `<name>`: The name of the federated graph for which you want to retrieve the router config.

## Options

* `-o, --out` : Destination file for the router config. Prints to standard output if not provided.

## Examples

Fetch the latest router execution config of the federated graph named "production."

```bash
npx wgc router fetch production -o config.json
```

Fetch the latest router config of the federated graph named "production" and save it to a file named "config.json"
