---
description: >-
  Get an overview about what data the router collects and its purposes. Learn to
  adjust configurations to ensure stringent data privacy management.
---

# Compliance and Data Management

In a nutshell, the router is an HTTP server that accepts GraphQL requests and responds with an appropriate response. During this process, a request goes through different stages and each stage can generate and export data. What data is exported depends on the router's configuration. By default, the following modules are enabled. You can disable or fine tune these settings. Please refer to the router [configuration](configuration.md) page.

## Tracing

We export [OTEL](https://opentelemetry.io/) trace information by default to provide [distributed tracing](../studio/analytics/distributed-tracing.md). That includes:

* Request Host, Schema, User-Agent, Protocol, Read / Written Bytes
* Router Process ID, Hostname, Service Name, SDK instrumentation information
* GraphQL Operation Name, Query, Variables

The Operation Content is in normalization form, meaning user data is not included.&#x20;

GraphQL variables are very useful for reproducing exact queries, but they also pose a potential risk because they include request data. To mitigate this, you have to explicitly opt in. In the future, we will provide tools to redact specific arguments.

{% code title="config.yaml" %}
```yaml
version: "1"
telemetry:
  tracing:
      export_graphql_variables: true # TRACING_EXPORT_GRAPHQL_VARIABLES
```
{% endcode %}

This enables the option to replay GraphQL queries with variables in the Studio.

## Metrics

We export [OTEL](https://opentelemetry.io/) metric information by default to provide [advanced analytics](../studio/analytics/). That includes:

* Count of total request
* Count of total received and written bytes
* Count of total in-flight requests
* Latency of router requests
* Runtime behavior

All metrics are tracked across different dimensions, such as Operation Name and Subgraph Name. Please refer to the [metrics](metrics-and-monitoring.md#dimensions) page for more details.

## Schema Usage Metrics

Besides measuring common request metrics, we also collect information about GraphQL operation usage. This allows us to provide [breaking-change detection](../studio/schema-checks.md) and [field-level analytics](../studio/analytics/schema-field-usage.md). This includes:

* GraphQL operation content
* Used GraphQL types per operation

## Router self-registering

When the router starts, it attempts to connect with the control plane to self-register. This mechanism is used to exchange cryptographic keys when using [ART](advanced-request-tracing-art.md) and to ensure that certain limits are maintained when data is sent to Cosmo Cloud.

## Router CDN

Every time you update your schema via [wgc](broken-reference), we will upload the latest router configuration to our Content Delivery Network (CDN) to ensure high availability. This router configuration, accessible only by you, includes the optimized query plan and the schemas of your subgraph. The router uses this endpoint to periodically fetch updates.

## Request logging

The router logs every incoming request at the INFO log level. Request logs **aren't** sent to any external systems and can only be accessed in the environment where the router runs. The log contains the following information:

* Request Method, Path, Query, User-Agent, Client-IP (anonymized)
* Router Version, Router Config Version
* Response Status, Latency

## Retention

If you use Cosmo Cloud, your data is not stored indefinitely. Depending on your plan, we delete telemetry data every 30 days and schema usage data every 90 days.

## Summary

By default, we exercise strict caution regarding the data that is collected and exported. We do not collect personally identifiable information (PII), Client-IP are anonymized by default. By configuring the router, you can opt out of sharing certain information. Additionally, it is possible to run the router in standalone mode without any connection to external systems.

{% hint style="warning" %}
Disabling features will result in a degraded experience on the Cosmo Platform because many features rely on the information the router sends to us.
{% endhint %}
