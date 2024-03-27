---
description: >-
  Learn more on how you can configure propagating Errors from Subgraphs to the
  client.
---

# Subgraph Error Propagation

As described in the Router Configuration section, you can configure [Subgraph Error Propagation](configuration.md#subgraph-error-propagation), which allows you to forward Errors from Subgraphs to the client.

{% hint style="warning" %}
Enabling Subgraph Error Propagation might leak sensitive information, like Stack Traces, from your Subgraphs to the client.
{% endhint %}

By default, the Router does not forward Subgraph Errors at all. Errors are wrapped in a generic errors object indicating only that there's a problem with the Subgraph, but not exposing any details. This is to ensure that no sensitive information is leaked.

Here's an example error response:

```json
{
  "errors": [
    {
      "message": "Failed to fetch from Subgraph 'products' at path 'query'."
    }
  ],
  "data": null
}
```

For debugging purposes, you might want to switch Error passing on, which will wrap the Subgraph error in an extensions errors object. You can do so via [this config](configuration.md#subgraph-error-propagation). As an alternative, you can also switch on the [dev mode](configuration.md#config-file).

The response with an error looks like this:

```json
{
  "errors": [
    {
      "message": "Failed to fetch from Subgraph 'employees' at path 'query.employees.@'.",
      "extensions": {
        "errors": [
          {
            "message": "Unauthorized",
            "extensions": {
              "code": "UNAUTHORIZED"
            }
          }
        ]
      }
    }
  ],
  "data": {
    "employees": null
  }
}
```

This gives you information on what Subgraph fetch had an error, and what the original error was. We're wrapping the original error in the "extensions" object as we want to preserve the original error, but it wouldn't match the Supergraph structure. E.g. the path of the error will reflect the Subgraph Query, but not the Subergraph (client -acing) GraphQL Operation.

In addition to just exposing the Subgraph error, you can also expose the Status Code from the Subgraph. Your Subgraph might return 401 Unauthorized in some cases. In such a scenario, it might be helpful to expose the Status Code.

```json
{
  "errors": [
    {
      "message": "Failed to fetch from Subgraph '3' at path 'query.employees.@'.",
      "extensions": {
        "errors": [
          {
            "message": "Unauthorized",
            "extensions": {
              "code": "UNAUTHORIZED"
            }
          }
        ],
        "statusCode": 401
      }
    }
  ],
  "data": {
    "employees": null
  }
}
```

