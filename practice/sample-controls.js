/*! Autofill website (c) 2026 cp529414. All rights reserved. See LICENSE. */
"use strict";
const passwordInput = document.querySelector('#password');
const passwordToggle = document.querySelector('#toggle-password');
passwordToggle.setAttribute('aria-label', 'Show fictional password');
passwordToggle.addEventListener('click', () => {
  const show = passwordInput.type === 'password';
  passwordInput.type = show ? 'text' : 'password';
  passwordToggle.setAttribute('aria-pressed', String(show));
  passwordToggle.setAttribute('aria-label', `${show ? 'Hide' : 'Show'} fictional password`);
});
