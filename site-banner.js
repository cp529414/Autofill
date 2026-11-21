/*! Autofill website (c) 2026 cp529414. All rights reserved. See LICENSE. */
"use strict";
if (window.parent !== window) {
  document.querySelector("[data-site-banner]")?.remove();
} else {
  document.documentElement.classList.add("site-page");
}
