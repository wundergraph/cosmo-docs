---
icon: camera-cctv
description: Set up authentication and authorization for incoming requests
---

# Authentication & Authorization

{% hint style="info" %}
Authorization directives can be used in your schema to define granular authorization rules on the field definition level.\
Documentation can be found at [@authenticated](../federation/directives/authenticated.md) and [@requiresScopes](../federation/directives/requiresscopes.md).
{% endhint %}

Cosmo router supports authenticating incoming requests using [JWKS](https://auth0.com/docs/secure/tokens/json-web-tokens/json-web-key-sets) authentication. The JSON Web Key Set (JWKS) is a set of keys that contains the public keys used to verify any JSON Web Token (JWT) issued by the authorization server and signed using the RS256 [signing algorithm](https://auth0.com/docs/tokens/concepts/signing-algorithms).

To enable an authentication provider, add it to your configuration

## Configuration in Router Version >= 0.169.0

In router version 0.169.0 and above, the configuration and behavior of authentication have been redesigned. Instead of specifying a configuration per JWKS endpoint, you can now list multiple endpoints where all header rules apply to. Each JWKS endpoint can optionally specify a whitelist of supported JWT algorithms.

### New configuration

```yaml
# config.yaml

authentication:
  jwt:
    jwks:
      - url: https://example.com/.well-known/jwks.json
        refresh_interval: 1m
        # Leaving algorithms empty will allow all supported algorithms from the config docs
      - url: https://example2.com/.well-known/jwks.json
        refresh_interval: 2m
        # optional list of allowed algorithms per JWKS
        algorithms: ["RS256", "EdDSA", "HS512"]
    header_name: Authorization # Optional, Authorization is the default value
    header_value_prefix: Bearer # Optional, Bearer is the default value
    header_sources:
      - type: header 
        name: X-Auth-Token
        value_prefixes: [Token, MyToken]
      - type: header
        name: X-Authorization
```

The new router configuration facilitates the setup of multiple JWKS (JSON Web Key Set) endpoints, each customizable with distinct retrieval settings. It allows specification of supported JWT (JSON Web Token) algorithms per endpoint. Centralizing header rules application across all keys from every JWKS endpoint simplifies management. This setup grants centralized control while offering flexibility in the retrieval and processing of keys.

## Old Router configuration (< 0.169.0)&#x20;

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
