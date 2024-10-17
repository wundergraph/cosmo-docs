---
icon: clouds-sun
description: >-
  Learn how to deploy your first federated graph and integrate it with your
  Cosmo Router.
---

# Cosmo Cloud Onboarding

## Get your Trial

Head over to [cosmo.wundergraph.com](https://cosmo.wundergraph.com) and create an account. Once you are in, your are on the Developer Plan with 10 million requests for free.

To better understand your use case and ensure that the onboarding process is as smooth as possible, please prepare the following information:

* **Send us your Subgraphs**. If this information is confidential, you can simply provide us with the names of the federation features you rely on.
* Do you have to migrate from an existing platform like Apollo?

{% hint style="info" %}
In order to complete this tutorial you need to have [Node.js LTS](https://nodejs.org/en/download/) (or higher), npm, and docker installed. This tutorial doesn't provide demo subgraphs. Prepare one before you continue.
{% endhint %}

## Prerequisites

* Create an account at [https://cosmo.wundergraph.com/login](https://cosmo.wundergraph.com/login)

{% hint style="info" %}
When onboarding a team, it is more efficient for the organization's administrator to invite individuals on the "Members" page rather than having everyone sign up manually.
{% endhint %}

## Install the CLI

Run the following command to install our CLI.

```bash
npm install -g wgc@latest
```

Log-in with the following command.

```bash
wgc auth login
```

This will open your browser, and you are instructed to log into your Cosmo account. Once logged in, you get a prompt in your terminal to select your organization.

## Create a federated graph

Run the following command to create your first federated graph:

```bash
wgc federated-graph create <graph_name> \
    --namespace default \
    --routing-url http://localhost:3002/graphql
```

I refer to the [CLI documentation ](../cli/federated-graph/)to explain the parameters in detail but they should be very self-descriptive. Critical is the `routing-url` that should point to your deployed router. Don't worry all parameters can be changed later.

### Create a subgraph

A federated graph without any subgraph is kind of useless. Let's create a subgraph:

```bash
wgc subgraph create <subgraph_name> \
    --namespace default \
    --routing-url http://localhost:4001/graphql
```

The last step is to publish the initial schema of your subgraph so we have something to federate.

### Publish the initial schema of the subgraph

```bash
wgc subgraph publish <subgraph_name> --namespace <namespace> --schema ./schema.graphqls
```

## Create a Router Token

Before we can start the Cosmo Router, we need to issue a Router token that gives the router permission to communicate with the controlplane. Please run the following command:

```bash
wgc router token create <token_name> --graph-name <graph_name> --namespace <namespace>
```

{% hint style="info" %}
Keep the token secure and store it permanently.
{% endhint %}

## Run the Router

The router can be configured through environment variables. Please check the [documentation](../router/configuration.md).

The following configuration is a minimal working example:

```bash
docker run \
  --name cosmo-router \
  --rm \
  -p 3002:3002 \
  --add-host=host.docker.internal:host-gateway \
  -e pull=always \
  -e DEV_MODE=true \
  -e LISTEN_ADDR=0.0.0.0:3002 \
  -e GRAPH_API_TOKEN=$TOKEN \
  ghcr.io/wundergraph/cosmo/router:latest
```

{% hint style="info" %}
We don't recommend the **latest** tag in production because it doesn't point to a fixed version and can introduce breaking changes anytime. You can find all releases [here](https://github.com/wundergraph/cosmo/pkgs/container/cosmo%2Frouter).
{% endhint %}

{% hint style="info" %}
Listening on 0.0.0.0 is required in a container network like docker or Kubernetes to expose the application. This is not necessary on bare metal or VM.
{% endhint %}

### Make a query

Open [http://localhost:3002/graphql](http://localhost:3001/graphql) and issue your first GraphQL operation with WunderGraph Cosmo! [🚀](https://apps.timwhitlock.info/emoji/tables/unicode#emoji-modal)

## Update your subgraph

Let's introduce a change e.g. remove a field in one of your subgraphs to validate that no breaking changes are accidentally released. In order to do so we use the **check** command:

```
wgc subgraph check <subgraph_name> --namespace <namespace> --schema ./subgraph.graphql
```

`wgc subgraph check` will not update your production router but it creates a [**check**](../studio/schema-checks.md) in the Cosmo Cloud Dashboard. This is very useful in PR-based workflows. Test your changes before you release them to production.

If you are sure about the change run:

```
wgc subgraph publish <subgraph_name> --namespace <namespace> --schema ./subgraph.graphql
```

This will update the subgraph and propagate the federated graph to your routers. It takes around 10s until your Router fetches and serves the latest valid schema composition.

## Invite Team Members (Paid plan)

You have successfully connected your Admin Account to Cosmo Cloud. Now it is time to invite your colleagues. Login to [cosmo.wundergraph.com](https://cosmo.wundergraph.com) and click on **Members**. Upon accepting this invitation, they must set a secure password to finish the process. After that, they can issue custom API Keys in the **API Keys** section to connect to Cosmo Cloud as well (See [above](cosmo-cloud-onboarding.md#install-wgc-the-command-line-tool)).

## Summary

In this tutorial, you have learned how to run your router with a federated graph. I hope you enjoyed it. Now, it's the perfect moment to visit your [Dashboard](https://cosmo.wundergraph.com) to get meaningful insights into your usage.
