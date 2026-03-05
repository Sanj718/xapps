---
title: Frequently Asked Questions
category: FAQ
order: 11
layout: docs
---

Common questions and troubleshooting tips for xapps Geo Redirects.

## Widget Not Showing

**The redirect widget doesn't appear on my storefront.**

1. **Check the theme embed** — make sure the correct embed is enabled on your *published* theme, not a draft. See [Activating Theme Embed]({{ '/docs/theme-embed/' | relative_url }}).
2. **Check your plan limits** — on the Free plan, you can only have 1 redirect button. If you've exceeded your plan's limit, additional redirects won't display.
3. **Check geo targeting rules** — the widget only shows to visitors whose location matches your [geo targeting settings]({{ '/docs/geo-targeting/' | relative_url }}). Test with the Geo Simulator (`?xgeo-sim=1`).
4. **Check display frequency** — if set to "Every browser session" or "Every 7 days", the widget won't reappear after being closed until the session/cookie resets. Clear cookies or use an incognito window.
5. **Check display rules** — if the display rule is set to **Manual**, the widget only appears when triggered by a custom element click.
6. **Check for script blockers** — ad blockers, cookie consent tools, or content security policies may block the app's scripts.

## Wrong Country Detected

**The app detects my country incorrectly.**

IP-based geolocation is accurate for most visitors but can be incorrect for:

- Visitors using a **VPN or proxy** — the detected country matches the VPN server, not the visitor's actual location
- Visitors on **certain mobile networks** — some carriers route traffic through centralized servers in other regions
- **Corporate networks** — traffic may exit through a gateway in a different country

This is a known limitation of IP-based geolocation and cannot be resolved by the app. Use the **Geo Simulator** (`?xgeo-sim=1`) to test specific countries without relying on your actual IP.

## Redirect Loops

**Visitors are stuck in an infinite redirect loop.**

1. **Check safety parameters** — xapps adds `?xgwr=1` (widget) or `?xgar=1` (auto) to redirect URLs to prevent loops. If you disabled these in settings, re-enable them.
2. **Check circular rules** — make sure Store A doesn't redirect to Store B while Store B redirects back to Store A for the same visitor location.
3. **Use `?xgeo-off`** — append `?xgeo-off` to your store URL to disable all redirects for 7 days (useful for accessing a store caught in a loop). Use `?xgeo-reset` to re-enable.
4. **Check domain redirection** — if using global domain redirection, ensure the destination domain doesn't have its own redirect back.

## Bot Issues

**Search engine bots are being redirected.**

xapps includes built-in bot detection that prevents bots from being redirected. The default pattern covers major bots:

```
bot|adsbot|googlebot|crawler|spider|robot|crawling|slurp
```

If a specific bot is still being redirected, add its user-agent string to the bot detection pattern in your auto-redirect settings. The pattern uses regex, so separate multiple entries with `|`.

## Markets Sync

**My Shopify Markets data isn't showing up in xapps.**

1. Click the **Sync** button in the xapps dashboard to pull the latest Markets data
2. Make sure your Shopify Markets are **published** (not in draft)
3. Verify your markets have countries assigned in **Shopify Admin → Settings → Markets**

## Plan Limits

**I've reached my redirect button limit.**

- **Free plan:** 1 redirect button, 1 auto-redirect
- **Basic plan:** 4 redirect buttons, unlimited auto-redirects
- **Pro plan:** Unlimited redirect buttons, unlimited auto-redirects

Upgrade your plan to add more redirects. See [Plans Comparison]({{ '/docs/plans/' | relative_url }}).

## Widget Shows on Wrong Pages

**The widget appears on pages where I don't want it.**

Page-specific visibility control is available on the **Pro plan**. Go to your display settings to:

- Select which page templates trigger the widget
- Add custom URLs to include or exclude

See [Display Settings]({{ '/docs/display-settings/' | relative_url }}) for details.

## Testing Redirects

**How do I test redirects without affecting real visitors?**

1. **Geo Simulator** — append `?xgeo-sim=1` to any storefront URL to simulate visits from any country
2. **Draft theme** — enable the embed on a draft/unpublished theme and test there
3. **Dev mode** — append `?xgeo-off` to disable all redirects for 7 days; use `?xgeo-reset` to re-enable

## General Questions

### Does xapps slow down my store?

No. The redirect scripts are lightweight and load asynchronously. Widget embeds load in the body, and auto-redirect scripts load in the head for fast execution.

### Which countries are supported?

All countries recognized by the ISO 3166-1 standard — over 240 countries and territories. You can also target by continent (7 continents available).

### Can I use Custom Redirects and Markets Redirects together?

Yes. They operate independently. You can enable different embeds for each type. However, be careful not to create conflicting rules that redirect the same visitor in different directions.
