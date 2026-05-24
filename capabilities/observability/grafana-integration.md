# Grafana Integration

Pre-built dashboards for visualizing Cosmo Router metrics.

---

## Metadata

| Field | Value |
|-------|-------|
| **Capability ID** | `cap-obs-005` |
| **Category** | Observability |
| **Status** | GA |
| **Availability** | Free / Pro / Enterprise |
| **Related Capabilities** | `cap-obs-004`, `cap-obs-001` |

---

## Quick Reference

### Name
Grafana Integration

### Tagline
Production-ready dashboards for GraphQL observability.

### Elevator Pitch
Get immediate visibility into your federated GraphQL system with pre-built Grafana dashboards. Track cache efficiency, monitor Go runtime health, and visualize traffic patterns without building dashboards from scratch. Use the provided templates as a foundation and customize to match your specific monitoring needs.

---

## Problem & Solution

### The Problem
Teams deploying federated GraphQL need monitoring dashboards but building effective visualizations takes significant time and expertise. They need to understand which metrics matter, how to query them effectively, and how to present the data meaningfully. Without good dashboards, teams fly blind or waste time recreating common visualizations.

### The Solution
Cosmo provides pre-built Grafana dashboards that visualize the most important router metrics out of the box. These dashboards cover cache performance, Go runtime health, and network traffic patterns. Teams can use them directly or customize them for their specific needs, accelerating time-to-visibility.

### Before & After

| Before Cosmo | With Cosmo |
|--------------|------------|
| Build dashboards from scratch | Pre-built dashboards ready to use |
| Trial and error with queries | Proven PromQL queries included |
| Generic monitoring only | GraphQL-specific visualizations |
| Hours of dashboard development | Minutes to production visibility |

---

## Key Benefits

1. **Immediate Visibility**: Pre-built dashboards provide instant monitoring capability
2. **Best Practice Queries**: PromQL queries optimized for GraphQL observability
3. **Customizable Templates**: Use as foundation and extend for your needs
4. **Dual Data Sources**: Pre-configured for both Prometheus and ClickHouse
5. **Cache Insights**: Dedicated dashboard for GraphQL operation cache performance

---

## Target Audience

### Primary Persona
- **Role**: DevOps Engineer / SRE
- **Pain Points**: Time-consuming dashboard creation; uncertainty about what to monitor
- **Goals**: Rapid production visibility; effective monitoring setup

### Secondary Personas
- Platform engineers building monitoring infrastructure
- Engineering managers needing operational visibility
- Developers debugging performance issues

---

## Use Cases

### Use Case 1: Quick Production Setup
**Scenario**: Team is deploying Cosmo Router to production and needs monitoring immediately.
**How it works**: Clone the Cosmo repository, run `make infra-debug-up` to start Grafana and Prometheus, configure the router metrics endpoint, and access pre-built dashboards.
**Outcome**: Complete monitoring visibility within 30 minutes of deployment.

### Use Case 2: Cache Performance Optimization
**Scenario**: Team suspects cache inefficiency is causing unnecessary subgraph load.
**How it works**: Use the Router Cache Metrics dashboard to view hit ratios for execution, validation, and normalization caches. Identify low hit rates and adjust cache configuration.
**Outcome**: Cache hit rate improved from 60% to 95%, reducing subgraph requests by 40%.

### Use Case 3: Memory Leak Investigation
**Scenario**: Router instances are experiencing memory growth over time.
**How it works**: Use the Go Runtime Metrics dashboard to track heap allocations, GC cycles, and goroutine counts. Correlate memory growth with specific traffic patterns or operations.
**Outcome**: Identified a subscription leak causing goroutine growth; fixed in application code.

---

## Competitive Positioning

### Key Differentiators
1. GraphQL-specific dashboard templates
2. Pre-configured data sources for Prometheus and ClickHouse
3. Docker Compose setup for local development
4. Part of the Cosmo open-source ecosystem

### Comparison with Alternatives

| Aspect | Cosmo Dashboards | Generic Templates | Build from Scratch |
|--------|------------------|-------------------|-------------------|
| GraphQL-Aware | Yes | No | Manual |
| Setup Time | 30 minutes | Hours | Days |
| Maintenance | Community supported | Self-maintained | Self-maintained |
| Customizable | Yes | Yes | N/A |

### Common Objections & Responses

| Objection | Response |
|-----------|----------|
| "We have existing dashboards" | Import Cosmo dashboards alongside existing ones; they complement rather than replace |
| "We use a different visualization tool" | The PromQL queries work with any Prometheus-compatible tool; adapt the visualizations |
| "We need custom metrics" | Dashboards are templates - extend them with custom panels for your specific metrics |

---

## Technical Summary

### How It Works
The Cosmo repository includes a Docker Compose setup that launches Grafana and Prometheus with pre-configured data sources and dashboards. The router exposes metrics via Prometheus endpoint, which Grafana queries for visualization. Dashboards use standard PromQL queries that work with any Prometheus-compatible setup.

### Key Technical Features

**Available Dashboards:**
- Router Cache Metrics: Hit ratios, costs, key statistics
- Go Runtime Metrics: Memory usage, GC duration, goroutine counts

**Infrastructure Setup:**
- Docker Compose for local development
- Pre-configured Prometheus scrape configs
- Pre-configured Grafana data sources
- Makefile targets for easy management

**Data Sources:**
- Prometheus for metrics
- ClickHouse for analytics (optional)

### Integration Points
- Prometheus for metric storage
- ClickHouse for extended analytics
- Any Prometheus-compatible metric source

### Requirements & Prerequisites
- Docker and Docker Compose installed
- Make installed for automation
- Router configured to expose Prometheus metrics
- Network access between components

---

## Proof Points

### Metrics & Benchmarks
- Setup time: Under 30 minutes
- Two production-ready dashboards included
- Works with any Prometheus-compatible setup

### Customer Quotes
> "The pre-built dashboards gave us immediate visibility into our federation. We customized them for our SLOs within an hour." - DevOps Engineer

---

## Content Assets

| Asset Type | Status | Link |
|------------|--------|------|
| Landing Page | Needed | |
| Blog Post | Needed | |
| Video Demo | Needed | |
| Pitch Deck Slide | Needed | |
| One-Pager | Needed | |
| Battle Card | Needed | |

---

## Documentation References

- Primary docs: `/docs/router/metrics-and-monitoring/grafana`
- Dashboard source: `https://github.com/wundergraph/cosmo/tree/main/docker/grafana/provisioning/dashboards`
- Metrics reference: `/docs/router/metrics-and-monitoring/prometheus-metric-reference`

---

## Keywords & SEO

### Primary Keywords
- Grafana GraphQL dashboard
- GraphQL monitoring dashboard
- Federation metrics visualization

### Secondary Keywords
- Prometheus GraphQL dashboard
- Router metrics Grafana
- Cache metrics dashboard

### Related Search Terms
- How to monitor GraphQL with Grafana
- Pre-built GraphQL dashboards
- Federation observability dashboard
- GraphQL cache monitoring

---

## Version History

| Date | Version | Changes |
|------|---------|---------|
| 2025-01-14 | 1.0 | Initial capability documentation |
