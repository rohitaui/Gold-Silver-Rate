# Gold & Silver Rate — Chrome Extension

Gold & Silver Rate is a compact Chrome extension for checking India-wide daily benchmark values for gold and silver.

## Features
- Gold: 24K, 22K and 18K, displayed per 10 grams.
- Silver: 1kg, 10g and 1g reference values.
- India-wide benchmark rates; no location picker.
- Manual refresh from the popup.
- Last-successful response cached locally.
- Optional estimated 3% GST-inclusive display.
- Remembers the last selected metal tab.

## Install
1. Download and extract the repository ZIP or packaged build.
2. Open `chrome://extensions` in Chrome.
3. Enable Developer mode.
4. Click **Load unpacked**.
5. Select this folder, the one containing `manifest.json`.

## Data feeds
- Gold: https://snapdata.dev/api/v1/gold/in/latest.json
- Silver: https://snapdata.dev/api/v1/silver/in/latest.json

The feeds are daily benchmark snapshots, not live intraday quotes or city-specific retail prices.

## Price calculations
- Gold per 10g = per-gram observation × 10.
- Silver per gram = per-kilogram observation ÷ 1,000.
- Silver per 10g = per-gram value × 10.
- The optional GST-inclusive view multiplies the metal value by 1.03. Making charges and other invoice components are excluded.

## Permissions
- `storage`: settings, selected tab and cached rate response.
- `alarms`: daily background refresh attempt.
- Host access to `https://snapdata.dev/*`: fetch published rate feeds.

## Attribution
The feed is published through Snapdata and identifies IBJA benchmark observations. Review the provider's current [documentation and terms](https://snapdata.dev/docs/).

For installation, privacy, troubleshooting and full project details, see the [repository README](../README.md).
