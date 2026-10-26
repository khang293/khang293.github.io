---
title: "Power Automate: try/catch error handling with Scopes"
date: 2026-10-22
description: "Group steps into a Scope, catch failures with Run after, and send alerts that include the actual cause."
tags: ["Power Automate", "tips"]
lang: en
draft: false
---

A flow that runs fine in testing and then **fails silently** in production is all too common. The try/catch pattern using **Scopes** tells you right away where it broke.

## Structure

1. Create a Scope named **Try** and move the main steps of your flow inside it.
2. Create a Scope named **Catch** right after it. In the Catch scope's **Configure run after**, tick only **has failed** and **has timed out** (untick *is successful*).
3. Inside Catch, get the error details and send an alert (Teams or email).

## Getting the cause of the failure

Inside Catch, add a **Filter array** action with:

- **From**: `result('Try')`
- **Condition**: `item()?['status']` equals `Failed`

Then use this expression in the alert message to get the first error:

```text
first(body('Filter_array'))?['error']?['message']
```

Include the flow name too: `workflow()?['tags']?['flowDisplayName']`.

## Add a Finally scope (optional)

Add a **Finally** scope after Catch that runs on all outcomes (success, failed, skipped, timed out) for cleanup or logging, whether the flow succeeded or not.

## Notes

- Name your Scopes clearly, because `result('Try')` refers to the Scope by name.
- If you want the run to still show as **Failed** in history after the alert is sent, add a **Terminate** action with status Failed at the end of Catch.
