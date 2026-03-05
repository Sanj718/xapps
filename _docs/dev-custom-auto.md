---
title: Custom Auto
category: Developers
order: 13
layout: docs
icon: route
---

Developer reference for Custom Auto Redirects — cookies, query parameters, bot detection, and custom JavaScript rules.

## Cookies

| Cookie | Purpose | Duration |
|---|---|---|
| `xgeo-session` | Cached geolocation data | 7 days |
| `xgeo-auto-once` | "Redirect once" tracking (when using cookies mode) | 7 days |
| `xgeo-off` | Dev mode — disables all redirects | 7 days |

## Session Storage

| Key | Purpose |
|---|---|
| `xgeo-auto-once` | "Redirect once" tracking (when using session mode) |

## Query Parameters (All Embeds)

These query parameters work across all xapps embeds and are useful during development and testing:

| Parameter | Purpose |
|---|---|
| `?xgar=1` | Loop prevention — appended to redirect URLs by default. When present, auto-redirect is skipped. |
| `?xgwr=1` | Loop prevention for widget redirects — prevents widget from showing |
| `?xgeo-sim=1` | Activates the Geo Simulator overlay — simulate visits from any country |
| `?xgeo-off` | Disables all xapps redirects for 7 days (sets a cookie) |
| `?xgeo-reset` | Re-enables redirects (removes the `xgeo-off` cookie) |
| `?xgeo-test` | Test mode — skips auto-redirect execution for debugging |

## Bot Detection

The auto-redirect script checks `navigator.userAgent` against a regex pattern to prevent bots from being redirected. The default pattern:

```
bot|adsbot|googlebot|crawler|spider|robot|crawling|slurp
```

This pattern is customizable in the dashboard settings. The regex is case-insensitive. Add additional bot identifiers separated by `|`.

## Custom JavaScript Rule (Pro)

**Pro plan only.** Override the default redirect logic with a custom function.

### How to Add Custom Code

1. Go to **xapps Dashboard → Custom Auto Redirects**
2. Scroll down to the **Advanced** section
3. Paste your custom JavaScript into the **Custom redirect rule** field
4. Click **Save**

### Function Signature

```javascript
function run(redirectUrl, currentUrl, geolocation, forceRedirect) {
  // redirectUrl — the URL the visitor would be redirected to
  // currentUrl — the current page URL
  // geolocation — { country: "CA", country_name: "Canada", continent: "NA" }
  // forceRedirect(url) — call to force a redirect to a specific URL
}
```

### Return Values

- `return {}` — proceed with the default redirect
- `return { skip: true }` — cancel the redirect
- `forceRedirect(url)` — redirect to a different URL

### Sample: Use default redirect logic (pass-through)

```javascript
function run(redirectUrl, currentUrl, geolocation, forceRedirect) {
  return {}; // let the default logic handle everything
}
```

### Sample: Cancel redirect for specific countries

```javascript
function run(redirectUrl, currentUrl, geolocation, forceRedirect) {
  var noRedirect = ["US", "CA"];
  if (noRedirect.indexOf(geolocation.country) !== -1) {
    return { skip: true };
  }
  return {};
}
```

### Sample: Redirect to a different URL based on country

```javascript
function run(redirectUrl, currentUrl, geolocation, forceRedirect) {
  if (geolocation.country === "GB") {
    forceRedirect("https://uk.mystore.com" + window.location.pathname);
    return;
  }
  if (geolocation.country === "DE") {
    forceRedirect("https://de.mystore.com" + window.location.pathname);
    return;
  }
  return {}; // default logic for everyone else
}
```

### Sample: Only redirect on the homepage

```javascript
function run(redirectUrl, currentUrl, geolocation, forceRedirect) {
  if (window.location.pathname !== "/") {
    return { skip: true };
  }
  return {};
}
```

### Sample: Cancel redirect if a specific cookie exists

```javascript
function run(redirectUrl, currentUrl, geolocation, forceRedirect) {
  if (document.cookie.includes("my-custom-cookie=1")) {
    return { skip: true };
  }
  return {};
}
```

## Related Docs

- [Custom Auto Redirects]({{ '/docs/custom-auto/' | relative_url }}) — setup and configuration guide
- [UTM & Tracking]({{ '/docs/utm-tracking/' | relative_url }}) — safety parameters and tracking
- [Custom Widget]({{ '/docs/dev-custom-widget/' | relative_url }}) — widget-side developer reference
