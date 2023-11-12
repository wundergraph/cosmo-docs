---
description: High-level architecture of the Cosmo Platform
---

# Architecture

<figure><img src=".gitbook/assets/cosmo-architecture.png" alt=""><figcaption></figcaption></figure>

The architecture of the Cosmo Platform is founded on several key principles.

* **Open Core:** We have constructed our platform based on open standards such as Open Telemetry (OTEL), S3, and Prometheus. The Router is fully Open-Source under the Apache 2.0 license. You can fully customize it, e.g. with custom modules.
* **High Availability:** We have designed all of our components with the intention of reducing downtime and preventing service loss. The Router is engineered to function independently, with the sole reliance being on the CDN to load the configuration, which guarantees an uptime of 99.999%.
* **Cost-Efficiency at Scale:** We have meticulously selected our components to handle even the most demanding use cases. This enables us to efficiently manage multiple billions of requests per month.
* **Hybrid Deployments:** You have the option to run the entire platform on your own infrastructure, maintaining 100% data sovereignty. Alternatively, you can use [Cosmo Cloud](deployments-and-hosting/cosmo-cloud.md) and only run the Router. We will operate the more complex "stateful" components for you.
* **Optimized Solution:** All components have been engineered to work together in the most efficient manner. Despite the potential limitations this might introduce, we view it as a strategic advantage. This holistic control over the entire stack not only enables us to optimize operations and costs but also significantly enhances the development experience.

