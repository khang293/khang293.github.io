---
title: "SharePoint: index your columns so large lists stay queryable"
date: 2026-10-14
description: "Past 5,000 rows, many queries start failing or slowing down. Column indexes are the most important safeguard."
tags: ["SharePoint", "Power Apps", "tips"]
lang: en
draft: false
---

A SharePoint list works fine with little data, then one day an app or flow errors out or crawls once the list passes a few thousand rows. This is the **list view threshold**, which defaults to **5,000** items.

## Understanding the threshold

It does not mean a list cannot hold more than 5,000 rows. It limits how many rows **a single query has to scan**. If the query filters on an **indexed** column and the result is narrow enough, it still runs normally on a very large list.

## What to do

1. **Index** the columns you often filter or sort by: status, date, reference number, assignee.
2. Index **early**, as soon as the list is created. Once the list is already large, creating an index can itself be blocked by the same threshold.
3. In **Power Apps** and **Power Automate**, filter on indexed columns with conditions narrow enough from the start.
4. Create **views** that filter on indexed columns instead of showing everything.

## How to index

Go to **List settings**, choose **Indexed columns**, and add the column. A list only supports a limited number of indexes (around 20), so pick the columns that truly matter.

## Notes

- Some column types (for example multi-value columns) cannot be indexed.
- For very large data or complex queries, consider moving to **Dataverse** or a SQL database, which handle delegation better.
- Limits and behavior can change, so check Microsoft's official documentation for your tenant.
