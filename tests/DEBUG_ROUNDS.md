# Debug verification — October 7, 2026

Completed 30 consecutive verification rounds after fixing the initial failures.
Each round ran all 30 checks then available. A subsequent Chrome check found the
missing async Tom Select target on the main page; its fix adds a 31st regression check.

| Round | Checks passed | Duration |
| --- | --- | --- |
| 1 | 30/30 | 1.63 s |
| 2 | 30/30 | 1.58 s |
| 3 | 30/30 | 1.68 s |
| 4 | 30/30 | 1.63 s |
| 5 | 30/30 | 1.58 s |
| 6 | 30/30 | 1.59 s |
| 7 | 30/30 | 1.61 s |
| 8 | 30/30 | 1.61 s |
| 9 | 30/30 | 1.6 s |
| 10 | 30/30 | 1.6 s |
| 11 | 30/30 | 1.56 s |
| 12 | 30/30 | 1.6 s |
| 13 | 30/30 | 1.59 s |
| 14 | 30/30 | 1.91 s |
| 15 | 30/30 | 1.64 s |
| 16 | 30/30 | 1.64 s |
| 17 | 30/30 | 1.63 s |
| 18 | 30/30 | 1.58 s |
| 19 | 30/30 | 1.59 s |
| 20 | 30/30 | 1.6 s |
| 21 | 30/30 | 1.7 s |
| 22 | 30/30 | 1.57 s |
| 23 | 30/30 | 1.58 s |
| 24 | 30/30 | 1.57 s |
| 25 | 30/30 | 1.58 s |
| 26 | 30/30 | 1.58 s |
| 27 | 30/30 | 1.58 s |
| 28 | 30/30 | 1.58 s |
| 29 | 30/30 | 1.58 s |
| 30 | 30/30 | 1.59 s |

## Fixes committed

- Restored the empty privacy page from `PRIVACY.md`.
- Preserved direct hidden-field fills and refreshed output on form reset.
- Distributed pasted OTP digits and enabled Backspace navigation.
- Allowed failed library loads to retry and removed failed resource elements.
- Prevented nested demo initialization from publishing premature readiness.
- Skipped the absent async Tom Select target on the main practice page.

## Browser verification

Headless Chrome exercised linked fields, reset, OTP paste, and the privacy page.
The main practice page was checked at 390 px and 1280 px in light and dark modes.
No document-wide horizontal overflow or uncaught page errors were observed.
Third-party libraries were loaded over the network; availability can vary.

Extension behavior itself was not tested: this repository contains its website only.
