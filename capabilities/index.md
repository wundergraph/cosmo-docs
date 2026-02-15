# Cosmo Capabilities Index

> **Status**: Draft for review - 94 capabilities identified (consolidated)
>
> This index lists all capabilities extracted from the documentation. Review and refine before applying the full template to each capability.

---

## Federation & Schema Composition

| Capability | Description | Source Files |
|------------|-------------|--------------|
| **GraphQL Federation v1 & v2** | Full support for both Federation protocol versions | `/docs/router/intro.mdx`, `/docs/federation/federation-compatibility-matrix.mdx` |
| **Schema Composition** | Automatic composition of federated graphs from multiple subgraphs with error detection | `/docs/studio/compositions.mdx`, `/docs/studio/schema-checks.mdx` |
| **Schema Checks** | Pre-deployment validation including composition errors, breaking changes, and lint rules | `/docs/studio/schema-checks.mdx`, `/docs/cli/subgraph/check.mdx` |
| **Schema Registry** | Centralized schema management with version history and comparison | `/docs/studio/schema-registry.mdx` |
| **Schema Contracts** | Filter graph sections for different audiences using @tag directives | `/docs/concepts/schema-contracts.mdx`, `/docs/studio/schema-contracts.mdx`, `/docs/cli/schema-contracts.mdx` |
| **Federation Directives** | Extended directive support (@shareable, @authenticated, @requiresScopes, etc.) | `/docs/federation/federation-directives-index.mdx`, `/docs/federation/directives/` |
| **Subgraph Management** | Create, publish, update, delete subgraphs with full lifecycle management | `/docs/cli/subgraph.mdx`, `/docs/studio/` |
| **Monograph Support** | Single-service GraphQL without federation complexity | `/docs/cli/monograph.mdx` |

---

## Router & Query Execution

| Capability | Description | Source Files |
|------------|-------------|--------------|
| **GraphQL Federation Router** | High-performance Go-based router with query planning and optimization | `/docs/router/intro.mdx` |
| **Query Planning** | Intelligent query plan generation for federated execution | `/docs/router/query-plan.mdx`, `/docs/router/query-plan/batch-generate-query-plans.mdx` |
| **Query Batching** | Execute multiple operations in a single request with configurable concurrency | `/docs/router/query-batching.mdx` |
| **Router Configuration** | YAML-based config with env var expansion and JSON schema validation | `/docs/router/configuration.mdx`, `/docs/router/configuration/config-design.mdx` |
| **Config Hot Reload** | Update router configuration at runtime without downtime | `/docs/router/deployment/config-hot-reload.mdx` |
| **Development Mode** | Development-optimized settings with verbose error output | `/docs/router/development.mdx`, `/docs/router/development/development-mode.mdx` |

---

## Real-Time & Subscriptions

| Capability | Description | Source Files |
|------------|-------------|--------------|
| **GraphQL Subscriptions** | Multiple protocol support (graphql-ws, SSE, multipart HTTP) with connection multiplexing | `/docs/router/subscriptions.mdx` |
| **Cosmo Streams (EDFS)** | Event-driven federated subscriptions with Kafka, NATS, and Redis integration | `/docs/router/cosmo-streams.mdx`, `/docs/federation/event-driven-federated-subscriptions.mdx` |

---

## Traffic Management & Reliability

| Capability | Description | Source Files |
|------------|-------------|--------------|
| **Traffic Shaping** | Comprehensive traffic control with retries, timeouts, and circuit breakers | `/docs/router/traffic-shaping.mdx` |
| **Retry Mechanism** | Configurable retry policies with exponential backoff | `/docs/router/traffic-shaping/retry.mdx` |
| **Timeout Configuration** | Request and per-subgraph timeout management | `/docs/router/traffic-shaping/timeout.mdx` |
| **Circuit Breaker** | Fault tolerance with automatic circuit state management | `/docs/router/traffic-shaping/circuit-breaker.mdx` |

---

## Performance & Caching

| Capability | Description | Source Files |
|------------|-------------|--------------|
| **Persisted Operations** | Pre-register operations for security and performance | `/docs/router/persisted-queries.mdx`, `/docs/router/persisted-queries/persisted-operations.mdx` |
| **Automatic Persisted Queries (APQ)** | Hash-based query execution with automatic caching | `/docs/router/persisted-queries/automatic-persisted-queries-apq.mdx` |
| **Cache Warmer** | Pre-warm query plan cache for optimal performance | `/docs/concepts/cache-warmer.mdx` |
| **Cache Control** | CDN-friendly cache header management | `/docs/router/proxy-capabilities/adjusting-cache-control.mdx` |
| **Performance Debugging** | Tools for identifying and resolving performance bottlenecks | `/docs/router/performance-debugging.mdx` |

