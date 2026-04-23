# Design: Add Missing Features to xapps-site

**Date:** 2026-04-22  
**Scope:** xapps-site (Jekyll) — homepage + docs  
**Approach:** C — primary 4-card grid unchanged; compact "Also included" row + 4 new docs pages

---

## Background

The app (xapps-geo) has 6 distinct storefront widget/redirect types plus two supporting tools. The site currently features only 4 of them. Discovery via graphify graph:

| Feature | Source file | Site status |
|---|---|---|
| Custom Widget Redirects | `widget-redirects.ts` | ✅ homepage card + doc |
| Custom Auto Redirects | `auto-redirects.ts` | ✅ homepage card + doc |
| Markets Widget Redirects | `markets-widget-redirects.ts` | ✅ homepage card + doc |
| Markets Auto Redirects | `XGEOMARKETSAUTOREDIRECTS` | ✅ homepage card + doc |
| Inline Widget | `widget-redirects-block.ts` → `XGeoInlineWidget` | ❌ missing |
| Markets Inline Widget | `markets-widget-redirects-block.ts` → `XGeoMarketsInlineWidget` | ❌ missing |
| Geo Simulator | `geo-simulator.min.js` (Community 17) | ❌ missing (brief mention only) |
| Analytics | `analytics-tracker.ts` + `PerformanceSection.tsx` | ❌ missing |

---

## Homepage Change — `index.html`

### What changes

Add an "Also included" secondary row **inside** `<section class="features">`, directly after the closing `</div>` of `.features__grid`. The existing 4-card grid is untouched.

### New HTML block

```html
<div class="features__also">
  <p class="features__also-label">Also included</p>
  <div class="features__also-grid">
    <div class="features__also-item">
      <p class="features__also-title">Inline Widget</p>
      <p class="features__also-desc">Embed a country selector directly in your theme layout — no popup required. Customize templates, fonts, default selection, and placeholder text.</p>
    </div>
    <div class="features__also-item">
      <p class="features__also-title">Markets Inline Widget</p>
      <p class="features__also-desc">Same inline embed powered by Shopify Markets. Choose label formats combining country, language, and currency. Supports flag display and custom translations.</p>
    </div>
    <div class="features__also-item">
      <p class="features__also-title">Geo Simulator</p>
      <p class="features__also-desc">Test redirects by simulating visits from any country — no VPN needed. Append <code>?xgeo-sim=1</code> to any storefront URL to open the simulator panel.</p>
    </div>
    <div class="features__also-item">
      <p class="features__also-title">Analytics</p>
      <p class="features__also-desc">Track redirect performance from the dashboard. View widget and auto redirect counts across Custom and Markets features. Export reports by email.</p>
    </div>
  </div>
</div>
```

### New CSS — `css/style.css`

Appended after `.features__desc` block (~15 lines):

```css
.features__also {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(128, 128, 128, 0.2);
}

.features__also-label {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-muted);
  margin-bottom: 0.75rem;
  font-weight: 700;
}

.features__also-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

.features__also-item {
  background: rgba(128, 128, 128, 0.05);
  border: 1px solid rgba(128, 128, 128, 0.12);
  border-radius: 8px;
  padding: 0.75rem 1rem;
}

.features__also-title {
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.features__also-desc {
  font-size: 0.75rem;
  color: var(--color-muted);
  line-height: 1.45;
  margin: 0;
}

@media (max-width: 640px) {
  .features__also-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

---

## Docs Changes — `_docs/`

Four new markdown files. All use `layout: docs`.

### 1. `_docs/inline-widget.md`

- **Title:** Inline Widget  
- **Category:** Custom Redirects  
- **Order:** 3 (after `custom-widget.md` order 3 — shift custom-widget to 3, inline to 4, custom-auto to 5 — OR insert with fractional order if supported, else renumber)
- **Covers:**
  - What it is: a `<select>` dropdown embedded directly in the theme as an app block (no popup overlay)
  - Where to place it: via the theme editor app block
  - Config options in app:
    - Default selection: Placeholder vs First option (Pro)
    - Placeholder text + per-language translations (Pro)
    - Templates: Default, Modern, Minimal, Rounded, Glass, Dark (Pro)
    - Font family (inherit or custom)
    - Custom CSS code editor (Pro)
  - Uses the same redirect list as Custom Widget Redirects (shared data)
  - Pro gating: most customization options require Pro plan
  - Related: link to Custom Widget Redirects doc

### 2. `_docs/markets-inline-widget.md`

- **Title:** Markets Inline Widget  
- **Category:** Markets Redirects  
- **Order:** 6 (after `markets-widget.md`)
- **Covers:**
  - What it is: inline `<select>` embed powered by Shopify Markets (country/language/currency)
  - Where to place it: theme editor app block
  - Config options in app:
    - Label format: Country, Country (native language), Country + currency code, Language, Language (native), Country & Language, Country (native) & Language (native), Custom
    - Flag display: Flag + text or Flag only
    - Default selection: Placeholder vs First option
    - Placeholder text + shop-now button translations
    - Templates: Default, Modern, Minimal, Rounded, Glass, Dark
    - Font family
    - Custom CSS (Pro)
  - Pro gating: most customization requires Pro plan
  - Related: link to Markets Widget Redirects doc

### 3. `_docs/analytics.md`

- **Title:** Analytics  
- **Category:** Configuration  
- **Order:** 10 (before `plans.md` at 10 — renumber plans to 11, faq to 12)
- **Covers:**
  - Where to find it: dashboard home page Performance section
  - What it tracks: redirect event counts (widget clicks + auto redirects) for both Custom and Markets features
  - Date ranges shown: rolling period per redirect type
  - Export: send a report to email via the in-app export button
  - Note: for click-level GA tracking, see UTM & Tracking doc (link)
  - Note: analytics data is stored per-install; cron job cleans old data automatically

### 4. `_docs/geo-simulator.md`

- **Title:** Geo Simulator  
- **Category:** Getting Started  
- **Order:** 3 (after `theme-embed.md` at order 2 — shift other Getting Started docs accordingly)
- **Covers:**
  - What it is: an overlay panel on the storefront that lets you simulate a visit from any country
  - Prerequisite: theme app embed must be enabled first
  - How to activate: append `?xgeo-sim=1` to any storefront URL
  - What the panel shows: country selector, continent selector, current detected geo
  - Actions: simulate a country, reset simulation, disable
  - Cookie/session behavior: simulation is stored in a cookie so it persists across page loads until reset
  - Use case: test geo redirects and widget display rules before going live — no VPN needed

---

## Spec Self-Review

- No TBDs or placeholders.
- CSS uses existing `var(--color-muted)` and `rgba` conventions matching the current stylesheet.
- Order numbering: inline-widget and markets-inline-widget will need existing doc orders renumbered slightly (noted in each doc spec above). Implementation plan should include an order-renumber step.
- Scope is focused: no changes to existing docs, no layout changes to header/footer/reviews/pricing.
- Analytics doc correctly scopes to in-app dashboard counts only (not GA integration, which is already covered by `utm-tracking.md`).
