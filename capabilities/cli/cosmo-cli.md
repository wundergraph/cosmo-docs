# Cosmo CLI (wgc)

## Metadata

| Field | Value |
|-------|-------|
| **Capability ID** | `cap-cli-001` |
| **Category** | CLI |
| **Status** | GA |
| **Availability** | Free |
| **Related Capabilities** | `cap-fed-001`, `cap-router-001` |

---

## Quick Reference

### Name
Cosmo CLI (wgc)

### Tagline
Complete command-line control for federated GraphQL management.

### Elevator Pitch
The Cosmo CLI (wgc) is a comprehensive command-line tool that enables developers to manage every aspect of their federated GraphQL infrastructure. From creating and publishing subgraphs to validating schema changes and managing router configurations, wgc provides full lifecycle control over your GraphQL APIs directly from your terminal or CI/CD pipelines.

---

## Problem & Solution

### The Problem
Managing federated GraphQL architectures involves numerous operational tasks: creating graphs, publishing schemas, validating changes, managing namespaces, and configuring routers. Without a unified toolchain, teams struggle with:
- Manual, error-prone schema deployments
- Lack of pre-deployment validation leading to production incidents
- Difficulty integrating GraphQL management into CI/CD workflows
- No centralized way to manage multiple environments and teams

### The Solution
Cosmo CLI provides a single, powerful command-line interface that handles all aspects of federated GraphQL management. It integrates seamlessly with CI/CD pipelines, enables schema validation before deployment, and provides consistent commands for managing namespaces, subgraphs, federated graphs, routers, and more.

### Before & After

| Before Cosmo CLI | With Cosmo CLI |
|------------------|----------------|
| Manual schema deployments through web interfaces | Automated deployments via `wgc subgraph publish` |
| No pre-deployment validation of schema changes | `wgc subgraph check` catches breaking changes before production |
| Complex scripts to manage multiple environments | Simple namespace management with `-n` flag |
| Separate tools for different GraphQL operations | One unified CLI for all operations |
| Difficult CI/CD integration | Native support for environment variables and proxy configuration |

---

## Key Benefits

1. **Complete Lifecycle Management**: Create, update, publish, check, and delete subgraphs, federated graphs, and monographs all from a single tool.

2. **CI/CD Native**: Built for automation with environment variable authentication (`COSMO_API_KEY`), proxy support, and machine-readable outputs for seamless pipeline integration.

3. **Safe Schema Evolution**: Pre-deployment schema checks validate changes against client traffic patterns and composition rules, preventing breaking changes from reaching production.

4. **Multi-Environment Support**: Namespaces provide isolated environments (dev, staging, prod) manageable through consistent CLI commands with the `-n` flag.

5. **Extensibility**: Support for plugins, gRPC services, and custom router configurations enables advanced use cases while maintaining a consistent CLI experience.

---

## Target Audience

### Primary Persona
- **Role**: Platform Engineer / DevOps Engineer
- **Pain Points**: Need to automate GraphQL infrastructure management; require reliable CI/CD integration; must manage multiple environments consistently
- **Goals**: Automate schema deployments; implement safe change management; standardize team workflows

### Secondary Personas
- **Backend Developers**: Need to publish schema changes and validate them against the federated graph
- **API Architects**: Manage federated graph composition and subgraph organization
- **Engineering Managers**: Ensure consistent, auditable processes for schema changes across teams

---

## Use Cases

### Use Case 1: CI/CD Schema Deployment Pipeline
**Scenario**: A team wants to automate subgraph schema deployments through their CI/CD pipeline with safety checks.

**How it works**:
1. Developer pushes schema changes to a feature branch
2. CI pipeline runs `wgc subgraph check <name> --schema schema.graphql` to validate changes
3. Check results are reported, including breaking changes and composition errors
4. On merge to main, `wgc subgraph publish <name> --schema schema.graphql` deploys the schema
5. The federated graph automatically recomposes with the new schema

**Outcome**: Safe, automated schema deployments with pre-merge validation that prevents breaking changes from reaching production.

