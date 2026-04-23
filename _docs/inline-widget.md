---
title: Inline Widget
category: Custom Redirects
order: 5
layout: docs
---

The Inline Widget embeds a country selector `<select>` dropdown directly in your theme layout — no popup overlay is shown. Visitors select their destination from the dropdown and are redirected immediately.

It shares the same redirect list as [Custom Widget Redirects]({{ '/docs/custom-widget/' | relative_url }}), so any redirect buttons you've already set up appear as options in the inline dropdown.

## Adding to Your Theme

The inline widget is added as an app block in the Shopify theme editor:

1. Go to **Online Store → Themes → Customize**
2. Navigate to the section or template where you want the dropdown to appear
3. Click **Add block** and select **Geolocation Flow — Inline Dropdown**
4. Save the theme

The dropdown renders inline wherever you place the block — typically in the header, footer, or a dedicated section.

## Customize Page

Go to **Geolocation Flow Dashboard → Custom Widget Redirects → Customize inline dropdown** to configure the appearance.

![Customize inline dropdown panel showing default selection, label, style, font, and CSS code editor settings]({{ '/assets/docs/custom-widget-redirects-inline.png' | relative_url }})

### Default Selection (Pro)

**Pro plan only.** Controls what the dropdown shows before the visitor makes a selection:

- **Placeholder** (default) — shows placeholder text (e.g., "Select your region")
- **First option** — pre-selects the first redirect button in the list

### Placeholder Text (Pro)

**Pro plan only.** Set a custom placeholder label. Add per-language translations so the placeholder displays in the visitor's language.

### Templates (Pro)

**Pro plan only.** Pick from 6 built-in templates that control the overall dropdown style:

| Template | Description |
|---|---|
| Default | Fully customizable via dashboard style settings |
| Modern | Clean, elevated styling |
| Minimal | Stripped-back, text-only look |
| Rounded | Soft corners and subtle shadows |
| Glass | Frosted glass effect |
| Dark | Dark background with light text |

Templates other than Default use fixed styles. To modify them, use the custom CSS editor.

### Font

Choose the font for the dropdown label:

- **Inherit site fonts** — uses your theme's default font
- Or select a specific font: Arial, Georgia, Verdana, and others

### Custom CSS (Pro)

**Pro plan only.** Add custom CSS for full design control over the inline dropdown.

## Plan Gating

| Feature | Free | Pro |
|---|---|---|
| Inline dropdown (up to 1 redirect option) | ✓ | ✓ |
| Default selection control | — | ✓ |
| Placeholder text & translations | — | ✓ |
| Templates | — | ✓ |
| Custom CSS | — | ✓ |

## Related Docs

- [Custom Widget Redirects]({{ '/docs/custom-widget/' | relative_url }}) — manages the redirect list used by the inline widget
- [Geo Targeting Rules]({{ '/docs/geo-targeting/' | relative_url }}) — control which visitors see the inline widget
- [Display Settings]({{ '/docs/display-settings/' | relative_url }}) — page-specific visibility settings
- [Inline Widget]({{ '/docs/dev-inline-widget/' | relative_url }}) — cookies, query parameters, and custom JS rules
