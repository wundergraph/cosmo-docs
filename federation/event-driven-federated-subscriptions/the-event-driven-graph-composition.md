---
description: What is an Event-Driven Graph and how is it composed?
---

# The Event-Driven Graph (composition)

## Minimum requirements

| Package      | Minimum version                                                                   |
| ------------ | --------------------------------------------------------------------------------- |
| controlplane | [0.82.1](https://github.com/wundergraph/cosmo/releases/tag/controlplane%400.82.1) |
| router       | [0.80.0](https://github.com/wundergraph/cosmo/releases/tag/router%400.80.0)       |
| wgc          | [0.50.3](https://github.com/wundergraph/cosmo/releases/tag/wgc%400.50.3)          |

An Event-Driven Graph (EDG) is best thought to be an abstract subgraph that facilitates Event-Driven Federated Subscriptions (EDFS). If a subgraph uses or defines any event driven directives (`@edfs__request`, `@edfs__publish`, and/or `@edfs__subscribe`), it will be interpreted to be an Event-Driven Graph.&#x20;

## Definitions

{% hint style="warning" %}
The `sourceName` argument, including the default value "default", _must_ correspond to an equivalent property in events.sources of the router config.yml.
{% endhint %}

### @edfs\_\_publish

{% code fullWidth="true" %}
```graphql
directive @edfs__publish(subject: String!, sourceName: String! = "default") on FIELD_DEFINITION

type edfs__PublishResult {
    success: Boolean!
}
```
{% endcode %}

<table data-full-width="true"><thead><tr><th width="177">Argument name</th><th width="232">Type</th><th>Value</th></tr></thead><tbody><tr><td>subject</td><td>String!</td><td>The event subject. See <a href="the-event-driven-graph-composition.md#root-field-arguments-and-event-subjects">subjects</a>.</td></tr><tr><td>sourceName</td><td>String!</td><td>The source name, which identifies the connection in the router config.yaml.<br>If unsupplied, the default value "default" will be used.</td></tr></tbody></table>

### @edfs\_\_request

{% code fullWidth="true" %}
```graphql
directive @edfs__request(subject: String!, sourceName: String! = "default") on FIELD_DEFINITION
```
{% endcode %}

<table data-full-width="true"><thead><tr><th width="176">Argument name</th><th width="238">Type</th><th>Value</th></tr></thead><tbody><tr><td>subject</td><td>String!</td><td>The event subject.  See <a href="the-event-driven-graph-composition.md#root-field-arguments-and-event-subjects">subjects</a>.</td></tr><tr><td>sourceName</td><td>String!</td><td>The source name, which identifies the connection in the router config.yaml.<br>If unsupplied, the default value "default" will be used.</td></tr></tbody></table>

### @edfs\_\_subscribe

<pre class="language-graphql" data-full-width="true"><code class="lang-graphql">directive @edfs__subscribe(
    subjects: [String!]!, sourceName: String! = "default", streamConfiguration: edfs__StreamConfiguration,
) on FIELD_DEFINITION

<strong>input edfs__StreamConfiguration {
</strong>    consumerName: String!
    streamName: String!
}
</code></pre>

<table data-full-width="true"><thead><tr><th width="206">Argument name</th><th width="242">Type</th><th>Value</th></tr></thead><tbody><tr><td>subjects</td><td>[String!]!</td><td>The event subjects (it is possible to subscribe to multiple events).<br> See <a href="the-event-driven-graph-composition.md#root-field-arguments-and-event-subjects">subjects</a>.</td></tr><tr><td>sourceName</td><td>String!</td><td>The source name, which identifies the connection in the router config.yaml.<br>If unsupplied, the default value "default" will be used.</td></tr><tr><td>streamConfiguration</td><td>edfs__StreamConfiguration</td><td><p>Configures a stream/consumer for a NATS connection.</p><p>See <a href="nats-connector/stream-and-consumer-configuration.md">Stream and consumer configuration</a>.</p></td></tr></tbody></table>

## Compositional rules

The Event-Driven Graph is an "abstract" subgraph, so it must not define any resolvers. EDGs are also subject to special compositional rules.

### Root fields

EDG Root fields must define their respective event directive and a valid response type:

| Root type    | Directive          | Response type                |
| ------------ | ------------------ | ---------------------------- |
| Query        | @edfs\_\_request   | A non-nullable entity object |
| Mutation     | @edfs\_\_publish   | `edfs__PublishResult!`       |
| Subscription | @edfs\_\_susbcribe | A non-nullable entity object |

Note that the `edfs__StreamConfiguration` input object must _always_ be defined to satisfy the `@edfs__subscribe` directive:

```graphql
input edfs__StreamConfiguration {
    consumerName: String!
    streamName: String!
}
```

Here is an example of a valid EDG mutation:

{% code fullWidth="true" %}
```graphql
directive @edfs__publish(subject: String!, sourceName: String! = "default") on FIELD_DEFINITION

type Mutation {
    updateUser(
        id: ID!, update: UpdateUserInput!
    ): edfs__PublishResult! @edfs__publish(subject: "updateUser.{{ args.id }}")
}

type edfs__PublishResult {
    success: Boolean!
}

type UpdateUserInput {
    forename: String!
    surname: String!
}
```
{% endcode %}

Attempting to return a type other than `edfs__PublishResult!` from a EDG Mutation root field will result in a compositional error.

### Root field arguments and event subjects

Arguments can be defined on a root field, which can then be passed to event subjects through an argument template.

The argument template should follow the period delimiter of your subject. The `args` refers to the field arguments, which has its own period delimiter, followed by a name of a field argument. This argument name must match exactly to a corresponding field argument name.

<pre class="language-bash"><code class="lang-bash"><strong>eventSubject.{{ args.nameOfAFieldArgument }}
</strong></code></pre>

<pre class="language-graphql" data-full-width="false"><code class="lang-graphql"><strong>type Subscription {
</strong><strong>    # note that the arg template names correspond to the field argument names
</strong>    userUpdated(myArgumentName: Int!, another: Int!): User! @edfs__subscribe(
        subjects: ["users.{{ args.myArgumentName }}", "users.{{ args.another }}"]
    )
}

type User @key(fields: "id", resolvable: false) {
    id: @external
}
</code></pre>

### Entity definitions

EDG entities must be "minimal stubs". This means that only the fields (and nested fields) that form part of its primary key should be included:

1. The primary key must contain the "resolvable" argument set to false.
2. Fields (including nested fields) must form part of the primary key
3. Fields (including nested fields) must be declared `@external`

Here is an example of a valid EDG entity object definition:

```graphql
type User @key(fields: "id object { id }", resolvable: false) @external {
 id: Int!
 object: Object!
}

type Object {
 id: Int! @external
}
```

### Other definitions

The EDGs must not define any objects and fields that do not form part of an entity's primary key. Most other definitions are simply ignored, unless, for example, a root field requires an input object.

