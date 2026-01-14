# JWT Authentication

## Metadata

| Field | Value |
|-------|-------|
| **Capability ID** | `cap-sec-001` |
| **Category** | Security |
| **Status** | GA |
| **Availability** | Free, Pro, Enterprise |
| **Related Capabilities** | `cap-sec-002` (Authorization Directives) |

---

## Quick Reference

### Name
JWT Authentication

### Tagline
Secure your GraphQL API with industry-standard JWT validation.

### Elevator Pitch
Cosmo Router provides enterprise-grade JWT authentication using JWKS (JSON Web Key Sets), enabling seamless integration with any OAuth 2.0 or OpenID Connect identity provider. Configure multiple authentication providers, support various signing algorithms, and protect your federated graph with zero custom code.

---

## Problem & Solution

### The Problem
Organizations deploying GraphQL APIs face the challenge of implementing robust authentication that works across their entire federated architecture. Teams often struggle with integrating multiple identity providers, handling token validation at scale, and ensuring consistent security policies across all subgraphs. Without proper authentication, APIs are vulnerable to unauthorized access and data breaches.

### The Solution
Cosmo Router's JWT Authentication provides a centralized, configuration-driven approach to securing your GraphQL API. By validating JWTs at the router level before requests reach subgraphs, it ensures consistent security enforcement. The router automatically fetches and caches JWKS from your identity providers, validates tokens against configured algorithms, and makes authenticated claims available throughout the request pipeline.

### Before & After

| Before Cosmo | With Cosmo |
|--------------|------------|
| Each subgraph implements its own authentication logic | Single point of authentication at the router |
| Complex integration code for each identity provider | Declarative YAML configuration for multiple providers |
| Inconsistent security policies across services | Uniform authentication enforcement across all subgraphs |
| Manual key rotation handling | Automatic JWKS refresh with configurable intervals |

---

## Key Benefits

1. **Multi-Provider Support**: Configure multiple JWKS endpoints to support various identity providers simultaneously, with automatic fallback and priority ordering.

2. **Automatic Key Management**: JWKS keys are automatically fetched and refreshed at configurable intervals, with intelligent on-demand refresh for unknown Key IDs during key rotation.

3. **Flexible Token Sources**: Extract tokens from multiple header sources with custom prefixes, supporting various authentication schemes beyond standard Bearer tokens.

4. **Algorithm Whitelisting**: Specify allowed JWT algorithms per JWKS endpoint to prevent algorithm confusion attacks and ensure cryptographic security.

5. **Symmetric Key Support**: In addition to asymmetric JWKS endpoints, support for symmetric algorithms (like HS256) with secure secret configuration.

---

## Target Audience

### Primary Persona
- **Role**: Platform Engineer / Security Engineer
- **Pain Points**: Implementing consistent authentication across distributed services; managing multiple identity providers; ensuring secure key rotation
- **Goals**: Centralized security enforcement; reduced authentication code; compliance with security standards

### Secondary Personas
- Backend developers building authenticated GraphQL services
- DevOps engineers managing API gateway security
- Architects designing secure federated architectures

---

## Use Cases

### Use Case 1: Multi-Tenant SaaS Authentication
**Scenario**: A SaaS platform needs to authenticate users from multiple enterprise customers, each with their own identity provider (Okta, Auth0, Azure AD).

**How it works**: Configure multiple JWKS endpoints in the router configuration, one for each customer's identity provider. The router tries each provider in order until authentication succeeds, extracting claims from the validated token.

**Outcome**: Seamless multi-tenant authentication without custom code, supporting customer-specific identity providers while maintaining a unified API.

### Use Case 2: Secure Internal API Gateway
**Scenario**: An organization wants to enforce authentication on all GraphQL requests while allowing introspection queries for internal tooling without tokens.

**How it works**: Enable JWT authentication with `ignore_introspection: true` and optionally set an introspection secret. Regular queries require valid JWTs, while introspection queries from trusted internal tools bypass authentication.

**Outcome**: Strong authentication for production traffic with developer-friendly introspection access for internal tooling.

### Use Case 3: Zero-Downtime Key Rotation
**Scenario**: The security team rotates JWT signing keys monthly, but tokens signed with old keys remain valid during the transition period.

**How it works**: Enable `refresh_unknown_kid` with rate limiting. When the router encounters a token with an unknown Key ID, it automatically fetches updated JWKS, supporting seamless key rotation without service interruption.

**Outcome**: Smooth key rotation with no manual intervention, maintaining security while ensuring zero downtime.

---

## Technical Summary

### How It Works
The Cosmo Router intercepts incoming GraphQL requests and extracts JWT tokens from configured header sources. It validates tokens against cached JWKS from configured endpoints, checking signatures, algorithms, and optional audience claims. Valid tokens have their claims decoded and made available to the request pipeline, including custom modules and authorization directives. Invalid tokens result in 403 Forbidden responses, while missing tokens (when authentication is not required) allow anonymous access.

### Key Technical Features
- Multiple JWKS endpoint configuration with per-endpoint algorithm whitelisting
- Configurable token extraction from headers with custom prefixes
- Automatic JWKS refresh with configurable intervals
- On-demand refresh for unknown Key IDs with rate limiting
- Symmetric algorithm support for HS256/HS384/HS512
- Optional audience validation per JWKS endpoint
- Introspection bypass with optional secret authentication

### Integration Points
- Any OAuth 2.0 / OpenID Connect identity provider
- Custom modules for accessing authenticated claims
- Authorization directives (@authenticated, @requiresScopes)
- Request tracing and observability

### Requirements & Prerequisites
- Router version 0.60.0 or higher for authorization directive support
- HTTPS endpoints for JWKS (recommended for security)
- Valid JWT tokens from configured identity providers

---

## Documentation References

- Primary docs: `/docs/router/authentication-and-authorization`
- Authorization directives: `/docs/federation/directives/authenticated`
- Scopes directive: `/docs/federation/directives/requiresscopes`
- Configuration reference: `/docs/router/configuration#authentication`

---

## Keywords & SEO

### Primary Keywords
- GraphQL JWT authentication
- JWKS authentication
- GraphQL API security

### Secondary Keywords
- OAuth 2.0 GraphQL
- OpenID Connect GraphQL
- Token validation

### Related Search Terms
- How to secure GraphQL API
- GraphQL authentication best practices
- JWT validation in GraphQL federation

---

## Version History

| Date | Version | Changes |
|------|---------|---------|
| 2025-01-14 | 1.0 | Initial capability documentation |
