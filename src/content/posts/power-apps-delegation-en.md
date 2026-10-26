---
title: "Power Apps delegation: why your app only sees 500 rows"
date: 2026-10-26
description: "Understand delegation to avoid silent bugs: the app works with test data but returns wrong results as real data grows."
tags: ["Power Apps", "Power Fx", "tips"]
lang: en
draft: false
---

A very common trap: the app works great with a few dozen test rows, but once real data grows to thousands of rows, searches return **incomplete results** with no error. The cause is usually **delegation**.

## What delegation means

When you use `Filter`, `Search`, `Sort` and similar functions on a data source, Power Apps handles them in one of two ways:

- **Delegable**: the query is sent to the data source (Dataverse, SQL, SharePoint...) which does the work and returns only the results.
- **Not delegable**: Power Apps downloads a limited number of rows (**500** by default, adjustable up to **2000**) and filters them on the device. Anything beyond that limit is missed.

How to spot it: the formula shows a **blue or yellow underline** with a delegation warning.

## How to deal with it

1. Prefer functions and operators your data source can delegate. With SharePoint, for example, `StartsWith` is delegable while `Search` is not.
2. Filter **at the source** instead of loading everything and filtering afterwards.
3. Move large data to **Dataverse** or SQL, which have better delegation support.
4. Avoid pushing unfiltered data through `AddColumns` or `Collect`.

```powerfx
// Better: filter on columns the source can delegate
Filter(
    Orders,
    Status = "New" && StartsWith(OrderNo, txtSearch.Text)
)
```

## A note

The list of delegable functions and operators **varies by data source and changes over time**, so check Microsoft's official documentation for the source you use. Most importantly, always **test with realistic data volumes** before handover.
