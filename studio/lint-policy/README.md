---
description: Enforce conventions and best practices through the lint policy.
---

# Lint Policy

Schema linting capabilities enable developers to uphold GraphQL schema quality and adhere to established conventions effortlessly. By integrating schema linting into your development workflow, you can ensure consistency, enhance code maintainability, and catch issues early in the development process.

<figure><img src="../../.gitbook/assets/Screenshot 2024-03-11 at 1.36.03 AM-min.png" alt=""><figcaption></figcaption></figure>

### How to configure schema lintings

* Navigate to the Lint Policy page on Cosmo.
* Select the namespace.

<figure><img src="../../.gitbook/assets/Screenshot 2024-03-11 at 1.46.11 AM-min.png" alt=""><figcaption></figcaption></figure>

* Enable the linter.
* Configure the lint rules and their respective severity levels once enabled.

Once the linter is enabled and the rules are configured, the lint check will be performed on every [check](../../cli/subgraph/check.md) operation of that namespace.

### Severity Level

* Error:- If any configured rules are violated, it causes the check operation to fail.
* Warning:- If any configured rules are violated, they are flagged as warnings, but they don't cause the check operation to fail.
