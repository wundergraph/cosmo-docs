# Slack Integration

Direct Slack channel notifications for federated graph events without any middleware.

---

## Metadata

| Field | Value |
|-------|-------|
| **Capability ID** | `cap-notifications-003` |
| **Category** | Notifications |
| **Status** | GA |
| **Availability** | Free, Pro, Enterprise |
| **Related Capabilities** | `cap-notifications-001`, `cap-notifications-002` |

---

## Quick Reference

### Name
Slack Integration

### Tagline
Graph updates delivered directly to your Slack channels.

### Elevator Pitch
Cosmo's native Slack Integration brings federated graph notifications directly into your team's communication hub. No middleware, no custom bots—just authorize the integration, select your channel, and start receiving instant alerts about schema changes. Keep your entire team informed without leaving Slack.

---

## Problem & Solution

### The Problem
Development teams live in Slack. When federated graph schemas change, the people who need to know are scattered across channels, time zones, and responsibilities. Building custom Slack bots or routing webhooks through middleware adds complexity, maintenance burden, and potential points of failure. Teams end up missing critical updates or spending hours building integrations that should be standard.

### The Solution
Cosmo provides native Slack integration that connects directly to your workspace with a few clicks. Authorize the WunderGraph Cosmo app, select your notification channel, choose which events to receive, and you're done. No code to write, no infrastructure to maintain—just reliable, instant notifications where your team already works.

### Before & After

| Before Cosmo | With Cosmo |
|--------------|------------|
| Building custom Slack bots | Native one-click integration |
| Routing webhooks through middleware | Direct Slack API connection |
| Maintaining bot infrastructure | Zero maintenance overhead |
| Manual notification setup per channel | Organization-wide configuration |

---

## Key Benefits

1. **Zero-Code Setup**: Connect to Slack in minutes with OAuth-based authorization, no development required
2. **Native Integration**: Direct connection to Slack's API, not a workaround through webhooks or middleware
3. **Channel Flexibility**: Send notifications to any channel in your workspace
4. **Event Selection**: Subscribe only to the events your team cares about
5. **Team Visibility**: Keep everyone informed in the collaboration tool they already use daily

---

## Target Audience

### Primary Persona
- **Role**: Engineering Manager / Team Lead
- **Pain Points**: Keeping the team informed about graph changes without creating noise; avoiding custom integration maintenance
- **Goals**: Streamline team communication; ensure critical updates reach the right people

### Secondary Personas
- Platform engineers who want simple notification setup
- Developers who prefer receiving updates in Slack over email
- DevOps teams managing notification infrastructure

---

## Use Cases

### Use Case 1: Team-Wide Schema Change Awareness
**Scenario**: A platform team wants all engineers to see when the federated graph schema updates so they can check for impacts on their services.
**How it works**: Set up Slack integration pointing to a shared engineering channel. Subscribe to `FEDERATED_GRAPH_SCHEMA_UPDATED` events. When any schema change occurs, the entire team sees it instantly in their daily communication channel.
**Outcome**: No more "I didn't know that changed" moments—everyone is informed simultaneously.

### Use Case 2: Dedicated Alerts Channel
**Scenario**: An organization wants to separate graph notifications from regular team chat to maintain focus while ensuring visibility.
**How it works**: Create a dedicated `#graph-alerts` channel in Slack. Configure the Cosmo Slack integration to post all notifications to this channel. Team members can join to stay informed or configure Slack notifications based on their role.
**Outcome**: Clean separation between alerts and discussion, with full visibility available to those who need it.

### Use Case 3: Multi-Channel Notification Routing
**Scenario**: Different teams need to know about changes to different federated graphs in a multi-graph organization.
**How it works**: Set up multiple Slack integrations, each with a descriptive name and pointing to different team channels. Configure each integration to receive events relevant to that team's graphs.
**Outcome**: Targeted notifications reach the right teams without flooding everyone with irrelevant updates.

---

## Competitive Positioning

### Key Differentiators
1. True native Slack integration using official Slack OAuth, not webhook-to-Slack bridges
2. Purpose-built for GraphQL federation events with meaningful, formatted messages
3. Multiple named integrations per organization for complex notification routing

### Comparison with Alternatives

| Aspect | Cosmo Slack Integration | Webhook + Slack Middleware | Custom Slack Bot |
|--------|-------------------------|---------------------------|------------------|
| Setup time | 2 minutes | 30+ minutes | Hours/days |
| Code required | None | Some | Significant |
| Maintenance | None | Medium | High |
| Official Slack OAuth | Yes | No | Yes |
| GraphQL-aware messages | Yes | Requires custom formatting | Requires implementation |

### Common Objections & Responses

| Objection | Response |
|-----------|----------|
| "We already have a custom Slack bot" | Cosmo's integration is purpose-built for federation events and requires zero maintenance—let your bot handle other tasks |
| "We need custom message formatting" | For advanced customization, use webhooks with your own formatting; for standard use cases, the native integration provides clear, consistent messages |
| "What permissions does it need?" | The integration only requests permission to post to the channel you select—no access to messages, files, or other channels |

---

## Technical Summary

### How It Works
Cosmo's Slack Integration uses Slack's official OAuth 2.0 flow. When you click "Integrate," you're redirected to Slack to authorize the WunderGraph Cosmo app and select a channel. Once authorized, you name the integration and select which events to receive. Cosmo then posts formatted notifications directly to your chosen channel via the Slack API whenever subscribed events occur.

### Key Technical Features
- Official Slack OAuth 2.0 authorization flow
- Channel selection during setup
- Named integrations for easy management
- Event type subscription filtering
- Formatted messages with graph details

### Integration Points
- Any Slack workspace (standard or Enterprise Grid)
- Public or private channels (based on authorization)
- Integration with existing Slack workflows and notification settings

### Requirements & Prerequisites
- Slack workspace with permission to add integrations
- Channel where you want to receive notifications
- Permission to authorize the WunderGraph Cosmo app

---

## Proof Points

### Metrics & Benchmarks
- Setup completed in under 2 minutes
- Zero lines of code required
- Instant delivery to Slack channels
- Support for multiple integrations per organization

---

## Content Assets

| Asset Type | Status | Link |
|------------|--------|------|
| Landing Page | Needed | |
| Blog Post | Needed | |
| Video Demo | Needed | |
| Pitch Deck Slide | Needed | |
| One-Pager | Needed | |
| Battle Card | Needed | |

---

## Documentation References

- Primary docs: `/docs/studio/alerts-and-notifications/slack-integration`
- Overview: `/docs/studio/alerts-and-notifications`
- Webhooks alternative: `/docs/studio/alerts-and-notifications/webhooks`

---

## Keywords & SEO

### Primary Keywords
- GraphQL Slack notifications
- Slack integration for API changes
- Federation schema Slack alerts

### Secondary Keywords
- GraphQL team notifications
- API change Slack bot
- Federated graph Slack integration

### Related Search Terms
- How to get GraphQL schema changes in Slack
- Slack notifications for API updates
- Federation monitoring Slack
- GraphQL alerts Slack channel

---

## Version History

| Date | Version | Changes |
|------|---------|---------|
| 2025-01-14 | 1.0 | Initial capability documentation |
