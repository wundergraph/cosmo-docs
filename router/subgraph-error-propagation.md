---
description: >-
  Learn more on how you can configure propagating errors from Subgraphs to the
  client.
icon: bug
---

# Subgraph Error Propagation

In the [**Router Configuration**](configuration/) section, you can configure [**Subgraph Error Propagation**](configuration/#subgraph-error-propagation), which allows errors from subgraphs to be forwarded to the client.

{% hint style="info" %}
In **development mode**, the Router is configured to be as verbose as possible, providing extensive information to help with debugging and troubleshooting. This mode exposes additional details about subgraph errors, making it easier to identify the root causes of issues.

```yaml
dev_mode: true
```
{% endhint %}

## Wrapped mode

By default, the Router operates in **wrapped mode**, where errors are encapsulated in a generic error object. This indicates a problem with the subgraph, while more detailed error information is provided in the `errors` field within the `extensions` object.

**Default Configuration**

```yaml
subgraph_error_propagation:
  mode: wrapped
  allowed_extension_fields:
    - "code"
```

**Example Error Response**

```json
{
  "errors": [
    {
      "message": "Failed to fetch from Subgraph 'employees'.",
      "extensions": {
        "errors": [
          {
            "message": "error resolving RootFieldThrowsError for Employee 12",
            "path": ["employees", 9, "rootFieldThrowsError"],
            "extensions": {
              "code": "ERROR_CODE"
            }
          }
        ]
      }
    }
  ]
}
```

By default, sensitive information in the `extensions` field is not exposed. In the extension object we only passthrough the `code` field. For more detailed error output, you can modify the configuration as follow:

#### Extended Configuration Options

```yaml
subgraph_error_propagation:
  mode: wrapped
  default_extension_code: DOWNSTREAM_SERVICE_ERROR
  omit_extensions: false
  propagate_status_codes: true
  omit_locations: true
  attach_service_name: true # Attach the service name to the error
  allowed_extension_fields: # Propagate additional fields from subgraphs
    - "code"
```

#### Example Error Response with Extended Configuration

```json
{
  "errors": [
    {
      "message": "Failed to fetch from Subgraph 'employees' at path 'query.employees.@'.",
      "extensions": {
        "serviceName": "employees",
        "statusCode": 200,
        "errors": [
          {
            "message": "error resolving RootFieldThrowsError for Employee 12",
            "path": ["employees", 9, "rootFieldThrowsError"],
            "extensions": {
              "code": "ERROR_CODE"
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

This configuration provides detailed information about the subgraph that encountered the error, the response code of the subgraph, including all relevant subgraph error messages. Additionally, enabling the `attach_service_name` option allows the affected subgraph's name to be sent to the client, which can help in generating more informative error messages.

### Avoid exposing any information

The **wrapped mode** is useful when you want to avoid exposing additional information about subgraph errors to the client. This mode provides a generic error response without revealing specific details. You can enable this by using the following configuration:

**Configuration**

```yaml
subgraph_error_propagation:
  mode: wrapped
  omit_extensions: true
```

**Example Error Response**

```json
{
  "errors": [
    {
      "message": "Failed to fetch from Subgraph 'employees'.",
    }
  ]
}
```

## Passthrough mode

The **pass-through** mode returns errors exactly as they are received from the subgraph, without modification. This mode is commonly used in the GraphQL ecosystem to provide more transparency in error responses. As described in the previous section, you can fine-tune what information is exposed by adjusting the configuration.&#x20;

### Propagate only selected fields

You can also fine tune which fields are propagated with `allowed_fields`. The following ones are always propagated

* `message`
* `path`

If `omit_extensions` is set to `true` (default is `false` ), `extensions`  will not be propagated.

If `omit_locations` is set to `true` (default is `false` ), `locations`  will not be propagated.

**Configuration**

```yaml
subgraph_error_propagation:
  mode: pass-through
  attach_service_name: true
  allowed_extension_fields:
    - "code"
  allowed_fields:
    - "userId"
```

**Example Error Response**

```json
{
  "errors": [
    {
      "message": "error resolving RootFieldThrowsError for Employee 12",
      "path": ["employees", 9, "rootFieldThrowsError"],
      "userId": "1234",
      "extensions": {
        "code": "ERROR_CODE",
        "serviceName": "employees"
      }
    }
  ]
}
```
