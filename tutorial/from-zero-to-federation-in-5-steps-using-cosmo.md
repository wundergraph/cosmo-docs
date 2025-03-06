---
description: >-
  This guide offers a hands-on introduction to Cosmo using a sample demo
  repository. You'll set up the demo subgraphs and Cosmo Router locally,
  allowing you to start querying right away.
---

# From Zero to Federation in 5 Steps using Cosmo

### Prerequisites

* Node.js (>= 20 LTS)
* [Docker](https://www.docker.com/)

## Project setup

Clone the example project, which includes two subgraphs (`Posts` and `Users`) as well as a Router.

The example project is available here: [https://github.com/wundergraph/cosmo-demo](https://github.com/wundergraph/cosmo-demo), or you can clone it with the following command:

```
git clone https://github.com/wundergraph/cosmo-demo.git
cd cosmo-demo
```

### Step 1: Install the Cosmo CLI tool

Install the latest version of the Cosmo CLI.

```
npm i -g wgc@latest
```

### Step 2: Set Up and Run the Subgraphs

The cloned project contains preconfigured subgraphs and a script to run them.&#x20;

#### **Ensure the script is executable**&#x20;

In the project's **root directory**, run this to ensure the `start-subgraphs.sh` script is executable:

```
chmod +x start-subgraphs.sh
```

#### **Start the subgraphs**

Run the following command to install dependencies and start the subgraphs in the background:

```
./start-subgraphs.sh
```

#### **Verify the subgraphs are running**

Once the script finishes, check the subgraphs are running by visiting:

* [http://localhost:4001/graphql](http://localhost:4001/graphql) (for `subgraph-posts`)
* [http://localhost:4002/graphql](http://localhost:4002/graphql) (for `subgraph-users`)

If both load correctly, the servers are running.

#### **Test Queries**

You can run the following queries to confirm the subgraphs are functioning correctly.

#### **Posts Subgraph (localhost:4001)**

**To retrieve all posts, run the following query:**

```graphql
query {
  posts {
    id
    content
    authorId
  }
}

```

**Expected Output:**

```json
{
  "data": {
    "posts": [
      {
        "id": "1",
        "content": "Sample content",
        "authorId": "user-1"
      },
      {
        "id": "2",
        "content": "Some more sample content",
        "authorId": "user-1"
      },
      {
        "id": "3",
        "content": "Quality content",
        "authorId": "user-2"
      }
    ]
  }
}
```

**To retrieve a single post using its** `id`**, run the following query:**

```graphql
query {
  post(id: "1") {
    id
    content
    authorId
  }
}

```

**Expected Output:**

```json
{
  "data": {
    "post": {
      "id": "1",
      "content": "Sample content",
      "authorId": "user-1"
    }
  }
}
```

#### **Users Subgraph (localhost:4002)**

**To retrieve all users, run the following query:**

```graphql
query {
  users {
    id
    name
  }
}

```

**Expected Output:**

```json
{
  "data": {
    "users": [
      {
        "id": "user-1",
        "name": "Jane Doe"
      },
      {
        "id": "user-2",
        "name": "John Doe"
      }
    ]
  }
}
```

**To retrieve a single user with their** `id`**, run the following query:**

```graphql
query {
  user(id: "user-1") {
    id
    name
  }
}
```

**Expected Output:**

```json
{
  "data": {
    "user": {
      "id": "user-1",
      "name": "Jane Doe"
    }
  }
}
```

#### **Stop the Subgraphs**

You will need to keep the script running in the background for this tutorial, but if it is necessary to stop it, run:

```sh
pkill -f "npm run dev"
```

### Step 3: Generate the Router Configuration

The repository includes a `graph.localhost.yaml` configuration file for the `wgc` CLI tool to introspect and generate a router configuration.&#x20;

#### Setup Considerations

* For Docker-based subgraphs, use `graph.yaml` instead of `graph.localhost.yaml`.&#x20;
* For custom subgraphs, update the configuration file to match your setup.

#### Generate the Router Configuration

Open a new terminal and run the following command to navigate to the `router` directory.

```
cd router
```

Then, generate the router configuration by running:

```
wgc router compose --input graph.localhost.yaml --out config.json
```

**Expected Output**:

```
Router config successfully written to config.json
```

### Step 4: Run the router

While still in the `router` directory, start the router using Docker. Make sure Docker is running on your machine before proceeding.

We recommend using Docker to prevent dependency conflicts and maintain a consistent environment.

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
  -e EXECUTION_CONFIG_FILE_PATH="/config/config.json" \
  -v "$(pwd)/config.json:/config/config.json" \
  ghcr.io/wundergraph/cosmo/router:latest
```

The router will now be running in a Docker container.

### Step 5:  Query Against Your Router

Now that the router is running, you can test it by running queries on your federated graph at [http://localhost:3002](http://localhost:3002).

**Get All Posts with Author Details**

```graphql
query {
  posts {
    id
    content
    author {
      id
      name
    }
  }
}

```

**Expected Output:**

```json
{
  "data": {
    "posts": [
      {
        "id": "1",
        "content": "Sample content",
        "author": {
          "id": "user-1",
          "name": "Jane Doe"
        }
      },
      {
        "id": "2",
        "content": "Some more sample content",
        "author": {
          "id": "user-1",
          "name": "Jane Doe"
        }
      },
      {
        "id": "3",
        "content": "Quality content",
        "author": {
          "id": "user-2",
          "name": "John Doe"
        }
      }
    ]
  },
  "extensions": { /* omitted for brevity */ }
```

**Get a Single Post with Author Details**

```graphql
query {
  post(id: "1") {
    id
    content
    author {
      id
      name
    }
  }
}

```

**Expected Output:**

```json
{
  "data": {
    "post": {
      "id": "1",
      "content": "Sample content",
      "author": {
        "id": "user-1",
        "name": "Jane Doe"
      }
    }
  },
  "extensions": { /* omitted for brevity */ }
```

### All done!

Congrats! You've deployed two subgraphs, composed them into a federated Graph, and deployed a Router.

Next, consider deploying to the cloud to enable features like metrics, tracing, and monitoring in Cosmo Studio.

## Next Steps: Cosmo Cloud and deployments

{% content-ref url="../getting-started/cosmo-cloud-onboarding.md" %}
[cosmo-cloud-onboarding.md](../getting-started/cosmo-cloud-onboarding.md)
{% endcontent-ref %}

