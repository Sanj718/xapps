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
