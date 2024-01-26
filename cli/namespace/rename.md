---
description: Rename an existing namespace within the organization
---

# Rename

## Usage

```bash
npx wgc namespace rename [name] --to [new name]
```

## Description

The `npx wgc namespace rename` command allows you to rename an existing namespace within the organization.

## **Parameters**

* `[name]`: The name of the namespace you want to rename.

## Options

* `-t, --to`: A required flag with the new name for the namespace

## **Example**

Rename a  namespace from "prod" to "production"

<pre class="language-bash"><code class="lang-bash"><strong>npx wgc namespace rename prod --to production
</strong></code></pre>

\
