---
description: >-
  To maintain control over your data and ensure high performance, utilize
  different storage providers to store router artifacts on Amazon S3, while
  still using our Cosmo Managed offering.
---

# Storage Providers

The router is a stateless component, allowing it to be scaled horizontally without requiring persistence. However, it needs to fetch the execution configuration from a storage source at startup and when new schema updates are published. This execution config provides the instructions for executing and planning GraphQL operations.

The same approach applies to persisted operations (PO), which manage an allowlist of permitted GraphQL operations that can execute against the router. The router must download these operations once before they can be executed.

For both mechanisms, different storage providers can be used:

* **CDN**: The default provider that used by Cosmo Cloud.
* **Amazon S3**: An object storage protocol. We support any S3 compatible object-storage e.g. Minio and AWS.

**By removing the dependency on Cosmo Cloud, you no longer rely on us for operations while still benefiting from all its features.** When using a custom storage provider, you are responsible for manually pushing those artifacts as part of your CI process. In the next section, we will explain how to do this:

## Define a provider

Before you can use a storage provider, you have to define it in the [`storage_providers`](storage-providers.md) section of your `config.yaml` file.

```yaml
storage_providers:
  s3:
  - id: "s3"
    endpoint: "localhost:10000"
    bucket: "cosmo"
    access_key: "key"
    secret_key: "secret"
    region: "use-east-1"
    secure: false
```

{% hint style="info" %}
**secure** has to be set to `true` when you point to an S3 that uses **https://**
{% endhint %}

## Execution config

After configuring the storage provider, you can use it by referencing it in the `provider_id` field.

```yaml
execution_config:
  storage:
    provider_id: s3
    object_path: "router.json"
```

The `object_path` field points to the file in your bucket that is updated after each schema deployment in your CI/CD pipeline. The following snippet illustrates how it could look like:

<pre class="language-bash"><code class="lang-bash"><strong># Publish your subgraph
</strong><strong>wgc subgraph publish my-subgraph --schema ./schema.graphqls
</strong><strong># Download the latest execution config after succcessful composition
</strong>wgc router fetch mygraph -o router.json
# Upload the execution config to your S3 storage
aws s3 cp router.json s3://cosmo/
</code></pre>

First, we publish our schema changes to Cosmo. After that, we will download the latest execution config and upload it your own S3 provider. The router will check for updates every 10 seconds (default) and hot-reload the router accordingly without impacting current user traffic.

### Best Practices

* Create different S3 credentials for READ and WRITE to reduce the attack surface.

## Persisted Operations

After configuring the storage provider, you can use it by referencing it in the `provider_id` field.

```yaml
persisted_operations:
  cache:
    size: 100MB
  storage:
    provider_id: s3
    object_prefix: "prod/operations"
```

The `object_prefix` field points to the location in the bucket where the persisted operations are uploaded. Each persisted operation needs to follow the naming convention: **SHA256** of the file + `.json` as filename extension. A persisted operation is a JSON document and must follow the following structure:

* **`version`**: The version of the persisted operation format.
* **`body`**: The actual content of the persistent operation.

### Example

Upload the file to the bucket location : `prod/operations/c3ab8ff13720e8ad9047dd39466b3c8974e592c2fa383d4a3960714caef0c4f2.json`

{% code title="c3ab8ff13720e8ad9047dd39466b3c8974e592c2fa383d4a3960714caef0c4f2.json" %}
```json
{"version":1,"body":"{\n  employees {\n    id\n    details {\n      forename\n    }\n  }\n}"}
```
{% endcode %}

Now, you can make a persisted operation (PO) request against the router, and it will fetch the operation from your S3 and execute it. Subsequent requests are cached and won't add additional latency to subsequent requests.

```bash
curl 'http://localhost:3002/graphql' \
    -H 'graphql-client-name: test' \
    -H 'Content-Type: application/json' \
    -d '{"extensions":{"persistedQuery":{"version":1,"sha256Hash":"c3ab8ff13720e8ad9047dd39466b3c8974e592c2fa383d4a3960714caef0c4f2"}}}'
```

### Best Practices

* We can cache persisted operations effectively only by using an immutable filename, such as the SHA-256 hash of the file.
