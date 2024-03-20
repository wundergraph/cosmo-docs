---
description: >-
  Checks for breaking changes and composition errors in the proposed schema for
  the monograph.
---

# Check

## Usage

### Check schema changes

```bash
npx wgc monograph check <name> --schema <path-to-schema>
```

{% hint style="info" %}
Use this command whenever you make modifications to your monograph schema. It will report any GraphQL or composition errors before they land on production. The report will be made visible under [Schema Checks](../../studio/schema-checks.md).
{% endhint %}

## Description

The `npx wgc monograph check` command checks for breaking changes and composition errors in the proposed schema. This validation process ensures that the new schema you intend to use does not introduce any issues that could negatively impact the monograph.

## Parameters

* `<name>`: The name of the monograph for which you want to perform the validation check.

## Options

* `-n, --namespace` : The namespace of the monograph (Default: "default").
* `--schema <path-to-schema>`: The path to the new schema file that you want to validate. This file should contain the complete schema definition in the GraphQL Schema Definition Language (SDL) format.

## Example

Check for breaking changes and composition errors for the monograph "production" in the default namespace with the new schema file located at "./schemas/new\_schema.graphql":

<pre class="language-sh"><code class="lang-sh"><strong>npx wgc monograph check production -n default --schema ./schemas/new_schema.graphql
</strong></code></pre>

## Sample output with changes and errors

Changes

| CHANGE       | TYPE           | DESCRIPTION                                       |
| ------------ | -------------- | ------------------------------------------------- |
| BREAKING     | FIELD\_REMOVED | Field 'email' was removed from object type 'User' |
| NON-BREAKING | FIELD\_ADDED   | Field 'emailID' was added to object type 'User'   |



## Usage in CI and GitHub Integration

Checkout the tutorial [here](../../tutorial/pr-based-workflow-for-federation.md) on how to use the check command in CI with GitHub.

## Notes

* The `npx wgc monograph check` command interacts with the Cosmo platform's control plane to perform the validation checks.
* If there are no breaking changes or composition errors detected, the tables will be empty, indicating that the new schema is safe to be used in production.
