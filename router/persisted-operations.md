---
description: >-
  Persisted operations, also known as trusted documents, allow you to register
  trusted operations in the router
icon: passport
---

# Persisted Operations

**Persisted operations** allow you to register queries / mutations / subscriptions within a federated graph, enabling the clients to send just an identifier in their request instead of sending the whole operation body. These operations need to be registered ahead of time, using the `wgc operation push` command.

This not only saves bandwidth but can also help reduce the attack surface by allowing only safe-listed operations.

### Architecture

<figure><img src="../.gitbook/assets/image (102).png" alt=""><figcaption></figcaption></figure>

Persisted operations are usually registered within Cosmo during your release pipeline, which pushes them to the control plane. This allows you to use GraphQL queries without previously registering them in development while allowing only trusted operations in production.&#x20;

The control plane replicates these operations in the Cosmo CDN, where the routers can fetch them. All operations in the CDN are protected and only readable by routers running the federated graph to which the operations were registered.

### Using persisted operations

Persisted operations require some tooling on the client side. Consult the documentation for your GraphQL client library to find out how to generate a query manifest or query map.

Once this list of operations has been generated, typically in your CI or CD pipeline, you can use [`wgc`](broken-reference) to register your operations:

```bash
wgc operations push mygraph -n default -c web -f my-operations-manifest.json
```

This will register the operations for your federated graph named `mygraph` in the `default` namespace (as seen in the Studio) and your client named `web` (indicated by the `graphql-client-name` HTTP header), using the same operation identifiers as your library when possible. If your library doesn't generate these identifiers, Cosmo will automatically generate them.

When pushing the operations, you will see a short summary of the operations that were pushed, indicating how many were created and how many were already registered. Alternatively, the `--output` flag can be used to obtain a JSON summary that can easily be processed by your tooling.

```bash
wgc operations push mygraph -n default -c my-client -f persisted-query-manifest.json --format json                                   (11-25 10:23)
{
  "2d9df67f96ce804da7a9107d33373132a53bf56aec29ef4b4e06569a43a16935": {
    "body": "query Employees {\n  employees {\n    id\n    role {\n      department\n      title\n      __typename\n    }\n    details {\n      forename\n      surname\n      location\n      __typename\n    }\n    __typename\n  }\n}",
    "status": "up_to_date"
  },
...
}
```

Finally, you should enable persisted operations in your GraphQL client library.

To see all available options for  `wgc operations push, see` [push.md](../cli/operations/push.md "mention").

Additionally, check the [Using Persisted Operation with Federated GraphQL](../tutorial/using-persisted-operations.md) tutorial for a step by step guide.

### Disallowing non-persisted Operations

If you're going all in on Security, you'd want to only allow Persisted Operations in your Production Environment.

By default, non-persisted (dynamic) GraphQL Operations are allowed, which you can disable using the [Security Configuration](configuration.md#security) of the Router.
