---
icon: sliders-up
description: Learn how to configure your router.
---

# Configuration

The router provides three different ways of customization:

1. **Configure the router runtime:** You can specify a [`config.yaml`](./#config-file) for convenience or pass [environment variables](./#environment-variables). In both ways, you can configure the global behavior of the router. For a full reference of all available options see below or use your [IDE of choice](./#config-validation-and-auto-completion).
2. **Configure how your graph is served:** This file can be provided as config option or is pulled automatically from the cdn. It contains information on how to resolve your federated schema. The engine uses the information to build a highly optimized query planner. For more information see [`wgc router compose`](../../cli/router/compose.md) to build the file locally for development or [`wgc router fetch`](../../cli/router/fetch.md) to download the latest production version.
3. **Customize the router programatically through** Go [modules](../custom-modules.md). It is unlikely that we will provide every possible feature as an in-built functionality. For advanced use cases or more control, you can build Go modules and compile the Router in a few commands. If you are uncertain about if your use case should be implemented as a custom module, don't hesitate to open an issue. We might already have a plan for this or can assist you with the implementation.

{% hint style="info" %}
**Recommendation** Create a config file and use environment variable expansion to avoid storing secrets on the file system.
{% endhint %}

### Config file

For convenience, you can create a `config.yaml` to specify all router options. Start the router in the same directory or pass the path to the file as a `CONFIG_PATH` environment variable.

{% code title="config.yaml" %}
```yaml
version: '1'

graph:
    token: "${GRAPH_API_TOKEN}"
```
{% endcode %}

{% hint style="warning" %}
Values specified in the config file have **precedence** over Environment variables. This also includes empty values so only specify values that should be overwritten. That means, you can see the config file as a single source of truth.
{% endhint %}

#### Expand Environment Variables

You can expand environment variables in the file like this:

{% code title="config.yaml" %}
```yaml
version: '1'

log_level: "${LOG_LEVEL}"
```
{% endcode %}

This will replace the value of the environment variable `LOG_LEVEL` with the value of the key `log_level` in your config file. For numeric values, ensure quotes are omitted.

#### Config Validation & Auto-completion

We know configuration is hard, especially for a software component like the router that can be customized entirely to your needs. In order to simplify this, we use [JSON schema](https://json-schema.org/) to validate the router configuration. This comes with huge benefits, all right at your fingertips:

* Auto-completion
* Documentation (Usage, Examples)
* Detect deprecated fields
* Detect typos or invalid values.

Some options require the router to validate them. This requires starting the router. Once your router has started successfully, you can be sure that your configuration is valid.

#### IDE Configuration

* **VsCode**: Install the [YAML](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-yaml) extension in your IDE.
* **JetBrains**: Support out of the box but in some circumstances it conflicts with other default mappings. **Go to** _`Languages & Frameworks`_ -> _`Schemas and DTDs`_ -> _`JSON Schemas Mappings`_ configure the mapping yourself.

As the next step, add the following line to the head of your `config.yaml`file. This line informs your IDE, to download the correct JSON schema file to validate the config file.

{% code title="config.yaml" %}
```yaml
# yaml-language-server: $schema=https://raw.githubusercontent.com/wundergraph/cosmo/main/router/pkg/config/config.schema.json

version: '1'
```
{% endcode %}

If you want to pin to a specific router version use the following URL:

{% code title="config.yaml" %}
```yaml
# yaml-language-server: $schema=https://raw.githubusercontent.com/wundergraph/cosmo/router%400.67.0/router/pkg/config/config.schema.json
```
{% endcode %}

Now, you should get auto-completion 🌟 .

### Environment Variables

Many configuration options can be set as environment variables. For a complete list of options, please look at the [Router](./#router) config tables.

### Router

The following sections describe each configuration in detail with all available options and their defaults.

{% hint style="info" %}
Intervals, timeouts, and delays are specified in Go [duration](https://pkg.go.dev/maze.io/x/duration#ParseDuration) syntax e.g 1s, 5m or 1h.

Sizes can be specified in 2MB, 1mib.
{% endhint %}

<table data-full-width="true"><thead><tr><th width="261">Environment Variable</th><th>YAML</th><th width="109" data-type="checkbox">Required</th><th width="239">Description</th><th>Default Value</th></tr></thead><tbody><tr><td>LISTEN_ADDR</td><td>listen_addr</td><td>false</td><td>The server listener address.</td><td>localhost:3002</td></tr><tr><td>CONTROLPLANE_URL</td><td>controlplane_url</td><td>true</td><td>The controlplane url. Not required when a static execution config is provided.</td><td><a href="https://cosmo-cp.wundergraph.com">https://cosmo-cp.wundergraph.com</a></td></tr><tr><td>PLAYGROUND_ENABLED</td><td>playground_enabled</td><td>false</td><td>Enables the GraphQL playground on (<code>$LISTEN_ADDR/</code>)</td><td>true</td></tr><tr><td>PLAYGROUND_PATH</td><td>playground_path</td><td>false</td><td>The path where the playground is served</td><td>"/"</td></tr><tr><td>INTROSPECTION_ENABLED</td><td>introspection_enabled</td><td>false</td><td></td><td>true</td></tr><tr><td>QUERY_PLANS_ENABLED</td><td>query_plans_enabled</td><td>false</td><td>The Router can return Query plans as part of the response, which might be useful to understand the execution.</td><td>true</td></tr><tr><td>LOG_LEVEL</td><td>log_level</td><td>false</td><td>debug / info / warning / error / fatal / panic</td><td>info</td></tr><tr><td>JSON_LOG</td><td>json_log</td><td>false</td><td>Render the log output in JSON format (true) or human readable (false)</td><td>true</td></tr><tr><td>SHUTDOWN_DELAY</td><td>shutdown_delay</td><td>false</td><td>Maximum time in seconds the server has to shutdown gracefully. Should be higher than <code>GRACE_PERIOD</code></td><td>60s</td></tr><tr><td>GRACE_PERIOD</td><td>grace_period</td><td>false</td><td>Maximum time in seconds the server has between schema updates to gracefully clean up all resources. Should be smaller than <code>SHUTDOWN_DELAY</code></td><td>30s</td></tr><tr><td>POLL_INTERVAL</td><td>poll_interval</td><td>false</td><td>The interval of how often the router should check for new schema updates</td><td>10s</td></tr><tr><td>POLL_JITTER</td><td>poll_jitter</td><td>false</td><td>The maximum delay added to the poll interval to mitigate thundering herd issues in router fleets scenarios.</td><td>5s</td></tr><tr><td>HEALTH_CHECK_PATH</td><td>health_check_path</td><td>false</td><td>Health check path. Returns <code>200</code> when the router is alive</td><td>/health</td></tr><tr><td>READINESS_CHECK_PATH</td><td>readiness_check_path</td><td>false</td><td>Readiness check path. Return <code>200</code> when the router is ready to accept traffic, otherwise <code>503</code></td><td>/health/ready</td></tr><tr><td>LIVENESS_CHECK_PATH</td><td>liveness_check_path</td><td>false</td><td>Liveness check path. Return 200 when the router is alive</td><td>/health/live</td></tr><tr><td>GRAPHQL_PATH</td><td>graphql_path</td><td>false</td><td>The path where the GraphQL Handler is served</td><td>/graphql</td></tr><tr><td>PLAYGROUND_PATH</td><td>playground_path</td><td>false</td><td>The path where the playground is served</td><td>/</td></tr><tr><td>LOCALHOST_FALLBACK_INSIDE_DOCKER</td><td>localhost_fallback_inside_docker</td><td>false</td><td>Enable fallback for requests that fail to connect to localhost while running in Docker</td><td>true</td></tr><tr><td>DEV_MODE</td><td>dev_mode</td><td>false</td><td>Enables pretty log output and allows to use <a data-mention href="../advanced-request-tracing-art.md">advanced-request-tracing-art.md</a> without further security protection.</td><td>false</td></tr><tr><td>INSTANCE_ID</td><td></td><td>false</td><td>If not specified, a new ID will be generated with each router start. A stable ID ensures that metrics with the same ID are grouped together and the same server can be identified on the platform.</td><td></td></tr></tbody></table>

#### Example configuration:

{% code title="config.yaml" fullWidth="false" %}
```yaml
version: "1"
  
log_level: "info"
listen_addr: "localhost:3002"
controlplane_url: "https://cosmo-cp.wundergraph.com"
playground_enabled: true
playground_path: "/"
introspection_enabled: true
json_log: true
shutdown_delay: 15s
grace_period: 20s
poll_interval: 10s
health_check_path: "/health"
readiness_check_path: "/health/ready"
liveness_check_path: "/health/live"
router_config_path: ""
```
{% endcode %}

### Access Logs

For a detailed example, please refer to the [Access Logs](../access-logs.md) section.

<table data-full-width="true"><thead><tr><th width="334">Environment Variable</th><th width="331">YAML</th><th width="112" data-type="checkbox">Required</th><th width="320">Description</th><th>Default Value</th></tr></thead><tbody><tr><td></td><td>access_logs</td><td>false</td><td>Enable the access logs. The access logs are used to log the incoming requests. By default, the access logs are enabled and logged to the standard output.</td><td></td></tr><tr><td>ACCESS_LOGS_ENABLED</td><td>access_logs.enabled</td><td>false</td><td>Enable the access logs. The access logs are used to log the incoming requests. By default, the access logs are enabled and logged to the standard output.</td><td>true</td></tr><tr><td></td><td>access_logs.buffer</td><td>false</td><td>The buffer is used to buffer the logs before writing them to the output.</td><td></td></tr><tr><td>ACCESS_LOGS_BUFFER_ENABLED</td><td>access_logs.buffer.enabled</td><td>false</td><td>Enable the buffer.</td><td>false</td></tr><tr><td>ACCESS_LOGS_BUFFER_SIZE</td><td>access_logs.buffer.size</td><td>false</td><td>The size of the buffer. The default value is 256KB.</td><td></td></tr><tr><td>ACCESS_LOGS_FLUSH_INTERVAL</td><td>access_logs.buffer.flush_interval</td><td>false</td><td>The interval at which the buffer is flushed. The period is specified as a string with a number and a unit, e.g. 10ms, 1s, 1m, 1h. The supported units are 'ms', 's', 'm', 'h'.</td><td></td></tr><tr><td></td><td>access_logs.output</td><td>false</td><td>The log destination. The supported destinations are stdout and file. Only one option can be enabled. The default destination is stdout.</td><td></td></tr><tr><td>ACCESS_LOGS_OUTPUT_STDOUT_ENABLED</td><td>access_logs.output.stdout.enabled</td><td>false</td><td></td><td>true</td></tr><tr><td>ACCESS_LOGS_OUTPUT_FILE_ENABLED</td><td>access_logs.output.file.enabled</td><td>false</td><td></td><td>false</td></tr><tr><td>ACCESS_LOGS_FILE_OUTPUT_PATH</td><td>access_logs.output.file.path</td><td>false</td><td>The path to the log file. The path is used to specify the path to the log file.</td><td></td></tr><tr><td></td><td>access_logs.router</td><td>false</td><td>The configuration for access logs for the router.</td><td></td></tr><tr><td></td><td>access_logs.router.fields</td><td>false</td><td>The fields to add to the access logs for router. The fields are added to the logs as key-value pairs.</td><td>[]</td></tr><tr><td></td><td>access_logs.router.fields.key</td><td>false</td><td>The key of the field to add to the logs.</td><td></td></tr><tr><td></td><td>access_logs.router.fields.default</td><td>false</td><td>The default value of the field. If the value is not set, value_from is used. If both value and value_from are set, value_from has precedence and in case of a missing value_from, the default value is used.</td><td></td></tr><tr><td></td><td>access_logs.router.value_from</td><td>false</td><td>Defines a source for the field value e.g. from a request header. If both default and value_from are set, value_from has precedence.</td><td></td></tr><tr><td></td><td>access_logs.router.fields.value_from.request_header</td><td>false</td><td>The name of the request header from which to extract the value. The value is only extracted when a request context is available otherwise the default value is used.</td><td></td></tr><tr><td></td><td>access_logs.router.fields.value_from.context_field</td><td>false</td><td>The field name of the context from which to extract the value. The value is only extracted when a context is available otherwise the default value is used.<br><br><strong>One of:</strong><br>[ "operation_name", "operation_type", "operation_service_names", "operation_hash", "persisted_operation_sha256", "operation_sha256", "response_error_message", "graphql_error_codes", "graphql_error_service_names", "operation_parsing_time", "operation_validation_time", "operation_planning_time", "operation_normalization_time" ]</td><td></td></tr><tr><td></td><td>access_logs.subgraphs</td><td>false</td><td>The subgraph access logs configuration</td><td></td></tr><tr><td></td><td>access_logs.subgraphs.enabled</td><td>false</td><td>Enable the subgraphs access logs.</td><td>false</td></tr><tr><td></td><td>access_logs.subgraphs.fields</td><td>false</td><td>The fields to add to the logs when printing subgraph access logs. The fields are added to the logs as key-value pairs.</td><td></td></tr><tr><td></td><td>access_logs.subgraphs.fields.key</td><td>false</td><td>The key of the field to add to the logs.</td><td></td></tr><tr><td></td><td>access_logs.subgraphs.fields.default</td><td>false</td><td>The default value of the field. If the value is not set, value_from is used. If both value and value_from are set, value_from has precedence and in case of a missing value_from, the default value is used.</td><td></td></tr><tr><td></td><td>access_logs.subgraphs.value_from</td><td>false</td><td>Defines a source for the field value e.g. from a request header. If both default and value_from are set, value_from has precedence.</td><td></td></tr><tr><td></td><td>access_logs.subgraphs.fields.value_from.request_header</td><td>false</td><td>The name of the request header from which to extract the value. The value is only extracted when a request context is available otherwise the default value is used.</td><td></td></tr><tr><td></td><td>access_logs.subgraphs.fields.value_from.response_header</td><td>false</td><td>The name of the response header from which to extract the value. The value is only extracted when a request context is available otherwise the default value is used.</td><td></td></tr><tr><td></td><td>access_logs.subgraphs.fields.value_from.context_field</td><td>false</td><td>The field name of the context from which to extract the value. The value is only extracted when a context is available otherwise the default value is used.<br><br><strong>One of:</strong><br>[ "operation_name", "operation_type", "operation_service_names", "operation_hash", "persisted_operation_sha256", "operation_sha256", "operation_parsing_time", "operation_validation_time", "operation_planning_time", "operation_normalization_time" ]</td><td></td></tr></tbody></table>

#### Example YAML config:

{% code title="config.yaml" %}
```yaml
version: "1"

access_logs:
  enabled: true
  buffer:
    enabled: false
    size: 256KB
    flush_interval: 10s
  output:
    file:
      enabled: true
      path: "access.log"
  router: 
    fields:
    - key: "service"
      value_from:
        request_header: "x-service"
    - key: "operationName"
      value_from:
        context_field: operation_name
  subgraphs: 
    fields:
    - key: "service"
      value_from:
        request_header: "x-service"
    - key: "response-service"
      value_from:
        response_header: "x-response-service"
    - key: "operationName"
      value_from:
        context_field: operation_name
```
{% endcode %}

### Telemetry

### Graph

Overall configuration for the Graph that's configured for this Router.

<table data-full-width="true"><thead><tr><th>Environment Variable</th><th>YAML</th><th width="112" data-type="checkbox">Required</th><th width="283">Description</th><th>Default Value</th></tr></thead><tbody><tr><td>GRAPH_API_TOKEN</td><td>token</td><td>true</td><td>The token permits the router to communicate with the controlplane and export telemetry. Created with <a href="../../cli/router/token/create.md"><code>wgc router token create</code></a>. (Can be empty when providing a static router configuration through <code>ROUTER_CONFIG_PATH</code>but will disable the default telemetry stack)</td><td></td></tr></tbody></table>

Example YAML config:

{% code title="config.yaml" %}
```yaml
version: "1"

graph:
  token: "<your-graph-token>"
```
{% endcode %}

### TLS

The Router supports TLS and mTLS for secure communication with your clients and infrastructure components like load balancer.

#### Server TLS

<table data-full-width="true"><thead><tr><th width="345">Environment Variable</th><th>YAML</th><th width="112" data-type="checkbox">Required</th><th>Description</th><th>Default Value</th></tr></thead><tbody><tr><td>TLS_SERVER_ENABLED</td><td>enabled</td><td>false</td><td>Enables server TLS support.</td><td>false</td></tr><tr><td>TLS_SERVER_CERT_FILE</td><td>cert_file</td><td>false</td><td>The path to the server certificate file.</td><td></td></tr><tr><td>TLS_SERVER_KEY_FILE</td><td>key_file</td><td>false</td><td>The path to the server private key file.</td><td></td></tr></tbody></table>

#### Example YAML config:

{% code title="config.yaml" %}
```yaml
version: "1"
 
tls:
  server:
    enabled: true
    key_file: ../your/key.pem
    cert_file: ../your/cert.pem
```
{% endcode %}

#### Client Authentication

<table data-full-width="true"><thead><tr><th width="345">Environment Variable</th><th>YAML</th><th width="112" data-type="checkbox">Required</th><th>Description</th><th>Default Value</th></tr></thead><tbody><tr><td>TLS_CLIENT_AUTH_CERT_FILE</td><td>cert_file</td><td>false</td><td>Enables client authentication support. The file to the certificate file used to authenthicate clients.</td><td>""</td></tr><tr><td>TLS_CLIENT_AUTH_REQUIRED</td><td>required</td><td>false</td><td>Enforces a valid client certificate to establish a connection.</td><td>false</td></tr></tbody></table>

#### Example YAML config:

{% code title="config.yaml" %}
```yaml
version: "1"
 
tls:
  server:
    enabled: true # Required for client_auth
    key_file: ../your/key.pem
    cert_file: ../your/cert.pem
    client_auth:
      required: true
      cert_file: ../your/cert.pem
```
{% endcode %}

### Compliance

The configuration for the compliance. Includes for example the configuration for the anonymization of the IP addresses.

#### IP Anonymization

<table data-full-width="true"><thead><tr><th width="345">Environment Variable</th><th>YAML</th><th width="112" data-type="checkbox">Required</th><th>Description</th><th>Default Value</th></tr></thead><tbody><tr><td>SECURITY_ANONYMIZE_IP_ENABLED</td><td>enabled</td><td>false</td><td>Enables IP anonymization in traces and logs.</td><td>true</td></tr><tr><td>SECURITY_ANONYMIZE_IP_METHOD</td><td>method</td><td>false</td><td>The metod to anonymize IP addresses. Can be "hash" or "redact".</td><td>"redact"</td></tr></tbody></table>

#### Example YAML config:

{% code title="config.yaml" %}
```yaml
version: "1"
 
compliance:
  anonymize_ip:
    enabled: true
    method: redact # hash or redact
```
{% endcode %}

### Cluster

<table data-full-width="true"><thead><tr><th width="194">Environment Variable</th><th>YAML</th><th width="112" data-type="checkbox">Required</th><th>Description</th><th>Default Value</th></tr></thead><tbody><tr><td>CLUSTER_NAME</td><td>name</td><td>false</td><td>The logical name of the router cluster. The name is used for analytic purpose.</td><td></td></tr></tbody></table>

#### Example YAML config:

{% code title="config.yaml" %}
```yaml
version: "1"
 
# See "https://cosmo-docs.wundergraph.com/studio/cluster-management" for more information
cluster:
  name: "us-central1-cosmo-cloud "
```
{% endcode %}

### Telemetry

<table data-full-width="true"><thead><tr><th width="295">Environment Variable</th><th width="330">YAML</th><th width="112" data-type="checkbox">Required</th><th width="240">Description</th><th>Default Value</th></tr></thead><tbody><tr><td>TELEMETRY_SERVICE_NAME</td><td>service_name</td><td>true</td><td></td><td>cosmo-router</td></tr><tr><td></td><td>resource_attributes</td><td>false</td><td>The resource attributes to add to OTEL metrics and traces. The resource attributes identify the entity producing the traces and metrics.</td><td></td></tr><tr><td></td><td>resource_attributes.key</td><td>true</td><td>The key of the attribute.</td><td></td></tr><tr><td></td><td>resource_attributes.value</td><td>true</td><td>The value of the attribute.</td><td></td></tr><tr><td></td><td>attributes</td><td>false</td><td>The attributes to add to OTEL metrics and traces. Because Prometheus metrics rely on the OpenTelemetry metrics, the attributes are also added to the Prometheus metrics.</td><td>[]</td></tr><tr><td></td><td>attributes.key</td><td>false</td><td>The key of the attribute.</td><td></td></tr><tr><td></td><td>attributes.default</td><td>false</td><td>The value of the attribute.</td><td></td></tr><tr><td></td><td>attributes.value_from</td><td>false</td><td>Defines a source for the attribute value e.g. from a request header. If both default and value_from are set, value_from has precedence.</td><td></td></tr><tr><td></td><td>attributes.value_from.request_header</td><td>false</td><td>The name of the request header from which to extract the value. The value is only extracted when a request context is available otherwise the default value is used. Don't forget to add the header to your CORS settings.</td><td></td></tr></tbody></table>

#### Example YAML config:

{% code title="config.yaml" %}
```yaml
version: "1"

# Only needed when setting attributes based on a request header
cors:
  allow_headers:
    - "x-service"
 
# See "https://cosmo-docs.wundergraph.com/router/metrics-and-monitoring" for more information
telemetry:
  # Common options
  service_name: "cosmo-router"
  resource_attributes:
    - key: env
      value: "prod"
  attributes:
    - key: service
      default: "static"
      value_from:
        request_header: "x-service"
```
{% endcode %}

### Tracing

<table data-full-width="true"><thead><tr><th width="378">Environment Variable</th><th width="233">YAML</th><th width="112" data-type="checkbox">Required</th><th width="199">Description</th><th>Default Value</th></tr></thead><tbody><tr><td>TRACING_ENABLED</td><td>enabled</td><td>false</td><td></td><td>true</td></tr><tr><td>TRACING_SAMPLING_RATE</td><td>sampling_rate</td><td>true</td><td>The sampling rate for the traces. The value must be between 0 and 1. If the value is 0, no traces will be sampled. If the value is 1, all traces will be sampled.</td><td>1</td></tr><tr><td>TRACING_PARENT_BASED_SAMPLER</td><td>parent_based_sampler</td><td>true</td><td>Enable the parent-based sampler. The parent-based sampler is used to sample the traces based on the parent trace.</td><td>true</td></tr><tr><td>TRACING_BATCH_TIMEOUT</td><td></td><td>false</td><td>The maximum delay allowed before spans are exported.</td><td>10s</td></tr><tr><td>TRACING_EXPORT_GRAPHQL_VARIABLES</td><td>export_graphql_variables</td><td>false</td><td>Export GraphQL variables as span attribute. Variables may contain sensitive data.</td><td>false</td></tr><tr><td></td><td>with_new_root</td><td>false</td><td>Starts the root span always at the router.</td><td>false</td></tr></tbody></table>

#### Example YAML config:

{% code title="config.yaml" %}
```yaml
version: "1"
 
# See "https://cosmo-docs.wundergraph.com/router/metrics-and-monitoring" for more information
telemetry:
  # Common options
  service_name: "cosmo-router"
  # uses https://cosmo-otel.wundergraph.com for tracing and metrics

  # OpenTelemetry Tracing
  tracing:
    enabled: true
    sampling_rate: 1
    batch_timeout: '10s'
    export_graphql_variables: false
    with_new_root: false
```
{% endcode %}

#### Exporters

<table data-full-width="true"><thead><tr><th width="230">Environment Variable</th><th width="245">YAML</th><th width="112" data-type="checkbox">Required</th><th width="164">Description</th><th>Default Value</th></tr></thead><tbody><tr><td></td><td>disabled</td><td>false</td><td>bool</td><td></td></tr><tr><td></td><td>exporter</td><td>false</td><td>one of: http,grpc</td><td></td></tr><tr><td></td><td>endpoint</td><td>false</td><td></td><td></td></tr><tr><td></td><td>path</td><td>false</td><td></td><td></td></tr><tr><td></td><td>headers</td><td>false</td><td></td><td></td></tr></tbody></table>

#### Example YAML config:

{% code title="config.yaml" %}
```yaml
version: "1"
 
# See "https://cosmo-docs.wundergraph.com/router/metrics-and-monitoring" for more information
telemetry:
  tracing:
    enabled: true
    exporters:
      # If no exporters are defined, the default one is used
      - exporter: http # or grpc
        disabled: false
        endpoint: https://my-otel-collector.example.com
        # headers: {Authorization: Bearer <my-token>}
        batch_timeout: 10s
        export_timeout: 30s
```
{% endcode %}

#### Propagation

<table data-full-width="true"><thead><tr><th>Environment Variable</th><th width="186">YAML</th><th width="112" data-type="checkbox">Required</th><th>Description</th><th>Default Value</th></tr></thead><tbody><tr><td></td><td>trace_context</td><td>false</td><td></td><td>true</td></tr><tr><td></td><td>jaeger</td><td>false</td><td></td><td></td></tr><tr><td></td><td>b3</td><td>false</td><td></td><td></td></tr><tr><td></td><td>baggage</td><td>false</td><td></td><td></td></tr><tr><td></td><td>datadog</td><td>false</td><td>Enable Datadog trace propagation</td><td>false</td></tr></tbody></table>

#### Example YAML config:

{% code title="config.yaml" %}
```yaml
version: "1"
 
# See "https://cosmo-docs.wundergraph.com/router/metrics-and-monitoring" for more information
telemetry:
  # OpenTelemetry Tracing
  tracing:
    propagation:
      # https://www.w3.org/TR/trace-context/
      trace_context: true
      # https://www.w3.org/TR/baggage/
      baggage: false
      # https://www.jaegertracing.io/ (compliant with opentracing)
      jaeger: false
      # https://github.com/openzipkin/b3-propagation (zipkin)
      b3: false
      # https://docs.datadoghq.com/tracing/trace_collection/trace_context_propagation/?tab=java#datadog-format
      datadog: false      
```
{% endcode %}

### Metrics

#### OTLP

<table data-full-width="true"><thead><tr><th width="274">Environment Variable</th><th width="198">YAML</th><th width="101" data-type="checkbox">Required</th><th width="253">Description</th><th>Default Value</th></tr></thead><tbody><tr><td>METRICS_OTLP_ENABLED</td><td>enabled</td><td>true</td><td>Enables OTEL metrics instrumentation</td><td>true</td></tr><tr><td>METRICS_OTLP_ROUTER_RUNTIME</td><td>router_runtime</td><td>false</td><td>Enable the collection of metrics for the router runtime.</td><td>true</td></tr><tr><td>METRICS_OTLP_GRAPHQL_CACHE</td><td>graphql_cache</td><td>false</td><td>Enable the collection of metrics for the GraphQL operation router caches.</td><td>false</td></tr><tr><td>METRICS_OTLP_EXCLUDE_METRICS</td><td>exclude_metrics</td><td>false</td><td>The metrics to exclude from the OTEL metrics. Accepts a list of Go regular expressions. Use https://regex101.com/ to test your regular expressions.</td><td>[]</td></tr><tr><td>METRICS_OTLP_EXCLUDE_METRIC_LABELS</td><td>exclude_metric_labels</td><td>false</td><td>The metric labels to exclude from the OTEL metrics. Accepts a list of Go regular expressions. Use https://regex101.com/ to test your regular expressions.</td><td>[]</td></tr></tbody></table>

Attributes

<table data-full-width="true"><thead><tr><th width="209">YAML</th><th width="112" data-type="checkbox">Required</th><th width="387">Description</th><th>Default Value</th><th data-hidden>Environment Variable</th></tr></thead><tbody><tr><td>attributes</td><td>false</td><td>The attributes to add to OTLP Metrics and Prometheus.</td><td>[]</td><td></td></tr><tr><td>attributes.key</td><td>false</td><td>The key of the field.</td><td></td><td></td></tr><tr><td>attributes.default</td><td>false</td><td>The default value of the field. If the value is not set, value_from is used. If both value and value_from are set, value_from has precedence and in case of a missing value_from, the default value is used.</td><td></td><td></td></tr><tr><td>attributes.value_from</td><td>false</td><td>Defines a source for the field value e.g. from a request header or request context. If both default and value_from are set, value_from has precedence.</td><td></td><td></td></tr><tr><td>attributes.value_from</td><td>false</td><td>Defines a source for the field value e.g. from a request header or request context. If both default and value_from are set, value_from has precedence.</td><td></td><td></td></tr><tr><td>attributes.value_from.request_header</td><td>false</td><td>The name of the request header from which to extract the value. The value is only extracted when a request context is available otherwise the default value is used.</td><td></td><td></td></tr><tr><td>attributes.value_from.context_field</td><td>false</td><td>The field name of the context from which to extract the value. The value is only extracted when a context is available otherwise the default value is used.</td><td><strong>One of:</strong><br>["operation_service_names", "graphql_error_codes", "graphql_error_service_names", "operation_sha256"]</td><td></td></tr></tbody></table>

#### Example YAML config:

{% code title="config.yaml" %}
```yaml
# See "https://cosmo-docs.wundergraph.com/router/metrics-and-monitoring" for more information
telemetry:
  metrics:
    otlp:
      enabled: true
      router_runtime: true
      graphql_cache: true
      exclude_metrics: []
      exclude_metric_labels: []
    attributes:
      - key: "x-new-attribute"
        default: "foo" 
        value_from:
          request_header: "X-Request-ID"

      - key: "error_codes"
        value_from:
          context_field: graphql_error_codes
```
{% endcode %}

#### Prometheus

<table data-full-width="true"><thead><tr><th width="387">Environment Variable</th><th width="207">YAML</th><th width="112" data-type="checkbox">Required</th><th width="183">Description</th><th>Default Value</th></tr></thead><tbody><tr><td>PROMETHEUS_ENABLED</td><td>enabled</td><td>true</td><td>Enables prometheus metrics support</td><td>true</td></tr><tr><td>PROMETHEUS_HTTP_PATH</td><td>path</td><td>false</td><td>The HTTP path where metrics are exposed.</td><td>"/metrics"</td></tr><tr><td>PROMETHEUS_LISTEN_ADDR</td><td>listen_addr</td><td>false</td><td>The prometheus listener address</td><td>"127.0.0.1:8088"</td></tr><tr><td>PROMETHEUS_GRAPHQL_CACHE</td><td>graphql_cache</td><td>false</td><td>Enable the collection of metrics for the GraphQL operation router caches.</td><td>false</td></tr><tr><td>PROMETHEUS_EXCLUDE_METRICS</td><td>exclude_metrics</td><td>false</td><td></td><td></td></tr><tr><td>PROMETHEUS_EXCLUDE_METRIC_LABELS</td><td>exclude_metric_labels</td><td>false</td><td></td><td></td></tr></tbody></table>

#### Example YAML config:

{% code title="config.yaml" %}
```yaml
version: "1"

# See "https://cosmo-docs.wundergraph.com/router/metrics-and-monitoring" for more information
telemetry:
  metrics:
    # Expose OpenTelemetry metrics for scraping
    prometheus:
      enabled: true
      path: "/metrics"
      listen_addr: "127.0.0.1:8088"
      graphql_cache: true
      exclude_metrics: []
      exclude_metric_labels: []
```
{% endcode %}

#### Exporter

<table data-full-width="true"><thead><tr><th>YAML</th><th width="112" data-type="checkbox">Required</th><th width="206">Description</th><th>Default Value</th><th data-hidden>Environment Variable</th></tr></thead><tbody><tr><td>disabled</td><td>false</td><td></td><td></td><td></td></tr><tr><td>exporter</td><td>false</td><td>one of: http,grpc</td><td></td><td></td></tr><tr><td>endpoint</td><td>false</td><td></td><td></td><td></td></tr><tr><td>path</td><td>false</td><td>The path to which the metrics are exported. This is ignored when using 'grpc' as exporter and can be omitted.</td><td></td><td></td></tr><tr><td>headers</td><td>false</td><td></td><td></td><td></td></tr><tr><td>temporality</td><td>false</td><td>Temporality defines the window that an aggregation is calculated over.<br><br>one of: delta, cumulative</td><td></td><td></td></tr></tbody></table>

#### Example YAML config:

{% code title="config.yaml" %}
```yaml
version: "1"

# See "https://cosmo-docs.wundergraph.com/router/metrics-and-monitoring" for more information
telemetry:
  # Common options
  service_name: "cosmo-router"
  # uses https://cosmo-otel.wundergraph.com for tracing and metrics

  # OpenTelemetry Metrics
  metrics:
    otlp:
      enabled: true
      # If no exporters are defined, the default one is used
      exporters:
        - exporter: http # or grpc
          disabled: false
          endpoint: https://my-otel-collector.example.com
          temporality: delta # or cumulative
          # headers: {Authorization: Bearer <my-token>}
          
    # Expose OpenTelemetry metrics for scraping
    prometheus:
      enabled: true
      path: "/metrics"
      listen_addr: "127.0.0.1:8088"
      exclude_metrics: []
      exclude_metric_labels: []
```
{% endcode %}

### GraphQL Metrics

<table data-full-width="true"><thead><tr><th width="406">Environment Variable</th><th width="196">YAML</th><th width="112" data-type="checkbox">Required</th><th width="183">Description</th><th>Default Value</th></tr></thead><tbody><tr><td>GRAPHQL_METRICS_ENABLED</td><td>enabled</td><td>false</td><td></td><td>true</td></tr><tr><td>GRAPHQL_METRICS_COLLECTOR_ENDPOINT</td><td>collector_endpoint</td><td>true</td><td>Default endpoint</td><td><a href="https://cosmo-metrics.wundergraph.com">https://cosmo-metrics.wundergraph.com</a></td></tr></tbody></table>

#### Example YAML config:

{% code title="config.yaml" %}
```yaml
version: "1"

graphql_metrics:
    enabled: true
    collector_endpoint: 'https://cosmo-metrics.wundergraph.com'
```
{% endcode %}

### CORS

<table data-full-width="true"><thead><tr><th width="295">Environment Variable</th><th width="196">YAML</th><th width="112" data-type="checkbox">Required</th><th width="183">Description</th><th>Default Value</th></tr></thead><tbody><tr><td>CORS_ENABLED</td><td>enabled</td><td>false</td><td>Set this to enable/disable the CORS middleware. It is enabled by default. When disabled, the rest of the properties for CORS have no effect.</td><td>true</td></tr><tr><td>CORS_ALLOW_ORIGINS</td><td>allow_origins</td><td>false</td><td>This is a list of origins which are allowed. You can provide origins with wildcards</td><td>*</td></tr><tr><td>CORS_ALLOW_METHODS</td><td>allow_methods</td><td>false</td><td></td><td>HEAD,GET,POST</td></tr><tr><td>CORS_ALLOW_HEADERS</td><td>allow_headers</td><td>false</td><td></td><td>Origin,Content-Length,Content-Type</td></tr><tr><td>CORS_ALLOW_CREDENTIALS</td><td>allow_credentials</td><td>false</td><td></td><td>true</td></tr><tr><td>CORS_MAX_AGE</td><td>max_age</td><td>false</td><td></td><td>5m</td></tr></tbody></table>

#### Example YAML config:

{% code title="config.yaml" %}
```yaml
version: "1"

cors:
  allow_origins: ["*"]
  allow_methods:
    - HEAD
    - GET
    - POST
  allow_headers:
    - Origin
    - Content-Length
    - Content-Type
  allow_credentials: true
  max_age: 5m
```
{% endcode %}

### Cache Control Policy

Configure your cache control policy. More information on this feature can be found here: [#cache-control-policy](../proxy-capabilities/#cache-control-policy "mention")

<table data-full-width="true"><thead><tr><th width="295">Environment Variable</th><th width="196">YAML</th><th width="112" data-type="checkbox">Required</th><th width="183">Description</th><th>Default Value</th></tr></thead><tbody><tr><td>CACHE_CONTROL_POLICY_ENABLED</td><td>enabled</td><td>false</td><td>Set this to enable/disable the strict cache control policy. It is false by default</td><td>false</td></tr><tr><td>CACHE_CONTROL_POLICY_VALUE</td><td>value</td><td>false</td><td>The default value for the cache control policy. It will be applied to all requests, unless a subgraph has a more strict one</td><td></td></tr></tbody></table>

#### Example YAML Config:

{% code title="config.yaml" %}
```yaml
version: "1"

cache_control_policy:
  enabled: true
  value: "max-age=180, public"
  subgraphs:
    - name: "products"
      value: "max-age=60, public"
    - name: "pricing"
      value: "no-cache"
```
{% endcode %}

### Custom Modules

Configure your custom Modules. More information on this feature can be found here: [custom-modules.md](../custom-modules.md "mention")

Example YAML config:

{% code title="config.yaml" %}
```yaml
version: "1"

modules:
  myModule:
    # Arbitrary values, unmarshalled by the module
    value: 1
```
{% endcode %}

### Headers

Configure Header propagation rules for all Subgraphs or individual Subgraphs by name.

#### Cookie Whitelist

When `Cookie`is a propagated header, you may want to filter the keys that are forwarded to the subgraph from the client, you can do this via the `cookie_whitelist`option, which is a list of string cookie keys that will not be discarded. An empty value means allow all. If you'd like to block all cookies, disable the header propagation entirely.

{% hint style="info" %}
The cookie whitelist can also affect custom modules that read request cookies, even if propagation is disabled for the `Cookie` header. This is because the whitelisting happens very early in the request lifecycle, before it reaches subgraphs or custom modules.
{% endhint %}

**Example YAML config:**

```yaml
version: "1"

# Header manipulation
# See "https://cosmo-docs.wundergraph.com/router/proxy-capabilities" for more info
headers:
  cookie_whitelist:
   - "authorization"
   - "my-cookie-key"
  all:
    request:
      - op: "propagate"
        named: Cookie
```



#### Global Header Rules

Apply to requests/responses to/from "all" Subgraphs. These will be applied globally in the graph

<table data-full-width="true"><thead><tr><th width="217">Environment Variable</th><th width="196">YAML</th><th width="112" data-type="checkbox">Required</th><th width="183">Description</th><th>Default Value</th></tr></thead><tbody><tr><td></td><td>request</td><td>false</td><td>List of Request Header Rules</td><td></td></tr><tr><td></td><td>response</td><td>false</td><td>List of Response Header Rules</td><td></td></tr></tbody></table>

#### Example YAML config:

{% code title="config.yaml" %}
```yaml
version: "1"

# Header manipulation
# See "https://cosmo-docs.wundergraph.com/router/proxy-capabilities" for more info
headers:
  all: # Header rules for all origin requests.
    request:
      - op: "propagate"
        named: X-Test-Header
      - op: "propagate"
        matching: (?i)^x-deprecated-.*
      - op: "set"
        name: "X-API-Key"
        value: "my-secret-value"
    response:
      - op: "propagate"
        algorithm: "append"
        named: "X-Custom-Header"
```
{% endcode %}

#### Request Header Rule

Apply to requests to specific Subgraphs.

<table data-full-width="true"><thead><tr><th width="217">Environment Variable</th><th width="196">YAML</th><th width="112" data-type="checkbox">Required</th><th width="183">Description</th><th>Default Value</th></tr></thead><tbody><tr><td></td><td>op</td><td>true</td><td>oneof=propagate, set</td><td></td></tr><tr><td></td><td>matching</td><td>false</td><td>matching is the regex to match the header name against</td><td></td></tr><tr><td></td><td>named</td><td>false</td><td>named is the exact header name to match</td><td></td></tr><tr><td></td><td>rename</td><td>false</td><td>renames the header's key to the provided value</td><td></td></tr><tr><td></td><td>default</td><td>false</td><td>default is the default value to set if the header is not present</td><td></td></tr><tr><td></td><td>name</td><td>false</td><td>If <code>op</code> is <code>set</code>, <code>name</code> is the name of the desired header to set</td><td></td></tr><tr><td></td><td>value</td><td>false</td><td>If <code>op</code> is <code>set</code>, <code>value</code> is the value of the desired header to set</td><td></td></tr></tbody></table>

#### Example YAML config:

{% code title="config.yaml" %}
```yaml
version: "1"

# Header manipulation
# See "https://cosmo-docs.wundergraph.com/router/proxy-capabilities" for more information
headers:
  subgraphs:
    product: # Header rules for the "product" Subgraph
      request:
        - op: "propagate"
          named: X-Test-Header
        - op: "set"
          name: "X-API-Key"
          value: "my-secret-value"
```
{% endcode %}

#### Response Header Rule

These rules can be applied to all responses, as well as just to specific subgraphs, and used to manipulate and propagate response headers from subgraphs to the client. By configuring the rule, users can define how headers should be handled when multiple subgraphs provide conflicting values for a specific header.

<table data-full-width="true"><thead><tr><th width="217">Environment Variable</th><th width="196">YAML</th><th width="112" data-type="checkbox">Required</th><th width="183">Description</th><th>Default Value</th></tr></thead><tbody><tr><td></td><td>op</td><td>true</td><td>oneof=propagate</td><td></td></tr><tr><td></td><td>algorithm</td><td>true</td><td>oneof=first_write, last_write, append</td><td></td></tr><tr><td></td><td>matching</td><td>false</td><td>matching is the regex to match the header name against. This</td><td></td></tr><tr><td></td><td>named</td><td>false</td><td>named is the exact header name to match</td><td></td></tr><tr><td></td><td>default</td><td>false</td><td>default is the default value to set if the header is not present</td><td></td></tr><tr><td></td><td>rename</td><td>false</td><td>renames the header's key to the provided value</td><td></td></tr></tbody></table>

#### Example YAML config:

{% code title="config.yaml" %}
```yaml
version: "1"

# Header manipulation
# See "https://cosmo-docs.wundergraph.com/router/proxy-capabilities" for more information
headers:
  subgraphs:
    product: # Header rules for the "product" Subgraph
      response:
        - op: "propagate"
          algorithm: "append"
          named: "X-Test-Header"
        - op: "propagate"
          algorithm: "last_write"
          named: "X-Test2-Header"
        - op: "set"
          name: "X-User-Key"
          value: "my-user-value"
```
{% endcode %}

### Storage Providers

The configuration for the storage providers. Storage providers can be used to store the persisted operations and the execution config.

#### Example YAML config:

{% code title="" %}
```yaml
version: "1"

storage_providers:
  cdn:
    - url: https://cosmo-cdn.wundergraph.com
      id: cdn
  s3:
    - id: "s3"
      endpoint: "localhost:10000"
      bucket: "cosmo"
      access_key: "key"
      secret_key: "secret"
      region: us-east-1
      secure: false
  redis:
    - id: "my-redis"
      cluster_enabled: false
      urls: 
        - "redis://localhost:6379"
```
{% endcode %}

{% hint style="info" %}
Users can supply a list of URLs for their redis storage provider.&#x20;

* If `cluster_enabled: false` , then we will use the first URL for the connection URL.&#x20;
* If `cluster_enabled: true` , then we will use all of the URLs for the [Redis Cluster](https://redis.io/docs/latest/operate/oss_and_stack/management/scaling/) connection.&#x20;

URLs can be supplied with redis configuration options embedded, such as: \
`redis://myUser:myPass@localhost:6379?ssl=true&db=1@connectTimeout=2`&#x20;
{% endhint %}

{% hint style="warning" %}
Prior to [router@v0.169.0](https://github.com/wundergraph/cosmo/releases/tag/router%400.168.1), the redis configuration looks like:

```
  redis:
    - id: "my_redis"
      url: "redis://localhost:6379"
```
{% endhint %}

#### Storage Provider Yaml Options

These rules apply to requests being made from the Router to all Subgraphs.

<table data-full-width="true"><thead><tr><th width="355">Environment Variable</th><th width="237">YAML</th><th width="88" data-type="checkbox">Required</th><th width="183">Description</th><th>Default Value</th></tr></thead><tbody><tr><td></td><td>cdn</td><td>false</td><td>CDN storage provider.</td><td></td></tr><tr><td></td><td>cdn.id</td><td>true</td><td>Unique ID of the provider. It is used as reference in <code>persisted_operations</code> and <code>execution_config</code> sections.</td><td></td></tr><tr><td></td><td>cdn.url</td><td>false</td><td></td><td>"https://cosmo-cdn.wundergraph.com"</td></tr><tr><td></td><td>redis</td><td>false</td><td>Redis storage provider</td><td></td></tr><tr><td>STORAGE_PROVIDER_REDIS_ID</td><td>redis.id</td><td>true</td><td>Unique ID of the provider. It is used as a reference in the <code>automatic_persisted_queries</code> section</td><td></td></tr><tr><td>STORAGE_PROVIDER_REDIS_CLUSTER_ENABLED</td><td>redis.cluster_enabled</td><td>false</td><td>If the Redis instance is a Redis cluster</td><td></td></tr><tr><td>STORAGE_PROVIDER_REDIS_URLS</td><td>redis.urls</td><td>true</td><td>List of Redis urls, containing port and auth information if necessary. Must contain at least one element</td><td></td></tr><tr><td></td><td>s3</td><td>false</td><td>S3 storage provider</td><td></td></tr><tr><td></td><td>s3.id</td><td>true</td><td>Unique ID of the privider. It is used as reference in <code>persisted_operations</code> and <code>execution_config</code> sections.</td><td></td></tr><tr><td></td><td>s3.endpoint</td><td>false</td><td>The endpoint of the S3 bucket. The endpoint is used to specify the endpoint of the S3 bucket.</td><td></td></tr><tr><td></td><td>s3.bucket</td><td>false</td><td>The name of the S3 bucket. The S3 bucket is used to store the execution config.</td><td></td></tr><tr><td></td><td>s3.access_key</td><td>false</td><td>The access key of the S3 bucket. The access key ID is used to authenticate with the S3 bucket.</td><td></td></tr><tr><td></td><td>s3.secret_key</td><td>false</td><td>The secret key of the S3 bucket. The secret access key is used to authenticate with the S3 bucket.</td><td></td></tr><tr><td></td><td>s3.region</td><td>false</td><td>The region of the S3 bucket. The region is used to specify the region of the S3 bucket</td><td></td></tr><tr><td></td><td>s3.secure</td><td>false</td><td>Enables https in the provided endpoint. Must be set to <code>false</code> when accessing http endpoints</td><td>true</td></tr><tr><td></td><td></td><td>false</td><td></td><td></td></tr></tbody></table>

### Persisted Operations

The configuration for the persisted operations allows you to maintain a fixed set of GraphQL operations that can be queried against the router without exposing your entire graph to the public. This approach enhances security and performance.

#### Example YAML config:

{% code title="" %}
```yaml
version: "1"

persisted_operations:
  cache: 
    size: 100MB
  storage: 
    provider_id: s3
    object_prefix: wundergraph
```
{% endcode %}

#### Persisted Operations Configuration Options

These rules apply to requests being made from the Router to all Subgraphs.

<table data-full-width="true"><thead><tr><th width="209">Environment Variable</th><th width="364">YAML</th><th width="113" data-type="checkbox">Required</th><th width="307">Description</th><th>Default Value</th></tr></thead><tbody><tr><td></td><td>persisted_operations</td><td>false</td><td>The configuration for the persisted operations.</td><td></td></tr><tr><td></td><td>persisted_operations.cache</td><td>false</td><td>LRU cache for persisted operations.</td><td></td></tr><tr><td>PERSISTED_OPERATIONS_CACHE_SIZE</td><td>persisted_operations.cache.size</td><td>false</td><td>The size of the cache in SI unit.</td><td>"100MB"</td></tr><tr><td></td><td>persisted_operations.storage</td><td>false</td><td>The storage provider for persisted operation. Only one provider can be active. When no provider is specified, the router will fallback to the Cosmo CDN provider to download the persisted operations.</td><td></td></tr><tr><td>PERSISTED_OPERATIONS_STORAGE_PROVIDER_ID</td><td>persisted_operations.storage.provider_id</td><td>true</td><td>The ID of the storage provider. The ID must match the ID of the storage provider in the <code>storage_providers</code> section.</td><td></td></tr><tr><td>PERSISTED_OPERATIONS_STORAGE_OBJECT_PREFIX</td><td>persisted_operations.storage.object_prefix</td><td>true</td><td>The prefix of the object in the storage provider location. The prefix is put in front of the operation SHA256 hash. $prefix/SHA256.json</td><td></td></tr></tbody></table>

### Automatic Persisted Queries

The configuration for automatic persisted queries allows you to enable automated caching of select GraphQL operations that can be queried against the router, using both POST and GET requests. This approach enhances performance.

It defaults to using a local cache (with the size defined in `cache.size`), but users can optionally use a Redis storage

#### Example YAML config:

{% code title="" %}
```yaml
version: "1"

automatic_persisted_queries:
  enabled: true
  cache:
    size: 10MB # This is only relevant for an in-memory cache that we maintain
    ttl: 900 # in seconds, set both for a local and a remote KV
  storage:
    provider_id: "my_redis"
    object_prefix: cosmo_apq    
```
{% endcode %}

#### Configuration Options

These rules apply to requests being made from the Router to all Subgraphs.

<table data-full-width="true"><thead><tr><th width="130">Environment Variable</th><th width="364">YAML</th><th width="113" data-type="checkbox">Required</th><th width="307">Description</th><th>Default Value</th></tr></thead><tbody><tr><td></td><td>automatic_persisted_queries</td><td>false</td><td>The configuration for the persisted operations.</td><td></td></tr><tr><td></td><td>automatic_persisted_queries.enabled</td><td>false</td><td>Whether or not automatic persisted queries is enabled</td><td>True</td></tr><tr><td></td><td>automatic_persisted_queries.cache</td><td>false</td><td>LRU cache for persisted operations.</td><td></td></tr><tr><td></td><td>automatic_persisted_queries.cache.size</td><td>false</td><td>The size of the cache in SI unit.</td><td>"100MB"</td></tr><tr><td></td><td>automatic_persisted_queries.cache.ttl</td><td>false</td><td>The TTL of the cache, in seconds. Set to 0 to set no TTL</td><td></td></tr><tr><td></td><td>automatic_persisted_queries.storage</td><td>false</td><td>The external storage provider (redis) for automatic persisted operation. Only one provider can be active. When no provider is specified, the router will fallback to using a local in-memory cache (configured in the <code>automatic_persisted_queries.cache</code> options)</td><td></td></tr><tr><td></td><td>automatic_persisted_queries.storage.provider_id</td><td>true</td><td>The ID of the Redis storage provider. The ID must match the ID of the storage provider in the <code>storage_providers.redis</code> section.</td><td></td></tr><tr><td></td><td>automatic_persisted_queries.storage.object_prefix</td><td>true</td><td>The prefix of the object in the storage provider location. The prefix is put in front of the operation SHA256 hash. $prefix/SHA256</td><td></td></tr></tbody></table>

### Execution Config

The configuration for the execution setup contains instructions for the router to plan and execute your GraphQL operations. You can specify the storage provider from which the configuration should be fetched.

#### Example YAML config:

{% code title="" %}
```yaml
version: "1"

execution_config:
  storage:
    provider_id: s3
    object_path: /prod
```
{% endcode %}

#### Subgraph Request Rules

These rules apply to requests being made from the Router to all Subgraphs.

<table data-full-width="true"><thead><tr><th width="238">Environment Variable</th><th width="384">YAML</th><th width="113" data-type="checkbox">Required</th><th width="269">Description</th><th>Default Value</th></tr></thead><tbody><tr><td></td><td>execution_config</td><td>false</td><td>The configuration for the execution config.</td><td></td></tr><tr><td></td><td>file</td><td>false</td><td>The configuration for the execution config file. The config file is used to load the execution config from the local file system. The file has precedence over the storage provider.</td><td></td></tr><tr><td>EXECUTION_CONFIG_FILE_PATH</td><td>file.path</td><td>false</td><td>The path to the execution config file. The path is used to load the execution config from the local file system.</td><td></td></tr><tr><td>EXECUTION_CONFIG_FILE_WATCH</td><td>file.watch</td><td>false</td><td>Enable the watch mode. The watch mode is used to watch the execution config file for changes. If the file changes, the router will reload the execution config without downtime.</td><td>"true"</td></tr><tr><td></td><td>execution_config.storage</td><td>false</td><td>The storage provider for the execution config. Only one provider can be active. When no provider is specified, the router will fallback to the Cosmo CDN provider to download the execution config.</td><td></td></tr><tr><td>EXECUTION_CONFIG_STORAGE_PROVIDER_ID</td><td>execution_config.storage.provider_id</td><td>true</td><td>The ID of the storage provider. The ID must match the ID of the storage provider in the <code>storage_providers</code> section.</td><td></td></tr><tr><td>EXECUTION_CONFIG_STORAGE_OBJECT_PATH</td><td>execution_config.storage.object_path</td><td>true</td><td>The path to the execution config in the storage provider. The path is used to download the execution config from the S3 bucket.</td><td></td></tr><tr><td>EXECUTION_CONFIG_FALLBACK_STORAGE_ENABLED</td><td>execution_config.fallback_storage.enabled</td><td>false</td><td>Enable a fallback storage to fetch the execution config in case the above primary source fails.</td><td></td></tr><tr><td>EXECUTION_CONFIG_FALLBACK_STORAGE_PROVIDER_ID</td><td>execution_config.fallback_storage.provider_id</td><td>false</td><td>The ID of the storage provider. The ID must match the ID of the storage provider in the <code>storage_providers</code> section.</td><td></td></tr><tr><td>EXECUTION_CONFIG_FALLBACK_STORAGE_OBJECT_PATH</td><td>execution_config.fallback_storage.object_path</td><td>false</td><td>The path to the execution config in the storage provider. The path is used to download the execution config from the S3 bucket.</td><td></td></tr></tbody></table>

### Traffic Shaping

Configure rules for traffic shaping like maximum request body size, timeouts, retry behavior, etc. For more info, check this section in the docs: [traffic-shaping](../traffic-shaping/ "mention")

#### Example YAML config:

{% code title="" %}
```yaml
version: "1"

# Traffic configuration
# See "https://cosmo-docs.wundergraph.com/router/traffic-shaping" for more information
traffic_shaping:
  # Apply to all requests from clients to the router
  router:
    # Is the maximum size of the request body in MB, mib
    max_request_body_size: 5MB
    max_header_bytes: 1MiB
    decompression_enabled: true
  all: # Rules are applied to all subgraph requests.
    # Subgraphs transport options
    request_timeout: 60s
    dial_timeout: 30s
    tls_handshake_timeout: 0s
    response_header_timeout: 0s
    expect_continue_timeout: 0s
    keep_alive_idle_timeout: 0s
    keep_alive_probe_interval: 30s
    max_idle_conns: 1024
    max_conns_per_host: 100
    max_idle_conns_per_host: 20
    # Retry
    retry: # Rule is only applied to GraphQL operations of type "query"
      enabled: true
      algorithm: "backoff_jitter"
      max_attempts: 5
      interval: 3s
      max_duration: 10s
  subgraphs: # allows you to create subgraph specific traffic shaping rules
    products: # Will only affect this subgraph, and override the options in "all" for that subgraph
      request_timeout: 60s
      dial_timeout: 30s
      keep_alive_idle_timeout: 0s
      keep_alive_probe_interval: 
      tls_handshake_timeout: 10s
      response_header_timeout: 0s
      expect_continue_timeout: 0s
      max_idle_conns: 1024
      max_conns_per_host: 100
      max_idle_conns_per_host: 20
```
{% endcode %}

#### Subgraph Request Rules

These rules apply to requests being made from the Router to all Subgraphs.

<table data-full-width="true"><thead><tr><th width="209">Environment Variable</th><th width="270">YAML</th><th width="112" data-type="checkbox">Required</th><th width="183">Description</th><th>Default Value</th></tr></thead><tbody><tr><td></td><td>retry</td><td>false</td><td><a data-mention href="./#traffic-shaping-jitter-retry">#traffic-shaping-jitter-retry</a></td><td></td></tr><tr><td></td><td>request_timeout</td><td>true</td><td></td><td>60s</td></tr><tr><td></td><td>dial_timeout</td><td>false</td><td></td><td>30s</td></tr><tr><td></td><td>response_header_timeout</td><td>false</td><td></td><td>0s</td></tr><tr><td></td><td>expect_continue_timeout</td><td>false</td><td></td><td>0s</td></tr><tr><td></td><td>tls_handshake_timeout</td><td>false</td><td></td><td>10s</td></tr><tr><td></td><td>keep_alive_idle_timeout</td><td>false</td><td></td><td>0s</td></tr><tr><td></td><td>keep_alive_probe_interval</td><td>false</td><td></td><td>30s</td></tr><tr><td></td><td>max_idle_conns</td><td>false</td><td></td><td>1024</td></tr><tr><td></td><td>max_conns_per_host</td><td>false</td><td></td><td>100</td></tr><tr><td></td><td>max_idle_conns_per_host</td><td>false</td><td></td><td>20</td></tr></tbody></table>

#### Subgraph specific request rules

In addition to the general traffic shaping rules, we also allow users to set subgraph specific timeout options, overriding the default traffic rules defined in `all`(if present)

<table data-full-width="true"><thead><tr><th width="209">Environment Variable</th><th width="270">YAML</th><th width="133" data-type="checkbox">Required</th><th width="183">Description</th><th>Default Value</th></tr></thead><tbody><tr><td></td><td>request_timeout</td><td>false</td><td></td><td>60s</td></tr><tr><td></td><td>dial_timeout</td><td>false</td><td></td><td>30s</td></tr><tr><td></td><td>response_header_timeout</td><td>false</td><td></td><td>0s</td></tr><tr><td></td><td>expect_continue_timeout</td><td>false</td><td></td><td>0s</td></tr><tr><td></td><td>tls_handshake_timeout</td><td>false</td><td></td><td>10s</td></tr><tr><td></td><td>keep_alive_idle_timeout</td><td>false</td><td></td><td>0s</td></tr><tr><td></td><td>keep_alive_probe_interval</td><td>false</td><td></td><td>30s</td></tr><tr><td></td><td>max_idle_conns</td><td>false</td><td></td><td>1024</td></tr><tr><td></td><td>max_conns_per_host</td><td>false</td><td></td><td>100</td></tr><tr><td></td><td>max_idle_conns_per_host</td><td>false</td><td></td><td>20</td></tr></tbody></table>

#### Jitter Retry

<table data-full-width="true"><thead><tr><th width="236">Environment Variable</th><th width="196">YAML</th><th width="112" data-type="checkbox">Required</th><th width="183">Description</th><th>Default Value</th></tr></thead><tbody><tr><td>RETRY_ENABLED</td><td>enabled</td><td>false</td><td></td><td>true</td></tr><tr><td></td><td>algorithm</td><td>false</td><td>backoff_jitter</td><td>backoff_jitter</td></tr><tr><td></td><td>max_attempts</td><td>true</td><td></td><td></td></tr><tr><td></td><td>max_duration</td><td>true</td><td></td><td></td></tr><tr><td></td><td>interval</td><td>true</td><td></td><td></td></tr></tbody></table>

#### Client Request Request Rules

These rules apply to requests being made from clients to the Router.



<table data-full-width="true"><thead><tr><th width="221">Environment Variable</th><th width="216">YAML</th><th width="111" data-type="checkbox">Required</th><th width="348">Description</th><th>Default Value</th></tr></thead><tbody><tr><td></td><td>max_request_body_size</td><td>false</td><td></td><td>5mb</td></tr><tr><td>MAX_HEADER_BYTES</td><td>max_header_bytes</td><td>false</td><td><p>Minimum Router version:  <a href="https://github.com/wundergraph/cosmo/compare/router@0.155.0...router@0.156.0">0.156.0</a></p><p></p><p></p><p>The maximum size of the request headers. Setting this to 0 uses the default value from the http standard lib, which is 1MiB.</p></td><td>1mib</td></tr><tr><td></td><td>decompression_enabled</td><td>false</td><td><p>When enabled, the router will check incoming requests for a 'Content-Encoding' header and decompress the body accordingly. </p><p></p><p>Note: Currently only "gzip" is supported</p></td><td>true</td></tr></tbody></table>

### WebSocket

Configure WebSocket handlers, protocols, and more.

#### WebSocket Configuration

<table data-full-width="true"><thead><tr><th width="248">Environment Variable</th><th width="305">YAML</th><th width="112" data-type="checkbox">Required</th><th width="183">Description</th><th>Default Value</th></tr></thead><tbody><tr><td>WEBSOCKETS_ENABLED</td><td>enabled</td><td>true</td><td></td><td>true</td></tr><tr><td></td><td>absinthe_protocol</td><td>false</td><td><a data-mention href="./#absinthe-protocol-configuration">#absinthe-protocol-configuration</a></td><td></td></tr><tr><td></td><td>forward_upgrade_headers</td><td>false</td><td>Forward all useful Headers from the Upgrade Request, like User-Agent or Authorization in the extensions field when subscribing on a Subgraph</td><td></td></tr><tr><td></td><td>forward_upgrade_query_params</td><td>false</td><td>Forward all query parameters from the Upgrade Request in the extensions field when subscribing on a Subgraph</td><td></td></tr><tr><td>WEBSOCKETS_FORWARD_INITIAL_PAYLOAD</td><td>forward_initial_payload</td><td>false</td><td>Forward the initial payload from a client subscription in the extensions field when subscribing on a Subgraph</td><td>true</td></tr></tbody></table>

#### Absinthe Protocol Configuration

Legacy WebSocket clients that use the Absinthe protocol might not be able to send a Subprotocol Header. For such clients, you can use the Absinthe Endpoint which automatically chooses the Subprotocol for them so that no Subprotocol Header needs to be set.

<table data-full-width="false"><thead><tr><th width="394">Environment Variable</th><th width="196">YAML</th><th width="112" data-type="checkbox">Required</th><th width="183">Description</th><th>Default Value</th></tr></thead><tbody><tr><td>WEBSOCKETS_ABSINTHE_ENABLED</td><td>enabled</td><td>false</td><td></td><td>true</td></tr><tr><td>WEBSOCKETS_ABSINTHE_HANDLER_PATH</td><td>handler_path</td><td>false</td><td>The path to mount the Absinthe handler on</td><td>/absinthe/socket</td></tr></tbody></table>

#### WebSocket Authentication

It's possible that Authentication for a WebSocket connection is not possible at the HTTP layer. In such a case, you can enable Authentication "from\_initial\_payload". This will extract a value from the "initial\_payload" field in the first WebSocket message which is responsible for negotiating the protocol between client and server.

In addition, it's possible to export the extracted value into a Request Header, which allows the Router to propagate it using [Header Propagation Rules](./#global-header-rules) in subsequent Subgraph Requests.

#### Example WebSocket YAML config:

{% code title="config.yaml" %}
```yaml
version: "1"

websocket:
  enabled: true
  absinthe_protocol:
    enabled: true
    handler_path: /absinthe/socket
  forward_initial_payload: true
  forward_upgrade_headers:
    enabled: true
    allow_list: # an empty list allows all headers
      - "Authorization" # forward only the Authorization Header
  forward_upgrade_query_params:
    enabled: true
    allow_list:
      - "Authorization"
  authentication:
    # enable authentication from the initial payload
    from_initial_payload:
      enabled: false
      # which key to use one the initial payload to "extract" the Authorization value
      key: "authorization"
      export_token:
        export_token: false
        # to enable Subgraph authentication, we can export the value into a Header
        header_key: "Authorization"
```
{% endcode %}

### Authentication

Configure different authentication providers.

#### New Authentication Config (Router Version ≥ 0.169.0)

#### JWKS

<table data-full-width="true"><thead><tr><th width="165">YAML</th><th width="128" data-type="checkbox">Required</th><th width="594">Description</th><th>Default Value</th></tr></thead><tbody><tr><td>url</td><td>true</td><td>The URL of the JWKs. The JWKs are used to verify the JWT (JSON Web Token). The URL is specified as a string with the format 'scheme://host:port'.</td><td></td></tr><tr><td>refresh_interval</td><td>false</td><td>The interval at which the JWKs are refreshed. The period is specified as a string with a number and a unit, e.g. 10ms, 1s, 1m, 1h. The supported units are 'ms', 's', 'm', 'h'.</td><td>1m</td></tr><tr><td>algorithms</td><td>false</td><td>The allowed algorithms for the keys that are retrieved from the JWKs. An empty list means that all algorithms are allowed.<br><br>The following algorithms are supported<br>"HS256", "HS384", "HS512", "RS256", "RS384", "RS512", "ES256", "ES384", "ES512", "PS256", "PS384", "PS512", "EdDSA"</td><td>[] (all allowed)</td></tr></tbody></table>

#### JWT

<table data-full-width="true"><thead><tr><th width="194">YAML</th><th width="101" data-type="checkbox">Required</th><th width="594">Description</th><th>Default Value</th></tr></thead><tbody><tr><td>header_name</td><td>false</td><td>The name of the header. The header is used to extract the token from the request. The default value is 'Authorization'.</td><td>Authorization</td></tr><tr><td>header_value_prefix</td><td>false</td><td>The prefix of the header value. The prefix is used to extract the token from the header value. The default value is 'Bearer'.</td><td>Bearer</td></tr></tbody></table>

Header Sources

<table data-full-width="true"><thead><tr><th width="165">YAML</th><th width="128" data-type="checkbox">Required</th><th width="594">Description</th><th>Default Value</th></tr></thead><tbody><tr><td>type</td><td>true</td><td>The type of the source. The only currently supported type is 'header'.</td><td></td></tr><tr><td>name</td><td>true</td><td>The name of the header. The header is used to extract the token from the request.</td><td></td></tr><tr><td>value_prefixes</td><td>false</td><td>The prefixes of the header value. The prefixes are used to extract the token from the header value.</td><td></td></tr></tbody></table>

#### Example YAML config V2:

```yaml
authentication:
  jwt:
    jwks:
      - url: "https://example.com/.well-known/jwks.json"
        refresh_interval: 1m
        # Leaving algorithms empty will allow all supported algorithms from the config docs
      - url: "https://example2.com/.well-known/jwks.json"
        refresh_interval: 2m
        # optional list of allowed algorithms per JWKS
        algorithms: ["RS256", "EdDSA", "HS512"]
    header_name: Authorization # This is the default value
    header_value_prefix: Bearer # This is the default value
    header_sources:
      - type: header 
        name: X-Auth-Token
        value_prefixes: [Token, MyToken]
      - type: header
        name: X-Authorization
```

#### Old Authentication Config (Router Version < 0.XXX.X)

#### Provider

<table data-full-width="true"><thead><tr><th width="215">Environment Variable</th><th width="275">YAML</th><th width="112" data-type="checkbox">Required</th><th width="183">Description</th><th>Default Value</th></tr></thead><tbody><tr><td></td><td>name</td><td>false</td><td>Name of the provider</td><td></td></tr><tr><td></td><td>jwks</td><td>false</td><td>JWK Provider</td><td></td></tr></tbody></table>

#### JWK Provider

<table data-full-width="true"><thead><tr><th width="208">Environment Variable</th><th width="275">YAML</th><th width="112" data-type="checkbox">Required</th><th width="183">Description</th><th>Default Value</th></tr></thead><tbody><tr><td></td><td>url</td><td>false</td><td></td><td></td></tr><tr><td></td><td>header_names</td><td>false</td><td></td><td></td></tr><tr><td></td><td>header_value_prefixes</td><td>false</td><td></td><td></td></tr><tr><td></td><td>refresh_interval</td><td>true</td><td></td><td>1m</td></tr></tbody></table>



#### Example YAML config:

{% code title="config.yaml" %}
```yaml
version: "1"

# Authentication and Authorization
# See https://cosmo-docs.wundergraph.com/router/authentication-and-authorization for more information  
authentication:
  providers:
    - name: My Auth Provider # Optional, used for error messages and diagnostics
      jwks: # JWKS provider configuration
        url: https://example.com/.well-known/jwks.json # URL to load the JWKS from
        header_name: Authorization # Optional
        header_value_prefix: Bearer # Optional
```
{% endcode %}

### Authorization

<table data-full-width="true"><thead><tr><th width="368">Environment Variable</th><th width="289">YAML</th><th width="112" data-type="checkbox">Required</th><th width="183">Description</th><th>Default Value</th></tr></thead><tbody><tr><td>REQUIRE_AUTHENTICATION</td><td>require_authentication</td><td>false</td><td>Set to true to disallow unauthenticated requests</td><td>false</td></tr><tr><td>REJECT_OPERATION_IF_UNAUTHORIZED</td><td>reject_operation_if_unauthorized</td><td>false</td><td>If enabled, the Router will return 401 with no response data when the evaluation of field-based permissions (<a data-mention href="../../federation/directives/authenticated.md">authenticated.md</a>or <a data-mention href="../../federation/directives/requiresscopes.md">requiresscopes.md</a>fails)</td><td>false</td></tr></tbody></table>

#### Example YAML config:

{% code title="config.yaml" %}
```yaml
version: "1"

authorization:
  require_authentication: false
  reject_operation_if_unauthorized: false
```
{% endcode %}

### CDN

<table data-full-width="true"><thead><tr><th width="232">Environment Variable</th><th width="275">YAML</th><th width="112" data-type="checkbox">Required</th><th width="183">Description</th><th>Default Value</th></tr></thead><tbody><tr><td>CDN_URL</td><td>url</td><td>true</td><td>The URL of the CDN where the Router will fetch its Config. Not required when a static execution config is provided.</td><td><a href="https://cosmo-cdn.wundergraph.com">https://cosmo-cdn.wundergraph.com</a></td></tr><tr><td>CDN_CACHE_SIZE</td><td>cache_size</td><td>false</td><td>Cosmo Router caches responses from the CDN in memory, this defines the cache size.</td><td>100MB</td></tr></tbody></table>

#### Example YAML config:

{% code title="config.yaml" %}
```yaml
version: "1"

cdn:
   url: https://cosmo-cdn.wundergraph.com
   cache_size: 100MB
```
{% endcode %}

### Events

The Events section lets you define Event Sources for [event-driven-federated-subscriptions-edfs](../event-driven-federated-subscriptions-edfs/ "mention").

We support NATS and Kafka as event bus provider.

{% code title="config.yaml" %}
```yaml
version: "1"

events:
  providers:
    nats:
      - id: default
        url: "nats://localhost:4222"
        authentication:
          token: "token" # or
          user_info:
            username: "username"
            password: "password"
    kafka:
      - id: my-kafka
        tls:
          enabled: true
        authentication:
          sasl_plain:
            password: "password"
            username: "username"
        brokers:
          - "localhost:9092"
```
{% endcode %}

#### Provider

<table data-full-width="true"><thead><tr><th width="217">Environment Variable</th><th width="275">YAML</th><th width="112" data-type="checkbox">Required</th><th width="232">Description</th><th>Default Value</th></tr></thead><tbody><tr><td></td><td>provider</td><td>true</td><td>one of: nats, kafka</td><td></td></tr></tbody></table>

#### NATS Provider

<table data-full-width="true"><thead><tr><th width="217">Environment Variable</th><th width="308">YAML</th><th width="112" data-type="checkbox">Required</th><th width="232">Description</th><th>Default Value</th></tr></thead><tbody><tr><td></td><td>id</td><td>true</td><td>The ID of the provider. This have to match with the ID specified in the subgraph schema.</td><td></td></tr><tr><td></td><td>url</td><td>true</td><td>NATS Connection string</td><td></td></tr><tr><td></td><td>authentication</td><td>false</td><td>Authentication configuration for the NATS provider.</td><td></td></tr><tr><td></td><td>authentication.token</td><td>false</td><td>Token based authentication.</td><td></td></tr><tr><td></td><td>authentication.user_info</td><td>false</td><td>User-Info based authentication.</td><td></td></tr><tr><td></td><td>authentication.user_info.username</td><td>false</td><td>Username.</td><td></td></tr><tr><td></td><td>authentication.user_info.password</td><td>false</td><td>Password.</td><td></td></tr></tbody></table>

#### Kafka Provider

<table data-full-width="true"><thead><tr><th width="156">Environment Variable</th><th width="311">YAML</th><th width="112" data-type="checkbox">Required</th><th width="232">Description</th><th>Default Value</th></tr></thead><tbody><tr><td></td><td>id</td><td>true</td><td>The ID of the provider. This have to match with the ID specified in the subgraph schema.</td><td></td></tr><tr><td></td><td>brokers</td><td>true</td><td>A list of broker URLs.</td><td>[]</td></tr><tr><td></td><td>authentication</td><td>false</td><td>Authentication settings</td><td></td></tr><tr><td></td><td>authentication.sasl_plain</td><td>false</td><td>SASL/Plain Authentication method</td><td></td></tr><tr><td></td><td>authentication.sasl_plain.username</td><td>false</td><td>SASL/Plain Username</td><td></td></tr><tr><td></td><td>authentication.sasl_plain.password</td><td>false</td><td>SASL/Plain Password</td><td></td></tr><tr><td></td><td>tls</td><td>false</td><td>TLS configuration for the Kafka provider. If enabled, it uses SystemCertPool for RootCAs by default.</td><td></td></tr><tr><td></td><td>tls.enabled</td><td>false</td><td>Enable the TLS.</td><td></td></tr></tbody></table>

#### Nats Provider

### Router Engine Configuration

Configure the GraphQL Execution Engine of the Router.

<table data-full-width="true"><thead><tr><th width="269">Environment Variable</th><th width="275">YAML</th><th width="112" data-type="checkbox">Required</th><th width="183">Description</th><th>Default Value</th></tr></thead><tbody><tr><td>ENGINE_ENABLE_SINGLE_FLIGHT</td><td>enable_single_flight</td><td>false</td><td>Deduplicate exactly the same in-flight origin request</td><td>true</td></tr><tr><td>ENGINE_ENABLE_REQUEST_TRACING</td><td>enable_request_tracing</td><td>false</td><td>Enable <a data-mention href="../advanced-request-tracing-art.md">advanced-request-tracing-art.md</a>This config is not correlated to OTEL tracing.</td><td>true</td></tr><tr><td>ENGINE_ENABLE_EXECUTION_PLAN_CACHE_RESPONSE_HEADER</td><td>enable_execution_plan_cache_response_header</td><td>false</td><td>Usually only required for testing. When enabled, the Router sets the response Header "X-WG-Execution-Plan-Cache" to "HIT" or "MISS"</td><td>false</td></tr><tr><td>ENGINE_MAX_CONCURRENT_RESOLVERS</td><td>max_concurrent_resolvers</td><td>false</td><td>Use this to limit the concurrency in the GraphQL Engine. A high number will lead to more memory usage. A number too low will slow down your Router.</td><td>32</td></tr><tr><td>ENGINE_ENABLE_NET_POLL</td><td>enable_net_poll</td><td>false</td><td>Enables the more efficient poll implementation for all WebSocket implementations (client, server) of the router. This is only available on Linux and MacOS. On Windows or when the host system is limited, the default synchronous implementation is used.</td><td>true</td></tr><tr><td>ENGINE_WEBSOCKET_CLIENT_POLL_TIMEOUT</td><td>websocket_client_poll_timeout</td><td>false</td><td>The timeout for the poll loop of the WebSocket client implementation. The period is specified as a string with a number and a unit</td><td>1s</td></tr><tr><td>ENGINE_WEBSOCKET_CLIENT_CONN_BUFFER_SIZE</td><td>websocket_client_conn_buffer_size</td><td>false</td><td>The buffer size for the poll buffer of the WebSocket client implementation. The buffer size determines how many connections can be handled in one loop.</td><td>128</td></tr><tr><td>ENGINE_WEBSOCKET_CLIENT_READ_TIMEOUT</td><td>websocket_client_read_timeout</td><td>false</td><td>The timeout for the websocket read of the WebSocket client implementation.</td><td>5s</td></tr><tr><td>ENGINE_EXECUTION_PLAN_CACHE_SIZE</td><td>execution_plan_cache_size</td><td>false</td><td>Define how many GraphQL Operations should be stored in the execution plan cache. A low number will lead to more frequent cache misses, which will lead to increased latency.</td><td>1024</td></tr><tr><td>ENGINE_MINIFY_SUBGRAPH_OPERATIONS</td><td>minify_subgraph_operations</td><td>false</td><td>Minify the subgraph operations. If the value is true, GraphQL Operations get minified after planning. This reduces the amount of GraphQL AST nodes the Subgraph has to parse, which ultimately saves CPU time and memory, resulting in faster response times.</td><td>false</td></tr><tr><td>ENGINE_ENABLE_PERSISTED_OPERATIONS_CACHE</td><td>enable_persisted_operations_cache</td><td>false</td><td>Enable the persisted operations cache. The persisted operations cache is used to cache normalized persisted operations to improve performance.</td><td>true</td></tr><tr><td>ENGINE_ENABLE_NORMALIZATION_CACHE</td><td>enable_normalization_cache</td><td>false</td><td>Enable the normalization cache. The normalization cache is used to cache normalized operations to improve performance.</td><td>true</td></tr><tr><td>ENGINE_NORMALIZATION_CACHE_SIZE</td><td>normalization_cache_size</td><td>false</td><td>The size of the normalization cache.</td><td>1024</td></tr><tr><td>ENGINE_PARSEKIT_POOL_SIZE</td><td>parsekit_pool_size</td><td>false</td><td>The size of the ParseKit pool. The ParseKit pool provides re-usable Resources for parsing, normalizing, validating and planning GraphQL Operations. Setting the pool size to a value much higher than the number of CPU Threads available will not improve performance, but only increase memory usage.</td><td>8</td></tr><tr><td>ENGINE_RESOLVER_MAX_RECYCLABLE_PARSER_SIZE</td><td>resolver_max_recyclable_parser_size</td><td>false</td><td>Limits the size of the Parser that can be recycled back into the Pool. If set to 0, no limit is applied. This helps keep the Heap size more maintainable if you regularly perform large queries.</td><td>32768</td></tr><tr><td>ENGINE_ENABLE_VALIDATION_CACHE</td><td>enable_validation_cache</td><td>false</td><td>Enable the validation cache. The validation cache is used to cache results of validating GraphQL Operations.</td><td>true</td></tr><tr><td>ENGINE_VALIDATION_CACHE_SIZE</td><td>validation_cache_size</td><td>false</td><td>The size of the validation cache.</td><td>1024</td></tr><tr><td>ENGINE_ENABLE_SUBGRAPH_FETCH_OPERATION_NAME</td><td>enable_subgraph_fetch_operation_name</td><td>false</td><td>Enable appending the operation name to subgraph fetches. This will ensure that the operation name will be included in the corresponding subgraph requests using the following format: $operationName__$subgraphName__$sequenceID.</td><td>true</td></tr></tbody></table>

#### Example YAML config:

{% code title="config.yaml" %}
```yaml
version: "1"

engine:
  enable_single_flight: true
  enable_request_tracing: true
  enable_execution_plan_cache_response_header: false
  max_concurrent_resolvers: 32
  enable_websocket_epoll_kqueue: true
  epoll_kqueue_poll_timeout: "1s"
  epoll_kqueue_conn_buffer_size: 128
  websocket_read_timeout: "1s"
  execution_plan_cache_size: 10000
  minify_subgraph_operations: true
  enable_persisted_operations_cache: true
  enable_normalization_cache: true
  normalization_cache_size: 1024
  parsekit_pool_size: 8
  enable_validation_cache: true
  validation_cache_size: 1024
  enable_subgraph_fetch_operation_name: true
```
{% endcode %}

#### Debug Configuration

<table data-full-width="true"><thead><tr><th width="247">Environment Variable</th><th width="275">YAML</th><th width="112" data-type="checkbox">Required</th><th width="183">Description</th><th>Default Value</th></tr></thead><tbody><tr><td>ENGINE_DEBUG_PRINT_OPERATION_TRANSFORMATIONS</td><td>print_operation_transformations</td><td>false</td><td>Print the operation transformations.</td><td>false</td></tr><tr><td>ENGINE_DEBUG_PRINT_OPERATION_ENABLE_AST_REFS</td><td>print_operation_enable_ast_refs</td><td>false</td><td>Print the operation enable AST refs.</td><td>false</td></tr><tr><td>ENGINE_DEBUG_PRINT_PLANNING_PATHS</td><td>print_planning_paths</td><td>false</td><td>Print the planning paths.</td><td>false</td></tr><tr><td>ENGINE_DEBUG_PRINT_QUERY_PLANS</td><td>print_query_plans</td><td>false</td><td>Print the query plans.</td><td>false</td></tr><tr><td>ENGINE_DEBUG_PRINT_NODE_SUGGESTIONS</td><td>print_node_suggestions</td><td>false</td><td>Print the node suggestions.</td><td>false</td></tr><tr><td>ENGINE_DEBUG_CONFIGURATION_VISITOR</td><td>configuration_visitor</td><td>false</td><td>Print the configuration visitor.</td><td>false</td></tr><tr><td>ENGINE_DEBUG_PLANNING_VISITOR</td><td>planning_visitor</td><td>false</td><td>Print the planning visitor.</td><td>false</td></tr><tr><td>ENGINE_DEBUG_DATASOURCE_VISITOR</td><td>datasource_visitor</td><td>false</td><td>Print the datasource visitor.</td><td>false</td></tr><tr><td>ENGINE_DEBUG_REPORT_WEBSOCKET_CONNECTIONS</td><td>report_websocket_connections</td><td>false</td><td>Print the websocket connections.</td><td>false</td></tr><tr><td>ENGINE_DEBUG_REPORT_MEMORY_USAGE</td><td>report_memory_usage</td><td>false</td><td>Print the memory usage.</td><td>false</td></tr><tr><td>ENGINE_DEBUG_ENABLE_RESOLVER_DEBUGGING</td><td>enable_resolver_debugging</td><td>false</td><td>Enable verbose debug logging for the Resolver.</td><td>false</td></tr><tr><td>ENGINE_DEBUG_ENABLE_PERSISTED_OPERATIONS_CACHE_RESPONSE_HEADER</td><td>enable_persisted_operations_cache_response_header</td><td>false</td><td>Enable the persisted operations cache response header. The persisted operations cache response header is used to cache the persisted operations in the client.</td><td>false</td></tr><tr><td>ENGINE_DEBUG_ENABLE_NORMALIZATION_CACHE_RESPONSE_HEADER</td><td>enable_normalization_cache_response_header</td><td>false</td><td>Enable the normalization cache response header. The normalization cache response header is used to cache the normalized operations in the client.</td><td>false</td></tr><tr><td>ENGINE_DEBUG_ALWAYS_INCLUDE_QUERY_PLAN</td><td>always_include_query_plan</td><td>false</td><td>Always include the query plan in the response.</td><td>false</td></tr><tr><td>ENGINE_DEBUG_ALWAYS_SKIP_LOADER</td><td>always_skip_loader</td><td>false</td><td>Always skip the loader. This will return no data but only render response extensions, e.g. to expose the query plan.</td><td>false</td></tr></tbody></table>

#### Example YAML config:

{% code title="config.yaml" %}
```yaml
version: "1"

engine:
  debug:
    print_operation_transformations: false
    print_operation_enable_ast_refs: false
    print_planning_paths: false
    print_query_plans: false
    print_node_suggestions: false
    configuration_visitor: false
    planning_visitor: false
    datasource_visitor: false
    report_websocket_connections: false
    report_memory_usage: false
    enable_resolver_debugging: false
    enable_persisted_operations_cache_response_header: false
    enable_normalization_cache_response_header: false
    always_include_query_plan: false
    always_skip_loader: false
```
{% endcode %}

### Rate Limiting

Configures a rate limiter on the outgoing subgraphs requests. When enabled, a rate of 10 req/s with a burst of 10 requests is configured.

{% hint style="info" %}
The rate limiter requires Redis version 3.2 or newer since it relies on [replicate\_commands](https://redis.io/commands/eval#replicating-commands-instead-of-scripts) feature. ElastiCache for Redis only works in non-clustered mode. You can enable a failover instance to achieve high availability.
{% endhint %}

#### Key Suffix Expression

As you can see in the config table below, you can define an expression to generate the a rate limiting key suffix. The evaluation of the expression must return a string, which will be appended to the key prefix.

Using a key suffix expression, you're able to dynamically choose a rate limiting key, e.g. based on the user authentication, a header, or a combination. Here's an example expression that uses the `sub` claim if available, and a Header as the fallback.

```javascript
request.auth.claims.sub ?? request.header.Get('X-Forwarded-For')
```

For mor information on how to use the expression language, please refer to the [template-expressions.md](template-expressions.md "mention")section.

#### General Rate Limiting Configuration

<table data-full-width="true"><thead><tr><th width="249">Environment Variable</th><th width="275">YAML</th><th width="112" data-type="checkbox">Required</th><th width="232">Description</th><th>Default Value</th></tr></thead><tbody><tr><td>RATE_LIMIT_ENABLED</td><td>enabled</td><td>false</td><td>Enable / Disable rate limiting globally</td><td>false</td></tr><tr><td>RATE_LIMIT_STRATEGY</td><td>strategy</td><td>true</td><td>The rate limit strategy</td><td>simple</td></tr><tr><td></td><td>simple_strategy</td><td>false</td><td><a data-mention href="./#rate-limiting-simple-strategy">#rate-limiting-simple-strategy</a></td><td></td></tr><tr><td></td><td>storage</td><td>false</td><td><a data-mention href="./#rate-limiting-redis-storage">#rate-limiting-redis-storage</a></td><td></td></tr><tr><td>RATE_LIMIT_KEY_SUFFIX_EXPRESSION</td><td>key_suffix_expression</td><td>false</td><td>The expression to define a key suffix for the rate limit, e.g. by using request headers, claims, or a combination of both with a fallback strategy. The expression is specified as a string and needs to evaluate to a string. Please see https://expr-lang.org/ for more information.</td><td></td></tr><tr><td></td><td>error_extension_code</td><td>false</td><td><a data-mention href="./#rate-limit-error-extension-code">#rate-limit-error-extension-code</a></td><td></td></tr></tbody></table>

#### Rate Limiting Redis Storage

<table data-full-width="true"><thead><tr><th width="249">Environment Variable</th><th width="150">YAML</th><th width="112" data-type="checkbox">Required</th><th width="153">Description</th><th>Default Value</th></tr></thead><tbody><tr><td>RATE_LIMIT_REDIS_URL</td><td>urls</td><td>true</td><td>List of the connection URL(s).</td><td>[redis://localhost:6379]</td></tr><tr><td>RATE_LIMIT_REDIS_CLUSTER_ENABLED</td><td>cluster_enabled</td><td>false</td><td>If the Redis instance is a Redis cluster</td><td>false</td></tr><tr><td>RATE_LIMIT_REDIS_KEY_PREFIX</td><td>key_prefix</td><td>false</td><td>This prefix is used to namespace the ratelimit keys</td><td>cosmo_rate_limit</td></tr></tbody></table>

#### Rate Limiting Simple Strategy

<table data-full-width="true"><thead><tr><th width="286">Environment Variable</th><th width="275">YAML</th><th width="112" data-type="checkbox">Required</th><th width="232">Description</th><th>Default Value</th></tr></thead><tbody><tr><td>RATE_LIMIT_SIMPLE_RATE</td><td>rate</td><td>true</td><td>Allowed request rate (number)</td><td>10</td></tr><tr><td>RATE_LIMIT_SIMPLE_BURST</td><td>burst</td><td>true</td><td>Allowed burst rate (number) - max rate per one request</td><td>10</td></tr><tr><td>RATE_LIMIT_SIMPLE_PERIOD</td><td>period</td><td>true</td><td>The rate limiting period, e.g. "10s", "1m", etc...</td><td>1s</td></tr><tr><td>RATE_LIMIT_SIMPLE_REJECT_EXCEEDING_REQUESTS</td><td>reject_exceeding_requests</td><td>false</td><td>Reject the complete request if a sub-request exceeds the rate limit. If set to false, partial responses are possible.</td><td>false</td></tr><tr><td>RATE_LIMIT_SIMPLE_HIDE_STATS_FROM_RESPONSE_EXTENSION</td><td>hide_stats_from_response_extension</td><td>false</td><td>Hide the rate limit stats from the response extension. If the value is true, the rate limit stats are not included in the response extension.</td><td>false</td></tr></tbody></table>

#### Rate Limit Error Extension Code

<table data-full-width="true"><thead><tr><th width="286">Environment Variable</th><th width="104">YAML</th><th width="112" data-type="checkbox">Required</th><th width="330">Description</th><th>Default Value</th></tr></thead><tbody><tr><td>RATE_LIMIT_ERROR_EXTENSION_CODE_ENABLED</td><td>enabled</td><td>false</td><td>If enabled, a code will be added to the extensions.code field of error objects related to rate limiting. This allows clients to easily identify if an error happened due to rate limiting.</td><td>true</td></tr><tr><td>RATE_LIMIT_ERROR_EXTENSION_CODE</td><td>code</td><td>false</td><td>The error extension code for the rate limit.</td><td>RATE_LIMIT_EXCEEDED</td></tr></tbody></table>

#### Rate Limiting Example YAML configuration

```yaml
rate_limit:
    enabled: true
    strategy: "simple"
    simple_strategy:
        rate: 10
        burst: 10
        period: 1s
        reject_exceeding_requests: false
        reject_status_code: 200
        hide_stats_from_response_extension: false
    storage:
        cluster_enabled: false
        urls: 
         - "redis://localhost:6379"
        key_prefix: "cosmo_rate_limit"
    debug: false
    key_suffix_expression: ""
    error_extension_code:
        enabled: true
        code: "RATE_LIMIT_EXCEEDED"
```

### Subgraph Error Propagation

The configuration for the subgraph error propagation. Errors can be exposed to the client in a "wrapped" form to hide Subgraph internals, or it's possible to "pass-through" Subgraph errors directly to the client.

<table data-full-width="true"><thead><tr><th width="286">Environment Variable</th><th width="158">YAML</th><th width="100" data-type="checkbox">Required</th><th width="419">Description</th><th>Default Value</th></tr></thead><tbody><tr><td>SUBGRAPH_ERROR_PROPAGATION_ENABLED</td><td>enabled</td><td>false</td><td>Enable error propagation. If the value is true (default: false), Subgraph errors will be propagated to the client.</td><td>false</td></tr><tr><td>SUBGRAPH_ERROR_PROPAGATION_MODE</td><td>mode</td><td>false</td><td>The mode of error propagation. The supported modes are 'wrapped' (default) and 'pass-through'. The 'wrapped' mode wraps the error in a custom error object to hide internals. The 'pass-through' mode returns the error as is from the Subgraph.</td><td>wrapped</td></tr><tr><td>SUBGRAPH_ERROR_PROPAGATION_REWRITE_PATHS</td><td>rewrite_paths</td><td>false</td><td>Rewrite the paths of the Subgraph errors. If the value is true (default), the paths of the Subgraph errors will be rewritten to match the Schema of the Federated Graph.</td><td>true</td></tr><tr><td>SUBGRAPH_ERROR_PROPAGATION_OMIT_LOCATIONS</td><td>omit_locations</td><td>false</td><td>Omit the location field of Subgraph errors. If the value is true, the location field of Subgraph errors will be omitted. This is useful because the locations of a Subgraph error is internal to the Subgraph and not relevant to the client.</td><td>true</td></tr><tr><td>SUBGRAPH_ERROR_PROPAGATION_OMIT_EXTENSIONS</td><td>omit_extensions</td><td>false</td><td>Omit the extensions field of Subgraph errors. If the value is true, the extensions field of Subgraph errors will be omitted. This is useful in case you want to avoid leaking internal information to the client. Some users of GraphQL leverage the errors.extensions.code field to implement error handling logic in the client, in which case you might want to set this to false.</td><td>false</td></tr><tr><td>SUBGRAPH_ERROR_PROPAGATION_STATUS_CODES</td><td>propagate_status_codes</td><td>false</td><td>Propagate Subgraph status codes. If the value is true, Subgraph Response status codes will be propagated to the client in the errors.extensions.code field.</td><td>false</td></tr><tr><td>SUBGRAPH_ERROR_PROPAGATION_ALLOWED_FIELDS</td><td>allowed_fields</td><td>false</td><td>In passthrough mode, by default only message and path is propagated. You can specify additional fields here.</td><td></td></tr><tr><td>SUBGRAPH_ERROR_PROPAGATION_DEFAULT_EXTENSION_CODE</td><td>default_extension_code</td><td>false</td><td>The default extension code. The default extension code is used to specify the default code for the Subgraph errors when the code is not present.</td><td>DOWNSTREAM_SERVICE_ERROR</td></tr><tr><td>SUBGRAPH_ERROR_PROPAGATION_ATTACH_SERVICE_NAME</td><td>attach_service_name</td><td>false</td><td>Attach the service name to each Subgraph error. If the value is true, the service name will be attached to the Subgraph errors.</td><td>true</td></tr><tr><td>SUBGRAPH_ERROR_PROPAGATION_ALLOWED_EXTENSION_FIELDS</td><td>allowed_extension_fields</td><td>false</td><td>The allowed extension fields. The allowed extension fields are used to specify which fields of the Subgraph errors are allowed to be propagated to the client.</td><td>["code"]</td></tr></tbody></table>

#### Example YAML configuration:

```yaml
version: "1"

subgraph_error_propagation:
    enabled: true
    propagate_status_codes: false
    mode: "wrapped"
    rewrite_paths: true
    omit_locations: true
    omit_extensions: false
    default_extension_code: DOWNSTREAM_SERVICE_ERROR
    attach_service_name: true
    allowed_extension_fields:
      - "code"
```

### Security

The configuration for the security. The security is used to configure the security settings for the Router.

<table data-full-width="true"><thead><tr><th width="291">Environment Variable</th><th width="275">YAML</th><th width="112" data-type="checkbox">Required</th><th width="232">Description</th><th>Default Value</th></tr></thead><tbody><tr><td>SECURITY_BLOCK_MUTATIONS</td><td>block_mutations</td><td>false</td><td>Block mutation Operations.</td><td></td></tr><tr><td>SECURITY_BLOCK_MUTATIONS_ENABLED</td><td>block_mutations.enabled</td><td>false</td><td>If the value is true, the mutations are blocked.</td><td>false</td></tr><tr><td>SECURITY_BLOCK_MUTATIONS_CONDITION</td><td>block_mutations.condition</td><td>false</td><td>The <a href="template-expressions.md#authentication-object">expression</a> to evaluate if the operation should be blocked.</td><td></td></tr><tr><td>SECURITY_BLOCK_SUBSCRIPTIONS</td><td>block_subscriptions</td><td>false</td><td>Block subscription Operations. </td><td></td></tr><tr><td></td><td>block_subscriptions.enabled</td><td>false</td><td>If the value is true, the subscriptions are blocked.</td><td>false</td></tr><tr><td></td><td>block_subscriptions.condition</td><td>false</td><td>The <a href="template-expressions.md">expression</a> to evaluate if the operation should be blocked.</td><td></td></tr><tr><td>SECURITY_BLOCK_NON_PERSISTED_OPERATIONS</td><td>block_non_persisted_operations</td><td>false</td><td>Block non-persisted Operations. </td><td></td></tr><tr><td>SECURITY_BLOCK_NON_PERSISTED_OPERATIONS_ENABLED</td><td>block_non_persisted_operations.enabled</td><td>false</td><td>If the value is true, the non-persisted operations are blocked.</td><td>false</td></tr><tr><td>SECURITY_BLOCK_NON_PERSISTED_OPERATIONS_CONDITION</td><td>block_non_persisted_operations.condition</td><td>false</td><td>The <a href="template-expressions.md">expression</a> to evaluate if the operation should be blocked.</td><td></td></tr><tr><td></td><td>complexity_calculation_cache</td><td>false</td><td>Complexity Cache configuration</td><td></td></tr><tr><td></td><td>complexity_limits</td><td>false</td><td>Complexity limits configuration</td><td></td></tr></tbody></table>

#### Example YAML Configuration

```yaml
version: "1"

security:
    block_mutations:
      enabled: false
      condition: "request.header.Get('x-block-mutation') == 'yes'"
    block_subscriptions:
      enabled: false
    block_non_persisted_operations:
      enabled: false
    complexity_calculation_cache: # This is for a local in-memory cache, to persist the calculation results
      enabled: true
      size: 1024
    complexity_limits:
        depth: # the equivalent of `security.depth_limit` prevoiusly
          enabled: true
          limit: 7
          ignore_persisted_operations: true
        total_fields:
          enabled: true
          limit: 128
          ignore_persisted_operations: true
        root_fields:
          enabled: true
          limit: 3
          ignore_persisted_operations: true
        root_field_aliases:
          enabled: false
          limit: 3
          ignore_persisted_operations: true
```

{% hint style="danger" %}
Query Depth is now deprecated. We recommend using the `security.complexity_calculation_cache` and `security.complexity_limits` configurations instead, which provide that functionality.
{% endhint %}

#### Complexity Calculation Cache

The configuration for the in-memory complexity cache, to help speed up the calculation process in the event of a recurring query

<table data-full-width="true"><thead><tr><th width="291">Environment Variable</th><th width="275">YAML</th><th width="112" data-type="checkbox">Required</th><th width="232">Description</th><th>Default Value</th></tr></thead><tbody><tr><td>SECURITY_COMPLEXITY_CACHE_ENABLED</td><td>enabled</td><td>false</td><td>Enable the complexity cache</td><td>false</td></tr><tr><td>SECURITY_COMPLEXITY_CACHE_SIZE</td><td>size</td><td>false</td><td>The size of the complexity cache</td><td>1024</td></tr></tbody></table>

#### Complexity Limits

The configuration for adding a complexity limits for queries. We currently expose 4 limits:

* **Query Depth** - How many nested levels you can have in a query. This limit prevents infinite querying, and also limits the size of the data returned.
* **Total Fields in Query**
* **Root Fields in Query**
* **Root Field Aliases in Query**

For all of the limits, if the limit is 0, or `enabled` isn't true, the limit isn't applied. All of them have the same configuration fields:

<table data-full-width="true"><thead><tr><th width="291">Environment Variable</th><th width="275">YAML</th><th width="112" data-type="checkbox">Required</th><th width="232">Description</th><th>Default Value</th></tr></thead><tbody><tr><td></td><td>enabled</td><td>false</td><td>Enable the specific limit. If the value is true (default: false), and a valid limit value is set, the limit will be applied</td><td>false</td></tr><tr><td></td><td>limit</td><td>false</td><td>The limit amount for query. If the limit is 0, this limit isn't applied</td><td>0</td></tr><tr><td></td><td>ignore_persisted_operations</td><td>false</td><td>Disable the limit for persisted operations. Since persisted operations are stored intentionally, users may want to disable the limit to consciously allow nested persisted operations</td><td>false</td></tr></tbody></table>

### File Upload

The configuration for file upload. Configure whether it should be enabled along with file size and number of files.

<table data-full-width="true"><thead><tr><th width="291">Environment Variable</th><th width="275">YAML</th><th width="112" data-type="checkbox">Required</th><th width="232">Description</th><th>Default Value</th></tr></thead><tbody><tr><td>FILE_UPLOAD_ENABLED</td><td>enabled</td><td>false</td><td>Whether the feature is enabled or not</td><td>true</td></tr><tr><td>FILE_UPLOAD_MAX_FILE_SIZE</td><td>max_file_size</td><td>false</td><td>The maximum size of a file that can be uploaded. The size is specified as a string with a number and a unit, e.g. 10KB, 1MB, 1GB. The supported units are 'KB', 'MB', 'GB'.</td><td>50MB</td></tr><tr><td>FILE_UPLOAD_MAX_FILES</td><td>max_files</td><td>false</td><td>The maximum number of files that can be uploaded per request.</td><td>10</td></tr></tbody></table>

#### Example YAML Configuration

```yaml
version: "1"

file_upload:
    enabled: true
    max_file_size: 1GB
    max_files: 2
```

### Client Header

The configuration for custom names for client name and client version headers.

<table data-full-width="true"><thead><tr><th width="291">Environment Variable</th><th width="275">YAML</th><th width="112" data-type="checkbox">Required</th><th width="232">Description</th><th>Default Value</th></tr></thead><tbody><tr><td></td><td>name</td><td>false</td><td>The custom name of the client name header.</td><td></td></tr><tr><td></td><td>version</td><td>false</td><td>The custom name of the client version header.</td><td></td></tr></tbody></table>

#### Example YAML Configuration

```yaml
version: "1"

client_header:
  name: "Client-Name"
  version: "Client-Version"
```

By default, we support `Graphql-Client-Name` , `Graphql-Client-Version`, `Apollo-Graphql-Client-Name`, `Apollo-Graphql-Client-Version`.

The custom names are given more precedence.

### Apollo Compatibility Flags

This configuration is used to enable full compatibility with Apollo Federation, Apollo Gateway and Apollo Router, you can enable certain compatibility flags, allowing you to use Cosmo Router as a drop-in replacement for Apollo.

#### Apollo Compatibility Value Completion

Invalid \_\_typename values will be returned in extensions.valueCompletion instead of errors.

#### Apollo Compatibility Truncate Floats

Truncate floats like 1.0 to 1, 2.0 to 2, etc.. Values like 1.1 or 2.2 will not be truncated.

#### Apollo Compatibility Suppress Fetch Errors

Suppresses fetch errors. When enabled, only the ‘data’ object is returned, suppressing errors. If disabled, fetch errors are included in the ‘errors’ array.

#### Apollo Compatibility Replace Undefined Op Field Errors

Produces the same error message as Apollo when an invalid operation field is included in an operation selection set.\
**Extension code**: "GRAPHQL\_VALIDATION\_FAILED"\
Status code: 400

#### Apollo Compatibility Replace Invalid Var Errors

Produces the same error message as Apollo when an invalid variable is supplied.\
**Extension code**: "BAD\_USER\_INPUT"

#### Apollo Compatibility Replace Validation Error Status

Produces the same error status as Apollo when validation fails.\
**Error status**: 400 Bad Request\
**Minimum router version**: [0.175.0](https://github.com/wundergraph/cosmo/compare/router@0.174.3...router@0.175.0)

<table data-full-width="true"><thead><tr><th width="321">Environment Variable</th><th width="297">YAML</th><th width="102" data-type="checkbox">Required</th><th width="232">Description</th><th>Default Value</th></tr></thead><tbody><tr><td>APOLLO_COMPATIBILITY_ENABLE_ALL</td><td>apollo_compatibility_flags:<br>    enable_all: &#x3C;bool></td><td>false</td><td>Enables all the options of Apollo Compatibility.</td><td>false</td></tr><tr><td>APOLLO_COMPATIBILITY_VALUE_COMPLETION_ENABLED</td><td>value_completion:<br>    enabled: &#x3C;bool></td><td>false</td><td>Enables value completion.</td><td>false</td></tr><tr><td>APOLLO_COMPATIBILITY_TRUNCATE_FLOATS_ENABLED</td><td>truncate_floats:<br>    enabled: &#x3C;bool></td><td>false</td><td>Enables truncate floats.</td><td>false</td></tr><tr><td>APOLLO_COMPATIBILITY_SUPPRESS_FETCH_ERRORS_ENABLED</td><td>suppress_fetch_errors:<br>    enabled: &#x3C;bool></td><td>false</td><td>Enables suppress fetch errors.</td><td>false</td></tr><tr><td>APOLLO_COMPATIBILITY_REPLACE_UNDEFINED_OP_FIELD_ERRORS_ENABLED</td><td>replace_undefined_op_field_errors:<br>    enabled: &#x3C;bool></td><td>false</td><td>Replaces undefined operation field errors.</td><td>false</td></tr><tr><td>APOLLO_COMPATIBILITY_REPLACE_INVALID_VAR_ERRORS_ENABLED</td><td>replace_invalid_var_errors:<br>    enabled: &#x3C;bool></td><td>false</td><td>Replaces invalid variable errors.</td><td>false</td></tr><tr><td>APOLLO_COMPATIBILITY_REPLACE_VALIDATION_ERROR_STATUS_ENABLED</td><td>replace_validation_error_status_enabled: &#x3C;bool></td><td>false</td><td>Replaces validation error status with 400.</td><td>false</td></tr><tr><td>APOLLO_COMPATIBILITY_SUBSCRIPTION_MULTIPART_PRINT_BOUNDARY_ENABLED</td><td>subscription_multipart_print_boundary:<br>    enabled: &#x3C;bool></td><td>false</td><td>Prints the multipart boundary right after the message in multipart subscriptions. Without this flag, the Apollo client wouldn’t parse a message until the next one is pushed.</td><td>false</td></tr></tbody></table>

#### Example YAML Configuration

```yaml
version: "1"

apollo_compatibility_flags:
    enable_all: false
    value_completion:
        enabled: true
    truncate_floats:
        enabled: false
    suppress_fetch_errors:
        enabled: true
    replace_undefined_op_field_errors:
        enabled: true
    replace_invalid_var_errors:
        enabled: true
    replace_validation_error_status:
        enabled: false
```

### Apollo Router Compatibility Flags

{% hint style="info" %}
Apollo Router Compatibility Flags _can_ be enabled alongside Apollo Compatibility Flags, but some will override their counterpart's functionality. This means you can safely use `enable_all: true` alongside these flags.
{% endhint %}

#### Apollo Router Compatibility Replace Invalid Var Errors

Produces the same error messages as Apollo Router when an invalid variable is supplied.

Extension code: "VALIDATION\_INVALID\_TYPE\_VARIABLE"

<table data-full-width="true"><thead><tr><th>Environment Variable</th><th width="252">YAML</th><th width="98" data-type="checkbox">Required</th><th>Description</th><th>Default</th></tr></thead><tbody><tr><td>APOLLO_ROUTER_COMPATIBILITY_REPLACE_INVALID_VAR_ERRORS_ENABLED</td><td>replace_invalid_var_errors</td><td>false</td><td>Replaces invalid variable errors.</td><td>false</td></tr><tr><td></td><td></td><td>false</td><td></td><td></td></tr><tr><td></td><td></td><td>false</td><td></td><td></td></tr></tbody></table>

#### Example YAML Configuration

```yaml
version: "1"

apollo_router_compatibility_flags:
    replace_invalid_var_errors:
        enabled: true
```



### Cache warmer

<table data-full-width="true"><thead><tr><th>Environment Variable</th><th>YAML</th><th width="100" data-type="checkbox">Required</th><th>Description</th><th>Default Value</th></tr></thead><tbody><tr><td></td><td>enabled</td><td>false</td><td>Set to true to enable the cache warmer.</td><td>false</td></tr><tr><td></td><td>workers</td><td>false</td><td>The number of workers for the cache warmup to run in parallel. Higher numbers decrease the time to warm up the cache but increase the load on the system.</td><td>8</td></tr><tr><td></td><td>items_per_second</td><td>false</td><td>The number of cache warmup items to process per second. Higher numbers decrease the time to warm up the cache but increase the load on the system.</td><td>50</td></tr><tr><td></td><td>timeout</td><td>false</td><td>The timeout for warming up the cache. This can be used to limit the amount of time cache warming will block deploying a new config. The period is specified as a string with a number and a unit, e.g. 10ms, 1s, 1m, 1h. The supported units are 'ms', 's', 'm', 'h'.</td><td>30s</td></tr><tr><td></td><td>source</td><td>false</td><td>The source of the cache warmup items. Only one can be specified. If empty, the cache warmup source is the Cosmo CDN and it requires a graph to be set.</td><td></td></tr></tbody></table>

#### Example YAML config:

{% code title="config.yaml" %}
```yaml
version: "1"

cache_warmup:
  enabled: true
  workers: 8
  items_per_second: 50
  timeout: 30s
```
{% endcode %}

#### Source

The source of the cache warmup items. Only one can be specified. If empty, the cache warmup source is the Cosmo CDN and it requires a graph to be set.

<table data-full-width="true"><thead><tr><th width="291">Environment Variable</th><th width="275">YAML</th><th width="112" data-type="checkbox">Required</th><th width="232">Description</th><th>Default Value</th></tr></thead><tbody><tr><td></td><td>path</td><td>false</td><td>The path to the directory containing the cache warmup items.</td><td></td></tr></tbody></table>

#### Example YAML config:

{% code title="config.yaml" %}
```yaml
version: "1"

cache_warmup:
  enabled: true
  workers: 8
  items_per_second: 50
  timeout: 30s
  source:
    path: "./cache-warmer/operations"
```
{% endcode %}
