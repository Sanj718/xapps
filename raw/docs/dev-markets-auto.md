# Markets Auto

Developer reference for Markets Auto Redirects — cookies, query parameters, country exclusions, and custom JavaScript rules.

## Cookies

| Cookie | Purpose | Duration |
|---|---|---|
| `xgeo-session` | Cached geolocation data (shared across all embeds) | 7 days |
| `xgeo-markets-auto-once` | "Redirect once" tracking (cookies mode) | 7 days |
| `xgeo-off` | Dev mode — disables all redirects | 7 days |

## Session Storage

| Key | Purpose |
|---|---|
| `xgeo-markets-auto-once` | "Redirect once" tracking (session mode) |

## Query Parameters (All Embeds)

These query parameters work across all embeds:

| Parameter | Purpose |
|---|---|
| `?xgeo-sim=1` | Activates the Geo Simulator overlay — simulate visits from any country |
| `?xgeo-sim=0` | Deactivates the Geo Simulator overlay |
| `?xgeo-off` | Disables all redirects for 7 days (sets a cookie) |
| `?xgeo-reset` | Re-enables redirects (removes the `xgeo-off` cookie) |
| `?xgeo-markets-test` | Test mode — skips Markets auto-redirect execution for debugging |

## Country Exclusion Logic

When country exclusions are configured (Pro only), the script checks the visitor's country against the exclusion list *before* redirecting. If the visitor's country is in the exclusion list, no redirect occurs even if a matching market exists.

The exclusion list supports the **EU auto-select** shortcut, which adds all 27 EU member countries at once.

## Bot Detection

Same as custom auto-redirects — the script checks `navigator.userAgent` against a configurable regex pattern. Default:

```
bot|adsbot|googlebot|crawler|spider|robot|crawling|slurp
```

## Custom JavaScript Rule (Pro)

**Pro plan only.** Override the default redirect logic with a custom function. Add your code in the **Advanced** section of your Markets Auto Redirects settings.

### How to Add Custom Code

1. Go to **Geolocation Flow Dashboard → Markets Auto Redirects**
2. Scroll down to the **Advanced** section
3. Paste your custom JavaScript into the **Custom redirect rule** field
4. Click **Save**

### Parameters

| Parameter | Description |
|---|---|
| `currentMarket` | The market the visitor is currently on |
| `redirectMarket` | The market the visitor would be redirected to |
| `geolocation` | `{ country: "CA", country_name: "Canada", continent: "NA" }` |
| `marketsData` | Array of all synced Shopify Markets |
| `excludedCountries` | Array of country codes excluded from redirects |
| `forceRedirect({ country_code, locale_code? })` | Force a redirect to a specific market |

### Execution Order

Your custom code runs **per redirect item**, after the app matches the visitor's location to a redirect rule. The flow is:

1. The app loops through redirect items in order
2. For each item that matches the visitor's geo, your `run()` function is called
3. Your code can override or cancel the redirect via return values

> **Important:** `forceRedirect()` calls `window.location.replace()`, but the browser doesn't stop JavaScript execution instantly. The redirect item loop continues running — so if you call `forceRedirect()` without returning `false`, the next matching redirect item can overwrite your forced redirect before the browser navigates.

### Return Values

- `return {}` — proceed with the default redirect
- `return { skip: true }` — cancel the redirect for this item
- `return false` — skip this redirect item (use after calling `forceRedirect`)
- `forceRedirect({ country_code, locale_code })` + `return false` — redirect to a specific market and prevent the normal redirect from overwriting it

### Sample: Only redirect visitors from specific countries

```javascript
function run(currentMarket, redirectMarket, geolocation, marketsData, excludedCountries, forceRedirect) {
  var allowedCountries = ["CA", "GB", "AU", "DE", "FR"];

  if (allowedCountries.indexOf(geolocation.country) === -1) {
    return { skip: true }; // don't redirect visitors from other countries
  }

  return {}; // proceed with default redirect for allowed countries
}
```

### Sample: Redirect all EU visitors to a specific market

```javascript
function run(currentMarket, redirectMarket, geolocation, marketsData, excludedCountries, forceRedirect) {
  var euCountries = ["AT","BE","BG","HR","CY","CZ","DK","EE","FI","FR",
    "DE","GR","HU","IE","IT","LV","LT","LU","MT","NL","PL","PT","RO",
    "SK","SI","ES","SE"];

  if (euCountries.indexOf(geolocation.country) !== -1) {
    // Force redirect to the EU market (e.g., Germany with English locale)
    forceRedirect({ country_code: "DE", locale_code: "en" });
    return false; // prevents the normal redirect from overwriting
  }

  return {}; // default logic for non-EU visitors
}
```

### Sample: Cancel redirect on specific pages

```javascript
function run(currentMarket, redirectMarket, geolocation, marketsData, excludedCountries, forceRedirect) {
  // Don't redirect on cart or checkout pages
  if (window.location.pathname.includes("/cart") || window.location.pathname.includes("/checkout")) {
    return { skip: true };
  }

  return {};
}
```

## Related Docs

- [Markets Auto Redirects](/docs/markets-auto/) — setup and configuration guide
- [UTM & Tracking](/docs/utm-tracking/) — safety parameters and tracking
- [Markets Widget](/docs/dev-markets-widget/) — widget-side developer reference
