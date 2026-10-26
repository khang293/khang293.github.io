---
lang: en
title: "Multi-app Power Platform solution: barcode scanning, multi-level approvals, reporting"
summary: "A solution made of 3 canvas apps and 18 automated flows: barcode scanning, photo management, automatic data comparison, multi-level approvals and Power BI reporting."
date: 2026-10-22
icon: "🏷️"
order: 1
featured: true
sample: false
role: "Design & development"
stack: ["Power Apps", "Power Automate", "SharePoint", "Power BI", "Microsoft 365"]
results:
  - "Digitized a periodic data-collection process with barcode scanning, automatic comparison against system data and variance recording"
  - "Multi-level approvals with status tracking; approvers act from email or the app"
  - "Role-based access and a Power BI report that refreshes automatically"
---

## Context

Periodic data collection and reconciliation often relies on spreadsheets and paperwork: it is hard to match real-world figures with system data, hard to follow approval progress, and photos are not managed in one place.

## Solution

A Power Platform solution made up of:

- **A main app (phone and desktop)** for people collecting data and for general users: scan barcodes, update photos, submit requests and view history.
- **A desktop approval app** where approvers review results and process requests.
- **An admin app**: manage users and roles, open or close collection periods, configure settings, generate barcodes and embed a Power BI report.
- **18 Power Automate flows** that build the list of items to collect, submit results, automatically compare data, move requests through approval levels, send email notifications, write logs and refresh the report.

## Highlights

- Role-based access, with menus and features shown according to each person's permissions.
- Every request type goes through the same multi-level approval mechanism, so new request types are easy to add.
- Notification emails link straight to the right screen in the app.
- Data stored in SharePoint with Power BI reporting on top.

*Described at a high level; specific details are not published.*
