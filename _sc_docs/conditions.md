---
title: Conditions Reference
category: Conditions
order: 3
layout: sc-docs
---

Conditions are the criteria that determine whether a rule's action fires. Each rule can have one or more conditions combined with AND or OR logic.

Conditions marked **Pro** require the [Pro plan]({{ '/sc-docs/plans/' | relative_url }}).

## Markets

| Condition | Operators | Notes |
|---|---|---|
| **Country** | is in / is not in | Shopify storefront localisation — ISO country code (e.g. `US`, `GB`) |
| **Continent** | is in / is not in | NA, SA, EU, AS, AF, OC, AN |
| **Language** | is in / is not in | ISO language code (e.g. `en`, `fr`) |
| **Currency** | is in / is not in | ISO currency code (e.g. `USD`, `EUR`) |
| **Market** | is in / is not in | Shopify Markets handle |

## Geolocation *(Pro)*

| Condition | Operators | Notes |
|---|---|---|
| **Geo country** | is in / is not in | IP-based lookup — independent of the storefront's Country condition above |
| **Geo continent** | is in / is not in | IP-based lookup |

## Page / URL

| Condition | Operators | Notes |
|---|---|---|
| **Device** | is / is not | Mobile (<750px), Tablet (750–989px), Desktop (≥990px) |
| **Page type** *(Pro)* | is / is not | Home, Product, Collection, Cart, Blog, Article, Page, Search |
| **Page URL** *(Pro)* | contains / does not contain / starts with / ends with / equals / does not equal | Matches against the current path |
| **URL parameter** *(Pro)* | is present / is absent / equals / does not equal / contains / does not contain / starts with / ends with | Match by query string key and optional value |

## Customer

| Condition | Operators | Notes |
|---|---|---|
| **Customer logged in** | is true / is false | Matches login state |
| **Customer tag** *(Pro)* | has tag / does not have tag / equals / not equal to / contains / does not contain / starts with / ends with | Matches against the customer's tags |
| **B2B customer** *(Pro)* | is true / is false | Matches Shopify B2B customers |
| **Order count** *(Pro)* | at least / at most / equals / not equal to | Number of past orders |
| **Total spent** *(Pro)* | at least / at most / equals / not equal to | Lifetime spend in the shop's currency |

## Cart

| Condition | Operators | Notes |
|---|---|---|
| **Cart item count** | at least / at most / equals / not equal to | Number of items in cart |
| **Cart value** *(Pro)* | at least / at most / equals / not equal to | Set per currency your store sells in — no automatic conversion, so a $50 USD threshold only applies to USD carts. Currencies without a threshold configured never match. |
| **Product in cart** *(Pro)* | contains / does not contain | Match by specific product |

## Notes

- Cart conditions (`cart_value`, `cart_item_count`, `product_in_cart`) trigger a live `/cart.js` fetch and re-evaluate automatically when the cart changes, including after Ajax add-to-cart requests. Location, customer, and page conditions are evaluated once per page load and don't re-check without a reload — for example, a customer logging in mid-session won't retrigger a Customer logged in condition until the next navigation.
- Country, continent, language, currency, and market are provided by Shopify's storefront localisation — no IP lookup is performed for these. Geo country and Geo continent are the IP-based equivalents, and are evaluated separately.
