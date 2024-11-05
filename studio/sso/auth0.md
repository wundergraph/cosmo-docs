---
description: Setting up SSO with Auth0
---

# Auth0

### Steps to set Auth0 as an OIDC identity provider

* Navigate to the Applications view within your Auth0 account.
* Either use the default application or create a new application by clicking on the **Create Application** button.
* A dialog will open, give the app a name, select the type of application and then click on the **Create** button.

<figure><img src="../../.gitbook/assets/spaces%2Ff2zpPO8tcaY6tJoaEebc%2Fuploads%2F5mmxr2EZkLgoTPP3Vo98%2Fimage.png" alt=""><figcaption></figcaption></figure>

* Once the app is created, navigate to the Setting tab. Now copy the **Domain**, **Client ID** and **Client Secret**.

<figure><img src="../../.gitbook/assets/spaces%2Ff2zpPO8tcaY6tJoaEebc%2Fuploads%2F6QeJtGNgIA3ZfzZSNbpx%2Fimage.png" alt=""><figcaption></figcaption></figure>

* Navigate to the settings page on Cosmo.
* Click on **Connect.**

<figure><img src="../../.gitbook/assets/spaces%2Ff2zpPO8tcaY6tJoaEebc%2Fuploads%2FQUnLSN2OZXFWyvDnnShs%2FScreenshot%202023-11-03%20at%202.43.41%20PM.png" alt=""><figcaption></figcaption></figure>

* Give the connection a name, the **Discovery Endpoint** will be `https://YOUR_AUTH0_DOMAIN/.well-known/openid-configuration`**,** and paste the **Client ID** and **Client secret** copied before into the **Client ID** and **Client Secret fields respectively,** and then click on **Connect.**

<figure><img src="../../.gitbook/assets/spaces%2Ff2zpPO8tcaY6tJoaEebc%2Fuploads%2FrTGDWycuoEv1l09j4twg%2Fimage.png" alt=""><figcaption></figcaption></figure>

* Configure the mapping between the roles in Cosmo and the user roles in Auth0. The field **Group in the provider** can be populated with the name of the role or a regex to match the user roles. Once all the mappers are configured, click on **Save**.

<figure><img src="../../.gitbook/assets/spaces%2Ff2zpPO8tcaY6tJoaEebc%2Fuploads%2F2JXm7az0v1ThP4BYHC0i%2Fimage.png" alt=""><figcaption></figcaption></figure>

* Copy the sign-in and sign-out redirect URIs displayed in the dialog.

<figure><img src="../../.gitbook/assets/spaces%2Ff2zpPO8tcaY6tJoaEebc%2Fuploads%2Fgk4Pu1e63WeMBdLxwSTp%2Fimage.png" alt=""><figcaption></figcaption></figure>

* Navigate back to the settings tab of the application created on Auth0 and populate the **Allowed Callback URLs** and **Allowed Logout URLs** redirect URIs with the above-copied sign-in and sign-out URLs respectively. Click on **Save Changes**.

<figure><img src="../../.gitbook/assets/spaces%2Ff2zpPO8tcaY6tJoaEebc%2Fuploads%2FCADiuTqdwDfWyII73h6I%2FScreenshot%202023-11-06%20at%201.44.43%20PM.png" alt=""><figcaption></figcaption></figure>

* Now navigate to **Actions** -> **Library,** and then click on **the Build Custom** button**.**

<figure><img src="../../.gitbook/assets/spaces%2Ff2zpPO8tcaY6tJoaEebc%2Fuploads%2FGKwOyWmxUrrDxrlOSmAh%2Fimage.png" alt=""><figcaption></figcaption></figure>

* Give the action a name, select **Login/Post Login** as the **Trigger** and **Node 18** as the **Runtime** and then click the **Create** button**.**
* Copy the below code and paste it into the editor shown, then click the **Deploy** button.

```typescript
exports.onExecutePostLogin = async (event, api) => {
  if(event.authorization){
    api.idToken.setCustomClaim(`ssoGroups`, event.authorization.roles);
  }
};
```

* Now navigate to **Actions** -> **Flows,** and then click on the **Login** flow**.**
* Navigate to the **Custom** tab on the right side of the page. Now drag the action and place it between Start and Complete as shown below, and then click on **Apply**.

<figure><img src="../../.gitbook/assets/spaces%2Ff2zpPO8tcaY6tJoaEebc%2Fuploads%2Ff8cptqVbEDinipg0r6Lq%2Fimage.png" alt=""><figcaption></figcaption></figure>

* Now you can assign users/groups to the application, and those users will be able to log into Cosmo using the URL provided on setting up the provider.
