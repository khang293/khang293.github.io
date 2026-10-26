---
title: "5 Power Fx tips for faster, cleaner Power Apps"
date: 2026-10-24
description: "Concurrent, With, Coalesce, named formulas and naming conventions: small habits that make a big difference."
tags: ["Power Apps", "Power Fx", "tips"]
lang: en
draft: false
---

A few small habits when writing Power Fx make your apps faster and easier to maintain.

## 1. Load data in parallel with Concurrent

Instead of loading sources one after another, run them at the same time, especially in `App.OnStart` or `OnVisible`.

```powerfx
Concurrent(
    ClearCollect(colCustomers, Filter(Customers, Status = "Active")),
    ClearCollect(colProducts, Products)
)
```

## 2. Use With to avoid repeated calculations

```powerfx
With(
    { total: Sum(galOrders.AllItems, LineTotal) },
    Text(total, "#,##0.00")
)
```

## 3. Use Coalesce instead of nested If

`Coalesce` returns the first non-blank value, much tidier than `If(IsBlank(...), ..., ...)`.

```powerfx
Coalesce(txtNote.Text, "No notes yet")
```

## 4. Use named formulas for shared values

Declare them in the **App.Formulas** property. They always stay up to date and need no manual `Set`.

```powerfx
UserEmail = User().Email;
IsManager = UserEmail in colManagers.Email;
```

## 5. Prefix your control names

`btnSave`, `txtFullName`, `galOrders`, `lblTitle`... The name tells you the control type, and formulas stay readable as the app grows.

Got a tip to share? Send it to me through the contact page.
