# Changelog

## [1.4.0] — 2026-11-21
- Reworked the bottom price-mode footer to prevent the GST controls and source note from feeling cramped.
- Reduced excess vertical spacing in the chart and rate cards to preserve a clean single-view layout.
- Fixed the popup to a single 560px view with internal scrolling disabled.


## [1.3.9] — 2026-11-21
- Adopted the supplied gold-and-silver emblem as the official extension logo.
- Added the transparent logo asset and configured Manifest V3 icons for 16px, 32px, 48px and 128px display slots.
- Updated repository branding, extension documentation and package version.


## [1.3.7] — 2026-11-21
- Synced repository documentation, install instructions and release links with the published Chrome and Edge packages.
- Increased spacing between the header, metal tabs, history chart, rate cards and GST controls.
- Improved internal card padding and chart control spacing for a less cramped visual hierarchy.
- Kept the popup constrained to a single view with no internal scrolling, using compact adjustments only where needed.


## [1.3.6] — 2026-11-21
- Corrected history loading to use the documented series selectors with fallback requests.
- Week and Month views are filtered from the available 30-day historical response; Year uses the provider's available yearly response and falls back to available 30-day coverage.
- Improved validation and diagnostics for empty or unexpected API responses.
- Rebalanced popup spacing, card padding and chart proportions while keeping the full interface within one view.


## [1.3.5] — 2026-11-21
- Removed the RATE DATE label and boxed date panel from the popup header.
- Moved Refresh directly below the date as a highlighted text action, freeing horizontal space.


## [1.3.4] — 2026-11-21
- Replaced the Gold tab icon with the supplied transparent PNG artwork.
- Removed the opaque black square background while preserving the original gold illustration.


## [1.3.3] — 2026-11-21
- Reworked popup dimensions and spacing to fit the complete interface in one view without scrolling.
- Reduced chart height and compacted header, tabs, price cards and GST controls.
- Tightened chart loading and failure states and improved diagnostic logging for history-feed errors.


## [1.3.2] — 2026-11-21
- Added a historical price chart above the rate cards.
- Added Week (7 days), Month (30 days) and Year (12 months) range controls for gold and silver.
- Added chart value summary, percentage movement, date labels and INR axis labels.
- Plots directly observed trading-session observations only; missing and carried-forward rows are excluded.
- Refined the popup hierarchy, spacing, chart card and responsive layout to match the approved visual direction.


Notable project changes are recorded here.

## [1.2.8] — 2026-11-21
- Renamed the extension to **Gold & Silver Rate**.
- Retained the compact popup layout and rounded visual treatment.
- Retained India-wide gold and silver benchmark feeds.
- Added repository documentation and automated ZIP packaging workflow.
- Added the original gold and silver tab artwork to the repository.

## Earlier versions
Earlier release notes have not been reconstructed. Unverified historical changes are intentionally not listed.
