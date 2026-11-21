# Contributing

Thanks for helping improve Gold & Silver Rate. Keep contributions focused, transparent and easy to review.

## Before opening an issue
- Search existing issues to avoid duplicates.
- Include the Chrome and extension versions where relevant.
- For rate discrepancies, include the observation date, unit and source you compared against.
- Do not post personal information or private data.

## Change guidelines
1. Keep the extension compatible with Chrome Manifest V3.
2. Do not present daily snapshots as live market prices.
3. Preserve data-source attribution and price caveats.
4. Avoid analytics, advertising and unnecessary permissions.
5. Keep the popup readable and accessible, with deliberate breathing room while preserving the complete single-view layout without internal scrolling.
6. Explain changes to permissions, data handling, calculations or attribution.

## Local checks

```bash
python -m json.tool gold-silver-rate/manifest.json
for file in gold-silver-rate/*.js; do node --check "$file"; done
```

## Pull requests
Please describe what changed, why it changed, which screens or files are affected, how it was tested, and whether the change affects permissions or data handling.
