---
title: UTM & Tracking
category: Configuration
order: 9
layout: docs
---

Track redirect performance with UTM parameters and Google Analytics integration.

## UTM Parameters (Basic+)

**Basic plan and above.** Append UTM parameters to redirect URLs so you can track redirected traffic in Google Analytics or any analytics tool.

Configure these values in **Geolocation Flow Dashboard → Settings**:

| Parameter | Description | Example |
|---|---|---|
| `utm_source` | Where the traffic comes from | `geo`, `xapps` |
| `utm_medium` | The redirect type | `popup`, `auto`, `widget` |
| `utm_campaign` | Campaign name | `geo-redirect`, `summer-sale` |

When set, these parameters are automatically appended to all redirect URLs (e.g., `https://ca.store.com?utm_source=geo&utm_medium=popup`).

## Google Analytics Event (Basic+)

**Basic plan and above.** Geolocation Flow fires a custom Google Analytics event when a visitor clicks a redirect button or is auto-redirected.

- **Default event name:** `geo_redirect_click`
- Customize the event name in your settings to match your GA4 event naming conventions

The event is sent via `gtag()` if Google Analytics is installed on your store.

## URL Query Forwarding (Basic+)

**Basic plan and above.** When enabled, the current page's URL query parameters are forwarded to the redirect destination. This preserves tracking codes, referral parameters, and other query strings across the redirect.

## Global Domain Redirection (Basic+)

**Basic plan and above.** When enabled, redirects preserve the current page path when switching domains. For example, a visitor on `us.store.com/products/shirt` would be redirected to `ca.store.com/products/shirt` instead of just `ca.store.com`.

## Safety Parameters

Geolocation Flow uses special query parameters to prevent redirect loops and allow testing:

| Parameter | Purpose |
|---|---|
| `?xgwr=1` | Added to widget redirect URLs — prevents the widget from showing on the destination page |
| `?xgar=1` | Added to auto-redirect URLs — prevents the auto-redirect from firing on the destination page |

You can disable these parameters in settings if they interfere with your URL structure, but be careful to avoid redirect loops.

## Testing Parameters

| Parameter | Purpose |
|---|---|
| `?xgeo-sim=1` | Activates the Geo Simulator overlay for testing |
| `?xgeo-off` | Disables all xapps redirects for 7 days (sets a cookie) |
| `?xgeo-reset` | Re-enables redirects (removes the `xgeo-off` cookie) |

## Related Docs

- [Display Settings]({{ '/docs/display-settings/' | relative_url }}) — configure display frequency and page visibility
- [Custom Auto Redirects]({{ '/docs/custom-auto/' | relative_url }}) — auto-redirect settings including UTM
- [Markets Auto Redirects]({{ '/docs/markets-auto/' | relative_url }}) — markets auto-redirect settings including UTM
- [Plans Comparison]({{ '/docs/plans/' | relative_url }}) — see which tracking features are available on each plan
