---
lang: en
title: "Multi-level approval app for desktop and mobile (Power Apps)"
summary: "A Power Apps app (desktop and mobile) for internal staff to review submissions: parallel approvers, approver delegation and history tracking, running on SharePoint data."
date: 2026-10-12
icon: "✅"
order: 3
featured: true
sample: false
role: "Power Apps design & development"
stack: ["Power Apps", "Power Fx", "Power Automate", "SharePoint"]
results:
  - "Extended the approval from a single approver to parallel multi-approver (up to 7 positions), with rejection reasons and approval history"
  - "Added approver delegation, keeping the desktop and mobile versions in sync"
  - "Tested the approval flow with real data on a test app, and documented the design and formulas so others can take over"
---

## Context

Submissions enter the system through a separate channel, and internal staff process and approve them in a Power Apps app. Both sides share data in SharePoint. The app comes in two versions: one for desktop and one for mobile.

## My part

I own the Power Apps app: I designed the approval screens, wrote the Power Fx formulas, kept the two versions in sync, and worked alongside existing Power Automate email flows by writing the right data for them to pick up.

## Highlights

**1. Parallel multi-level approval**
There used to be a single approver. I extended it so several positions approve at the same time. Each person only sees and handles their own part. A submission completes once everyone has approved, while a single rejection with a reason sends it back for changes. The result email is sent only once there is a final outcome, and people who already approved are kept when it is resubmitted.

**2. Approver delegation**
Whoever holds an approval position can delegate it to another person in the same unit. The app blocks people who already approved, records a delegation history and emails the delegate. Screens and formulas are the same on desktop and mobile.

**3. Keeping both app versions in sync**
I compared each control and formula between the two versions to make sure they behave identically, instead of fixing one and forgetting the other.

**4. Performance review**
Reviewed both apps for delegation warnings, number of data calls and data loading patterns, and produced a prioritized improvement list, including a note that large SharePoint lists need indexing.

**5. Handover documentation**
Wrote design documents covering each control and Power Fx formula, stating clearly what has been tested and what has not, so others can take over without starting from scratch.

*Described at a high level; specific details are not published.*
