---
description: The router allows users to operate on the request headers.
---

# Request Headers Operations

## Forward HTTP headers to subgraphs

Forwarding specific client headers (request headers) to your subgraphs is a straightforward process. By default, no headers are forwarded for security reasons. To enable header forwarding, insert the following snippet into your [config.yaml](../configuration.md#config-file) file and adjust it according to your needs.

<pre class="language-yaml"><code class="lang-yaml"><strong># config.yaml
</strong>
# See https://cosmo-docs.wundergraph.com/router/configuration#config-file
# for the full list of configuration options.

headers:
  all: # Header rules for all subgraph requests.
    request:
      - op: "propagate"            # Forward a client header
        named: X-Test-Header       # Exact match (Use the canonicalized version)
      
      - op: "propagate"
        matching: (?i)^X-Custom-.* # Regex match (Case insensitive)
        
      - op: "propagate"
        named: "X-User-Id"
        default: "123"             # Set the value when the header was not set
        
      - op: "propagate"
        named: "X-Test-1"
        rename: "X-Test"           # Rewrites the header from X-Test-1 to X-Test
        
      - op: "set"
        name: "X-Custom-Header"
        value: "my-required-key"

  subgraphs:
    specific-subgraph: # Will only affect this subgraph
      request:
        - op: "propagate"
          named: "Subgraph-Secret"
          default: "some-secret"
</code></pre>

### What does the snippet do?

With **`all`** we address all subgraph requests. Next, we can define several rules on the client's request. The operation `propagate` forwards all matching client request headers to the subgraphs. The operation `set` sets a new header which is forward to the subgraphs.

The **`subgraphs`** section allows to propagate headers for specific subgraphs. The name must match with the subgraph name in the Studio.

### Supported header rules

Currently, we support the following header rules:

* **propagate** - Forwards all matching client request headers to the subgraphs. You can choose between one of the following matchers:
  * **`named`** - It exactly matches on the header name.
  * **`matching` -** Regex matches on the header name. You can use[ regex101.com](https://regex101.com/) to test your regexes. Go to the website and select `Golang` on the left panel. **Note:** The Router _never_ propagates [hop-by-hop headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers#hop-by-hop\_headers) (such as `Connection`) when propagating by regex.
  * **`rename`**: Replaces the identified header based on its name or matching criteria and transfers the value to the newly specified header.
  * **`default`**: Fallback to this value when the `named`, `matching` or `rename` header could not be found.
* **set** - Sets a header on the request forward to the subgraph. You must set the following values:
  * **`name`** - The name of the header to set
  * **`value`** - The value to set for the header

{% hint style="warning" %}
Go canonicalizes headers by default e.g. `x-my-header` to `X-My-Header.` Write your rule accordingly or use **`(?i)`**`^X-Test-.*` flags to make your regex case insensitive.
{% endhint %}

### Default value

You can also define a value when the client header is not set by the client. Can only be used with the _named_ matcher.

```yaml
headers:
  all:
    request:
      - op: "propagate"
        named: "X-User-Id"
        default: "123"
```

### Rule ordering

All rules are evaluated in the order they are defined.

{% hint style="info" %}
Please inform us if you have more advanced use cases that cannot be accommodated with the current feature set. You can still use [Custom Modules](../custom-modules.md) to implement any logic yourself. You can aggregate, remove, or add headers as you like.
{% endhint %}
