# Create Feature Graph

### Create

Create Feature Graphs for your Federated Graph using the WunderGraph Cosmo CLI `feature-graph create` command. A name for the Feature Graph to be created must be provided as the first argument to the above command. Feature Graphs must be associated with an existing Subgraph. To associate a Feature Graph with a given Subgraph, supply the `--subgraph` parameter with the name of the Subgraph. A Routing URL for the Feature Graph must be provided. To provide a Routing URL for a Feature Graph, supply the `--routing-url` or `-r` parameter with the location at which the Feature Graph will be accessible.

**Create Feature Graph**

```shell
wgc feature-graph create my-feature-graph \
	--subgraph my-subgraph \
	--routing-url http://localhost:4000
```

Note that, by default, Feature Graphs are created in the `default` Namespace. To create a Feature Graph in a specific Namespace, supply the `--namespace` or `-n` parameter when executing the `feature-flag create` command.

**Create Feature Graph in `production` Namespace**

```shell
wgc feature-graph create my-feature-graph \
	--subgraph my-subgraph \
	--routing-url http://localhost:4000 \
	--namespace production
```

Optionally, Subscriptions for a Feature Graph can also be configured during creation. To configure Subscriptions for a Feature Graph, supply the `--subscription-url` and `--subscription-protocol` parameters with the location at which Subscriptions can be established and the protocol to be used to establish them, respectively. The supported protocols are `ws`, `sse`, and `sse_post`. Note that, in the absence of a specified `--subscription-url` parameter, the Routing URL for the Feature Graph will be used for Subscriptions by default. Should you need to configure the a WebSocket Subprotocol for your Feature Graph, supply the `--websocket-subprotocol` parameter with the desired protocol to be used. The supported WebSocket Sub Protocols are `auto`, `graphql-ws`, or `graphql-transport-ws`.

**Create Feature Graph with Subscriptions**

```shell
wgc feature-graph create my-feature-graph \
	--subgraph my-subgraph \
	--routing-url http://localhost:4000 \
	--subscription-url http://localhost:4000 \
	--subscription-protocol sse
```

Additionally, the location of a README file for the Feature Graph can also be provided. To provide the location of a README for a Feature Graph, supply the `--readme` parameter with the file path at which the README is accessible.

**Create Feature Graph with README**

```shell
wgc feature-graph create my-feature-graph \
	--subgraph my-subgraph \
	--routing-url http://localhost:4000 \
	--readme /path/to/feature-graph/README.md
```

If successful, a `Feature Graph was Created Successfully` message will be displayed in the console.

Note that Feature Graph creation will fail where any of the following are true:

* Any of the required parameters for creation (`--subgraph`, `--routing-url`) are not provided;
* The Subgraph specified to serve as the base for the Feature Graph does not exist in the same Namespace in which the Feature Graph is to be created;
* The Subscription Protocol supplied to the `--subscription-protocol` parameter is not one of `sse`, `sse_post`, or `ws`;
* The `--websocket-subprotocol`parameter is provided, but the `--subscription-protocol` parameter is not set to `ws`; or
* The WebSocket Sub Protocol supplied to the `--websocket-subprotocol` parameter is not one of `auto`, `graphql-ws`, or `graphql-transport-ws`.

In the event that Feature Graph creation fails, check the output of the WunderGraph Cosmo CLI for added context and additional troubleshooting instructions.
