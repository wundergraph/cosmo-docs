---
description: Creates a federated graph on the control plane.
---

# Create

## Usage

```bash
npx wgc federated-graph create <name> -r <routing-url> --label-matcher <labels...>
```

## Description

The `npx wgc federated-graph create` command allows you to create a new federated graph on the Cosmo platform's control plane. Federated graphs provide a mechanism to combine multiple subgraphs into a unified schema, enabling efficient, scalable, and distributed GraphQL APIs. With this command, you can create a federated graph and specify the routing URL for your router and the labels used to select the subgraphs to be federated.

## Parameters

* `<name>`: The name of the federated graph you want to create. Replace `<name>` with the desired name for your federated graph.

## Required Options

```bash
-r <routing-url>, --routing-url <routing-url>
```

The routing URL of your router. This URL defines the endpoint where the router will be accessible. The federated graph will be accessible through this router.

```bash
--label-matcher <labels...>
```

The labels used to select the subgraphs to be federated. Labels are passed in the format `<key>=<value> <key>=<value>`, where each `<key>=<value>` pair represents a label key and its corresponding value. The federated graph will include the subgraphs that match the specified labels.

## Examples

```bash
npx wgc federated-graph create production -r http://router.example.com/graphql --label-matcher team=A department=backend
```

Create a federated graph named "production" with a routing URL of "[http://router.example.com/graphql](http://router.example.com/graphql)" and federate subgraphs with labels `team=A` and `department=backend`.

## Notes

* The `npx wgc federated-graph create` command interacts with the Cosmo platform's control plane to create the specified federated graph.
* The routing URL of the router should be accessible by the federated graph to handle incoming queries and route them to the appropriate subgraphs.
