# Markets Inline Widget

Developer reference for the Markets Inline Widget — cookies, query parameters, and custom JavaScript rules.

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

## Custom JavaScript Rule (Pro)

**Pro plan only.** Filter which market options are visible in the dropdown using a custom function.

### How to Add Custom Code

1. Go to **Geolocation Flow Dashboard → Markets Widget Redirects → Customize inline dropdown**
2. Scroll down to the **Advanced** section
3. Paste your custom JavaScript into the **Custom items display rule** field
4. Click **Save**

### Parameters

| Parameter | Description |
|---|---|
| `geolocation` | `{ country: "CA", country_name: "Canada", continent: "NA" }` |
| `redirectButton` | `{ label: "Canada", ... }` — the current market option |
| `marketsData` | Array of all synced Shopify Markets |

### Return Values

- `return true` — show the option
- `return false` — hide the option

### Sample: Hide the market that matches the visitor's current country

```javascript
function run(geolocation, redirectButton, marketsData) {
  if (redirectButton.countries && redirectButton.countries.indexOf(geolocation.country) !== -1) {
    return false;
  }
  return true;
}
```

### Sample: Only show markets for specific regions

```javascript
function run(geolocation, redirectButton, marketsData) {
  var showFor = ["CA", "AU", "GB"];
  if (redirectButton.countries) {
    return redirectButton.countries.some(function(c) {
      return showFor.indexOf(c) !== -1;
    });
  }
  return true;
}
```

## Related Docs

- [Markets Inline Widget](/docs/markets-inline-widget/) — setup and customization guide
- [Markets Widget](/docs/dev-markets-widget/) — popup version developer reference
- [Geo Targeting Rules](/docs/geo-targeting/) — location-based display rules
