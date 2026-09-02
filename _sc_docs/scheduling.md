---
title: Scheduling
category: Rules
order: 4
layout: sc-docs
---

Rules can be scheduled to only be active during a specific time window. When a rule is outside its schedule it has no effect — the section behaves as if the rule doesn't exist. Scheduling is a **Pro** feature — see [Plans Comparison]({{ '/sc-docs/plans/' | relative_url }}).

## Setting a Schedule

When creating or editing a rule, enable **Schedule** and configure the window:

| Option | Behaviour |
|---|---|
| **Start date only** | Rule is active from the start date/time onwards (no end) |
| **End date only** | Rule is active until the end date/time (no start) |
| **Start + end date** | Rule is active between the two dates (inclusive) |

Times are entered and evaluated in **your store's timezone**, not your browser's — the app shows your shop's timezone next to the date fields so what you enter is unambiguous.

## Use Cases

- Show a sale banner only during a promotional period
- Hide a "coming soon" section after a product launches
- Display a seasonal offer between specific dates

## Notes

- A rule with scheduling enabled but outside its active window is silently skipped — the section behaves as if no rule exists for that period.
- For time-critical logic (e.g. exact launch seconds), use Shopify's native metafield or script editor tooling instead.
