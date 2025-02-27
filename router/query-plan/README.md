---
icon: file-contract
description: >-
  The router allows you to request the query plan and you can view the same in
  the playground
---

# Query Plan

Include the header `X-WG-Include-Query-Plan` to receive the query plan in the extensions field. The below headers are also useful

`X-WG-Skip-Loader` : Skip requests to subgraph, this will return data as null

`X-WG-Disable-Tracing` : This will ensure that requests for query plan are not traced in the router

<figure><img src="../../.gitbook/assets/image (5).png" alt=""><figcaption></figcaption></figure>

