# Forward Client Extensions

## Metadata

| Field | Value |
|-------|-------|
| **Capability ID** | `cap-proxy-003` |
| **Category** | Proxy |
| **Status** | GA |
| **Availability** | Free, Pro, Enterprise |
| **Related Capabilities** | `cap-proxy-001` (Request Header Operations), `cap-proxy-004` (Override Subgraph Config) |

---

## Quick Reference

### Name
Forward Client Extensions

### Tagline
Propagate extension fields from clients to subgraphs.

### Elevator Pitch
Forward Client Extensions enables you to pass arbitrary data from clients through the router to your subgraphs using the standard GraphQL `extensions` field. Perfect for sending authentication tokens, feature flags, or custom metadata - and essential for subscription initialization data that cannot be sent via headers.

---

## Problem & Solution

### The Problem
Sometimes headers are not enough. Clients need to send structured data, tokens, or metadata that does not fit naturally into HTTP headers. For WebSocket-based subscriptions, the challenge is even greater - initial connection handshake data cannot be modified after connection establishment, making it impossible to send per-operation tokens via headers. Teams end up implementing custom workarounds or losing flexibility in their API design.

### The Solution
Cosmo Router supports the `extensions` field as defined in the GraphQL over HTTP specification. By default, any `extensions` data sent by clients is automatically forwarded to all subgraphs. For subscriptions, the `extensions` field in the subscription payload provides the only reliable way to pass initialization data. This standards-compliant approach enables flexible data passing without custom infrastructure.

---

## Problem & Solution

### Before & After

| Before Cosmo | With Cosmo |
|--------------|------------|
| Custom endpoints for passing extra data | Standard GraphQL extensions field |
| No way to send per-subscription tokens | Extensions in subscription payload |
| Header limitations for structured data | JSON-structured extensions object |
| Non-standard workarounds | Spec-compliant implementation |

---

## Key Benefits

1. **Standards Compliant**: Implements the GraphQL over HTTP specification for extensions
2. **Zero Configuration**: Extensions are forwarded by default - works out of the box
3. **Subscription Support**: The only reliable method for sending per-subscription initialization data
4. **Flexible Data Structure**: Send any JSON structure, not limited to string header values
5. **Universal Compatibility**: Works with queries, mutations, and subscriptions

---

## Target Audience

### Primary Persona
- **Role**: Backend Developer / API Designer
- **Pain Points**: Needs to pass structured data from clients to subgraphs; requires per-subscription authentication; wants to avoid custom header gymnastics
- **Goals**: Design flexible APIs; implement proper subscription authentication; pass feature flags and metadata cleanly

### Secondary Personas
- Frontend developers sending client context
- Security engineers implementing subscription authentication
- Platform engineers designing API contracts

---

## Use Cases

### Use Case 1: Subscription Authentication Tokens
**Scenario**: Your subscription endpoints require authentication, but WebSocket connections are established before you know which subscription will run. You need to pass a token with each subscription operation.
**How it works**: Clients include a token in the subscription payload extensions: `{"extensions":{"token":"user-auth-token"}}`. The router forwards this to the subgraph handling the subscription, which validates the token.
**Outcome**: Per-subscription authentication without modifying WebSocket connection logic or compromising security.

### Use Case 2: Feature Flags and A/B Testing
**Scenario**: Your subgraphs implement feature flags, and you need to pass the client's feature flag context with each request.
**How it works**: Clients send their feature flag state in extensions: `{"extensions":{"features":{"newCheckout":true,"betaSearch":false}}}`. Subgraphs receive this context and adjust behavior accordingly.
**Outcome**: Seamless feature flag propagation through your federated graph without header complexity.

### Use Case 3: Client Metadata for Analytics
**Scenario**: Your backend needs client metadata (app version, platform, session ID) for analytics and debugging, structured as JSON rather than individual headers.
**How it works**: Clients include metadata in the extensions object: `{"extensions":{"client":{"version":"2.1.0","platform":"ios","sessionId":"abc123"}}}`. Subgraphs log or process this data as needed.
**Outcome**: Rich client context available to all subgraphs in a structured, easy-to-parse format.

---

## Technical Summary

### How It Works
The Cosmo Router examines the `extensions` field in incoming GraphQL requests. For queries and mutations, this is part of the standard HTTP JSON body. For subscriptions using the graphql-ws protocol, extensions are included in the subscription message payload. The router automatically includes these extensions in all subgraph requests, preserving the original structure.

### Key Technical Features
- Automatic forwarding of the `extensions` field to all subgraphs
- Support for queries, mutations, and subscriptions
- JSON structure preserved exactly as sent by client
- Compatible with graphql-ws subscription protocol
- No configuration required - enabled by default

### Integration Points
- Works with all GraphQL client libraries that support extensions
- Compatible with graphql-ws subscription protocol
- Integrates with subgraph authorization middleware

### Requirements & Prerequisites
- Subgraphs must be designed to read and process extensions
- Clients must use GraphQL libraries that support extensions field
- For subscriptions: graphql-ws compatible WebSocket setup

---

## Documentation References

- Primary docs: `/docs/router/proxy-capabilities/forward-client-extensions`
- Subscriptions guide: `/docs/router/subscriptions`
- Subscription extensions: `/docs/router/subscriptions#using-the-extensions-field`
- GraphQL over HTTP spec: `https://github.com/graphql/graphql-over-http`

---

## Keywords & SEO

### Primary Keywords
- GraphQL extensions field
- Forward extensions to subgraphs
- Subscription initialization data

### Secondary Keywords
- GraphQL client metadata
- Federation extensions support
- WebSocket subscription tokens

### Related Search Terms
- How to pass data to GraphQL subgraphs
- GraphQL subscription authentication
- GraphQL over HTTP extensions

---

## Version History

| Date | Version | Changes |
|------|---------|---------|
| 2025-01-14 | 1.0 | Initial capability documentation |
