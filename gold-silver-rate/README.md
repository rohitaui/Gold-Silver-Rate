# Gold & Silver Rate — India

## Install / update
1. Extract the ZIP.
2. Open `chrome://extensions`.
3. Enable Developer mode.
4. Click Load unpacked and select this project folder. For an existing install, replace the files in the same folder and click Reload.

## India-wide benchmark rates
Gold & Silver Rate fetches:
- `https://snapdata.dev/api/v1/gold/in/latest.json`
- `https://snapdata.dev/api/v1/silver/in/latest.json`

Snapdata's published feed does not require an API key or account. Rates are daily India-wide benchmarks, not city-specific jeweller prices.

## Display
- Gold 24K / 22K / 18K displayed by default in INR per 10 grams.
- Silver displayed by default in INR per 10 grams, with 1kg and 1g reference values.
- Without GST shows the source benchmark rate.
- With GST adds an estimated 3% to the metal rate. Making charges and other bill components are excluded.

## Attribution / licensing
Display attribution: `Source: Snapdata · IBJA benchmark`.
Snapdata's gold and silver rupee datasets carry IBJA attribution terms; do not imply they are CC BY 4.0 or local shop quotes. Follow Snapdata's source and licence requirements: https://snapdata.dev/docs/
