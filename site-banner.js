"use strict";
if (window.parent !== window) {
  document.querySelector("[data-site-banner]")?.remove();
} else {
  document.documentElement.classList.add("site-page");
}
