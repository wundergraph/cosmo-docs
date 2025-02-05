---
description: >-
  The @openfed__configureDescription directive allows granular control over
  descriptions. It is not considered to be a V2-only directive.
---

# @openfed\_\_configureDescription

## Definition

{% code fullWidth="false" %}
```graphql
directive @openfed__configureDescription(
    federatedGraphDescriptionOverride: String,
    propagateToFederatedGraph: Boolean! = true
) on ARGUMENT_DEFINITION | ENUM | ENUM_VALUE | FIELD_DEFINITION | 
INPUT_FIELD_DEFINITION | INPUT_OBJECT | INTERFACE | OBJECT | SCALAR | SCHEMA | UNION
```
{% endcode %}

## Overview

The `@openfed__configureDescription`directive serves four main functions:

1. Designate a certain description that should be propagated in the federated graph.
2. Designate a description override that should be propagated in the federated graph.
3. Designate that a certain description should never be propagated in the federated graph.
4. Setting a description on an extension type (which usually cannot define descriptions).

## Propagate a description to the federated graph

If the `propagateToFederatedGraph` argument is set to `true` (the default value), the description corresponding to the coordinates of the directive in the defining subgraph will be the description that appears for those coordinates in the federated graph.

## Hide a description from the federated graph

If the `propagateToGederatedGraph` argument is set to `false`, the description corresponding to the coordinates of the directive in the defining subgraph will not be considered for description that appears for those coordinates in the federated graph.

## Override a description

If the `propagateToFederatedGraph`argument is set to `true` (the default value), and the `federatedGraphDescriptionOverride`argument is set to a non-empty string, that string will be the description that appears for those coordinates in the federated graph.

If the `propagateToFederatedGraph`argument is set to `false`, the `federatedGraphDescriptionOverride` argument will be ignored.

## Composition rules

1. The coordinates that define the directive must define a description or provide a non-empty value to the `federatedGraphDescriptionOverride` argument.
2. Only one instance of coordinates may define the `propagateFederatedGraph` with `true`. Multiple such definitions will produce a composition error.
3. Any number of instances of coordinates may provide the `propagateFederatedGraph` argument with `false`.

## Examples

### Propagating a specific description

<pre class="language-graphql"><code class="lang-graphql"># subgraph A
"""
<strong>A.Query description
</strong>"""
type Query @openfed__configureDescription {
  one: String!
}
</code></pre>

```graphql
# subgraph A
"""
B.Query description 1234
"""
type Query {
  two: String!
}
```

```graphql
# federated graph
"""
A.Query description
"""
type Query {
  one: String!
  two: String!
}
```

### Hiding a specific description

<pre class="language-graphql"><code class="lang-graphql"># subgraph A
"""
<strong>A.Query description
</strong>"""
type Query @openfed__configureDescription(propagateToFederatedGraph: false) {
  one: String!
}
</code></pre>

```graphql
# subgraph A
"""
B.Query description 1234
"""
type Query {
  two: String!
}
```

```graphql
# federated graph
"""
B.Query description 1234
"""
type Query {
  one: String!
  two: String!
}
```

### Hiding all descriptions

<pre class="language-graphql"><code class="lang-graphql"># subgraph A
"""
<strong>A.Query description
</strong>"""
type Query @openfed__configureDescription(propagateToFederatedGraph: false) {
  one: String!
  two: String!
}
</code></pre>

```graphql
# subgraph A
"""
B.Query description 1234
"""
type Query @openfed__configureDescription(propagateToFederatedGraph: false) {
  two: String!
}
```

```graphql
# federated graph
type Query {
  one: String!
  two: String!
}
```

### Setting and propagating a description on an extension type

<pre class="language-graphql"><code class="lang-graphql"># subgraph A
<strong>extend type Query @openfed__configureDescription(
</strong><strong>federatedGraphDescriptionOverride: "A.Query extension description"
</strong><strong>) {
</strong>  one: String!
}
</code></pre>

```graphql
# subgraph A
"""
B.Query description 1234
"""
type Query {
  two: String!
}
```

```graphql
# federated graph
"""
A.Query extension description
"""
type Query {
  one: String!
  two: String!
}
```

### Overriding and propagating a description

<pre class="language-graphql"><code class="lang-graphql"># subgraph A
"""
A.Query internal description
"""
<strong>type Query @openfed__configureDescription(
</strong><strong>federatedGraphDescriptionOverride: "A.Query external description"
</strong><strong>) {
</strong>  one: String!
}
</code></pre>

```graphql
# subgraph A
"""
B.Query description 1234
"""
type Query {
  two: String!
}
```

```graphql
# federated graph
"""
A.Query external description
"""
type Query {
  one: String!
  two: String!
}
```
