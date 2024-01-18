---
description: >-
  Server-Sent Events (SSE) are best for unidirectional communication where the
  server continuously sends data to the client, like live updates or
  notifications.
---

# Server-Sent-Events (SSE)

SSE is simpler to implement and more efficient for scenarios where client-to-server communication is minimal or not required. In contrast, WebSockets provide full-duplex communication, suitable for interactive applications like chat rooms or gaming. SSE is often the better choice for simpler, one-way data streaming applications due to its ease of use and lower overhead.

You can use SSE by adding `wg_sse=true` to a regular GraphQL POST request. The document must be a subscription. Try out the following example:

### Example

```bash
curl --location 'https://demo-router.fly.dev/graphql?wg_sse=true' \
--header 'Content-Type: application/json' \
--data '{"query":"subscription test {\n currentTime {unixTime}\n}","operationName":"test"}'
```

### Client Integration

To implement Server-Sent Events (SSE) with a GraphQL POST request, you'll typically need to use a more custom approach than the standard `EventSource`. Here's a full example using JavaScript's `fetch` API with the `ReadableStream` interface. You can also copy paste this example in the Developer Console to test it.

<pre class="language-javascript"><code class="lang-javascript">var myHeaders = new Headers();
myHeaders.append("Content-Type", "text/event-stream");

var raw = JSON.stringify({
  "query": "subscription test {\n currentTime {unixTime}\n}",
  "operationName": "test"
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

<strong>const response = await fetch("https://demo-router.fly.dev/graphql?wg_sse=true", requestOptions)
</strong>  
// To recieve data as a string we use TextDecoderStream class in pipethrough
const reader = response.body.pipeThrough(new TextDecoderStream()).getReader()

// Consume unless you reload the page. You can also use the AbortController API to close the connection.
while (true) {
  const {value, done} = await reader.read();
  if (done) break;
  // Remove the data: prefix and parse the message
  console.log('Received', JSON.parse(value.replace("data: ", "")));
}
</code></pre>

This code doesn't handle connection issues and retries.

{% hint style="info" %}
Providing a compatible interface for `EventSource` is not very difficult to add, but we haven't seen the need for it yet. If you require it, please open an issue in our [repository](https://github.com/wundergraph/cosmo).
{% endhint %}
