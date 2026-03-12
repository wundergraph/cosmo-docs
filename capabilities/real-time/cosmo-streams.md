# Cosmo Streams (EDFS)

Event-driven federated subscriptions with Kafka, NATS, and Redis integration.

---

## Metadata

| Field | Value |
|-------|-------|
| **Capability ID** | `cap-realtime-002` |
| **Category** | Real-Time |
| **Status** | GA |
| **Availability** | Free, Pro, Enterprise |
| **Related Capabilities** | `cap-realtime-001` (GraphQL Subscriptions) |

---

## Quick Reference

### Name
Cosmo Streams (EDFS)

### Tagline
Scalable subscriptions powered by your event infrastructure.

### Elevator Pitch
Cosmo Streams fundamentally reimagines GraphQL subscriptions by connecting the Router directly to message brokers like Kafka, NATS, and Redis. Subgraphs remain completely stateless - they simply emit events to your existing messaging infrastructure. The Router handles all subscription state, client connections, and data resolution, enabling serverless deployments and dramatic scalability improvements.

---

## Problem & Solution

### The Problem
Traditional GraphQL subscriptions require subgraphs to maintain long-lived WebSocket connections, implement subscription loops, and track active subscriptions in memory. This stateful architecture prevents serverless deployments, creates tight coupling between graph architecture and runtime environment, and consumes significant resources - up to 3 WebSocket connections per client (client-to-router, router-to-subgraph, plus internal subgraph state). At 10,000 clients, this can mean 30GB+ of memory just for connection overhead.

### The Solution
Cosmo Streams treats subscriptions as an event-driven problem rather than a connection-driven one. Subgraphs publish events to Kafka, NATS, or Redis when data changes. The Router subscribes to these events, determines affected client subscriptions, deduplicates work, fetches required data via plain HTTP requests, and broadcasts updates to clients. All subscription state lives in the Router where it can be optimized, monitored, and scaled efficiently.

### Before & After

| Before Cosmo | With Cosmo Streams |
|--------------|-------------------|
| 3 WebSocket connections per client | 1 client connection, HTTP to subgraphs |
| Subgraphs must be stateful | Subgraphs are completely stateless |
| No serverless deployment option | Full serverless compatibility |
| Subscription logic in every subgraph | Zero subscription code in subgraphs |
| 30GB memory for 10k clients | ~150-200MB for 10k clients |

---

## Key Benefits

1. **Stateless Subgraphs**: Subgraphs never hold WebSocket connections or subscription state, making them ideal for Lambda, Cloud Run, or any serverless environment
2. **Massive Resource Efficiency**: 10,000 connected clients consume only 150-200MB of memory with near-zero CPU when idle, versus gigabytes with traditional subscriptions
3. **Event-Native Architecture**: Subscriptions integrate naturally with existing Kafka, NATS, or Redis infrastructure rather than introducing proprietary protocols
4. **Centralized Connection Management**: All client connections live in the Router where they can be optimized, deduplicated, and monitored efficiently
5. **Zero Subscription Logic in Subgraphs**: No WebSocket servers, no callback protocols, no proprietary APIs - subgraphs just publish events and respond to HTTP requests

---

## Target Audience

### Primary Persona
- **Role**: Platform Engineer / Backend Architect
- **Pain Points**: Current subscription architecture is expensive, stateful, and blocks serverless adoption; scaling is painful and costly
- **Goals**: Reduce infrastructure costs; enable serverless for all services; leverage existing event infrastructure

### Secondary Personas
- Backend Developers who want to add real-time features without implementing WebSocket servers
- DevOps Engineers managing subscription infrastructure and connection scaling
- Engineering Managers evaluating total cost of ownership for real-time features

---

## Use Cases

### Use Case 1: Serverless Real-Time Updates
**Scenario**: A company wants to move their GraphQL subgraphs to AWS Lambda but can't because subscriptions require persistent connections
**How it works**: Subgraphs publish entity update events to NATS when data changes. The Router subscribes to relevant topics and fetches current state via HTTP when events arrive. Lambda functions handle only stateless HTTP requests.
**Outcome**: Full serverless deployment with real-time subscription support; pay only for actual compute usage

### Use Case 2: Long-Running Job Tracking
**Scenario**: Users submit data processing jobs and need to track progress through multiple stages handled by different backend services
**How it works**: A mutation kicks off the job. Each backend service (data validation, processing, export) publishes progress events to Kafka. Clients subscribe to job status. The Router aggregates state from multiple subgraphs on each event.
**Outcome**: Users see real-time progress without polling; backend services remain decoupled and independently scalable

### Use Case 3: High-Scale Notification System
**Scenario**: A platform needs to push updates to 100,000+ concurrent users without breaking the infrastructure budget
**How it works**: Backend services publish notifications to Redis Pub/Sub. The Router handles all client WebSocket connections with efficient epoll/kqueue I/O. Subscription deduplication ensures each unique notification is fetched only once regardless of subscriber count.
**Outcome**: 100x improvement in clients-per-server compared to traditional architecture

