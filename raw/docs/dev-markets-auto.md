
Technical reference for the Markets Auto redirect and its integration with Shopify Markets.

## How It Works

On page load, the script detects the visitor's country, looks up the matching Shopify Market, and redirects to that market's domain using `window.location.replace()`.

## Redirect Flow

```
Page load → Geo lookup → Market match → Cookie check → Redirect to market domain
```

## Events

```js
document.addEventListener('xapps:markets-auto:before', function (e) {
  // Fires before redirect. Call e.preventDefault() to cancel.
  console.log('Redirecting to market:', e.detail.market.name);
  console.log('Target URL:', e.detail.url);
});

document.addEventListener('xapps:markets-auto:skip', function (e) {
  console.log('Skipped:', e.detail.reason);
  // reasons: "cookie", "same-market", "excluded-path", "no-match"
});
```

## Preventing Redirects

```js
document.addEventListener('xapps:markets-auto:before', function (e) {
  if (someCondition) {
    e.preventDefault();
  }
});
```

## Cookie Reference

| Cookie | Default Duration | Description |
|--------|-----------------|-------------|
| `xapps_market_redirected` | 30 days | Prevents repeated market redirects |

## Query Parameters

| Parameter | Effect |
|-----------|--------|
| `?xapps_bypass=1` | Disable all redirects for this visit |
| `?xapps_debug=1` | Log redirect decisions to console |
| `?xapps_market=XX` | Force a specific market by country code |

## Fallback Behavior

If the visitor's country doesn't match any configured market, the `fallback` setting determines what happens:

- **`none`** — no redirect, visitor stays on current market
- **`primary`** — redirect to the primary market
- **`custom`** — redirect to a specified fallback URL
