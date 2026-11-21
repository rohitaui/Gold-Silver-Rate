<!--
  Gold & Silver Rate
  A clean, India-wide daily benchmark tracker for Chrome.
-->

<div align="center">

# Gold &amp; Silver Rate

### India’s daily gold &amp; silver benchmark rates, at a glance.

A lightweight Chrome extension for checking India-wide gold and silver reference prices without opening multiple websites.

<br/>

[![Manifest V3](https://img.shields.io/badge/Chrome-Manifest%20V3-4285F4?style=for-the-badge&logo=googlechrome&logoColor=white)](https://developer.chrome.com/docs/extensions/develop/migrate/what-is-mv3)
[![Version](https://img.shields.io/badge/version-1.2.8-2563EB?style=for-the-badge)](./gold-silver-rate/manifest.json)
[![Build](https://img.shields.io/badge/build-GitHub%20Actions-16A34A?style=for-the-badge&logo=githubactions&logoColor=white)](./.github/workflows/package.yml)
[![Data](https://img.shields.io/badge/data-India%20benchmark-D97706?style=for-the-badge)](https://snapdata.dev/docs/)

<br/>

**[Explore the source](./gold-silver-rate/) · [Report a bug](../../issues) · [Request a feature](../../issues)**

</div>

---

## At a glance

| | |
|---|---|
| **Platform** | Google Chrome · Manifest V3 |
| **Market** | India-wide benchmark rates |
| **Metals** | Gold and silver |
| **Gold purity** | 24K · 22K · 18K |
| **Default units** | Gold per 10g · Silver per 10g |
| **Currency** | Indian Rupee (₹ / INR) |
| **Data feed** | Snapdata · IBJA benchmark feed |
| **Storage** | Chrome local storage |
| **Current version** | 1.2.8 |

## Why Gold & Silver Rate?

Gold and silver prices are checked often, but finding a quick, consistent reference can mean switching between tabs, websites and local rate pages. Gold & Silver Rate keeps the key benchmark values in one compact browser popup.

- **Quick glance:** open the Chrome toolbar popup to see the latest available rates.
- **Two metals, one place:** switch between gold and silver.
- **Useful gold purities:** compare 24K, 22K and 18K values.
- **Practical silver units:** view 1kg, 10g and 1g reference prices.
- **GST display choice:** switch between the source benchmark and an estimated GST-inclusive view.
- **Simple refresh:** request the latest available daily snapshot whenever you need it.
- **Last-known values:** cached rates remain available if a refresh cannot complete.

## What you can see

### Gold

| Purity | Description | Display |
|---|---|---|
| **24K** | 99.9% purity | INR per 10 grams |
| **22K** | 91.6% purity | INR per 10 grams |
| **18K** | 75.0% purity | INR per 10 grams |

### Silver

| Unit | Display |
|---|---|
| **1 kilogram** | INR per kg |
| **10 grams** | INR per 10g |
| **1 gram** | INR per gram |

The popup opens on the Gold tab by default and remembers the last selected metal.

## Understanding the displayed price

Gold & Silver Rate presents a **benchmark reference**, not a guaranteed retail or jewellery-shop quote.

- **Without GST:** displays the benchmark value returned by the data feed.
- **With GST:** applies an estimated **3%** addition to the displayed metal value.
- **Not included:** making charges, wastage, stone charges, jeweller premiums, discounts, delivery charges or other invoice-specific items.

The GST-inclusive option is a convenience estimate for comparison. It is not a tax invoice or a substitute for a jeweller's final bill. Actual invoice treatment can vary by product and transaction.

## Data source and freshness

Rates are retrieved from Snapdata's India gold and silver daily JSON feeds:

| Metal | Endpoint |
|---|---|
| Gold | [snapdata.dev/api/v1/gold/in/latest.json](https://snapdata.dev/api/v1/gold/in/latest.json) |
| Silver | [snapdata.dev/api/v1/silver/in/latest.json](https://snapdata.dev/api/v1/silver/in/latest.json) |

The feed is described as an **IBJA benchmark** source. The extension reads the observation date and values supplied by the feed and shows the available rate date in the popup.

**Important:** these are daily benchmark snapshots, not live tick-by-tick market prices. They are not city-specific rates and may differ from prices quoted by local jewellers. Availability and publication timing depend on the upstream data provider.

Please review [Snapdata documentation and source terms](https://snapdata.dev/docs/) for current details about the feed and attribution.

## Install in Chrome

This project is currently distributed as an unpacked Chrome extension. Chrome's Developer mode is required for manual installation.

1. Download the project ZIP from the repository using **Code → Download ZIP**, or download the packaged ZIP from the [Actions artifacts](../../actions/workflows/package.yml).
2. Extract the downloaded archive.
3. Open `chrome://extensions` in Google Chrome.
4. Turn on **Developer mode**.
5. Select **Load unpacked**.
6. Choose the extracted **`gold-silver-rate`** folder (the folder containing `manifest.json`).

To update an existing unpacked install, replace its project files with the newer version and click **Reload** on the extension card.

> The GitHub Actions artifact is a temporary build download. A tagged, permanent GitHub Release will be added when release publishing is configured.

## How to use

1. Pin **Gold & Silver Rate** to the Chrome toolbar for quick access.
2. Click the extension icon.
3. Choose **Gold** or **Silver**.
4. Read the displayed benchmark values and rate date.
5. Use **Refresh** to request the latest available snapshot.
6. Switch between **With GST** and **Without GST** to compare the estimate.

Open the settings page using the gear icon to choose the default price display.

## Privacy

Gold & Silver Rate is designed as a small, local-first utility.

- No account or sign-in is required by the extension.
- The extension does not ask for your name, email address, phone number or location.
- The selected price display and cached rate data are stored using Chrome's local storage.
- Rate requests are sent to the Snapdata endpoints listed above.
- The extension does not include an analytics SDK or advertising integration in this source.

The upstream data provider receives the network request needed to return the rate feed. Review its own privacy and service terms for information about its handling of requests.

## Permissions explained

The extension requests only the following Chrome permissions:

| Permission | Why it is used |
|---|---|
| `storage` | Save the selected display mode, selected tab and last successfully retrieved rates locally. |
| `alarms` | Schedule a daily background refresh attempt. |

It also declares host access to `https://snapdata.dev/*` so the popup and background service worker can request the published rate feeds.

## Project structure

```text
Gold-Silver-Rate/
├── .github/
│   └── workflows/
│       └── package.yml           # Validate and package the extension
├── gold-silver-rate/
│   ├── assets/
│   │   ├── gold-tab.png          # Gold tab artwork
│   │   └── silver-tab.png        # Silver tab artwork
│   ├── background.js             # Daily refresh alarm and cache
│   ├── manifest.json             # Chrome Manifest V3 configuration
│   ├── options.html              # Settings page
│   ├── options.js                # Settings persistence
│   ├── popup.html                # Extension popup structure
│   ├── popup.js                  # Rate fetching and display logic
│   ├── styles.css                # Popup and settings styles
│   ├── README.md                 # Extension-specific notes
│   └── DESIGN_SYSTEM.md          # UI foundations and design decisions
├── CHANGELOG.md
├── CONTRIBUTING.md
├── PRIVACY.md
└── README.md
```

## Build and validate

The repository includes a GitHub Actions workflow that runs when files under `gold-silver-rate/` change, and can also be triggered manually.

The workflow:
1. Checks that `manifest.json` is valid JSON.
2. Runs Node syntax checks on the JavaScript files.
3. Packages the extension folder into a ZIP artifact.

To build locally:

```bash
cd gold-silver-rate
zip -r ../gold-silver-rate-v1.2.8.zip . -x "*.DS_Store"
```

The ZIP should contain the contents of the extension folder at its root, including `manifest.json`, popup files, settings files, styles and assets.

## Troubleshooting

<details>
<summary><strong>The extension does not appear after loading</strong></summary>

- Confirm Developer mode is enabled at `chrome://extensions`.
- Select the inner `gold-silver-rate` folder that contains `manifest.json`.
- Check the extension card for a manifest or permission error.
</details>

<details>
<summary><strong>Rates are not loading</strong></summary>

- Check your internet connection.
- Confirm Snapdata's endpoints are reachable.
- Click **Refresh** again after a short wait.
- If a previous snapshot exists, the popup may continue showing the last saved values.
</details>

<details>
<summary><strong>The displayed value differs from a jewellery shop</strong></summary>

That is expected. The extension shows an India-wide benchmark snapshot. Retail quotes can include local pricing differences, jeweller premiums, making charges, wastage, stones and other invoice components.
</details>

<details>
<summary><strong>Why is the rate date not today's date?</strong></summary>

The extension shows the observation date supplied by the upstream feed. It does not invent a current-day rate when a new benchmark snapshot has not yet been published.
</details>

## Roadmap

Potential next steps for the project:

- [ ] Publish a permanent tagged GitHub Release with the ZIP attached.
- [ ] Add Chrome Web Store listing assets and submit for review.
- [ ] Add automated checks for unexpected upstream data-shape changes.
- [ ] Add a small, clear source/freshness detail view.
- [ ] Add optional historical rate charts if a reliable historical source is available.

## Contributing

Bug reports, corrections and practical feature ideas are welcome. Read [CONTRIBUTING.md](./CONTRIBUTING.md) before opening an issue or pull request.

## Licence

No open-source licence has been applied to this repository yet. Unless a licence is added, the source remains subject to the project owner's rights; public visibility does not automatically grant permission to reuse or redistribute it.

---

<div align="center">

**Gold &amp; Silver Rate**

A simpler way to keep an eye on India's gold and silver benchmarks.

<sub>Built for quick reference. Always verify the final price with your seller.</sub>

</div>
