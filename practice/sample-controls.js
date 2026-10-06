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
