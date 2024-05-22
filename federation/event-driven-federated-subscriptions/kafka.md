# Kafka

## Definitions

{% hint style="warning" %}
The `providerId` argument, including the default value "default", _must_ correspond to an equivalent property in _events.providers.kafka_ entry of the router config.yml.
{% endhint %}

### @edfs\_kafkaPublish

{% code fullWidth="true" %}
```graphql
directive @edfs__kafkaPublish(topic: String!, providerId: String! = "default") on FIELD_DEFINITION

type edfs__PublishResult {
    success: Boolean!
}
```
{% endcode %}

<table data-full-width="true"><thead><tr><th width="177">Argument name</th><th width="232">Type</th><th>Value</th></tr></thead><tbody><tr><td>subject</td><td>String!</td><td>The event topic.</td></tr><tr><td>providerId</td><td>String!</td><td>The provider ID, which identifies the connection in the router config.yaml.<br>If unsupplied, the provider ID "default" will be used.</td></tr></tbody></table>

### @edfs\_\_kafkaSubscribe

{% code fullWidth="true" %}
```graphql
directive @edfs__kafkaSubscribe(topics: [String!]!, providerId: String! = "default") on FIELD_DEFINITION
```
{% endcode %}

<table data-full-width="true"><thead><tr><th width="206">Argument name</th><th width="242">Type</th><th>Value</th></tr></thead><tbody><tr><td>subjects</td><td>[String!]!</td><td>The event topics (it is possible to subscribe to multiple topics).</td></tr><tr><td>providerId</td><td>String!</td><td>The provider ID, which identifies the connection in the router config.yaml.<br>If unsupplied, the provider ID "default" will be used.</td></tr></tbody></table>

For a full example please refer to:

{% content-ref url="../../router/event-driven-federated-subscriptions-edfs/kafka.md" %}
[kafka.md](../../router/event-driven-federated-subscriptions-edfs/kafka.md)
{% endcontent-ref %}