---

## Observability

| Capability | Description | Source Files |
|------------|-------------|--------------|
| **OpenTelemetry (OTEL)** | Full OTEL support for tracing and metrics with HTTP/gRPC exporters | `/docs/router/open-telemetry.mdx`, `/docs/router/open-telemetry/custom-attributes.mdx` |
| **Distributed Tracing** | End-to-end request tracing across federated services | `/docs/studio/analytics/distributed-tracing.mdx` |
| **Advanced Request Tracing (ART)** | Detailed execution plan tracing with Playground visualization | `/docs/router/advanced-request-tracing-art.mdx` |
| **Prometheus Metrics** | R.E.D method metrics (Rate, Errors, Duration) with custom labels | `/docs/router/metrics-and-monitoring.mdx`, `/docs/router/metrics-and-monitoring/prometheus-metric-reference.mdx` |
| **Grafana Integration** | Pre-built dashboards for metrics visualization | `/docs/router/metrics-and-monitoring/grafana.mdx` |
| **OTEL Collector Integration** | Collector setup for data aggregation | `/docs/router/open-telemetry/setup-opentelemetry-collector.mdx` |
| **Access Logs** | Configurable request logging to stdout or file | `/docs/router/access-logs.mdx` |
| **Profiling (pprof)** | CPU, memory, goroutine, and block profiling | `/docs/router/profiling.mdx` |

---

## Analytics & Insights

| Capability | Description | Source Files |
|------------|-------------|--------------|
| **Analytics Dashboard** | Request metrics with filtering, grouping, and date range selection | `/docs/studio/analytics.mdx` |
| **Metrics Analytics** | Request rate, error tracking, and latency analysis | `/docs/studio/analytics/metrics.mdx` |
| **Trace Analytics** | Individual trace inspection with timeline visualization | `/docs/studio/analytics/traces.mdx` |
| **Schema Field Usage** | Track field popularity and detect unused fields | `/docs/studio/analytics/schema-field-usage.mdx` |
| **Client Identification** | Track client versions and usage patterns | `/docs/studio/analytics/client-identification.mdx` |
| **Operations Tracking** | Monitor and analyze registered operations | `/docs/studio/operations.mdx` |

---

## Security

| Capability | Description | Source Files |
|------------|-------------|--------------|
| **JWT Authentication** | JWKS-based JWT validation with multiple providers | `/docs/router/authentication-and-authorization.mdx` |
| **Authorization Directives** | Field-level auth with @authenticated and @requiresScopes | `/docs/federation/directives/authenticated.mdx`, `/docs/federation/directives/requiresscopes.mdx` |
| **TLS/HTTPS** | Encrypted communication with certificate management | `/docs/router/security/tls.mdx` |
| **Config Signing** | HMAC-SHA256 signature verification for tamper prevention | `/docs/router/security/config-validation-and-signing.mdx` |
| **Security Hardening** | Best practices for production deployments | `/docs/router/security/hardening-guide.mdx` |
| **Introspection Control** | Disable schema introspection in production | `/docs/router/security.mdx` |
| **Subgraph Error Propagation** | Control error exposure with sensitive data masking | `/docs/router/subgraph-error-propagation.mdx` |

---

## Access Control & Identity

| Capability | Description | Source Files |
|------------|-------------|--------------|
| **Role-Based Access Control (RBAC)** | Granular permission management by role | `/docs/studio/rbac.mdx` |
| **Groups & Group Rules** | User group management with SSO rule mapping | `/docs/studio/groups.mdx`, `/docs/studio/groups/group-rules.mdx` |
| **API Keys** | Granular API key permissions with resource-level access | `/docs/studio/api-keys.mdx`, `/docs/studio/api-keys/api-key-permissions.mdx`, `/docs/studio/api-keys/api-key-resources.mdx` |
| **Single Sign-On (SSO)** | OIDC support for Okta, Auth0, Keycloak, Microsoft Entra | `/docs/studio/sso.mdx` |
| **SCIM Provisioning** | Automated user provisioning and deprovisioning | `/docs/studio/scim.mdx`, `/docs/studio/scim/okta.mdx` |
| **Audit Logging** | Complete audit trail of all user and API actions | `/docs/studio/audit-log.mdx` |
| **User Invitations** | Team member onboarding and collaboration | `/docs/studio/invitations.mdx` |
| **Session Management** | User session tracking and activity monitoring | `/docs/studio/sessions.mdx` |

