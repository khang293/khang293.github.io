---
title: "Power Apps: catching save errors with IfError"
date: 2026-10-18
description: "Do not let users believe a record was saved when it was not. Use IfError to report what really happened."
tags: ["Power Apps", "Power Fx", "tips"]
lang: en
draft: false
---

A common mistake: a Save button runs `Patch` and then immediately shows "Saved", even when `Patch` failed (lost connection, missing permission, wrong data type). The user thinks it worked, but nothing was written.

## The right way with IfError

```powerfx
IfError(
    Patch(Orders, Defaults(Orders), { Title: txtTitle.Text, Quantity: Value(txtQuantity.Text) }),
    Notify("Save failed: " & FirstError.Message, NotificationType.Error),
    Notify("Saved successfully", NotificationType.Success)
)
```

The structure is `IfError(try this, if it fails do this, if it succeeds do this)`. In the failure branch, `FirstError.Message` gives the reason.

## A few tips

- Put steps that depend on success (such as `Navigate` to another page) in the **success branch**, not outside `IfError`.
- Use `IsError` or `IsBlankOrError` to check values before displaying them.
- For several steps in a row, nest `IfError` or chain actions with `;` inside each branch.
- With forms that use `SubmitForm`, handle `OnSuccess` and `OnFailure` instead of assuming it always works.

## Log errors

When errors happen in production, record them so you can trace them, for example in a SharePoint list with the user and the message:

```powerfx
Patch(ErrorLog, Defaults(ErrorLog), { Title: User().Email, Details: FirstError.Message })
```
