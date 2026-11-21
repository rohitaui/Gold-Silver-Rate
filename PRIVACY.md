# Privacy

Gold & Silver Rate is a Chrome extension for viewing India-wide gold and silver benchmark rates.

## Stored locally
The extension uses Chrome local storage for:
- Selected price display mode.
- Last selected metal tab.
- Last successfully retrieved gold and silver response and local save timestamp.

## Network requests
The extension requests benchmark data from:
- https://snapdata.dev/api/v1/gold/in/latest.json
- https://snapdata.dev/api/v1/silver/in/latest.json

The upstream provider may receive normal request metadata when serving these endpoints. See [Snapdata documentation](https://snapdata.dev/docs/) for its current service and privacy terms.

## Information the extension does not request
The extension does not request a user's name, email address, phone number, account credentials or precise location. It has no sign-in flow.

## Permissions
- `storage`: preferences and cached rate data.
- `alarms`: a daily refresh attempt.
- `https://snapdata.dev/*`: retrieve the published rate feeds.

If analytics, crash reporting, accounts, additional third-party services or new permissions are added in a future version, this document must be updated before that version is distributed.
