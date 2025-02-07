# Push

### Usage

```
wgc router cache push <graph_name> -n <namesapce_name> -f <path_to_file>
```

### Description

Pushes new cache warmer operations to the registry. These manually added operations will have precedence over the operations computed based on latency.

### Options

* `-n, --namespace` : The namespace of the federated graph (Default: "default").
* `-o, --operation-name <operation-name>` : The name of the operation.&#x20;
* `-f, --file <file>` : The file containing the operation to push. Supports `.graphql` and `.gql`
* `-p, --persisted-operation-id <persisted-operation-id>` : The ID of the persisted operation to be pushed.

{% hint style="info" %}
If both a file and a persisted operation ID are provided, the persisted operation ID takes precedence.
{% endhint %}

### **Examples**&#x20;

Push an operation using a file:

```
wgc router cache push my-graph -f operation.graphql
```

Push an operation using a persisted operation ID:

```
wgc router cache push my-graph -p fb16e56456d13f6e52a4a2316b79
```
