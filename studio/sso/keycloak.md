---
description: Setting up SSO with Keycloak
---

# Keycloak

### Steps to set Keyclaok as an OIDC identity provider

* Navigate to the **Clients** view within your Keyclaok Dashboard.
* Click on **Create Client**.&#x20;
* Select OpenID Connect as the **Client Type, and** give the client a **Client ID** and a **Name** and then click on **Next.**

<figure><img src="../../.gitbook/assets/spaces%2Ff2zpPO8tcaY6tJoaEebc%2Fuploads%2FLDX5AqUvVgvI2w7rx7tS%2Fimage.png" alt=""><figcaption></figcaption></figure>

* Enable **Client authentication,** then click on **Next** and then click on **Save** on the next page**.**

<figure><img src="../../.gitbook/assets/spaces%2Ff2zpPO8tcaY6tJoaEebc%2Fuploads%2F6cXC58aHld1mbvclAPyj%2Fimage.png" alt=""><figcaption></figcaption></figure>

* Navigate to the **Credentials** tab and then copy the **Client Secret.**

<figure><img src="../../.gitbook/assets/spaces%2Ff2zpPO8tcaY6tJoaEebc%2Fuploads%2FiC7FCJoVJ8hSOUK098KF%2Fimage.png" alt=""><figcaption></figcaption></figure>

* Navigate to the **Realm Settings** and then copy the link of **OpenID Endpoint Configuration.**

<figure><img src="../../.gitbook/assets/spaces%2Ff2zpPO8tcaY6tJoaEebc%2Fuploads%2FfKYasokQtttbKtcLbJMM%2Fimage (1).png" alt=""><figcaption></figcaption></figure>

* Navigate to the settings page on Cosmo.
* Click on **Connect.**

<figure><img src="../../.gitbook/assets/spaces%2Ff2zpPO8tcaY6tJoaEebc%2Fuploads%2FQUnLSN2OZXFWyvDnnShs%2FScreenshot%202023-11-03%20at%202.43.41%20PM.png" alt=""><figcaption></figcaption></figure>

* Give the connection a name, paste the **OpenID Endpoint Configuration** copied before, into the **Discovery Endpoint,** and paste the **Client ID** and **Client secret** copied before into the **Client ID** and **Client Secret fields respectively,** and then click on **Connect.**

<figure><img src="../../.gitbook/assets/spaces%2Ff2zpPO8tcaY6tJoaEebc%2Fuploads%2FrTGDWycuoEv1l09j4twg%2Fimage.png" alt=""><figcaption></figcaption></figure>

* Configure the mapping between the roles in Cosmo and the user groups in Keycloak. The field **Group in the provider** can be populated with the name of the group or a regex to match the user groups. Once all the mappers are configured, click on **Save**.

<figure><img src="../../.gitbook/assets/spaces%2Ff2zpPO8tcaY6tJoaEebc%2Fuploads%2F2JXm7az0v1ThP4BYHC0i%2Fimage.png" alt=""><figcaption></figcaption></figure>

* Copy the sign-in and sign-out redirect URIs displayed in the dialog.

<figure><img src="../../.gitbook/assets/spaces%2Ff2zpPO8tcaY6tJoaEebc%2Fuploads%2Fgk4Pu1e63WeMBdLxwSTp%2Fimage.png" alt=""><figcaption></figcaption></figure>

* Navigate back to the client created on Keycloak and populate the **Valid redirect URIs** and **Valid post Logout redirect URIs** with the above-copied sign-in and sign-out URLs respectively. Click on **Save**.

<figure><img src="../../.gitbook/assets/spaces%2Ff2zpPO8tcaY6tJoaEebc%2Fuploads%2F41V213VNdNcsBmv7WuEK%2FScreenshot%202023-11-06%20at%202.40.40%20PM.png" alt=""><figcaption></figcaption></figure>

* Navigate to the **Client Scopes** tab, click on the first client scope(usually would be ${**clientID}-dedicated**), and then click on **Configure a new mapper.**

<figure><img src="../../.gitbook/assets/spaces%2Ff2zpPO8tcaY6tJoaEebc%2Fuploads%2FkbNSAImipyzhkTAKtBwJ%2Fimage.png" alt=""><figcaption></figcaption></figure>

* Select **Group Membership.**

<figure><img src="../../.gitbook/assets/spaces%2Ff2zpPO8tcaY6tJoaEebc%2Fuploads%2FepUipoVv2tiJ5Vua6GaJ%2FScreenshot%202023-11-06%20at%202.49.53%20PM.png" alt=""><figcaption></figcaption></figure>

* Give the mapper a name, then populate the **Token Claim Name** with **"**ssoGroups**"** and then click on **Save.**
* Now you can assign users/groups to the application, and those users will be able to log into Cosmo using the URL provided on setting up the provider.
