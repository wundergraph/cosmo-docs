# Self-Hosted Deployment

## Metadata

| Field | Value |
|-------|-------|
| **Capability ID** | `cap-deploy-002` |
| **Category** | Deployment |
| **Status** | GA |
| **Availability** | Enterprise |
| **Related Capabilities** | `cap-deploy-001`, `cap-deploy-003`, `cap-deploy-004`, `cap-deploy-005` |

---

## Quick Reference

### Name
Self-Hosted Deployment

### Tagline
Full data sovereignty with on-premises deployment.

### Elevator Pitch
Unlike other GraphQL federation platforms, WunderGraph Cosmo can be deployed entirely self-hosted, giving you complete control over your infrastructure and full data sovereignty. Deploy to any Kubernetes service including EKS, AKS, GKE, or your own on-premises cluster using production-grade Helm charts.

---

## Problem & Solution

### The Problem
Many organizations have strict requirements around data sovereignty, compliance, and infrastructure control that prevent them from using cloud-hosted platforms. They need the benefits of a modern GraphQL federation platform while keeping all data and infrastructure within their own environment. This is especially critical for financial services, healthcare, government, and other regulated industries.

### The Solution
Cosmo provides a fully self-hosted deployment option where you manage and deploy the entire platform in your own environment. This gives you complete data sovereignty while still accessing all the features of the Cosmo Platform. Production-grade Helm charts make deployment to any Kubernetes cluster manageable and reliable.

### Before & After

| Before Cosmo Self-Hosted | With Cosmo Self-Hosted |
|-------------------------|------------------------|
| Limited to cloud-only federation platforms | Deploy federation in any environment |
| Data leaves your network | Full data sovereignty within your infrastructure |
| Dependent on vendor availability | Complete control over uptime and maintenance windows |
| Compliance blockers for regulated industries | Meet strict regulatory requirements |
| One-size-fits-all configuration | Customize infrastructure to your needs |

---

## Key Benefits

1. **Full Data Sovereignty**: All data remains within your infrastructure, meeting the strictest compliance requirements
2. **Infrastructure Control**: Deploy to your choice of Kubernetes service (EKS, AKS, GKE) or on-premises clusters
3. **Production-Grade Deployment**: Use battle-tested Helm charts for reliable, repeatable deployments
4. **Key Differentiator**: One of the few GraphQL federation platforms offering true self-hosted deployment
5. **Flexible Scaling**: Scale components independently based on your workload requirements

---

## Target Audience

### Primary Persona
- **Role**: Platform Engineer, Infrastructure Architect
- **Pain Points**: Strict compliance requirements, data sovereignty needs, vendor lock-in concerns, regulatory constraints
- **Goals**: Deploy production-grade federation while maintaining full infrastructure control

### Secondary Personas
- Security Officers ensuring compliance with data residency requirements
- CTOs at regulated enterprises (finance, healthcare, government)
- Engineering Managers seeking predictable infrastructure costs

---

## Use Cases

### Use Case 1: Financial Services Deployment
**Scenario**: A bank needs GraphQL federation but cannot send data outside their private cloud
**How it works**: Deploy the complete Cosmo stack to their private Kubernetes cluster using Helm charts, configure integration with existing authentication and monitoring systems
**Outcome**: Production GraphQL federation with all data staying within the bank's secure infrastructure

### Use Case 2: Air-Gapped Environment
**Scenario**: A government contractor needs federation in a network with no external connectivity
**How it works**: Pull container images and Helm charts, deploy to an isolated Kubernetes cluster, configure all components for internal-only operation
**Outcome**: Fully functional federation platform operating without any external dependencies

### Use Case 3: Multi-Region Private Deployment
**Scenario**: A global enterprise needs federation deployed across multiple private data centers
**How it works**: Deploy Cosmo stacks to Kubernetes clusters in each region, configure for high availability and disaster recovery
**Outcome**: Globally distributed federation with data locality maintained in each region

---

## Technical Summary

### How It Works
Cosmo's self-hosted deployment uses an umbrella Helm chart that packages all platform components. The chart includes sub-charts for Controlplane, GraphQL Metrics, OTEL Collector, Studio, Router, and CDN. Storage components (PostgreSQL, Keycloak, ClickHouse, Minio, Redis) are managed through Bitnami Helm charts. Deploy the entire stack with a single helm install command.

### Key Technical Features
- Umbrella Helm chart with modular sub-charts
- Integration with external Helm charts for storage components
- Support for any Kubernetes distribution
- Configurable for development (Minikube) through production environments
- Auto-generated configuration documentation

### Integration Points
- Kubernetes (EKS, AKS, GKE, on-premises)
- External authentication providers via Keycloak
- Existing monitoring and logging infrastructure
- CI/CD pipelines for infrastructure deployment

### Requirements & Prerequisites
- Kubernetes cluster (1.19+)
- Helm 3.x
- Sufficient cluster resources for all components
- Network connectivity between components
- Optional: External PostgreSQL, ClickHouse, Redis for production

---

## Documentation References

- Primary docs: `/docs/deployments-and-hosting/intro`
- Kubernetes deployment: `/docs/deployments-and-hosting/kubernetes`
- Helm chart guide: `/docs/deployments-and-hosting/kubernetes/helm-chart`
- GitHub repository: `https://github.com/wundergraph/cosmo/tree/main/helm/cosmo`

---

## Keywords & SEO

### Primary Keywords
- Self-hosted GraphQL federation
- On-premises federation platform
- Data sovereignty GraphQL

### Secondary Keywords
- Private cloud GraphQL
- Enterprise federation deployment
- Air-gapped GraphQL platform

### Related Search Terms
- Apollo GraphOS alternative self-hosted
- Deploy federation on-premises
- GraphQL federation Kubernetes
