---
description: Learn how to configure your router.
---

# Configuration

The router provides three different ways of customization:

1. The config file. This file allows configuring the global behavior of the router. For a full reference of all available options see below. You can either pass [environment variables](configuration.md#environment-variables) or use a local [`config.yaml`](configuration.md#config-file) for convenience.
2. The router execution config. This file contains information on how to resolve your federated schema. The engine uses the information to build a highly optimized query planner. The content is fetched by default from the controlplane or CDN but you can also provide this as a file. For more information see [`wgc router compose`](../cli/router/compose.md) to build the file locally for development or [`wgc router fetch`](../cli/router/fetch.md) to download the latest production version.
3. Custom Go [modules](custom-modules.md). It is unlikely that we will provide every possible feature as an in-built functionality. For advanced use cases or more control, you can build Go modules and compile the Router in a few commands. If you are uncertain about if your use case should be implemented as a custom module, don't hesitate to open an issue. We might already have a plan for this or can assist you with the implementation.

{% hint style="info" %}
**Recommendation** Passing secrets as environment variables and using the config to store everything else is a common and pragmatic approach.
{% endhint %}

## Router

<table data-full-width="false"><thead><tr><th width="291">Environment Variable</th><th width="207">YAML</th><th width="81" data-type="checkbox">Required</th><th width="269">Description</th><th>Default Value</th></tr></thead><tbody><tr><td>LISTEN_ADDR</td><td>listen_addr</td><td>true</td><td>The server listener address.</td><td>localhost:3002</td></tr><tr><td>CONTROLPLANE_URL</td><td>controlplane_url</td><td>true</td><td>The controlplane url.</td><td><a href="https://cosmo-cp.wundergraph.com">https://cosmo-cp.wundergraph.com</a></td></tr><tr><td>PLAYGROUND_ENABLED</td><td>playground_enabled</td><td>false</td><td>Enables the GraphQL playground on (<code>$LISTEN_ADDR/</code>)</td><td>true</td></tr><tr><td>PLAYGROUND_PATH</td><td>playground_path</td><td>false</td><td>The path where the playground is served</td><td>"/"</td></tr><tr><td>INTROSPECTION_ENABLED</td><td>introspection_enabled</td><td>false</td><td></td><td>true</td></tr><tr><td>LOG_LEVEL</td><td>log_level</td><td>false</td><td>debug / info / warning / error / fatal / panic</td><td>info</td></tr><tr><td>JSON_LOG</td><td>json_log</td><td>false</td><td>Render the log output in JSON format (true) or human readable (false)</td><td>true</td></tr><tr><td>SHUTDOWN_DELAY</td><td>shutdown_delay</td><td>true</td><td>Maximum time in seconds the server has to shutdown gracefully. Should be higher than <code>GRACE_PERIOD</code></td><td>60s</td></tr><tr><td>GRACE_PERIOD</td><td>grace_period</td><td>true</td><td>Maximum time in seconds the server has between schema updates to gracefully close client connections. Should be smaller than <code>SHUTDOWN_DELAY</code></td><td>20s</td></tr><tr><td>POLL_INTERVAL</td><td>poll_interval</td><td>true</td><td>The interval of how often the router should check for new schema updates</td><td>10s</td></tr><tr><td>HEALTH_CHECK_PATH</td><td>health_check_path</td><td>false</td><td>Health check path. Returns <code>200</code> when the router is alive</td><td>/health</td></tr><tr><td>READINESS_CHECK_PATH</td><td>readiness_check_path</td><td>false</td><td>Readiness check path. Return <code>200</code> when the router is ready to accept traffic, otherwise <code>503</code></td><td>/health/ready</td></tr><tr><td>LIVENESS_CHECK_PATH</td><td>liveness_check_path</td><td>false</td><td>Liveness check path. Return 200 when the router is alive</td><td>/health/live</td></tr><tr><td>GRAPHQL_PATH</td><td>graphql_path</td><td>false</td><td>The path where the GraphQL Handler is served</td><td>/graphql</td></tr><tr><td>PLAYGROUND_PATH</td><td>playground_path</td><td>false</td><td>The path where the playground is served</td><td>/</td></tr><tr><td>LOCALHOST_FALLBACK_INSIDE_DOCKER</td><td>localhost_fallback_inside_docker</td><td>false</td><td>Enable fallback for requests that fail to connect to localhost while running in Docker</td><td>true</td></tr><tr><td>DEV_MODE</td><td>dev_mode</td><td>false</td><td>Enables pretty log output and allows to use <a data-mention href="advanced-request-tracing-art.md">advanced-request-tracing-art.md</a> without further security protection.</td><td>false</td></tr><tr><td>INSTANCE_ID</td><td></td><td>false</td><td>If not specified, a new ID will be generated with each router start. A stable ID ensures that metrics with the same ID are grouped together.</td><td></td></tr></tbody></table>

#### Example configuration:

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

## Graph

Overall configuration for the Graph that's configured for this Router.

<table data-full-width="false"><thead><tr><th>Environment Variable</th><th>YAML</th><th width="112" data-type="checkbox">Required</th><th width="283">Description</th><th>Default Value</th></tr></thead><tbody><tr><td>GRAPH_API_TOKEN</td><td>token</td><td>true</td><td>The token permits the router to communicate with the controlplane and export telemetry. Created with <a href="../cli/router/token/create.md"><code>wgc router token create</code></a>. (Can be empty when providing a static router configuration through <code>ROUTER_CONFIG_PATH</code>but will disable the default telemetry stack)</td><td></td></tr></tbody></table>

Example YAML config:

```yaml
version: "1"

graph:
  token: "<your-graph-token>"
```

## Cluster

<table data-full-width="false"><thead><tr><th width="318">Environment Variable</th><th>YAML</th><th width="112" data-type="checkbox">Required</th><th>Description</th><th>Default Value</th></tr></thead><tbody><tr><td>CLUSTER_NAME</td><td>name</td><td>false</td><td></td><td></td></tr></tbody></table>

#### Example YAML config:

```yaml
version: "1"
 
# See "https://cosmo-docs.wundergraph.com/studio/cluster-management" for more information
cluster:
  name: "us-central1-cosmo-cloud "
```

## Telemetry



<table data-full-width="false"><thead><tr><th width="318">Environment Variable</th><th>YAML</th><th width="112" data-type="checkbox">Required</th><th>Description</th><th>Default Value</th></tr></thead><tbody><tr><td>TELEMETRY_SERVICE_NAME</td><td>service_name</td><td>true</td><td></td><td>cosmo-router</td></tr></tbody></table>

#### Example YAML config:

```yaml
version: "1"
 
# See "https://cosmo-docs.wundergraph.com/router/metrics-and-monitoring" for more information
telemetry:
  # Common options
  service_name: "cosmo-router"
```

## Tracing

<table data-full-width="false"><thead><tr><th width="398">Environment Variable</th><th width="233">YAML</th><th width="112" data-type="checkbox">Required</th><th width="199">Description</th><th>Default Value</th></tr></thead><tbody><tr><td>TRACING_ENABLED</td><td>enabled</td><td>false</td><td></td><td>true</td></tr><tr><td>TRACING_SAMPLING_RATE</td><td>sampling_rate</td><td>true</td><td><p>min 0.0</p><p>max 1.0</p></td><td>1</td></tr><tr><td>TRACING_BATCH_TIMEOUT</td><td></td><td>false</td><td>The maximum delay allowed before spans are exported.</td><td>10s</td></tr><tr><td>TRACING_EXPORT_GRAPHQL_VARIABLES</td><td>export_graphql_variables</td><td>false</td><td>Export GraphQL variables as span attribute.</td><td>true</td></tr><tr><td></td><td>with_new_root</td><td>false</td><td>Starts the root span always at the router.</td><td>false</td></tr></tbody></table>

#### Example YAML config:

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
    export_graphql_variables: true
    with_new_root: false
```

### Exporters

<table data-full-width="false"><thead><tr><th width="377">Environment Variable</th><th width="245">YAML</th><th width="112" data-type="checkbox">Required</th><th width="164">Description</th><th>Default Value</th></tr></thead><tbody><tr><td></td><td>disabled</td><td>false</td><td>bool</td><td></td></tr><tr><td></td><td>exporter</td><td>false</td><td>one of: http,grpc</td><td></td></tr><tr><td></td><td>endpoint</td><td>false</td><td></td><td></td></tr><tr><td></td><td>path</td><td>false</td><td></td><td></td></tr><tr><td></td><td>headers</td><td>false</td><td></td><td></td></tr></tbody></table>

#### Example YAML config:

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

### Propagation

<table data-full-width="false"><thead><tr><th width="219">Environment Variable</th><th width="186">YAML</th><th width="112" data-type="checkbox">Required</th><th>Description</th><th>Default Value</th></tr></thead><tbody><tr><td></td><td>trace_context</td><td>false</td><td></td><td>true</td></tr><tr><td></td><td>jaeger</td><td>false</td><td></td><td></td></tr><tr><td></td><td>b3</td><td>false</td><td></td><td></td></tr><tr><td></td><td>baggage</td><td>false</td><td></td><td></td></tr></tbody></table>

#### Example YAML config:

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
```

## Metrics

### OLTP

<table data-full-width="false"><thead><tr><th width="285">Environment Variable</th><th width="168">YAML</th><th width="112" data-type="checkbox">Required</th><th width="183">Description</th><th>Default Value</th></tr></thead><tbody><tr><td>METRICS_OTLP_ENABLED</td><td>enabled</td><td>true</td><td>Enables OTEL metrics instrumentation</td><td>true</td></tr><tr><td>METRICS_OTLP_ROUTER_RUNTIME</td><td>router_runtime</td><td>false</td><td></td><td>true</td></tr></tbody></table>

#### Example YAML config:

```yaml
version: "1"

# See "https://cosmo-docs.wundergraph.com/router/metrics-and-monitoring" for more information
telemetry:
  # OpenTelemetry Metrics
  metrics:
    otlp:
      enabled: true
      router_runtime: true
```

### Prometheus

<table data-full-width="false"><thead><tr><th width="387">Environment Variable</th><th width="207">YAML</th><th width="112" data-type="checkbox">Required</th><th width="183">Description</th><th>Default Value</th></tr></thead><tbody><tr><td>PROMETHEUS_ENABLED</td><td>enabled</td><td>true</td><td>Enables prometheus metrics support</td><td>true</td></tr><tr><td>PROMETHEUS_HTTP_PATH</td><td>path</td><td>false</td><td>The HTTP path where metrics are exposed.</td><td>"/metrics"</td></tr><tr><td>PROMETHEUS_LISTEN_ADDR</td><td>listen_addr</td><td>false</td><td>The prometheus listener address</td><td>"127.0.0.1:8088"</td></tr><tr><td>PROMETHEUS_EXCLUDE_METRICS</td><td>exclude_metrics</td><td>false</td><td></td><td></td></tr><tr><td>PROMETHEUS_EXCLUDE_METRIC_LABELS</td><td>exclude_metric_labels</td><td>false</td><td></td><td></td></tr></tbody></table>

#### Example YAML config:

```yaml
version: "1"

# See "https://cosmo-docs.wundergraph.com/router/metrics-and-monitoring" for more information
telemetry:          
    # Expose OpenTelemetry metrics for scraping
    prometheus:
      enabled: true
      path: "/metrics"
      listen_addr: "127.0.0.1:8088"
      exclude_metrics: []
      exclude_metric_labels: []
```

### Exporter

<table data-full-width="false"><thead><tr><th width="223">Environment Variable</th><th>YAML</th><th width="112" data-type="checkbox">Required</th><th width="206">Description</th><th>Default Value</th></tr></thead><tbody><tr><td></td><td>disabled</td><td>false</td><td></td><td></td></tr><tr><td></td><td>exporter</td><td>false</td><td>one of: http,grpc</td><td></td></tr><tr><td></td><td>endpoint</td><td>false</td><td></td><td></td></tr><tr><td></td><td>path</td><td>false</td><td></td><td></td></tr><tr><td></td><td>headers</td><td>false</td><td></td><td></td></tr></tbody></table>

#### Example YAML config:

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
          # headers: {Authorization: Bearer <my-token>}
          
    # Expose OpenTelemetry metrics for scraping
    prometheus:
      enabled: true
      path: "/metrics"
      listen_addr: "127.0.0.1:8088"
      exclude_metrics: []
      exclude_metric_labels: []
```

## GraphQL Metrics

<table data-full-width="false"><thead><tr><th width="406">Environment Variable</th><th width="196">YAML</th><th width="112" data-type="checkbox">Required</th><th width="183">Description</th><th>Default Value</th></tr></thead><tbody><tr><td>GRAPHQL_METRICS_ENABLED</td><td>enabled</td><td>false</td><td></td><td>true</td></tr><tr><td>GRAPHQL_METRICS_COLLECTOR_ENDPOINT</td><td>collector_endpoint</td><td>true</td><td>Default endpoint</td><td><a href="https://cosmo-metrics.wundergraph.com">https://cosmo-metrics.wundergraph.com</a></td></tr></tbody></table>

#### Example YAML config:

```yaml
version: "1"

graphql_metrics:
    enabled: true
    collector_endpoint: 'https://cosmo-metrics.wundergraph.com'
```

## CORS

<table data-full-width="false"><thead><tr><th width="406">Environment Variable</th><th width="196">YAML</th><th width="112" data-type="checkbox">Required</th><th width="183">Description</th><th>Default Value</th></tr></thead><tbody><tr><td>CORS_ALLOW_ORIGINS</td><td>allow_origins</td><td>false</td><td></td><td>*</td></tr><tr><td>CORS_ALLOW_METHODS</td><td>allow_methods</td><td>false</td><td></td><td>HEAD,GET,POST</td></tr><tr><td>CORS_ALLOW_HEADERS</td><td>allow_headers</td><td>false</td><td></td><td>Origin,Content-Length,Content-Type</td></tr><tr><td>CORS_ALLOW_CREDENTIALS</td><td>allow_credentials</td><td>false</td><td></td><td>true</td></tr><tr><td>CORS_MAX_AGE</td><td>max_age</td><td>false</td><td></td><td>5m</td></tr></tbody></table>

#### Example YAML config:

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
  max_age_minutes: 5m
```

## Custom Modules

Configure your custom Modules. More information on this feature can be found here: [custom-modules.md](custom-modules.md "mention")

Example YAML config:

```yaml
version: "1"

modules:
  myModule:
    # Arbitrary values, unmarshalled by the module
    value: 1
```

## Headers

Configure Header propagation rules for all Subgraphs or individual Subgraphs by name.

### Global Header Rules

Apply to requests to "all" Subgraphs

<table data-full-width="false"><thead><tr><th width="217">Environment Variable</th><th width="196">YAML</th><th width="112" data-type="checkbox">Required</th><th width="183">Description</th><th>Default Value</th></tr></thead><tbody><tr><td></td><td>request</td><td>false</td><td><a data-mention href="configuration.md#request-header-rule">#request-header-rule</a></td><td></td></tr></tbody></table>

#### Example YAML config:

```yaml
version: "1"

# Header manipulation
# See "https://cosmo-docs.wundergraph.com/router/proxy-capabilities" for more information
headers:
  all: # Header rules for all origin requests.
    request:
      - op: "propagate"
        named: X-Test-Header
      - op: "propagate"
        matching: (?i)^x-deprecated-.*
```

### Request Header Rule

Apply to requests to specific Subgraphs.

<table data-full-width="false"><thead><tr><th width="217">Environment Variable</th><th width="196">YAML</th><th width="112" data-type="checkbox">Required</th><th width="183">Description</th><th>Default Value</th></tr></thead><tbody><tr><td></td><td>op</td><td>false</td><td>oneof=propagate</td><td></td></tr><tr><td></td><td>matching</td><td>false</td><td>matching is the regex to match the header name against</td><td></td></tr><tr><td></td><td>named</td><td>false</td><td>named is the exact header name to match</td><td></td></tr><tr><td></td><td>default</td><td>false</td><td>default is the default value to set if the header is not present</td><td></td></tr></tbody></table>

#### Example YAML config:

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
```

## Traffic Shaping

Configure rules for traffic shaping like maximum request body size, timeouts, retry behavior, etc. For more info, check this section in the docs: [traffic-shaping.md](traffic-shaping.md "mention")

Example YAML config:

```yaml
version: "1"

# Traffic configuration
# See "https://cosmo-docs.wundergraph.com/router/traffic-shaping" for more information
traffic_shaping:
  # Apply to all requests from clients to the router
  router:
    # Is the maximum size of the request body in MB, mib
    max_request_body_size: 5MB
  all: # Rules are applied to all subgraph requests.
    # Subgraphs transport options
    request_timeout: 60s
    dial_timeout: 30s
    tls_handshake_timeout: 0s
    response_header_timeout: 0s
    expect_continue_timeout: 0s
    keep_alive_idle_timeout: 0s
    keep_alive_probe_interval: 30s
    # Retry
    retry: # Rule is only applied to GraphQL operations of type "query"
      enabled: true
      algorithm: "backoff_jitter"
      max_attempts: 5
      interval: 3s
      max_duration: 10s
```

### Subgraph Request Rules

These rules apply to requests being made from the Router to all Subgraphs.

<table data-full-width="false"><thead><tr><th width="209">Environment Variable</th><th width="270">YAML</th><th width="112" data-type="checkbox">Required</th><th width="183">Description</th><th>Default Value</th></tr></thead><tbody><tr><td></td><td>retry</td><td>false</td><td><a data-mention href="configuration.md#traffic-shaping-jitter-retry">#traffic-shaping-jitter-retry</a></td><td></td></tr><tr><td></td><td>request_timeout</td><td>true</td><td></td><td>60s</td></tr><tr><td></td><td>dial_timeout</td><td>false</td><td></td><td>30s</td></tr><tr><td></td><td>response_header_timeout</td><td>false</td><td></td><td>0s</td></tr><tr><td></td><td>expect_continue_timeout</td><td>false</td><td></td><td>0s</td></tr><tr><td></td><td>tls_handshake_timeout</td><td>false</td><td></td><td>10s</td></tr><tr><td></td><td>keep_alive_idle_timeout</td><td>false</td><td></td><td>0s</td></tr><tr><td></td><td>keep_alive_probe_interval</td><td>false</td><td></td><td>30s</td></tr></tbody></table>

### Jitter Retry

<table data-full-width="false"><thead><tr><th width="406">Environment Variable</th><th width="196">YAML</th><th width="112" data-type="checkbox">Required</th><th width="183">Description</th><th>Default Value</th></tr></thead><tbody><tr><td>RETRY_ENABLED</td><td>enabled</td><td>false</td><td></td><td>true</td></tr><tr><td></td><td>algorithm</td><td>false</td><td>backoff_jitter</td><td>backoff_jitter</td></tr><tr><td></td><td>max_attempts</td><td>true</td><td></td><td></td></tr><tr><td></td><td>max_duration</td><td>true</td><td></td><td></td></tr><tr><td></td><td>interval</td><td>true</td><td></td><td></td></tr></tbody></table>

### Client Request Request Rules

These rules apply to requests being made from clients to the Router.

<table data-full-width="false"><thead><tr><th width="247">Environment Variable</th><th width="275">YAML</th><th width="112" data-type="checkbox">Required</th><th width="183">Description</th><th>Default Value</th></tr></thead><tbody><tr><td></td><td>max_request_body_size</td><td>false</td><td></td><td>5mb</td></tr></tbody></table>

## Authentication

Configure different authentication providers.

### Provider

<table data-full-width="false"><thead><tr><th width="215">Environment Variable</th><th width="275">YAML</th><th width="112" data-type="checkbox">Required</th><th width="183">Description</th><th>Default Value</th></tr></thead><tbody><tr><td></td><td>name</td><td>false</td><td>Name of the provider</td><td></td></tr><tr><td></td><td>jwks</td><td>false</td><td>JWK Provider</td><td></td></tr></tbody></table>

### JWK Provider

<table data-full-width="false"><thead><tr><th width="208">Environment Variable</th><th width="275">YAML</th><th width="112" data-type="checkbox">Required</th><th width="183">Description</th><th>Default Value</th></tr></thead><tbody><tr><td></td><td>url</td><td>false</td><td></td><td></td></tr><tr><td></td><td>header_names</td><td>false</td><td></td><td></td></tr><tr><td></td><td>header_value_prefixes</td><td>false</td><td></td><td></td></tr><tr><td></td><td>refresh_interval</td><td>true</td><td></td><td>1m</td></tr></tbody></table>

#### Example YAML config:

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

## Authorization

<table data-full-width="false"><thead><tr><th width="368">Environment Variable</th><th width="289">YAML</th><th width="112" data-type="checkbox">Required</th><th width="183">Description</th><th>Default Value</th></tr></thead><tbody><tr><td>REQUIRE_AUTHENTICATION</td><td>require_authentication</td><td>false</td><td>Set to true to disallow unauthenticated requests</td><td>false</td></tr><tr><td>REJECT_OPERATION_IF_UNAUTHORIZED</td><td>reject_operation_if_unauthorized</td><td>false</td><td>If enabled, the Router will return 401 with no response data when the evaluation of field-based permissions (<a data-mention href="../federation/directives/authenticated.md">authenticated.md</a>or <a data-mention href="../federation/directives/requiresscopes.md">requiresscopes.md</a>fails)</td><td>false</td></tr></tbody></table>

#### Example YAML config:

```yaml
version: "1"

authorization:
  require_authentication: false
  reject_operation_if_unauthorized: false
```

## CDN

<table data-full-width="false"><thead><tr><th width="247">Environment Variable</th><th width="275">YAML</th><th width="112" data-type="checkbox">Required</th><th width="183">Description</th><th>Default Value</th></tr></thead><tbody><tr><td>CDN_URL</td><td>url</td><td>false</td><td>The URL of the CDN where the Router will fetch its Config</td><td><a href="https://cosmo-cdn.wundergraph.com">https://cosmo-cdn.wundergraph.com</a></td></tr><tr><td>CDN_CACHE_SIZE</td><td>cache_size</td><td>false</td><td>Cosmo Router caches responses from the CDN in memory, this defines the cache size.</td><td>100MB</td></tr></tbody></table>

#### Example YAML config:

```yaml
version: "1"

cdn:
   url: https://cosmo-cdn.wundergraph.com
   cache_size: 100MB
```

## Events

The Events section lets you define Event Sources for [event-driven-federated-subscriptions-edfs.md](event-driven-federated-subscriptions-edfs.md "mention").

Currently, we only support to use a single Event Source (NATS) with more to come in the future.

```yaml
version: "1"

events:
  sources:
    - provider: NATS
      url: "nats://localhost:4222"
```

### Event Source

<table data-full-width="false"><thead><tr><th width="217">Environment Variable</th><th width="275">YAML</th><th width="112" data-type="checkbox">Required</th><th width="232">Description</th><th>Default Value</th></tr></thead><tbody><tr><td></td><td>provider</td><td>true</td><td>one of: NATS</td><td></td></tr><tr><td></td><td>url</td><td>true</td><td>The URL of the event source, e.g. "nats://localhost:4222"</td><td></td></tr></tbody></table>

## Router Engine Configuration

Configure the GraphQL Execution Engine of the Router.

<table data-full-width="false"><thead><tr><th width="247">Environment Variable</th><th width="275">YAML</th><th width="112" data-type="checkbox">Required</th><th width="183">Description</th><th>Default Value</th></tr></thead><tbody><tr><td>ENGINE_ENABLE_SINGLE_FLIGHT</td><td>enable_single_flight</td><td>false</td><td>Deduplicate exactly the same in-flight origin request</td><td>true</td></tr><tr><td>ENGINE_ENABLE_REQUEST_TRACING</td><td>enable_request_tracing</td><td>false</td><td>Enable <a data-mention href="advanced-request-tracing-art.md">advanced-request-tracing-art.md</a>This config is not correlated to OTEL tracing.</td><td>true</td></tr><tr><td>ENGINE_ENABLE_EXECUTION_PLAN_CACHE_RESPONSE_HEADER</td><td>enable_execution_plan_cache_response_header</td><td>false</td><td>Usually only required for testing. When enabled, the Router sets the response Header "X-WG-Execution-Plan-Cache" to "HIT" or "MISS"</td><td>false</td></tr><tr><td>ENGINE_MAX_CONCURRENT_RESOLVERS</td><td>max_concurrent_resolvers</td><td>false</td><td>Use this to limit the concurrency in the GraphQL Engine. A high number will lead to more memory usage. A number too low will slow down your Router.</td><td>1024</td></tr><tr><td>ENGINE_ENABLE_WEBSOCKET_EPOLL_KQUEUE</td><td>enable_websocket_epoll_kqueue</td><td>false</td><td>Use Epoll/Kqueue to handle WebSocket connections efficiently.</td><td>true</td></tr><tr><td>ENGINE_EPOLL_KQUEUE_POLL_TIMEOUT</td><td>epoll_kqueue_poll_timeout</td><td>false</td><td>Define the polling timeout for Epoll / Kqueue.</td><td>1s</td></tr><tr><td>ENGINE_EPOLL_KQUEUE_CONN_BUFFER_SIZE</td><td>epoll_kqueue_conn_buffer_size</td><td>false</td><td>Epoll / Kqueue polling uses a buffer. This number should match the number of potential client messages per polling interval.</td><td>128</td></tr><tr><td>ENGINE_WEBSOCKET_READ_TIMEOUT</td><td>websocket_read_timeout</td><td>false</td><td></td><td>5s</td></tr><tr><td>ENGINE_EXECUTION_PLAN_CACHE_SIZE</td><td>execution_plan_cache_size</td><td>false</td><td>Define how many GraphQL Operations should be stored in the execution plan cache. A low number will lead to more frequent cache misses, which will lead to increased latency.</td><td>10000</td></tr></tbody></table>

#### Example YAML config:

```yaml
version: "1"

engine:
  enable_single_flight: true
  enable_request_tracing: true
  enable_execution_plan_cache_response_header: false
  max_concurrent_resolvers: 1024
  enable_websocket_epoll_kqueue: true
  epoll_kqueue_poll_timeout: "1s"
  epoll_kqueue_conn_buffer_size: 128
  websocket_read_timeout: "1s"
  execution_plan_cache_size: 10000
```

### Debug Configuration

<table data-full-width="false"><thead><tr><th width="247">Environment Variable</th><th width="275">YAML</th><th width="112" data-type="checkbox">Required</th><th width="183">Description</th><th>Default Value</th></tr></thead><tbody><tr><td></td><td>report_websocket_connections</td><td>false</td><td>Report the number of WebSocket Connections and active Subscriptions in regular intervals to the log</td><td>false</td></tr><tr><td></td><td>report_memory_usage</td><td>false</td><td>Report the Memory usage of Cosmo Router to the log in regular intervals</td><td>false</td></tr></tbody></table>

Example YAML config:

```yaml
version: "1"

engine:
  debug:
    report_websocket_connections: false
    report_memory_usage: false
```

## Rate Limiting

### General Rate Limiting Configuration

<table data-full-width="false"><thead><tr><th width="249">Environment Variable</th><th width="275">YAML</th><th width="112" data-type="checkbox">Required</th><th width="232">Description</th><th>Default Value</th></tr></thead><tbody><tr><td>RATE_LIMIT_ENABLED</td><td>enabled</td><td>false</td><td>Enable / Disable rate limiting globally</td><td>false</td></tr><tr><td>RATE_LIMIT_STRATEGY</td><td>strategy</td><td>true</td><td>oneof=simple</td><td></td></tr><tr><td></td><td>simple_strategy</td><td>false</td><td></td><td></td></tr><tr><td></td><td>storage</td><td>false</td><td></td><td></td></tr></tbody></table>

### Storage

<table data-full-width="false"><thead><tr><th width="249">Environment Variable</th><th width="150">YAML</th><th width="112" data-type="checkbox">Required</th><th width="153">Description</th><th>Default Value</th></tr></thead><tbody><tr><td>REDIS_ADDR</td><td>addr</td><td>true</td><td></td><td>localhost:6379</td></tr><tr><td>REDIS_PASSWORD</td><td>password</td><td>false</td><td></td><td></td></tr><tr><td>RATE_LIMIT_REDIS_KEY_PREFIX</td><td>key_prefix</td><td>false</td><td>This prefix is used to namespace the ratelimit keys</td><td>cosmo_rate_limit</td></tr></tbody></table>

### Simple Strategy

<table data-full-width="false"><thead><tr><th width="286">Environment Variable</th><th width="275">YAML</th><th width="112" data-type="checkbox">Required</th><th width="232">Description</th><th>Default Value</th></tr></thead><tbody><tr><td>RATE_LIMIT_SIMPLE_RATE</td><td>rate</td><td>true</td><td>Allowed request rate (number)</td><td>10</td></tr><tr><td>RATE_LIMIT_SIMPLE_BURST</td><td>burst</td><td>true</td><td>Allowed burst rate (number) - max rate per one request</td><td>10</td></tr><tr><td>RATE_LIMIT_SIMPLE_PERIOD</td><td>period</td><td>true</td><td>The rate limiting period, e.g. "10s", "1m", etc...</td><td>1s</td></tr><tr><td>RATE_LIMIT_SIMPLE_REJECT_EXCEEDING_REQUESTS</td><td>reject_exceeding_requests</td><td>false</td><td>Reject the complete request if a sub-request exceeds the rate limit. If set to false, partial responses are possible.</td><td>false</td></tr></tbody></table>

### Example YAML Configuration

Here's an example configuration of hot to set-up rate limiting.

```yaml
version: "1"

rate_limit:
  enabled: true
  strategy: "simple"
  storage:
    addr: "localhost:6379"
    password: "test"
    key_prefix: "cosmo_rate_limit"
  simple_strategy:
    rate: 60
    burst: 60
    period: "60s"
    reject_exceeding_requests: true
```

## Environment Variables

Many configuration options can be set as environment variables. For a complete list of options, please look at the [config file](configuration.md#complete-config-example).

{% hint style="info" %}
Intervals, timeouts, and delays are specified in Go [duration](https://pkg.go.dev/maze.io/x/duration#ParseDuration) syntax e.g 1s, 5m or 1h.

Sizes can be specified in 2MB, 1mib.
{% endhint %}

### Expand Environment Variables

You can expand environment variables in the file like this:

```
log_level: "${LOG_LEVEL}"
```

This will replace the value of the environment variable `LOG_LEVEL` with the value of the key `log_level` in your config file. For numeric values, ensure quotes are omitted.

## Complete Config Example

Instead of using environment variables, you can also create a `config.yaml` in the working directory of the router. Here you can find all configuration options with the corresponding defaults.

<pre class="language-yaml"><code class="lang-yaml">version: "1"

# General router options
graph:
  token: ""

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

# Cross-Origin Resource Sharing (CORS)
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
  max_age_minutes: 5m

# Config for custom modules   
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
    export_graphql_variables: true
    with_new_root: false
    propagation:
      # https://www.w3.org/TR/trace-context/
      trace_context: true
      # https://www.w3.org/TR/baggage/
      baggage: false
      # https://www.jaegertracing.io/ (compliant with opentracing)
      jaeger: false
      # https://github.com/openzipkin/b3-propagation (zipkin)
      b3: false
    exporters:
      # If no exporters are defined, the default one is used
      - exporter: http # or grpc
        disabled: false
        endpoint: https://my-otel-collector.example.com
        # headers: {Authorization: Bearer &#x3C;my-token>}
        batch_timeout: 10s
        export_timeout: 30s

  # OpenTelemetry Metrics
  metrics:
    otlp:
      enabled: true
      # If no exporters are defined, the default one is used
      exporters:
        - exporter: http # or grpc
          disabled: false
          endpoint: https://my-otel-collector.example.com
          # headers: {Authorization: Bearer &#x3C;my-token>}
          
    # Expose OpenTelemetry metrics for scraping
    prometheus:
      enabled: true
      path: "/metrics"
      listen_addr: "127.0.0.1:8088"
      exclude_metrics: []
      exclude_metric_labels: []

# Config for custom modules   
# See "https://cosmo-docs.wundergraph.com/router/custom-modules" for more information   
modules:
  myModule:
    # Arbitrary values, unmarshalled by the module
    value: 1

# Traffic configuration
# See "https://cosmo-docs.wundergraph.com/router/traffic-shaping" for more information
<strong>traffic_shaping:
</strong><strong>  # Apply to all requests from clients to the router
</strong>  router:
    # Is the maximum size of the request body in MB, mib
    max_request_body_size: 5MB
  all: # Rules are applied to all subgraph requests.
    # Subgraphs transport options
    request_timeout: 60s
    dial_timeout: 30s
    tls_handshake_timeout: 0s
    response_header_timeout: 0s
    expect_continue_timeout: 0s
    keep_alive_idle_timeout: 0s
    keep_alive_probe_interval: 30s
    # Retry
    retry: # Rule is only applied to GraphQL operations of type "query"
      enabled: true
      algorithm: "backoff_jitter"
      max_attempts: 5
      interval: 3s
      max_duration: 10s

# Header manipulation
# See "https://cosmo-docs.wundergraph.com/router/proxy-capabilities" for more information
headers:
  all: # Header rules for all origin requests.
    request:
      - op: "propagate"
        named: X-Test-Header
      - op: "propagate"
        matching: (?i)^x-deprecated-.*

# Authentication and Authorization
# See https://cosmo-docs.wundergraph.com/router/authentication-and-authorization for more information  
authentication:
  providers:
    - name: My Auth Provider # Optional, used for error messages and diagnostics
      jwks: # JWKS provider configuration
        url: https://example.com/.well-known/jwks.json # URL to load the JWKS from
        header_name: Authorization # Optional
        header_value_prefix: Bearer # Optional
       
authorization:
  require_authentication: false # Set to true to disable requests without authentication
     
cdn:
   url: https://cosmo-cdn.wundergraph.com
   cache_size: 100MB
   
events:
  sources:
    - provider: NATS
      url: "nats://localhost:4222"
   
engine:
  enable_single_flight: true
  enable_request_tracing: true
  enable_execution_plan_cache_response_header: false
  max_concurrent_resolvers: 1024
  enable_websocket_epoll_kqueue: true
  epoll_kqueue_poll_timeout: "1s"
  epoll_kqueue_conn_buffer_size: 128
  websocket_read_timeout: "1s"
  execution_plan_cache_size: 10000
  debug:
    report_websocket_connections: false
    report_memory_usage: false
    
rate_limit:
  enabled: true
  strategy: "simple"
  storage:
    addr: "localhost:6379"
    password: "test"
    key_prefix: "cosmo_rate_limit"
  simple_strategy:
    rate: 60
    burst: 60
    period: "60s"
    reject_exceeding_requests: true
</code></pre>

You can also point to a custom config file by overwriting `CONFIG_PATH` environment variable.

{% hint style="warning" %}
Values specified in the config file have **precedence** over Environment variables. This also includes empty values so only specify values that should be overwritten.
{% endhint %}
