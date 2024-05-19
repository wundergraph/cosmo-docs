---
description: Creates a contract from a federated graph or monograph
---

# Create

## Usage

```bash
npx wgc contract create <name> --source <federated-graph-name> --exclude internal -r <routing-url> 
```

## Description

The `npx wgc contract create` command allows you to create a contract from a federated graph  or monograph by providing tags to exclude from the schema. This will create a new contract graph linked to the source graph.

## Parameters

* `<name>`: The name of the contract graph you want to create.

## Required Options

`-r , --routing-url`: The routing URL of your router. This URL defines the endpoint where the router will be accessible. The contract graph will be accessible through this router.

`--source`: The name of the source graph from which contract is created.

## Options

* `-n, --namespace` : The namespace of the contract graph and source graph (Default: "default").
* `--exclude` : The list of tags that need to be excluded from the source graph schema.
* `--admission-webhook-url <url>` the base url of the admission webhook. This is the url that the controlplane will use to implement admission control for the contract graph. Example: `https://admission.example.com` (without the `/validate-config` path name)
* `--readme` : The markdown file which describes the contract graph.

## Examples

```bash
npx wgc contract create production-external --source production --exlude internal,experimental -r http://router.example.com/graphql
```

Create a contract graph named `production-external` from the source graph schema of `production` that excluds all schema elements tagged with internal or experimental.&#x20;

