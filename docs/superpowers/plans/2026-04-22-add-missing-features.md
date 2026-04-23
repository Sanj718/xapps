# Add Missing Features to xapps-site — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add 2 missing features to the homepage "Also included" row and 4 new docs pages covering Inline Widget, Markets Inline Widget, Geo Simulator, and Analytics.

**Architecture:** Homepage `index.html` gets a new `features__also` block after the existing 4-card features grid. `css/style.css` gets ~30 lines of new CSS for the secondary row. Four new `_docs/*.md` files are created. Eleven existing docs have their `order` frontmatter bumped to make room for the new entries. No changes to layouts, includes, or JavaScript.

**Tech Stack:** Jekyll 4, Liquid templates, plain HTML/CSS, `bundle exec jekyll build` for validation.

---

## File Map

| Action | File | Change |
|---|---|---|
| Modify | `css/style.css` | Add `.features__also*` rules after `.features__desc` block (line ~954) |
| Modify | `index.html` | Add "Also included" HTML block inside `<section class="features">` after the features grid |
| Modify | `_docs/custom-widget.md` | order: 3 → 4 |
| Modify | `_docs/custom-auto.md` | order: 4 → 6 |
| Modify | `_docs/markets-widget.md` | order: 5 → 7 |
| Modify | `_docs/markets-auto.md` | order: 6 → 9 |
| Modify | `_docs/geo-targeting.md` | order: 7 → 10 |
| Modify | `_docs/display-settings.md` | order: 8 → 11 |
| Modify | `_docs/utm-tracking.md` | order: 9 → 12 |
| Modify | `_docs/plans.md` | order: 10 → 14 |
| Modify | `_docs/faq.md` | order: 11 → 15 |
| Modify | `_docs/dev-custom-widget.md` | order: 12 → 16 |
| Modify | `_docs/dev-custom-auto.md` | order: 13 → 17 |
| Modify | `_docs/dev-markets-widget.md` | order: 14 → 18 |
| Modify | `_docs/dev-markets-auto.md` | order: 15 → 19 |
| Create | `_docs/geo-simulator.md` | New — Getting Started, order: 3 |
| Create | `_docs/inline-widget.md` | New — Custom Redirects, order: 5 |
| Create | `_docs/markets-inline-widget.md` | New — Markets Redirects, order: 8 |
| Create | `_docs/analytics.md` | New — Configuration, order: 13 |

**Resulting doc order:**
1. getting-started (Getting Started)
2. theme-embed (Getting Started)
3. geo-simulator (Getting Started) ← NEW
4. custom-widget (Custom Redirects)
5. inline-widget (Custom Redirects) ← NEW
6. custom-auto (Custom Redirects)
7. markets-widget (Markets Redirects)
8. markets-inline-widget (Markets Redirects) ← NEW
9. markets-auto (Markets Redirects)
10. geo-targeting (Configuration)
11. display-settings (Configuration)
12. utm-tracking (Configuration)
13. analytics (Configuration) ← NEW
14. plans (Plans)
15. faq (FAQ)
16–19. dev docs (Developers)

---

## Task 1: Add CSS for "Also included" row

**Files:**
- Modify: `css/style.css` — after the `.features__desc` block (around line 954)

- [ ] **Step 1: Add CSS rules**

Open `css/style.css`. Find the `.features__desc` block (ends around line 954). Insert the following immediately after it, before the `/* Reviews */` comment:

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

- [ ] **Step 2: Verify the build passes**

```bash
cd /Users/sanjar/Documents/xapps/xapps-site && bundle exec jekyll build 2>&1 | tail -5
```

Expected: `done in X seconds.` with no errors.

- [ ] **Step 3: Commit**

```bash
cd /Users/sanjar/Documents/xapps/xapps-site && git add css/style.css && git commit -m "feat: add CSS for features also-included row"
```

---

## Task 2: Add "Also included" HTML to homepage

**Files:**
- Modify: `index.html` — inside `<section class="features">`, after the closing `</div>` of `.features__grid`

- [ ] **Step 1: Add HTML block**

In `index.html`, find this line (the closing `</div>` of `.features__grid`, just before `</section>`):

```html
    </div>
  </div>
</section>
```

Replace it with:

```html
    </div>

    <div class="features__also">
      <p class="features__also-label">Also included</p>
      <div class="features__also-grid">
        <div class="features__also-item">
          <p class="features__also-title">Inline Widget</p>
          <p class="features__also-desc">Embed a country selector directly in your theme layout — no popup required. Customize templates, fonts, default selection, and placeholder text.</p>
        </div>
        <div class="features__also-item">
          <p class="features__also-title">Markets Inline Widget</p>
          <p class="features__also-desc">Same inline embed powered by Shopify Markets. Choose label formats combining country, language, and currency. Supports flag display and translations.</p>
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
  </div>
</section>
```

