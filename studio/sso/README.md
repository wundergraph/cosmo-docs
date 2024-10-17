---
description: >-
  Connect your organization's Identity Provider, such as Okta, Auth0, or
  Keycloak, with Cosmo to seamlessly inherit user authentication and access
  control, ensuring a secure and unified experience.
icon: building-lock
---

# SSO

Cosmo provides the capability to integrate with various OpenID Connect providers, such as [Okta](https://app.gitbook.com/o/AGsPMiPE3xradDAKeJYL/s/f2zpPO8tcaY6tJoaEebc/\~/changes/304/studio/sso/okta), [Auth0](https://app.gitbook.com/o/AGsPMiPE3xradDAKeJYL/s/f2zpPO8tcaY6tJoaEebc/\~/changes/304/studio/sso/auth0), [Keycloak](https://app.gitbook.com/o/AGsPMiPE3xradDAKeJYL/s/f2zpPO8tcaY6tJoaEebc/\~/changes/304/studio/sso/keycloak), or any other OIDC-compliant provider. Single Sign-On (SSO) is enabled at the organization level. This integration allows you to leverage your chosen OpenID Connect provider for authentication, automatically enrolling users into your organization.

When users sign in to your organization, they are seamlessly enrolled and gain access to all the permissions you've designated for them. The roles users receive in Cosmo are based on the mappings configured during the setup of the OIDC provider.

### Configuration steps

1. Set up the OIDC provider by following the tutorials available on the next pages for [Okta](okta.md), [Auth0](auth0.md), and [Keycloak](keycloak.md).
2. Please copy the "Login URL" that was generated after connecting the OIDC provider, and share it with your colleagues. The URL is unique for every SSO integration.
3. Upon the next login, users will receive roles based on the mapping rules you configured in step 1.
4. Users will encounter the option to "Login with SSO" the first time they log in using the provided Login URL. After that initial login, they won't need to remember the Login URL again.

{% hint style="warning" %}
If you disconnect the SSO integration, all users who logged in using SSO will be logged out and downgraded to the _viewer_ role. This is a security measure to ensure that synchronization with your authorization server is never compromised. After reconnecting with your Identity Provider (IDP), the login URL will change, and users will receive the appropriate roles upon their next sign-in.
{% endhint %}
