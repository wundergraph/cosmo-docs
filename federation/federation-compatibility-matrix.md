---
description: >-
  The following list gives you an Overview of the compatibility between Cosmo
  and other Federation Implementations.
---

# Federation Compatibility Matrix



## Apollo Federation Version 1 Compatibility

| Directive             | State                                       |
| --------------------- | ------------------------------------------- |
| @extends              | <mark style="color:green;">Supported</mark> |
| @external             | <mark style="color:green;">Supported</mark> |
| @key                  | <mark style="color:green;">Supported</mark> |
| @key (composite keys) | <mark style="color:green;">Supported</mark> |
| @provides             | <mark style="color:green;">Supported</mark> |
| @requires             | <mark style="color:green;">Supported</mark> |
| @tag                  | <mark style="color:green;">Supported</mark> |

## Apollo Federation Version 2 Compatibility

### 2.0

| Directive                  | State                                                         |
| -------------------------- | ------------------------------------------------------------- |
| @inaccessible              | <mark style="color:green;">Supported</mark>                   |
| @override                  | <mark style="color:green;">Supported</mark>                   |
| @shareable                 | <mark style="color:green;">Supported</mark>                   |
| @key "resolvable" argument | <mark style="color:green;">Supported</mark>                   |
| @link                      | <mark style="color:green;">Supported (but unnecessary)</mark> |

### 2.1

| Directive                                      | State                                       |
| ---------------------------------------------- | ------------------------------------------- |
| @composeDirective                              | <mark style="color:orange;">Planned</mark>  |
| @requires "fields" argument supports arguments | <mark style="color:green;">Supported</mark> |

### 2.3

| Directive         | State                                       |
| ----------------- | ------------------------------------------- |
| @key on INTERFACE | <mark style="color:green;">Supported</mark> |
| @interfaceObject  | <mark style="color:green;">Supported</mark> |

### 2.5

| Directive                                       | State                                       |
| ----------------------------------------------- | ------------------------------------------- |
| [@authenticated](directives/authenticated.md)   | <mark style="color:green;">Supported</mark> |
| [@requiresScopes](directives/requiresscopes.md) | <mark style="color:green;">Supported</mark> |
