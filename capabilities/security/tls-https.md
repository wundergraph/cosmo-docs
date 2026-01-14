# TLS/HTTPS

## Metadata

| Field | Value |
|-------|-------|
| **Capability ID** | `cap-sec-003` |
| **Category** | Security |
| **Status** | GA |
| **Availability** | Free, Pro, Enterprise |
| **Related Capabilities** | `cap-sec-005` (Security Hardening) |

---

## Quick Reference

### Name
TLS/HTTPS

### Tagline
Encrypted communication with TLS and mutual authentication.

### Elevator Pitch
Cosmo Router supports TLS and mTLS (mutual TLS) for secure, encrypted communication between clients, the router, and your infrastructure components. Enable HTTPS for client connections, automatic encryption for subgraph communication, and bidirectional certificate verification for zero-trust environments.

---

## Problem & Solution

### The Problem
GraphQL APIs transmitting sensitive data over unencrypted connections are vulnerable to eavesdropping, man-in-the-middle attacks, and data interception. In modern architectures with load balancers, service meshes, and distributed subgraphs, ensuring end-to-end encryption can be complex. Additionally, many environments require mutual authentication where both client and server verify each other's identity.

### The Solution
Cosmo Router's TLS support provides simple configuration-driven encryption for all communication channels. Enable TLS for client connections with standard certificate files, automatically secure subgraph connections via HTTPS URLs, and implement mutual TLS for zero-trust architectures. When TLS is enabled, HTTP/2 is automatically available for improved performance.

### Before & After

| Before Cosmo | With Cosmo |
|--------------|------------|
| Unencrypted traffic vulnerable to interception | TLS encryption for all connections |
| Manual HTTP/2 configuration | Automatic HTTP/2 upgrade with TLS |
| Complex mTLS setup | Simple configuration for mutual authentication |
| Inconsistent encryption policies | Centralized TLS configuration at the router |

---

## Key Benefits

1. **Simple Configuration**: Enable TLS with just a certificate and key file path in YAML configuration, no code changes required.

2. **Automatic HTTP/2**: When TLS is enabled, requests are automatically upgraded to HTTP/2 for multiplexing, header compression, and improved performance.

3. **Mutual TLS Support**: Configure client authentication to verify client certificates, enabling zero-trust security where both parties authenticate each other.

4. **Comprehensive Protocol Support**: Supports TLS 1.0 through 1.3, with a wide range of cipher suites following Go's secure defaults.

5. **Subgraph Encryption**: Automatic TLS for subgraph connections when using HTTPS URLs, ensuring end-to-end encryption.

---

## Target Audience

### Primary Persona
- **Role**: Platform Engineer / DevOps Engineer
- **Pain Points**: Securing communication between infrastructure components; implementing zero-trust security; enabling HTTP/2 performance benefits
- **Goals**: End-to-end encryption; mutual authentication; compliance with security requirements

### Secondary Personas
- Security engineers implementing encryption policies
- Architects designing secure network topologies
- Compliance officers ensuring data-in-transit encryption

---

## Use Cases

### Use Case 1: Secure Load Balancer Communication
**Scenario**: An organization requires encrypted communication between their load balancer and the Cosmo Router to protect traffic within their infrastructure.

**How it works**: Configure TLS on the router with server certificate and key files. The load balancer connects via HTTPS, and all traffic between the load balancer and router is encrypted.

**Outcome**: Secure internal communication preventing eavesdropping on traffic between infrastructure components.

### Use Case 2: Zero-Trust Client Authentication
**Scenario**: A financial services company requires mutual TLS where both clients and the server authenticate each other before establishing connections.

**How it works**: Enable TLS server configuration with client authentication. Configure `client_auth.required: true` and provide the CA certificate for validating client certificates. Clients must present valid certificates to connect.

**Outcome**: Bidirectional authentication ensuring only authorized clients can connect to the GraphQL API.

### Use Case 3: HTTP/2 Performance Optimization
**Scenario**: A high-traffic API needs the performance benefits of HTTP/2, including multiplexing and header compression.

**How it works**: Enable TLS on the router. HTTP/2 is automatically available when TLS is configured, and clients supporting HTTP/2 are automatically upgraded.

**Outcome**: Improved API performance through HTTP/2 features, with all connections encrypted.

---

## Technical Summary

### How It Works
The Cosmo Router TLS implementation uses Go's standard TLS library. When TLS is enabled, the router listens for HTTPS connections using the provided certificate and key files. For subgraph connections, HTTPS is automatically used when subgraph URLs specify the https:// protocol. Client authentication (mTLS) adds an additional handshake step where the client presents its certificate, which the router validates against the configured CA certificate.

### Key Technical Features
- TLS server configuration with PEM certificate and key files
- Support for TLS 1.0, 1.1, 1.2, and 1.3
- Comprehensive cipher suite support (ECDHE, GCM, CBC, ChaCha20)
- Optional client authentication for mTLS
- Required mode for enforcing client certificates
- Automatic HTTP/2 upgrade with TLS

### Integration Points
- Load balancers and reverse proxies
- Client applications with TLS support
- Subgraphs via HTTPS URLs
- Certificate management systems

### Requirements & Prerequisites
- Router version 0.71.0 or higher
- Valid TLS certificate and private key in PEM format
- For mTLS: CA certificate for client validation
- Client certificates signed by trusted CA (for mTLS)

---

## Documentation References

- Primary docs: `/docs/router/security/tls`
- Security hardening guide: `/docs/router/security/hardening-guide`
- Router configuration: `/docs/router/configuration`

---

## Keywords & SEO

### Primary Keywords
- GraphQL TLS
- GraphQL HTTPS
- mTLS GraphQL

### Secondary Keywords
- Mutual TLS GraphQL
- HTTP/2 GraphQL
- GraphQL encryption

### Related Search Terms
- Secure GraphQL API
- GraphQL certificate authentication
- Enable HTTPS GraphQL server

---

## Version History

| Date | Version | Changes |
|------|---------|---------|
| 2025-01-14 | 1.0 | Initial capability documentation |
