---
description: >-
  Checks for composition errors and presents a list of subgraphs that constitute
  the new federated graph.
---

# Check

## Usage

```bash
npx wgc federated-graph check <name> --label-matcher <labels...>
```

## Description

The `npx wgc federated-graph check` command allows you to check for composition errors for the new labels provided. The subgraphs which match the labels will be federated and the errors, if they exist will be displayed to the user. This check can be performed without updating the labels of the federated graph.

## Parameters

* `<name>`: The name of the federated graph you want to check for composition errors. Replace `<name>` with the name of the federated graph.

## Options

```bash
--label-matcher <labels...>
```

The labels used to select the subgraphs to be federated. Labels are passed in the format `<key>=<value> <key>=<value>`, where each `<key>=<value>` pair represents a label key and its corresponding value. The federated graph will include the subgraphs that match the updated labels.

## Examples

```bash
npx wgc federated-graph check production --label-matcher team=B department=Engineering
```

Checks the federated graph named "production" for composition errors by composing the subgraphs that match the labels "team=B" or "department=Engineering".

```bash
npx wgc federated-graph check production --label-matcher team=B --label-matcher department=Engineering
```

Checks the federated graph named "production" for composition errors by composing the subgraphs that match the labels "team=B" and "department=Engineering".
