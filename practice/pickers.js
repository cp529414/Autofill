import { loadStyle, loadScript, initializeDemos } from './library-loader.js';
export async function initializePickers() {
  loadStyle('https://cdn.jsdelivr.net/npm/flatpickr@4.6.13/dist/flatpickr.min.css');
  loadStyle('https://code.jquery.com/ui/1.14.1/themes/base/jquery-ui.css');
  loadStyle('https://cdn.jsdelivr.net/npm/@melloware/coloris@0.25.0/dist/coloris.css');
  const ready = await initializeDemos([
    ['Flatpickr', async () => {
      await loadScript('https://cdn.jsdelivr.net/npm/flatpickr@4.6.13/dist/flatpickr.min.js');
      window.flatpickr('#flatpickr', { dateFormat: 'Y-m-d', allowInput: true });
    }],
    ['jQuery UI', async () => {
      await loadScript('https://cdn.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.min.js');
      await loadScript('https://code.jquery.com/ui/1.14.1/jquery-ui.min.js');
      window.jQuery('#jquery-date').datepicker({ dateFormat: 'yy-mm-dd' });
    }],
    ['jscolor', async () => {
      await loadScript('https://cdnjs.cloudflare.com/ajax/libs/jscolor/2.5.2/jscolor.min.js');
      window.jscolor.install();
    }],
    ['Coloris', async () => {
      await loadScript('https://cdn.jsdelivr.net/npm/@melloware/coloris@0.25.0/dist/umd/coloris.js');
      window.Coloris({ el: '#coloris', format: 'hex', themeMode: 'auto' });
    }]
  ], null);
  if (!ready) throw new Error("Some pickers could not load.");
}
if (document.body.classList.contains('demo-page')) void initializeDemos([['Pickers', initializePickers]]);
