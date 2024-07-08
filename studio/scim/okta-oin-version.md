---
description: Configure SCIM with Okta using the app from OIN.
---

# Okta (OIN version)

Steps to set up SCIM with Okta

* Set up the password policy (password should contain at least one number and one symbol), if using the **Classic Engine on Okta** follow the below steps**,** or if using the **OIE engine,** follow the steps as mentioned in this [**Okta guide**](https://help.okta.com/oie/en-us/content/topics/identity-engine/authenticators/configure-password.htm)**.**&#x20;
  * Navigate to Security -> Authentication on your Okta Administrator Dashboard.
  * Click Edit and update the password policy by enabling Number and Symbol, then click on Update Policy.

<figure><img src="../../.gitbook/assets/Screenshot 2024-04-17 at 12.28.16 AM (1).png" alt=""><figcaption></figcaption></figure>

* Navigate to the Applications view within your Okta Administrator Dashboard.
* Click on **Browse App Catalog.**

<figure><img src="../../.gitbook/assets/Screenshot 2024-07-08 at 7.09.37 PM.png" alt=""><figcaption></figcaption></figure>

* Search for **Wundergraph Cosmo.**
* Click on **Add Integration**.

<figure><img src="../../.gitbook/assets/Screenshot 2024-07-08 at 7.14.28 PM.png" alt=""><figcaption></figcaption></figure>

* Now give the app a name and then click on **Next.**
* Select **Administrator sets username,  user sets password** and for **Application username format** under **Credentials Details** select **Email** and then click **Done.**

<figure><img src="../../.gitbook/assets/Screenshot 2024-07-08 at 7.20.06 PM.png" alt=""><figcaption></figcaption></figure>

* Navigate to the settings page on WunderGraph Cosmo and enable **SCIM.**

<figure><img src="../../.gitbook/assets/Screenshot 2024-04-17 at 12.52.33 AM.png" alt=""><figcaption></figcaption></figure>

* Once SCIM is enabled, you will be provided with a **SCIM Server URL,** copy it**.**
* Navigate to the API Keys page on WunderGraph Cosmo and click on New API Key.
* Provide the key with a name, select **Never** for **Expires,** then select **SCIM** under **Permissions, t**hen click on **Generate API key.**

<figure><img src="https://lh7-us.googleusercontent.com/pCIhVIIzMHT5yOBPgz4vjy4tgjCdZYnEGniHqnCJ5h991cyADdfiHvtsp8WnR3lnf_B4AP7yYpvaWggEXRhAjQ7CFmOyaTQea3iPBk92P89EcduZq8rbHuAW2iLYjIx9Ogd8ZMHH9ftQHsyyujngbes" alt=""><figcaption></figcaption></figure>

* Copy the API key provided.
* Navigate to the provisioning tab of the app created on okta, then click on **Configure API Integration**.

<figure><img src="../../.gitbook/assets/Screenshot 2024-07-08 at 7.28.42 PM.png" alt=""><figcaption></figcaption></figure>

* Check the **Enable API Integration** and then populate the **API token** with the **API key** copied in the previous steps.
* Click on **Test API Credentials** and once it's verified successfully, click on **Save**
* Navigate to the "**to App"** tab**, and** click on **Edit.**

<figure><img src="../../.gitbook/assets/Screenshot 2024-04-17 at 1.15.15 AM (1).png" alt=""><figcaption></figcaption></figure>

* Enable **Create Users,  Update User Attributes, Deactivate Users** and **Sync Password.**
* Under **Sync Password** for **Password type**, select **Sync Okta Password.**

<figure><img src="../../.gitbook/assets/Screenshot 2024-04-17 at 1.17.40 AM (1).png" alt=""><figcaption></figcaption></figure>

* Click **save.**
* Now you can navigate the Assignments tab and assign users/groups who should have access to WunderGraph Cosmo.

{% hint style="info" %}
If you are using both **SSO with OIDC** and **SCIM**, please make sure that the users assigned in both apps are the same.
{% endhint %}

