# Kubernetes (Helm)

## Metadata

| Field | Value |
|-------|-------|
| **Capability ID** | `cap-deploy-003` |
| **Category** | Deployment |
| **Status** | GA |
| **Availability** | Free / Pro / Enterprise |
| **Related Capabilities** | `cap-deploy-002`, `cap-deploy-004`, `cap-deploy-005` |

---

## Quick Reference

### Name
Kubernetes (Helm)

### Tagline
Production-grade Helm charts for any Kubernetes cluster.

### Elevator Pitch
Deploy the complete Cosmo Platform to any Kubernetes service using production-ready Helm charts. Whether you're using EKS, AKS, GKE, or an on-premises cluster, the Cosmo Helm chart packages everything you need for a reliable, maintainable, and scalable federation deployment.

---

## Problem & Solution

### The Problem
Deploying a complex platform like GraphQL federation to Kubernetes requires careful orchestration of multiple services, databases, and configurations. Creating and maintaining custom Kubernetes manifests is time-consuming, error-prone, and difficult to keep consistent across environments. Teams need a battle-tested deployment method that works across different Kubernetes providers.

### The Solution
Cosmo provides a production-grade Helm chart that packages the entire platform as a collection of well-configured sub-charts. Deploy locally with Minikube for development or to any cloud Kubernetes service for production. Auto-generated documentation ensures you always have accurate configuration options, and the modular architecture lets you customize each component.

### Before & After

| Before Cosmo Helm Chart | With Cosmo Helm Chart |
|------------------------|----------------------|
| Write custom Kubernetes manifests | Single helm install command |
| Manual configuration of each component | Pre-configured defaults with overrides |
| Inconsistent deployments across environments | Reproducible deployments everywhere |
| Difficult upgrades and rollbacks | Helm-managed version control |
| Undocumented configuration options | Auto-generated configuration docs |

---

## Key Benefits

1. **Universal Kubernetes Support**: Deploy to EKS, AKS, GKE, or any Kubernetes cluster including Minikube
2. **Production-Ready**: Battle-tested chart structure with sensible defaults for production workloads
3. **Modular Architecture**: Six sub-charts (Controlplane, GraphQL Metrics, OTEL Collector, Studio, Router, CDN) can be configured independently
4. **Integrated Storage**: Pre-configured integration with Bitnami charts for PostgreSQL, Keycloak, ClickHouse, Minio, and Redis
5. **Auto-Generated Documentation**: Configuration options are documented automatically with every update

---

## Target Audience

### Primary Persona
- **Role**: Platform Engineer, DevOps Engineer, SRE
- **Pain Points**: Complex multi-service deployments, configuration drift, maintaining consistency across environments
- **Goals**: Reliable, repeatable deployments with minimal operational overhead

### Secondary Personas
- Developers needing local federation environments for testing
- Infrastructure architects designing enterprise deployment strategies
- CI/CD engineers automating deployment pipelines

---

## Use Cases

### Use Case 1: Production EKS Deployment
**Scenario**: Deploy Cosmo to Amazon EKS for a production environment
**How it works**: Configure the Helm chart values for production (external databases, TLS, resource limits), run `helm install` against your EKS cluster
**Outcome**: Production-ready federation platform running on managed Kubernetes with high availability

### Use Case 2: Local Development Environment
**Scenario**: Developers need a local federation environment matching production
**How it works**: Start Minikube, deploy Cosmo using the Helm chart with development-focused values
**Outcome**: Full federation platform running locally for rapid development and testing

### Use Case 3: Multi-Environment CI Pipeline
**Scenario**: Deploy consistently across dev, staging, and production
**How it works**: Maintain environment-specific values files, use Helm in CI/CD pipeline to deploy to each environment
**Outcome**: Identical deployment process across all environments with environment-specific configurations

---

## Technical Summary

### How It Works
The Cosmo Helm chart is an umbrella chart containing six sub-charts for each platform component. Storage components are integrated through external Bitnami Helm charts. Run `helm install` with your customized values file to deploy the entire stack. Each sub-chart can be independently configured or disabled if using external services.

### Key Technical Features
- Umbrella chart architecture with independent sub-charts
- Controlplane, GraphQL Metrics, OTEL Collector, Studio, Router, CDN components
- Bitnami integration for PostgreSQL, Keycloak, ClickHouse, Minio, Redis
- Values files for different environments
- Helm lifecycle hooks for migrations

### Integration Points
- Amazon EKS, Azure AKS, Google GKE
- Minikube for local development
- External databases and storage services
- Ingress controllers and load balancers
- CI/CD systems (GitHub Actions, GitLab CI, Jenkins)

### Requirements & Prerequisites
- Kubernetes cluster (1.19+)
- Helm 3.x installed
- kubectl configured for your cluster
- Sufficient cluster resources (varies by component configuration)
- Optional: External storage services for production

---

## Documentation References

- Primary docs: `/docs/deployments-and-hosting/kubernetes`
- Helm chart overview: `/docs/deployments-and-hosting/kubernetes/helm-chart`
- Local development: `https://github.com/wundergraph/cosmo/blob/main/helm/README.md`
- Chart documentation: `https://github.com/wundergraph/cosmo/blob/main/helm/cosmo/README.md`
- Sub-charts: `https://github.com/wundergraph/cosmo/tree/main/helm/cosmo/charts`

---

## Keywords & SEO

### Primary Keywords
- Cosmo Helm chart
- GraphQL federation Kubernetes
- Kubernetes federation deployment

### Secondary Keywords
- Helm chart federation
- EKS GraphQL deployment
- AKS federation platform

### Related Search Terms
- Deploy GraphQL federation to Kubernetes
- Helm chart GraphQL gateway
- Production Kubernetes GraphQL
