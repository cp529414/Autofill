# Practice coverage

Open [Practice](practice.html), use fictional values, and save Autofill rules.
The Rule column shows Type and Signature, plus Modifier for explicit property
changes such as `placeholder`. Ordinary fill values are chosen by you. The
extension infers the field's value or editor text when Modifier is omitted.

The main page loads select widgets, date/color pickers, seven editors and framework
controls in its own document. Only the two dedicated frame examples use iframes.
Use the main Practice URL for main-page rules. Standalone demos use their own URLs.
The website provides controls; the installed extension performs the filling.

## Native examples on the main page

| Target | Type | Fictional value or action |
| --- | --- | --- |
| `#sample-text`, `#search`, `#password` | `text` | `Example text` |
| `#sample-multiline`, `#editable` | `text` | Plain text, with actual newlines if needed |
| `#quantity` | `text` | A number from 1 to 100 |
| `#start-date`, `#month`, `#week` | `text` | `2026-10-07`, `2026-10`, `2026-W41` |
| `#time`, `#datetime` | `text` | `14:30`, `2026-10-07T14:30` |
| `#color`, `#range` | `text` | `#4b702e`, `75` |
| `#country` | `text` | `Taipei` (visible option label) |
| `#interests` | `multiselect` | `["London","Berlin"]` (visible labels) |
| `input[name="contact_method"]` | `radioGroup` | `010` selects Manila |
| `input[name="topics"]` | `checkGroup` | `101` selects Cairo and Nairobi |
| `#otp` | `otpGroup` | `123456` |
| `#placeholder-target` | `text` | Set Modifier to `placeholder` |
| `#text-target` | `text` | Replace the paragraph text |
| `#linked-visible` | `text` | Updates the linked hidden value |
| `#readonly`, `#disabled-input` | `text` | Programmatic fill; manual editing is unavailable |
| `#late-field` | `text` | Appears after Add a delayed field |
| `#click-target`, `#click-link`, `summary`, `#role-tab` | `click` | Local action examples |

Group masks follow document order: `1` selects and `0` clears. OTP supports typing,
six-digit paste, and Backspace navigation. Click buttons have individual counters.

The main page does not contain email, telephone, URL, file, datalist, individual
checkbox/radio rules, custom picker popups, or a JavaScript-rule target. These
extension capabilities should not be inferred from this page's coverage.

## Shadow roots and frames

Use the signatures shown beside the open and closed shadow-root examples:
`practice-shadow[id="open-shadow"] >>> input[name="shadow-input"]` and the
corresponding closed-shadow signature. A closed root cannot be inspected through
ordinary page JavaScript; the extension supplies its own handling.

The regular frame uses [practice/frame.html](practice/frame.html) and `#frame-name`.
The srcdoc frame contains `#srcdoc-name` and uses the creator page's URL. Frame
selectors run in their own document, not in the main document.

## Library widgets and pickers

Bootstrap Select, Select2, Tom Select, Chosen, and Tagify load automatically.
Use `Taipei` for the select examples, `New example` for `#tom-input`, and
`[{"value":"HTML"},{"value":"CSS"}]` for `#tags`. The Rule column shows each
widget's corresponding type. The main page contains an input-backed Tagify demo.
The [standalone widgets page](practice/widgets.html) also includes Tagify on a
textarea and asynchronous Tom Select options at `#tom-remote`.

The remote-options demo supplies Taipei, London, and Tokyo after 200 ms locally;
it does not send entered values to a server. Tom Select input creation also has
a short delay.

Flatpickr, jQuery UI Datepicker, jscolor, and Coloris are real library demos.
Use `2026-10-07` for date widgets and `#4b702e` for color widgets. Human mode sets
complete picker values. The [standalone pickers page](practice/pickers.html)
contains the same library families.

## Editors and framework state

The main page includes Quill, ProseMirror, Lexical, Draft.js, Slate, inline TinyMCE,
and a React controlled input. They use the main document and show their actual
signatures. Standalone versions are available at
[practice/editor.html](practice/editor.html), with the `?kind=` selected by the
editor links. Include that query in a standalone page rule.

TinyMCE is an inline `div`, not an iframe body. The standalone CKEditor option is
a native contenteditable `div.cke_editable` fixture, not the CKEditor runtime.
The current page has no model-check button. Real editor models are exposed for
extension regression tests; visual text alone does not prove model synchronization.
Use plain text with actual newlines rather than HTML markup.

## Named variables and downloadable rules

Use [the variables form](practice/named-variables.html) with fictional values.
Define `name = Alex Example`, `email = alex@example.test`, and
`greeting = Hello {{var:name}}` in extension settings. Fill `#variable-name`,
`#variable-email`, and `#variable-greeting` with their corresponding `{{var:…}}`
templates. Save variables and rules, then reload.

The [guide](guide.html#json) provides JSON and CSV examples. Text rules overwrite
matched fields. Dynamic templates, literal escaping, site exclusions, and manual
execution are explained in the [guide](guide.html#dynamic-values); the main
Practice table does not contain dedicated dynamic-template rows.

## Dependencies and verification

Pinned third-party CDN resources are requested when library demos open. A failed
library is named in the loading status; native examples remain available. Reload
to retry. No practice values are submitted or persisted by the website. Capturing
fields with the extension can store them in extension storage. See
[privacy](PRIVACY.md).

Run `npm ci` and `npm test` in the website checkout for page structure, links,
form behavior, and loader checks. These checks do not load the extension. Recorder
and replay scripts in the private source's tests folder are historical and need
the setup and coverage review described in its test README before use.