---

## Compliance & Data Privacy

| Capability | Description | Source Files |
|------------|-------------|--------------|
| **Compliance Certifications** | SOC 2 Type II, ISO 27001, GDPR, HIPAA support | `/docs/security-and-compliance.mdx`, `/docs/router/compliance-and-data-management.mdx` |
| **IP Anonymization** | Redact or hash IP addresses for privacy | `/docs/router/compliance-and-data-management.mdx` |
| **Advanced Data Privacy** | Field-level data obfuscation with custom renderers | `/docs/router/advanced-data-privacy.mdx` |
| **Variable Export Control** | Control which variables are exported in telemetry | `/docs/router/compliance-and-data-management.mdx` |

---

## Developer Experience

| Capability | Description | Source Files |
|------------|-------------|--------------|
| **GraphiQL Playground++** | Enhanced GraphQL IDE with ART visualization | `/docs/studio/playground.mdx` |
| **Custom Playground Scripts** | Pre/post-request hooks with dynamic variables | `/docs/studio/playground/custom-scripts.mdx` |
| **Shared Playground State** | Shareable sessions for team collaboration | `/docs/studio/playground/shared-playground-state.mdx` |
| **Schema Explorer** | Interactive schema browsing with search | `/docs/studio/schema-explorer.mdx` |
| **Changelog** | Track all graph modifications with attribution | `/docs/studio/changelog.mdx` |
| **Query Plan Visualization** | Visual query execution plans for debugging | `/docs/router/query-plan.mdx` |
| **Lint Policies** | Customizable schema linting rules | `/docs/studio/policies.mdx`, `/docs/studio/lint-policy/linter-rules.mdx` |
| **Graph Pruning** | Detect unused fields and enforce deprecations | `/docs/studio/graph-pruning.mdx` |
| **Breaking Change Overrides** | Manual override for approved breaking changes | `/docs/studio/overrides.mdx` |

---

## Feature Flags & Progressive Delivery

| Capability | Description | Source Files |
|------------|-------------|--------------|
| **Feature Flags** | Runtime feature toggling with feature subgraphs for gradual rollout via headers, JWT claims, or cookies | `/docs/concepts/feature-flags.mdx`, `/docs/cli/feature-flags.mdx`, `/docs/cli/feature-subgraph.mdx` |

---

## gRPC Integration (Cosmo Connect)

| Capability | Description | Source Files |
|------------|-------------|--------------|
| **Cosmo Connect** | GraphQL-to-gRPC protocol translation | `/docs/connect/overview.mdx` |
| **Router Plugins** | In-process plugins with Go and TypeScript SDKs (HTTP client, telemetry, logging) | `/docs/connect/plugins.mdx`, `/docs/router/gRPC/plugins.mdx`, `/docs/router/gRPC/plugins/go-plugin/overview.mdx`, `/docs/router/gRPC/plugins/go-plugin/http-client.mdx`, `/docs/router/gRPC/plugins/go-plugin/telemetry.mdx`, `/docs/router/gRPC/plugins/go-plugin/logging.mdx`, `/docs/router/gRPC/plugins/ts-plugin/overview.mdx` |
| **gRPC Services** | Independent gRPC service deployment with Protocol Buffers and field resolvers | `/docs/connect/grpc-services.mdx`, `/docs/router/gRPC/grpc-services.mdx`, `/docs/router/gRPC/concepts.mdx`, `/docs/router/gRPC/field-resolvers.mdx`, `/docs/router/gRPC/graphql-support.mdx` |

---

## Extensibility

| Capability | Description | Source Files |
|------------|-------------|--------------|
| **Custom Modules (Go)** | Pure Go extensions with multiple hook interfaces | `/docs/router/custom-modules.mdx` |
| **Subgraph Check Extensions** | Custom validation logic for schema checks | `/docs/studio/subgraph-check-extensions.mdx` |

---

## AI & LLMs

| Capability | Description | Source Files |
|------------|-------------|--------------|
| **MCP (Model Context Protocol)** | Expose persisted operations to LLMs through MCP | `/docs/router/mcp.mdx` |

---

## Proxy & Request Handling

