---
title: Custom Widget
category: Developers
order: 12
layout: docs
icon: earth
---

Developer reference for the Custom Widget — trigger attributes, query parameters, cookies, placeholder text, and custom JavaScript rules.

## Trigger Attributes

Use these data attributes on any HTML element in your theme to control the widget:

| Attribute | Description |
|---|---|
| `data-xgeo-open` | Opens the widget when this element is clicked |
| `data-xgeo-close` | Closes the widget when this element is clicked |
| `data-xgeo-toggle` | Toggles the widget open/closed on click |

Example — add a "Change region" button anywhere on your site:

```html
<button data-xgeo-open>Change your region</button>
```

## Placeholder Text

Use these placeholders in the widget title or body text — they are replaced with the visitor's detected location:

| Placeholder | Replaced With | Example |
|---|---|---|
| `[[country]]` | Visitor's country name (localized) | `Canada`, `Kanada` |
| `[[country_eng]]` | Visitor's country name (English) | `Canada` |

### Hash Triggers

| Hash | Purpose |
|---|---|
| `#xgeo-open` | Opens the widget |
| `#xgeo-test` | Forces the widget to show for testing |
| `#xgeo-clear-user-data` | Clears all Custom Widget cookies and session storage |

## Cookies

| Cookie | Purpose | Duration |
|---|---|---|
| `xgeo-session` | Cached geolocation data (shared across all embeds) | 7 days |
| `xgeo-closed` | Tracks whether the visitor closed the widget | Cookie: 365 days / Session: until browser closes |
| `xgeo-off` | Dev mode — disables all redirects | 7 days |

## Query Parameters (All Embeds)

These query parameters work across all xapps embeds and are useful during development and testing:

| Parameter | Purpose |
|---|---|
| `?xgeo-sim=1` | Activates the Geo Simulator overlay — simulate visits from any country |
| `?xgeo-off` | Disables all xapps redirects for 7 days (sets a cookie) |
| `?xgeo-reset` | Re-enables redirects (removes the `xgeo-off` cookie) |
| `?xgeo-test` | Test mode — forces the widget to show |
| `?xgwr=1` | Prevents the widget from showing (loop prevention for widget redirects) |
| `?xgar=1` | Prevents auto-redirects from firing (loop prevention for auto-redirects) |

## Custom JavaScript Rules (Pro)

**Pro plan only.** Add custom JS logic to control widget and button behavior.

### How to Add Custom Code

1. Go to **xapps Dashboard → Custom Widget Redirects**
2. Scroll down to the **Advanced** section
3. Paste your custom JavaScript into the **Custom widget display rule** or **Custom button display rule** field
4. Click **Save**

### Widget Display Rule

Controls whether and when the widget opens. When this rule is set, the default auto-open logic is disabled — you must call `openModal()` yourself.

```javascript
function run(geolocation, openModal, hasBeenClosed, displayFrequency) {
  // geolocation = { country: "CA", country_name: "Canada", continent: "NA" }
  // openModal() — call to open the widget
  // hasBeenClosed() — returns "1" if previously closed, null otherwise
  // displayFrequency() — getter: returns "session", "everyload", or "cookie"
  // displayFrequency("cookie") — setter: changes frequency and migrates storage
}
```

**Sample: Show only for Canadian visitors who haven't closed:**

```javascript
function run(geolocation, openModal, hasBeenClosed, displayFrequency) {
  if (geolocation.country === "CA" && hasBeenClosed() !== "1") {
    openModal();
  }
}
```

**Sample: Show for all North American visitors with a 2-second delay:**

```javascript
function run(geolocation, openModal, hasBeenClosed, displayFrequency) {
  if (geolocation.continent === "NA" && hasBeenClosed() !== "1") {
    setTimeout(function() {
      openModal();
    }, 2000);
  }
}
```

**Sample: Show once using cookie-based frequency, overriding the dashboard setting:**

```javascript
function run(geolocation, openModal, hasBeenClosed, displayFrequency) {
  displayFrequency("cookie"); // switch to 7-day cookie tracking
  if (hasBeenClosed() !== "1") {
    openModal();
  }
}
```

**Sample: Only show on the homepage:**

```javascript
function run(geolocation, openModal, hasBeenClosed, displayFrequency) {
  if (window.location.pathname === "/" && hasBeenClosed() !== "1") {
    openModal();
  }
}
```

### Button Display Rule

Controls which redirect buttons are visible. The function is called once per button and should return `true` (show) or `false` (hide):

```javascript
function run(geolocation, redirectButton) {
  // geolocation = { country: "CA", country_name: "Canada", continent: "NA" }
  // redirectButton = { label: "Canada", url: "https://ca.store.com", ... }
  return true; // show by default
}
```

**Sample: Hide the button that matches the visitor's country:**

```javascript
function run(geolocation, redirectButton) {
  if (redirectButton.label === geolocation.country_name) {
    return false;
  }
  return true;
}
```

**Sample: Only show buttons for specific countries:**

```javascript
function run(geolocation, redirectButton) {
  var showFor = ["Canada", "United Kingdom", "Australia"];
  if (showFor.indexOf(redirectButton.label) !== -1) {
    return true;
  }
  return false;
}
```

## Related Docs

- [Custom Widget Redirects]({{ '/docs/custom-widget/' | relative_url }}) — setup and customization guide
- [Display Settings]({{ '/docs/display-settings/' | relative_url }}) — frequency, delay, and page targeting
- [Geo Targeting Rules]({{ '/docs/geo-targeting/' | relative_url }}) — location-based display rules
