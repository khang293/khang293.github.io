---
title: "When to replace an Excel tracker with a Power Apps app (and when you don't need to)"
date: 2026-11-23
description: "Signs your Excel file is overloaded, what a Power Apps app solves, and how to switch without disrupting the work already running."
tags: ["Power Apps", "Excel", "inventory", "small business"]
lang: en
draft: false
---

Excel is great for getting started. Many companies manage sales, stock, receivables or attendance in one shared Excel file, and it works fine **until you add more users and more data**.

## Signs your Excel file is overloaded

- Two people open it at once and overwrite each other, or you have to ask "who has the file open?".
- There are many copies: `sales-final`, `sales-final-2`, `sales-final-edited-again`.
- Anyone can edit any cell, so data gets mistyped or deleted and nobody knows who did it.
- People in the field (warehouse, sales) take photos or write on paper and re-type it later.
- Compiling the weekly or monthly report takes a lot of time.
- The file gets slower and heavier.

If you see two or more of these, consider moving to an app.

## What Power Apps solves

- **Many users at once** on phones, tablets and browsers, without overwriting each other.
- **Each person sees and edits only their part**: staff can enter orders, only managers can approve or delete.
- **Validated entry forms**: required fields cannot be left blank and text cannot be typed into number fields.
- **Use in the field**: scan barcodes with the phone camera, attach photos.
- **Change history** and centralized data for automatic reports (for example with Power BI).

Data is usually stored in a **SharePoint List** or **Dataverse** instead of rows in an Excel file.

## When you don't need an app yet

- One or two users and little data: Excel is still the most economical choice.
- The process keeps changing: stabilize the process first, then build the app.

## Switching without disruption

1. Define clearly who enters, who views and who approves.
2. Build a first version with only the core features and let a small group try it.
3. Move the old data from Excel into the new list.
4. Run both in parallel briefly, then retire the old file.

## Costs to know about

Data in SharePoint works with many Microsoft 365 plans. Dataverse and some premium connectors need a separate Power Apps license. I usually advise starting with the cheapest option that is enough (typically SharePoint) and moving to Dataverse only when the business logic is genuinely complex. Licensing prices are set by Microsoft and can change, so I check against the plan your company already has before quoting.

## Results I have seen

Some work I moved from loose files and paper to apps (see the Projects section):

- Asset inventory with barcode scanning: automatically compares the counted quantity with system figures and records differences, with a self-refreshing Power BI report.
- Location-based attendance with photo confirmation, plus payroll by hours worked, overtime and allowances, reducing the manual compiling at month end.
- Contract and document management: everything in one system instead of emails and loose files.

## What are you managing with Excel?

Describe the file you use today and I will tell you whether to keep it or move to an app, and if you move, the most compact way to do it. See the Contact page or message me on Zalo.