### Use Case 4: Federated Entity Updates
**Scenario**: An Employee entity has fields from multiple subgraphs (HR, Payroll, Projects). Any subgraph update should notify subscribers.
**How it works**: Each subgraph publishes to the same NATS subject when their Employee fields change. The Router receives the event, resolves current field values from all contributing subgraphs via HTTP, and pushes the complete entity to subscribers.
**Outcome**: True federated real-time updates without inter-subgraph coordination

---

## Competitive Positioning

### Key Differentiators
1. Direct integration with production message brokers (Kafka, NATS, Redis) rather than proprietary protocols
2. Complete elimination of subscription state from subgraphs
3. Efficient epoll/kqueue-based I/O handling tens of thousands of connections
4. Automatic subscription deduplication and resource cleanup
5. Support for subscription filtering with dynamic conditions

### Comparison with Alternatives

| Aspect | Cosmo Streams | Traditional GraphQL Subscriptions | Custom Event Gateway |
|--------|---------------|----------------------------------|---------------------|
| Subgraph State | Stateless | Stateful (WebSockets) | Varies |
| Serverless Compatible | Yes | No | Requires custom work |
| Message Broker Integration | Native (Kafka, NATS, Redis) | None | DIY |
| Memory per 10k clients | ~150-200MB | ~30GB | Varies |
| Subscription Deduplication | Automatic | Manual | DIY |

### Common Objections & Responses

| Objection | Response |
|-----------|----------|
| "We don't use Kafka/NATS/Redis" | Many organizations already have message infrastructure; NATS is lightweight to add if not |
| "We already have WebSocket subscriptions working" | Consider the TCO: Cosmo Streams can reduce infrastructure costs by 90%+ while enabling serverless |
| "Isn't this adding another moving part?" | You're replacing multiple stateful subscription systems with your existing message broker; net simplification |
| "What about subscription authorization?" | Filter subscriptions using the @openfed__subscriptionFilter directive; additional auth options available |

---

## Technical Summary

### How It Works
Event-Driven Subgraphs define schema directives (@edfs__kafkaSubscribe, @edfs__natsSubscribe, @edfs__redisSubscribe) that map subscription fields to message broker topics. The Router connects to configured brokers and subscribes to relevant topics. When a message arrives, the Router identifies affected client subscriptions, deduplicates fetch requests, resolves entity data via HTTP from subgraphs, and broadcasts results to clients over WebSocket, SSE, or Multipart HTTP.

### Key Technical Features
- Kafka, NATS, and Redis Pub/Sub provider support
- NATS JetStream for persistent, replayable event streams
- NATS Request/Reply for synchronous event-driven queries
- Publish directives for GraphQL mutations that emit events
- Topic templating with argument interpolation (e.g., `employeeUpdated.{{ args.id }}`)
- Subscription filtering with AND/OR/NOT/IN conditions
- Provider ID configuration for multiple broker instances
- Automatic subscription deduplication
- Epoll/Kqueue I/O for efficient connection handling
- ~40 goroutines for 10k idle clients

### Integration Points
- Apache Kafka clusters
- NATS and NATS JetStream servers
- Redis Pub/Sub
- Any service that can publish to these message systems
- Existing federated subgraphs (resolved via HTTP)

### Requirements & Prerequisites
- Cosmo Router with events configuration
- At least one supported message broker (Kafka, NATS, or Redis)
- Event-Driven Subgraph schema definitions (no implementation needed)
- Services publishing events to the configured topics

---

## Proof Points

### Metrics & Benchmarks
- 10,000 clients connected: ~150-200MB memory, 0% CPU when idle
- 10,000 idle clients require only ~40 goroutines
- Supports multi-core scaling for 10k+ events per second
- 95%+ reduction in memory usage compared to traditional WebSocket subscriptions

---

## Documentation References

- Primary docs: `/docs/router/cosmo-streams`
- Kafka integration: `/docs/router/cosmo-streams/kafka`
- NATS integration: `/docs/router/cosmo-streams/nats`
- Redis integration: `/docs/router/cosmo-streams/redis`
- Federation concepts: `/docs/federation/event-driven-federated-subscriptions`
- Router configuration: `/docs/router/configuration`

---

## Keywords & SEO

### Primary Keywords
- Event-driven GraphQL subscriptions
- Kafka GraphQL
- NATS GraphQL

### Secondary Keywords
- EDFS
- Cosmo Streams
- Redis GraphQL subscriptions
- Serverless GraphQL subscriptions
- Federated subscriptions

### Related Search Terms
- GraphQL event sourcing
- Message broker GraphQL integration
- Stateless GraphQL subscriptions
- Scalable real-time GraphQL
- GraphQL Kafka integration
- GraphQL NATS integration

---

## Version History

| Date | Version | Changes |
|------|---------|---------|
| 2025-01-14 | 1.0 | Initial capability documentation |
