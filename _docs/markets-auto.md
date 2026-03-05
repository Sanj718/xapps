---
title: Markets Auto Redirects
category: Markets Redirects
order: 6
layout: docs
---

Markets Auto Redirects automatically send visitors to the correct Shopify Market based on their geolocation, without showing any widget or prompt.

## Shopify Markets Sync

Like the Markets Widget, auto redirects sync with your Shopify Markets configuration. Click **Sync** in the dashboard to pull the latest market data. The dashboard shows the **last sync date**.

## How It Works

When a visitor loads your store:

1. Their country is detected via geolocation
2. xapps checks which Shopify Market matches that country
3. If the visitor isn't already on the correct market, they are redirected
4. A cookie is set to prevent repeated redirects

## Settings

### Redirect Once

When enabled (default), visitors are only redirected once:

- **Session** — redirect once per browser session
- **Cookies** — redirect once per cookie window (7 days)

### Country Exclusions (Pro)

**Pro plan only.** Exclude specific countries from auto-redirects. Visitors from excluded countries will not be redirected, even if a matching market exists.

The exclusion list includes an **EU auto-select** button that automatically adds all 27 EU member countries (Austria, Belgium, Bulgaria, Croatia, Cyprus, Czech Republic, Denmark, Estonia, Finland, France, Germany, Greece, Hungary, Ireland, Italy, Latvia, Lithuania, Luxembourg, Malta, Netherlands, Poland, Portugal, Romania, Slovakia, Slovenia, Spain, Sweden).

### Bot Detection

Bots and crawlers are automatically excluded from redirects using a customizable regex pattern:

```
bot|adsbot|googlebot|crawler|spider|robot|crawling|slurp
```

### Redirect Delay (Basic+)

**Basic plan and above.** Set a delay in seconds before the redirect fires.

### Page Targeting (Pro)

**Pro plan only.** Choose which page templates trigger or skip auto-redirects:

- **Trigger mode** — only redirect on selected templates
- **Skip mode** — redirect everywhere *except* selected templates
- Available templates: index, product, collection, page, blog, article, cart, 404, search, account pages

### UTM Tracking (Basic+)

**Basic plan and above.** Append UTM parameters (`utm_source`, `utm_medium`, `utm_campaign`) and set a custom GA event name. See [UTM & Tracking]({{ '/docs/utm-tracking/' | relative_url }}) for details.

## Related Docs

- [Geo Targeting Rules]({{ '/docs/geo-targeting/' | relative_url }}) — understand how location detection works
- [Markets Auto]({{ '/docs/dev-markets-auto/' | relative_url }}) — cookies, query params, and custom JS rules
- [Markets Widget Redirects]({{ '/docs/markets-widget/' | relative_url }}) — show a selector instead of auto-redirecting
