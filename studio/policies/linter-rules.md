# Linter rules

### Naming Convention

These rules enforce naming conventions.

<details>

<summary><strong>FIELD_NAMES_SHOULD_BE_CAMEL_CASE</strong></summary>

Field names should always use camelCase.

{% code title="❌  Violation" %}
```graphql
type User {
  First_Name: String
}
```
{% endcode %}

Correct:

{% code title="✅  Correct" %}
```graphql
type User {
  firstName: String
}
```
{% endcode %}

</details>

<details>

<summary><strong>TYPE_NAMES_SHOULD_BE_PASCAL_CASE</strong></summary>

Type names should always use PascalCase.

{% code title="❌  Violation" %}
```graphql
type userProject {
  id: ID!
}
```
{% endcode %}

{% code title="✅  Correct" %}
```graphql
type UserProject {
  id: ID!
}
```
{% endcode %}

</details>

<details>

<summary><strong>SHOULD_NOT_HAVE_TYPE_PREFIX</strong></summary>

A type's name should never be prefixed with 'Type'.

{% code title="❌  Violation" %}
```graphql
type TypeUser {
  id: ID!
}
```
{% endcode %}

{% code title="✅  Correct" %}
```graphql
type User {
  id: ID!
}
```
{% endcode %}

</details>

<details>

<summary><strong>SHOULD_NOT_HAVE_TYPE_SUFFIX</strong></summary>

A type's name should never be suffixed with 'Type'.

{% code title="❌  Violation" %}
```graphql
type UserType {
  id: ID!
}
```
{% endcode %}

{% code title="✅  Correct" %}
```graphql
type User {
  id: ID!
}
```
{% endcode %}

</details>

<details>

<summary><strong>SHOULD_NOT_HAVE_INPUT_PREFIX</strong></summary>

An input's name should never be prefixed with 'Input'.

{% code title="❌  Violation" %}
```graphql
input InputUser {
  id: ID!
}
```
{% endcode %}

{% code title="✅  Correct" %}
```graphql
input UserInput {
  id: ID!
}
```
{% endcode %}

</details>

<details>

<summary><strong>SHOULD_HAVE_INPUT_SUFFIX</strong></summary>

An input's name should always be suffixed with 'Input'.

{% code title="❌  Violation" %}
```graphql
input User {
  id: ID!
}
```
{% endcode %}

{% code title="" %}
```graphql
input UserInput {
  id: ID!
}
```
{% endcode %}

</details>

<details>

<summary><strong>SHOULD_NOT_HAVE_ENUM_PREFIX</strong></summary>

An enum's name should never be prefixed with 'Enum'.

{% code title="❌  Violation" %}
```graphql
enum EnumUserStatus {
  ADMIN
  USER
}
```
{% endcode %}

{% code title="✅  Correct" %}
```graphql
enum UserStatus {
  ADMIN
  USER
}
```
{% endcode %}

</details>

<details>

<summary><strong>SHOULD_NOT_HAVE_ENUM_SUFFIX</strong></summary>

An enum's name should never be suffixed with 'Enum'.

{% code title="❌  Violation" %}
```graphql
enum UserStatusEnum {
  ADMIN
  USER
}
```
{% endcode %}

{% code title="✅  Correct" %}
```graphql
enum UserStatus {
  ADMIN
  USER
}
```
{% endcode %}

</details>

<details>

<summary><strong>SHOULD_NOT_HAVE_INTERFACE_PREFIX</strong></summary>

An interface type's name should never be prefixed with 'Interface'.

{% code title="❌  Violation" %}
```graphql
interface InterfaceUser {
  id: ID!
}
```
{% endcode %}

{% code title="✅  Correct" %}
```graphql
interface User {
  id: ID!
}
```
{% endcode %}

</details>

<details>

<summary><strong>SHOULD_NOT_HAVE_INTERFACE_SUFFIX</strong></summary>

An interface type's name should never be suffixed with 'Interface'.

{% code title="❌  Violation" %}
```graphql
interface UserInterface {
  id: ID!
}
```
{% endcode %}

{% code title="✅  Correct" %}
```graphql
interface User {
  id: ID!
}
```
{% endcode %}

</details>

<details>

