---
description: >-
  Please read through this to have a better understanding of the nuances that
  take place when executing commands which we will cover in the upcoming pages.
---

# Essentials

## Order of execution

The order in which you create graphs does not matter. You can either create subgraphs first or federated graphs. Depending on the labels the appropriate subgraphs will be taken into account for composing your federated graphs.

## Labels

Labels are a `key=value` pair separated by a `=` sign. Ex: `team=A` `env=prod`

You can assign labels to only subgraphs. Labels have the following restrictions

* Both key and value must be 63 characters or less (cannot be empty).
* Must begin and end with an alphanumeric character (\[a-z0-9A-Z]).
* Could contain dashes (-), underscores (\_), dots (.), and alphanumerics between.

## Label Matcher

Label matchers are used with Federated Graphs to determine which subgraphs are chosen for composition. They are a set of labels separated by spaces (or the option) and grouped by commas.

To understand how they work here is an example.

#### Federated Graph&#x20;

`--label-matcher team=A,team=B,team=C env=prod`&#x20;

is the same as

`--label-matcher team=A,team=B,team=C --label-matcher env=prod`&#x20;

The above matcher translates to `(team=A || team=B || team=C) && env=prod`

Create a federated graph from all subgraphs of Team A, Team B, and Team C but only those which was marked for production.

#### Subgraphs&#x20;

1\. `--labels team=A,provider=aws,env=prod`

2\. `--labels team=B,env=prod`

3\. `--labels team=C,env=dev`

This will create a federated graph consisting of subgraphs 1 and 2 with labels team=A,team=B, and env=prod.

## Validate composition

While labeling is a powerful concept it can be very error-prone to understand the final result of your composition. For those reasons, we provide the CLI commands

* [`wgc federated-graph check`](federated-graph/check.md) and
* [`wgc subgraph check`](subgraph/check.md)

That allows you to validate if the composition will produce any errors and what the result will look like at the end.&#x20;

## Routing Url

The routing Url must be specified when creating a federated graph or subgraph. In the case of a federated graph, it points to the Url of your Cosmo router. For subgraphs, it is the service URL that the subgraph will be accessible at.

## Multiple environments

The [label matcher](essentials.md#label-matcher) concept allows the expression of any `OR` and `AND` combination to compose multiple subgraphs. That makes it very simple to create and organize multiple environments. Every federated graph represents physically a router instance and every subgraph is a service connected to the router.
