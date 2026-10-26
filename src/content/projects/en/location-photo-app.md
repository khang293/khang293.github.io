---
lang: en
title: "Location and photo capture app with automatic calculation and approvals"
summary: "A Power Platform system: location-based check-in/out with a confirmation photo, automatic calculation by configurable rules, and automated approvals and reminders."
date: 2026-01-01
icon: "📍"
order: 4
featured: true
sample: false
role: "Design & development"
stack: ["Power Apps", "Power Automate", "SharePoint", "Power BI"]
results:
  - "Location-based records with a photo kept as evidence, replacing manual entries"
  - "Automatic calculation by rules, cutting manual consolidation at period end"
  - "Automated approvals and reminders, with reporting in Power BI"
---

## Context

Managing data in spreadsheets tends to scatter information: user data in one place, recorded events in another, calculated results in a third. Period-end consolidation is slow, error-prone and makes it hard to verify what really happened.

## Solution

The system is built on Power Platform: **Power Apps** provides the interface, **Power Automate** automates the processes, **SharePoint** stores the data and **Power BI** handles reporting.

- **Centralized user information.**
- **Location-based check-in/out**: the app records the location when an action is performed to confirm the person is where they should be.
- **Photo capture**: a photo is stored with each record as evidence and is easy to review when needed.
- **Rule-based calculation**: results are computed automatically from the recorded data using configurable rules (time, multipliers, additional items).
- **Automated approvals and reminders**: Power Automate runs approval flows and sends reminders to the right people at the right time.
- **Reporting**: Power BI dashboards for managers to follow progress.

## Highlights

- Combining **location and a photo** makes the data more trustworthy.
- **Rules are applied automatically** from one source of data, reducing discrepancies between steps.
- **Approval and reminder flows** mean requests are not missed and nobody has to chase others by hand.
- Because it holds personal data, the system needs strict access control.

*Described at a high level; specific details are not published.*
