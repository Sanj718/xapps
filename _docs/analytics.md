---
title: Analytics
category: Configuration
order: 13
layout: docs
---

Geolocation Flow does not have a built-in analytics dashboard. To track redirect activity, use UTM parameters or Google Analytics events.

## UTM Parameters

Add UTM source, medium, and campaign values in your redirect settings. These are appended to redirect URLs so every redirect click appears in your analytics tool (Google Analytics, Plausible, etc.) as a tracked campaign event.

See [UTM & Tracking]({{ '/docs/utm-tracking/' | relative_url }}) for setup instructions.

## Google Analytics Events

Configure a GA event name in your widget or auto redirect settings (default: `geo_redirect_click`). Every redirect click fires this event in your GA4 property.

## Related Docs

- [UTM & Tracking]({{ '/docs/utm-tracking/' | relative_url }}) — send redirect events to Google Analytics
- [Custom Widget Redirects]({{ '/docs/custom-widget/' | relative_url }}) — configure widget redirects
- [Custom Auto Redirects]({{ '/docs/custom-auto/' | relative_url }}) — configure auto redirects
