# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the documentation repository for WunderGraph Cosmo - a Full Lifecycle GraphQL API Management Solution for managing Federated Graphs at scale. The documentation is built using Mintlify and written in MDX format.

## Development Commands

### Prerequisites
```bash
pnpm add -g mintlify
```

### Local Development
```bash
cd docs
mintlify dev
```

The development server will start and you can preview changes locally. All documentation content is in the `/docs` directory.

### Troubleshooting
If the development server isn't running properly:
```bash
mintlify install
```

## Architecture & Key Concepts

### Cosmo Components
1. **CLI (wgc)** - Command-line interface for managing the platform
2. **Control Plane** - Central management system with Platform API and Node API
3. **Router** - GraphQL Federation router that handles request routing and response aggregation
4. **Studio** - Web interface for management, monitoring, and analytics

### Important Concepts
- **Federated Graph**: Unified GraphQL schema composed of multiple subgraphs
- **Subgraph**: Individual GraphQL service that contributes to a federated graph
- **Monograph**: Single GraphQL service without federation
- **Namespaces**: Environment isolation for graphs (dev, staging, prod)
- **Feature Flags & Feature Subgraphs**: Toggle-able subgraph replacements for incremental rollout
- **Schema Contracts**: Filtered graph versions using @tag directives
- **Cosmo Streams / EDFS**: Event-Driven Federated Subscriptions for real-time data

## Documentation Structure

```
/docs/
├── cli/                    # CLI documentation (wgc commands)
├── studio/                 # Studio web interface docs
├── router/                 # Router configuration and features
├── federation/             # GraphQL Federation concepts
├── control-plane/          # Control Plane architecture
├── deployments-and-hosting/# Deployment guides
├── tutorial/               # Step-by-step tutorials
├── concepts/               # Core concepts and architecture
├── getting-started/        # Quick start guides
└── images/                 # Documentation images by topic
```

## Key Files

- `/docs/docs.json` - Mintlify configuration (navigation, theme, integrations)
- `/docs/style.css` - Custom styling
- MDX files throughout - Documentation content

## Writing Guidelines

1. Use MDX format for all documentation
2. Place images in the appropriate `/docs/images/` subdirectory
3. Follow the existing navigation structure in `docs.json`
4. Include code examples where appropriate
5. Link between related documentation pages

## Common Tasks

### Adding a New Page
1. Create an MDX file in the appropriate directory
2. Add the page to navigation in `/docs/docs.json`
3. Test locally with `mintlify dev`

### Updating Navigation
Edit the `navigation` array in `/docs/docs.json` to modify the sidebar structure.

### Adding Images
1. Place images in `/docs/images/[topic]/`
2. Reference in MDX: `![Alt text](/images/topic/filename.png)`

## Deployment

Changes are automatically deployed when merged to the main branch. Pull requests generate preview deployments for review.