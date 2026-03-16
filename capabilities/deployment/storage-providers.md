# Storage Providers

## Metadata

| Field | Value |
|-------|-------|
| **Capability ID** | `cap-deploy-006` |
| **Category** | Deployment |
| **Status** | GA |
| **Availability** | Pro / Enterprise |
| **Related Capabilities** | `cap-deploy-001`, `cap-deploy-002` |

---

## Quick Reference

### Name
Storage Providers

### Tagline
Control your data with custom artifact storage.

### Elevator Pitch
Store router execution configurations and persisted operations on your own infrastructure using Amazon S3 or any S3-compatible storage (like Minio). Maintain full control over your data while still benefiting from Cosmo Cloud features. Remove dependencies on external services and meet strict data residency requirements.

---

## Problem & Solution

### The Problem
Organizations using Cosmo Cloud may need to keep certain artifacts within their own infrastructure for data sovereignty, compliance, or performance reasons. Relying on external CDNs for critical configuration files creates dependencies that may not be acceptable for regulated industries or air-gapped environments.

### The Solution
Cosmo's storage providers feature allows you to configure Amazon S3 or any S3-compatible storage as the source for router execution configurations and persisted operations. The router fetches configurations from your storage instead of Cosmo's CDN, giving you complete control over artifact storage and distribution.

### Before & After

| Before Custom Storage | With Custom Storage |
|----------------------|---------------------|
| Artifacts stored on Cosmo CDN | Artifacts in your own S3 buckets |
| External dependency for router operations | Self-contained router infrastructure |
| Limited data locality control | Full data residency compliance |
| Single point of configuration retrieval | Configurable fallback storage options |

---

## Key Benefits

1. **Data Sovereignty**: Keep all router artifacts within your own infrastructure and jurisdiction
2. **CDN Independence**: Remove dependencies on Cosmo Cloud for router operations
3. **S3 Compatibility**: Works with AWS S3, Minio, and any S3-compatible storage service
4. **IAM Integration**: Use AWS IAM roles on EC2/EKS without managing access keys
5. **Fallback Configuration**: Configure backup storage providers for high availability

---

## Target Audience

### Primary Persona
- **Role**: Platform Engineer, Infrastructure Architect, Security Engineer
- **Pain Points**: Data residency requirements, external service dependencies, compliance constraints
- **Goals**: Full control over infrastructure while using managed federation features

### Secondary Personas
- Security Officers ensuring data stays within approved boundaries
- DevOps Engineers optimizing artifact delivery performance
- Enterprise Architects designing hybrid cloud solutions

---

## Use Cases

### Use Case 1: Data Residency Compliance
**Scenario**: A European company must ensure router configurations stay within EU data centers
**How it works**: Configure S3 bucket in EU region, update CI/CD to push artifacts to S3, configure router to pull from S3
**Outcome**: Full Cosmo Cloud functionality with artifacts stored exclusively in EU infrastructure

### Use Case 2: Air-Gapped Environment Integration
**Scenario**: Deploy routers in a network segment without external internet access
**How it works**: Set up internal Minio instance, configure CI pipeline to push artifacts, point routers to internal storage
**Outcome**: Routers operate independently of external services using internally stored configurations

### Use Case 3: High Availability with Fallback
**Scenario**: Ensure routers can always fetch configurations even if primary storage is unavailable
**How it works**: Configure primary S3 provider and fallback storage (CDN or secondary S3), router automatically fails over
**Outcome**: Improved reliability with automatic fallback to backup configuration source

---

## Technical Summary

### How It Works
Define storage providers in the router's `config.yaml` file with connection details for your S3 buckets. Configure execution config and persisted operations to reference these providers. During CI/CD, use `wgc router fetch` to download configurations and upload to your S3. The router polls your storage for updates and hot-reloads without impacting traffic.

### Key Technical Features
- S3 and S3-compatible storage support (AWS S3, Minio)
- IAM role support for EC2/EKS deployments
- Configurable polling intervals (default 10 seconds)
- Hot-reload on configuration updates
- Fallback storage configuration
- Persisted operations storage with SHA256 naming

### Integration Points
- Amazon S3
- Minio (self-hosted S3-compatible storage)
- Any S3-compatible object storage
- AWS IAM roles for authentication
- CI/CD pipelines for artifact publishing

### Requirements & Prerequisites
- S3-compatible storage service
- Access credentials or IAM role configuration
- CI/CD pipeline integration for artifact publishing
- Network connectivity from router to storage

---

## Documentation References

- Primary docs: `/docs/router/storage-providers`
- Router configuration: `/docs/router/configuration`
- Execution config: `/docs/router/configuration#execution-config`

---

## Keywords & SEO

### Primary Keywords
- Cosmo storage providers
- Router artifact storage
- S3 federation configuration

### Secondary Keywords
- GraphQL router S3
- Custom CDN federation
- Minio GraphQL storage

### Related Search Terms
- Store router config in S3
- Federation data residency
- Self-hosted router artifacts
