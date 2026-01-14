# Development Mode

## Metadata

| Field | Value |
|-------|-------|
| **Capability ID** | `cap-router-006` |
| **Category** | Router |
| **Status** | GA |
| **Availability** | Free |
| **Related Capabilities** | `cap-router-001`, `cap-router-004`, `cap-router-005` |

---

## Quick Reference

### Name
Development Mode

### Tagline
Development-optimized settings with verbose error output and simplified setup.

### Elevator Pitch
Development Mode provides a single configuration toggle that optimizes the Cosmo Router for local development. Enable human-readable logging, detailed error propagation with stack traces, and automatic Docker-to-localhost connectivity. Spend less time configuring and more time building.

---

## Problem & Solution

### The Problem
Setting up a GraphQL router for local development often requires configuring multiple settings: switching from JSON to human-readable logs, enabling verbose error messages, exposing stack traces for debugging, and handling network connectivity between Docker and localhost. Developers waste time on configuration instead of building features.

### The Solution
Cosmo Router's Development Mode provides a single `dev_mode: true` toggle that configures all development-friendly settings at once. This includes human-readable logging, full error propagation with status codes and stack traces, and automatic Docker-to-localhost fallback for running subgraphs locally.

### Before & After

| Before Cosmo | With Cosmo |
|--------------|------------|
| Multiple config changes for dev setup | Single `dev_mode: true` toggle |
| JSON logs hard to read during debugging | Human-readable sugared log output |
| Errors hidden or sanitized | Full error details with stack traces |
| Docker-to-localhost networking issues | Automatic localhost fallback inside Docker |

---

## Key Benefits

1. **One-Line Setup**: Enable comprehensive development settings with a single configuration flag
2. **Human-Readable Logs**: Switch from JSON to sugared log output that is easy to read in terminals
3. **Verbose Error Output**: Propagate subgraph status codes, error locations, and stack traces for faster debugging
4. **Docker Connectivity**: Automatic retry to `docker.host.internal` for requests that fail to connect to localhost
5. **Production Safety**: Clear separation of development and production configurations prevents accidental exposure

---

## Target Audience

### Primary Persona
- **Role**: Backend Developer / API Developer
- **Pain Points**: Time wasted on development environment configuration; difficulty debugging federated queries; Docker networking complexity
- **Goals**: Start developing quickly; see detailed error information; seamlessly run subgraphs locally

### Secondary Personas
- Frontend developers running the router locally for testing
- New team members setting up their development environment
- DevOps engineers creating development environment templates

---

## Use Cases

### Use Case 1: Quick Local Development Setup
**Scenario**: A developer needs to run the Cosmo Router locally for the first time to test their subgraph changes
**How it works**: Add `dev_mode: true` to the configuration file; start the router; all development-friendly settings are automatically applied
**Outcome**: Ready to develop in seconds with proper logging and error visibility

### Use Case 2: Debugging Subgraph Errors
**Scenario**: A developer is troubleshooting why a GraphQL operation returns an error from a subgraph
**How it works**: With dev mode enabled, subgraph errors include the HTTP status code in extensions, full error locations, and stack traces when available. The human-readable logs provide additional context.
**Outcome**: Complete error context for rapid debugging without toggling individual settings

### Use Case 3: Docker with Localhost Subgraphs
**Scenario**: A developer runs the router in Docker but wants to connect to subgraphs running on their host machine
**How it works**: The router automatically detects Docker environment and retries failed localhost connections using `docker.host.internal`. No additional configuration required.
**Outcome**: Seamless Docker-to-localhost connectivity out of the box

---

## Technical Summary

### How It Works
When `dev_mode: true` is set, the router applies a preset of development-optimized configurations. This includes human-readable logging, full subgraph error propagation, and enabling Advanced Request Tracing (ART) without additional security configuration. Inside Docker, the router detects localhost connection failures and automatically retries with `docker.host.internal`.

### Key Technical Features
- Single `dev_mode: true` configuration flag
- Human-readable sugared log output (non-JSON)
- Full subgraph HTTP status code propagation
- Error locations included in responses
- Stack trace propagation via `allowed_extension_fields`
- Automatic Docker localhost fallback (enabled by default)
- Advanced Request Tracing (ART) enabled without security headers

### Configuration Equivalent
Enabling `dev_mode: true` is equivalent to:
```yaml
json_log: false
subgraph_error_propagation:
  propagate_status_codes: true
  omit_locations: false
  allowed_extension_fields: ["code", "stacktrace"]
```

### Integration Points
- Local development environments
- Docker-based development setups
- IDE debugging workflows
- Local subgraph testing

### Requirements & Prerequisites
- Configuration file with `dev_mode: true`
- Not recommended for production environments

### Important Notes
- To enable specific production features, first disable dev mode, then configure individual settings
- The Docker localhost fallback can be disabled via `LOCALHOST_FALLBACK_INSIDE_DOCKER=false`
- Configuration file hot-reloading works in dev mode for rapid iteration

---

## Documentation References

- Primary docs: `/docs/router/development`
- Development mode details: `/docs/router/development/development-mode`
- Configuration reference: `/docs/router/configuration`
- Hot reload: `/docs/router/deployment/config-hot-reload`

---

## Keywords & SEO

### Primary Keywords
- Development Mode
- Local Development
- Developer Experience

### Secondary Keywords
- GraphQL Development Setup
- Debug Configuration
- Local Testing Mode

### Related Search Terms
- GraphQL router local development
- Debug federated GraphQL
- Docker localhost GraphQL
- Development environment setup
