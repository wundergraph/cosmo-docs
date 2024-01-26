---
description: Commands to manage namespaces within the organization
---

# Namespace

Namespaces are a way to scope your federated graphs and subgraphs. For example you can have a federated graph called `my-api` in a production and staging namespace. All graph operations and compositions are scoped to graphs present in a particular namespace. Every organization is provided a `default` namespace which cannot be deleted. You can scope CLI commands to a particular namespace by passing the `-n` flag or default is considered. Namespaces are the way to isolate graphs in different environments, such as production and staging.
