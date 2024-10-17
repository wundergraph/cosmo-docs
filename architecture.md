---
description: High-level architecture of the Cosmo Platform
---

# Architecture

<figure><img src=".gitbook/assets/cosmo-architecture.png" alt=""><figcaption></figcaption></figure>

The architecture of the Cosmo Platform is founded on several key principles.

* **Open Source:** We have constructed our platform based on open standards such as Open Telemetry (OTEL), S3, and Prometheus. The Router is fully Open-Source under the Apache 2.0 license. You can fully customize it, e.g., with custom modules.
* **High Availability:** We have designed all of our components with the intention of reducing downtime and preventing service loss. The Router is engineered to function independently, only having one dependency on the CDN to load its configuration, which guarantees an uptime of 99.999%.
* **Cost-Efficiency at Scale:** We have meticulously selected our components to handle even the most demanding use cases. This enables us to efficiently handle billions of requests per month.
* **Hybrid Deployments:** You have the option to run the entire platform on your own infrastructure, maintaining 100% data sovereignty. Alternatively, you can use [Cosmo Cloud](deployments-and-hosting/cosmo-cloud.md) and only run the Router. We will operate the more complex, "stateful" components for you.
* **Optimized Solution:** All components have been engineered to work together in the most efficient manner. Despite the potential limitations this might introduce, we view it as a strategic advantage. This holistic control over the entire stack not only enables us to optimize operations and costs but also significantly enhances the development experience.

### Cosmo Reference Architecture

Next, let's take a look at the Reference Architecture, which is also the blueprint of Cosmo Cloud.

<figure><img src=".gitbook/assets/image (142).png" alt=""><figcaption><p>Cosmo Reference Architecture Overview</p></figcaption></figure>

The Cosmo Platform architecture comprises several integral components. The **Router** efficiently manages traffic and routes requests between clients and Subgraphs, relying solely on the **CDN** to load its configuration.

**Studio** provides a user-friendly interface for managing and monitoring services, validating Schema Checks, trying out Queries in the Playground, exploring the Schema or analyzing bottlenecks through metrics and distributed tracing.

User authentication and authorization are handled by **Keycloak,** making it easy to integrate with your own Identity Provider through OpenID Connect (OIDC) or SCIM.

The **Controlplane** manages the Graphs and their Schema, while the **OTEL Collector** aggregates telemetry data. The **GraphQL Metrics Collector** is responsible for gathering Schema usage information, which is essential to being able to provide composition checks against live traffic.

**PostgreSQL** and **Redis** serve as core databases for storing critical data, with **Clickhouse** used for high-performance analytical queries. Together, these components ensure a robust, efficient, and scalable platform.
