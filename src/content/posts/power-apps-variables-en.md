---
title: "Power Apps: when to use Set, UpdateContext or a collection"
date: 2026-10-20
description: "Three ways to hold temporary data in Power Apps differ in scope and purpose. Choosing correctly keeps apps tidy and easy to debug."
tags: ["Power Apps", "Power Fx", "tips"]
lang: en
draft: false
---

Power Apps has three ways to hold temporary data that are often mixed up. Knowing the difference makes apps easier to read and cuts down on odd bugs.

## 1. Set: a global variable

Available on **every screen**. Good for shared information such as the current user, role and configuration.

```powerfx
Set(gloRole, LookUp(RoleList, Email = User().Email, Role))
```

## 2. UpdateContext: a screen-level variable

Only usable on the **current screen**. Good for UI state such as popup open/closed, loading, or edit mode.

```powerfx
UpdateContext({locShowPopup: true})
```

You can also pass a value to another screen while navigating, where it becomes a local variable:

```powerfx
Navigate(Details, ScreenTransition.None, {locOrderId: ThisItem.ID})
```

## 3. Collection: a temporary table

Holds **many rows** in memory. Good for caching data from an external source, or gathering rows the user is entering before saving.

```powerfx
ClearCollect(colOrders, Filter(Orders, Status = "New"))
```

## Naming convention

- `glo...` for global variables, `loc...` for local variables, `col...` for collections.
- The name tells you the scope at a glance, so you never wonder where a variable was created.

## Notes

- Do not overuse globals for things only one screen needs; it causes hard-to-trace bugs.
- Collections use memory, so avoid loading a large list when you only need a few columns. Filter and use `ShowColumns` first.
- For values calculated from other data, consider named formulas (declared in `App.Formulas`) instead of manual `Set`.
