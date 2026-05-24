# Cosmo Cloud

## Metadata

| Field | Value |
|-------|-------|
| **Capability ID** | `cap-deploy-001` |
| **Category** | Deployment |
| **Status** | GA |
| **Availability** | Free / Pro / Enterprise |
| **Related Capabilities** | `cap-deploy-002`, `cap-deploy-008` |

---

## Quick Reference

### Name
Cosmo Cloud

### Tagline
Fully managed GraphQL federation platform.

### Elevator Pitch
Cosmo Cloud is a fully managed SaaS platform that handles all critical components of the Cosmo Platform, eliminating infrastructure worries so you can focus on building. With a generous free tier of 10 million monthly requests and options for Hybrid SaaS and On-Premises deployments, it scales with your needs.

---

## Problem & Solution

### The Problem
Managing a GraphQL federation platform requires significant operational expertise, infrastructure investment, and ongoing maintenance. Teams spend valuable engineering time on infrastructure management instead of building features. Scaling, security updates, high availability, and compliance requirements add complexity that distracts from core business activities.

### The Solution
Cosmo Cloud provides a fully managed service that operates all critical components of the Cosmo Platform. You only need to run your routers while WunderGraph handles the control plane, studio, CDN, and all supporting infrastructure. This allows teams to concentrate on building their GraphQL APIs without infrastructure overhead.

### Before & After

| Before Cosmo Cloud | With Cosmo Cloud |
|-------------------|------------------|
| Deploy and manage control plane, databases, CDN | Managed infrastructure handled by WunderGraph |
| Configure high availability and disaster recovery | Built-in reliability and redundancy |
| Handle security patches and upgrades | Automatic platform updates |
| Scale infrastructure manually | Auto-scaling based on demand |
| Dedicated DevOps resources for maintenance | Focus entirely on API development |

---

## Key Benefits

1. **Zero Infrastructure Management**: All critical platform components are managed for you, eliminating operational overhead
2. **Generous Free Tier**: Start with 10 million monthly requests at no cost, making it accessible for teams of all sizes
3. **Enterprise-Ready Options**: Custom plans available for Hybrid SaaS, On-Premises deployments, and extended data retention
4. **Compliance Support**: Options for strict compliance requirements and data sovereignty needs
5. **Focus on Building**: Redirect engineering resources from infrastructure to feature development

---

## Target Audience

### Primary Persona
- **Role**: Platform Engineer, Engineering Manager
- **Pain Points**: Limited DevOps resources, need to move fast without infrastructure complexity, compliance requirements
- **Goals**: Ship GraphQL APIs quickly, minimize operational burden, ensure platform reliability

### Secondary Personas
- API Developers who want to focus on schema design and resolver implementation
- Startup CTOs who need enterprise-grade infrastructure without dedicated ops teams
- Enterprise architects evaluating managed vs. self-hosted federation solutions

---

## Use Cases

### Use Case 1: Startup Rapid Development
**Scenario**: A startup wants to adopt GraphQL federation but lacks dedicated DevOps resources
**How it works**: Sign up for Cosmo Cloud, create federated graphs through the Studio interface, deploy subgraphs, and let WunderGraph handle all infrastructure
**Outcome**: Production-ready GraphQL federation in days instead of weeks, with room to grow within the free tier

### Use Case 2: Enterprise Compliance Deployment
**Scenario**: An enterprise needs GraphQL federation with strict data retention and compliance requirements
**How it works**: Contact WunderGraph for a custom enterprise plan with extended data retention, dedicated support, and compliance certifications
**Outcome**: Enterprise-grade federation platform that meets regulatory requirements without in-house infrastructure investment

### Use Case 3: Hybrid SaaS Architecture
**Scenario**: A company wants managed control plane benefits but needs to run routers in their own environment for data locality
**How it works**: Use Cosmo Cloud for the control plane and studio while deploying routers in your own infrastructure (AWS, GCP, Azure, on-premises)
**Outcome**: Best of both worlds with managed platform operations and data control in your environment

---

## Technical Summary

### How It Works
Cosmo Cloud provides a hosted control plane that manages your federated graph configurations, schema registry, and composition. The Studio interface enables graph management, monitoring, and analytics. You deploy routers in your preferred environment that connect to Cosmo Cloud to fetch configurations and report telemetry.

### Key Technical Features
- Hosted control plane with Platform API and Node API
- Web-based Studio for management and monitoring
- CDN-backed configuration distribution
- Integrated schema registry and composition
- Real-time analytics and observability

### Integration Points
- Router deployment in any environment (cloud, on-premises, edge)
- CI/CD integration via CLI (wgc) and Terraform provider
- OpenTelemetry-compatible observability

### Requirements & Prerequisites
- Account on cosmo.wundergraph.com
- Router deployed in your environment
- Network connectivity between router and Cosmo Cloud

---

## Documentation References

- Primary docs: `/docs/deployments-and-hosting/cosmo-cloud`
- Getting started: `/docs/getting-started`
- Router configuration: `/docs/router/configuration`

---

## Keywords & SEO

### Primary Keywords
- Managed GraphQL federation
- GraphQL platform as a service
- Hosted federation control plane

### Secondary Keywords
- GraphQL SaaS
- Managed API gateway
- Federation hosting

### Related Search Terms
- Apollo GraphOS alternative
- Managed supergraph platform
- GraphQL federation hosting
