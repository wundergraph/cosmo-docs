---
description: Learn how to configure your router.
---

# Configuration

The router provides three different ways of customization:

1. The config file. This file allows configuring the global behavior of the router. For a full reference of all available options see below. You can either pass [environment variables](configuration.md#environment-variables) or use a local [`config.yaml`](configuration.md#config-file) for convenience.
2. The router execution config. This file contains information on how to resolve your federated schema. The engine uses the information to build a highly optimized query planner. The content is fetched by default from the controlplane or CDN but you can also provide this as a file. For more information see [`wgc router compose`](../cli/router/compose.md) to build the file locally for development or [`wgc router fetch`](../cli/router/fetch.md) to download the latest production version.
3. Custom Go [modules](custom-modules.md). It is unlikely that we will provide every possible feature as an in-built functionality. For advanced use cases or for more control, you can build Go modules and compile your own router in a few commands. If you are unsure about if your use case should be implemented as a custom module, don't hesitate to open an issue. We might already have a plan for this or can assist you with the implementation.

{% hint style="info" %}
**Recommendation** Passing secrets as environment variables and using the config to store everything else is a common and pragmatic approach.
{% endhint %}

## Environment Variables

Many configuration options can be set as environment variables. For a complete list of options, please look at the [config file](configuration.md#config-file).

<table><thead><tr><th width="316">Environment variable</th><th width="416">Description</th><th width="219">Default</th><th data-type="checkbox">Required</th><th data-hidden>Description</th><th data-hidden>Default</th><th data-hidden>Value</th><th data-hidden data-type="checkbox">Required</th><th data-hidden>Default</th></tr></thead><tbody><tr><td>FEDERATED_GRAPH_NAME</td><td>The name of the federated graph that the router represents. This is the name of the graph you've created with <a href="../cli/federated-graph/create.md"><code>wgc federated-graph create</code></a>. (Can be empty when providing a static router configuration through <code>ROUTER_CONFIG_PATH</code>but will disable the default telemetry stack)</td><td>""</td><td>true</td><td>The name of the federated graph that the router represent</td><td>""</td><td>String</td><td>true</td><td>""</td></tr><tr><td>GRAPH_API_TOKEN</td><td>The token permits the router to communicate with the controlplane and export telemetry. Created with <a href="../cli/router/token/create.md"><code>wgc router token create</code></a>. (Can be empty when providing a static router configuration through <code>ROUTER_CONFIG_PATH</code>but will disable the default telemetry stack)</td><td>""</td><td>true</td><td>The token that permits the router to communicate with the contolplane and export metrics.</td><td>""</td><td>String (Generated from <a href="broken-reference/"><code>federated-graph create-token</code></a>)</td><td>true</td><td>""</td></tr><tr><td>CONTROLPLANE_URL</td><td>The controlplane url.</td><td>"https://cosmo-otel.wundergraph.com"</td><td>false</td><td>The URL of the controlplane.</td><td><a href="http://localhost:3001">http://localhost:3001</a></td><td>String</td><td>false</td><td><a href="http://localhost:3001">http://localhost:3001</a></td></tr><tr><td>DEFAULT_TELEMETRY_ENDPOINT</td><td>The address to the OTEL collector used when no exporters are defined e.g <a href="http://localhost:4318"><code>http://localhost:4318</code></a></td><td>"https://cosmo-otel.wundergraph.com"</td><td>false</td><td></td><td></td><td></td><td>false</td><td></td></tr><tr><td>TELEMETRY_SERVICE_NAME</td><td>The OTEL service name.</td><td>wundergraph-cosmo-router</td><td>true</td><td>The name of your router service</td><td><pre><code>wundergraph-cosmo-router
</code></pre></td><td>String</td><td>false</td><td>wundergraph-cosmo-router</td></tr><tr><td>TRACING_ENABLED</td><td>Enables OTEL tracing instrumentation</td><td>true</td><td>false</td><td></td><td></td><td></td><td>false</td><td></td></tr><tr><td>TRACING_SAMPLING_RATE</td><td>The sampling rate. Value between 0-1.</td><td>1</td><td>false</td><td>The sampling rate. Must be a value between 0-1</td><td>1</td><td>Float</td><td>false</td><td>1</td></tr><tr><td>TRACING_BATCH_TIMEOUT</td><td>The maximum delay allowed before spans are exported.</td><td>10s</td><td>false</td><td>Configures the maximum delay before a batch of spans is exported</td><td>5</td><td>Integer</td><td>false</td><td>5</td></tr><tr><td>METRICS_OTLP_ENABLED</td><td>Enables OTEL metrics instrumentation</td><td>true</td><td>false</td><td></td><td></td><td></td><td>false</td><td></td></tr><tr><td>PROMETHEUS_ENABLED</td><td>Enables prometheus metrics support</td><td>true</td><td>false</td><td></td><td></td><td></td><td>false</td><td></td></tr><tr><td>PROMETHEUS_HTTP_PATH</td><td>The HTTP path where metrics are exposed.</td><td>"/metrics"</td><td>false</td><td></td><td></td><td></td><td>false</td><td></td></tr><tr><td>PROMETHEUS_LISTEN_ADDR</td><td>The prometheus listener address.</td><td>"127.0.0.1:8088"</td><td>false</td><td></td><td></td><td></td><td>false</td><td></td></tr><tr><td>CORS_ALLOW_HEADERS</td><td>Allowed CORS headers.</td><td>Origin,Content-Length,Content-Type</td><td>false</td><td>Allowed CORS Headers</td><td><pre><code>Origin,Content-Length,Content-Type
</code></pre></td><td>String or comma-separated for multiple values</td><td>false</td><td>Origin,Content-Length,Content-Type</td></tr><tr><td>CORS_ALLOW_ORIGINS</td><td>Allowed CORS origins.</td><td>*</td><td>false</td><td>Allowed CORS Origins</td><td>*</td><td>String or comma-separated for multiple values</td><td>false</td><td>*</td></tr><tr><td>CORS_ALLOW_METHODS</td><td>Allowed CORS methods.</td><td>HEAD,GET,POST</td><td>false</td><td>Allowed CORS Methods</td><td><pre><code>HEAD,GET,POST
</code></pre></td><td>String or comma-separated for multiple values</td><td>false</td><td>HEAD,GET,POST</td></tr><tr><td>CORS_ALLOW_CREDENTIALS</td><td>Allowed CORS credential mode.</td><td>true</td><td>false</td><td>Allowed CORS Credential mode</td><td>false</td><td>Boolean</td><td>false</td><td>false</td></tr><tr><td>CORS_MAX_AGE</td><td>Maximum time the results of a preflight request can be cached.</td><td>5s</td><td>false</td><td>CORA max age</td><td>5</td><td>Integer</td><td>false</td><td>5</td></tr><tr><td>LISTEN_ADDR</td><td>The server listener address.</td><td>localhost:3002</td><td>false</td><td>The server address</td><td>localhost:3002</td><td>String</td><td>false</td><td>localhost:3002</td></tr><tr><td>PLAYGROUND_ENABLED</td><td>Enables the GraphQL playground on (<code>$LISTEN_ADDR/</code>)</td><td>true</td><td>false</td><td>Enables the GraphQL playground on <code>$LISTEN_ADDR/graphl</code></td><td>true</td><td>Boolean</td><td>false</td><td>true</td></tr><tr><td>INTROSPECTION_ENABLED</td><td>Enables the introspection endpoint.</td><td>true</td><td>false</td><td>Enables the introspection endpoint</td><td>true</td><td>Boolean</td><td>false</td><td>true</td></tr><tr><td>LOG_LEVEL</td><td>Configures the log level.</td><td>info</td><td>false</td><td>The log level</td><td>info</td><td><ul><li>debug</li><li>info</li><li>warning</li><li>error</li><li>fatal</li><li>panic</li></ul></td><td>false</td><td>info</td></tr><tr><td>JSON_LOG</td><td>Enables JSON logging.</td><td>true</td><td>false</td><td>Enables JSON logging</td><td>true</td><td>Boolean</td><td>false</td><td>true</td></tr><tr><td>DEV_MODE</td><td>Enables pretty log output and allows to use <a href="advanced-request-tracing-art.md">Advanced Request Tracing (ART)</a> without further security protection.</td><td>false</td><td>false</td><td></td><td></td><td></td><td>false</td><td></td></tr><tr><td>SHUTDOWN_DELAY</td><td>Maximum time in seconds the server has to shutdown gracefully. Should be higher than <code>GRACE_PERIOD_SECONDS</code></td><td>30s</td><td>false</td><td>Shutdown grace period of the server</td><td>15</td><td>Integer</td><td>false</td><td>15</td></tr><tr><td>GRACE_PERIOD</td><td>Maximum time in seconds the server has between schema updates to gracefully close client connections. Should be smaller than <code>SHUTDOWN_DELAY_SECONDS</code></td><td>20s</td><td>false</td><td>Shutdown grace period between schema rollouts.</td><td>0</td><td>Integer</td><td>false</td><td>0</td></tr><tr><td>POLL_INTERVAL</td><td>The interval of how often the router should check for new schema updates.</td><td>10s</td><td>false</td><td>Configures how often should should the router fetch for new schema updates</td><td>10</td><td>Integer</td><td>false</td><td>10</td></tr><tr><td>HEALTH_CHECK_PATH</td><td>Health check path. Returns <code>200</code> when the router is alive.</td><td>"/health"</td><td>false</td><td></td><td></td><td></td><td>false</td><td></td></tr><tr><td>READINESS_CHECK_PATH</td><td>Readiness check path. Return <code>200</code> when the router is ready to accept traffic, otherwise <code>503</code>.</td><td>"health/ready"</td><td>false</td><td></td><td></td><td></td><td>false</td><td></td></tr><tr><td>LIVENESS_CHECK_PATH</td><td>Liveness check path. Return 200 when the router is alive.</td><td>"/health/live"</td><td>false</td><td></td><td></td><td></td><td>false</td><td></td></tr><tr><td>ROUTER_CONFIG_PATH</td><td>The path to the Router execution config to test a graph composition locally without a connection to the control plane or CDN. You can obtain the config by using the <a href="../cli/router/fetch.md">fetch-config</a> command. The file must be valid JSON. Polling is disabled once you pass a custom path.</td><td>""</td><td>false</td><td></td><td></td><td></td><td>false</td><td></td></tr><tr><td>CONFIG_PATH</td><td>The path to the router configuration.</td><td>"config.yaml"</td><td>false</td><td></td><td></td><td></td><td>false</td><td></td></tr><tr><td>REQUIRE_AUTHENTICATION</td><td>Whether to require all requests to the router to be authenticated</td><td>false</td><td>false</td><td></td><td></td><td></td><td>false</td><td></td></tr><tr><td>LOCALHOST_FALLBACK_INSIDE_DOCKER</td><td>Enable fallback for requests that fail to connect to localhost while running in Docker</td><td>true</td><td>false</td><td></td><td></td><td></td><td>false</td><td></td></tr><tr><td>ENGINE_ENABLE_REQUEST_TRACING</td><td>Enables Advanced-Request-Tracing (<a href="advanced-request-tracing-art.md">ART</a>).</td><td>true</td><td>false</td><td></td><td></td><td></td><td>false</td><td></td></tr></tbody></table>

{% hint style="info" %}
Intervals, timeouts, and delays are specified in Go [duration](https://pkg.go.dev/maze.io/x/duration#ParseDuration) syntax e.g 1s, 5m or 1h.

Sizes can be specified in 2MB, 1mib.
{% endhint %}

## Config file

Instead of using environment variables, you can also create a `config.yaml` in the working directory of the router. Here you can find all configuration options with the corresponding defaults.

<pre class="language-yaml"><code class="lang-yaml">version: "1"

# General router options
graph:
  name: "production"
  token: ""

log_level: "info"
listen_addr: "localhost:3002"
controlplane_url: "https://cosmo-cp.wundergraph.com"
playground_enabled: true
introspection_enabled: true
json_log: true
shutdown_delay: 15s
grace_period: 20s
poll_interval: 10s
health_check_path: "/health"
readiness_check_path: "/health/ready"
liveness_check_path: "/health/live"
router_config_path: ""

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
     
</code></pre>

You can also point to a custom config file by overwriting `CONFIG_PATH` environment variable.

{% hint style="warning" %}
Values specified in the config file have **precedence** over Environment variables. This also includes empty values so only specify values that should be overwritten.
{% endhint %}

### Expand environment variables

You can expand environment variables in the file like this:

```
log_level: "${LOG_LEVEL}"
```

This will replace the value of the environment variable `LOG_LEVEL` with the value of the key `log_level` in your config file. For numeric values, ensure quotes are omitted.
