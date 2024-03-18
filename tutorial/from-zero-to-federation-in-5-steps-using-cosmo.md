---
description: >-
  This guide brings you from zero to Federation in 5 Steps. Deploy and compose
  your Subgraphs and set up powerful CI Workflows for collaboration.
---

# From Zero to Federation in 5 Steps using Cosmo

## Overview

Cosmo enables teams to build, manage, and observe federated GraphQL APIs. It enables collaboration across teams through powerful CI workflows with breaking change detection and schema change notifications.

Follow the five steps below to get from zero to managed Federation.

* [Step 1: Build and deploy Subgraphs](from-zero-to-federation-in-5-steps-using-cosmo.md#build-and-deploy-subgraphs)
* [Step 2: Create and publish Subgraphs on Cosmo](from-zero-to-federation-in-5-steps-using-cosmo.md#create-and-publish-subgraphs)
* [Step 3: Compose a Federated Graph on Cosmo](from-zero-to-federation-in-5-steps-using-cosmo.md#create-federated-graph)
* [Step 4: Configure and deploy Cosmo Router](from-zero-to-federation-in-5-steps-using-cosmo.md#configure-and-deploy-your-router)
* [Step 5: Setup CI/CD with Schema Checks for Breaking Change detection](from-zero-to-federation-in-5-steps-using-cosmo.md#setup-ci-cd-with-schema-checks)

### Prerequisites

* Node >= 18
* Docker
* Cosmo `wgc` CLI &#x20;
* Account on [Cosmo Cloud](https://cosmo.wundergraph.com) (Free Trial). This makes it easier to follow the steps. (skip if you are self-hosting the whole of Cosmo)



## Project setup

You can clone the example project which has all the reference code that you need. It consists of 2 subgraphs namely posts and users, a Router, and the CI/CD configuration with GitHub actions. You can find it here: [https://github.com/wundergraph/cosmo-demo](https://github.com/wundergraph/cosmo-demo)

### Install the Cosmo CLI tool

Run the following command to install the latest version of the Cosmo CLI.

```
npm i -g wgc@latest
```

Alternatively, you can use yarn.

```
yarn global add wgc@latest
```

### Authenticate with the CLI

We need to make sure that the CLI can talk with the Cosmo Control Plane to be able to publish the Subgraphs and compose them.

Run the following command and select your organization after logging in.

```
wgc auth login
```

Alternatively, you can log into the [Cosmo Dashboard](https://cosmo.wundergraph.com), click on API Keys, and export the generated API key using the following cmd.

```bash
export COSMO_API_KEY=<your_api_key>
```

We're done with the prerequisites, let's now start with the real work!



## Build and Deploy Subgraphs

The first step is for each team to build and deploy their Subgraphs. You can deploy the Subgraphs on any infra you want. It's not required to publicly expose the Subgraphs. You can make them accessible on the public internet, or keep them private in your own VPC or on-premises. In a later step, you will deploy the Cosmo Router to the same infra, so the only requirement is that the Router is able to communicate with the Subgraphs over the network.

For the sake of simplicity of this guide, we assume that you make the "Posts" Subgraph accessible on the URL \`https://posts.domain.com\` and the Users Subgraph on the \`https://users.domain.com\` URL.

<figure><img src="../.gitbook/assets/image (70).png" alt=""><figcaption></figcaption></figure>

To get you through this tutorial as easily as possible, we've prepared two Subgraphs for you in the [Demo Project](https://github.com/wundergraph/cosmo-demo). You can use these two and follow all steps closely, or you can use your own Subgraphs and mimic the rest of the steps.

In the demo project, we have two simple Subgraphs that are compatible, meaning that they will compose into a federated Graph without errors. You can run the subgraphs locally using `npm run dev` in each directory. There is also a Dockerfile for each to deploy them to the platform of your choice. Here are the schemas for the subgraphs.

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

Once your teams have deployed their subgraphs, we now have to register them on Cosmo and publish their GraphQL Schemas to the Registry. It is as simple as running 2 commands `create` and `publish`.&#x20;

Note that we have the concept of labels. Each subgraph is given one or more labels which are then used by a federated graph to select the right subgraphs for composition. This gives ultimate flexibility for several teams to compose any desired graphs.

<figure><img src="../.gitbook/assets/image (69).png" alt=""><figcaption></figcaption></figure>

Here is an example using the demo project. Commands are run at the root of the project.

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

We have now registered both Subgraphs on Cosmo and published their GraphQL Schemas. We're ready to compose them into a federated Graph.



## Create Federated Graph

Now it is time to compose the above subgraphs. We create a federated Graph by defining label-matchers. The matchers are being used to select the Subgraphs we'd like to add to our federated Graph.

<figure><img src="../.gitbook/assets/image (62).png" alt=""><figcaption></figcaption></figure>

Below is the command to create a federated graph. We need to specify the labels that it needs to consider and the routing URL. The routing URL is the endpoint of the router that we will deploy in the next step.

```bash
wgc federated-graph create production --label-matcher team=A,team=B --routing-url https://graph.domain.com/graphql
```

Our federated Graph is now composed. Let's deploy a Router to wire it all together.

## Configure and Deploy your Router

The final step before we can start querying our federated Graph is to configure and deploy the Cosmo Router. The Router is responsible for routing the requests to the correct service, aggregating the responses, and generating observability data like metrics and traces so we can understand the traffic that's flowing through our federated Graph.

The Router has to connect to the Control Plane to fetch its Configuration and update it automatically when you make changes to the federated Graph.

<figure><img src="../.gitbook/assets/image (60).png" alt=""><figcaption></figcaption></figure>

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

<figure><img src="../.gitbook/assets/image (68).png" alt=""><figcaption></figcaption></figure>

You can use the following convention.

* Run `subgraph check` on pull requests to prevent merging breaking changes into your main branch.
* Run `subgraph publish` on push/merge to main

Example GitHub workflows to achieve the above are provided in the demo project under the `.github` directory.

## The overall picture

<figure><img src="../.gitbook/assets/image (61).png" alt=""><figcaption></figcaption></figure>

## All Done!

Congrats! You're done with the initial setup of your federated Graph infrastructure. You've deployed two subgraphs for two different teams, composed them into a federated Graph, deployed a Router, and configured the necessary CI/CD pipelines to prevent breaking changes and publish changes to the Subgraphs.

Your federated Graph is now ready to be queried through the Explorer or GraphQL Endpoint on your Router. Once you've made some requests to the Graph, you can observe the metrics and traces in Cosmo Studio.
