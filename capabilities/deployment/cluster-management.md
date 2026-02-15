# Cluster Management

## Metadata

| Field | Value |
|-------|-------|
| **Capability ID** | `cap-deploy-008` |
| **Category** | Deployment |
| **Status** | GA |
| **Availability** | Pro / Enterprise |
| **Related Capabilities** | `cap-deploy-001`, `cap-deploy-007` |

---

## Quick Reference

### Name
Router Cluster Management

### Tagline
Monitor and track all running routers from Studio.

### Elevator Pitch
Router Cluster Management provides centralized visibility into all your running router instances through Cosmo Studio. Monitor vital metrics like CPU and memory utilization, verify deployed graph compositions, and track router versions and uptime across your entire fleet. Automated OpenTelemetry instrumentation means zero additional setup.

---

## Problem & Solution

### The Problem
Operating a fleet of GraphQL routers across multiple environments makes it difficult to maintain visibility into overall health. Teams struggle to answer basic questions: How many routers are running? What versions are deployed? Which composition is active? Are there any resource issues? Without centralized visibility, operational issues go undetected.

### The Solution
Cosmo Studio's Cluster Management dashboard automatically displays all running router instances using data from built-in OpenTelemetry instrumentation. View real-time health status, resource utilization, deployed versions, and graph compositions from a single interface. Group routers by logical clusters and drill into individual instance details.

### Before & After

| Before Cluster Management | With Cluster Management |
|--------------------------|------------------------|
| Manual tracking of router instances | Automatic discovery and display |
| Scattered monitoring across tools | Centralized dashboard in Studio |
| Unknown deployment versions | Clear version visibility per instance |
| Resource issues discovered late | Real-time CPU/memory monitoring |
| No composition verification | Confirm deployed graph composition |

---

## Key Benefits

1. **Automatic Discovery**: Routers automatically appear in the dashboard through OpenTelemetry instrumentation
2. **Real-Time Vitals**: Monitor CPU and memory utilization with trend indicators
3. **Version Visibility**: See deployed router versions across your entire fleet
4. **Composition Verification**: Confirm which graph composition each router is running
5. **Logical Clustering**: Group routers by cluster name for organized fleet management

---

## Target Audience

### Primary Persona
- **Role**: SRE, Platform Engineer, Operations Engineer
- **Pain Points**: Lack of visibility into router fleet, difficulty tracking deployments, manual inventory management
- **Goals**: Centralized operational view, proactive issue detection, deployment verification

### Secondary Personas
- Engineering Managers needing deployment status for planning
- Security Engineers auditing deployed versions
- DevOps Engineers verifying rollouts

---

## Use Cases

### Use Case 1: Deployment Verification
**Scenario**: Verify that a new router version has rolled out across all production instances
**How it works**: Open Cluster Management dashboard, filter by production cluster, confirm all instances show new version
**Outcome**: Confident verification that deployment completed successfully

### Use Case 2: Resource Issue Detection
**Scenario**: Proactively identify routers experiencing resource pressure
**How it works**: Monitor dashboard for high CPU/memory utilization, observe trend arrows, investigate affected instances
**Outcome**: Early detection and resolution of resource issues before they impact users

### Use Case 3: Multi-Cluster Fleet Overview
**Scenario**: Operations team needs visibility across dev, staging, and production routers
**How it works**: Configure routers with appropriate CLUSTER_NAME, view all clusters in dashboard, drill into specific clusters
**Outcome**: Unified operational view across all environments from single interface

---

## Technical Summary

### How It Works
Routers with version 0.66.1+ automatically send periodic telemetry data to Cosmo Cloud via OpenTelemetry instrumentation. This data includes uptime, resource utilization, version information, and deployment details. Cosmo Studio aggregates this data to display all running instances. Instances that don't report within 45 seconds are considered offline.

### Key Technical Features
- Automatic OpenTelemetry-based data collection
- Service name configuration via `TELEMETRY_SERVICE_NAME`
- Instance ID configuration via `INSTANCE_ID` environment variable
- Cluster grouping via `CLUSTER_NAME` environment variable
- CPU and memory utilization with trend indicators
- Uptime tracking (process and graph composition)
- Online/offline status detection (45-second threshold)

### Integration Points
- OpenTelemetry (automatic instrumentation)
- Cosmo Studio dashboard
- Environment variable configuration

### Requirements & Prerequisites
- Router version 0.66.1 or later
- Network connectivity from router to Cosmo Cloud
- Optional: Environment variables for service name, instance ID, and cluster name

---

## Documentation References

- Primary docs: `/docs/studio/cluster-management`
- Router configuration: `/docs/router/configuration`
- OpenTelemetry setup: `/docs/router/observability`

---

## Keywords & SEO

### Primary Keywords
- Router cluster management
- GraphQL fleet monitoring
- Router health monitoring

### Secondary Keywords
- Federation fleet management
- Router instance tracking
- Cosmo Studio monitoring

### Related Search Terms
- Monitor GraphQL routers
- Router fleet visibility
- Track router deployments
