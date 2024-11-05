---
description: >-
  A Step-by-Step Guide to Running and Enhancing Your Federated Graph for Rapid
  Development.
icon: newspaper
---

# Mastering Local Development for GraphQL Federation

## Overview

In development, you aim to test your schema changes as quickly as possible, bypassing the need to check and update your federated graph on the control plane. This approach does not replace the necessity of pushing your subgraph to the control plane in production; however, it serves as a more expedient method for iterating on your graph during the development phase.

{% hint style="info" %}
If you want to start your router in production with a static config please use the [fetch](../cli/router/fetch.md) command instead. This will fetch the latest valid production config from the control plane. [wgc router compose](../cli/router/compose.md) should only be used for local development.
{% endhint %}

## Prerequisites

1. Install the latest [`wgc`](https://www.npmjs.com/package/wgc)
2. Download and extract the latest router [here](https://github.com/wundergraph/cosmo/releases?q=router\&expanded=true)

## Getting started

### 1. Add your subgraphs

In order to compose locally, we need to create a `compose.yaml` file that includes all the subgraphs you wish to include and compose into a federated graph.\
\
The information you are required to provide is as follows:

{% code title="compose.yaml" %}
```yaml
version: 1
subgraphs:
  - name: subgraph-a
    routing_url: http://localhost:4001/graphql
    # a) Specify a schema to introspect by file OR
    schema:
      file: ../schemas/subgraph-a.graphqls
  - name: subgraph-b
    routing_url: http://localhost:4002/graphql
    # b) Specify introspection to introspect on a running subgraph
    introspection:
      url: http://localhost:4002/graphql
      headers:
        Authorization: 'Bearer YOUR_TOKEN_HERE'
```
{% endcode %}

<table><thead><tr><th width="216">Property</th><th width="434">Description</th><th>Required</th><th data-hidden></th></tr></thead><tbody><tr><td>name</td><td>The unique name of the subgraph</td><td>true</td><td></td></tr><tr><td>routing_url</td><td>The unique url (endpoint) of the subgraph (typically ends with <code>/graphql</code>)</td><td>true</td><td></td></tr><tr><td>introspection.url</td><td>Required if you want to dynamically introspect a running subgraph server</td><td>false</td><td></td></tr><tr><td>introspection.headers</td><td>Headers to pass on the introspection request</td><td>false</td><td></td></tr><tr><td>schema.file</td><td>Path to the subgraph GraphQL schema</td><td>false</td><td></td></tr></tbody></table>

### 2. Generate the Router config

After you have configured everything, you can generate the static router config as follows:

```bash
wgc router compose -i compose.yaml -o router.json
```

This command introspects all your subgraphs and produces a `router.json` that can be passed to the router in the next step.

### 3. Run the config with the router

Create a `config.yaml` file in the same directory as your router binary.

<pre class="language-yaml" data-title="config.yaml"><code class="lang-yaml">dev_mode: true
execution_config: 
  file:
    # Path to the previous generated file
    path: "router.json" # or EXECUTION_CONFIG_FILE_PATH
    watch: true # EXECUTION_CONFIG_FILE_WATCH
graph:
   # Result of `wgc router token create`. Can be omitted for local testing.
<strong>   token: "" # GRAPH_API_TOKEN
</strong></code></pre>

We enabled the file watcher to hot-reload the server whenever you regenerate the `router.json` file. This is super handy for rapid-development.

{% hint style="info" %}
If you omit the token, analytics and tracing are disabled. For production create a token  [`wgc router token create`](../cli/router/token/create.md) and use polling instead. This ensures that the latest valid config is deployed to your routers automatically.
{% endhint %}

### 4. Open the playground

Finally, run the router and go to [`localhost:3002`](http://localhost:3002) . You will see a playground and you're ready to test your changes.

```bash
./router
```
