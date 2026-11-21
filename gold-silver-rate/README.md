# Gold & Silver Rate — Chrome Extension

Gold & Silver Rate is the Chrome extension package. It displays India-wide daily benchmark values for gold and silver using Snapdata's published IBJA benchmark feeds.

## Features
- Gold: 24K, 22K and 18K, displayed per 10 grams.
- Silver: 1kg, 10g and 1g reference values.
- India-wide benchmark rates; no location picker.
- Manual refresh from the popup.
- Last-successful response cached locally.
- With GST / Without GST display option. The inclusive option adds an estimated 3% to the benchmark metal value.
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

The feeds are daily benchmark snapshots, not live intraday quotes or city-specific retail prices. Values may differ from jeweller quotes.

## Price calculation
- Gold per 10g is derived from the feed's per-gram observation multiplied by 10.
- Silver per gram is derived from the feed's per-kilogram observation divided by 1,000.
- Silver per 10g is derived from the per-gram value multiplied by 10.
- The optional GST-inclusive display multiplies the metal value by 1.03. Making charges and other invoice components are not included.

## Permissions
- `storage`: settings, selected tab and cached rate response.
- `alarms`: daily background refresh attempt.
- Host access to `https://snapdata.dev/*`: fetch published rate feeds.

## Attribution
The data feed is published through Snapdata and identifies IBJA benchmark observations. Please review the provider's current [documentation and terms](https://snapdata.dev/docs/).

For full installation, privacy, troubleshooting and project information, see the [repository README](../README.md).
