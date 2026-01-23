# Terraform

## Metadata

| Field | Value |
|-------|-------|
| **Capability ID** | `cap-deploy-004` |
| **Category** | Deployment |
| **Status** | GA |
| **Availability** | Free / Pro / Enterprise |
| **Related Capabilities** | `cap-deploy-001`, `cap-deploy-003`, `cap-deploy-005` |

---

## Quick Reference

### Name
Terraform Provider for Cosmo

### Tagline
Infrastructure as Code for GraphQL federation.

### Elevator Pitch
Manage your Cosmo Cloud resources programmatically using Terraform. Define your GraphQL infrastructure as code, track changes in version control, automate provisioning, and ensure consistent deployments across environments. The official Cosmo Terraform provider supports namespaces, federated graphs, subgraphs, feature flags, contracts, and more.

---

## Problem & Solution

### The Problem
Managing GraphQL federation resources manually through UIs or CLI commands leads to configuration drift, inconsistent environments, and difficulty tracking changes. Teams need to reproduce environments reliably, preview changes before applying them, and collaborate on infrastructure updates. Manual processes don't scale and create operational risk.

### The Solution
The Cosmo Terraform provider brings Infrastructure as Code practices to GraphQL federation. Define your federated graphs, subgraphs, feature flags, and contracts in declarative configuration files. Version control your infrastructure, preview changes with `terraform plan`, and apply them consistently across environments with `terraform apply`.

### Before & After

| Before Terraform | With Terraform |
|-----------------|----------------|
| Manual CLI or UI configuration | Declarative configuration files |
| Configuration drift between environments | Identical infrastructure everywhere |
| No change tracking | Full version control history |
| Risky blind deployments | Preview changes before applying |
| Solo infrastructure management | Team collaboration on infra code |

---

## Key Benefits

1. **Infrastructure as Code**: Define your entire Cosmo infrastructure in declarative, version-controlled configuration files
2. **State Management**: Terraform tracks the state of your resources, detecting drift and ensuring consistency
3. **Change Preview**: Use `terraform plan` to see exactly what changes will be applied before execution
4. **Multi-Environment Support**: Easily manage dev, staging, and production with environment-specific configurations
5. **Automation Ready**: Integrate with CI/CD pipelines for fully automated infrastructure management

---

## Target Audience

### Primary Persona
- **Role**: Platform Engineer, DevOps Engineer, Infrastructure Engineer
- **Pain Points**: Manual resource management, environment inconsistency, lack of change tracking, deployment risk
- **Goals**: Automated, reproducible infrastructure with full visibility into changes

### Secondary Personas
- Engineering Managers wanting governance over infrastructure changes
- SREs implementing GitOps workflows
- Developers needing consistent local and cloud environments

---

## Use Cases

### Use Case 1: GitOps Federation Management
**Scenario**: Implement GitOps workflow for federation infrastructure
**How it works**: Store Terraform configurations in Git, use pull requests for changes, run `terraform plan` in CI for review, apply on merge
**Outcome**: All infrastructure changes reviewed, approved, and tracked with full audit history

### Use Case 2: Multi-Environment Provisioning
**Scenario**: Maintain identical federated graphs across dev, staging, and production
**How it works**: Define base configuration with environment-specific variable files, run Terraform for each environment
**Outcome**: Consistent federation setup across all environments with environment-specific overrides

### Use Case 3: AWS Fargate Router Deployment
**Scenario**: Deploy highly available routers to AWS Fargate
**How it works**: Use the AWS Fargate Terraform module, configure TLS with Route53, run `terraform apply`
**Outcome**: Production-ready router deployment across multiple availability zones with automatic TLS

---

## Technical Summary

### How It Works
Configure the Cosmo Terraform provider with your API key, then define resources using HCL (HashiCorp Configuration Language). Terraform communicates with Cosmo Cloud APIs to create, update, and delete resources based on your configuration. State is tracked locally or in remote backends, enabling drift detection and change management.

### Key Technical Features
- Official WunderGraph Terraform provider
- Support for namespaces, federated graphs, subgraphs, monographs
- Feature flags and feature subgraph management
- Contract (schema contracts) configuration
- Router token management
- AWS Fargate deployment module

### Integration Points
- Terraform Cloud and Enterprise
- CI/CD systems (GitHub Actions, GitLab CI, Jenkins)
- Remote state backends (S3, GCS, Azure Blob)
- AWS services via Fargate module

### Requirements & Prerequisites
- Terraform 1.0.0 or later
- Cosmo Cloud account
- API key for authentication
- Optional: AWS account for Fargate module

---

## Documentation References

- Primary docs: `/docs/deployments-and-hosting/terraform`
- AWS Fargate module: `/docs/deployments-and-hosting/terraform/aws-fargate`
- Provider documentation: `https://registry.terraform.io/providers/wundergraph/cosmo/latest/docs`
- Examples: `https://github.com/wundergraph/terraform-provider-cosmo/tree/main/examples`

---

## Keywords & SEO

### Primary Keywords
- Cosmo Terraform provider
- GraphQL federation IaC
- Infrastructure as Code GraphQL

### Secondary Keywords
- Terraform GraphQL
- Federation automation
- GitOps GraphQL federation

### Related Search Terms
- Automate GraphQL federation
- Terraform federated graph
- AWS Fargate GraphQL router
