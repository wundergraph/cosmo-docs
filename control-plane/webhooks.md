---
description: >-
  Configure webhooks for events that occur in the platform. This page covers
  platform events
---

# Webhooks

{% hint style="info" %}
If you want to refer organization webhook events, check the docs [here](../studio/alerts-and-notifications/webhooks.md)
{% endhint %}

## Configuration

To enable webhooks, you can configure `WEBHOOK_URL` and `WEBHOOK_SECRET` environment variables and you will start receiving the following events.

## Platform Events

### &#x20;`USER_REGISTER_SUCCESS`

Triggered whenever a user registration is successful.

* `user_id`: The unique identifier of the registered user.
* `user_email`: The email address of the registered user.

**Sample Payload:**

```json
{
  "version": 1,
  "event": "USER_REGISTER_SUCCESS",
  "payload": {
    "user_id": "1234abcd",
    "user_email": "user@example.com"
  }
}
```

### `APOLLO_MIGRATE_INIT`

Triggered when graph migration is initiated.

`actor_id` (optional): The identifier of the actor initializing the migration

**Sample Payload:**

```json
{
  "version": 1,
  "event": "APOLLO_MIGRATE_INIT",
  "payload": {
    "actor_id": "user5678"
  }
}
```

### `APOLLO_MIGRATE_SUCCESS`

Triggered when graph migration succeeds.

* `federated_graph`: An object representing the federated graph details.
  * `id`: The unique identifier for the federated graph.
  * `name`: The name of the federated graph.
* `actor_id` (optional): The identifier of the actor initializing the migration.

**Sample Payload:**

```json
{
  "version": 1,
  "event": "GRAPH_MIGRATE_SUCCESS",
  "payload": {
    "federated_graph": {
      "id": "graph123",
      "name": "MainGraph"
    },
    "actor_id": "user5678"
  }
}
```

## Verification

To ensure the webhook data is coming from a trusted source and hasn't been tampered with during transit, we employ HMAC signatures. When setting up a webhook, you provide a secret. This secret is used to compute a signature that is sent along with each webhook request.

The header containing this signature is `X-Cosmo-Signature-256`.

#### Verification Example

To verify the webhook request, you need to compute the HMAC signature on your server and compare it to the signature in the `X-Cosmo-Signature-256` header.

Here's an example in Node.js:

```javascript
import crypto from 'crypto';

function verifySignature(body, receivedSignature, secret) {
  const computedSignature = crypto
    .createHmac('sha256', secret)
    .update(body)
    .digest('hex');

  return computedSignature === receivedSignature;
}

// Usage:
const isVerified = verifySignature(JSON.stringify(req.body), req.headers['x-cosmo-signature-256'], YOUR_SECRET);
```
