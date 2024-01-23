---
description: Learn how to deploy and start the Router in Production.
---

# Deployment

## Run the Router

The router is a Go application provided as a self-contained Docker container. You can initiate the router by executing a single Docker command:

```bash
docker run \
    --name cosmo-router \
    -e FEDERATED_GRAPH_NAME=<federated_graph_name> \
    -e GRAPH_API_TOKEN=<router_api_token> \
    -e LISTEN_ADDR=0.0.0.0:3002 \
    --platform=linux/amd64 \
    -p 3002:3002 \
    ghcr.io/wundergraph/cosmo/router:latest
```

{% hint style="info" %}
_`--platform=linux/amd64`_ is required because we don't provide ARM images yet.
{% endhint %}

You can generate a token with the [`wgc router token create`](../cli/router/token/create.md) CLI command.

## Health checks

By default, the health check endpoint is exposed at the path `/health`. The health check reports if the router is alive.&#x20;

### Kubernetes

If you are on Kubernetes you can make use of our liveness and readiness checks. For convenience, we export both on `/health/live` and `/health/ready`:

```yaml
containers:
  - name: router
    livenessProbe:
      httpGet:
        path: "/health/live"
        port: 3002
    readinessProbe:
      httpGet:
        path: "/health/ready"
        port: 3002
```

The liveness route returns `200` when the router is up. The readiness handler returns `200` only when the router is ready to serve requests.

#### Graceful shutdown

Before a Pod is terminated, a _SIGTERM_ signal is sent to the Pod. Afterward, the Pod has 30 seconds to terminate itself (see [terminationGracePeriodSeconds](https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/#pod-termination)). Ensure that the router-specific timeouts are set below this threshold or increase the termination period appropriately.&#x20;

For example, the following configuration was tested and could serve as a good starting point:

**Router**

* `GRACE_PERIOD_SECONDS=20`
* `SHUTDOWN_DELAY_SECONDS=30`

**`Pod`**

* `terminationGracePeriodSeconds=60`

With that configuration, your router has 30 seconds to respond to all active connections before forcefully shutting down the server. Kubernetes will not terminate the container until the termination period of 60 seconds is over. Because the readiness endpoint no longer responds  `200` and the container is in`TERMINATION` state any new traffic from being redirected to the instance is prevented.

`GRACE_PERIOD_SECONDS` becomes interesting when the router updates its schema. This is also the time the server has to gracefully shut down old clients before the switch is enforced.

{% hint style="info" %}
For more information, we recommend the [Kubernetes Best Practice Terminating With Grace](https://cloud.google.com/blog/products/containers-kubernetes/kubernetes-best-practices-terminating-with-grace) article.
{% endhint %}

## Kubernetes & Container environments

To make the application reachable within the container network, you need to expose the router on `0.0.0.0` e.g `LISTEN_ADDR=0.0.0.0:3002.` This is also required when trying to access Prometheus metrics from outside the docker network. Use `PROMETHEUS_LISTEN_ADDR="0.0.0.0:8088"` to make the endpoint accessible.

## Logging

Structured logging, also known as JSON logging, is enabled by default and can be controlled using the `JSON_LOG` environment variable. For development, we recommend setting this off because the logs are more friendly rendered.

## Observability & Operations

The router exposes useful metrics about the process and memory. All metrics can be scraped from the Prometheus metrics endpoint. For more information please visit the dedicated [Metrics](metrics-and-monitoring.md) section.

### Tracing Sampling Rate

In scenarios with low traffic, a sampling rate of 1 (100%) is acceptable. However, for high-volume situations, we strongly recommend using a lower sampling rate. For instance, in a project experiencing 60 requests per second, a sampling rate of 0.1 (10% 6 req/s) is sufficient to generate valuable insights. If you export to Cosmo Cloud, we will enforce a sampling rate based on your subscription. If your configured rate is higher than your account limit a warning is printed. Please upgrade your plan or contact us for custom limits.

{% hint style="warning" %}
Ensure that your subgraphs use parent-based sampling to inherit the sampling rate. For more information see [OTEL instrumentation on Subgraphs](../tutorial/otel-instrumentation-on-subgraphs.md).
{% endhint %}

## Configuration recommendations

[Advanced Request Tracing](advanced-request-tracing-art.md)[ (ART)](advanced-request-tracing-art.md) is enabled by default; however, it will only be accessible if you have set `DEV_MODE=true` or `GRAPH_API_TOKEN`. In the latter case, we will exchange a public key from the control plane to ensure that only authorized requests from the Studio can access ART requests. This enables safe debugging of your router in production.

Therefore `DEV_MODE=true` should **NOT** be set when deploying your router to production.

## Recommended resources

The specific resource recommendations depend on your constraints, but we have observed that low to medium-traffic projects benefit from the following setup:

* 3 instances for high availability.
* Each instance is equipped with 2 CPUs and 1GB of RAM.
