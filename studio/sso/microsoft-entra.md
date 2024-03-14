---
description: Setting up SSO with Microsoft Entra
---

# Microsoft Entra

Steps to set Entra as an OIDC identity provider:-

* Log in to Microsoft Entra and navigate to the **Identity/Applications/Enterprise applications** view within Microsoft Entra.

<figure><img src="../../.gitbook/assets/Screenshot 2024-03-14 at 2.35.33 PM.png" alt=""><figcaption></figcaption></figure>

* Click on **New application.**
* Once navigated to a new page, click on **Create your own application**.

<figure><img src="../../.gitbook/assets/Screenshot 2024-03-14 at 3.13.08 AM.png" alt=""><figcaption></figcaption></figure>

* Provide a name to the application and select "**Register an application to integrate with Azure AD (App you're developing)**"  for the application purpose, then click on the **Create** button.
* Select who can use the application from the given options according to your needs and then click on **Register.**
* Now navigate to **Identity/Applications/App registrations.**
* In the **All applications tab,** select the application which we created.

<figure><img src="../../.gitbook/assets/Screenshot 2024-03-14 at 3.29.42 PM.png" alt=""><figcaption></figcaption></figure>

* Copy the Application(Client) ID, then click on **Endpoints** and then copy the **OpenID Connect metadata document**(Discovery Endpoint).

<figure><img src="../../.gitbook/assets/Screenshot 2024-03-14 at 3.34.17 AM.png" alt=""><figcaption></figcaption></figure>

* Navigate to **Certificates and Secrets.**
* Click on **New client secret,** give it a description and select the expiry according to your needs and then click on **Add**.
* Copy the **value(client secret)** and store it, as it won't be shown again.

<figure><img src="../../.gitbook/assets/Screenshot 2024-03-14 at 3.28.07 AM.png" alt=""><figcaption></figcaption></figure>

* Navigate to the settings page on Cosmo.

<figure><img src="../../.gitbook/assets/image.png" alt=""><figcaption></figcaption></figure>

* Give the connection a name, paste the **OpenID Connect metadata document** copied before, into the **Discovery Endpoint,** paste the **Client ID** and **Client secret** copied before into the **Client ID** and **Client Secret fields respectively,** and then click on **Connect.**

<figure><img src="../../.gitbook/assets/image (1).png" alt=""><figcaption></figcaption></figure>

* Configure the mapping between the roles in Cosmo and the groups in Microsoft Entra. The field **Group in the provider** should be populated with the **Object ID of a group from Entra.** Once all the mappers are configured, click on **Save**. Every member in those groups would get the respective role configured.

<figure><img src="../../.gitbook/assets/image (3).png" alt=""><figcaption></figcaption></figure>

<figure><img src="../../.gitbook/assets/Screenshot 2024-03-14 at 3.41.42 AM (1).png" alt=""><figcaption><p>Object ID of the groups in Entra</p></figcaption></figure>

* Copy the sign-in and sign-out redirect URIs displayed in the dialog.

<figure><img src="../../.gitbook/assets/image (4).png" alt=""><figcaption></figcaption></figure>

* Navigate back to the **App registrations** page, in the **All applications** tab select the app which we created.
* Click on **Add a redirect URI, and** now click on **Add a platform,** select **Web** and then paste the Sign-in and Sign-out redirect URIs in the **Redirect URIs** and **Front-channel logout URL** respectively**.**

<figure><img src="../../.gitbook/assets/Screenshot 2024-03-14 at 3.21.45 AM.png" alt=""><figcaption></figcaption></figure>

* Select **ID tokens** and then click on **Configure.**
* Now navigate to **Token configuration, and** click on **Add groups claim.**

<figure><img src="../../.gitbook/assets/Screenshot 2024-03-14 at 3.52.03 AM.png" alt=""><figcaption></figcaption></figure>

* Select **Security groups,** expand **ID,** select **Group ID** and click on **Add**
* Navigate to **API Permissions, and** click on **Add a permission.**

<figure><img src="../../.gitbook/assets/Screenshot 2024-03-14 at 3.57.18 AM.png" alt=""><figcaption></figcaption></figure>

* Click on **Microsoft Graph,** and then on **Delegated permissions,** select **email, openid and profile** and then click on **Add permissions.**
* Now you can assign users/groups to the application, and only those users will be able to log into Cosmo using the URL provided on setting up the provider.

<figure><img src="../../.gitbook/assets/Screenshot 2024-03-14 at 3.35.30 PM.png" alt=""><figcaption></figcaption></figure>

{% hint style="info" %}
Please make sure that the users added to the application have an email.

Steps to add a user:-

*   Navigate to Users/All users, click on New User and then click on Create a new user.

    <figure><img src="../../.gitbook/assets/Screenshot 2024-03-14 at 2.48.55 PM (1).png" alt=""><figcaption></figcaption></figure>
*   Provide the user principal name, the display name and then click on **Next**.

    <figure><img src="../../.gitbook/assets/Screenshot 2024-03-14 at 2.51.16 PM.png" alt=""><figcaption></figcaption></figure>
* Provide the first name(optional) and the last name(optional).
*   Provide the email of the user(**Required**).

    <figure><img src="../../.gitbook/assets/Screenshot 2024-03-14 at 2.53.07 PM.png" alt=""><figcaption></figcaption></figure>
* Then click on **Next** and assign the user to the groups according to your needs.
{% endhint %}
