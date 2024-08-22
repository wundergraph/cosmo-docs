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

scalar openfed__SubscriptionFilterValue

input openfed__SubscriptionFieldCondition {
    fieldPath: String!
    values: [openfed__SubscriptionFilterValue]!
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
                { IN: { fieldPath: "id", values: [1] } },
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

You can create the above Event-Driven Graph (EDG—an abstract subgraph) with the following [wgc](../../cli/intro.md) command:

```bash
wgc subgraph publish edg --namespace default --schema eedg.graphqls
```

## Router configuration

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

## Example Query

In the example query below, one or more subgraphs have been implemented alongside the Event-Driven Graph to resolve any other fields defined on `Employee`, e.g., `tag` and `details.surname`.

```graphql
subscription {
  filteredEmployeeUpdatedMyKafka(employeeID: 1) {
    id # resolved by the Event-Driven Graph (through the event)
    tag # resolved by another subgraph
    details { # resolved by another subgraph
      surname
    }
  }
}
```



## System diagram

<figure><img src="../../.gitbook/assets/image (119).png" alt=""><figcaption></figcaption></figure>
