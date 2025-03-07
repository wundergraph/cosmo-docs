---
description: You can generate query plans using the ./router query-plan command
---

# Batch generate Query Plans

{% hint style="info" %}
Available since Router 0.185.0
{% endhint %}

## Prerequisites

To generate query plans, you will need the following:

* Router executable (version 0.185.0 or later)
* Router execution configuration file
* Queries folder
* Output folder

Generate the execution config using `wgc`:

```
wgc router fetch $graphname -o execution-config.json
```

To generate query plans locally or test subgraphs modifications before deployment, use `wgc router compose`.

For detailed steps, follow the first two steps outlined here: [mastering-local-development-for-graphql-federation.md](../../tutorial/mastering-local-development-for-graphql-federation.md "mention").

## Generating query plans

In the following example, we assume the following directory structure:

```
./operations/query1.graphql
./operations/query2.graphql
./execution-config.json
./plans
```

You can generate query plans using the following command:

```
./router query-plan -execution-config execution-config.json -operations operations -plans plans
```

This command will create one file per query inside the plans folder. Each file will have the same name as the corresponding query and will contain a text representation of the query plan.

If a query is not plannable, the error message will be written inside the respective file. Files containing errors will always begin with the text:

```
Error:
```

For the given example, the output will generate two files:

```
plans/query1.graphql
plans/query2.graphql
```

### Report generation

{% hint style="info" %}
The report structure changed since Router 0.189.0
{% endhint %}

You can use the `-print-report` option to generate a report in addition to the individual query plan files.\
The report will be saved in the plans folder as `report.json` and will follow this structure:

```json
{
    "error": "[...]",
    "plans": [
        {
            "file_name": "[...]",
            "plan": "[...]"
        },
        {
            "file_name": "[...]",
            "error": "[...]"
        }
    ]
}
```

If you only need the report, you can add the following option to the command `-print-per-file=false`.

The `error` field on the first level will contains a value only if there is an error that is not directly related to a single plan (eg: timeout error, missing or corrupted router config).

### Fail on planning error

If you want the command to exit with an error if at least one query fails to be planned, you can use the option `-fail-on-error`.
