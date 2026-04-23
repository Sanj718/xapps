---
title: Inline Widget
category: Developers
order: 20
layout: docs
icon: earth
---

Developer reference for the Custom Inline Widget — cookies, query parameters, and custom JavaScript rules.

## Cookies

| Cookie | Purpose | Duration |
|---|---|---|
| `xgeo-session` | Cached geolocation data (shared across all embeds) | 7 days |
| `xgeo-off` | Dev mode — disables all redirects | 7 days |

## Query Parameters (All Embeds)

These query parameters work across all embeds and are useful during development and testing:

| Parameter | Purpose |
|---|---|
| `?xgeo-sim=1` | Activates the Geo Simulator overlay — simulate visits from any country |
| `?xgeo-sim=0` | Deactivates the Geo Simulator overlay |
| `?xgeo-off` | Disables all redirects for 7 days (sets a cookie) |
| `?xgeo-reset` | Re-enables redirects (removes the `xgeo-off` cookie) |
| `?xgwir=1` | Loop prevention — appended to inline redirect URLs by default. When present, the inline widget skips rendering. Note: the popup widget uses `?xgwr=1`; the inline widget uses `?xgwir=1`. |

## Custom JavaScript Rule (Pro)

**Pro plan only.** Filter which dropdown options are visible using a custom function.

### How to Add Custom Code

1. Go to **Geolocation Flow Dashboard → Custom Widget Redirects → Customize inline dropdown**
2. Scroll down to the **Advanced** section
3. Paste your custom JavaScript into the **Custom button display rule** field
4. Click **Save**

### Parameters

| Parameter | Description |
|---|---|
| `geolocation` | `{ country: "CA", country_name: "Canada", continent: "NA" }` |
| `redirectButton` | `{ label: "Canada", url: "https://ca.store.com", ... }` |

### Return Values

- `return true` — show the option
- `return false` — hide the option

### Sample: Hide the option that matches the visitor's country

```javascript
function run(geolocation, redirectButton) {
  if (redirectButton.label === geolocation.country_name) {
    return false;
  }
  return true;
}
```

### Sample: Only show options for specific countries

```javascript
function run(geolocation, redirectButton) {
  var showFor = ["Canada", "United Kingdom", "Australia"];
  return showFor.indexOf(redirectButton.label) !== -1;
}
```

## Related Docs

- [Inline Widget]({{ '/docs/inline-widget/' | relative_url }}) — setup and customization guide
- [Custom Widget]({{ '/docs/dev-custom-widget/' | relative_url }}) — popup version developer reference
- [Geo Targeting Rules]({{ '/docs/geo-targeting/' | relative_url }}) — location-based display rules