- [ ] **Step 2: Verify the build passes**

```bash
cd /Users/sanjar/Documents/xapps/xapps-site && bundle exec jekyll build 2>&1 | tail -5
```

Expected: `done in X seconds.` with no errors.

- [ ] **Step 3: Commit**

```bash
cd /Users/sanjar/Documents/xapps/xapps-site && git add index.html && git commit -m "feat: add 'Also included' features row to homepage"
```

---

## Task 3: Renumber existing docs

**Files:**
- Modify: `_docs/custom-widget.md`, `_docs/custom-auto.md`, `_docs/markets-widget.md`, `_docs/markets-auto.md`, `_docs/geo-targeting.md`, `_docs/display-settings.md`, `_docs/utm-tracking.md`, `_docs/plans.md`, `_docs/faq.md`, `_docs/dev-custom-widget.md`, `_docs/dev-custom-auto.md`, `_docs/dev-markets-widget.md`, `_docs/dev-markets-auto.md`

- [ ] **Step 1: Update order numbers**

In each file, change the `order:` frontmatter line:

| File | Old | New |
|---|---|---|
| `_docs/custom-widget.md` | `order: 3` | `order: 4` |
| `_docs/custom-auto.md` | `order: 4` | `order: 6` |
| `_docs/markets-widget.md` | `order: 5` | `order: 7` |
| `_docs/markets-auto.md` | `order: 6` | `order: 9` |
| `_docs/geo-targeting.md` | `order: 7` | `order: 10` |
| `_docs/display-settings.md` | `order: 8` | `order: 11` |
| `_docs/utm-tracking.md` | `order: 9` | `order: 12` |
| `_docs/plans.md` | `order: 10` | `order: 14` |
| `_docs/faq.md` | `order: 11` | `order: 15` |
| `_docs/dev-custom-widget.md` | `order: 12` | `order: 16` |
| `_docs/dev-custom-auto.md` | `order: 13` | `order: 17` |
| `_docs/dev-markets-widget.md` | `order: 14` | `order: 18` |
| `_docs/dev-markets-auto.md` | `order: 15` | `order: 19` |

- [ ] **Step 2: Verify the build passes**

```bash
cd /Users/sanjar/Documents/xapps/xapps-site && bundle exec jekyll build 2>&1 | tail -5
```

Expected: `done in X seconds.` with no errors.

- [ ] **Step 3: Commit**

```bash
cd /Users/sanjar/Documents/xapps/xapps-site && git add _docs/ && git commit -m "chore: renumber docs order to make room for new pages"
```

---

## Task 4: Create `_docs/geo-simulator.md`

**Files:**
- Create: `_docs/geo-simulator.md`

- [ ] **Step 1: Create the file**

Create `_docs/geo-simulator.md` with this content:

```markdown
---
title: Geo Simulator
category: Getting Started
order: 3
layout: docs
---

The Geo Simulator lets you test your redirect setup by simulating visits from any country — no VPN or proxy required. It runs entirely in your browser via a cookie, so it persists across page loads until you reset it.

## Prerequisites

The theme app embed must be enabled before the simulator will work. See [Activating Theme Embed]({{ '/docs/theme-embed/' | relative_url }}) if you haven't done this yet.

## Activating the Simulator

Append `?xgeo-sim=1` to any storefront URL and load the page:

```
https://your-store.myshopify.com/?xgeo-sim=1
```

A simulator panel will appear on your storefront. You only need the query parameter on the first load — the panel stays open until you close or disable it.

## Using the Panel

The panel lets you:

- **Select a country** — choose any country from the dropdown to simulate a visit from that location
- **Select a continent** — simulate a visit from an entire continent region
- **View current geo** — see what country/continent the simulator is currently set to
- **Reset** — clear the simulation and return to your real detected location
- **Disable** — close the panel and stop the simulation

After selecting a country, reload the page to trigger your redirect rules as if you were visiting from that location.

## How It Works

The simulation is stored in a browser cookie. When active, the app reads the simulated country instead of making a real geolocation lookup. This means:

- The simulation persists across page navigations on the same store
- It only affects your browser session — real visitors are unaffected
- Closing the panel or clicking **Disable** removes the cookie and ends the simulation

## Use Cases

- Verify that widgets and auto-redirects fire correctly for a specific country before going live
- Test geo targeting rules (country/continent inclusion and exclusion)
- Check display settings — frequency, page targeting, delay — work as expected
- Confirm that Shopify Markets redirects land on the correct market URL

## Related Docs

- [Activating Theme Embed]({{ '/docs/theme-embed/' | relative_url }}) — required before the simulator works
- [Geo Targeting Rules]({{ '/docs/geo-targeting/' | relative_url }}) — configure which countries trigger your rules
- [Custom Widget Redirects]({{ '/docs/custom-widget/' | relative_url }}) — test widget display
- [Custom Auto Redirects]({{ '/docs/custom-auto/' | relative_url }}) — test silent redirects
```

