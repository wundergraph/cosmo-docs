---
icon: newspaper
description: >-
  This guide brings you from zero to Federation in 5 Steps. Deploy and compose
  your Subgraphs and set up powerful CI Workflows for collaboration.
---

# From Zero to Federation in 5 Steps using Cosmo

## Overview

Cosmo enables teams to build, manage, and monitor federated GraphQL APIs. It facilitates collaboration across teams with robust CI workflows, breaking change detection, and schema change notifications.

Follow the five steps below to get from zero to managed Federation.

* [Step 1: Build and deploy Subgraphs](from-zero-to-federation-in-5-steps-using-cosmo.md#build-and-deploy-subgraphs)
* [Step 2: Create and publish Subgraphs on Cosmo](from-zero-to-federation-in-5-steps-using-cosmo.md#create-and-publish-subgraphs)
* [Step 3: Compose a Federated Graph on Cosmo](from-zero-to-federation-in-5-steps-using-cosmo.md#create-federated-graph)
* [Step 4: Configure and deploy Cosmo Router](from-zero-to-federation-in-5-steps-using-cosmo.md#configure-and-deploy-your-router)
* [Step 5: Setup CI/CD with Schema Checks for Breaking Change detection](from-zero-to-federation-in-5-steps-using-cosmo.md#setup-ci-cd-with-schema-checks)

### Prerequisites

* Node >= 18
* [Docker](https://www.docker.com/)
* Account on [Cosmo Cloud](https://cosmo.wundergraph.com) (Free Trial). This makes it easier to follow the steps. Skip if you are self-hosting the whole of Cosmo.

## Project setup

You can clone the example project, which includes all the reference code you need. It features two subgraphs (Posts and Users), a Router, and a CI/CD setup with GitHub Actions.&#x20;

You can find it here: [https://github.com/wundergraph/cosmo-demo](https://github.com/wundergraph/cosmo-demo)

### Install the Cosmo CLI tool

Run the following command to install the latest version of the Cosmo CLI.

```
npm i -g wgc@latest
```

If you prefer Yarn over npm, use the following command instead:

```
yarn global add wgc@latest
```

### Authenticate with the CLI

We need to ensure that the CLI can communicate with the Cosmo Control Plane so that we can publish and compose the subgraphs.

Run the following command in your terminal.

```
wgc auth login
```

After logging in, you can use the arrow keys to select your organization in your terminal.

Alternatively, you can log into the [Cosmo Dashboard](https://cosmo.wundergraph.com), click on API Keys, and export the generated API key using the following command.

```bash
export COSMO_API_KEY=<your_api_key>
```

Now that you're done with the prerequisites let's start with the real work!

## Build and Deploy Subgraphs

The first step is for each team to build and deploy their Subgraphs. You can deploy the Subgraphs on any infra you want. It's not required to expose the Subgraphs to the public. You can make them accessible on the public internet or keep them private in your own VPC or on-premises. In a later step, you will deploy the Cosmo Router to the same infra, so the only requirement is that the Router can communicate with the Subgraphs over the network.

For the sake of this guide's simplicity, we assume that you make the "Posts" Subgraph accessible at the URL \`https://posts.domain.com\` and the "Users" Subgraph accessible at the URL \`https://users.domain.com\`.

<figure><img src="../.gitbook/assets/image (86).png" alt=""><figcaption></figcaption></figure>

To help you get started quickly, we have prepared two compatible subgraphs in the Demo Project. You can either use these and follow along step by step or create your own subgraphs while mimicking the rest of the setup.

In the demo project, we have two simple Subgraphs that are compatible, meaning that they will compose into a federated Graph without errors. You can run them locally, but you’ll need **two terminal windows**—one for each subgraph.

First, open two terminal windows.&#x20;

You will navigate to a different subgraph in each terminal and ensure the dependencies are installed.

* In **Terminal 1**, navigate to the **Posts** subgraph and install dependencies:

```sh
cd subgraph-posts && npm i
```

* In **Terminal 2**, navigate to the **Users** subgraph and install dependencies:

```shell
cd subgraph-users && npm i
```

You will only need to install the dependencies once. Once they are installed, you’re ready to start the subgraphs.

Use the same two terminals to start the subgraphs. In each terminal, navigate to the corresponding subgraph and run:

```sh
npm run dev
```

This command allows you to run the subgraphs locally in each directory.&#x20;

Additionally, each subgraph includes a Dockerfile for quick deployment to a platform of your choice.

Here are the schemas for the subgraphs:

| Posts                                                                                                                                                                                                        | Users                                                                                                                                                                                                                                                                                                         |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <pre class="language-graphql"><code class="lang-graphql">type Post @key(fields: "id") {
  id: ID!
  content: String
  authorId: ID!
}

type Query {
  posts: [Post!]!
  post(id: ID!): Post
}

</code></pre> | <pre class="language-graphql"><code class="lang-graphql">type User @key(fields: "id") {
  id: ID!
  name: String!
}

type Post @key(fields: "id") {
  id: ID!
  authorId: ID! @external
  author: User! @requires(fields: "authorId")
}

type Query {
  users: [User!]!
  user(id: ID!): User
}
</code></pre> |



## Create and Publish Subgraphs

Once you have deployed the subgraphs, the next step is to register them on Cosmo and publish their GraphQL schemas to the Registry. This process is as simple as running two commands: `create` and `publish`.

Cosmo also uses [labels](https://cosmo-docs.wundergraph.com/cli/essentials#labels), which allows you to assign each subgraph with one or more labels. The labels help federated graphs dynamically select the appropriate subgraphs for composition, offering teams greater flexibility in structuring their graphs.

<figure><img src="../.gitbook/assets/image (85).png" alt=""><figcaption></figcaption></figure>

Here is an example using the demo project. These commands need to be run in the project's **root directory**.

```sh
# Team A
wgc subgraph create posts --label team=A --routing-url https://posts.domain.com
wgc subgraph publish posts --schema ./subgraph-posts/schema.graphql
```

```bash
# Team B
wgc subgraph create users --label team=B --routing-url https://users.domain.com
wgc subgraph publish users --schema ./subgraph-users/schema.graphql
```

After you run this command, you should see a confirmation message in the terminal

```
Subgraph was created successfully.
Subgraph published successfully.
```

If you’d like to confirm that your subgraphs have been successfully created and published, go to the Cosmo Dashboard and select Subgraphs from the men&#x75;**.** You should see a list of all registered subgraphs, their routing URLs, labels, and the last published time.&#x20;

Now that both subgraphs have been registered on Cosmo and their GraphQL schemas have been published, we’re ready to compose them into a federated graph.

## Create Federated Graph

Now, it is time to compose the above subgraphs. We create a federated Graph by defining label-matchers, which we use to select the Subgraphs we'd like to add to our federated Graph.

<figure><img src="../.gitbook/assets/image (78).png" alt=""><figcaption></figcaption></figure>

Below is the command to create a federated graph. We need to specify the labels that it needs to consider and the routing URL. The routing URL is the endpoint of the router that we will deploy in the next step.

```bash
wgc federated-graph create production --label-matcher team=A,team=B --routing-url https://graph.domain.com/graphql
```

After you run this command, you will see a confirmation message in the terminal.

```
Federated Graph was created successfully.
```

To verify that your federated graph was successfully created, navigate to the Studio Overview in the Cosmo Dashboard. This page displays key details such as the number of subgraphs, composition status, schema validation, and the router URL. If everything is set up correctly, you should see a  successful schema check and a router URL ready to fetch data from the subgraphs.

Our federated Graph is now composed. Let's deploy a Router to wire it all together.

## Configure and Deploy your Router

The final step before we can start querying our federated Graph is to configure and deploy the Cosmo Router. The Router is responsible for routing the requests to the correct service, aggregating the responses, and generating observability data like metrics and traces so we can understand the traffic that's flowing through our federated Graph.

The Router has to connect to the Control Plane to fetch its Configuration and update it automatically when you make changes to the federated Graph.

<figure><img src="../.gitbook/assets/image (76).png" alt=""><figcaption></figcaption></figure>

As the router needs to authenticate against the Control Plane to be able to fetch the correct configuration, we have to create a Router Token first. We're doing so by using wgc with the name of our composed Graph (production).

```bash
wgc router token create mytoken --graph-name production
```

You can run the router by executing a single Docker command. This way you can easily deploy to your own infra and expose the router using an endpoint with which your clients can query against. You can use this command to run a Router locally, or adjust it slightly to deploy a Router to your own infra, like Kubernetes, AWS Fargate or other deployment targets that allow you to run Container workloads.

```bash
docker run \
  --name cosmo-router \
  --rm \
  -p 3002:3002 \
  --add-host=host.docker.internal:host-gateway \
  --platform=linux/amd64 \
  -e pull=always \
  -e DEV_MODE=true \
  -e LISTEN_ADDR=0.0.0.0:3002 \
  -e GRAPH_API_TOKEN=$TOKEN \
  ghcr.io/wundergraph/cosmo/router:latest
```

## Setup CI/CD with schema checks

Finally, we want to set up a workflow to facilitate collaboration across teams while ensuring that changes don't break our composed Graph.

The wgc CLI provides two commands to accomplish this task, `subgraph check` and `subgraph publish`.

<figure><img src="../.gitbook/assets/image (84).png" alt=""><figcaption></figcaption></figure>

You can use the following convention.

* Run `subgraph check` on pull requests to prevent merging breaking changes into your main branch.
* Run `subgraph publish` on push/merge to main

Example GitHub workflows to achieve the above are provided in the demo project under the `.github` directory.

## The overall picture

<figure><img src="../.gitbook/assets/image (77).png" alt=""><figcaption></figcaption></figure>

## All Done!

Congrats! You're done with the initial setup of your federated Graph infrastructure. You've deployed two subgraphs for two different teams, composed them into a federated Graph, deployed a Router, and configured the necessary CI/CD pipelines to prevent breaking changes and publish changes to the Subgraphs.

Your federated Graph is now ready to be queried through the Explorer or GraphQL Endpoint on your Router. Once you've made some requests to the Graph, you can observe the metrics and traces in Cosmo Studio.