<summary><strong>ENUM_VALUES_SHOULD_BE_UPPER_CASE</strong></summary>

Enum values should always use UPPER\_CASE.

{% code title="❌  Violation" %}
```graphql
enum UserRole {
  admin
  user
}
```
{% endcode %}

{% code title="✅  Correct" %}
```graphql
enum UserRole {
  ADMIN
  USER
}
```
{% endcode %}

</details>

### Alphabetical Sort

These rules enforce the arrangement of types,  fields and so on in the schema.

<details>

<summary><strong>ORDER_FIELDS</strong></summary>

Ensures all fields are sorted in alphabetical order.

{% code title="❌  Violation" %}
```graphql
type User {
  lastName: String
  firstName: String
}
```
{% endcode %}

{% code title="✅  Correct" %}
```graphql
type User {
  firstName: String
  lastName: String
}
```
{% endcode %}

</details>

<details>

<summary><strong>ORDER_ENUM_VALUES</strong></summary>

Ensures all enum values are sorted in alphabetical order.

{% code title="❌  Violation" %}
```graphql
enum UserRole {
  USER
  ADMIN
}
```
{% endcode %}

{% code title="✅  Correct" %}
```graphql
enum UserRole {
  ADMIN
  USER
}
```
{% endcode %}

</details>

<details>

<summary><strong>ORDER_DEFINITIONS</strong></summary>

Ensures all definitions are sorted in alphabetical order.

Violation:

{% code title="❌  Violation" %}
```graphql
type User{
  id: ID;
  name: String;
}

type Member {
  id: ID;
  name: String;
}
```
{% endcode %}

Correct:

{% code title="✅  Correct" %}
```graphql
type Member {
  id: ID;
  name: String;
}

type User{
  id: ID;
  name: String;
}
```
{% endcode %}

</details>

### Others

<details>

<summary><strong>ALL_TYPES_REQUIRE_DESCRIPTION</strong></summary>

Ensures all type definitions are accompanied by a description.

The types include:-

* ObjectTypeDefinition
* InterfaceTypeDefinition
* EnumTypeDefinition
* ScalarTypeDefinition
* InputObjectTypeDefinition
* UnionTypeDefinition

{% code title="❌  Violation" %}
```graphql
type User {
  id: ID!
}

interface Member {
  id: ID!
}
```
{% endcode %}

{% code title="✅  Correct" %}
```graphql
# Represents a user in the system
type User {
  id: ID!
}

# Represents a member in the system
interface Member {
  id: ID!
}
```
{% endcode %}

</details>

<details>

<summary><strong>DISALLOW_CASE_INSENSITIVE_ENUM_VALUES</strong></summary>

Ensures enum values eliminate duplicates by disallowing case insensitivity.

{% code title="❌  Violation" %}
```graphql
enum UserRole {
  ADMIN
  admin
}
```
{% endcode %}

{% code title="✅  Correct" %}
```graphql
enum UserRole {
  ADMIN
}
```
{% endcode %}

</details>

<details>

<summary><strong>NO_TYPENAME_PREFIX_IN_TYPE_FIELDS</strong></summary>

Ensures field names do not include their type's name as a prefix.

{% code title="❌  Violation" %}
```graphql
type User {
  userId: ID!
}
```
{% endcode %}

{% code title="✅  Correct" %}
```graphql
type User {
  id: ID!
}
```
{% endcode %}

</details>

<details>

<summary><strong>REQUIRE_DEPRECATION_REASON</strong></summary>

Requires providing a reason for the @deprecated directive.

{% code title="❌  Violation" %}
```graphql
type User {
  id: ID! @deprecated
}
```
{% endcode %}

{% code title="✅  Correct" %}
```graphql
type User {
  id: ID! @deprecated(reason: "No longer in use")
}
```
{% endcode %}

</details>

<details>

<summary><strong>REQUIRE_DEPRECATION_DATE</strong></summary>

Requires providing a deletion date for the @deprecated directive.

{% code title="❌  Violation" %}
```graphql
type User {
  id: ID! @deprecated(reason: "No longer in use")
}
```
{% endcode %}

{% code title="✅  Correct" %}
```graphql
type User {
  id: ID! @deprecated(reason: "No longer in use", date: "2023-01-01")
}
```
{% endcode %}

</details>
