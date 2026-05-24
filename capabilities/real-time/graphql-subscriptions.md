# GraphQL Subscriptions

Real-time GraphQL updates with multiple protocol support and connection multiplexing.

---

## Metadata

| Field | Value |
|-------|-------|
| **Capability ID** | `cap-realtime-001` |
| **Category** | Real-Time |
| **Status** | GA |
| **Availability** | Free, Pro, Enterprise |
| **Related Capabilities** | `cap-realtime-002` (Cosmo Streams) |

---

## Quick Reference

### Name
GraphQL Subscriptions

### Tagline
Real-time updates with zero limitations.

### Elevator Pitch
Cosmo Router provides out-of-the-box subscription support with multiple protocol options including WebSockets, Server-Sent Events, and Multipart HTTP. Connection multiplexing optimizes resource usage by sharing connections across clients with identical authentication, making real-time features scalable and efficient.

---

## Problem & Solution

### The Problem
Building real-time features in GraphQL applications requires managing long-lived connections between clients and servers. Teams struggle with choosing the right protocol for their use case, handling connection overhead at scale, and ensuring compatibility between different client types and backend services. Without proper multiplexing, each client subscription opens a separate connection to backend subgraphs, leading to resource exhaustion.

### The Solution
Cosmo Router acts as a smart subscription gateway that supports multiple real-time protocols out of the box. It automatically multiplexes client connections, routing multiple subscriptions with the same authentication through a single connection to subgraphs. Teams can choose the optimal protocol for each use case without changing their architecture.

### Before & After

| Before Cosmo | With Cosmo |
|--------------|------------|
| Limited to one subscription protocol | Choose from WebSockets, SSE, or Multipart HTTP |
| Each client opens a new backend connection | Multiplexed connections share resources efficiently |
| Manual protocol negotiation logic | Automatic protocol translation between clients and subgraphs |
| Connection overhead limits scale | Handle thousands of concurrent subscriptions |

---

## Key Benefits

1. **Protocol Flexibility**: Support graphql-ws, SSE, Multipart HTTP, subscriptions-transport-ws, and Absinthe protocols between clients and subgraphs without code changes
2. **Efficient Resource Usage**: Connection multiplexing groups subscriptions with identical headers into shared connections, dramatically reducing memory and connection overhead
3. **Zero Configuration**: Subscriptions work immediately with sensible defaults; customize protocols per-subgraph as needed
4. **Legacy Compatibility**: Support older clients using subscriptions-transport-ws or Absinthe while modernizing backend services
5. **Extension Support**: Pass additional metadata like Bearer tokens through the GraphQL extensions field, automatically forwarded to all subgraph requests

---

## Target Audience

### Primary Persona
- **Role**: Frontend Developer / Full-Stack Developer
- **Pain Points**: Need real-time updates but constrained by client library protocol support; worried about connection overhead in production
- **Goals**: Ship real-time features quickly; ensure they scale with user growth

### Secondary Personas
- Platform Engineers managing API infrastructure and connection resources
- Backend Developers implementing subgraph subscription resolvers
- DevOps Engineers monitoring WebSocket connection counts and memory usage

---

## Use Cases

### Use Case 1: Live Dashboard Updates
**Scenario**: A fintech application displays real-time stock prices and portfolio values to thousands of concurrent users
**How it works**: Clients connect via graphql-ws WebSocket protocol. The Router multiplexes all subscriptions for the same stock symbols through shared connections to the pricing subgraph. Header-based authentication ensures proper connection grouping.
**Outcome**: 10,000 connected clients consume the connection resources of hundreds rather than thousands of backend connections

### Use Case 2: Hybrid Client Support
**Scenario**: An enterprise application has legacy mobile apps using subscriptions-transport-ws and modern web clients using graphql-ws
**How it works**: The Router accepts both protocols from clients while communicating with subgraphs using the modern graphql-ws protocol. Protocol translation is automatic and transparent.
**Outcome**: Teams modernize backend services without breaking existing mobile app versions

