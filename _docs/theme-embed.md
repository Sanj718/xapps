---
title: Activating Theme Embed
category: Getting Started
order: 2
layout: docs
---

xapps uses Shopify's theme app embed system to inject redirect scripts into your storefront. There are 4 separate embeds — one for each redirect type. You only need to enable the ones you use.

## The 4 Embeds

| Embed Name | Description | Placement |
|---|---|---|
| **Custom Widget redirects** | Widget popup, top bar, or select | Body |
| **Custom Auto redirects** | Automatic redirects to custom URLs | Head |
| **Markets Widget redirects** | Markets widget popup, top bar, or select | Body |
| **Markets Auto redirects** | Automatic redirects to Shopify Markets | Head |

## Enabling an Embed

1. In your Shopify admin, go to **Online Store → Themes**
2. Click **Customize** on the theme you want to edit
3. Click the **App embeds** icon (puzzle piece) in the left sidebar
4. Find the xapps embed you need and toggle it **on**
5. Click **Save**

[Screenshot: Theme editor App embeds panel showing xapps toggles]

> **Tip:** You can also open the theme editor directly from your xapps dashboard — each redirect type card on the home page includes an **Activate in theme** link.

## Testing with Geo Simulator

Before activating on your live theme, verify everything works using the Geo Simulator:

1. Append `?xgeo-sim=1` to any page URL on your storefront
2. A simulator overlay appears letting you select any country to test with
3. The simulator stays active for 24 hours (stored in the `xgeo-sim-active` cookie)

Example: `https://your-store.myshopify.com?xgeo-sim=1`

## Important Notes

- **Each theme is separate** — enabling the embed on a draft theme does not enable it on your published theme. You must enable it on each theme individually.
- **Only enable what you need** — if you only use Custom Widget Redirects, only enable that embed. Enabling unused embeds adds unnecessary scripts.
- **Legacy embeds** — if you previously used the older `[Legacy] Popup & Auto` or `[Legacy] Markets widget` embeds, you should disable those and switch to the new embeds listed above.

## Troubleshooting

- **Widget not showing?** Confirm the embed is enabled on your *published* theme, not just a draft.
- **Script blocked?** Check if a content security policy, ad blocker, or cookie consent tool is blocking third-party scripts.
- **Changed themes?** When you switch your published theme, you need to re-enable the embed on the new theme.
