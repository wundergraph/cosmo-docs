---
description: >-
  Creates a token scoped to a federated graph. The token permits the router to
  communicate with the controlplane and send metrics to the OTEL collectors.
---

# Create

## Usage

```bash
npx wgc router token create <name> -g <graphName>
```

## Description

The `npx wgc router token create` command creates a new token for a federated graph. The token can be used to authenticate against the control plane from the routers.

## Parameters

* `<name>`: The name of the token to create. Only serves as a reference for the user.

## Required Options

```bash
-g <graphName>, --graph-name <graphName>
```

The name of the federated graph that the token should be created for.

## Examples

```bash
npx wgc router token create graphToken -g production
```

Create a new token named "graphToken" for the federated graph named "production". The token is displayed once in the CLI. Pass the token as an environment variable to the router [configuration](../../../router/configuration.md).

## Notes

* The token is only valid for a specific federated graph.
