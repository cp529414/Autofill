import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { execFileSync } from 'node:child_process';
import { JSDOM } from 'jsdom';
const root = resolve(import.meta.dirname, '..');
const read = path => readFileSync(resolve(root, path), 'utf8');
const pages = readdirSync(root).filter(p => p.endsWith('.html')).concat(readdirSync(resolve(root, 'practice')).filter(p => p.endsWith('.html')).map(p => `practice/${p}`));
const documents = pages.map(path => [path, new JSDOM(read(path)).window.document]);
function fixture() {
  const dom = new JSDOM(read('practice.html'), { url: 'https://example.test/Autofill/practice.html', runScripts: 'outside-only' });
  dom.window.eval(read('practice/sample-form.js'));
  return dom;
}
function input(dom, id, value, options = {}) {
  const field = dom.window.document.getElementById(id);
  field.value = value;
  field.dispatchEvent(new dom.window.InputEvent('input', { bubbles: true, inputType: 'insertText', ...options }));
  return field;
}
function round(number, name, fn) { test(`${String(number).padStart(2, '0')} ${name}`, fn); }
round(1, 'privacy page includes every policy section', () => {
  const doc = documents.find(([p]) => p === 'privacy.html')[1];
  for (const line of read('PRIVACY.md').split('\n').filter(l => /^##? /.test(l))) assert.ok(doc.body.textContent.includes(line.replace(/^##? /, '')));
});
round(2, 'local resource links resolve', () => {
  for (const [path, doc] of documents) for (const node of doc.querySelectorAll('[href], [src], source[srcset]')) {
    const reference = node.getAttribute('href') ?? node.getAttribute('src') ?? node.getAttribute('srcset');
    const url = new URL(reference, `https://example.test/${path}`);
    if (url.origin !== 'https://example.test') continue;
    let target = decodeURIComponent(url.pathname).slice(1);
    if (!target || target.endsWith('/')) target += 'index.html';
    assert.doesNotThrow(() => read(target), `${path}: ${reference}`);
  }
});
round(3, 'internal fragment links resolve', () => {
  for (const [path, doc] of documents) for (const link of doc.querySelectorAll('a[href]')) {
    const url = new URL(link.getAttribute('href'), `https://example.test/${path}`);
    if (url.origin !== 'https://example.test' || !url.hash) continue;
    let target = url.pathname.slice(1); if (!target || target.endsWith('/')) target += 'index.html';
    const destination = documents.find(([p]) => p === target)?.[1];
    assert.ok(destination?.getElementById(decodeURIComponent(url.hash.slice(1))), `${path}: ${link.getAttribute('href')}`);
  }
});
round(4, 'page IDs are unique', () => {
  for (const [path, doc] of documents) { const ids = [...doc.querySelectorAll('[id]')].map(n => n.id); assert.equal(new Set(ids).size, ids.length, path); }
});
round(5, 'explicit labels resolve', () => {
  for (const [path, doc] of documents) for (const label of doc.querySelectorAll('label[for]')) assert.ok(doc.getElementById(label.htmlFor), `${path}: ${label.htmlFor}`);
});
round(6, 'documents declare their language', () => { for (const [path, doc] of documents) assert.equal(doc.documentElement.lang, 'en', path); });
round(7, 'documents have meaningful titles', () => { for (const [path, doc] of documents) assert.ok(doc.title.includes('Autofill'), path); });
round(8, 'documents declare a mobile viewport', () => { for (const [path, doc] of documents) assert.match(doc.querySelector('meta[name=viewport]')?.content ?? '', /width=device-width/, path); });
round(9, 'CSS imports resolve', () => {
  for (const path of ['styles.css', 'theme.css', 'practice/practice.css', 'practice/sample-layout.css', 'practice/frame-field.css']) {
    for (const match of read(path).matchAll(/url\(["']?([^"'\s)]+)["']?\)/g)) {
      if (/^(data:|https?:)/.test(match[1])) continue;
      assert.doesNotThrow(() => read(resolve(dirname(resolve(root, path)), match[1])));
    }
  }
});
round(10, 'all JavaScript parses', () => {
  for (const path of ['practice.js', ...readdirSync(resolve(root, 'practice')).filter(p => p.endsWith('.js')).map(p => `practice/${p}`)]) execFileSync(process.execPath, ['--check', resolve(root, path)]);
});
round(11, 'downloaded backup targets a real practice control', () => {
  const backup = JSON.parse(read('practice/rules-example.json'));
  assert.equal(backup.format, 'autofill'); assert.equal(backup.version, 1);
  const doc = documents.find(([p]) => p === 'practice.html')[1];
  for (const rule of backup.rules) assert.ok(doc.querySelector(rule.signature));
});
round(12, 'linked output initializes empty', () => { const dom = fixture(); assert.equal(dom.window.document.querySelector('#linked-output').textContent, 'Empty'); dom.window.close(); });
round(13, 'visible input synchronizes its hidden field', () => { const dom = fixture(); input(dom, 'linked-visible', 'Taipei'); assert.equal(dom.window.document.querySelector('#linked-value').value, 'Taipei'); dom.window.close(); });
round(14, 'unrelated input preserves directly filled hidden values', () => { const dom = fixture(); dom.window.document.querySelector('#linked-value').value = 'Filled by extension'; input(dom, 'sample-text', 'Other input'); assert.equal(dom.window.document.querySelector('#linked-value').value, 'Filled by extension'); dom.window.close(); });
round(15, 'direct hidden-field events update the output', () => { const dom = fixture(); input(dom, 'linked-value', 'Direct fill'); assert.equal(dom.window.document.querySelector('#linked-output').textContent, 'Direct fill'); dom.window.close(); });
round(16, 'form reset refreshes linked output', async () => { const dom = fixture(); input(dom, 'linked-visible', 'Reset me'); dom.window.document.querySelector('form').reset(); await Promise.resolve(); assert.equal(dom.window.document.querySelector('#linked-output').textContent, 'Empty'); dom.window.close(); });
round(17, 'OTP insertion advances focus', () => { const dom = fixture(); input(dom, 'otp-1', '1'); assert.equal(dom.window.document.activeElement.id, 'otp-2'); dom.window.close(); });
round(18, 'OTP deletion keeps focus', () => { const dom = fixture(); const field = dom.window.document.querySelector('#otp-2'); field.focus(); input(dom, 'otp-2', '', { inputType: 'deleteContentBackward' }); assert.equal(dom.window.document.activeElement.id, 'otp-2'); dom.window.close(); });
round(19, 'OTP composition keeps focus', () => { const dom = fixture(); dom.window.document.querySelector('#otp-1').focus(); input(dom, 'otp-1', '1', { isComposing: true }); assert.equal(dom.window.document.activeElement.id, 'otp-1'); dom.window.close(); });
round(20, 'OTP paste distributes all six digits', () => {
  const dom = fixture(); const field = dom.window.document.querySelector('#otp-1');
  const event = new dom.window.Event('paste', { bubbles: true, cancelable: true });
  Object.defineProperty(event, 'clipboardData', { value: { getData: () => '012345' } }); field.dispatchEvent(event);
  assert.equal([...dom.window.document.querySelectorAll('#otp input')].map(n => n.value).join(''), '012345'); assert.ok(event.defaultPrevented); dom.window.close();
});
round(21, 'OTP backspace from an empty cell returns to previous cell', () => {
  const dom = fixture(); const field = dom.window.document.querySelector('#otp-3'); field.focus(); field.dispatchEvent(new dom.window.KeyboardEvent('keydown', { key: 'Backspace', bubbles: true })); assert.equal(dom.window.document.activeElement.id, 'otp-2'); dom.window.close();
});
round(22, 'practice submission never navigates', () => { const dom = fixture(); const event = new dom.window.Event('submit', { bubbles: true, cancelable: true }); dom.window.document.querySelector('form').dispatchEvent(event); assert.ok(event.defaultPrevented); dom.window.close(); });
round(23, 'dynamic insertion is idempotent', () => { const dom = fixture(); const button = dom.window.document.querySelector('#insert-field'); button.click(); button.click(); assert.equal(dom.window.document.querySelectorAll('#late-field').length, 1); assert.equal(dom.window.document.querySelector('#dynamic-target label').htmlFor, 'late-field'); dom.window.close(); });
round(24, 'demo selection matches panel visibility', () => { const dom = fixture(); const button = dom.window.document.querySelector('#role-tab'); for (let i = 0; i < 2; i++) { button.click(); assert.equal(dom.window.document.querySelector('#role-tab-panel').hidden, button.getAttribute('aria-selected') !== 'true'); } dom.window.close(); });
round(25, 'demo links prevent navigation and count clicks', () => { const dom = fixture(); const link = dom.window.document.querySelector('a[data-demo-click]'); const event = new dom.window.MouseEvent('click', { bubbles: true, cancelable: true }); link.dispatchEvent(event); assert.ok(event.defaultPrevented); assert.match(dom.window.document.querySelector('#click-output').textContent, /1 demo action/); dom.window.close(); });
round(26, 'password toggle keeps type and accessible state synchronized', () => {
  const dom = fixture(); dom.window.eval(read('practice/sample-controls.js')); const button = dom.window.document.querySelector('#toggle-password');
  for (const show of [true, false]) { button.click(); assert.equal(dom.window.document.querySelector('#password').type, show ? 'text' : 'password'); assert.equal(button.getAttribute('aria-pressed'), String(show)); assert.equal(button.getAttribute('aria-label'), `${show ? 'Hide' : 'Show'} fictional password`); } dom.window.close();
});
async function loaderFixture(run) {
  const dom = new JSDOM('<p id="load-status"></p>');
  const previous = { document: globalThis.document, window: globalThis.window };
  globalThis.document = dom.window.document; globalThis.window = dom.window;
  try { const loader = await import(`data:text/javascript;base64,${Buffer.from(read('practice/library-loader.js').replaceAll('import.meta.url', "'https://example.test/practice/library-loader.js'") + `\n// ${Math.random()}`).toString('base64')}`); await run(loader, dom); }
  finally { globalThis.document = previous.document; globalThis.window = previous.window; dom.window.close(); }
}
round(27, 'concurrent script requests share one load', () => loaderFixture(async ({ loadScript }, dom) => { const a = loadScript('https://example.test/library.js'); const b = loadScript('https://example.test/library.js'); assert.equal(a, b); assert.equal(dom.window.document.querySelectorAll('script').length, 1); dom.window.document.querySelector('script').onload(); await a; }));
round(28, 'failed scripts can be retried', () => loaderFixture(async ({ loadScript }, dom) => { const first = loadScript('https://example.test/library.js'); dom.window.document.querySelector('script').onerror(); await assert.rejects(first); const retry = loadScript('https://example.test/library.js'); assert.notEqual(first, retry); const script = dom.window.document.querySelector('script'); script.onload(); await retry; }));
round(29, 'readiness is published without a status element', () => loaderFixture(async ({ initializeDemos }, dom) => { assert.equal(await initializeDemos([['Demo', async () => {}]], null), true); assert.equal(dom.window.practiceReady, true); assert.equal(await initializeDemos([['Demo', async () => { throw Error('offline'); }]], null), false); assert.equal(dom.window.practiceReady, false); }));
round(30, 'partial library failure names unavailable demos and preserves successes', () => loaderFixture(async ({ initializeDemos }, dom) => { const status = dom.window.document.querySelector('#load-status'); assert.equal(await initializeDemos([['Native', async () => {}], ['Remote', async () => { throw Error('offline'); }]], status), false); assert.match(status.textContent, /Native ready/); assert.match(status.textContent, /Could not load Remote/); assert.equal(status.hidden, false); assert.equal(await initializeDemos([['Native', async () => {}]], status), true); assert.equal(status.hidden, true); await initializeDemos([['Nested', async () => { throw Error('offline'); }]], null, { publishReadiness: false }); assert.equal(dom.window.practiceReady, true); }));

round(31, 'widgets initialize on both main and standalone pages', async () => {
  const previous = { document: globalThis.document, window: globalThis.window };
  try {
    for (const path of ['practice.html', 'practice/widgets.html']) {
      const dom = new JSDOM(read(path));
      globalThis.document = dom.window.document; globalThis.window = dom.window;
      dom.window.jQuery = selector => {
        assert.ok(dom.window.document.querySelector(selector), selector);
        return { selectpicker() {}, select2() {}, chosen() {} };
      };
      dom.window.Tagify = class { constructor(target) { assert.ok(target); } };
      dom.window.TomSelect = class { constructor(selector) { assert.ok(dom.window.document.querySelector(selector), `${path}: ${selector}`); } };
      const source = read('practice/widgets.js').replace(/^import .*;$/m, `const loadStyle = () => {}; const loadScript = async () => {}; const initializeDemos = async demos => { await Promise.all(demos.map(([, initialize]) => initialize())); return true; };`).replace("if (document.body.classList.contains('demo-page')) void initializeDemos([['Widgets', initializeWidgets]]);", '');
      const module = await import(`data:text/javascript;base64,${Buffer.from(source + `\n// ${path}`).toString('base64')}`);
      await module.initializeWidgets(); dom.window.close();
    }
  } finally { globalThis.document = previous.document; globalThis.window = previous.window; }
});
