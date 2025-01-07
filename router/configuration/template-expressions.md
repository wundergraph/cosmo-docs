---
icon: brackets-curly
description: Using Template Expressions for Request and Configuration Control
---

# Template Expressions

## Template Expressions Overview

Template Expressions are a robust mechanism for accessing information related to requests, responses, and other key aspects of the router's operation. They enable conditional feature activation and allow for extracting and configuring values dynamically. A common use case involves conditionally blocking mutations:

```yaml
security:
  block_mutations:
    enabled: true
    condition: "request.header.Get('x-block-mutation') == 'yes'"
```

In this example, the condition is evaluated each time a request is made. Template Expressions provide access to request details, including headers, URLs, and query parameters. However, not all fields are consistently available throughout the request lifecycle. For instance, authentication data becomes accessible only after successful authentication.

During the build process, the router validates expressions. If an expression is invalid or does not return the expected type (such as a boolean or string), an error message is generated to ensure clarity and correctness.

### Template Language

The expressions are based on the [expr-lang](https://github.com/expr-lang/expr) template language. This language is characterized by its:

* **Safety** – Expressions are evaluated securely.
* **Speed** – The language is optimized for performance.
* **Side-effect-free operation** – Expressions are read-only and do not alter state.

To modify configurations or manipulate requests and responses, implementing a [custom module](../custom-modules.md) is recommended.

#### Naming Conventions

* **Fields**: Use camelCase (e.g., `request.auth.claims`).
* **Methods**: Use PascalCase (e.g., `request.header.Get("Content-Type")`).
* **Utility Functions**: camelCase (e.g. trim) for the full list see [here](https://expr-lang.org/docs/language-definition).

## Expression Context

### **Request Object**

The `request` object is a read-only entity that provides details about the incoming client request. It is accessible at all times during the lifecycle of the request.

**Available Fields**:

* `request.method`
* `request.url.host`
* `request.url.path`
* `request.url.port`

#### **Header Access**:

* `request.header.Get('Content-Type')` – Header retrieval is case-insensitive.

#### Example expressions

```
request.url.query.foo == 'bar' && request.Method = 'POST'
request.header.Get('x-block-mutation') == 'yes'
```

### **Authentication Object**

The `auth` object contains authentication-related information for the request. It becomes available after authentication is complete.

**Available Fields**:

* `request.auth`
* `request.auth.isAuthenticated`
* `request.auth.type`
* `request.auth.claims`
* `request.auth.scopes`

#### Example expressions

```
'read:miscellaneous' in request.auth.scopes
request.auth.isAuthenticated
```

### Additional Notes

* A Request for Comments (RFC) is [open](https://github.com/wundergraph/cosmo/pull/1481) for feedback on the complete API specification. Future implementations will be driven by customer requirements.
* The Expr language project offers a [playground](https://expr-lang.org/playground) for testing and developing custom expressions, simplifying the process of constructing and validating expressions.

## Where Can Template Expressions Be Used?

Template Expressions are not a generalized concept within router configuration. This functionality is selectively introduced in areas where it enhances the router's capabilities. You find the supported configuration values on the router [configuration](./) documentation page.

If you find a need to enable dynamic configuration, please let us know. Your feedback helps guide future enhancements and feature development.
