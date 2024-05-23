---
description: >-
  @openfed__subscriptionFilter is an Open Federation directive used to filter
  subscription events based on filter predicates.
---

# @openfed\_\_subscriptionFilter

## Definition

```graphql
directive @openfed__subscriptionFilter(condition: openfed__SubscriptionFilterCondition!) on FIELD_DEFINITION

scalar openfed__SubscriptionFilterValue

input openfed__SubscriptionFieldCondition {
    fieldPath: String!
    values: [openfed__SubscriptionFilterValue]!
}

input openfed__SubscriptionFilterCondition {
    AND: [openfed__SubscriptionFilterCondition!]
    IN: openfed__SubscriptionFieldCondition
    NOT: openfed__SubscriptionFilterCondition
    OR: [openfed__SubscriptionFilterCondition!]
}
```

## Overview

The `@openfed__subscriptionFilter` directive declares that a field definition can be filtered by filter conditions. The directive can only be applied to [EDFS](../event-driven-federated-subscriptions/) subscriptions.

## Arguments

<table><thead><tr><th>Argument Name</th><th width="455">Argument Type</th></tr></thead><tbody><tr><td>condition</td><td>openfed__SubscriptionFilterCondition!</td></tr></tbody></table>

The `condition` argument requires an object representing the filter condition. This object can be nested to express OR, AND, and NOT conditions. Currently, only the IN comparison operator is supported. This operator can be used to validate if a value is inside a list.
