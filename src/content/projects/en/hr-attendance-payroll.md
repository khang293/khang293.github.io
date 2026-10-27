---
lang: en
title: "HR management app: location-based attendance with photos and payroll"
summary: "An HR system on Power Platform: employee records, check-in/out by location with a confirmation photo, payroll from working hours, overtime and allowances, automated approvals and reminders, and Power BI reporting."
icon: "👥"
order: 4
featured: true
sample: false
role: "Design & development"
stack: ["Power Apps", "Power Automate", "SharePoint", "Power BI"]
flow: ["Check in/out with location and photo", "Data stored centrally", "Approval for cases needing confirmation", "Payroll by rules", "Power BI reporting"]
results:
  - "Location-based check-in/out with a photo kept as evidence, replacing manual sign-in sheets"
  - "Payroll calculated automatically from working hours, overtime and allowances, cutting manual month-end consolidation"
  - "Automated approvals and reminders, plus HR reporting in Power BI"
---

## Context

Managing HR in spreadsheets tends to scatter data: employee details in one place, attendance in another, payroll in a third. Month-end consolidation is slow, error-prone and makes it hard to verify actual working hours.

## Solution

The system is built on Power Platform: **Power Apps** provides the interface, **Power Automate** automates the processes, **SharePoint** stores the data and **Power BI** handles reporting.

- **Employee information management**: records, position and employment status.
- **Location-based check-in/out**: the app records the employee's location when they clock in or out to confirm they are at the right workplace.
- **Photo capture at check-in**: a photo is stored with each record as evidence and is easy to review when needed.
- **Rule-based payroll**: calculated automatically from attendance data using working hours, overtime, allowances and related items.
- **Automated approvals and reminders**: Power Automate runs approval flows and sends reminders to the right people at the right time.
- **Reporting**: Power BI dashboards for managers to follow attendance and workforce cost.

## Highlights

- Combining **location and a photo** at check-in makes working-hours data more trustworthy.
- **Payroll rules are applied automatically** from the same attendance source, reducing discrepancies between attendance and payslips.
- **Approval and reminder flows** mean requests are not missed and nobody has to chase others by hand.
- Because it holds personal and salary data, the system needs strict access control.

*Described at a high level; internal details are not published.*
