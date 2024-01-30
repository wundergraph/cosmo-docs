---
description: >-
  The @requiresScopes directive declares a GraphQL definition to require the
  agent (person, service, or device) to possess certain permissions. Lack of
  permissions will yield an authorization error.
---

# @requiresScopes

## Definition

```graphql
directive @requiresScopes(scopes: [[openfed__Scope!]!]!) on ENUM | FIELD_DEFINITION | INTERFACE | OBJECT | SCALAR

scalar openfed__Scope
```

## Arguments

<table><thead><tr><th>Argument Name</th><th width="455">Argument Type</th></tr></thead><tbody><tr><td>scopes</td><td>[[openfed__Scope!]!]!</td></tr></tbody></table>

The "scopes" argument requires an array (GraphQL List) of nested arrays.\
\
The outmost array represents a set of OR scopes.\
\
Each nested array sibling represents a set of AND scopes.\
\
Each element in the AND scopes array should be an "openfed\_\_Scope" scalar, which is an instance of permissions as defined in your authentication token. For example, "read:field".

### OR Scopes

Consider the following @requiresScopes declared on Query.fieldOne:&#x20;

```graphql
type Query {
  fieldOne: String! @requiresScopes(scopes: [["read:field"], ["read:scalar"]])
}
```

If an agent wished to select Query.fieldOne, it would require EITHER the "read:field" permission OR the "read:scalar" permission.

### AND Scopes

Consider the following @requiresScopes declared on Query.fieldTwo

```graphql
type Query {
  fieldTwo: String! @requiresScopes(scopes: [["read:field", "read:scalar"]])
}
```

If an agent wished to select Query.fieldTwo, it would require BOTH the "read:field" permission and the "read:scalar" permission. Lack of one or both would return an authorization error.

### Combining OR and AND Scopes

Consider the following @requiresScopes declared on Query.fieldThree

```graphql
type Query {
  fieldThree: String! @requiresScopes(scopes: [["read:field", "read:scalar"], ["read:query", "read:private"], ["read:all"]])
}
```

If an agent wished to select Query.fieldThree, it would require at least one of the following sets of scopes: (("read:field" AND "read:scalar") OR ("read:query" AND "read:private") OR ("read:all"))

## Declaration

The @requiresScopes directive can be declared on enums, field definitions, interfaces, objects, and scalars. However, there are some differences between declaration on leaf definitions and parent definitions.

### Declaration on leaf definitions (enums and scalars)

When @requiresScopes is declared on a leaf definition, the @requiresScopes directive (including its scopes) will be applied to _all_ field definitions whose named type name (the innermost response type name) is the respective leaf definition _**within that subgraph**_.&#x20;

If the same leaf definition is defined in another subgraph without @requiresScopes, the corresponding field definitions _**unique**_ to that _**that**_ subgraph will be unaffected. But note that @requiresScopes could be applied to those field definitions through other means.

