---
description: >-
  The @authenticated directive declares a GraphQL definition to require the
  agent (person, service, or device) to be authenticated. Lack of authentication
  will yield an authorization error.
---

# @authenticated

## Minimum requirements

<table><thead><tr><th width="349">Package</th><th>Minimum version</th></tr></thead><tbody><tr><td>router</td><td><a href="https://github.com/wundergraph/cosmo/releases/tag/router%400.60.0">0.60.0</a></td></tr><tr><td>controlplane</td><td><a href="https://github.com/wundergraph/cosmo/releases/tag/controlplane%400.58.0">0.58.0</a></td></tr><tr><td>wgc</td><td><a href="https://github.com/wundergraph/cosmo/releases/tag/wgc%400.39.0">0.39.0</a></td></tr></tbody></table>

Make sure you have correctly set up [Authentication & Authorization](../../router/authentication-and-authorization.md).

## Definition

```graphql
directive @authenticated on ENUM | FIELD_DEFINITION | INTERFACE | OBJECT | SCALAR
```

## Declaration

The @authenticated directive can be declared on enums, field definitions, interfaces, objects, and scalars. However, there are some differences between declaration on leaf definitions and parent definitions.

### Declaration on leaf definitions (enums and scalars)

When @authenticated is declared on a leaf definition, @authenticated will be applied to _all_ field definitions whose named type (the innermost response type name) is the respective leaf definition _**within that subgraph**_.

If the same leaf definition is defined in another subgraph without @authenticated, the corresponding field definitions _**unique**_ to that _**that**_ subgraph will be unaffected. But note that @authenticated could be applied to those field definitions through other means.

