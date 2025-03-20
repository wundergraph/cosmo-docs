---
description: >-
  Validate schema changes before deploying them to production. Ship breaking
  changes safely through operation checks.
icon: list-check
---

# Schema Checks

A schema check allows you to validate if a proposed schema change will produce any error before shipping it to production. We differentiate between four different kinds of errors:

1. **Composition errors:** Describes if the proposed schema can be composed with all other subgraphs in the federated graph. It will never be possible to publish a schema that has composition errors because it would result in a non-executable plan for the router.
2. **Breaking Change Detection:** Describes if the proposed schema is free of changes that break existing client operations. You can't ship breaking changes except you force them manually through an "Override" or automatically by using "[Operations Check](schema-checks.md#operation-checks)" see below.
3. **Operations Check:** Describes if the proposed schema affects any client operations based on real usage data. This is done by sending schema usage traffic to [Cosmo Cloud](../deployments-and-hosting/cosmo-cloud.md) from your routers. If you propose a breaking change and no active clients use the affected schema changes the check will pass.
4. **Lint Check**: Describes if the proposed schema is free of lint errors that are against your lint configuration.

You can run schema checks with [`wgc subgraph check`](../cli/subgraph/check.md) in the CI and optionally with native [Github integration](../tutorial/pr-based-workflow-for-federation.md). After you have identified the possible effects of your changes you can publish them to your router with [`wgc subgraph publish`](../cli/subgraph/publish.md)  .

## Check overview

This view lists all the checks performed, showing the timestamp of each check, the status (passed or failed), and whether the proposed schema was both composable and non-breaking. You can use the date picker to browse through the history.



* **Timestamp**: This column indicates when each check was performed. The most recent checks are displayed at the top.
* **Status**: This column shows the result of the check. A status of "Passed" means that the proposed schema was both composable and non-breaking. A status of "Failed" means that the proposed schema was either not composable, introduced breaking changes, or both.

## Check Page

<figure><img src="../.gitbook/assets/schema-checks.png" alt=""><figcaption><p>Schema Checks View</p></figcaption></figure>

### Overview

Have a glance at your check. Understand why the check succeeded or failed, and what graphs, operations, and clients were affected.

{% hint style="info" %}
Operation Checks can only function when your router sends schema usage metrics to Cosmo Cloud. This is the default behavior, provided you have not overwritten the default setting. By default operation checks look at the client traffic of the last 7 days to validate if a breaking change can be safely published, however, this can be configured using the namespace [Policies](policies/#schema-checks). If you have a more advanced use case, please upgrade to a higher plan or contact us.
{% endhint %}

<figure><img src="../.gitbook/assets/schema-check-detail.png" alt=""><figcaption></figcaption></figure>

#### Manual overrides

You can force a breaking change to be released even when all checks except composition errors are red. The override requires currently an integration with Github. Please check out our [tutorial](../tutorial/pr-based-workflow-for-federation.md) on how to set this up in a few minutes.

### Operation Checks

Understand which operations and clients are affected by the breaking changes. You can check which ones along all your changes affected that particular operation. Besides that, you can inspect the operation document or share the specific operation with your colleagues.&#x20;

{% hint style="warning" %}
Currently, we do not track the usage of directives. This means that changing or deleting directives will always be detected as a non-breaking change, even if clients are using them.
{% endhint %}

#### Operation Check Overrides

You can override certain changes as safe for future checks. Learn more by clicking on the link below.

{% content-ref url="overrides.md" %}
[overrides.md](overrides.md)
{% endcontent-ref %}

{% hint style="info" %}
Operations Check is not performed if there are no breaking changes in your proposed schema.
{% endhint %}

<figure><img src="../.gitbook/assets/schema-check-detail-operations.png" alt=""><figcaption></figcaption></figure>

### Operation Details

If you click on a specific operation, you can view all the changes that have impacted it. Each change is linked to the schema explorer and the field usage page. By default, the field usage opened from here displays the traffic during the timeframe of the check.

### Lint Checks

Lists all the lint errors/warnings found in the proposed schema.

<figure><img src="../.gitbook/assets/image (124).png" alt=""><figcaption></figcaption></figure>

