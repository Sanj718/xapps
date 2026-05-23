---
title: Geo Content Popup
category: Geo Content Popup
order: 6.5
layout: docs
---

## Overview

The Geo Content Popup lets you display targeted announcements, promotions, or custom messages to visitors based on their country or continent. It renders either as a centered modal popup or a sticky top bar, and can be shown once per browser session, every page load, or once every 7 days.

Common use cases:
- Welcome messages for visitors from specific countries
- Regional promotions or discount codes
- Shipping or return policy announcements for certain markets
- Language-specific notices (with per-locale translations)

---

## Content Variants

Content variants let you define different content for different geographic audiences. Each variant has its own title, text, buttons, and (for popup type) image, and is shown only to visitors whose location matches the variant's targeting rules.

### Adding a Variant

In the **Geo Content Popup** page of the app, click **Add** in the "Content by country" section. A form opens where you can set:

- **Title** — headline text for the popup
- **Text** — rich text body (supports bold, italic, links, lists)
- **Image** — optional image URL
- **Buttons** — up to 2 call-to-action buttons, each with a label and URL (or a "close modal" action)
- **Target countries / continents** — which locations trigger this variant
- **Condition** — show or hide for the selected locations, and whether the rule applies to visitors inside or outside the selection
- **Status** — active or draft

### Condition Logic

| Setting | Meaning |
|---|---|
| Show · Inside | Show this variant to visitors **in** the selected countries |
| Show · Outside | Show this variant to visitors **outside** the selected countries |
| Hide · Inside | Hide the popup entirely for visitors **in** the selected countries |
| Hide · Outside | Hide the popup entirely for visitors **outside** the selected countries |

### Ordering

Drag variants by their handle to set priority. The first active variant whose condition matches the visitor's location is used.

---

## Default Content

Default content is shown when no active variant matches the visitor's location. It acts as a global fallback and supports the same title, text, buttons, and (for popup type) image fields as variants.

You can enable or disable default content using the toggle next to "Default content" in the customize panel. When disabled, the popup is hidden for visitors who don't match any variant.

---

## Customize

### Widget Type

Choose between **Popup** and **Top bar** — both types are available on all plans.

- **Popup** — centered modal overlay with a close button
- **Top bar** — full-width banner that appears at the top of the page

### Popup Position

For the popup type, choose where the popup appears on screen:

| Option | Position |
|---|---|
| Center | Middle of the viewport |
| Bottom right / center / left | Anchored to the bottom edge |
| Top right / center / left | Anchored to the top edge |
| Left center / Right center | Anchored to a side edge |

### Top Bar Options

- **Sticky to top** — keeps the bar fixed as the visitor scrolls (paid)
- **Content alignment** — how the title, text, and buttons are distributed: **Space between** (title on left, buttons on right) or **Center** (everything centered)
- **Text alignment** — left, center, or right
- **Inject into element** — optional CSS selector for an existing header element (e.g. `#header`, `.sticky-header`). Leave empty to inject at the top of `<body>` (paid)

### Popup Layout

- **Image position** — center, top, bottom, left, or right of the text (paid)
- **Focus point** — controls which part of the image stays visible when cropped: center, top, bottom, left, or right (paid)
- **Text alignment** — left, center, or right
- **Vertical align** — top, middle, or bottom within the popup panel (paid)

### Colors and Font

- **Background color** — popup/top bar background
- **Text color** — title and body text
- **Border color** — popup panel border
- **Button background color**
- **Button text color**
- **Font** — choose from a set of web-safe fonts (Arial, Georgia, Verdana, etc.) or inherit from the page

### Style Templates

Choose from six preset templates to quickly change the visual style:

- **Default** — standard layout with optional custom colors
- **Modern** — contemporary styling
- **Minimal** — stripped-back, clean appearance
- **Rounded** — softer edges and rounded corners
- **Glass** — frosted/translucent glass effect
- **Dark** — dark background with light text

Custom color overrides apply only when the **Default** template is selected.

### Custom CSS

The **Advanced** tab (CSS code editor) provides three controls, all paid-only:

- **Element custom ID** — adds a custom `id` attribute to the widget container so you can target it precisely in CSS
- **CSS code** — write your own CSS rules; a selector reference panel lists every class name in the widget hierarchy
- **Disable default styles** — unchecks the basic styles set in the Styles section, giving you full control over the appearance

The popup renders inside a Shadow DOM, so all CSS applies only to the popup and cannot affect the rest of your theme.

---

## Display Settings

Control when and how often the popup appears.

| Setting | Description |
|---|---|
| **Display frequency** | `Every browser session` — once per session; `Every 7 days (cookies)` — hidden for 7 days after close; `Every page load` — shown on every page load |
| **Display delay** | Seconds to wait before showing the popup after the page loads |
| **Page visibility** | Show or hide on specific page templates (home, product, collection, etc.) or custom URL paths |

---

## Multi-Language Support

Each variant's title, text, and button labels can be translated into the languages your Shopify store supports.

### How It Works

- In the variant or default content form, switch to a language tab and enter the translated content for that language.
- The popup renders in the visitor's active storefront language (set by Shopify's `localization.language.iso_code`).
- **Bleed-through rule**: if a locale has at least one translated field (title or text), only that locale's translated fields are shown — untranslated fields appear blank rather than falling back to the primary language. If a locale has no translations at all, the primary locale content is shown in full.

### Button Translations

Buttons can have per-locale labels and URLs. A button is shown for a locale only when that locale has a translated label for it. Primary-locale buttons always show their default label.

---

## Plan Restrictions

| Feature | Free | Paid |
|---|---|---|
| Widget type (popup / top bar) | ✓ | ✓ |
| Default content (title + text) | ✓ | ✓ |
| Image in default content (popup type only) | ✓ | ✓ |
| Default content enable / disable toggle | — | ✓ |
| Popup position control | — | ✓ |
| Sticky top bar | — | ✓ |
| Top bar inject into element | — | ✓ |
| Top bar content alignment | ✓ | ✓ |
| Text alignment | ✓ | ✓ |
| Image position control | — | ✓ |
| Image focus point | — | ✓ |
| Vertical align | — | ✓ |
| Buttons (up to 2 per popup) | — | ✓ |
| Content variants by country | — | ✓ |
| Custom colors | — | ✓ |
| Font selection | — | ✓ |
| Style templates (Modern, Minimal, Rounded, Glass, Dark) | — | ✓ |
| Custom CSS, element ID, disable default styles | — | ✓ |
| Multi-language translations | — | ✓ |
| Display settings (frequency, delay, pages) | — | ✓ |

---

## Related Docs

- [Geo Targeting](/docs/geo-targeting/) — how country detection works across all widgets
- [Display Settings](/docs/display-settings/) — detailed reference for frequency and page rules
- [Plans](/docs/plans/) — full feature comparison by plan
