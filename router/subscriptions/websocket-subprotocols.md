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

### Websocket authentication

Cosmo Router supports WebSocket authentication and offers two configurable options for handling it
* via Headers
* via Initial Payload

#### Default Behavior
By default, the Router expects the JWT (JSON Web Token) to be included in the request headers. This token is then used to authenticate the WebSocket connection.

#### Configurable Options
* Authentication via Initial Payload

  The Router can be configured to authenticate WebSocket connections using the JWT provided in the initial payload of the request, instead of the request headers.

  When this option is enabled, the Router looks for the JWT in the initial payload, under the specified property name. The default property name is "Authorization" but this can be customized.

* Forwarding JWT to Subgraphs

  The Router can also be configured to forward the JWT token from the initial payload to subgraphs via the request headers. If the header key used to store the JWT differs from the default "Authorization" key, ensure this key is included in the forward_upgrade_headers list to forward it properly.

```yaml
# config.yaml

websocket:
  enabled: true
  authentication:
    from_initial_payload:
      enabled: true
      key: "Authorization" # The property name in the initial payload holding the JWT. Default is 'Authorization'.
      export_token: 
        enabled: true
        header_key: "Authorization" # Header key for exporting the JWT to the request header. If different from 'Authorization', include it in 'forward_upgrade_headers'.
  forward_upgrade_headers: # Forward upgrade request headers in the extensions payload when starting a subscription on a Subgraph.
    enabled: true
    allow_list: ["Authorization"] # Headers to forward when initiating a subscription on a subgraph. Default is 'Authorization'.
```
