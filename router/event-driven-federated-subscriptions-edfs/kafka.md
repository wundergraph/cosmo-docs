---
description: Kafka event provider support for EDFS
---

# Kafka

<figure><img src="../../.gitbook/assets/EDFS Kafka.png" alt="" width="375"><figcaption><p>Kafka with EDFS</p></figcaption></figure>

## Minimum requirements

<table><thead><tr><th width="214">Package</th><th>Minimum version</th></tr></thead><tbody><tr><td>controlplane</td><td>0.88.3</td></tr><tr><td>router</td><td>0.88.0</td></tr><tr><td>wgc</td><td>0.55.0</td></tr></tbody></table>

## Full schema example

Here is a comprehensive example of how to use Kafka with EDFS. This guide covers publish, subscribe, and the filter directive. All examples can be modified to suit your specific needs. The schema directives and `edfs__*` types belong to the EDFS schema contract and must not be modified.

```graphql
# EDFS

directive @edfs__kafkaPublish(topic: String!, providerId: String! = "default") on FIELD_DEFINITION
directive @edfs__kafkaSubscribe(topics: [String!]!, providerId: String! = "default") on FIELD_DEFINITION

# OpenFederation

directive @openfed__subscriptionFilter(condition: openfed__SubscriptionFilterCondition!) on FIELD_DEFINITION

input openfed__SubscriptionFieldCondition {
    fieldPath: String!
    values: [String!]!
}

input openfed__SubscriptionFilterCondition {
    AND: [openfed__SubscriptionFilterCondition!]
    IN: openfed__SubscriptionFieldCondition
    NOT: openfed__SubscriptionFilterCondition
    OR: [openfed__SubscriptionFilterCondition!]
}

# Custom

input UpdateEmployeeInput {
    name: String
    email: String
}

type Mutation {
   updateEmployeeMyKafka(employeeID: Int!, update: UpdateEmployeeInput!): edfs__PublishResult! @edfs__kafkaPublish(topic: "employeeUpdated", providerId: "my-kafka")
}

type Subscription {
    filteredEmployeeUpdatedMyKafka(employeeID: ID!): Employee!
        @edfs__kafkaSubscribe(topics: ["employeeUpdated", "employeeUpdatedTwo"], providerId: "my-kafka")
        @openfed__subscriptionFilter(condition: { IN: { fieldPath: "id", values: [1, 3, 4, 7, 11] } })
    filteredEmployeeUpdatedMyKafkaWithListFieldArguments(firstIds: [ID!]!, secondIds: [ID!]!): Employee!
        @edfs__kafkaSubscribe(topics: ["employeeUpdated", "employeeUpdatedTwo"], providerId: "my-kafka")
    filteredEmployeeUpdatedMyKafkaWithNestedListFieldArgument(input: KafkaInput!): Employee!
        @edfs__kafkaSubscribe(topics: ["employeeUpdated", "employeeUpdatedTwo"], providerId: "my-kafka")
        @openfed__subscriptionFilter(condition: {
            OR: [
                { IN: { fieldPath: "id", values: ["{{ args.input.ids }}"] } },
                { IN: { fieldPath: "id", values: ["1"] } },
            ],
        })
}

input KafkaInput {
    ids: [Int!]!
}

# Subgraph schema

type Employee @key(fields: "id", resolvable: false) {
  id: Int! @external
}

type edfs__PublishResult {
    success: Boolean!
}
```

## Router config

Based on the example above, you will need a compatible router configuration.

{% code title="config.yaml" %}
```yaml
events:
  providers:
    kafka:
      - id: my-kafka # Needs to match with the providerID in the directive
        tls: 
          enabled: true
        authentication: 
          sasl_plain: 
            password: "password"
            username: "username"
        brokers:
          - "localhost:9092"
```
{% endcode %}

You can create the abstract subgraph with the following [wgc](../../cli/intro.md) command:

```bash
pnpm wgc subgraph publish employee --namespace default --schema edfs-graph.graphqls --routing-url http://localhost:4004/graphql
```

The routing url is still mandatory due a limitation. You can specify anything to make it pass.