- [ ] **Step 2: Verify the build passes**

```bash
cd /Users/sanjar/Documents/xapps/xapps-site && bundle exec jekyll build 2>&1 | tail -5
```

Expected: `done in X seconds.` with no errors. Also check: `ls _site/docs/geo-simulator/` should show `index.html`.

- [ ] **Step 3: Commit**

```bash
cd /Users/sanjar/Documents/xapps/xapps-site && git add _docs/geo-simulator.md && git commit -m "docs: add Geo Simulator page"
```

---

## Task 5: Create `_docs/inline-widget.md`

**Files:**
- Create: `_docs/inline-widget.md`

- [ ] **Step 1: Create the file**

Create `_docs/inline-widget.md` with this content:

```markdown
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
```

- [ ] **Step 2: Verify the build passes**

```bash
cd /Users/sanjar/Documents/xapps/xapps-site && bundle exec jekyll build 2>&1 | tail -5
```

Expected: `done in X seconds.` with no errors. Also check: `ls _site/docs/inline-widget/` should show `index.html`.

- [ ] **Step 3: Commit**

```bash
cd /Users/sanjar/Documents/xapps/xapps-site && git add _docs/inline-widget.md && git commit -m "docs: add Inline Widget page"
```

---

## Task 6: Create `_docs/markets-inline-widget.md`

**Files:**
- Create: `_docs/markets-inline-widget.md`

- [ ] **Step 1: Create the file**

Create `_docs/markets-inline-widget.md` with this content:

```markdown
---
title: Markets Inline Widget
category: Markets Redirects
order: 8
layout: docs
---

The Markets Inline Widget embeds a Shopify Markets-powered `<select>` dropdown directly in your theme layout. Visitors select their market (country, language, and/or currency) from the dropdown and are redirected to the correct Shopify Market URL.

Like the [Markets Widget Redirects]({{ '/docs/markets-widget/' | relative_url }}) popup, this widget syncs with your Shopify Markets configuration. Click **Sync** in the dashboard to pull the latest market data.

## Adding to Your Theme

The markets inline widget is added as an app block in the Shopify theme editor:

1. Go to **Online Store → Themes → Customize**
2. Navigate to the section or template where you want the dropdown to appear
3. Click **Add block** and select **Geolocation Flow — Markets Inline Dropdown**
4. Save the theme

## Customize Page

Go to **Geolocation Flow Dashboard → Markets Widget Redirects → Customize inline dropdown** to configure the appearance.

### Label Format (Pro)

**Pro plan only.** Controls what each market option displays as in the dropdown. Choose from:

| Format | Example |
|---|---|
| Country | United States |
| Country (native language) | États-Unis |
| Country + currency code | United States (USD) |
| Language | English |
| Language (native) | Español |
| Country & Language | United States — English |
| Country (native) & Language (native) | États-Unis — Français |
| Custom | (set your own pattern) |

### Flag Display (Pro)

**Pro plan only.** Show a country flag next to each option:

- **Flag + text** — flag icon alongside the label
- **Flag only** — flag icon with no text

### Default Selection (Pro)

**Pro plan only.** Controls the initial dropdown state before the visitor selects:

- **Placeholder** (default) — shows placeholder text
- **First option** — pre-selects the first market in the list

### Placeholder Text & Translations (Pro)

**Pro plan only.** Set a custom placeholder label. Add a **Shop Now** button label translation for when the visitor confirms their market selection.

### Templates (Pro)

**Pro plan only.** Pick from 6 built-in templates:

| Template | Description |
|---|---|
| Default | Fully customizable via dashboard style settings |
| Modern | Clean, elevated styling |
| Minimal | Stripped-back, text-only look |
| Rounded | Soft corners and subtle shadows |
| Glass | Frosted glass effect |
| Dark | Dark background with light text |

### Font

Choose the font for the dropdown label:

- **Inherit site fonts** — uses your theme's default font
- Or select a specific font: Arial, Georgia, Verdana, and others

### Custom CSS (Pro)

**Pro plan only.** Add custom CSS for full design control.

## Plan Gating

| Feature | Free | Pro |
|---|---|---|
| Markets inline dropdown (basic) | ✓ | ✓ |
| Label format | — | ✓ |
| Flag display | — | ✓ |
| Default selection | — | ✓ |
| Placeholder & translations | — | ✓ |
| Templates | — | ✓ |
| Custom CSS | — | ✓ |

## Related Docs

- [Markets Widget Redirects]({{ '/docs/markets-widget/' | relative_url }}) — popup version powered by Shopify Markets
- [Geo Targeting Rules]({{ '/docs/geo-targeting/' | relative_url }}) — control which visitors see the inline widget
```

