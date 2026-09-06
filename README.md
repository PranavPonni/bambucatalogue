# Little Layers catalogue

A standalone, responsive webpage built from all 73 screenshots in `printables.zip`.

Open `index.html` directly in a browser, or run `npm start` and visit http://localhost:4173. No build or package installation is required. Upload `index.html`, `styles.css`, `app.js`, `products.js`, `specifications.csv`, and the `assets` directory together to any static website host.

The catalogue includes seven categories, search, sorting, a product detail dialog, creator credits, full reference images, and Japan/India phone and item-specific WhatsApp links. Prices are in Japanese yen. The proposed brand name “Little Layers” can be changed in `index.html`.

## Specification status — important

The source archive contains screenshots only. No screenshot supplies sliced filament weight or measured model dimensions. **None of the 73 weights or dimensions is verified.** All numeric weights are provisional planning ranges, and sizes are proposed W × D × H in centimetres, not measurements of the original models. The website states this both globally and per item.

Material estimates use the user-supplied spool price: ¥3,400 / 1,000 g = ¥3.40/g. These are filament values, **not final selling prices**. The website does not invent an approved retail markup. Supports, flushing, labour, hardware, delivery, and other costs need a final quote.

`specifications.csv` attaches the complete item-by-item record, including assumptions, material calculations, source-search links, and empty verified specification fields. `catalogue-data.json` preserves the editable structured data; the browser loads the same data from `products.js` so the webpage works without a server.

To finish specification verification, obtain each matching MakerWorld model/3MF, choose the intended size, printer, filament, infill, and colour profile in Bambu Studio, then slice and record the dimensions, model weight, and total filament including supports/flushing. The A1 mini has an 180 × 180 × 180 mm build volume; a proposed bounding box alone does not verify printability. Record the profile URL/settings with the result. Update `products.js`, the JSON, CSV, and the display/status text in `app.js` together when replacing provisional values.

## Research record

Online searches on 2026-09-06 used visible model names and creators. Searches did not provide verified weights/dimensions for these exact profiles. MakerWorld direct search and tested model pages returned access errors in the research tool. Do not treat a search link as a verified model match.

- Bambu Studio slicing settings and 3MF inputs: https://github.com/bambulab/BambuStudio/wiki/Command-Line-Usage
- A1 mini build volume: https://us.store.bambulab.com/products/a1-mini
- P030 Biting Shark Fidget: https://makerworld.com/en/models/1721287-biting-shark-fidget — title/creator matched through an indexed model mirror; original page could not be retrieved; no specifications verified.
- P070 Floating Dripping Candle Holder: https://makerworld.com/en/models/1842354-floating-dripping-candle-led-tealight-holder — exact link published by the creator at https://www.patreon.com/posts/floating-candle-140090011; no specifications verified.

Names and credits were transcribed from the supplied images. Simplified customer-facing names distinguish similar designs. Original screenshot headers remain accessible through “Full reference image.” PNG images were compressed to JPEG for the web; no generated replacement imagery was used. Reference photos may show sets/props; descriptions state the estimated unit for each multi-item photograph.

## Validation

- JavaScript syntax: `npm run check`.
- Browser checks in Chrome: 73 products; category counts; search, empty state and reset; price sorting; product dialog and Escape; item/phone values in WhatsApp links; no JavaScript errors; no page overflow at 390 px and 320 px; direct local-file loading.
- Desktop and mobile screenshot review.

This is a local website, not a publicly deployed URL. Font loading uses Google Fonts, with local serif/sans-serif fallbacks if offline.
