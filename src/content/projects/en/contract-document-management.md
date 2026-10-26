---
lang: en
title: "Contract and document management system (Power Apps)"
summary: "A set of Power Apps managing the lifecycle of contracts and related documents: template-based drafting, configurable approvals, delegation and partner profiles. Bilingual Vietnamese - English interface."
date: 2026-03-28
icon: "📑"
order: 2
featured: true
sample: false
role: "Power Apps design & development"
stack: ["Power Apps", "Power Fx", "SharePoint", "Microsoft 365"]
results:
  - "Brought contracts and related documents into one system instead of email and scattered files"
  - "Configurable approvals with delegation and approval history"
  - "A separate admin app so administrators configure the system without changing the main app"
---

## Context

A contract passes through many hands: the requester, the legal team, several approval levels and the counterparty. Managed through email and folders, it is hard to tell where a contract is, who has approved it and which version is final.

## Solution

The system consists of a main app for users and an admin app, running on SharePoint data and Microsoft 365 accounts.

**Main app**
- Home, **to-do**, **my requests** and **drafts**.
- Drafting and managing contracts and related documents based on templates.
- **Partner profiles** and their representatives.
- **Attachment management** (drafts and signed copies) and a detail screen.
- **Delegation** of approvals to someone else.
- An in-app user guide.

**Admin app**
Lets administrators configure foundation data, document templates, roles and approval rules without changing the main app.

## Highlights

- **Configurable approvals**: approvers come from configuration data rather than being hard-coded, so changing the process means editing configuration.
- **Process records and history** for each step, with a history component reused across screens.
- **A bilingual Vietnamese - English interface** built on a shared bilingual text component, suited to local and international counterparties.
- **Permission-based menus**: each person only sees the functions that belong to their role.
- **Reusable components** (header, menu, history, loading and notifications) keep a large app consistent and maintainable.
- User details come from Microsoft 365, so nobody retypes them.

*Described at a high level; internal details are not published.*
