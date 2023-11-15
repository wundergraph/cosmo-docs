---
description: This tutorial provides steps on how to run a federated graph/router locally.
---

# How to run and develop your federated graph locally

## TL;DR

1. Install the latest [`wgc`](https://www.npmjs.com/package/wgc)
2. Download and extract the latest router for your OS/architecture from the Assets list [here](https://github.com/wundergraph/cosmo/releases?q=router\&expanded=true)
3. Create `graphs.yaml` with your subgraph information:

<pre class="language-yaml"><code class="lang-yaml">version: 1
subgraphs:
  - name: subgraph-a
    routing_url: http://localhost:4001/graphql
  - name: subgraph-b
<strong>  # ...etc.
</strong></code></pre>

4. Generate the config with `wgc compose`:

```bash
wgc router compose -i path/to/graphs.yaml -o path/to/router/binary/config.json. 
```

5. Create a `.env` file in the router binary directory:

```bash
FEDERATED_GRAPH_NAME=federated_graph
GRAPH_API_TOKEN=dummy # cannot be empty
ROUTER_CONFIG_PATH=config.json
```

6. Run the router and go to `localhost:3002`

```
path/to/router/binary/router
```

## Pre-requirements

### wgc

[`wgc`](https://www.npmjs.com/package/wgc) is the CLI tool for Cosmo.&#x20;

If you haven't already, download and install the latest `wgc` globally with the following command:

```bash
npm install -g wgc@latest
```

### A method to run the router

#### Option 1: download a router binary

You can also run your router through a binary by downloading the appropriate router binary for your system [here](https://github.com/wundergraph/cosmo/releases?q=router\&expanded=true).\
\
The latest router release is shown at the top of the list. Within the same release card, you can expand `Assets`, which will reveal a list of router binaries for various architectures.\
\
Please make sure you download the correct router binary for you system architecture (and extract the compressed folder to a convenient location).\
\
The binaries are categorised by operating system:

| Binary        | OS/Architecture                     |
| ------------- | ----------------------------------- |
| darwin-amd64  | MacOS (Intel 64 bit)                |
| darwin-arm64  | MacOS (Apple Silicon 64 bit \[M1+]) |
| linux-386     | Linux 32 bit                        |
| linux-amd64   | Linux AMD 64 bit                    |
| linux-arm64   | Linux ARM 64 bit                    |
| windows-386   | Windows 32 bit                      |
| windows-amd64 | Windows 64 bit                      |

<figure><img src="../.gitbook/assets/Screenshot 2023-11-14 at 17.02.39 (1).png" alt="an image showing the expandable assets menu"><figcaption><p>The red arrow points to the expandable Assets menu, under which the list of binaries can be found</p></figcaption></figure>

#### Option 2: download and install go 1.21

If you want to run your router from source through `cosmo/router/cmd/router/main.go`, you will need to download and install `go` (sometimes known as GoLang) [here](https://go.dev/doc/install).\
\
For MacOS, you can also install using [homebrew](https://formulae.brew.sh/formula/go).

## Getting started

The very first step is to choose or create a new directory into which you will be adding the files that are outlined in this tutorial.

If you are using a router binary, it might be convenient to extract the binary folder to the same directory.

## Providing the subgraph information (.yaml file)

You will need to create a `.yaml` that includes information about all the subgraphs you wish to include and compose into your federated graph. This tutorial will use the file name `graphs.yaml`.\
\
The information you are required to provide is as follows:

<table><thead><tr><th width="118">Property</th><th width="304">Description</th><th>Required</th><th data-hidden></th></tr></thead><tbody><tr><td>name</td><td>the unique name of the subgraph</td><td>true</td><td></td></tr><tr><td>url</td><td>the unique url (endpoint) of the subgraph (typically ends with <code>/graphql</code>)</td><td>true</td><td></td></tr><tr><td>schema</td><td>includes the nested <code>file</code> property, which is the relative path to your subgraph's graphql schema</td><td>false</td><td></td></tr></tbody></table>

If you do not provide the optional `schema` property, the subgraph contents will be retrieved through introspection.\
\
If you _do_ provide a `schema` property, you must then provide a nested (required) `file` property, which should be the relative path to the subgraph schema with an extension such as `.graphql` or `.graphqls`.\
\
A full example file is shown below.

```yaml
version: 1
subgraphs:
  - name: subgraph-a
    routing_url: http://localhost:4001/graphql
    schema:
      file: ../schemas/subgraph-a.graphqls
      # the contents of this graph will be retrieved through the file provided above
      # note that the path is relative
  - name: subgraph-b
    routing_url: http://localhost:4002/graphql
    # the contents of this graph will be retrieved through introspection

```

## Creating the router configuration

You will need to use [`wgc`](https://www.npmjs.com/package/wgc) to compose the subgraphs and produce a router configuration.\
\
If you haven't already, download and install the latest `wgc` globally with the following command:

```bash
npm install -g wgc@latest
```

The configuration will be produced with the following command (please also see [Compose](../cli/router/compose.md) for additional information):

```bash
wgc router compose -i graphs.yaml -o config.json
```

{% hint style="info" %}
IMPORTANT: Please note that since this command runs locally, the subgraphs may or may not exist on the control plane. It is recommended **not** to use this for production. For production, you can fetch the router execution config for your federated graph using the [fetch](../cli/router/fetch.md) command instead.
{% endhint %}

The flags for the `router compose` command are described below:

<table><thead><tr><th width="98">Flag</th><th>Expected value</th></tr></thead><tbody><tr><td>-i</td><td>relative path to the input<code>.yaml</code> file that contains all subgraph information</td></tr><tr><td>-o</td><td>relative path to the output <code>.json</code> file that will contain the router configuration</td></tr></tbody></table>

After running the `wgc` command, you should observe a populated `.json` file of the same name and location you provided to the `-o` flag.\
\
If not, please check your logs for any errors.

## Creating the router environment file (.env)

If you are running your router using a binary, the `.env` file should be located in the same directory as the extracted binary.\
\
If you are running your router through the router `main.go` (using go 1.21), the `.env` file should be located at `cosmo/router/.env` (adjacent to the `.env.example` file).\
\
You will then need to provide at least the first three of the following environment variables to the file (`LOG_LEVEL` is optional but recommended):

<table><thead><tr><th width="261">Environment variable</th><th>Description</th><th>Required</th></tr></thead><tbody><tr><td>FEDERATED_GRAPH_NAME</td><td>name of the federated graph</td><td>true</td></tr><tr><td>GRAPH_API_TOKEN</td><td>the api token for the graph (because the control plane is not used, you can provide a dummy value)</td><td>true (currently requires a dummy value)</td></tr><tr><td>ROUTER_CONFIG_PATH</td><td>the relative path to the configuration <code>.json</code> file created earlier</td><td>true</td></tr><tr><td>LISTEN_ADDR</td><td>the local port where the router will run</td><td>false (defaults to 3002)</td></tr><tr><td>LOG_LEVEL</td><td>level of logs to be displayed (e.g., error)</td><td>false (but recommended to provide "info")</td></tr></tbody></table>

An example `/env` file is shown below:

```bash
FEDERATED_GRAPH_NAME=federated_graph
GRAPH_API_TOKEN=dummy # cannot be empty
ROUTER_CONFIG_PATH=config.json
LISTEN_ADDR=0.0.0.0:3002
LOG_LEVEL=info
```

## Running the router

### Router binary

```bash
path/to/router/binary/router
```

### From source using go 1.21 (cosmo/router/main.go)

1. Change your working directory to your WunderGraph Cosmo repository's router directory
2. Run `main.go` with `go run`

```bash
cd path/to/cosmo/router

go run cmd/router/main.go
```

You should receive logs that the router has started and is available at the port you provided to the `LISTEN_ADDR` environment variable or the default port (3002).
