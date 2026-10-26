---
lang: en
title: "Barcode-based asset inventory and management system (Power Platform)"
summary: "A solution made of several apps and automated flows: scan barcodes to find and count assets, compare counts with system data, manage photos, run multi-level approvals and report in Power BI."
date: 2026-10-22
icon: "🏷️"
order: 1
featured: true
sample: false
role: "Design & development"
stack: ["Power Apps", "Power Automate", "SharePoint", "Power BI", "Microsoft 365"]
results:
  - "Digitized periodic asset stocktaking with barcode scanning, automatic comparison against system data and variance recording"
  - "Asset photos and change requests managed with multi-level approval"
  - "Role-based access and a Power BI report that refreshes automatically"
---

## Context

Periodic asset stocktaking often relies on spreadsheets and paper: counters write figures by hand, reconciling them with the system's asset list takes a lot of effort, it is hard to see who has approved what, and asset photos are scattered.

## Solution

A Power Platform solution made of several apps and automated flows:

- **App for counters (phone and desktop)**: **scan barcodes to find assets** and view their details, count by stocktake period and location, capture and update photos, submit results and view history.
- **Desktop approval app**: approvers review stocktake results (counted vs system quantities, variances, notes) and approve or reject.
- **Admin app**: manage users and roles, open or close stocktake periods, configure settings, generate barcodes and embed a Power BI report.
- **Power Automate flows**: build the list of assets to count, receive results, automatically compare counted and system quantities, move requests through approval levels, send email notifications, write logs and refresh the report.

## The general process

1. Prepare the list of assets to count for each period.
2. Counters scan barcodes on their phone, enter counts, and add a photo and a note when needed.
3. The system automatically compares counts with system data and records variances.
4. Results go through multi-level approval, then the report refreshes.

## Highlights

- Role-based access, with menus and features matching each person's permissions.
- Different request types share one multi-level approval mechanism, so the system is easy to extend.
- Notification emails link straight to the right screen in the app.
- Data lives in SharePoint, with Power BI on top for reporting.

*Described at a high level; internal details are not published.*
