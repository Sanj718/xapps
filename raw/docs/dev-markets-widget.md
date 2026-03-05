
Technical reference for the Markets Widget redirect and its integration with Shopify Markets.

## Overview

The Markets Widget works similarly to the Custom Widget but targets Shopify Markets instead of arbitrary URLs. It reads the store's market configuration to suggest the correct localized experience.

## Events

```js
document.addEventListener('xapps:markets-widget:show', function (e) {
  console.log('Market suggestion:', e.detail.market);
  // e.detail.market = { name, domain, currency, language }
});

document.addEventListener('xapps:markets-widget:accept', function (e) {
  console.log('Switching to market:', e.detail.market.name);
});

document.addEventListener('xapps:markets-widget:dismiss', function (e) {
  console.log('User stayed in current market');
});
```

## Programmatic Control

```js
// Force show the market suggestion widget
window.xappsGeo.marketsWidget.show();

// Hide it
window.xappsGeo.marketsWidget.hide();

// Get the suggested market for the current visitor
window.xappsGeo.marketsWidget.getSuggestedMarket();
// → { name: "Europe", domain: "eu.example.com", currency: "EUR", language: "en" }
```

## Shopify Markets Data

The widget reads market data from Shopify's `Shopify.market` object. Ensure your Markets configuration is published for the widget to detect available markets.

## CSS Overrides

Same custom properties as the Custom Widget:

```css
xapps-widget {
  --xapps-bg: #fff;
  --xapps-text: #1a1a1a;
  --xapps-btn: #000;
  --xapps-btn-text: #fff;
  --xapps-radius: 8px;
}
```
