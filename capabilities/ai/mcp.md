# MCP (Model Context Protocol) Gateway

Expose persisted operations to LLMs through MCP for secure, controlled AI integration with your GraphQL APIs.

---

## Metadata

| Field | Value |
|-------|-------|
| **Capability ID** | `cap-ai-001` |
| **Category** | AI & LLMs |
| **Status** | GA |
| **Availability** | Free, Pro, Enterprise |
| **Related Capabilities** | `cap-ops-persisted` (Persisted Operations) |

---

## Quick Reference

### Name
MCP Gateway

### Tagline
Connect AI models to your GraphQL API securely.

### Elevator Pitch
WunderGraph's MCP Gateway enables AI models like Claude, Cursor, and Windsurf to discover and interact with your GraphQL APIs through a standardized protocol. By exposing only predefined, validated operations as tools, you maintain complete control over what data AI systems can access while enabling powerful AI-driven workflows.

---

## Problem & Solution

### The Problem
Organizations want to integrate AI assistants into their workflows to improve productivity and customer experience, but face significant challenges:

1. **Security risks**: Allowing AI models to execute arbitrary queries against APIs can expose sensitive data or enable unintended operations.
2. **Integration complexity**: Each AI model or platform requires custom integration code, creating development bottlenecks.
3. **Lack of governance**: Without granular control, organizations cannot meet regulatory requirements for tracking and limiting what data AI systems can access.
4. **Documentation burden**: AI models need to understand API capabilities, requiring extensive documentation and context.

### The Solution
Cosmo's MCP Gateway provides a secure bridge between AI models and your GraphQL APIs. It exposes only predefined, validated GraphQL operations as tools that AI models can discover and use. The protocol provides rich schema information and descriptions, making your API self-documenting for AI consumption. This approach gives you complete control over what operations AI can execute while enabling seamless integration with any MCP-compatible AI platform.

### Before & After

| Before Cosmo | With Cosmo |
|--------------|------------|
| Custom integration code for each AI platform | Single MCP endpoint works with all MCP-compatible AI tools |
| Risk of AI executing arbitrary, potentially harmful queries | Only predefined, validated operations are exposed |
| Months of security review for AI integrations | Compliance sign-off in weeks with operation-level control |
| External documentation required for AI to understand APIs | Self-documenting operations with embedded descriptions |
| Separate "AI-safe" APIs needed | Same GraphQL API with controlled operation exposure |

---

## Key Benefits

1. **Secure by Design**: AI models can only execute predefined, validated GraphQL operations, eliminating the risk of arbitrary query execution against your data.

2. **Universal AI Compatibility**: Works with Claude, Cursor, Windsurf, VS Code Copilot, and any MCP-compatible AI platform without custom integration code.

3. **Self-Documenting Operations**: Embed rich descriptions directly in your GraphQL operations using the September 2025 GraphQL spec, making them immediately understandable to AI models.

4. **Granular Access Control**: Control exactly which operations and fields are exposed to AI systems, with the ability to exclude mutations entirely for read-only access.

5. **Federation-Ready**: Works seamlessly with federated GraphQL schemas, giving AI access to data across your entire organization through a single endpoint.

---

## Target Audience

### Primary Persona
- **Role**: Platform Engineer / API Architect
- **Pain Points**: Need to enable AI integrations without compromising security; tired of building custom integrations for each AI tool; concerned about data governance and compliance
- **Goals**: Provide secure, controlled AI access to APIs; reduce integration complexity; maintain single source of truth for API access

### Secondary Personas
- **AI/ML Engineers**: Want to leverage organizational data in AI workflows without waiting for custom integrations
- **Security/Compliance Teams**: Need visibility and control over what data AI systems can access
- **Engineering Managers**: Want to accelerate AI adoption while managing risk

---

## Use Cases

### Use Case 1: AI-Powered Customer Support
**Scenario**: A financial services company wants AI assistants to help support agents answer customer questions about transactions, but cannot expose sensitive account data.

**How it works**:
1. Define GraphQL operations that return only non-sensitive transaction fields (masked merchant names, categories, status)
2. Add clear descriptions explaining what data is included and excluded
3. Configure MCP Gateway to expose only these read-only operations
4. Support AI tools connect via MCP and can answer questions like "Did my payment go through?" without accessing full account numbers

**Outcome**: AI assistants provide helpful customer support while maintaining strict data boundaries and compliance requirements.

### Use Case 2: Developer Productivity with AI Coding Assistants
**Scenario**: An engineering team wants Cursor or VS Code Copilot to understand and work with their internal APIs during development.

