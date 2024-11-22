---
description: Configure SCIM with Okta.
---

# Okta

Steps to set up SCIM with Okta

* Set up the password policy (password should contain at least one number and one symbol), if using the **Classic Engine on Okta** follow the below step&#x73;**,** or if using the **OIE engine,** follow the steps as mentioned in this [**Okta guide**](https://help.okta.com/oie/en-us/content/topics/identity-engine/authenticators/configure-password.htm)**.**&#x20;
  * Navigate to Security -> Authentication on your Okta Administrator Dashboard.
  * Click Edit and update the password policy by enabling Number and Symbol, then click on Update Policy.

<figure><img src="../../.gitbook/assets/Screenshot 2024-04-17 at 12.28.16 AM (1).png" alt=""><figcaption></figcaption></figure>

* Navigate to the Applications view within your Okta Administrator Dashboard.
* Click on **Create App Integration**.&#x20;

<figure><img src="../../.gitbook/assets/Screenshot 2024-04-17 at 12.35.28 AM.png" alt=""><figcaption></figcaption></figure>

* A dialog appears, select SWA - Secure Web Authentication and then click **Next.**

<figure><img src="../../.gitbook/assets/Screenshot 2024-04-17 at 12.36.11 AM.png" alt=""><figcaption></figcaption></figure>

* Now give the app a name and populate the app's login URL with [**https://cosmo.wundergraph.com/login**](https://cosmo.wundergraph.com/login)**.**
* For "**Who sets the credentials**", select **Administrator sets username,  user sets password.**
* For the **application username**, select **Email** and then click **Finish.**

<figure><img src="../../.gitbook/assets/Screenshot 2024-04-17 at 12.40.49 AM.png" alt=""><figcaption></figcaption></figure>

* Now navigate to the **General** tab, click on **Edit** in **App settings.**
* Enable **SCIM provisioning** and then click on **Save.**

<figure><img src="../../.gitbook/assets/Screenshot 2024-04-17 at 12.47.18 AM (1).png" alt=""><figcaption></figcaption></figure>

* Navigate to the settings page on WunderGraph Cosmo and enable **SCIM.**

<figure><img src="../../.gitbook/assets/Screenshot 2024-04-17 at 12.52.33 AM.png" alt=""><figcaption></figcaption></figure>

* Once SCIM is enabled, you will be provided with a **SCIM Server URL,** copy i&#x74;**.**
* Navigate to the API Keys page on WunderGraph Cosmo and click on New API Key.
* Provide the key with a name, select **Never** for **Expires,** then select **SCIM** under **Permissions, t**hen click on **Generate API key.**

<figure><img src="https://lh7-us.googleusercontent.com/pCIhVIIzMHT5yOBPgz4vjy4tgjCdZYnEGniHqnCJ5h991cyADdfiHvtsp8WnR3lnf_B4AP7yYpvaWggEXRhAjQ7CFmOyaTQea3iPBk92P89EcduZq8rbHuAW2iLYjIx9Ogd8ZMHH9ftQHsyyujngbes" alt=""><figcaption></figcaption></figure>

* Copy the API key provided.
* Navigate to the provisioning tab of the app created on okta, then click on **Edit**.

<figure><img src="../../.gitbook/assets/Screenshot 2024-04-17 at 12.49.50 AM.png" alt=""><figcaption></figcaption></figure>

* Populate the **SCIM connector base URL** with the copied **SCIM server URL** .
* Populate the **Unique identifier field for users** with **"email".**
* Select **Import New Users and Profile Updates, Push New Users and Push Profile Updates** for **Supported provisioning actions.**
* Select **HTTP Header** for **Authentication Mode.**
* Populate the **Authorization** field under HTTP Header with the above-copied API key.

<figure><img src="../../.gitbook/assets/Screenshot 2024-04-17 at 12.58.36 AM.png" alt=""><figcaption></figcaption></figure>

* Click on Test Connector Configuration, a dialog will appear showing the connector is configured successfully, click Close.

<figure><img src="../../.gitbook/assets/Screenshot 2024-04-17 at 1.09.56 AM.png" alt=""><figcaption></figcaption></figure>

* Click on **Save.**
* Navigate to the "**to App"** ta&#x62;**, and** click on **Edit.**

<figure><img src="../../.gitbook/assets/Screenshot 2024-04-17 at 1.15.15 AM (1).png" alt=""><figcaption></figcaption></figure>

* Enable **Create Users,  Update User Attributes, Deactivate Users** and **Sync Password.**
* Under **Sync Password** for **Password type**, select **Sync Okta Password.**

<figure><img src="../../.gitbook/assets/Screenshot 2024-04-17 at 1.17.40 AM (1).png" alt=""><figcaption></figcaption></figure>

* Click **save.**
* Now you can navigate the Assignments tab and assign users/groups who should have access to WunderGraph Cosmo.

{% hint style="info" %}
If you are using both **SSO with OIDC** and **SCIM**, please make sure that the users assigned in both apps are the same.
{% endhint %}