- [ ] **Step 2: Verify the build passes**

```bash
cd /Users/sanjar/Documents/xapps/xapps-site && bundle exec jekyll build 2>&1 | tail -5
```

Expected: `done in X seconds.` with no errors. Also check: `ls _site/docs/markets-inline-widget/` should show `index.html`.

- [ ] **Step 3: Commit**

```bash
cd /Users/sanjar/Documents/xapps/xapps-site && git add _docs/markets-inline-widget.md && git commit -m "docs: add Markets Inline Widget page"
```

---

## Task 7: Create `_docs/analytics.md`

**Files:**
- Create: `_docs/analytics.md`

- [ ] **Step 1: Create the file**

Create `_docs/analytics.md` with this content:

```markdown
---
title: Analytics
category: Configuration
order: 13
layout: docs
---

The Analytics section on the dashboard home page shows how many redirects have been triggered across all your redirect types. Use it to see which redirect configurations are getting the most traffic.

## Where to Find It

From the **Geolocation Flow Dashboard** home page, scroll to the **Performance** section. Two charts are shown side by side — one for Custom redirects and one for Markets redirects.

## What's Tracked

Each chart shows:

| Metric | Description |
|---|---|
| **Total redirects** | Combined widget + auto redirect events for the period |
| **Widget redirects** | Redirect events triggered by a popup or inline widget click |
| **Auto redirects** | Silent redirect events where the visitor was redirected automatically |
| **Date range** | The rolling period covered by the data |

Both the Custom redirects chart and the Markets redirects chart follow the same format, so you can compare performance across redirect types at a glance.

## Exporting Data

To export a performance report by email:

1. Click the **Export** button in the Performance section
2. Enter your email address
3. The report is sent to your inbox

## Important Notes

- Analytics data is stored per-install and automatically cleaned up over time by a background process.
- This section tracks redirect *events* — the number of times a redirect fired. It does not show visitor demographics or conversion data.
- For click-level tracking integrated with Google Analytics (UTM parameters, custom GA events), see [UTM & Tracking]({{ '/docs/utm-tracking/' | relative_url }}).

## Related Docs

- [UTM & Tracking]({{ '/docs/utm-tracking/' | relative_url }}) — send redirect events to Google Analytics
- [Custom Widget Redirects]({{ '/docs/custom-widget/' | relative_url }}) — configure widget redirects
- [Custom Auto Redirects]({{ '/docs/custom-auto/' | relative_url }}) — configure auto redirects
```

- [ ] **Step 2: Verify the build passes**

```bash
cd /Users/sanjar/Documents/xapps/xapps-site && bundle exec jekyll build 2>&1 | tail -5
```

Expected: `done in X seconds.` with no errors. Also check: `ls _site/docs/analytics/` should show `index.html`.

- [ ] **Step 3: Commit**

```bash
cd /Users/sanjar/Documents/xapps/xapps-site && git add _docs/analytics.md && git commit -m "docs: add Analytics page"
```

---

## Self-Review

**Spec coverage:**
- ✅ Homepage "Also included" row: Tasks 1–2
- ✅ Inline Widget doc: Task 5
- ✅ Markets Inline Widget doc: Task 6
- ✅ Geo Simulator doc: Task 4
- ✅ Analytics doc: Task 7
- ✅ Doc order renumbering: Task 3

**Placeholder scan:** No TBDs, TODOs, or vague steps — every task contains the exact file content or code change needed.

**Type consistency:** No shared types/functions across tasks — each task is purely a file write or frontmatter edit.

**Scope check:** All 7 tasks are independent and can be verified with `jekyll build` after each one. No hidden dependencies between tasks.