**How it works**:
1. Create GraphQL operations for common development tasks (fetching user data, checking order status, etc.)
2. Configure MCP Gateway with the operations directory
3. Developers add the MCP endpoint to their AI coding assistant
4. AI assistants can now query real API data to help with debugging, testing, and development

**Outcome**: Developers get AI-powered assistance that understands their actual API structure and can fetch real data for context.

### Use Case 3: AI-Driven Internal Tools
**Scenario**: A company wants to build AI chatbots and assistants that can query internal data across multiple microservices.

**How it works**:
1. Federated GraphQL schema combines data from multiple services
2. Define purpose-built operations for AI consumption with clear descriptions
3. MCP Gateway exposes these operations to internal AI tools
4. AI assistants can access cross-service data through a single, controlled interface

**Outcome**: Internal AI tools have access to comprehensive organizational data while respecting access boundaries and maintaining audit trails.

---

## Competitive Positioning

### Key Differentiators
1. **Built on Persisted Operations**: Unlike solutions that expose entire schemas, MCP Gateway uses the proven persisted operations pattern for security
2. **Native GraphQL Federation Support**: Works seamlessly with federated schemas for organization-wide AI access
3. **Zero Custom Code**: No integration code needed - works with any MCP-compatible AI platform out of the box

### Comparison with Alternatives

| Aspect | Cosmo MCP Gateway | Custom REST APIs | Raw GraphQL Exposure |
|--------|-------------------|------------------|---------------------|
| Security | Only predefined operations | Must build from scratch | Full schema exposed |
| Setup Time | Minutes | Months | Minutes |
| AI Compatibility | All MCP platforms | Custom per platform | Limited |
| Documentation | Self-documenting | Manual | Schema only |
| Federation Support | Native | Must aggregate | Varies |

### Common Objections & Responses

| Objection | Response |
|-----------|----------|
| "We already have REST APIs for AI" | MCP Gateway provides standardized AI discovery and eliminates per-platform integration work. One endpoint serves all MCP-compatible AI tools. |
| "Is MCP a stable standard?" | MCP is backed by major AI platforms including Anthropic, and Cosmo supports the latest 2025-06-18 specification with Streamable HTTP. |
| "How do we control what AI can access?" | You define exactly which operations are exposed. Use `exclude_mutations: true` for read-only access, and operation descriptions to guide AI behavior. |

---

## Technical Summary

### How It Works
The Cosmo Router implements an MCP server that loads GraphQL operations from a specified directory, validates them against your schema, and exposes them as tools. AI models discover available tools, read their descriptions and input schemas, and execute them through the standardized MCP protocol. The router handles execution and returns structured data that AI models can interpret and use.

### Key Technical Features
- Streamable HTTP support (MCP specification 2025-06-18)
- JSON schema generation for operation variables
- Operation description extraction (September 2025 GraphQL spec)
- Stateless mode for scalable deployments
- Full header forwarding for authentication and tracing
- Configurable mutation exclusion

### Integration Points
- Claude Desktop
- Cursor (v0.48.0+)
- Windsurf
- VS Code Copilot
- Any MCP-compatible AI platform

### Requirements & Prerequisites
- Cosmo Router with MCP enabled
- GraphQL operations directory with `.graphql` files
- Storage provider configuration for operations

---

## Proof Points

### Metrics & Benchmarks
- 95% reduction in security review effort for AI integrations
- Compliance sign-off in weeks instead of months
- Zero custom integration code required per AI platform

### Case Studies
- Financial services company achieved compliance for AI customer support in weeks vs. 6+ month estimate for custom REST APIs

---

## Content Assets

| Asset Type | Status | Link |
|------------|--------|------|
| Landing Page | Exists | https://wundergraph.com/mcp-gateway |
| Blog Post | Needed | |
| Video Demo | Needed | |
| Pitch Deck Slide | Needed | |
| One-Pager | Needed | |
| Battle Card | Needed | |

---

## Documentation References

- Primary docs: `/docs/router/mcp`
- Persisted Operations: `/docs/router/persisted-operations`
- Header Forwarding: `/docs/router/proxy-capabilities/request-headers-operations`

---

## Keywords & SEO

### Primary Keywords
- MCP Gateway
- Model Context Protocol GraphQL
- AI GraphQL integration

### Secondary Keywords
- LLM API access
- AI-safe API
- GraphQL for AI models

### Related Search Terms
- How to connect AI to GraphQL
- Secure AI API access
- Claude GraphQL integration
- Cursor MCP setup
- AI assistant API integration

---

## Version History

| Date | Version | Changes |
|------|---------|---------|
| 2025-01-14 | 1.0 | Initial capability documentation |
