---
description: Setting up SSO with Okta
---

# Okta

Steps to set Okta as an OIDC identity provider

* Navigate to the Applications view within your Okta Administrator Dashboard.
* Click on **Create App Integration**.&#x20;
* A dialog appears, select OIDC - OpenID Connect as the sign-in method.
* Now select the type of application and click on **Next.**

<figure><img src="../../.gitbook/assets/spaces%2Ff2zpPO8tcaY6tJoaEebc%2Fuploads%2FCju13h3G1sFSSov0jxcG%2Fimage.png" alt=""><figcaption></figcaption></figure>

* Now give the app a name and scroll down to **Assignments.**

<figure><img src="../../.gitbook/assets/spaces%2Ff2zpPO8tcaY6tJoaEebc%2Fuploads%2FBeNdVqXwJByNIMvdm8np%2FScreenshot%202023-11-03%20at%201.57.15%20PM.png" alt=""><figcaption></figcaption></figure>

* For **Grant Type,** keep the defaults.
* For **Assignments, s**elect one of the options based on your choice and then click on **Save.**

<figure><img src="../../.gitbook/assets/spaces%2Ff2zpPO8tcaY6tJoaEebc%2Fuploads%2FVGQZ4CtOEJpZL64YLJkL%2FScreenshot%202023-11-03%20at%201.59.21%20PM.png" alt=""><figcaption></figcaption></figure>

* Copy the **Client ID** and **Client Secret.**

<figure><img src="../../.gitbook/assets/spaces%2Ff2zpPO8tcaY6tJoaEebc%2Fuploads%2FTkVciMa6hsaAAX7mMD0q%2FScreenshot%202023-11-03%20at%202.02.19%20PM.png" alt=""><figcaption></figcaption></figure>

* Navigate to Security -> API.

<figure><img src="../../.gitbook/assets/spaces%2Ff2zpPO8tcaY6tJoaEebc%2Fuploads%2F7pj0YRFiYEKbS8rjz6Nu%2FScreenshot%202023-11-03%20at%202.04.13%20PM.png" alt=""><figcaption></figcaption></figure>

* Select the **default** authorization server.
* Copy the **Metadata URI.**

<figure><img src="../../.gitbook/assets/spaces%2Ff2zpPO8tcaY6tJoaEebc%2Fuploads%2FH3oZE82hqKcUujBe96EL%2FScreenshot%202023-11-09%20at%205.47.35%20PM.png" alt=""><figcaption></figcaption></figure>

* Navigate to the settings page on Cosmo.

<figure><img src="../../.gitbook/assets/spaces%2Ff2zpPO8tcaY6tJoaEebc%2Fuploads%2FQUnLSN2OZXFWyvDnnShs%2FScreenshot%202023-11-03%20at%202.43.41%20PM.png" alt=""><figcaption></figcaption></figure>

* Give the connection a name, paste the **Metadata URI** copied before, into the **Discovery Endpoint,** and paste the **Client ID** and **Client secret** copied before into the **Client ID** and **Client Secret fields respectively,** and then click on **Connect.**

<figure><img src="../../.gitbook/assets/spaces%2Ff2zpPO8tcaY6tJoaEebc%2Fuploads%2FrTGDWycuoEv1l09j4twg%2Fimage.png" alt=""><figcaption></figcaption></figure>

* Configure the mapping between the roles in Cosmo and the user groups in Okta. The field **Group in the provider** can be populated with the name of the group or a regex to match the user groups. Once all the mappers are configured, click on **Save**.

<figure><img src="../../.gitbook/assets/spaces%2Ff2zpPO8tcaY6tJoaEebc%2Fuploads%2F2JXm7az0v1ThP4BYHC0i%2Fimage.png" alt=""><figcaption></figcaption></figure>

* Copy the sign-in and sign-out redirect URIs displayed in the dialog.

<figure><img src="../../.gitbook/assets/spaces%2Ff2zpPO8tcaY6tJoaEebc%2Fuploads%2Fgk4Pu1e63WeMBdLxwSTp%2Fimage.png" alt=""><figcaption></figcaption></figure>

* Navigate back to the application created on Okta and populate the Sign-in and Sign-out redirect URIs with the above-copied values. Click on **Save**.

<figure><img src="../../.gitbook/assets/spaces%2Ff2zpPO8tcaY6tJoaEebc%2Fuploads%2FIIWurV7jqYQc0xWRQcCq%2Fimage.png" alt=""><figcaption></figcaption></figure>

* Navigate to Security-> API, and click on the **default** auth server. Navigate to the **claims** tab and then click on **Add Claim.**

<figure><img src="../../.gitbook/assets/spaces%2Ff2zpPO8tcaY6tJoaEebc%2Fuploads%2FFBzqcwhZFeSnKX20bnTj%2Fimage.png" alt=""><figcaption></figcaption></figure>

* Name the claim "ssoGroups", and include it in the **ID Token,** for the value type select **Groups,** and for the filter select **Matches regex** and populate the field with **".\*".** Click on **Create.**

<figure><img src="../../.gitbook/assets/spaces%2Ff2zpPO8tcaY6tJoaEebc%2Fuploads%2FDNSfFPNYhrdpFerFdqX7%2Fimage.png" alt=""><figcaption></figcaption></figure>

* Now you can assign users/groups to the application, and those users will be able to log into Cosmo using the URL provided on setting up the provider.

{% hint style="info" %}
Please make sure that the users added to the application have a username.
{% endhint %}
