---
lang: en
title: "Contractor management and approval app (Power Apps)"
summary: "A Power Apps app (desktop and mobile) for internal staff to review contractor submissions: multi-level approval, approver delegation and history tracking, running on SharePoint data."
date: 2026-10-12
icon: "🧱"
order: 3
featured: true
sample: false
role: "Power Apps design & development"
stack: ["Power Apps", "Power Fx", "Power Automate", "SharePoint"]
flow: ["Submission arrives from the portal", "Approvers are assigned", "Several approvers, rejection with a reason", "Approval history is recorded", "Result notification"]
results:
  - "Extended contractor submission approval from a single approver to several approvers, with approval history"
  - "Added approver delegation, keeping the desktop and mobile versions in sync"
  - "Tested the approval flow with real data on a test app, and documented the design and formulas so others can take over"
---

## Context

The contractor management system has two sides: contractors submit documents through a separate portal, while internal staff process and approve them in a Power Apps app. Both share data in SharePoint. The app comes in two versions: one for desktop and one for mobile.

## My part

I own the Power Apps app: I designed the approval screens, wrote the Power Fx formulas, kept the two versions in sync, and worked alongside existing Power Automate email flows by writing the right data for them to pick up.

## Highlights

**1. Multi-level submission approval**
There used to be a single approver. I extended it so several people take part in approving one submission. Each person only sees and handles their own part, can reject with a reason, and the approval history is recorded for tracking.

**2. Approver delegation**
Whoever holds an approval position can delegate it to someone else. The app checks the conditions, records a delegation history and notifies the delegate. Screens and formulas are the same on desktop and mobile.

**3. Keeping both app versions in sync**
I compared each control and formula between the two versions to make sure they behave identically, instead of fixing one and forgetting the other.

**4. Performance review**
Reviewed both apps for delegation warnings, number of data calls and data loading patterns, and produced a prioritized improvement list, including a note that large SharePoint lists need indexing.

**5. Handover documentation**
Wrote design documents covering the controls and Power Fx formulas, stating clearly what has been tested and what has not, so others can take over without starting from scratch.

*Described at a high level; internal details are not published.*
