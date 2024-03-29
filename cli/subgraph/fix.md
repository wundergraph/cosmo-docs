---
description: >-
  Checks for composition errors across all connected federated graphs and tries
  to fix them through OpenAI integration.
---

# Fix

### Usage <a href="#usage" id="usage"></a>

<pre><code><strong>npx wgc subgraph fix &#x3C;name> --schema &#x3C;path-to-schema> --out-schema &#x3C;path-to-out-schema>
</strong></code></pre>

### Description <a href="#description" id="description"></a>

The `npx wgc subgraph fix` command checks for composition errors in all connected federated graphs associated with the specified subgraph and then tries to fix those errors. The output of the fix can be written to the file path provided.

### Parameters <a href="#parameters" id="parameters"></a>

* `<name>`: The name of the subgraph for which you want to perform the fix. This should be the exact name of the subgraph you wish to check.

### Required Options <a href="#required-option" id="required-option"></a>

* `--schema <path-to-schema>`: The path to the new schema file that you want to validate and then fix its errors. This file should contain the complete schema definition in the GraphQL Schema Definition Language (SDL) format.

### Options <a href="#required-option" id="required-option"></a>

* `-n, --namespace` : The namespace of the federated graph (Default: "default").
* `--out-schema <path-to-out-schema>`: The path where the fixed schema file should be written.

## **Example**

1.  Fix the "products" subgraph using the schema file located at "../demo/subgraphs/products/products.graphql" and write the output of the fix to a file located at "../demo/subgraphs/products/products-fix.graphql".

    ```bash
    npx wgc subgraph fix products --schema ../demo/subgraphs/products/products.graphql --out-schema ../demo/subgraphs/products/products-fix.graphql
    ```

### Notes <a href="#notes" id="notes"></a>

* The `npx wgc subgraph fix` command interacts with the Cosmo platform's control plane and connected federated graphs to perform the composition checks and then fix them.
* The output of the fix can be written to the path provided to the `--out-schema` option.
