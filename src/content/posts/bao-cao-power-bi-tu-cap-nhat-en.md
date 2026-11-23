---
title: "Self-refreshing Power BI reports: stop building the weekly report by hand"
date: 2026-11-23
description: "How to turn a weekly hand-made Excel report into a dashboard that refreshes itself, so opening it on a phone always shows the latest numbers."
tags: ["Power BI", "reporting", "dashboard", "small business"]
lang: en
draft: false
---

A very familiar routine: at the end of the week or month, someone exports data from a system, pastes it into Excel, builds a pivot table, draws charts and emails the boss. It takes half a day to several days, and by the time the report reaches the reader the numbers are already stale.

## How Power BI is different

You design the report **once**. After that Power BI fetches new data on a schedule and updates the charts. Viewers open a link (or the phone app) and see the latest numbers, with no file being sent around.

## Four steps to a self-refreshing report

1. **Connect the data sources**: Excel, SharePoint, SQL, a sales system, CSV files exported automatically...
2. **Clean and combine the data** once (Power Query), instead of editing by hand each period.
3. **Design the dashboard** around the metrics leaders really need (revenue, stock, receivables, versus plan...).
4. **Schedule the refresh and share** with the right people, each seeing only their own data when needed.

## What to know about automatic refresh

- Cloud sources (SharePoint Online, Excel on OneDrive, many online services) can usually be refreshed directly.
- Sources hosted on the company's own servers (on-premises SQL Server, files on a server) need an extra **gateway** installed on a machine that is always on.
- The number of refreshes per day depends on the Power BI plan. Pro allows up to 8 scheduled refreshes a day, and higher plans allow more. Check Microsoft's current limits when advising a client.

## Who it is for

- Companies that spend many hours each period building reports by hand.
- Leaders who need to follow numbers regularly instead of waiting until month end.
- Data scattered across many files or systems that needs combining.

## Results I have seen

I have built self-refreshing Power BI reports for systems such as asset inventory and HR management (see the Projects section). What clients notice most is the end of manual compiling at the end of each period: the numbers are always current and everyone looks at the same source.

The exact time saved differs per company. When we talk, I will estimate it based on how you build your reports today.

## Which report do you build by hand?

Describe the report you make every week or month and where the data comes from, and I will tell you whether it can be automated and the most compact way to do it. See the Contact page or message me on Zalo.
