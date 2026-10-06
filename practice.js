"use strict";
const form = document.querySelector('#practice-form');
// These are ordinary demo components; no extension code runs on this website.
for (const host of document.querySelectorAll('practice-shadow')) {
  const root = host.attachShadow({ mode: host.hasAttribute('closed') ? 'closed' : 'open' });
  const style = document.createElement('style');
  style.textContent = 'input{box-sizing:border-box;width:100%;height:36px;padding:6px 10px;border:1px solid #829079;border-radius:6px;font:16px system-ui;color:#18291e}input:focus-visible{outline:3px solid #507c31;outline-offset:4px}';
  const input = document.createElement('input');
  input.name = 'shadow-input';
  input.setAttribute('aria-label', host.hasAttribute('closed') ? 'Closed shadow-root input' : 'Open shadow-root input');
  root.append(style, input);
}
const srcdoc = document.querySelector('#srcdoc-frame');
srcdoc.srcdoc = '<!doctype html><html lang="en"><head><meta charset="utf-8"><style>body{display:flex;align-items:center;gap:10px;font:14px system-ui;padding:10px;color:#18291e}input{box-sizing:border-box;flex:1;width:0;min-width:0;height:36px;font:inherit;padding:6px 10px}</style></head><body><label for="srcdoc-name">Srcdoc iframe input</label><input id="srcdoc-name" name="srcdoc-name"></body></html>';
const updateHidden = () => {
  document.querySelector('#hidden-output').textContent = document.querySelector('#hidden-value').value || 'Empty';
  document.querySelector('#linked-output').textContent = document.querySelector('#linked-value').value || 'Empty';
};
form.addEventListener('input', updateHidden);
form.addEventListener('change', updateHidden);
const otpInputs = [...document.querySelectorAll('#otp input')];
for (const [index, input] of otpInputs.entries()) {
  input.addEventListener('input', event => {
    if (event.isComposing || !event.inputType?.startsWith('insert') || !input.value) return;
    otpInputs[index + 1]?.focus();
  });
}
form.addEventListener('submit', event => event.preventDefault());
document.querySelector('#toggle-password').addEventListener('click', event => {
  const input = document.querySelector('#password');
  const show = input.type === 'password';
  input.type = show ? 'text' : 'password';
  event.currentTarget.setAttribute('aria-pressed', String(show));
  event.currentTarget.textContent = show ? 'Hide' : 'Show';
});
document.querySelector('#insert-field').addEventListener('click', () => {
  const container = document.querySelector('#dynamic-target');
  if (container.childElementCount) return;
  const label = document.createElement('label');
  label.htmlFor = 'late-field';
  label.textContent = 'Dynamically inserted input';
  const input = document.createElement('input');
  Object.assign(input, { id: 'late-field', name: 'late-field', className: 'late-field' });
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
