---
description: Set up authentication and authorization for incoming requests
---

# Authentication & Authorization

{% hint style="info" %}
Authorization directives can be used in your schema to define granular authorization rules on the field definition level.\
Documentation can be found at [@authenticated](../open-federation/directives/authenticated.md) and [@requiresScopes](../open-federation/directives/requiresscopes.md).
{% endhint %}

Cosmo router supports authenticating incoming requests using [JWKS](https://auth0.com/docs/secure/tokens/json-web-tokens/json-web-key-sets) authentication. The JSON Web Key Set (JWKS) is a set of keys that contains the public keys used to verify any JSON Web Token (JWT) issued by the authorization server and signed using the RS256 [signing algorithm](https://auth0.com/docs/tokens/concepts/signing-algorithms).

To enable an authentication provider, add it to your configuration:

```yaml
# config.yaml

authentication:
  providers:
    - name: My Auth Provider # Optional, used for error messages and diagnostics
      jwks: # JWKS provider configuration
        url: https://example.com/.well-known/jwks.json # URL to load the JWKS from (Authorization server)
        header_names: [Authorization] # Optional, Authorization is the default value
        header_value_prefixes: [Bearer] # Optional, Bearer is the default value
        refresh_interval: 1m # Optional, How often the JWK is refreshed
       
```

Using multiple authentication providers is also supported. If authentication with any of the providers succeeds, the claims from the token are decoded and made available through the request pipeline. Notice that providers are tried in the same order as they are defined in the configuration and once a provider authenticates a request, no other providers are tried.

### Enforce authentication

By default, requests without authentication information are allowed. Only requests with invalid authentication information (e.g. an incorrectly signed token) produce a `403 Forbidden` response. To disable anonymous requests, use the Authorization configuration:

```yaml
# config.yaml

authorization:
  require_authentication: true
```

This causes requests without authorization information to produce a `401 Unauthorized`

Authentication information is also available to custom modules. See [Access Authenticated Information](custom-modules.md#access-authentication-information).

### Forwarding authentication headers

By default, the router won't forward authentication headers to subgraphs, but if desired this can be configured using [Proxy capabilities](proxy-capabilities/).
