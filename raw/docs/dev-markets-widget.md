# Markets Widget

Developer reference for the Markets Widget — trigger attributes, query parameters, cookies, and custom JavaScript rules.

## Trigger Attributes

Use these data attributes on any HTML element in your theme to control the Markets widget:

| Attribute | Description |
|---|---|
| `data-xgeo-markets-open` | Opens the Markets widget when this element is clicked |
| `data-xgeo-markets-close` | Closes the Markets widget on click |

Example — add a "Change country" button anywhere on your site:

```html
<button data-xgeo-markets-open>Change your country</button>
```

### Hash Trigger

You can open the Markets widget by navigating to `#xgeo-markets-open`. This is useful for adding a "Change country" link anywhere on your site:

```html
<a href="#xgeo-markets-open">Change your country</a>
```

### Hash Utilities

| Hash | Purpose |
|---|---|
| `#xgeo-markets-open` | Opens the Markets widget |
| `#xgeo-markets-test` | Forces the widget to show for testing |
| `#xgeo-markets-clear-user-data` | Clears all Markets widget cookies and session storage |

## Cookies

| Cookie | Purpose | Duration |
|---|---|---|
| `xgeo-session` | Cached geolocation data (shared across all embeds) | 7 days |
| `xgeo-markets-closed` | Tracks whether the visitor closed the widget | Cookie: 365 days / Session: until browser closes |
| `xgeo-off` | Dev mode — disables all redirects | 7 days |

## Query Parameters (All Embeds)

These query parameters work across all embeds and are useful during development:

| Parameter | Purpose |
|---|---|
| `?xgeo-sim=1` | Activates the Geo Simulator overlay — test from any country |
| `?xgeo-sim=0` | Deactivates the Geo Simulator overlay |
| `?xgeo-off` | Disables all redirects for 7 days (sets a cookie) |
| `?xgeo-reset` | Re-enables redirects (removes the `xgeo-off` cookie) |
| `?xgeo-markets-test` | Test mode — forces the Markets widget to show |

## Custom JavaScript Rules (Pro)

**Pro plan only.** Add custom JS logic in the **Advanced** section of your Markets Widget settings in the app dashboard.

### How to Add Custom Code

1. Go to **Geolocation Flow Dashboard → Markets Widget Redirects**
2. Scroll down to the **Advanced** section
3. Paste your custom JavaScript into the **Custom widget display rule** or **Custom items display rule** field
4. Click **Save**

### Widget Display Rule

Controls whether and when the widget opens. When this rule is set, the default auto-open logic is disabled — you must call `openModal()` yourself.

#### Parameters

| Parameter | Description |
|---|---|
| `geolocation` | `{ country: "CA", country_name: "Canada", continent: "NA" }` |
| `openModal()` | Call to open the widget |
| `hasBeenClosed()` | Returns `"1"` if previously closed, `null` otherwise |
| `displayFrequency()` | Returns `"session"`, `"everyload"`, or `"cookie"` |
| `marketsData` | Array of synced Shopify Markets |

**Sample: Show widget only for European visitors who haven't closed it:**

```javascript
function run(geolocation, openModal, hasBeenClosed, displayFrequency, marketsData) {
  var euCountries = ["AT","BE","BG","HR","CY","CZ","DK","EE","FI","FR",
    "DE","GR","HU","IE","IT","LV","LT","LU","MT","NL","PL","PT","RO",
    "SK","SI","ES","SE"];

  if (euCountries.indexOf(geolocation.country) !== -1 && hasBeenClosed() !== "1") {
    openModal();
  }
}
```

**Sample: Show widget with a 3-second delay:**

```javascript
function run(geolocation, openModal, hasBeenClosed, displayFrequency, marketsData) {
  if (hasBeenClosed() !== "1") {
    setTimeout(function() {
      openModal();
    }, 3000);
  }
}
```

### Items Display Rule

Controls which market items are visible in the selector. Called once per item, return `true` to show or `false` to hide.

#### Parameters

| Parameter | Description |
|---|---|
| `geolocation` | `{ country: "CA", country_name: "Canada", continent: "NA" }` |
| `marketItem` | `{ label: "Canada", ... }` |
| `marketsData` | Array of all synced Shopify Markets |

#### Return Values

- `return true` — show the item
- `return false` — hide the item

**Sample: Only show markets that are different from the visitor's current one:**

```javascript
function run(geolocation, marketItem, marketsData) {
  // Hide the market that matches the visitor's current country
  if (marketItem.countries && marketItem.countries.indexOf(geolocation.country) !== -1) {
    return false;
  }
  return true;
}
```

## Related Docs

- [Markets Widget Redirects](/docs/markets-widget/) — setup and customization guide
- [Display Settings](/docs/display-settings/) — frequency, delay, and page targeting
- [Geo Targeting Rules](/docs/geo-targeting/) — location-based display rules
