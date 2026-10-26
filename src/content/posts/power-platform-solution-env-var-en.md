---
title: "Power Platform: clean deployments with Solutions and Environment Variables"
date: 2026-10-10
description: "Package apps and flows in a Solution, and use environment variables for values that differ between Dev, Test and Prod."
tags: ["Power Platform", "ALM", "tips"]
lang: en
draft: false
---

When moving an app from a test environment to production, many people hand-edit every URL and connection. It is error-prone and hard to repeat. **Solutions** and **Environment Variables** solve this.

## Solutions: keep everything together

A solution holds apps, flows, Dataverse tables and related components. Working **inside a solution** from the start lets you:

- Export and import the whole package to another environment in a few steps.
- Know exactly what each solution contains.
- Manage versions and avoid forgetting components at deployment.

For production, you typically export as **managed** to prevent direct edits; keep the development environment **unmanaged**.

## Environment Variables: separate values from the app

Values that differ between environments, such as the SharePoint site address, list names or admin email, should be declared as **environment variables** instead of being hard-coded in formulas or flows.

- Each environment sets its own value when importing the solution.
- No need to edit the app when moving between environments.
- They can be used in flows, and in Power Apps when declared as a data source.

## Connection References: separate connections

Declare connections (SharePoint, Outlook...) through **connection references** so each environment binds its own connection and flows need no manual fixing after import.

## A suggested process

1. Develop in the **Dev** environment, inside a solution.
2. Export the solution, import it into **Test**, and set the environment variables and connections for that environment.
3. Test, then import into **Prod** using the same process.

## Notes

Some components need extra setup after import (turning flows on, sharing the app, granting permissions). Keep a checklist of these so nothing is forgotten next time.
