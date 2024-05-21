---
description: >-
  This section explains how you can configure Websocket subprotocols both for
  local development and using Cosmo Studio.
---

# Websocket Subprotocols

The available WebSocket subprotocols are:-

* **auto**: This is the default subprotocol. If auto is selected, we negotiate with the subgraph for the subprotocol. The subprotocols **graphql-ws** and **graphql-transport-ws** are used for the negotiation. If the subgraph doesn't return a subprotocol, it falls back to **graphql-ws.**
* **graphql-ws**
* **graphql-transport-ws**

### How to set the WebSocket subprotocol

* While creating a subgraph, the WebSocket subprotocol can be set using the [create subgraph](../../cli/subgraph/create.md) command.

```bash
npx wgc subgraph create <name> -r <routing-url> --label [labels] --subscription-protocol ws --websocket-subprotocol <subprotocol>
```

* If the subgraph is already created, it can be updated using the [update subgraph](../../cli/subgraph/update.md) command.

```bash
npx wgc subgraph update <name> --websocket-subprotocol <protocol>
```

### Configure Subscriptions for local development

When composing a Graph locally, you can supply the subprotocol using the following configuration.

```yaml
version: 1
subgraphs:
  - name: employees
    routing_url: "http://localhost:4001/graphql"
    subscription:
      protocol: "ws"
      websocketSubprotocol: "graphql-ws"
```

