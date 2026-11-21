# Gold & Silver Rate — India

## Install
1. Download the latest ZIP from the repository's Releases page.
2. Extract the ZIP.
3. Open `chrome://extensions` in Chrome.
4. Enable Developer mode.
5. Click **Load unpacked** and select the extracted `gold-silver-rate` folder.

## Rates and source
The extension fetches daily India-wide benchmark data from:
- Gold: `https://snapdata.dev/api/v1/gold/in/latest.json`
- Silver: `https://snapdata.dev/api/v1/silver/in/latest.json`

The feed is a daily benchmark snapshot, not a live intraday quote or a city-specific jeweller price.

## Display
- Gold: 24K, 22K and 18K in INR per 10 grams.
- Silver: 1kg, 10g and 1g reference prices.
- GST display can be switched between benchmark price and an estimated 3% addition. Making charges and other invoice components are excluded.

## Attribution
Rates are sourced from Snapdata's IBJA benchmark feed. Follow the source and licensing terms published in the [Snapdata documentation](https://snapdata.dev/docs/).