/** Shared compact rule details and local click counters for the sample pages. */
export function renderRule(type, signature, modifier) {
  const line = document.createElement('div');
  line.className = 'rule-line';
  line.dataset.ruleType = type;
  line.dataset.signature = signature;
  line.dataset.modifier = modifier;
  line.dataset.captureTarget = signature;
  const details = document.createElement('dl');
  details.className = 'rule-details';
  for (const [label, value] of [['Type', type], ['Signature', type === 'javascript' ? '' : signature], ['Modifier', type === 'text' && !['value', 'innerText', 'textContent'].includes(modifier) ? modifier : '']]) {
    if (!value) continue;
    const pair = document.createElement('div');
    const name = document.createElement('dt');
    name.textContent = label;
    const detail = document.createElement('dd');
    const code = document.createElement('code');
    code.textContent = value;
    code.title = value;
    detail.append(code);
    pair.append(name, detail);
    details.append(pair);
  }
  line.append(details);
  return line;
}
function addCounters() {
  for (const button of document.querySelectorAll('button, input[type="button"], input[type="submit"], input[type="reset"], input[type="image"], a[data-demo-click]')) {
    if (button.hasAttribute('data-expands') || button.closest('dialog') || button.closest('.click-control')) continue;
    const wrapper = document.createElement('span');
    wrapper.className = 'click-control';
    button.before(wrapper);
    wrapper.append(button);
    const counter = document.createElement('span');
    counter.className = 'click-count';
    counter.dataset.for = button.id;
    counter.setAttribute('role', 'status');
    counter.setAttribute('aria-live', 'polite');
    counter.setAttribute('aria-label', 'Clicks: 0');
    counter.title = 'Click count';
    counter.textContent = '0';
    wrapper.append(counter);
    let clicks = 0;
    button.addEventListener('click', () => {
      counter.textContent = String(++clicks);
      counter.setAttribute('aria-label', `Clicks: ${clicks}`);
    });
  }
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', addCounters, { once: true });
else addCounters();

if (window.parent !== window && document.body.classList.contains('demo-page')) {
  document.body.classList.add('embedded-demo');
  document.querySelector('main>p')?.remove();
  document.querySelector('nav[aria-label="Editor examples"]')?.remove();
  if (document.querySelector('#editor-name')) document.querySelector('main>h1')?.remove();
  document.querySelector('main>p.help')?.remove();
}
