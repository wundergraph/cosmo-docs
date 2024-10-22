---
icon: clouds-sun
description: >-
  Learn how to deploy your first federated graph and integrate it with your
  Cosmo Router.
---

# Cosmo Cloud Onboarding

## Getting Started

Head over to [cosmo.wundergraph.com](https://cosmo.wundergraph.com) and create an account. Once you are in, your are on the Developer Plan with 10 million requests for free.

{% stepper %}
{% step %}
## Prepare prerequisites

* Create an account at [https://cosmo.wundergraph.com/login](https://cosmo.wundergraph.com/login)
* You need to have [Node.js LTS](https://nodejs.org/en/download/) (or higher), npm, and docker installed.
* Curl is needed to download files.
{% endstep %}

{% step %}
## Prepare your Organization

After a successful signup, a personal organization is automatically created for you. This organization can be used to run the demo. However, based on your requirements, we recommend creating a separate organization after completing this tutorial. To do so, click on the organization dropdown and select **"Create a new Organization."** Be sure to choose an appropriate name and slug for your new organization.

<img src="../.gitbook/assets/CleanShot 2024-10-22 at 12.13.33@2x.png" alt="" data-size="original">
{% endstep %}

{% step %}
## Install the CLI

Run the following command to install our CLI. The CLI enables interaction with the control plane to create and manage resources such as graphs and API keys.

```bash
npm install -g wgc@latest
```

Log-in with the following command.

```bash
wgc auth login
```

This will open your browser, and you are instructed to log into your Cosmo account. Once logged in, you get a prompt in your terminal to select your organization.

After successful login you should be able to run the command to verify if you are logged in to the right organization.

```bash
wgc auth whoami
```
{% endstep %}
{% endstepper %}

## Create the Demo

### Create a Namespace

For clear separation of concerns, we create a new namespace. Namespaces are an effective tool for creating isolated environments. A namespace is a physical container that separates resources, preventing accidental modification of resources between environments.&#x20;

```bash
wgc namespace create development
```

### Create a Federated Graph

The next step is to create a federated graph that represents your unified, federated GraphQL schema. A federated graph is assigned a URL and can be logically mapped to a single router instance. In a production environment, you would need to specify here the URL of your deployed router.

```bash
wgc federated-graph create demo \
    --namespace development \
    --routing-url https://demo-router.fly.dev/graphql
```

I refer to the [CLI documentation ](../cli/federated-graph/)to explain the parameters in detail but they should be very self-descriptive. Don't worry all parameters can be changed later.

### Create Subgraphs

A federated graph without any subgraph is not functional. Let's create a few subgraphs to build a valid and accessible GraphQL schema. For simplicity, we will use demo subgraphs, which have been deployed on a serverless platform. **Please create the subgraphs from left to right, we start with the Products subgraph.**

{% tabs %}
{% tab title="Products" %}
1. Create the subgraph:

```bash
wgc subgraph create employees \
    --namespace development \
    --routing-url https://employees-api.fly.dev/graphql
```

2. Download the schema and publish it:

```bash
curl -O https://raw.githubusercontent.com/wundergraph/cosmo/refs/heads/main/demo/pkg/subgraphs/employees/subgraph/schema.graphqls \
&& wgc subgraph publish employees \
    --namespace development \
    --schema ./schema.graphqls
```
{% endtab %}

{% tab title="Employee" %}
1. Create the subgraph:

```bash
wgc subgraph create products \
    --namespace development \
    --routing-url https://product-api.fly.dev/graphql
```

2. Download the schema and publish it:

```bash
curl -O https://raw.githubusercontent.com/wundergraph/cosmo/refs/heads/main/demo/pkg/subgraphs/products/subgraph/schema.graphqls \
&& wgc subgraph publish products \
    --namespace development \
    --schema ./schema.graphqls
```

After publishing, you will encounter a few errors indicating that the composition was unsuccessful. This is expected and will be resolved once the other graphs are published. It is important to note that an invalid composition will never be deployed to your router. In all cases, your router will continue to run with the latest valid composed schema.
{% endtab %}

{% tab title="Mood" %}
1. Create the subgraph:

```bash
wgc subgraph create mood \
    --namespace development \
    --routing-url https://mood-api.fly.dev/graphql
```

2. Download the schema and publish it:

```bash
curl -O https://raw.githubusercontent.com/wundergraph/cosmo/refs/heads/main/demo/pkg/subgraphs/mood/subgraph/schema.graphqls \
&& wgc subgraph publish mood \
    --namespace development \
    --schema ./schema.graphqls
```

After publishing the schema, we fixed several composition errors. The next step, is to publish the Availability subgraph.
{% endtab %}

{% tab title="Availability" %}
1. Create the subgraph:

```bash
wgc subgraph create availability \
    --namespace development \
    --routing-url https://availability-api.fly.dev/graphql
```

2. Download the schema and publish it:

```bash
curl -O https://raw.githubusercontent.com/wundergraph/cosmo/refs/heads/main/demo/pkg/subgraphs/availability/subgraph/schema.graphqls \
&& wgc subgraph publish availability \
    --namespace development \
    --schema ./schema.graphqls
```

After publishing the schema, no composition errors should be reported. Your graph has been successfully composed and is ready to be retrieved by the router. Open the Cosmo Overiew page of your graph to verify it.

<figure><img src="../.gitbook/assets/CleanShot 2024-10-22 at 12.50.39@2x.png" alt=""><figcaption></figcaption></figure>
{% endtab %}
{% endtabs %}

### Create a Router Token

After publishing all subgraphs, we have to issue a Router token that gives the router permission to communicate with the controlplane and to download the latest valid Graph composition. Please run the following command:

```bash
wgc router token create myName \
    --graph-name demo \
    --namespace development
```

### Run the Router

Finally, go to the **Overview** page of your federated graph in Cosmo Cloud and click on "Run Router locally" to copy the second command to run the Router locally.&#x20;

**Ensure** that you have replaced `<graph-api-token>` with your token, which was generated in a previous step.

<figure><img src="../.gitbook/assets/CleanShot 2024-10-22 at 12.54.07@2x (1).png" alt="" width="375"><figcaption></figcaption></figure>

Alternatively, you can use the following command:

```bash
docker run \
  --name cosmo-router \
  --rm \
  -p 3002:3002 \
  --add-host=host.docker.internal:host-gateway \
  --pull always \
  -e DEV_MODE=true \
  -e LISTEN_ADDR=0.0.0.0:3002 \
  -e GRAPH_API_TOKEN="<graph-api-token>" \
  ghcr.io/wundergraph/cosmo/router:latest
```

### Open the Playground

Open [http://localhost:3002/graphql](http://localhost:3001/graphql) and run your first GraphQL operation with WunderGraph Cosmo! [🚀](https://apps.timwhitlock.info/emoji/tables/unicode#emoji-modal) The same playground is also available on Cosmo Cloud.

### Example Query that involves all subgraphs

```graphql
query myEmployees {
  employees {
    id
    products
    role {
      departments
    }
    details {
      forename
    }
    isAvailable
    currentMood
  }
}
```

#### ⭐ Bonus

After executing the [Example Query](cosmo-cloud-onboarding.md#example-query-that-involves-all-subgraphs), use the dropdown on the right to review how the query was executed on the router and examine the generated query plan. This provides you with the necessary tools to investigate issues of any kind, both during development and, more importantly, in production.

If you want to learn more about it, please take a look at [ART](../router/advanced-request-tracing-art.md) and [Query Plans](../router/query-plan.md).

<figure><img src="../.gitbook/assets/CleanShot 2024-10-22 at 13.03.19@2x.png" alt="" width="563"><figcaption></figcaption></figure>

## Prevent breaking changes

Each time you perform an operation against the router, we collect schema usage data. This data is centralized on our platform, providing you with the necessary tools to manage federation at scale. One of the most critical features is the ability to understand when your customers may be impacted by schema changes. To make this process part of your workflow, we provide a [check](../cli/subgraph/check.md) command to understand the impact of a potential change. Based on the demo above, please run the following commands.



{% stepper %}
{% step %}
### Download the schema of the `Employees` subgraph

```
curl -O https://raw.githubusercontent.com/wundergraph/cosmo/refs/heads/main/demo/pkg/subgraphs/employees/subgraph/schema.graphqls
```
{% endstep %}

{% step %}
### Remove the `OPERATIONS` enum value and run the check command

```graphql
enum Department {
  ENGINEERING
  MARKETING
  # OPERATIONS
}
```

Run the check command:

```bash
wgc subgraph check employees \
    --namespace development \
    --schema ./schema.graphqls
```
{% endstep %}

{% step %}
### Breaking change detected with client usage

You should see a similar output as follows. We have identified the change as a breaking change, and since the `departments` field was queried in the example query, it was correctly identified as being in use as well.

```
❯ wgc subgraph check employees \
    --namespace development \
    --schema ./schema.graphqls

Checking the proposed schema
⚠ Compared 1 breaking change's impacting 1 operations.  
Found client activity between 10/22/2024, 2:00:00 AM and 10/22/2024, 2:00:00 AM

Detected the following changes:
┌────────────┬────────────────────┬────────────────────────────────────────────────────────────┐
│ CHANGE     │ TYPE               │ DESCRIPTION                                                │
├────────────┼────────────────────┼────────────────────────────────────────────────────────────┤
│ ✖ BREAKING │ ENUM_VALUE_REMOVED │ Enum value 'OPERATIONS' was removed from enum 'Department' │
└────────────┴────────────────────┴────────────────────────────────────────────────────────────┘

✖ Schema check failed. This check has encountered 1 breaking change's that would break operations from existing client traffic.
See https://cosmo-docs.wundergraph.com/studio/schema-checks for more information on resolving operation check errors.
Open in studio: https://cosmo.wundergraph.com/.....
```

**Click on the link below to see the check in Cosmo Studio!**
{% endstep %}

{% step %}
### Release your changes

Once you are confident about the impact of your changes, you can publish them and automatically update your router fleet.

```bash
wgc subgraph publish employees \
    --namespace development \
    --schema ./schema.graphqls
```
{% endstep %}
{% endstepper %}

## Summary

In this tutorial, you have learned how to run your router with a functional federated graph consisting of four subgraphs, and how to safely release changes to production. I hope you enjoyed it. Now, it's the perfect moment to visit your [Dashboard](https://cosmo.wundergraph.com) to get meaningful insights into your usage.
