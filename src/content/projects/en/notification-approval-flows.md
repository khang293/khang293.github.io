---
lang: en
title: "Automated notification and approval flows (Power Automate)"
summary: "A set of Power Automate flows coordinating a multi-team process: notify the right people, approve each item, and send reminders when something is not handled."
date: 2026-02-01
icon: "🔔"
order: 5
featured: true
sample: false
role: "Design & development"
stack: ["Power Automate", "Microsoft 365"]
results:
  - "Automatic notifications to the right teams instead of messaging each one by hand"
  - "Every item goes through a clear approval step before it is fulfilled"
  - "One consistent process with fewer missed tasks"
---

## Context

Some processes need several teams to prepare at the same time, each handling one item. Coordinated through manual messages and email, it is easy to miss something or lose track of which items have been approved and completed.

## Solution

I built a set of **Power Automate** flows that follow that process:

- **Automatic notifications**: when a new request is created, the flow notifies the team responsible for each item.
- **Approval for each item**: every item goes through an approval step before it is fulfilled.
- **Reminders** when an item has not been handled.

## Highlights

- **One shared process** instead of depending on who remembers to message whom.
- **Separated by item**: each item has its own owner and approval step, easy to adjust when policy changes.
- **The right notification to the right person at the right time**, cutting down on repeated chasing.

*Described at a high level; specific details are not published.*
