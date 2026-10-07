# Source/output debug review — October 7, 2026

Reviewed the private website source and the sibling `Autofill` output in 30 focused rounds.
Browser checks used the actual output served at `http://127.0.0.1:8771`, with pinned CDN libraries.
Fixes were committed after their output review. Passing reviews without a new defect did not create empty commits.

| Round | Focus | Result |
| --- | --- | --- |
| 1 | Privacy output | Restored complete private policy; public sections rendered. |
| 2 | Linked fields | Synced verified private behavior; linked output updates and unrelated input preserves it. |
| 3 | OTP paste | Pasted fictional six-digit code; six cells filled and focus reached final cell. |
| 4 | OTP Backspace | Empty third cell moved focus to second cell. |
| 5 | Loader retry/readiness | Synced retryable loader; real output reached complete ready status. |
| 6 | Nested picker readiness | Synced nested readiness guard; all seven editor/framework targets existed at readiness. |
| 7 | Widget initialization/names | Reviewed six generated widgets and accessible control names; committed both sides. |
| 8 | Editor semantics | Quill/ProseMirror expose named multiline textbox roles; committed both sides. |
| 9 | Placeholder rule | Added missing Type/Signature and stable selector; reviewed visible output before commits. |
| 10 | Regression setup/password toggle | Private regressions pass; browser type and pressed state toggle together. |
| 11 | Exporter | Added explicit 36-file export and drift detection; reviewed generated output before commit. |
| 12 | Coverage guide | Corrected obsolete targets, iframe/editor descriptions, and unverified coverage claims against output. |
| 13 | React/Slate readiness | Replaced fixed delay with render commit signal; both targets visible at readiness. |
| 14 | Shared editors | Removed duplicate implementation; main has seven targets and standalone React has matching rule. |
| 15 | Standalone async options | Selected delayed Taipei option; corrected remaining Tagify textarea claim. |
| 16 | Standalone pickers | Ready status and date input accepted fictional ISO date. |
| 17 | Quill standalone | Ready, named textbox, and fictional text accepted. |
| 18 | ProseMirror standalone | Ready, named textbox, and fictional text accepted. |
| 19 | Lexical standalone | Ready, named textbox, and fictional text accepted. |
| 20 | Draft.js standalone | Ready, named textbox, and fictional text accepted. |
| 21 | Slate standalone | Ready, named textbox, and fictional text accepted. |
| 22 | TinyMCE standalone | Ready inline textbox and fictional text accepted. |
| 23 | CKEditor fixture | Ready native textbox fixture and fictional text accepted. |
| 24 | Unknown editor kind | Falls back to a visible initialized Quill editor. |
| 25 | Named variables form | Enter preserved page and data; Clear fields reset it. |
| 26 | Actions/dynamic insertion | Repeated insert creates one field; click counts, local link, and tab panel agree. |
| 27 | Frames/shadow root | Regular iframe, srcdoc iframe, and open-shadow input accept fictional values. |
| 28 | Native selections | Single/multiple options, radio mask 010, checkbox mask 101, date, disabled/read-only states pass. |
| 29 | Mobile layout | 390 px viewport: no page overflow or control extending beyond viewport; screenshot reviewed. |
| 30 | Desktop/final parity | 1280 px viewport: no page overflow and seven editor/framework targets; suites pass and output has zero drift. |

Final automated verification: private source 34/34 tests, public output 32/32 tests.
Exporter comparison: all 36 managed public files match. Both worktrees are clean after commits.

The output was reviewed locally, not deployed to GitHub Pages. Browser editor checks verified visible
text and accessibility semantics; these rounds did not verify extension replay, closed-shadow filling,
or editor model synchronization through the extension. Historical extension scripts remain separately scoped.

React commit timing follows the [official createRoot documentation](https://react.dev/reference/react-dom/client/createRoot).
