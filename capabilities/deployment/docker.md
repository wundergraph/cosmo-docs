# Docker

## Metadata

| Field | Value |
|-------|-------|
| **Capability ID** | `cap-deploy-005` |
| **Category** | Deployment |
| **Status** | GA |
| **Availability** | Free / Pro / Enterprise |
| **Related Capabilities** | `cap-deploy-002`, `cap-deploy-003` |

---

## Quick Reference

### Name
Docker Deployment

### Tagline
Run the complete Cosmo stack with docker-compose.

### Elevator Pitch
Get the complete Cosmo Platform running on your local machine in minutes using Docker Compose. Clone the repository, run a single command, and have a fully functional federation environment for development, testing, and evaluation. Ideal for exploring Cosmo features before committing to a production deployment.

---

## Problem & Solution

### The Problem
Teams evaluating GraphQL federation platforms need a way to quickly run the full stack locally without complex infrastructure setup. Setting up individual components manually is time-consuming and error-prone. Developers need a consistent local environment that mirrors the production architecture for effective development and testing.

### The Solution
Cosmo provides an official Docker Compose configuration that starts the entire platform stack with a single command. Follow the Getting Started guide to have a working federation environment in minutes. This approach is perfect for demos, local development, proof-of-concept work, and CI testing.

### Before & After

| Before Docker Compose | With Docker Compose |
|----------------------|---------------------|
| Manual component installation | Single command startup |
| Complex dependency management | Pre-configured containers |
| Hours of setup time | Running in 3 minutes |
| Environment inconsistencies | Reproducible local environment |
| Difficulty evaluating platform | Quick hands-on exploration |

---

## Key Benefits

1. **Rapid Setup**: Get the complete Cosmo Platform running in minutes, not hours
2. **Zero Configuration**: Pre-configured docker-compose file handles all component orchestration
3. **Complete Environment**: Run all platform components locally for realistic testing
4. **Evaluation Ready**: Perfect for demos, proofs-of-concept, and platform evaluation
5. **Development Workflow**: Consistent local environment for feature development

---

## Target Audience

### Primary Persona
- **Role**: Developer, Platform Engineer, Technical Evaluator
- **Pain Points**: Need to quickly evaluate federation platforms, complex local setup requirements, time pressure for POCs
- **Goals**: Fast hands-on experience with the platform, consistent development environment

### Secondary Personas
- Solution Architects evaluating Cosmo for their organization
- DevOps Engineers testing CI/CD pipelines locally
- Technical Writers and Developer Advocates creating tutorials

---

## Use Cases

### Use Case 1: Platform Evaluation
**Scenario**: A technical lead needs to evaluate Cosmo for their organization
**How it works**: Clone the Cosmo repository, run the Getting Started command, explore Studio, create federated graphs, test queries
**Outcome**: Comprehensive hands-on evaluation of the platform in under an hour

### Use Case 2: Local Development Environment
**Scenario**: A developer needs to work on subgraph changes with the full federation stack
**How it works**: Start the Docker Compose stack, configure local subgraph to connect to local federation, develop and test
**Outcome**: Rapid iteration on federation features with full local visibility

### Use Case 3: CI Integration Testing
**Scenario**: Test federation changes in CI before deploying to staging
**How it works**: Spin up Docker Compose stack in CI environment, run integration tests against local federation
**Outcome**: Catch federation issues early in the development cycle

---

## Technical Summary

### How It Works
The Docker Compose configuration defines all Cosmo Platform components and their dependencies. Running `docker-compose up` starts containers for the control plane, studio, router, metrics collection, and all required storage backends (PostgreSQL, ClickHouse, Redis, etc.). Components are pre-configured to communicate with each other on a Docker network.

### Key Technical Features
- Complete platform stack in containers
- Pre-configured networking between components
- Volume mounts for data persistence
- Environment variable configuration
- Full docker-compose.full.yml available in repository

### Integration Points
- Docker Desktop or Docker Engine
- Local development tools and IDEs
- CI/CD systems supporting Docker
- Local subgraph services

### Requirements & Prerequisites
- Docker Desktop or Docker Engine installed
- Docker Compose v2.x
- Git for cloning the repository
- Sufficient system resources (RAM, CPU)
- Ports available for platform components

---

## Competitive Positioning

### Important Notes
- The Docker Compose stack is intended for development and evaluation, not production deployments
- For production deployments, use Kubernetes with Helm charts or contact WunderGraph for deployment assistance
- For managed production environments, consider Cosmo Cloud

---

## Documentation References

- Primary docs: `/docs/deployments-and-hosting/docker`
- Getting started: `https://github.com/wundergraph/cosmo#demo-cosmo-on-your-machine-in-3-minutes`
- Docker Compose file: `https://github.com/wundergraph/cosmo/blob/main/docker-compose.full.yml`
- Repository: `https://github.com/wundergraph/cosmo`

---

## Keywords & SEO

### Primary Keywords
- Cosmo Docker
- GraphQL federation Docker
- Local federation development

### Secondary Keywords
- Docker Compose GraphQL
- Federation local environment
- GraphQL development setup

### Related Search Terms
- Run Cosmo locally
- GraphQL federation Docker Compose
- Local federation testing environment
