# Router Configuration

## Metadata

| Field | Value |
|-------|-------|
| **Capability ID** | `cap-router-004` |
| **Category** | Router |
| **Status** | GA |
| **Availability** | Free |
| **Related Capabilities** | `cap-router-001`, `cap-router-005`, `cap-router-006` |

---

## Quick Reference

### Name
Router Configuration

### Tagline
YAML-based configuration with environment variable expansion and JSON schema validation.

### Elevator Pitch
Cosmo Router offers a flexible, developer-friendly configuration system using YAML files with environment variable expansion. JSON schema validation provides IDE auto-completion, documentation, and error detection. Multiple configuration files can be merged for environment-specific overrides, eliminating the need for complex templating solutions.

---

## Problem & Solution

### The Problem
Configuring API gateways often involves complex configuration files with no validation, leading to deployment failures from typos or invalid values. Managing configuration across environments (dev, staging, production) requires either duplicating entire files or using external templating tools. Storing sensitive values like API tokens in configuration files poses security risks.

### The Solution
Cosmo Router uses YAML configuration with JSON schema validation that integrates with popular IDEs for auto-completion and inline documentation. Environment variable expansion allows secure handling of secrets. Multiple configuration files can be merged with clear precedence rules, enabling clean separation of base settings and environment-specific overrides.

### Before & After

| Before Cosmo | With Cosmo |
|--------------|------------|
| Configuration errors discovered at runtime | JSON schema validation catches errors before deployment |
| No IDE support for configuration | Auto-completion, documentation, and deprecation warnings |
| Complex templating for environment differences | Native configuration file merging with clear precedence |
| Secrets stored in configuration files | Environment variable expansion for sensitive values |

---

## Key Benefits

1. **IDE Integration**: JSON schema provides auto-completion, inline documentation, deprecation notices, and error detection in VSCode and JetBrains IDEs
2. **Environment Variable Expansion**: Reference environment variables directly in YAML using `${VAR_NAME}` syntax to keep secrets out of files
3. **Configuration Merging**: Load multiple configuration files with predictable merge behavior for environment-specific overrides
4. **Validation Before Deployment**: JSON schema catches typos, invalid values, and deprecated options before the router starts
5. **Clear Precedence Rules**: Well-defined ordering of environment variables, base config, and override files eliminates configuration confusion

---

## Target Audience

### Primary Persona
- **Role**: DevOps Engineer / Platform Engineer
- **Pain Points**: Complex configuration management across environments; configuration errors causing deployment failures; managing secrets securely
- **Goals**: Streamlined configuration workflow; catch errors early; maintain separate environment configurations cleanly

### Secondary Personas
- Backend developers setting up local development
- SREs managing production router deployments
- Security engineers reviewing secret management practices

---

## Use Cases

### Use Case 1: Multi-Environment Configuration
**Scenario**: A team needs different router configurations for development, staging, and production environments
**How it works**: Create a `base.config.yaml` with shared settings, then environment-specific files (`dev.config.yaml`, `prod.config.yaml`) with overrides. Set `CONFIG_PATH=base.config.yaml,prod/prod.config.yaml` per environment.
**Outcome**: Clean separation of shared and environment-specific configuration with no duplication

### Use Case 2: Secure Secret Management
**Scenario**: Router configuration requires API tokens and credentials that should not be stored in files
**How it works**: Use environment variable expansion in YAML: `token: "${GRAPH_API_TOKEN}"`. Secrets are injected at runtime from secure secret management systems.
**Outcome**: Configuration files can be safely committed to version control; secrets managed through secure infrastructure

### Use Case 3: IDE-Assisted Configuration
**Scenario**: A developer is configuring the router and needs to discover available options and correct syntax
**How it works**: Add the JSON schema reference to the config file header. The IDE provides auto-completion, shows documentation on hover, and highlights invalid values or deprecated options.
**Outcome**: Faster, error-free configuration with built-in documentation at the developer's fingertips

---

## Technical Summary

### How It Works
The router reads configuration from a YAML file (default: `config.yaml` in the working directory) or path specified via `CONFIG_PATH`. Multiple files can be specified as comma-separated paths and are merged in order, with later files taking precedence. Environment variables are expanded before validation, and the final configuration is validated against the JSON schema.

### Key Technical Features
- YAML-based configuration with JSON schema validation
- Environment variable expansion using `${VAR_NAME}` syntax
- Multiple configuration file merging with predictable precedence
- IDE auto-completion and documentation via JSON schema
- Override environment file support via `OVERRIDE_ENV`
- Go duration syntax for intervals and timeouts (e.g., `10s`, `5m`, `1h`)

### Configuration Merging Rules
- Environment variables are loaded first (lowest precedence)
- YAML configurations override environment variables
- Later files in `CONFIG_PATH` override earlier files
- List values are replaced entirely, not merged
- Empty values in YAML files override non-empty defaults

### Integration Points
- VSCode with YAML extension
- JetBrains IDEs (built-in support)
- Secret management systems (Vault, AWS Secrets Manager, etc.)
- CI/CD pipelines for configuration validation

### Requirements & Prerequisites
- YAML configuration file(s)
- Optional: IDE with JSON schema support
- Optional: Secret management system for environment variables

---

## Documentation References

- Primary docs: `/docs/router/configuration`
- Configuration design: `/docs/router/configuration/config-design`
- Hot reload: `/docs/router/deployment/config-hot-reload`

---

## Keywords & SEO

### Primary Keywords
- Router Configuration
- YAML Configuration
- GraphQL Router Config

### Secondary Keywords
- Environment Variable Expansion
- Configuration Validation
- JSON Schema Configuration

### Related Search Terms
- GraphQL gateway configuration
- API router setup
- Federation router settings
- Configuration file best practices
