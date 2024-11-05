---
description: >-
  Let us go over how to use the subgraph check command in CI to prevent breaking
  changes in production. Use our GitHub app to seamlessly approve breaking
  changes in the Cosmo Studio.
icon: newspaper
---

# PR based workflow for Federation

## Usage in CI

You can run `wgc subgraph check` on pull requests to validate changes to your subgraphs. The CLI is aware of the environment in which it runs. Here is an example using GitHub actions:

```yaml
name: Check Subgraph

on:
  pull_request:
    branches:
      - main

jobs:
  check-subgraphs:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v3
        with:
          fetch-depth: 0

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "lts/*"

      - name: Install Cosmo CLI
        run: |
          npm install -g wgc@latest

      - name: Run subgraph check
        run: |
          wgc subgraph check employees --schema ./employees.graphqls
          # Add more check commands here for more subgraphs
        env:
          COSMO_API_KEY: ${{ secrets.COSMO_API_KEY }}
```

## GitHub App Integration

By installing the [Cosmo GitHub App](https://github.com/apps/wundergraph-cosmo) onto your repositories, we can apply status checks to commits in your pull request.

<figure><img src="../.gitbook/assets/image (39).png" alt="" width="375"><figcaption></figcaption></figure>

The check fails if composition errors or breaking changes are detected. In the case of only breaking changes, you can override the status of the check in the Studio.

{% hint style="info" %}
Please ensure your branch is [protected](https://docs.github.com/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches); otherwise, a developer can still merge a PR with a failing check.
{% endhint %}

## Video Tutorial

Below is a complete video demo. (Assuming you have CI setup similar to the yaml provided above).

{% embed url="https://youtu.be/9lewTRpC3qM" %}
