---
title: "Power Automate: filter at the source with Filter Query"
date: 2026-10-16
description: "Fetch only the rows you need instead of pulling everything and filtering with a Condition. Flows run faster and use fewer actions."
tags: ["Power Automate", "SharePoint", "tips"]
lang: en
draft: false
---

A common pattern: **Get items** pulls the whole list, then **Apply to each** with a **Condition** picks the matching rows. It is slow, uses many actions, and can miss data because of the row limit on results.

## A better way: filter inside Get items

In the SharePoint **Get items** action, use these fields:

- **Filter Query**: the filter condition in OData syntax.
- **Order By**: sorting.
- **Top Count**: limits how many rows come back.

For example, to get requests that are still "Pending":

```text
Status eq 'Pending'
```

Combining conditions:

```text
Status eq 'Pending' and Created ge '2026-01-01T00:00:00Z'
```

## Important notes

- Filter Query uses the column's **internal name**, not its display name. Names with spaces are usually altered, for example `Created Date` becomes `Created_x0020_Date`. Check the internal name in the URL when editing the column in SharePoint.
- If you **do not set Top Count** and do not turn on pagination, Get items typically returns only a default number of rows (100). Set Top Count explicitly, or turn on **Pagination** in Settings with a suitable threshold when you need more.
- Filtering on a column that is **not indexed** in a large list can fail or be slow, see the post about SharePoint indexing.

## Bonus: run Apply to each in parallel

If you still need to loop over many rows, open the **Settings** of Apply to each and turn on **Concurrency control** to process several rows at once (you can set the degree). Keep in mind:

- Use it only when rows are **independent** of each other, as processing order is no longer guaranteed.
- A concurrent loop cannot contain some variable actions, such as **Set variable**.
