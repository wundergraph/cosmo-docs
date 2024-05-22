# NATS

## Definitions

{% hint style="warning" %}
The `providerId` argument, including the default value "default", _must_ correspond to an equivalent property in events.providers entry of the router config.yml.
{% endhint %}

### @edfs\_natsPublish

{% code fullWidth="true" %}
```graphql
directive @edfs__natsPublish(subject: String!, providerId: String! = "default") on FIELD_DEFINITION

type edfs__PublishResult {
    success: Boolean!
}
```
{% endcode %}

<table data-full-width="true"><thead><tr><th width="177">Argument name</th><th width="232">Type</th><th>Value</th></tr></thead><tbody><tr><td>subject</td><td>String!</td><td>The event subject.</td></tr><tr><td>providerId</td><td>String!</td><td>The provider ID, which identifies the connection in the router config.yaml.<br>If unsupplied, the provider ID "default" will be used.</td></tr></tbody></table>

### @edfs\_\_natsRequest

{% code fullWidth="true" %}
```graphql
directive @edfs__natsRequest(subject: String!, providerId: String! = "default") on FIELD_DEFINITION
```
{% endcode %}

<table data-full-width="true"><thead><tr><th width="176">Argument name</th><th width="151">Type</th><th>Value</th></tr></thead><tbody><tr><td>subject</td><td>String!</td><td>The event subject.</td></tr><tr><td>providerId</td><td>String!</td><td>The provider ID, which identifies the connection in the router config.yaml.<br>If unsupplied, the provider ID "default" will be used.</td></tr></tbody></table>

### @edfs\_\_natsSubscribe

{% code fullWidth="true" %}
```graphql
directive @edfs__natsSubscribe(subjects: [String!]!, providerId: String! = "default", streamConfiguration: edfs__NatsStreamConfiguration) on FIELD_DEFINITION

input edfs__NatsStreamConfiguration {
    consumerName: String!
    streamName: String!
}
```
{% endcode %}

<table data-full-width="true"><thead><tr><th width="206">Argument name</th><th width="242">Type</th><th>Value</th></tr></thead><tbody><tr><td>subjects</td><td>[String!]!</td><td>The event subjects (it is possible to subscribe to multiple events).<br> See <a href="nats.md#root-field-arguments-and-event-subjects">subjects</a>.</td></tr><tr><td>providerId</td><td>String!</td><td>The provider ID, which identifies the connection in the router config.yaml.<br>If unsupplied, the provider ID "default" will be used.</td></tr><tr><td>streamConfiguration</td><td>edfs__StreamConfiguration</td><td><p>Configures a stream/consumer for a NATS connection.</p><p>See <a href="../../router/event-driven-federated-subscriptions-edfs/nats/stream-and-consumer-configuration.md">Stream and consumer configuration</a>.</p></td></tr></tbody></table>

For a full example please refer to:

{% content-ref url="../../router/event-driven-federated-subscriptions-edfs/nats/" %}
[nats](../../router/event-driven-federated-subscriptions-edfs/nats/)
{% endcontent-ref %}