### Use Case 3: Resource-Efficient Notifications
**Scenario**: A collaboration platform needs to push notifications but wants to minimize server resources
**How it works**: Clients use Server-Sent Events (SSE) instead of WebSockets for one-way notification streams. SSE uses less memory than WebSocket connections and works better through certain proxies.
**Outcome**: Notification system scales to more concurrent users with the same infrastructure

---

## Competitive Positioning

### Key Differentiators
1. Widest protocol support including legacy Absinthe for Phoenix/Elixir ecosystems
2. Automatic connection multiplexing based on authentication context
3. Per-subgraph protocol configuration allowing gradual modernization
4. Built-in extension field forwarding for custom metadata

### Comparison with Alternatives

| Aspect | Cosmo | Apollo Router | DIY Gateway |
|--------|-------|---------------|-------------|
| Protocol Options | 5 protocols | 2 protocols | Custom only |
| Connection Multiplexing | Automatic | Limited | Manual |
| Legacy Protocol Support | Yes (Absinthe, subscriptions-transport-ws) | No | DIY |
| Configuration | Per-subgraph | Global | Complex |

### Common Objections & Responses

| Objection | Response |
|-----------|----------|
| "We only need WebSockets" | Start with graphql-ws and add SSE or Multipart later as needs evolve; the flexibility is built-in |
| "Our backend doesn't support all protocols" | Configure the optimal protocol per-subgraph; the Router handles translation |
| "WebSocket connections are expensive" | Multiplexing dramatically reduces backend connections; consider SSE for unidirectional updates |

---

## Technical Summary

### How It Works
The Cosmo Router establishes long-lived connections with clients using their preferred protocol (WebSocket variants, SSE, or Multipart HTTP). When multiple clients subscribe to the same data with matching authentication headers, the Router groups these into a single upstream connection to the subgraph. The Router handles protocol translation, heartbeats, reconnection, and graceful termination.

### Key Technical Features
- graphql-ws WebSocket subprotocol (default, recommended)
- Server-Sent Events with GET and POST request support
- Multipart HTTP for chunked subscription responses
- subscriptions-transport-ws for legacy client compatibility
- Absinthe (Phoenix) protocol for Elixir ecosystems
- Extension field forwarding for custom authentication tokens
- Header-based subscription grouping for multiplexing
- Automatic connection cleanup on router config updates

### Integration Points
- Any GraphQL client library supporting standard subscription protocols
- Subgraphs implementing graphql-ws, SSE, or legacy protocols
- Load balancers and proxies (SSE recommended for HTTP/1.1 environments)
- Authentication systems via header forwarding

### Requirements & Prerequisites
- Cosmo Router deployment
- Subgraphs with subscription support (protocol configurable via CLI)
- Client library supporting at least one of the supported protocols

---

## Proof Points

### Metrics & Benchmarks
- Connection multiplexing can reduce backend connections by 90%+ for common subscription patterns
- SSE uses approximately 50% less memory per connection compared to WebSockets
- Supports thousands of concurrent subscriptions per Router instance

---

## Documentation References

- Primary docs: `/docs/router/subscriptions`
- WebSocket protocols: `/docs/router/subscriptions/websocket-subprotocols`
- Server-Sent Events: `/docs/router/subscriptions/server-sent-events-sse`
- Multipart HTTP: `/docs/router/subscriptions/multipart-http-requests`
- Subgraph configuration: `/docs/cli/subgraph/create`, `/docs/cli/subgraph/update`
- Header forwarding: `/docs/router/proxy-capabilities`

---

## Keywords & SEO

### Primary Keywords
- GraphQL subscriptions
- Real-time GraphQL
- WebSocket GraphQL

### Secondary Keywords
- graphql-ws
- Server-Sent Events
- SSE GraphQL
- Multipart HTTP subscriptions

### Related Search Terms
- GraphQL real-time updates
- WebSocket connection pooling
- GraphQL subscription protocols
- Federation subscriptions
- GraphQL push notifications

---

## Version History

| Date | Version | Changes |
|------|---------|---------|
| 2025-01-14 | 1.0 | Initial capability documentation |
