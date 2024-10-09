---
description: >-
  Checks for breaking changes and composition errors for all the connected
  federated graphs.
---

# Check

## Usage

### Check schema changes

```bash
npx wgc subgraph check <name> --schema <path-to-schema>
```

{% hint style="info" %}
Use this command whenever you make modifications to your subgraphs. It will report any GraphQL or composition errors before they land on production. The report will be made visible under [Schema Checks](../../studio/schema-checks.md).
{% endhint %}

### Check deletion of a subgraph

```
npx wgc subgraph check <name> --delete
```

{% hint style="info" %}
This command will check any breaking changes or composition errors in case the subgraph is deleted.
{% endhint %}

### Check how a new subgraph affects the federated graph

<pre class="language-bash"><code class="lang-bash"><strong># First create it
</strong><strong>npx wgc subgraph create products --label team=A --routing-url http://localhost:4001/graphql
</strong><strong># Check the impact
</strong><strong>npx wgc subgraph check &#x3C;name> --schema schema.graphql
</strong></code></pre>

## Description

The `npx wgc subgraph check` command checks for breaking changes and composition errors in all connected federated graphs associated with the specified subgraph. This validation process ensures that the new schema you intend to use does not introduce any issues that could negatively impact existing federated graphs.

## Parameters

* `<name>`: The name of the subgraph for which you want to perform the validation check. This should be the exact name of the subgraph you wish to check.

## Options

* `-n, --namespace` : The namespace of the federated graph (Default: "default").
* `--schema <path-to-schema>`: The path to the new schema file that you want to validate. This file should contain the complete schema definition in the GraphQL Schema Definition Language (SDL) format.
* `--delete`: Check for breaking changes and composition errors in case the subgraph will be deleted.
* `--skip-traffic-check` : This will skip checking against client traffic and any breaking change will fail the run.

{% hint style="info" %}
The check command requires either the `--schema or --delete parameter.`
{% endhint %}

## Examples

1.  Check for breaking changes and composition errors for the subgraph "products" with the new schema file located at "./schemas/new\_schema.graphql":

    <pre class="language-sh"><code class="lang-sh"><strong>npx wgc subgraph check products -n default --schema ./schemas/new_schema.graphql
    </strong></code></pre>

## Sample output with changes and errors

Changes

| CHANGE       | TYPE           | DESCRIPTION                                       |
| ------------ | -------------- | ------------------------------------------------- |
| BREAKING     | FIELD\_REMOVED | Field 'email' was removed from object type 'User' |
| NON-BREAKING | FIELD\_ADDED   | Field 'emailID' was added to object type 'User'   |

Composition Errors

<table><thead><tr><th width="263">FEDERATED_GRAPH_NAME</th><th>ERROR_MESSAGE</th></tr></thead><tbody><tr><td>inventory</td><td>Type "Product" is an extension type, but there is no type definition for "Product" in any subgraphs.</td></tr></tbody></table>

2.  Check for breaking changes and composition errors for the subgraph "products" with the new schema file located at "./schemas/new\_schema.graphql":\


    ```sh
    npx wgc subgraph check employees --delete
    ```



### Sample output

Changes

| CHANGE       | TYPE          | DESCRIPTION                   |
| ------------ | ------------- | ----------------------------- |
| BREAKING     | TYPE\_REMOVED | Type 'Department' was removed |
| NON-BREAKING | TYPE\_REMOVED | Type 'RoleType' was removed   |

Composition Errors

<table><thead><tr><th width="263">FEDERATED_GRAPH_NAME</th><th>ERROR_MESSAGE</th></tr></thead><tbody><tr><td>inventory</td><td>The subgraph "products" could not be federated for the following reason:<br>The object type "Employee" defines the directive "@override(from: "employees)" on the following field: "notes".<br>The required "from" argument of type "String!" must be provided with an existing subgraph name.<br>However, a subgraph by the name of "employees" does not exist.</td></tr></tbody></table>

## VCS Context

If you want to associate custom information with the checks being performed, you can do so by setting the following environment variables:

* `COSMO_VCS_AUTHOR`: The author's email address associated with the commit (e.g: `foo@bar.com`).
* `COSMO_VCS_COMMIT`: The specific commit hash for the changes you are testing (e.g: `de233ddwqedqwe`).
* `COSMO_VCS_BRANCH`: The branch name where the commit resides (e.g: `main`).

```
COSMO_VCS_AUTHOR=foo@bar.com
COSMO_VCS_COMMIT=de233ddwqedqwe
COSMO_VCS_BRANCH=main
```

## Usage in CI and GitHub Integration

Checkout the tutorial [here](../../tutorial/pr-based-workflow-for-federation.md) on how to use the subgraph check command in CI with GitHub.

## Notes

* The `npx wgc subgraph check` command interacts with the Cosmo platform's control plane and connected federated graphs to perform the validation checks.
* If there are no breaking changes or composition errors detected, the tables will be empty, indicating that the new schema is compatible with the existing federated graphs.
