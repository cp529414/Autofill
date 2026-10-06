# Privacy Policy for Autofill

Effective and last updated: October 6, 2026

Autofill is a free Chrome extension maintained by the GitHub account cp529414. This policy covers extension version 1.0 and this project website.

## Information processed by the extension

Autofill stores rules and preferences locally in your Chrome profile using chrome.storage.local. Rules can include website URL patterns, field selectors, values you provide, delays, click actions, and custom JavaScript. Preferences include language, theme, fill mode, manual execution, site exclusions, recheck settings, and notification settings. Captured interactions and pending captured rules can include field values, selectors, and page addresses. Depending on what you save, these values may contain personal or sensitive information.

The extension reads page addresses and relevant page elements to match, capture, and run rules, including in frames. This is used for form automation, not for building an advertising profile or a browsing-history database. Clipboard text is read when a rule uses the {{clipboard}} value template. A clipboard value may be processed automatically when its matching rule runs, without another clipboard prompt.

## Local storage and transmission

The reviewed bundled extension code does not use developer-operated servers, analytics, advertising trackers, or Chrome storage synchronization. The maintainer does not receive your saved rules, clipboard contents, or filled values through the bundled extension. Local storage is not an encrypted password vault.

When a rule fills a field, the destination website can read the inserted value, including before you submit the form. Click actions may submit a form. Custom JavaScript you create or import can read page data, make network requests, or send information elsewhere. These user-configured actions are governed by the destination services and the code you choose to run. Inspect rules before importing them and use only scripts you trust. Exported JSON, CSV, and clipboard copies can contain your saved values; sharing those copies discloses them to their recipients.

## Why permissions are requested

- Storage: save rules, captured rules, and preferences locally.
- Context menus: provide rule capture and related actions from a page's right-click menu.
- Tabs: identify the active page and match rules to its address.
- Scripting: carry out configured actions and supported widget interactions on matching pages.
- Web navigation: coordinate automation as pages and frames navigate.
- User scripts: optionally run your configured scripts when ordinary script injection is blocked; Chrome's user-script setting must be enabled.
- Offscreen: monitor system appearance for the toolbar icon and provide the clipboard reader. Clipboard read: read clipboard text only for clipboard value templates.
- Access to all websites: find and fill matching controls on the websites you configure. This is broad access; Chrome's site-access controls can restrict it. File-page access additionally requires you to enable Allow access to file URLs.

## Use and sharing

Information is used to provide the extension's form automation features. The maintainer does not sell information, use it for advertising or creditworthiness, or share it with third parties through the bundled extension. Autofill's use of information received from Google APIs adheres to the Chrome Web Store User Data Policy, including its Limited Use requirements.

## Retention and your controls

Saved rules and preferences remain in your local Chrome profile until removed or overwritten. You can edit or delete rules in extension settings, export a backup, restrict site access in Chrome, and disable or uninstall the extension. Uninstalling removes the extension's local storage; exported files, clipboard copies, information already sent to websites, and browser or system backups must be managed separately. Remove clipboard templates to stop clipboard-based fills. Avoid storing passwords, payment details, or other highly sensitive values in rules.

## Website, practice form, and GitHub

The practice page keeps entered values in the page's memory and has no submission endpoint, analytics, cookies, or application storage. Check results validates fields locally. Reset clears the controls; closing or reloading the page discards page state, although your browser may restore fields or autofill them. Use fictional information. If you capture the form with the extension, the captured rules can persist in extension storage.

The Practice page automatically loads widget, picker, rich-text editor, and React demos, which request third-party library files from jsDelivr, cdnjs, esm.sh, or code.jquery.com. Those providers receive ordinary connection metadata, including your IP address and browser request information. Native controls remain usable if a library cannot load. The demo code does not submit or persist entered values; use fictional data when trying third-party widgets.

GitHub hosts this website and repository and may process connection information such as IP addresses and request metadata under its own privacy statement: https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement . GitHub also processes information you choose to post in issues. Do not include private rule values, passwords, or personal information in public reports.

## Changes and contact

Material changes to data practices will be reflected in this policy and the project's release notes before the changed practices take effect. The date above identifies the current policy. For privacy questions, contact the maintainer through https://github.com/cp529414/Autofill/issues . For a confidential question, request a private contact method without posting sensitive details publicly.