If at least one instance of a shared field is declared @authenticated, that field will be declared @authenticated in the federated graph (see [Federation](authenticated.md#federation)).\
\
Consider the following example:

```graphql
# subgraph-a (raw)
enum Enum @authenticated {
  VALUE
}

scalar Scalar @authenticated

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

In subgraph-a, above, @authenticated has been declared on two leaf definitions:

1. The enum "Enum"
2. The scalar "Scalar"

And those leaf definitions are returned at the following field paths:

1. Query.enumQuery (named type name is "Enum")
2. Query.scalarQuery (named type name is "Scalar")
3. Object.enumField (named type name is "Enum")
4. Object.scalarField (named type name is "Scalar")

Consequently, @authenticated would be applied to all field definitions at the paths listed above. The normalized graph would look like so:

```graphql
# subgraph-a (normalized)
enum Enum {
  VALUE
}

scalar Scalar

type Query {
  enumQuery: Enum! @authenticated
  objectsQuery: [Object!]!
  scalarQuery: Scalar! @authenticated
}

type Object {
  enumField: Enum! @authenticated
  scalarField: Scalar! @authenticated
}
```

### Declaration on object definitions

When @authenticated is declared on an object definition, @authenticated will be applied to _all_ field definitions defined on the object definition _**within that subgraph**_.

If the same object definition is defined in another subgraph without @authenticated, the corresponding field definitions _**unique**_ to _**that**_ subgraph be unaffected. But note that @authenticated could be applied to those field definitions through other means.

If at least one instance of a shared field is declared @authenticated, that field definition will be declared @authenticated in the federated graph (see [Federation](authenticated.md#federation)).\
\
Consider the following example:

```graphql
# subgraph-b (raw)
type Query @authenticated {
  objectQuery: Object!
  objectsQuery: [Object!]!
}

type Object @authenticated {
  intField: Int!
  stringField: String!
}
```

In subgraph-b, above, @authenticated has been declared on two object definitions:

1. The root object "Query"
2. The object "Object"

And those object definitions define the following field definitions:

1. Query.objectQuery
2. Query.objectsQuery
3. Object.intField
4. Object.stringField

Consequently, @authenticated would be applied to all field definitions at the paths listed above. The normalized graph would look like so:

```graphql
# subgraph-b (normalized)
type Query {
  objectQuery: Object! @authenticated
  objectsQuery: [Object!]! @authenticated
}

type Object {
  intField: Int! @authenticated
  stringField: String! @authenticated
}
```

### Declaration on interface definitions

When @authenticated is declared on an interface definition, @authenticated will be applied to _all_ field definitions defined on the interface definition _**within that subgraph**_.&#x20;

If the same interface definition is defined in another subgraph without @authenticated, the corresponding field definitions _**unique**_ to _**that**_ subgraph be unaffected. But note that @authenticated could be applied to those field definitions through other means.

In addition, @authenticated will be applied to the corresponding field definitions defined on the objects that implement that interface _**within that subgraph**_.

If at least one instance of a shared field is declared @authenticated, that field definition will be declared @authenticated in the federated graph (see [Federation](authenticated.md#federation)).\
\
Consider the following example:

```graphql
# subgraph-c (raw)
type Query {
  interfacesQuery: [Interface!]!
}

type Interface @authenticated {
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

In subgraph-c, above, @authenticated has been declared on the interface definition "Interface", which is implemented by two object definitions:

1. Object
2. AnotherObject

This interface defines the following field definitions:

1. Interface.intField
2. Interface.stringField

Consequently, @authenticated would be applied to all field definitions at the paths listed above, in addition to the same field definitions that are defined on the object definitions that implement that interface.

The normalized subgraph would look like so:

```graphql
# subgraph-c (normalized)
type Query {
  interfacesQuery: [Interface!]!
}

type Interface {
  intField: Int! @authenticated 
  stringField: String! @authenticated 
}

type Object implements Interface {
  intField: Int! @authenticated 
  stringField: String! @authenticated 
  objectOnlyField: Boolean!
}

type AnotherObject implements Interface {
  intField: Int! @authenticated 
  stringField: String! @authenticated 
  anotherObjectOnlyField: Float!
}
```

When @authenticated is declared on an interface field definition directly, the corresponding field definitions on the object types that implement that interface _**within that subgraph**_ will also declare @authenticated. For example:

```graphql
# subgraph-d (raw)
type Interface {
  intField: Int!
  stringField: String! @authenticated
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
  stringField: String! @authenticated
}

type Object implements Interface {
  intField: Int!
  stringField: String! @authenticated
  objectOnlyField: Boolean!
}

type AnotherObject implements Interface {
  intField: Int!
  stringField: String! @authenticated
  anotherObjectOnlyField: Float!
}
```

## Federation

The @authenticated directive will persist in the federated schema. Consequently, if @authenticated is declared on a field definition in one graph, and the same field definition (a shared field) is defined in another graph without @authenticated, then @authenticated will be declared on the federated field. This also means selecting this field will always require authentication, regardless of whether it would be resolved from a subgraph that did not declare @authenticated.\
\
Consider the following two subgraphs and the resulting federated graph. The federated graph includes descriptions explaining how each @authenticated directive has persisted.

```graphql
# subgraph-e (raw)
type Query {
  enumQuery: Enum!
  interfacesQuery: [Interface!]!
}

enum Enum @authenticated {
  VALUE
}

type Interface {
  intField: Int!
  stringField: String! @authenticated
}

type Object implements Interface @key(fields: "id") {
  id: ID!
  intField: Int!
  objectOnlyEnumField: Enum!
  stringField: String! @shareable
}

type AnotherObject implements Interface @key(fields: "id") {
  id: ID!
  intField: Int!
  stringField: String! @shareable
}
```

<pre class="language-graphql"><code class="lang-graphql"># subgraph-f (raw)
type Query {
  scalarQuery: Scalar!
}

scalar Scalar @authenticated

enum Enum {
  VALUE
}

type Interface @authenticated {
  booleanField: Boolean!
  enumField: Enum!
}

type Object implements Interface @key(fields: "id") {
  booleanField: Boolean!
  enumField: Enum!
  id: ID!
  objectOnlyBooleanField: Boolean!
  scalarField: Scalar!
  stringField: String! @shareable
}

type AnotherObject implements Interface @key(fields: "id") @authenticated {
<strong>  anotherObjectOnlyFloatField: Float!
</strong><strong>  anotherObjectOnlyScalarField: Scalar!
</strong><strong>  booleanField: Boolean!
</strong>  enumField: Enum!
  id: ID!
  intField: Int!
  stringField: String! @shareable
}
</code></pre>

```graphql
# federated graph
directive @authenticated on ENUM | FIELD_DEFINITION | INTERFACE | OBJECT | SCALAR

type Query {
  "Query.enumQuery @authenticated: subgraph-e Enum"
  enumQuery: Enum! @authenticated
  interfacesQuery: [Interface!]!
  "Scalar.enumQuery @authenticated: subgraph-f Scalar"
  scalarQuery: Scalar @authenticated
}

"""
  Scalar
  @authenticated initially added by subgraph-f Scalar
  @authenticated applied to relevant field definitions and removed here
"""
scalar Scalar

"""
  Enum @authenticated initially added by subgraph-e Enum
  @authenticated applied to relevant field definitions and removed here
"""
enum Enum {
  VALUE
}

"""
  Interface @authenticated initially added by subgraph-f Interface
  @authenticated applied to relevant field definitions and removed here
"""
type Interface {
  "Interface.booleanField @authenticated: subgraph-f Interface"
  booleanField: Boolean! @authenticated
  "Interface.enumField @authenticated: subgraph-f Interface"
  enumField: Enum! @authenticated
  intField: Int!
  "Interface.stringField @authenticated: subgraph-f Interface.stringField"
  stringField: String! @authenticated
}

type Object implements Interface {
  "Object.booleanField @authenticated: subgraph-f Interface"
  booleanField: @authenticated
  "Object.enumField @authenticated: subgraph-f Interface"
  enumField: Enum! @authenticated
  id: ID!
  intField: Int!
  objectOnlyBooleanField: Boolean!
  "Object.objectOnlyEnumField @authenticated: subgraph-e Enum"
  objectOnlyEnumField: Enum! @authenticated
  "Object.scalarField @authenticated: subgraph-f Scalar"
  scalarField: Scalar! @authenticated
  "Object.stringField @authenticated: subgraph-e Interface.stringField"
  stringField: String! @authenticated
}

"""
  AnotherObject
  @authenticated initially added by subgraph-f AnotherObject
  @authenticated applied to relevant field definitions and removed here
"""
type AnotherObject implements Interface {
  "AnotherObject.anotherObjectOnlyFloatField @authenticated: subgraph-f AnotherObject"
  anotherObjectOnlyFloatField: Float! @authenticated
  """
    AnotherObject.anotherObjectOnlyScalarField
    @authenticated: subgraph-f AnotherObject, subgraph-f Scalar
  """
  anotherObjectOnlyScalarField: Scalar! @authenticated
  """
     AnotherObject.booleanField 
     @authenticated: subgraph-f AnotherObject, subgraph-f Interface
   """
  booleanField: @authenticated
  """
    AnotherObject.enumField
    @authenticated: subgraph-f AnotherObject, subgraph-f Interface
  """
  enumField: Enum! @authenticated
  "AnotherObject.id @authenticated: subgraph-f AnotherObject"
  id: ID! @authenticated
  "AnotherObject.intField @authenticated: subgraph-f AnotherObject"
  intField: Int! @authenticated
  """
    AnotherObject.stringField
    @authenticated: subgraph-e Interface.stringField, subgraph-f AnotherObject
  """
  stringField: String! @authenticated
}
```

## Errors

In the event that an unauthenticated agent selects a _**non-nullable**_ field that is declared @authenticated, an authorization error will be returned, and the _**entire**_ data will be null (see [Non-nullable authenticated data requested among unauthenticated data](authenticated.md#non-nullable-authenticated-data-requested-among-unauthenticated-data)).

<pre class="language-json"><code class="lang-json">{
"errors":[{
  "message":"Unauthorized to load field 'Query.enumField'. Reason: not authenticated",
  "path":["enumField"]
}],
<strong>  "data":null
</strong>}
</code></pre>

In the event that an unauthenticated agent selects a _**nullable**_ field that is declared @authenticated, an authorization error will be returned, and the _**specific field**_ will be null (see [Partial data](authenticated.md#partial-data-nullable-authenticated-data)):&#x20;

```json
{
"errors":[{
  "message":"Unauthorized to load field 'Query.enumField'. Reason: not authenticated",
  "path":["enumField"]
}],
  "data":{
    "enumField":null
  }
}
```

### Partial data (nullable authenticated data)

Imagine an unauthenticated agent selects a field that is declared @authenticated and the response type of that field is nullable. However, the agent also queries a field that is not declared @authenticated (nor are any potential nested fields). In this event, an authorization error will still be returned, but the specific data that requires authentication will be null, while the data not requiring authentication will be returned. \
\
Consider the following federated graph and corresponding query:

```graphql
# federated graph
type Query {
  intField: Int @authenticated # note that this field is nullable
  floatField: Float! @authenticated # note that this field is non-nullable
  stringField: String! # note that this field is not declared @authenticated
}
```

```graphql
query {
  intField
  stringField
}
```

An unauthenticated agent sending the query above would receive something like the following:

```json
{
  "errors":[{
    "message":"Unauthorized to load field 'Query.intField'. Reason: not authenticated",
    "path":["intField"]
  }],
  "data":{
    "intField":null,
    "stringField":"I'm a string!"
  }
}
```

### Non-nullable authenticated data requested among unauthenticated data

In the event an unauthenticated agent selects any non-nullable fields that require authentication, an authorization error will be returned, and the _**entire**_ data will return null. This is true even if one or more field selections did not require authentication or are nullable.\
\
Consider the following federated graph and corresponding query:

```graphql
# federated graph
type Query {
  objectField: Object!
  stringField: String!
}

type Object {
  uauthenticatedObjectField: String!
  unauthenticatedNestedObject: NestedObject!
}

type NestedObject {
  authenticatedIntField: Int! @authenticated # note that this field is non-nullable
  unauthenticatedStringField: String!
}
```

```graphql
query {
  stringField
  objectField {
    unauthenticatedObjectField
    unauthenticatedNestedObjectField {
      authenticatedNonNullableIntField # only this field requires authentication
      unauthenticatedStringField
    }
  }
}
```

An unauthenticated agent sending the query above would receive something like the following:

<pre class="language-json"><code class="lang-json"><strong>{
</strong><strong>  "errors":[{
</strong><strong>    "message":"Unauthorized to load field 'Query.objectField.unauthenticatedNestedObjectField.authenticatedNonNullableIntField'. Reason: not authenticated",
</strong><strong>    "path":["objectField","unauthenticatedNestedObectField","authenticatedNonNullableIntField"]
</strong><strong>  }],
</strong><strong>  "data":null
</strong><strong>}
</strong></code></pre>
