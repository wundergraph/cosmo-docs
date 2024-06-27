---
description: Upload files through the router using GraphQL multipart request.
---

# File Upload

## Overview

The feature is implemented following the specification in [https://github.com/jaydenseric/graphql-multipart-request-spec](https://github.com/jaydenseric/graphql-multipart-request-spec) making use of the `multipart/form-data` content type. Cosmo supports single file and multiple file uploads. There is no support for batch upload.

The router can be configured for file uploads as shown [here](configuration.md#file-upload).

## Multipart request structure

1. `operations`: A JSON encoded operations object with files replaced with `null`.
2. `map`: A JSON encoded map of where files occurred in the operations. For each file, the key is the file multipart form field name and the value is an array of operations paths.
3. File fields: Each file extracted from the operations object with a unique, arbitrary field name.

## Sample Setup

You need to define a custom scalar `scalar Upload` in your schema. This will be used for the field type where you want to upload files.

```graphql
scalar Upload

type Mutation {
  singleUpload(file: Upload!): Boolean!
  multipleUpload(files: [Upload!]!): Boolean!
}
```

### Single file upload

```
curl localhost:3002/graphql \
  -F operations='{ "query": "mutation ($file: Upload!) { singleUpload(file: $file) }", "variables": { "file": null } }' \
  -F map='{ "0": ["variables.file"] }' \
  -F 0=@a.txt
```

### Multiple files upload

```
curl localhost:3002/graphql \
  -F operations='{ "query": "mutation($files: [Upload!]!) { multipleUpload(files: $files) }", "variables": { "files": [null, null] } }' \
  -F map='{ "0": ["variables.files.0"], "1": ["variables.files.1"] }' \
  -F 0=@a.txt \
  -F 1=@b.txt
```