| Capability | Description | Source Files |
|------------|-------------|--------------|
| **Request Header Operations** | Inject and manipulate request headers | `/docs/router/proxy-capabilities/request-headers-operations.mdx` |
| **Response Header Operations** | Control response headers to clients | `/docs/router/proxy-capabilities/response-header-operations.mdx` |
| **Forward Client Extensions** | Propagate extension fields to subgraphs | `/docs/router/proxy-capabilities/forward-client-extensions.mdx` |
| **Override Subgraph Config** | Dynamic runtime subgraph configuration | `/docs/router/proxy-capabilities/override-subgraph-config.mdx` |
| **File Upload** | GraphQL multipart request spec for file uploads | `/docs/router/file-upload.mdx` |

---

## Deployment & Operations

| Capability | Description | Source Files |
|------------|-------------|--------------|
| **Cosmo Cloud** | Fully managed SaaS platform | `/docs/deployments-and-hosting/cosmo-cloud.mdx` |
| **Self-Hosted Deployment** | On-premise or private cloud deployment | `/docs/deployments-and-hosting/intro.mdx` |
| **Kubernetes (Helm)** | Helm charts for K8s deployment (EKS, AKS, GKE) | `/docs/deployments-and-hosting/kubernetes.mdx`, `/docs/deployments-and-hosting/kubernetes/helm-chart.mdx` |
| **Terraform** | Infrastructure as Code for AWS Fargate and more | `/docs/deployments-and-hosting/terraform.mdx`, `/docs/deployments-and-hosting/terraform/aws-fargate.mdx` |
| **Docker** | Container-based deployment | `/docs/deployments-and-hosting/docker.mdx` |
| **Storage Providers** | CDN, S3, and S3-compatible artifact storage | `/docs/router/storage-providers.mdx` |
| **Router Compatibility Versions** | Managed version compatibility | `/docs/concepts/router-compatibility-versions.mdx` |
| **Cluster Management** | Multi-cluster router administration | `/docs/studio/cluster-management.mdx` |

---

## CLI (wgc)

| Capability | Description | Source Files |
|------------|-------------|--------------|
| **Cosmo CLI** | Comprehensive CLI for managing namespaces, subgraphs, federated graphs, router, plugins, gRPC services, operations, proposals, and authentication | `/docs/cli/intro.mdx`, `/docs/cli/essentials.mdx`, `/docs/cli/namespace.mdx`, `/docs/cli/subgraph.mdx`, `/docs/cli/federated-graph.mdx`, `/docs/cli/monograph.mdx`, `/docs/cli/router.mdx`, `/docs/cli/router/plugin.mdx`, `/docs/cli/grpc-service.mdx`, `/docs/cli/operations.mdx`, `/docs/cli/proposal.mdx`, `/docs/cli/auth.mdx` |

---

## Notifications & Integrations

| Capability | Description | Source Files |
|------------|-------------|--------------|
| **Alerts & Notifications** | Multi-channel alerting for schema changes and errors | `/docs/studio/alerts-and-notifications.mdx` |
| **Webhook Notifications** | Custom webhook integration for events | `/docs/studio/alerts-and-notifications/webhooks.mdx` |
| **Slack Integration** | Direct Slack channel notifications | `/docs/studio/alerts-and-notifications/slack-integration.mdx` |

---

## Migration & Compatibility

| Capability | Description | Source Files |
|------------|-------------|--------------|
| **Apollo Migration** | Migration guides from Apollo Federation | `/docs/studio/migrate-from-apollo.mdx` |
| **Apollo Router Migration** | Migration path from Apollo Router | `/docs/studio/migrate-from-apollo.mdx` |
| **Federation Compatibility** | Federation v1/v2 compatibility matrix | `/docs/federation/federation-compatibility-matrix.mdx` |

---

## Summary

| Category | Count |
|----------|-------|
| Federation & Schema Composition | 8 |
| Router & Query Execution | 6 |
| Real-Time & Subscriptions | 2 |
| Traffic Management & Reliability | 4 |
| Performance & Caching | 5 |
| Observability | 8 |
| Analytics & Insights | 6 |
| Security | 7 |
| Access Control & Identity | 8 |
| Compliance & Data Privacy | 4 |
| Developer Experience | 9 |
| Feature Flags & Progressive Delivery | 1 |
| gRPC Integration (Cosmo Connect) | 3 |
| Extensibility | 2 |
| AI & LLMs | 1 |
| Proxy & Request Handling | 5 |
| Deployment & Operations | 8 |
| CLI (wgc) | 1 |
| Notifications & Integrations | 3 |
| Migration & Compatibility | 3 |
| **Total** | **94** |

---

## Next Steps

1. **Review this index** - Validate capability names and groupings
2. **Prioritize** - Identify high-value capabilities for detailed documentation
3. **Apply template** - Create full capability docs using `template.md`
4. **Cross-reference** - Ensure all source files are correctly linked