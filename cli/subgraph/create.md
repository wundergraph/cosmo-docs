---
description: Creates a federated subgraph on the control plane.
---

# Create

## Usage

```bash
npx wgc subgraph create [subgraphName] --label [labelName] --routing-url [url]
```

## Description

The `npx wgc subgraph create` command allows you to create a new subgraph within the Cosmo platform. Subgraphs are isolated GraphQL schemas that can be independently deployed and managed, providing modularity and scalability to your GraphQL APIs. The `[subgraphName]` argument specifies the name of the new subgraph, while the `--label` and `--routing-url` options allow you to add custom metadata and define the endpoint for the subgraph's data. Use `npx wgc subgraph create -h` to see all the available options.

## **Parameters**

* `[subgraphName]`: The name of the subgraph you want to create. It should be a unique and descriptive identifier for the new subgraph.

## **Options**

* `-n, --namespace` : The namespace of the federated graph (Default: "default").
* `--label`: Assign multiple labels to the new subgraph. Labels are used to categorize and organize subgraphs based on specific criteria (e.g., team, department, project).
  * Example: `--label team=A`
* `--routing-url`: Set the URL for the subgraph's data source. This URL defines the endpoint where the subgraph will fetch data from.
  * Example: `--routing-url http://localhost:4001/graphql`
* `--subscription-url:` Optionally, use a different URL for subscription requests. If no subscription URL is provided, the router URL is used for subscriptions.
* `--subscription-protocol:` Optionally, set a protocol to use for subscriptions. The available options are:
  * `ws` (default): Negotiate an appropriate protocol over websockets. Both `grapqhl-ws` and `subscription-transport-ws` are supported.
  * `sse`: Use Server-Sent Events with a GET request.
  * `sse_post`: Use Server-Sent events with a POST request.
* `--readme <path-to-readme>:` The path to the markdown file which describes the subgraph.



## **Example**

1.  Create a new subgraph named "products" with the label "team=A" and the routing URL "[http://localhost:4001/graphql](http://localhost:4001/graphql)":

    <pre class="language-bash"><code class="lang-bash"><strong>npx wgc subgraph create products --label team=A --routing-url http://localhost:4001/graphql
    </strong></code></pre>

\
