---
title: "Power BI: cleaner DAX with VAR and DIVIDE"
date: 2026-10-12
description: "Two small habits that make DAX easier to read, faster to run and safe from divide-by-zero errors."
tags: ["Power BI", "DAX", "tips"]
lang: en
draft: false
---

The longer a DAX formula gets, the harder it is to read and fix. Two simple tools help a lot.

## 1. Use VAR to name your calculation steps

`VAR` stores an intermediate result for reuse, which makes the formula easier to read and avoids calculating the same thing twice.

```dax
Growth Rate =
VAR CurrentRevenue = [Revenue]
VAR LastYearRevenue = CALCULATE([Revenue], SAMEPERIODLASTYEAR('Calendar'[Date]))
RETURN
    DIVIDE(CurrentRevenue - LastYearRevenue, LastYearRevenue)
```

## 2. Use DIVIDE instead of the / operator

`DIVIDE(numerator, denominator, [alternate])` handles a **zero denominator** for you (returning blank by default), so your report does not show errors.

```dax
Completion Rate = DIVIDE([Completed Count], [Total Count], 0)
```

## 3. Prefer measures over calculated columns

- **Measures** are evaluated when the user interacts, do not grow the model, and suit aggregations (totals, ratios, averages).
- **Calculated columns** are stored in the model and increase its size. Use them only when you need the value for filtering, grouping or relationships.

## 4. The data model matters more than the formula

Most messy DAX comes from a weak data model. Aim for a **star schema**: one fact table in the middle with dimension tables (date, product, customer) around it. A clean model keeps formulas short and reports fast.

## 5. Name things clearly

Keep measures in their own table, use names that describe meaning (`Revenue`, `Completion Rate`), and add a short comment on complex formulas. In a few months you will thank yourself.
