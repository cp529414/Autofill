# Practice coverage

Open the **Practice** page at `practice.html`, use fictional values, and save
one or more Autofill rules. The **Rule** column labels Type, Signature and
Modifier only for an explicit property override such as `placeholder`. The
extension infers `value` for native fields, `innerText` for editable text, and
the matching action for groups/widgets. Values are not displayed in the Rule column. Click
buttons show individual counters; expansion controls show their expanded state.
Textboxes start at one line in height, and choices stay inline where space
permits. Each table pairs **Practice** with **Rule**. All widget, picker, editor
and React demos load automatically in separate frames. The website provides
controls and local result checks; the installed extension performs the filling.

## All 14 rule types

| Rule type | Example target | Example value |
|---|---|---|
| `text` | `#full-name`, `#country`, `#editable` | `Alex Example`, `TW`, or multiline text |
| `checkbox` | `#newsletter` | `true` / `false` with modifier `checked` |
| `radio` | `#single-radio` | `true` with modifier `checked` |
| `radioGroup` | `input[name="contact_method"]` | `010` selects the second radio |
| `checkGroup` | `input[name="topics"]` | `101` selects the first and third boxes |
| `multiselect` | `#interests` | `["HTML","JavaScript"]` (visible option labels) |
| `otpGroup` | `#otp` | `123456` |
| `bootstrapSelect` | `#bootstrap` in `practice/widgets.html` | `Taipei` (visible label) |
| `select2` | `#select2` in `practice/widgets.html` | `Taipei` |
| `tomSelect` | `#tom-select`, `#tom-input` in `practice/widgets.html` | `Taipei` / `New example` |
| `chosen` | `#chosen` in `practice/widgets.html` | `Taipei` |
| `tagify` | `#tags`, `#tags-area` in `practice/widgets.html` | `[{"value":"HTML"},{"value":"CSS"}]` |
| `click` | `#click-target` | No fill value; triggers the local demo counter |
| `javascript` | No CSS selector needed | `document.querySelector('#script-output').textContent = 'Script rule ran locally.';` |

Named widget types use their matching modifier. Native inputs and single selects
use `text / value`; contenteditable examples use `text / innerText`. The main
page also includes `placeholder`, `textContent`, read-only values, hidden inputs,
and `data-hidden` synchronization examples.

## Native controls and actions

Text, search, URL, telephone, email, password, number, date, month, week, time,
datetime-local, color, range, hidden, checkbox, and radio inputs; textarea;
single and multiple selects; datalist; contenteditable; and native button,
submit, reset, image button, link, details, and summary actions are present.
Click examples also cover button/link/menuitem/tab/checkbox/radio/switch roles.
File selection must be manual; browsers do not permit filling file paths.
Disabled inputs demonstrate unavailable controls.

Use ID, class, name, and attribute selectors. `#open-shadow >>> input` and
`#closed-shadow >>> input` demonstrate shadow-root selectors. The delayed input
appears after selecting **Add a delayed field**. A regular iframe has its own
`practice/frame.html` URL; the `srcdoc` frame uses its creator page's URL.

## Library classes and picker detection

The select/tag demo initializes real Bootstrap Select, Select2, Tom Select,
Chosen, and Tagify widgets, including input-backed Tom Select with asynchronous
creation and Tagify on both input and textarea. Their generated classes include
`.selectpicker`, `.bootstrap-select`, `.select2-hidden-accessible`, `.select2`,
`.tomselected`, `.ts-wrapper`, `.chosen-container`, `.tagify`, and `.tagify__input`.

The picker demo initializes Flatpickr, jQuery UI Datepicker, jscolor, and Coloris.
It covers `.flatpickr-input`, `.hasDatepicker`, `.jscolor`, `[data-jscolor]`, and
`[data-coloris]`. Local picker popups cover `[data-provide="datepicker"]`,
`[data-provide="colorpicker"]`, `[aria-haspopup="dialog"]`, and
`[aria-haspopup="grid"]`. Human mode sets complete values for these pickers,
with no character-by-character keyboard entry.

## Editors and framework state

All editors load on the Practice page; standalone demos also remain available at
`practice/editor.html?kind=…`. Each page shows its actual
selector. The check button reads the editor's model to confirm changes reached
its state. Real demos cover Quill (`.ql-editor`), ProseMirror (`.ProseMirror`),
Lexical (`[data-lexical-editor]`), Draft.js (`.public-DraftEditor-content`), Slate
(`[data-slate-editor]`), TinyMCE (`body#tinymce` inside its iframe), and a React
controlled input (`#react-input`). The CKEditor option is an explicitly labeled
native contenteditable iframe with `body.cke_editable`; it tests that selector
without loading the discontinued CKEditor 4 runtime.

Use the demo's own URL, including its `?kind=` query. An iframe does not share
the outer page's selector scope. For widgets, `*/practice/widgets.html*` is a
useful site pattern. For rich-text values use actual newlines, not HTML markup.

Dynamic value examples include `{{today}}`, `{{random:6}}`, `{{uuid}}`, and
`{{clipboard}}`. Copy only fictional text for the clipboard example. Prefix an expression with a backslash, such as `\{{today}}` or `\{{clipboard}}`, to fill it literally. Two backslashes before an expression output one backslash and allow expansion. Ordinary backslashes remain unchanged. This follows Handlebars inline escaping; the full Handlebars language is not supported.

## Dependencies

The Practice page loads every library demo automatically and requests pinned CDN
resources on opening. Failures appear in the demo's status
message, while the native examples remain available. Native fields, picker formats, widget state, shadow roots, iframe filling, editor model updates, and click/script rules are verified with the extension loaded. The current checks include 125 recorder/layout checks and 125 generated-rule replay checks, including human-mode filling across all ten embedded demos. Browser-check instructions are maintained in the private extension repository at `tests/README.md`; they are not included in this published website snapshot. See [privacy](PRIVACY.md).

Library initialization follows the upstream examples:
[Bootstrap Select](https://developer.snapappointments.com/bootstrap-select/examples/),
[Select2](https://select2.org/getting-started/basic-usage/),
[Tom Select](https://tom-select.js.org/docs/),
[Tagify](https://github.com/yairEO/tagify),
[Quill](https://quilljs.com/docs/quickstart), and
[Flatpickr](https://flatpickr.js.org/examples/).

Import/export guidance and a downloadable full JSON example are in [the user guide](guide.html#json).

Dynamic templates are documented in the guide. See [syntax and resolution timing](guide.html#dynamic-values).

For one-shot filling, enable Manual execution and use the page context menu. See [manual execution](guide.html#manual-mode).

Text rules overwrite their matched fields. The downloadable JSON provides an ordinary text rule and example preferences.

## Named variables and remote options

Use [the variables form](practice/named-variables.html) with fictional
values. Define `name = Alex Example` and `email = alex@example.test` in Variables,
then fill `#variable-name` with `{{var:name}}` and `#variable-email` with
`{{var:email}}`. Define `greeting = Hello {{var:name}}` to test nested references
in `#variable-greeting`. Save the variables and rules, then reload.

Use the power button to deactivate a rule or variable, save, and reload. Inactive rules do not fill; references to inactive variables stop the affected rule. Wildcard exclusions override matching rules.

`#tom-remote` in the widgets frame starts without options. Its local asynchronous
loader provides Taipei, London, and Tokyo after 200 ms, simulating delayed remote
options without sending demo values to a server. Use a `tomSelect` rule with
value `Taipei`; both simple and human modes wait for the matching option.
