---
description: Allows you to delete a namespace
---

# Delete

## Usage

```bash
npx wgc namespace delete [name]
```

## Description

The `npx wgc namespace delete` command allows you to delete a namespace within the organization.

{% hint style="danger" %}
IMPORTANT: Deleting a namespace will delete all resources (federated graphs and subgraphs) within it. Please use the command carefully. Only admins and creators of the namespace can perform this action.
{% endhint %}

## **Parameters**

* `[name]`: The name of the namespace you want to delete.

## Options

* `-f, --force`: An optional flag that allows you to force delete the namespace without being prompted for confirmation.

## **Example**

1.  Delete a namespace named "production"

    <pre class="language-bash"><code class="lang-bash"><strong>npx wgc namespace delete production
    </strong></code></pre>

\
