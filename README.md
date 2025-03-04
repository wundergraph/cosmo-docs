---
icon: note
description: >-
  WunderGraph Cosmo is the Full Lifecycle GraphQL API Management Solution to
  manage Federated Graphs at scale. Composition checks, routing, analytics, and
  distributed tracing all in one platform.
---

# WunderGraph Cosmo Docs

{% hint style="warning" %}
NOTE FOR SDK DOCUMENTATION\


The documentation for the TypeScript SDK has been relocated to [https://bff-docs.wundergraph.com](https://bff-docs.wundergraph.com). The domain [docs.wundergraph.com](https://docs.wundergraph.com) is now designated for Cosmo-related documentation.
{% endhint %}

<figure><img src=".gitbook/assets/logo.png" alt=""><figcaption></figcaption></figure>

### Built for any scale

Cosmo enables teams and organizations to manage and scale (federated) GraphQL architectures with ease. Quickly iterate without breaking anything through composition checks.

WunderGraph Cosmo can easily run locally, on-premises, or in the cloud as a managed service. Cosmo is a batteries-included solution, covering everything from routing to analytics.

Cosmo supports monolithic GraphQL APIs as well as Federation v1 and v2, including Subscriptions.



<figure><img src=".gitbook/assets/simple-architecture.png" alt=""><figcaption><p>The Core Components</p></figcaption></figure>

### **The Cosmo stack**

* [CLI](broken-reference): The Cosmo command line interface, referred to as `wgc`, plays a crucial role in managing the Cosmo platform. Its functions include pushing schemas, validating schemas, initiating new projects, and managing users, among others. It communicates directly with the Control Plane to perform these operations.
* [Control Plane](broken-reference): The Control Plane forms the heart of the Cosmo platform and comprises two core elements: The Platform API and the Node API. The Platform API is utilized by the Cosmo CLI tool and Studio for platform management. On the other hand, the Node API facilitates fleet-specific operations, carried out by the Router nodes.
* [Router](broken-reference): The Router is the component that understands the GraphQL Federation protocol. It is responsible for routing requests to the correct subgraphs and for aggregating the responses. While it maintains a connection with the Control Plane, its operation is independent and does not depend on the Control Plane's functionality for maximum availability.
* [Studio](broken-reference): The Studio serves as the web interface for the Cosmo platform, providing a user-friendly medium for platform management and collaboration on GraphQL Federation. It maintains a connection with the Control Plane through the admin API, enabling efficient platform management.

