---
icon: fire
---

# Cache Warmer

The Cache Warmer is an optimization feature designed to enhance GraphQL Federation performance by precomputing query plans and storing them in the cache. This proactive caching mechanism reduces latency spikes caused by cold starts and ensures that high-traffic applications can handle demand surges without performance degradation.

Cache warming is particularly beneficial in scenarios such as e-commerce flash sales, live broadcasts, and major marketing events, where even minor delays can impact user experience and revenue.

## How Cache Warming Works

Cache warming operates by:

1. **Identifying Slow Queries**: Telemetry data is used to detect high-latency operations that could cause performance bottlenecks. The system prioritizes queries based on **P90 latency measurements**, ensuring that the slowest queries are targeted for warming.
2. **Building a Manifest**: The system prioritizes the slowest queries and compiles them into a manifest for caching. This manifest is stored in the CDN and fetched whenever the router needs it.
3. **Precomputing Query Plans**: The cache warmer precomputes and stores query plans in the router, ensuring immediate availability during peak traffic periods. This precomputing occurs at the **start of the router**, as well as whenever the router restarts due to a configuration update triggered by a subgraph publish.

## Configuration & Customization

### Enabling Cache Warming

* The feature is available to **enterprise customers** via the Cosmo interface.
* Organizations can **activate it at the namespace level** to target specific workloads.

<figure><img src="../.gitbook/assets/Screenshot 2025-02-07 at 9.48.30 PM.png" alt=""><figcaption></figcaption></figure>

### Router Configuration

To enable the cache warmer in the router, add the following configuration to your router configuration file:

```yaml
cache_warmup:
  enabled: true

telemetry: 
  metrics: 
    attributes:
      - key: "wg.operation.hash"
        value_from: 
          context_field: operation_hash
```

For detailed information on the configuration, click [here](../router/configuration/#cache-warmer).

### Customization Options

**Manually Prioritized Operations**

Customers can add operations to the cache manually, ensuring critical queries are always warmed. It can be added using wgc.

```
wgc router cache push <graph_name> -n <namesapce_name> -f <path_to_file>
```

For detailed information on this command, click [here](../cli/router/cache/push.md).

#### **Manual Recompute from Studio**&#x20;

Users can manually recompute slow queries from the Cosmo Studio. Currently, recomputation only occurs when a manual operation is added or when the subgraph is published.

<figure><img src="../.gitbook/assets/Screenshot 2025-02-07 at 10.01.05 PM.png" alt=""><figcaption></figcaption></figure>

