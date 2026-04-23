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

## Deactivating the Simulator

To deactivate before the cookie expires, use any of these methods:

- Click **Disable** in the simulator panel
- Append `?xgeo-sim=0` to any storefront URL

## How It Works

The simulation is stored in a browser cookie. When active, the app reads the simulated country instead of making a real geolocation lookup. This means:

- The simulation persists across page navigations on the same store and expires automatically after **24 hours**
- It only affects your browser session — real visitors are unaffected
- Clicking **Reset** clears the simulated country; clicking **Disable** ends the simulation entirely

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
