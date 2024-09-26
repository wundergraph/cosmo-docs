---
description: >-
  Override the result of breaking changes in schema checks for individual
  operations which you deem are safe. Overrides are active across all graphs in
  a namespace.
---

# Overrides

## Configuring overrides

Whenever you run a check against a subgraph we detect breaking changes that affect various operations. On the check page, for each operation you can configure overrides whether they are safe or not.

{% hint style="info" %}
Applying overrides will not change the outcome of the check run. Only future checks will take them into account.
{% endhint %}

<figure><img src="../.gitbook/assets/image (119).png" alt=""><figcaption></figcaption></figure>

You can also toggle overrides for all changes in the click of a button. Setting `Ignore All` will consider all current and new breaking changes as safe for the operation.

<figure><img src="../.gitbook/assets/image (120).png" alt=""><figcaption></figcaption></figure>

## Viewing all overrides

You can view all overrides in a single place. From here you can open the configuration to fine tune existing overrides or go to metrics/traces to check current usage.

<figure><img src="../.gitbook/assets/image (121).png" alt=""><figcaption></figcaption></figure>

<figure><img src="../.gitbook/assets/image (122).png" alt=""><figcaption></figcaption></figure>
