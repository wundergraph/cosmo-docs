---
description: Enable Real-time capabilities for your client applications.
---

# Subscriptions

## What are subscriptions for? <a href="#what-are-subscriptions-for" id="what-are-subscriptions-for"></a>

GraphQL subscriptions are a feature of the GraphQL query language that allows clients to receive real-time updates from a server when specific events or data changes occur. They are useful for building interactive and responsive applications, as they eliminate the need for clients to continuously poll the server for updates.&#x20;

Subscriptions work by establishing a long-lived connection between the client and server, enabling the server to push data to the client as soon as it becomes available, making them a more efficient and scalable way to handle real-time data synchronization in applications.

The Cosmo Router comes with subscription support out of the box without any limitations. We support two different protocols to enable the most versatile and efficient real-time data synchronization for your applications: WebSockets, Server-Sent Events.

* [graphql-ws](https://github.com/enisdenjo/graphql-ws): **(default)** Coherent, zero-dependency, lazy, simple, GraphQL over WebSocket Protocol compliant server and client.
* [Server-Sent Events (SSE)](https://en.wikipedia.org/wiki/Server-sent\_events): One-Way Messaging. Both with `GET` and `POST` requests. Recommended for unidirectional updates. More resource efficient than WebSockets.
* [subscriptions-transport-ws](https://github.com/apollographql/subscriptions-transport-ws): Legacy transport to WebSocket-based GraphQL subscriptions. Please use `graphql-ws` or `SSE` if you have the choice.
* [absinthe](https://github.com/absinthe-graphql/absinthe\_phoenix): Legacy transport for Clients that still use the Absinthe (Phoenix) protocol.

<figure><img src="../../.gitbook/assets/subscriptions-architecture (1).png" alt=""><figcaption><p>The Router connects your Clients and Subgraphs to establish a Real-time connection.</p></figcaption></figure>

These protocols are both supported between the client and the router as well as between the router and each subgraph. The supported transport depends on the support of your client or subgraph. By default, graphql-ws is used which is widely adopted. The protocol to be used to subscribe for each subgraph can be configured while registering the subgraph on the control plane. See [Create](../../cli/subgraph/create.md) and [Update](../../cli/subgraph/update.md) for more information.

### Multiplexing

<figure><img src="../../.gitbook/assets/subscriptions-multiplexing.png" alt=""><figcaption><p>The Clients and Subgraphs can speak different protocols depending on their abilities.</p></figcaption></figure>

The Cosmo router multiplexes long-lived connections to the subgraphs when possible. Multiple client requests with the same authentication information are routed to the subgraph over a single connection.

{% hint style="info" %}
Whenever your router updates its config at runtime, **it terminates all active subscriptions.** Clients should be built in a way that reconnects automatically on disconnect.
{% endhint %}

### Test WebSockets

Install [wscat](https://github.com/websockets/wscat) globally through npm:

<pre><code>npm install -g <a data-footnote-ref href="#user-content-fn-1">wscat</a>
</code></pre>

Run the following steps in order:

```bash
# 1. Establish a secure WebSocket connection with our demo Router.
wscat -c wss://demo-router.fly.dev/graphql --subprotocol graphql-transport-ws
# 2. Paste the initial init message and press ENTER.
{"type":"connection_init","payload":{}}
# 3. Paste the GraphQL subscription and press ENTER to get updates.
{"id":"6e6f71d0-2729-4db5-baee-8b6fc88721a7","type":"subscribe","payload":{"query":"subscription {\n  currentTime {\n    unixTime\n  }\n}"}}
```

### Using the "extensions" field

Cosmo Router allows you to leverage the "extensions" field of a GraphQL Request JSON to add additional meta information to the subscription message.

This is useful, e.g. if you're trying to send an additional parameter, like a Bearer token with the initial payload. The feature in enabled by default, here's an example on how to use it:

```bash
# 1. Establish a secure WebSocket connection with our demo Router.
wscat -c wss://demo-router.fly.dev/graphql --subprotocol graphql-transport-ws
# 2. Paste the initial init message and press ENTER.
{"type":"connection_init","payload":{}}
# 3. Paste the GraphQL subscription and press ENTER to get updates.
{"id":"1","type":"subscribe","payload":{"extensions":{"token":"asd"},"query":"subscription {\n  currentTime {\n    unixTime\n  }\n}"}}
```

When establishing a connection from the Router to the Subgraph, we will automatically include the "extensions" field from the initial payload. More specifically, the Router will include this "extensions" field in all (subsequent) Subgraph requests. E.g. if a Subscription depends on a nested entity field that will be resolved through a GraphQL Query, the extensions field will be included as well.

### Header forwarding

Headers in subscriptions can be forwarded through the router to the subgraphs using the proxy capabilities for the router. See [#forward-http-headers-to-subgraphs](../proxy-capabilities/#forward-http-headers-to-subgraphs "mention") for more information.

When multiplexing subscriptions over a single WebSocket connection, only subscriptions with the same forwarded header names and values are grouped into a single connection.

[^1]: 
