---
title: Frequently Asked Questions
category: FAQ
order: 6
layout: sc-docs
---

## Does the app work with all Shopify themes?

Yes. The app uses a theme app embed and standard Shopify section IDs, so it works with any Online Store 2.0 theme. For older themes (not OS 2.0), the visual section picker may have limited support — you can enter a CSS selector directly in the section field instead.

## Why isn't my rule taking effect?

Check the following:

1. The **Section Conditions + app embed** is enabled in your live theme under **Theme editor → App embeds**
2. The rule is toggled **on** in the dashboard
3. The section ID matches — use the visual picker to avoid typos
4. If using scheduling, confirm the current date falls within the active window

## Can I target blocks inside a section, not just the section itself?

Yes. Use the picker's **Any element** mode, or type a CSS selector directly into the section field (e.g. `.my-section .promo-block`), to target a specific block instead of the whole section.

## Do rules run on every page load?

Yes. Rules are evaluated client-side each time a page loads. Cart conditions additionally re-evaluate automatically when the cart changes without requiring a reload.

## Will the app affect my store's SEO?

Sections hidden by the app stay in the page's HTML but are hidden via CSS (`display: none`), not removed from the page. For SEO-critical content, hiding it conditionally may still affect how it's counted for indexing — Googlebot does not always weight CSS-hidden content the same as visible content. If the content matters for SEO, consider server-side Liquid alternatives.

## How many rules can I have on the free plan?

The free plan supports **1 active rule**. See [Plans Comparison]({{ '/sc-docs/plans/' | relative_url }}) for the full feature breakdown.

