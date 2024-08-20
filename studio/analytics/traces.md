---
description: >-
  Lists all the requests made to your router. For each request, it shows the
  relevant details, such as the operation performed, the client who made the
  request, and any error message
---

# Traces

{% hint style="info" %}
The amount of traces depends on the sampling rate of the OTEL instrumentation in the router.
{% endhint %}

<figure><img src="../../.gitbook/assets/Screenshot 2024-08-20 at 12.05.49.png" alt="A screenshot displaying an overview of the WunderGraph Cosmo Analytics: Traces page"><figcaption><p>WunderGraph Cosmo Analytics: Traces overview</p></figcaption></figure>

### Date Range

The date range filter lets you narrow down the list of requests based on when they were made. You can select one of the pre-defined ranges or select a custom date and time.&#x20;

<figure><img src="../../.gitbook/assets/Screenshot 2024-08-20 at 12.07.21.png" alt="A screenshot displaying the date range selector for WunderGraph Cosmo Analytics"><figcaption><p>Date range selector</p></figcaption></figure>

### Filters

Filters allow you to narrow down to specific requests and are a powerful tool to find and debug GraphQL requests.&#x20;

_The available filters can be different depending on the selected date range or grouping field._

<figure><img src="../../.gitbook/assets/Screenshot 2024-08-20 at 12.11.13.png" alt="A screenshot displaying the Analytics: Traces filter selection menu"><figcaption><p>Selecting an Analytics: Traces filter</p></figcaption></figure>

### Grouping

The grouping feature allows you to group the data in the table by none, operation name, client, or error message.

* **None**: The default view with no grouping applied. Each row represents an individual request made to the federated graph.
* **Operation Name**: Grouping by operation name will cluster the requests based on the operation type that was executed.
  * **Client**: Grouping by client allows you to see all the requests made by a particular client and client version. These are read from the headers `graphql-client-name` and `graphql-client-version` that you can set on your client application.
* **Error Message**: Grouping by error message clusters all requests that resulted in the same error message. This grouping can be particularly useful for identifying and diagnosing common errors.

Clicking on a row under groups other than \`none\` will relink the table to "group by none" and apply the appropriate filter. For example, if you click on a row in "group by operation name", it will take you back to the table grouped by none but only show requests with the operation name you selected.

<figure><img src="../../.gitbook/assets/Screenshot 2024-08-20 at 12.17.34.png" alt="A screenshot displaying the Analytics: Traces &#x22;Group By&#x22; menu"><figcaption><p>Analytics: Traces "Group By" menu</p></figcaption></figure>

### Auto-refresh

The table supports auto refreshing though selected intervals of 10 seconds, 30 seconds, 1 minute and 5 minutes.

<figure><img src="../../.gitbook/assets/Screenshot 2024-08-20 at 12.14.01.png" alt="A screenshot displaying the Analytics auto-refresh menu" width="260"><figcaption><p>The Analytics auto-refresh menu</p></figcaption></figure>
