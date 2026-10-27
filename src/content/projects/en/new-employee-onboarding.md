---
lang: en
title: "New-employee onboarding automation (Power Automate)"
summary: "A set of Power Automate flows that coordinate preparing for a new employee: notifying the right teams, issuing a computer, an email account and a uniform, with an approval for each issuance and reminders when something is not handled."
icon: "🧑‍💼"
order: 5
featured: true
sample: false
role: "Design & development"
stack: ["Power Automate", "Microsoft 365"]
flow: ["A new employee is added", "Each team is notified", "Each item is approved", "Items are issued", "Reminder if not handled"]
results:
  - "Automatic notifications to the right teams when a new employee is added, instead of messaging each one by hand"
  - "Every computer, email or uniform issuance goes through a clear approval step"
  - "One consistent process for every new hire, with fewer missed tasks"
---

## Context

When a new employee joins, several teams must prepare at the same time: IT issues a computer and an email account, administration issues a uniform and other supplies. Coordinated through manual messages and email, it is easy to miss an item or to lose track of what has been approved and completed.

## Solution

I built a set of **Power Automate** flows that follow the new-employee onboarding process:

- **Automatic notifications**: when a new employee is added, the flow notifies the team responsible for each item.
- **Items to issue**: computer, email account, uniform and related supplies.
- **Approval for each issuance**: every item goes through an approval step before it is fulfilled.
- **Reminders** when an item has not been handled.

## Highlights

- **One shared process** for every new hire, instead of depending on who remembers to message whom.
- **Separated by item**: each type of issuance has its own owner and approval step, easy to adjust when policy changes.
- **The right notification to the right person at the right time**, cutting down on repeated chasing.

*Described at a high level; internal details are not published.*
