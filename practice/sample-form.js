"use strict";
const form = document.querySelector('#practice-form');
// These are ordinary demo components; no extension code runs on this website.
for (const host of document.querySelectorAll('practice-shadow')) {
  const root = host.attachShadow({ mode: host.hasAttribute('closed') ? 'closed' : 'open' });
  const style = document.createElement('style');
  style.textContent = 'input{box-sizing:border-box;width:100%;height:36px;padding:6px 10px;border:1px solid var(--control-border);border-radius:6px;font:16px system-ui;background:var(--surface);color:var(--text)}input:focus-visible{outline:3px solid var(--focus);outline-offset:4px}';
  const input = document.createElement('input');
  input.name = 'shadow-input';
  input.setAttribute('aria-label', host.hasAttribute('closed') ? 'Closed shadow root' : 'Open shadow root');
  root.append(style, input);
}
const srcdoc = document.querySelector('#srcdoc-frame');
srcdoc.srcdoc = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="color-scheme" content="light dark"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="${new URL('practice/frame-field.css', location.href).href}"></head><body><div class="frame-field"><label for="srcdoc-name">Srcdoc input</label><input id="srcdoc-name"></div></body></html>`;
const visibleLinked = document.querySelector('#linked-visible');
const hiddenLinked = document.querySelector('#linked-value');
const updateHidden = () => {
  document.querySelector('#linked-output').textContent = hiddenLinked.value || 'Empty';
};
const synchronizeLinked = event => {
  if (event.target === visibleLinked) hiddenLinked.value = visibleLinked.value;
  updateHidden();
};
form.addEventListener('input', synchronizeLinked);
form.addEventListener('change', synchronizeLinked);
// Reset values are restored after the reset event finishes dispatching.
form.addEventListener('reset', event => queueMicrotask(() => {
  if (event.defaultPrevented) return;
  hiddenLinked.value = visibleLinked.value;
  updateHidden();
}));
updateHidden();
const otpInputs = [...document.querySelectorAll('#otp input')];
for (const [index, input] of otpInputs.entries()) {
  input.addEventListener('paste', event => {
    const digits = event.clipboardData?.getData('text').trim();
    if (!digits || !/^[0-9]+$/.test(digits)) return;
    event.preventDefault();
    const targets = otpInputs.slice(index, index + digits.length);
    for (const [offset, target] of targets.entries()) {
      target.value = digits[offset];
      target.dispatchEvent(new Event('input', { bubbles: true }));
      target.dispatchEvent(new Event('change', { bubbles: true }));
    }
    otpInputs[Math.min(index + targets.length, otpInputs.length - 1)]?.focus();
  });
  input.addEventListener('keydown', event => {
    if (event.isComposing || event.key !== 'Backspace' || input.value || index === 0) return;
    event.preventDefault();
    otpInputs[index - 1].focus();
  });
  input.addEventListener('input', event => {
    if (event.isComposing || !event.inputType?.startsWith('insert') || !input.value) return;
    otpInputs[index + 1]?.focus();
  });
}
form.addEventListener('submit', event => event.preventDefault());
document.querySelector('#insert-field').addEventListener('click', () => {
  const container = document.querySelector('#dynamic-target');
  if (container.childElementCount) return;
  const label = document.createElement('label');
  label.htmlFor = 'late-field';
  label.textContent = 'Dynamically inserted input';
  const input = document.createElement('input');
  Object.assign(input, { id: 'late-field', className: 'late-field' });
  container.append(label, input);
});
let clicks = 0;
for (const button of document.querySelectorAll('[data-demo-click]')) {
  button.addEventListener('click', event => {
    if (button.tagName === 'A') event.preventDefault();
    clicks++;
    if (button.hasAttribute('aria-selected')) {
      const selected = button.getAttribute('aria-selected') !== 'true';
      button.setAttribute('aria-selected', String(selected));
      const panel = document.getElementById(button.getAttribute('aria-controls'));
      if (panel) panel.hidden = !selected;
    }
    document.querySelector('#click-output').textContent = `${clicks} demo action${clicks === 1 ? '' : 's'} triggered. Last: ${button.id}.`;
  });
}
