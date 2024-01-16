---
description: >-
  EDFS combines the power of GraphQL Federation and Event-Driven Architecture
  (Kafka, NATS, SQS, RabbitMQ, etc.). Build highly scalable and
  resource-efficient Event-Driven Federated Graphs.
---

# Event-Driven Federated Subscriptions (EDFS)

Event Driven Federated Subscriptions (EDFS) solves 3 major problems when it comes to GraphQL Federation and Subscriptions by directly connecting the Router to an event source like Kafka, NATS, etc... and making it a part of the Graph.

### Intro

1. Subscriptions can only have one single root field
2. Subgraphs should be stateless
3. Maintaining 3 WebSocket Connections per client is a waste of resources

Let me explain the three Problems:

```graphql
type Subscription {
    employeeUpdated(employeeID: ID!): Employee!
}

type Employee {
    id: ID!
    name: String!
}
```

As you can see, the \`employeeUpdated\` field marks the root of a Subscription. With classic Federation, we'd be forced to implement this root Subscription field on a particular Subgraph. This is not ideal, because it ties the ownership of the field to one single Subgraph. If two Subgraphs contribute fields to the Employee type, which is usually the case in federated Graphs, we'd have to communicate across Subgraphs to trigger a Subscription.

In addition to the first problem, Subscriptions also make Subgraphs stateful. Each time a client connects to the Router via WebSockets, the Router has to open another WebSocket connection to the Subgraph. This means that you're not able to use Serverless infrastructure for your Subgraphs. In addition, the deployment and maintenance simply become more complex as you have to manage a lot of open connections.

Furthermore, classic Subscriptions with Federation are quite expensive when it comes to Memory usage. When a client wants to use Subscriptions, it opens up a WebSocket connection to the Router. The Router then opens a second WebSocket Connection to the Subgraph. The Subgraph itself has to maintain another Connection. If we don't count the client itself, that totals 3 WebSocket connections per client. Depending on the programming language and framework being used, one connection can cost multiple Megabytes of Memory, making this solution not very scalable. Imagine we had 10k clients connected, this would cost 30GB of memory if each WebSocket connection costs us 1MB of memory.

### Specification

Enter Event-Driven Federated Subscriptions, a simple way to scale Federated Subscriptions in a resource-efficient manner.

EDFS consists of 3 directives to connect your Graph to an Event-Source.

```graphql
directive @eventsRequest(topic: String!) on FIELD_DEFINITION
directive @eventsPublish(topic: String!) on FIELD_DEFINITION
directive @eventsSubscribe(topic: String!) on FIELD_DEFINITION
```

The \`eventsRequest\` directive allows you to implement Request/Response semantics. This is useful if you want to extend a Graph through an Event Source.

The \`eventsPublish\` directive allows you to publish an event on a topic through a Mutation.

Using the \`eventsSubscribe\` directive, you can drive a Subscription through a topic.

An Event-Driven Subgraph does not need to be implemented, it's simply a Subgraph Schema that tells the Router how to connect certain root fields to the Event Source. Scroll down for an example.

### Prerequisites

To use EDFS, you need to have an Event Source running and connected to the Router. Currently, the only supported Event Source is NATS, but this can easily be extended.

To get started, run a NATS instance and add the following configuration to your \`config.yaml\` Router Configuration:

```yaml
events:
  sources:
    - provider: NATS
      url: "nats://localhost:4222"
```

We've intentionally moved this part of the configuration out of the Schema to keep the directives clean and focused on the implementation. In addition, keeping the implementation details of the Event Source out of the Schema is a clear separation of concerns. Infrastructure teams can be concerned about Event Sources and how to configure them, while API Developers can focus on using the Event Source and connecting Event Topics to their Subgraph Schema.

If you run \`make\` in the Cosmo Monorepo, you'll automatically get a NATS instance running on the default port (4222) using Docker.

### Example Configuration

Below, you'll find an example Schema that connects the \`eventsRequest\` directive to a Query root field (employeeFromEvent), a Mutation root field (updateEmployee) that's connected to another topic using \`eventsPublish\` and a Subscription root field (employeeUpdated) that's connected via \`eventsSubscribe\`. Each of these fields is completely independent.

```graphql
directive @eventsRequest(topic: String!) on FIELD_DEFINITION
directive @eventsPublish(topic: String!) on FIELD_DEFINITION
directive @eventsSubscribe(topic: String!) on FIELD_DEFINITION

type PublishEventResult {
    success: Boolean!
}

type Query {
    employeeFromEvent(id: ID!): Employee! @eventsRequest(topic: "getEmployee.{{ args.id }}")
}

input UpdateEmployeeInput {
    name: String
    email: String
}

type Mutation {
    updateEmployee(id: ID!, update: UpdateEmployeeInput!): PublishEventResult! @eventsPublish(topic: "updateEmployee.{{ args.id }}")
}

type Subscription {
    employeeUpdated(employeeID: ID!): Employee! @eventsSubscribe(topic: "employeeUpdated.{{ args.employeeID }}")
}

