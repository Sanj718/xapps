
Technical reference for integrating and customizing the Custom Widget redirect programmatically.

## Script Tag

The widget script is injected via the theme embed. Once active, it exposes a global `xappsGeo` object:

```js
window.xappsGeo.customWidget
```

## Events

Listen for widget lifecycle events:

```js
document.addEventListener('xapps:widget:show', function (e) {
  console.log('Widget shown', e.detail);
});

document.addEventListener('xapps:widget:dismiss', function (e) {
  console.log('Widget dismissed');
});

document.addEventListener('xapps:widget:redirect', function (e) {
  console.log('User accepted redirect', e.detail.url);
});
```

## Programmatic Control

```js
// Show the widget manually
window.xappsGeo.customWidget.show();

// Hide the widget
window.xappsGeo.customWidget.hide();

// Check if widget is currently visible
window.xappsGeo.customWidget.isVisible(); // true | false
```

## Data Attributes

Override widget behavior on specific elements:

| Attribute | Description |
|-----------|-------------|
| `data-xapps-ignore` | Skip redirect on this page |
| `data-xapps-country` | Override detected country |

## CSS Overrides

The widget renders inside a shadow DOM, but you can target the host element:

```css
xapps-widget {
  --xapps-bg: #fff;
  --xapps-text: #1a1a1a;
  --xapps-btn: #000;
  --xapps-btn-text: #fff;
  --xapps-radius: 8px;
}
```
