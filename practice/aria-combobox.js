/*! Autofill website (c) 2026 cp529414. All rights reserved. See LICENSE. */
"use strict";
// Two ordinary ARIA combobox/listbox demos: a select-only button and a searchable input.
// No extension code runs on this website.
function setup(trigger, { searchable }) {
  const list = document.getElementById(trigger.getAttribute('aria-controls'));
  const options = [...list.querySelectorAll('[role="option"]')];
  const close = () => {
    list.hidden = true;
    trigger.setAttribute('aria-expanded', 'false');
    trigger.removeAttribute('aria-activedescendant');
  };
  const open = () => {
    list.hidden = false;
    trigger.setAttribute('aria-expanded', 'true');
  };
  const choose = option => {
    for (const item of options) item.setAttribute('aria-selected', String(item === option));
    if (searchable) trigger.value = option.textContent;
    else trigger.textContent = option.textContent;
    trigger.dispatchEvent(new Event('change', { bubbles: true }));
    close();
  };
  const visible = () => options.filter(option => !option.hidden);
  const move = step => {
    const shown = visible();
    if (!shown.length) return;
    open();
    const current = shown.findIndex(option => option.id === trigger.getAttribute('aria-activedescendant'));
    const next = shown[(current + step + shown.length) % shown.length];
    trigger.setAttribute('aria-activedescendant', next.id);
    next.scrollIntoView({ block: 'nearest' });
  };
  trigger.addEventListener('click', () => (list.hidden ? open() : close()));
  trigger.addEventListener('keydown', event => {
    if (event.key === 'ArrowDown') { event.preventDefault(); move(1); }
    else if (event.key === 'ArrowUp') { event.preventDefault(); move(-1); }
    else if (event.key === 'Escape') close();
    else if (event.key === 'Enter' || (!searchable && event.key === ' ')) {
      const active = document.getElementById(trigger.getAttribute('aria-activedescendant'));
      if (active && !list.hidden) { event.preventDefault(); choose(active); }
    }
  });
  list.addEventListener('click', event => {
    const option = event.target.closest('[role="option"]');
    if (option) choose(option);
  });
  if (searchable) {
    trigger.addEventListener('input', () => {
      const text = trigger.value.trim().toLocaleLowerCase();
      for (const option of options) option.hidden = !option.textContent.toLocaleLowerCase().includes(text);
      open();
    });
  }
  document.addEventListener('click', event => {
    if (!trigger.contains(event.target) && !list.contains(event.target)) close();
  });
}
setup(document.getElementById('aria-city'), { searchable: false });
setup(document.getElementById('aria-search'), { searchable: true });
