---
title: Creating Rules
category: Rules
order: 2
layout: sc-docs
---

A rule ties a section or block to a set of conditions that control whether it is shown or hidden.

## Picking a Section

When creating a rule, click **Pick from storefront** to open your store in a new tab. Hover any section and click it — the selector is sent back and fills the **Section ID or CSS selector** field automatically. Toggle the picker's **Any element** mode to target something other than a full section (a block, a banner, any element on the page) — it fills in a CSS selector for whatever you click instead of a section ID.

You can also skip the picker entirely and type a section ID or CSS selector into the field directly, if you already know it.

[[SCREENSHOT: Visual section picker on a storefront with a section highlighted and the selection banner at the top]]

## Rule Name

Give the rule a descriptive name so you can identify it in the dashboard (e.g. "Hide promo banner for logged-out visitors").

## Action

Choose what the rule does when all conditions match:

| Action | Behaviour |
|---|---|
| **Show if** | Section is hidden by default; shown when conditions pass |
| **Hide if** | Section is visible by default; hidden when conditions pass |

## Condition Logic

When a rule has multiple conditions, choose how they are combined:

- **AND** — all conditions must pass for the rule to trigger
- **OR** — any single condition passing is enough

[[SCREENSHOT: Rule form in the app admin showing name, action dropdown, AND/OR toggle, and condition rows]]

## Enabling / Disabling

Rules can be toggled on or off from the dashboard without deleting them. Disabled rules have no effect on the storefront.

## Free Plan Limit

The free plan supports **1 active rule**. Upgrade to Pro for unlimited rules and access to [advanced condition types]({{ '/sc-docs/conditions/' | relative_url }}).
