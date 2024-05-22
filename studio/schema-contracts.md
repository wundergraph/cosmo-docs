---
description: >-
  Schema Contracts enable you to build a multi-purpose, multi-audience Graph,
  which can be split into Subsets for different use cases. This simplifies
  development and keeps your Graph maintainable.
---

# Schema Contracts

### Use Cases

#### Tailored APIs for specific Consumers

Federation aims to combine all your Services into a unified Graph, making them more accessible and easier to consume.

As your Graph grows in size across different domains, you'd eventually want to tailor the API experience towards specific user groups.

Schema Contracts give you a powerful solution to filter out unnecessary parts of the Schema for some API consumers, giving them a tailored Developer Experience that's geared towards their expectations and not bloated with irrelevant fields.

#### Improving Security and Data Privacy

Another important concern is Security. Schema Contracts allow you to filter out fields and types that should only be accessible to a specific audience, e.g. admins or internal users.

If you're building a unified Graph that spans use cases from internal to partners or even public, you'd want to filter out those parts from the Schema that could leak internal information.

### Overview

With Schema Contracts, you can apply a Filter to Monographs and Federated Graphs, simply by annotating your Schema with tags and filtering out some of them.

<figure><img src="../.gitbook/assets/image (113).png" alt=""><figcaption><p>Example of dividing a Composed Schema into two Client Schemas using Schema Contracts</p></figcaption></figure>

## Terminology

* `Source Graph`: A federated graph or monograph whose schema is to be filtered out.
* `Contract Graph / Contract` : A federated graph or monograph that is the filtered version of the source graph.

## Schema Design

Contracts use the `@tag` directive to detect which schema elements need to be removed. You can apply the directive to objects, interfaces, inputs, types and fields. Here is an example: Consider the below subgraph to be published.

```graphql
type Query {
  employees: [Employee!]!
}


type Employee @key(fields: "id") {
  id: ID!
  name: String!
  phoneNumber: String! @tag(name: "internal")
}
```

We do not want to expose the phone number to certain clients. Therefore we tag that field as `internal`. The composed schema will additionally add the `@inaccessible` directive to the field.

## Creating and managing Contracts

### Create

A contract is created with the [`wgc contract create`](../cli/schema-contracts/create.md) command. You need to supply the list of tags that will be used to perform the filtering of the schema.  An example for the above subgraph would be&#x20;

<pre class="language-bash"><code class="lang-bash"><strong>npx wgc contract create prod-external \
</strong>    --source production \
    --exclude internal \
    --routing-url http://router.example.com/graphql
</code></pre>

### Update Tags

You can update the tags to be filtered out for the contract using the [`wgc contract update`](../cli/schema-contracts/update.md) command. This will trigger a recomposition of the contract graph and generate new schemas.

### Caveats to remember

* A contract will be of the same type as the source graph i.e federated graph or monograph.
* Federated graph/monograph commands will work with a contract graph. (Exceptions are move and monograph publish. More details below)
* If the monograph is migrated into a federated graph, all connected contracts will also be migrated.
* If it is a federated graph, the label matchers will be the same as the source graph and cannot be updated. This ensures that both the source graph and contract compose the same subgraphs. Hovever, an update to the label matchers to the base federated graph will be propogated to all its contract graphs.
* A contract graph cannot be moved to another namespace on it's own. it will automatically be moved when the source graph is moved.
* You cannot directly publish to the contract if it is a monograph. It will automatically recompose if the source graph is published.
* <mark style="color:red;">**A contract is automatically deleted if the source graph is deleted**</mark>

## Generated Schemas

When composing a graph, 2 schemas are generated.&#x20;

1. `Router Schema`: This  schema is utilized internally by the router to plan your operations. It encompasses all necessary fields, including ones with @inaccessible as they are still vital for accurate query planning.
2. `Client Schema`: Derived from the Router Schema, this schema excludes elements tagged for removal. It serves as the schema accessible to clients for utilization and is also the one exposed for introspection queries.

## Compositions

A contract schema is recomposed when the following events occur

* The contract is created.
* In case of federated graphs, if any subgraph is moved, updated, added or deleted.
* If the source federated graph is moved to a new namespace.
* If the label matchers of the source federated graph is changed.
* In case of monograph, if the source monograph is published with a new schema.
* The contract routing URL  has changed.

## Schema checks

* Since contracts compose the same subgraphs as the source graphs, schema checks are automatically run against all of them.
* A schema check will fail if there are composition errors or if client usage is detected for any of the contract graphs.

## Router deployments

Since the contract is a graph of its own, they will have their own router which will serve their respective graphs. This also means that things like analytics and persisted operations are scoped to each graph and its router.
