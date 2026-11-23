---
title: "Automate approvals with Power Automate and Teams: no more back-and-forth emails"
date: 2026-11-23
description: "Leave requests, purchase requests, expense approvals: let approvers click one button in Teams while the system updates the status and notifies the requester."
tags: ["Power Automate", "Teams", "approvals", "small business"]
lang: en
draft: false
---

Many businesses still approve requests like this: an employee sends an email or a chat message, the manager replies "ok", and someone copies the result into an Excel file. It causes three familiar problems: requests get buried in inboxes, nobody knows who is holding a request, and there is no clear history when you need to look something up.

If your company already uses Microsoft 365, you can build an automatic approval process without buying new software.

## The process after automation

1. The employee fills in a request (a form or a simple app).
2. The system sends an approval request to the right person, **shown directly in Teams** and by email.
3. The approver clicks **Approve** or **Reject**, optionally adding a comment.
4. The status updates in the request list automatically and the requester is notified.
5. Every request is recorded: who submitted it, who approved it, when, and the result.

## How it works under the hood

I use the **Start and wait for an approval** action in Power Automate (Approvals). It sends the request to the approver, **waits** for the answer, then continues with the next steps. You can choose:

- **One approver**, or **several** (only one needs to approve, or everyone must approve).
- **Multi-level approval**: for example the department head first, then the director if the amount is above a threshold.
- **Reminders** when an approver has not responded by the deadline.

Once there is a result, the flow checks the outcome (Approved or Rejected), updates the status in SharePoint or Dataverse, and notifies the requester.

## Who it is for

- Small and mid-sized companies that use Microsoft 365 but still approve things manually.
- Repetitive request types: leave, purchasing, payments, advances, vehicle booking, meeting room booking.

## Results I have seen

In projects I have delivered (see the Projects section):

- New-employee onboarding: automatic notification to the right department, an explicit approval step for each laptop, email or uniform issued, and reminders when something is not handled, so fewer tasks get missed.
- Contractor file approval app: multi-level approval, substitute approvers, and a confirmation history to look back on.
- Contract system: configurable approvals, delegation and an approval history.

## What you need to prepare

- A company Microsoft 365 account (most plans already include Power Automate for standard actions such as Approvals and SharePoint; check your specific plan).
- A list of who approves which kind of request, and the threshold at which a request goes to a higher level.

Time and cost depend on the number of approval levels, the number of request types and where the data is stored. I quote after we talk, and the first conversation is free.

## Want this for your company?

Tell me how approvals work at your company today, and I will advise for free on how to automate them and estimate the time needed. See the Contact page or message me on Zalo using the button in the corner.
