
Technical reference for the Custom Auto redirect script and its configuration hooks.

## How It Works

The auto redirect script runs on page load. It checks the visitor's geolocation against your rules and performs a `window.location.replace()` to the target URL.

## Redirect Flow

```
Page load → Geo lookup → Rule match → Cookie check → Redirect
```

If no rule matches or a valid cookie exists, no redirect occurs.

## Events

```js
document.addEventListener('xapps:auto:before', function (e) {
  // Fires before redirect. Call e.preventDefault() to cancel.
  console.log('Redirecting to', e.detail.url);
});

document.addEventListener('xapps:auto:skip', function (e) {
  // Fires when redirect is skipped (cookie, excluded path, etc.)
  console.log('Skipped:', e.detail.reason);
});
```

## Preventing Redirects

Cancel a redirect programmatically:

```js
document.addEventListener('xapps:auto:before', function (e) {
  if (someCondition) {
    e.preventDefault();
  }
});
```

## Cookie Reference

| Cookie | Default Duration | Description |
|--------|-----------------|-------------|
| `xapps_redirected` | 30 days | Prevents repeated redirects |
| `xapps_dismissed` | 7 days | Set when visitor declines |

## Query Parameters

| Parameter | Effect |
|-----------|--------|
| `?xapps_bypass=1` | Disable all redirects for this visit |
| `?xapps_debug=1` | Log redirect decisions to console |
