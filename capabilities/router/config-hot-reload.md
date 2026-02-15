# Config Hot Reload

## Metadata

| Field | Value |
|-------|-------|
| **Capability ID** | `cap-router-005` |
| **Category** | Router |
| **Status** | GA |
| **Availability** | Free |
| **Related Capabilities** | `cap-router-001`, `cap-router-004` |

---

## Quick Reference

### Name
Config Hot Reload

### Tagline
Update router configuration at runtime without downtime.

### Elevator Pitch
Cosmo Router supports hot-reloading of configuration changes without service interruption. Whether updating from the CDN after schema publishes or watching local configuration files, the router gracefully transitions traffic while maintaining active connections. Zero-downtime deployments become seamless with automatic configuration polling and graceful shutdown handling.

---

## Problem & Solution

### The Problem
Traditional configuration changes require service restarts, causing connection drops and potential downtime. In high-traffic environments, coordinating configuration rollouts across router fleets is complex. Teams need to update schemas, routing rules, and other configuration without impacting users or triggering Kubernetes pod restarts.

### The Solution
Cosmo Router automatically polls the CDN for configuration updates (default: every 15 seconds) and gracefully transitions to new configurations. During transitions, both old and new graph instances run simultaneously, ensuring no requests are dropped. Local configuration files can also be watched for changes, and the router responds to SIGHUP signals for on-demand reloads.

### Before & After

| Before Cosmo | With Cosmo |
|--------------|------------|
| Restart required for config changes | Hot-reload without process restart |
| Connection drops during updates | Graceful transition maintains connections |
| Manual coordination of rollouts | Automatic CDN polling across fleet |
| Downtime during schema updates | Zero-downtime configuration updates |

---

## Key Benefits

1. **Zero-Downtime Updates**: Configuration changes apply without dropping active connections or interrupting service
2. **Graceful Transitions**: Both old and new configurations run simultaneously during the transition period
3. **Automatic CDN Polling**: Schema updates published through the CLI automatically propagate to all routers
4. **File-Based Hot Reload**: Local configuration file changes trigger automatic reloads for development workflows
5. **Signal-Based Control**: Send SIGHUP to trigger immediate reload when needed

---

## Target Audience

### Primary Persona
- **Role**: Platform Engineer / SRE
- **Pain Points**: Coordinating configuration updates across router fleets; avoiding downtime during schema changes; managing graceful deployments
- **Goals**: Achieve zero-downtime deployments; automate configuration propagation; maintain service reliability

### Secondary Personas
- DevOps engineers managing production deployments
- Backend developers iterating on local configurations
- Release engineers coordinating schema rollouts

---

## Use Cases

### Use Case 1: Zero-Downtime Schema Updates
**Scenario**: A team publishes a new subgraph schema and needs it to propagate to all production routers without downtime
**How it works**: Publish the schema using the CLI; the CDN is updated; routers detect the change on their next poll interval; each router creates a new graph instance, runs both simultaneously, then gracefully retires the old instance
**Outcome**: New schema is live across all routers with zero dropped requests

### Use Case 2: Development Configuration Iteration
**Scenario**: A developer is iterating on router configuration locally and wants changes to apply immediately
**How it works**: Enable `watch_config` with an appropriate interval; save configuration changes; the router detects the file modification and reloads automatically
**Outcome**: Rapid configuration iteration without manual restarts

### Use Case 3: Emergency Configuration Rollout
**Scenario**: An urgent configuration change needs to be applied immediately, not waiting for the next poll interval
**How it works**: Update the configuration file and send `kill -HUP <pid>` to the router process; the router immediately processes the change and reloads
**Outcome**: Immediate configuration update on demand

---

## Technical Summary

### How It Works
The router polls the CDN for configuration updates at configurable intervals (default: 15 seconds with jitter). When a change is detected, it creates a new graph instance with an optimized query planner. Both instances run simultaneously during the grace period, allowing in-flight requests to complete on the old instance while new requests go to the new one. After the grace period, the old instance is cleaned up.

### Key Technical Features
- Automatic CDN polling with configurable interval and jitter
- File-based execution config watching with `watch: true`
- SIGHUP signal handling for on-demand reloads
- Configurable grace period for resource cleanup (default: 30s)
- Configurable shutdown delay for server resources (default: 60s)
- Startup delay option to prevent thundering herd in clusters

### Configuration Options
```yaml
# CDN polling
poll_interval: 10s
poll_jitter: 5s
grace_period: 30s
shutdown_delay: 60s

# File-based execution config watching
execution_config:
  file:
    path: "execution-config.json"
    watch: true
    watch_interval: "5s"

# Configuration file watching
watch_config:
  enabled: true
  interval: "10s"
  startup_delay:
    enabled: false
    maximum: "10s"
```

### Integration Points
- Cosmo CDN for configuration distribution
- File system for local configuration watching
- POSIX signals (SIGHUP) for manual triggers
- Kubernetes liveness/readiness probes

### Requirements & Prerequisites
- Network access to CDN for automatic updates
- Appropriate grace period and shutdown delay settings
- Sufficient memory for running dual graph instances during transitions

### Limitations
- WebSocket and SSE connections close when the old instance shuts down (clients must reconnect)
- Query planner cache is invalidated on configuration swap (temporary latency increase)
- Changes to `watch_config` section are not themselves hot-reloaded
- Environment variable and flag changes require full restart

---

## Documentation References

- Primary docs: `/docs/router/deployment/config-hot-reload`
- Configuration reference: `/docs/router/configuration`
- Development overview: `/docs/router/development`

---

## Keywords & SEO

### Primary Keywords
- Hot Reload Configuration
- Zero-Downtime Deployment
- Runtime Configuration Update

### Secondary Keywords
- Graceful Configuration Reload
- Live Configuration Update
- Config Hot Swap

### Related Search Terms
- GraphQL router hot reload
- Update router without restart
- Zero downtime schema update
- Graceful configuration change
