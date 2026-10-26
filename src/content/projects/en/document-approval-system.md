---
lang: en
title: "Bilingual document management and approval system (Power Apps)"
summary: "A pair of Power Apps managing several document types: template-based drafting, configurable approval matrix, delegation and record storage. Bilingual Vietnamese - English interface."
date: 2026-03-28
icon: "📑"
order: 2
featured: true
sample: false
role: "Power Apps design & development"
stack: ["Power Apps", "Power Fx", "SharePoint", "Microsoft 365"]
results:
  - "Brought several document types into one system instead of email and scattered files"
  - "Configurable approval matrix with delegation and approval history"
  - "A separate admin app so administrators configure it without changing the main app"
---

## Context

Documents often pass through many hands: the requester, several approval levels and other stakeholders. Managed through email and folders, it is hard to tell where a document is, who has approved it and which version is final.

## Solution

The system consists of two Power Apps running on SharePoint data and Microsoft 365 accounts.

**Main app, around 19 screens**
- Home, **to-do** and **my requests** lists, and drafts.
- Drafting and managing several document types based on templates.
- **Stakeholder profiles** and their representatives.
- **Attachment management** (drafts and final copies) and a detail screen.
- **Delegation** of approvals to someone else.
- An in-app user guide screen.

**Admin app, around 13 screens**
Lets administrators configure the foundation data themselves: categories, document types, languages, currencies, departments, locations, roles, templates, delegation and the **approval matrix**.

## Highlights

- **A configurable approval matrix**: approvers come from configuration rather than being hard-coded, so changing the process means editing data.
- **Process records and history** for each step, with a history component reused across screens.
- **A bilingual Vietnamese - English interface** built on a shared bilingual text component.
- **Permission-based menus**: each person only sees the functions that belong to their role.
- **Reusable components** (header, menu, history, loading and notifications) keep a large app consistent and maintainable.

*Described at a high level; specific details are not published.*