If at least one instance of a shared field is declared with @requiresScopes, that field definition will be declared with @requiresScopes in the federated graph (see [Federation](requiresscopes.md#federation)).\
\
Consider the following example:

```graphql
# subgraph-a (raw)
enum Enum @requiresScopes(scopes: [["read:enum"]]) {
  VALUE
}

scalar Scalar @requiresScopes(scopes: [["read:scalar"]])

type Query {
  enumQuery: Enum!
  objectQuery: [Object!]!
  scalarQuery: Scalar!
}

type Object {
  enumField: Enum!
  scalarField: Scalar!
}
```

In subgraph-a, above, @requiresScopes has been declared on two leaf definitions:

1. The enum "Enum"
2. The scalar "Scalar"

And those leaf definitions are returned at the following field paths:

1. Query.enumQuery (named type name is "Enum")
2. Query.scalarQuery (named type name is "Scalar")
3. Object.enumField (named type name is "Enum")
4. Object.scalarField (named type name is "Scalar")

Consequently, @requiresScopes would be applied to all field definitions at the paths listed above. The normalized graph would look like so:

```graphql
# subgraph-a (normalized)
enum Enum {
  VALUE
}

scalar Scalar

type Query {
  enumQuery: Enum! @requiresScopes(scopes: [["read:enum"]])
  objectsQuery: [Object!]!
  scalarQuery: Scalar! @requiresScopes(scopes: [["read:scalar"]])
}

type Object {
  enumField: Enum! @requiresScopes(scopes: [["read:enum"]])
  scalarField: Scalar! @requiresScopes(scopes: [["read:scalar"]])
}
```

### Declaration on object definitions

When @requiresScopes is declared on an object definition, the @requiresScopes directive (including its scopes) will be applied to _all_ field definitions defined on the object definition _**within that subgraph**_.&#x20;

If the same object definition is defined in another subgraph without @requiresScopes, the corresponding field definitions _**unique**_ to that _**that**_ subgraph will be unaffected. But note that @requiresScopes could be applied to those field definitions through other means.

If at least one instance of a shared field is declared with @requiresScopes, that field definition will be declared with @requiresScopes in the federated graph (see [Federation](requiresscopes.md#federation)).\
\
Consider the following example:

```graphql
# subgraph-b (raw)
type Query @requiresScopes([["read:query"]]) {
  objectQuery: Object!
  objectsQuery: [Object!]!
}

type Object @requiresScopes([["read:object"]]) {
  intField: Int!
  stringField: String!
}
```

In subgraph-b, above, @requiresScopes has been declared on two object definitions:

1. The root object "Query"
2. The object "Object"

And those object definitions define the following field definitions:

1. Query.objectQuery
2. Query.objectsQuery
3. Object.intField
4. Object.stringField

Consequently, the @requiresScopes directive (including its defined scopes) would be applied to all field definitions at the paths listed above. The normalized graph would look like so:

```graphql
# subgraph-b (normalized)
type Query {
  objectQuery: Object! @requiresScopes([["read:query"]]
  objectsQuery: [Object!]! @requiresScopes([["read:query"]]
}

type Object {
  intField: Int! @requiresScopes([["read:object"]])
  stringField: String! @requiresScopes([["read:object"]])
}
```

### Declaration on interface definitions

When @requiresScopes is declared on an interface definition, the @requiresScopes directive (including its scopes) will be applied to _all_ field definitions defined on the interface definition _**within that subgraph**_.&#x20;

If the same interface definition is defined in another subgraph without @authenticated, the corresponding field definitions _**unique**_ to _**that**_ subgraph be unaffected. But note that @requiresScopes could be applied to those field definitions through other means.

In addition, @requiresScopes will be applied to the corresponding field definitions defined on the objects that implement that interface _**within that subgraph**_.

If at least one instance of a shared field is declared with @requiresScopes, that field definition will be declared with @requiresScopes in the federated graph (see [Federation](requiresscopes.md#federation)).\
\
Consider the following example:

```graphql
# subgraph-c (raw)
type Query {
  interfacesQuery: [Interface!]!
}

type Interface @requiresScopes([["read:field"]]) {
  intField: Int!
  stringField: String!
}

type Object implements Interface {
  intField: Int!
  stringField: String!
  objectOnlyField: Boolean!
}

type AnotherObject implements Interface {
  intField: Int!
  stringField: String!
  anotherObjectOnlyField: Float!
} 
```

In subgraph-c, above, @requiresScopes has been declared on the interface definition "Interface", which is implemented by two object definitions:

1. Object
2. AnotherObject

This interface defines the following field definitions:

1. Interface.intField
2. Interface.stringField

Consequently, the @requiresScopes directive (including its defined scopes) would be applied to all field definitions at the paths listed above, in addition to the same field definitions that are defined on the object definitions that implement that interface.

The normalized graph would look like so:

```graphql
# subgraph-c (normalized)
type Query {
  interfacesQuery: [Interface!]!
}

type Interface {
  intField: Int! @requiresScopes([["read:field"]])
  stringField: String! @requiresScopes([["read:field"]])
}

type Object implements Interface {
  intField: Int! @requiresScopes([["read:field"]])
  stringField: String! @requiresScopes([["read:field"]])
  objectOnlyField: Boolean!
}

type AnotherObject implements Interface {
  intField: Int! @requiresScopes([["read:field"]])
  stringField: String! @requiresScopes([["read:field"]])
  anotherObjectOnlyField: Float!
}
```



When @requiresScopes is declared on an interface field definition directly, the corresponding field definitions on the object types that implement that interface _**within that subgraph**_ will also declare @requiresScopes (including its defined scopes). For example:

```graphql
# subgraph-d (raw)
type Interface {
  intField: Int!
  stringField: String! @requiresScopes([["read:field"]])
}

type Object implements Interface {
  intField: Int!
  stringField: String!
  objectOnlyField: Boolean!
}

type AnotherObject implements Interface {
  intField: Int!
  stringField: String!
  anotherObjectOnlyField: Float!
}
```

The subgraph above, subgraph-d, would normalize into the following subgraph:

```graphql
# subgraph-d (normalized)
type Interface {
  intField: Int!
  stringField: String! @requiresScopes([["read:field"]])
}

type Object implements Interface {
  intField: Int!
  stringField: String! @requiresScopes([["read:field"]])
  objectOnlyField: Boolean!
}

type AnotherObject implements Interface {
  intField: Int!
  stringField: String! @requiresScopes([["read:field"]])
  anotherObjectOnlyField: Float!
}
```

## Combining multiple scopes (matrix multiplication)

Sometimes, a field definition must combine multiple declaration of @requiresScopes.

Consider the following example:

```graphql
type Query @requiresScopes([["read:query"]]) {
  enumField: Enum! @requiresScopes([["read:private"]])
}

enum Enum @requiresScopes([["read:enum"]]) {
  VALUE
}
```

In this instance, the field definition Query.enumField is "inheriting" two other sets of scopes in addition to its own.

## Federation
