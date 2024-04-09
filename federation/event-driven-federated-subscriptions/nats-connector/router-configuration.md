---
description: How to configure the router config.yml for your NATS event provider.
---

# Router configuration

## Defining a NATS provider

All event providers are defined under `events.sources`:

```yaml
events:
    sources:
        default:
            ...
        anotherSourceName:
            ...
```

Each named property under `events.sources` corresponds to a `sourceName` argument that is defined by [an events directive](../the-event-driven-graph-composition.md#definitions). If no sourceName is provided, the default value, "default", is used. If an events directive defines a `sourceName` argument that is not defined in the router config.yml, the router will return an error and fail to start.

## Required Properties

The following properties are always required:

| Property name | Type   | Value                |
| ------------- | ------ | -------------------- |
| provider      | enum   | NATS                 |
| url           | string | your NATS server url |

## Authentication (optional)

The authentication property is optional; however, if it is defined, either a `token`, or a `username` and `password` pair must be provided:

<table data-full-width="true"><thead><tr><th width="285">Authentication property name</th><th width="80">Type</th><th width="239">Value</th><th>Additional requirements</th></tr></thead><tbody><tr><td>token</td><td>string</td><td>your NATS server token</td><td>no username nor password property</td></tr><tr><td>username</td><td>string</td><td>your NATS server username</td><td>no token property; password property</td></tr><tr><td>password</td><td>string</td><td>your NATS server password</td><td>no token property; username property</td></tr></tbody></table>

## Example configuration

Consider the following Event-Driven Graph schema SDL and its corresponding router config.yml:

{% code fullWidth="true" %}
```graphql
# EDG schema SDL (some definitions omitted for breity)
type Subscription {
    userUpdated(id: Int!): User! @edfs__susbcribe(subjects: ["userUpdated.{{ args.id }}"])
    userUpdatedTwo(id: Int!): User! @edfs__subscribe(subjects: ["userUpdated.{{ args.id }}"], sourceName: "anotherNats")
}
```
{% endcode %}

```yaml
# (partial) router config.yml

events:
    sources:
        default:
            provider: NATS
            url: "nats://localhost:4222"
            authentication:
                token: "xxxxx"
        anotherNats:
            provider: NATS
            url: "nats://localhost:4223"
```

The `Subscription.userUpdated` field defines no `sourceName` argument; therefore, it corresponds to `events.sources.default` in the config.yml.

The `Subscription.userUpdatedTwo` field defines the value "anotherNats" for its `sourceName` argument; therefore, it corresponds to `events.sources.default` in the router config.yml.
