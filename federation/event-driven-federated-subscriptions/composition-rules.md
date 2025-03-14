# Composition Rules

The Event-Driven Graph is an "abstract" subgraph, so it must not define any resolvers. EDGs are also subject to special compositional rules.

### Root fields

EDG Root fields must define their respective event directive and a valid response type:

| Root type    | Directive               | Response type                |
| ------------ | ----------------------- | ---------------------------- |
| Query        | @edfs\_\_natsRequest    | A non-nullable entity object |
| Mutation     | @edfs\_\_natsPublish    | `edfs__PublishResult!`       |
|              | @edfs\_\_kafkaPublish   | `edfs__PublishResult!`       |
| Subscription | @edfs\_\_natsSubscribe  | A non-nullable entity object |
|              | @edfs\_\_kafkaSubscribe | A non-nullable entity object |

Note that the `edfs__NatsStreamConfiguration` input object must _always_ be defined to satisfy the `@edfs__natsSubscribe` directive:

```graphql
input edfs__NatsStreamConfigurationfiguration {
    consumerInactiveThreshold: Int! = 30
    consumerName: String!
    streamName: String!
}
```

Here is an example of a valid EDG mutation:

{% code fullWidth="false" %}
```graphql
directive @edfs__natsPublish(
  subject: String!, 
  providerId: String! = "default"
) on FIELD_DEFINITION

type Mutation {
    updateUser(
        id: ID!, update: UpdateUserInput!
    ): edfs__PublishResult! @edfs__natsPublish(subject: "updateUser.{{ args.id }}")
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

Arguments can be defined on a root field, which can then be passed to event subjects through an argument template. Argument templates are only support on the subject by NATS. In Kafka we use the subscription filter to split the topic into different streams.

The argument template should follow the period delimiter of your subject. The `args` refers to the field arguments, which has its own period delimiter, followed by a name of a field argument. This argument name must match exactly to a corresponding field argument name.

<pre class="language-bash"><code class="lang-bash"><strong>eventSubject.{{ args.nameOfAFieldArgument }}
</strong></code></pre>

<pre class="language-graphql" data-full-width="false"><code class="lang-graphql"><strong>type Subscription {
</strong><strong>    # note that the arg template names correspond to the field argument names
</strong>    userUpdated(myArgumentName: Int!, another: Int!): User! @edfs__natsSubscribe(
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

