---
description: Set the router compatibility version for a specific federated graph.
---

# Set

{% hint style="warning" %}
Currently, there is only one router compatibility version. Consequently, this command does not yet serve a meaningful function (but will in the near future).
{% endhint %}

## Requirements

| Package               | Minimum version                                                          |
| --------------------- | ------------------------------------------------------------------------ |
| [wgc](../../intro.md) | [0.74.0](https://github.com/wundergraph/cosmo/releases/tag/wgc%400.74.0) |

## Usage

```bash
npx wgc federated-graph version set <name> --version <router compatibility version>
```

## Arguments

<table><thead><tr><th width="367.97265625">Description</th><th width="568.53515625">Type</th></tr></thead><tbody><tr><td>The name of the federated graph.</td><td>string</td></tr></tbody></table>

## Options

<table><thead><tr><th width="169.07421875">Option</th><th width="89.453125">Type</th><th>Value</th><th>Required</th><th>Default value</th></tr></thead><tbody><tr><td>--version/-v</td><td>string</td><td>The router compatibility version to be set.</td><td>true</td><td>n/a</td></tr><tr><td>--namespace/-n</td><td>string</td><td>The namespace where the federated graph exists.</td><td>false</td><td>"default"</td></tr></tbody></table>

## Description

The `wgc federated-graph version set` command allows a [valid router compatibility version](../../router/compatibility-version/list.md) to be set for a federated graph.

## Output

If successful, a table will display the graph name, its namespace, the previous router compatibility version, and the current router compatibility version.

## Example

```bash
> npx wgc federated-graph version set mygraph -v 1
✔ Successfully set the router compatibility version for federated graph "prod" to 1.
┌────────────┬───────────┬──────────────────┬─────────────┐
│ GRAPH NAME │ NAMESPACE │ PREVIOUS VERSION │ NEW VERSION │
├────────────┼───────────┼──────────────────┼─────────────┤
│ prod       │ default   │ 2                │ 1           │
└────────────┴───────────┴──────────────────┴─────────────┘
```