type Employee @key(fields: "id") {
  id: Int!
}
```

### Semantics

#### The "topic" Argument

The topic argument of all events Directives allows you to use templating Syntax to use an argument to render the topic.

Given the following Schema:

```graphql
type Subscription {
    employeeUpdated(employeeID: ID!): Employee! @eventsSubscribe(topic: "employeeUpdated.{{ args.employeeID }}")
}
```

If we send a Subscription with the \`employeeID\` argument \`1\`, the topic would render as "employeeUpdated.1".

### Request/Reply

The \`eventsRequest\` directive creates a response topic (internally) and sends the JSON representation of all arguments to the topic specified in the topic argument. The Router then waits on the response topic for the result. The Router expects all fields to be part of the response that are defined in the Entity type in this Schema, as well as the \`\_\_typename\` field to identify the Entity. In the example, the Employee Entity contains an \`id\` field, so the following response would be valid:

{% code title="valid.json" fullWidth="false" %}
```json
{"__typename": "Employee", "id":1}
```
{% endcode %}

The following response is invalid:

{% code title="invalid.json" %}
```json
{"id":1}
```
{% endcode %}

Once the initial result is coming back from the "Event Subgraph", the Router is capable of extending the response with fields from other "regular" Subgraphs.

#### Publish

The \`eventsPublish\` directive sends a JSON representation of all arguments, including arguments being used to render the topic, to the rendered topic. Fields using the \`eventsPublish\` directive MUST return the type \`PublishEventResult\` with one single field \`success\` of type \`Boolean!\`, indicating whether publishing the event was successful or not.

Given that we send the following Mutation:

```graphql
mutation UpdateEmployee($id: ID!, $update: UpdateEmployeeInput!) {
    updateEmployee(id: $id, update: $update){
        id
    }
}
```

...with the following Variables JSON:

```json
{"id":1, "update": {"name": "Jannik", "email": "jannik@neuse.de"}}
```

...the Router would send the following JSON object to the topic "updateEmployee.1":

```json
{"id":1, "update": {"name": "Jannik", "email": "jannik@neuse.de"}}
```

#### Subscribe

Given the following Subscription:

```graphql
subscription EmployeeUpdates($id: ID!){
    employeeUpdated(employeeID: $id){
        id
        details {
            forename
            surname
        }
    }
}
```

...with the following Variables JSON:

```json
{"id": 1}
```

The Router connects to the topic "employeeUpdated.1" and waits for the next message to be published. All fields that are defined in the response entity MUST be sent to the topic to be valid. Additional fields that are not part of this "Events Subgraph" will be resolved by the Router. In addition, it is required to send the \`\_\_typename\` field to identify the Entity.

Here's an example of a valid message:

{% code title="valid.json" %}
```json
{"__typename": "Employee", "id: 1}
```
{% endcode %}

Here's an invalid message as the \`\_\_typename\` field is missing:

{% code title="invalid.json" %}
```json
{"id: 1}
```
{% endcode %}

It's important to send the \`\_\_typename\` field because this allows EDFS to also work for Union and Interface types.

It's worth noting that the Router will not send any responses before you publish a message on the topic. If you need the most recent result, first make a Query, and then subscribe to the Topic. The Router will send the first response only after a message is published on the rendered topic.

### Implementation Details and Noteworthy Information

#### Deduplication of Subscriptions

The Cosmo Router deduplicates Subscriptions internally to save resources. If multiple Subscriptions use the same topic as a trigger, all Subscriptions share the same trigger. The trigger is shut down when all Subscriptions that depend on it are unsubscribed.

#### Stateless-ness of Subgraphs

With EDFS, the Router connects directly to the Event Source but doesn't require any stateful connections, e.g. WebSocket, to the Subgraphs. This makes the Subgraphs much simpler to reason about and easier to deploy. Serverless deployment options usually have limitations on request length. With an Event Broker in the middle, Subgraphs can be stateless without having to give up on Subscriptions.

#### Efficiency, CPU & Memory Consumption (Epoll/Kqueue)

EDFS is built on top of Event-Driven principles, which means that the implementation is non-blocking, as CPU efficient as possible, and has a very low memory footprint.

We're using Epoll and Kqueue on Systems that support it (Linux, Darwin, etc.) to be as efficient as possible.

To give you some numbers, 10.000 clients connected to one Router consume \~150-200MB of Memory and have 0% CPU usage when idle (not publishing any messages). In addition, these 10k clients when idle require \~40 goroutines, e.g. for thread pools, etc...

The Router supports multi-core out of the box and is capable of scaling up to a multitude of 10k events per second published.

#### Publish Events from any System, not just Subgraphs

It's worth noting that publishing Entity update Events is not limited to just Subgraphs. EDFS is designed to fully decouple the API Consumer from the implementation of the Event-Driven Architecture.

A client can create a Job via a Mutation and Subscribe to the Job state via EDFS. Next, the Mutation can kick off a long-running process that will be handled by one or many systems in the background. At each step, e.g. when an increment of work is done, each subsystem can publish a message to indicate that the state of an Entity has changed.

Once the message is published by one of the sub-systems, the Router can Query all Subgraphs to resolve the current state of the Job.

With EDFS, each Subgraph can add fields to an Entity that it's responsible for and publish events to the Message Broker when a long-running Operation updates the overall state of an Entity.
