# Create Feature Graph

## Usage

```bash
wgc feature-graph create my-feature-graph --subgraph my-subgraph --routing-url http://localhost:4000
```

## Description

Create Feature Graphs for your Federated Graph using the WunderGraph Cosmo CLI `feature-graph create` command. A name for the Feature Graph to be created must be provided as the first argument to the above command. Feature Graphs must be associated with an existing Subgraph in the same namesapce. To associate a Feature Graph with a given Subgraph, supply the `--subgraph` parameter with the name of the Subgraph. A Routing URL for the Feature Graph must be provided. To provide a Routing URL for a Feature Graph, supply the `--routing-url` or `-r` parameter with the location at which the Feature Graph will be accessible.

Note that, by default, Feature Graphs are created in the `default` Namespace. To create a Feature Graph in a specific Namespace, supply the `--namespace` or `-n` parameter when executing the `feature-flag create` command.

## Parameters

* `<name>`: The name of the feature graph you want to create.

## Required Options

`-r , --routing-url`: The routing URL of your router. This URL defines the endpoint where the router will be accessible. The contract graph will be accessible through this router.

`-subgraph`: The subgraph name for which the feature graph is to be created.

## Options

* `-n, --namespace` : The namespace of the subgrah (Default: "default").
* `--routing-url`: Set the URL for the subgraph's data source. This URL defines the endpoint where the subgraph will fetch data from. Will produce an error if the `-edg` flag is set.&#x20;
  * Example: `--routing-url http://localhost:4001/graphql`
* `--subscription-url:` Optionally, use a different URL for subscription requests. If no subscription URL is provided, the router URL is used for subscriptions. Will produce an error if the `-edg` flag is set.&#x20;
* `--subscription-protocol:` Optionally, set a protocol to use for subscriptions. Will produce an error if the `-edg` flag is set. The available options are:
  * `ws` (default): Negotiate an appropriate protocol over websockets. Both `grapqhl-ws` and `subscription-transport-ws` are supported.
  * `sse`: Use Server-Sent Events with a GET request.
  * `sse_post`: Use Server-Sent events with a POST request.

If successful, a `Feature Graph was Created Successfully` message will be displayed in the console.

Note that Feature Graph creation will fail where any of the following are true:

* Any of the required parameters for creation (`--subgraph`, `--routing-url`) are not provided;
* The Subgraph specified to serve as the base for the Feature Graph does not exist in the same Namespace in which the Feature Graph is to be created;

In the event that Feature Flag creation fails, check the output of the WunderGraph Cosmo CLI for added context and additional troubleshooting instructions.

## Examples

1. Create a Feature Graph in the `default` namespace.

```bash
wgc feature-graph create my-feature-graph \
	--subgraph my-subgraph \
	--namespace default \
	--routing-url http://localhost:4000
```
