---
description: >-
  Multipart HTTP Protocol is a method for delivering incremental responses over
  HTTP. It allows you to receive subscription responses in clearly defined
  chunks, keeping an open connection throughout.
---

# Multipart HTTP Requests

This multipart protocol is built on the [Incremental Delivery over HTTP](https://github.com/graphql/graphql-over-http/blob/main/rfcs/IncrementalDelivery.md) spec. The protocol delivers continuous updates in the format:&#x20;

```
--graphql
Content-Type: application/json

{"payload": {"data": { "message": "Hello World!"}}}}
--graphql
Content-Type: application/json

{"payload": {"data": { "message": "How are you?"}}}}
--graphql
Content-Type: application/json

{}
--graphql
Content-Type: application/json

{"payload": {"data": { "message": "Mic Drop"}}}}
--graphql--
```

You can use multipart messages by setting `Accept: multipart/mixed` on a GraphQL subscription POST request. Try out the following example:

### Example

```bash
curl --location 'https://demo-router.fly.dev/graphql' \
--header 'Accept: multipart/mixed' \
--data '{"query":"subscription test {\n currentTime {unixTime}\n}","operationName":"test"}'
```

### Client Integration

To implement Server-Sent Events (SSE) with a GraphQL POST request, you'll typically need to use a more custom approach than the standard `EventSource`. Here's a full example using JavaScript's `fetch` API with the `ReadableStream` interface. You can also copy paste this example in the Developer Console to test it.

<pre class="language-javascript"><code class="lang-javascript">var myHeaders = new Headers();
myHeaders.append("Accept", "multipart/mixed");

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

<strong>const response = await fetch("https://demo-router.fly.dev/graphql", requestOptions)
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