### Use Case 2: Multi-Environment Namespace Management
**Scenario**: An organization needs to manage separate development, staging, and production environments for their federated graph.

**How it works**:
1. Create namespaces: `wgc namespace create staging` and `wgc namespace create production`
2. Create federated graphs in each namespace with matching subgraphs
3. Use the `-n` flag to target specific environments: `wgc subgraph publish products -n staging --schema schema.graphql`
4. Promote changes through environments by publishing to each namespace sequentially

**Outcome**: Clean environment isolation with consistent commands, enabling safe promotion of changes from dev to production.

### Use Case 3: Schema Change Validation with Traffic Analysis
**Scenario**: A team needs to understand the impact of a schema change on existing clients before deploying.

**How it works**:
1. Run `wgc subgraph check products --schema new-schema.graphql`
2. The CLI validates composition with all connected federated graphs
3. Breaking changes are analyzed against actual client traffic patterns
4. Results show which changes are breaking vs. non-breaking and which clients would be affected
5. VCS context can be added via environment variables for traceability

**Outcome**: Data-driven decision making about schema changes with clear visibility into client impact.

---

## Technical Summary

### How It Works
The Cosmo CLI (wgc) is distributed via npm and communicates with the Cosmo Control Plane API. Authentication is handled via API keys stored in environment variables. Commands are organized by resource type (subgraph, federated-graph, namespace, router, etc.) with consistent CRUD operations. The CLI supports proxy configurations for enterprise environments and can run behind corporate firewalls.

### Key Technical Features
- **Authentication**: API key-based auth via `COSMO_API_KEY` environment variable
- **Proxy Support**: `HTTPS_PROXY` and `HTTP_PROXY` environment variables (v0.63.0+)
- **Schema Validation**: Breaking change detection and composition error checking
- **Label-Based Composition**: Flexible subgraph-to-federated-graph mapping using labels
- **VCS Integration**: Environment variables for commit, branch, and author context
- **Multiple Subscription Protocols**: WebSocket (graphql-ws, subscription-transport-ws), SSE, SSE POST

### Integration Points
- **CI/CD Systems**: GitHub Actions, GitLab CI, Jenkins, CircleCI, etc.
- **Version Control**: Git integration via VCS context environment variables
- **Cosmo Control Plane**: Full API access for graph management
- **Cosmo Router**: Configuration management and token generation
- **Event Systems**: Support for Event-Driven Graphs with Kafka, NATS, Redis

### Requirements & Prerequisites
- Node.js LTS version installed
- `COSMO_API_KEY` environment variable set
- Network access to Cosmo Control Plane (cloud.wundergraph.com or self-hosted)

---

## Documentation References

- Primary docs: `/docs/cli/intro`
- Essentials guide: `/docs/cli/essentials`
- Namespace management: `/docs/cli/namespace`
- Subgraph commands: `/docs/cli/subgraph`
- Federated graph commands: `/docs/cli/federated-graph`
- Monograph commands: `/docs/cli/monograph`
- Router commands: `/docs/cli/router`
- Plugin commands: `/docs/cli/router/plugin`
- gRPC service commands: `/docs/cli/grpc-service`
- Operations commands: `/docs/cli/operations`
- Proposal commands: `/docs/cli/proposal`
- Authentication commands: `/docs/cli/auth`
- CI/CD Tutorial: `/docs/tutorial/pr-based-workflow-for-federation`

---

## Keywords & SEO

### Primary Keywords
- GraphQL CLI
- Federation CLI
- Cosmo CLI
- wgc

### Secondary Keywords
- GraphQL schema management
- Federated graph CLI
- Subgraph management
- GraphQL CI/CD

### Related Search Terms
- How to manage federated GraphQL from command line
- GraphQL schema deployment automation
- Federated GraphQL CI/CD integration
- GraphQL namespace management

---

## Version History

| Date | Version | Changes |
|------|---------|---------|
| 2025-01-14 | 1.0 | Initial capability documentation |
