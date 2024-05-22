---
description: Configuring a stream and consumer for a NATS provider.
---

# Stream and consumer configuration

{% hint style="warning" %}
Your NATS server must be configured to allow jetstreams before initiation.\
Please see [the documentation](https://docs.nats.io/nats-concepts/jetstream) for more details.
{% endhint %}

By configuring a stream and consumer, messages that are sent while a subscription is inactive can be consumed at a later time, e.g., when the subscription is restarted. This can help to prevent the loss of messages.

## Event-Driven Graph schema configuration

The `@edfs__natsSubscribe` directive defines an optional `streamConfiguration` argument. Providing this input object allows the configuration of a stream and consumer on a NATS connection.

Note that if the `streamConfiguration` argument is undefined, the connection will be interpreted not to use a stream/consumer. If defined, all input object fields are required:

<table><thead><tr><th>Input name</th><th width="256">Type</th><th>Value</th></tr></thead><tbody><tr><td>consumerName</td><td>String!</td><td>The name of the consumer</td></tr><tr><td>streamName</td><td>String!</td><td>The name of the stream</td></tr></tbody></table>

## NATS configuration

### Stream

The stream name that is supplied to the `streamName` input must already be configured by your NATS server. If the relevant stream for a stream-reliant subscription cannot be found, an error will be returned.

Please consult the following documentation on creating a stream (and ensure your NATS server has been configured to allow jetstreams):\
[https://docs.nats.io/nats-concepts/jetstream/streams](https://docs.nats.io/nats-concepts/jetstream/streams)

Typically, this can be achieved using the [NATS cli](https://docs.nats.io/using-nats/nats-tools/nats\_cli) and following the prompts:

```bash
nats str add stream-name
```

### Consumer

As long as the stream exists, when a subscription is started, the router will first attempt to fetch a consumer of the same name supplied to the `consumerName` input. If a consumer is not found, the router will create a new durable consumer of the same name. Durable consumers will persist and not timeout.&#x20;

If you wish for your consumer to have a timeout threshold, please configure accordingly using the following documentation:\
[https://docs.nats.io/nats-concepts/jetstream/consumers](https://docs.nats.io/nats-concepts/jetstream/consumers)\
[https://docs.nats.io/nats-concepts/jetstream/consumers/example\_configuration](https://docs.nats.io/nats-concepts/jetstream/consumers/example\_configuration)

Typically, this can be achieved using the [NATS cli](https://docs.nats.io/using-nats/nats-tools/nats\_cli) and following the prompts:

```bash
nats consumer add stream-name consumer-name
```

## Example

In the example below, the NATS provider `my-nats` has also defined a stream configuration. The `streamName` input has been set to "myStream", and the `consumerName` input has been set to `myConsumer`.

{% code fullWidth="true" %}
```graphql
directive @edfs__natsSubscribe(subjects: [String!]!, providerId: String! = "default", streamConfiguration: edfs__NatsStreamConfiguration) on FIELD_DEFINITION

input edfs__NatsStreamConfiguration {
    consumerName: String!
    streamName: String!
}

type Subscription {
    userUpdated(id: Int!): User! @edfs__natsSubscribe(
        subjects: ["user.{{ args.id }}"],
        providerId: "my-nats",
        streamConfiguration: { consumerName: "myConsumer", streamName: "myStream" },
    )
}

type User @key(fields: "id", resolvable: false) {
    id: Int! @external
}
```
{% endcode %}
