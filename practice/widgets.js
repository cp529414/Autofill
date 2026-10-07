import { loadStyle, loadScript, initializeDemos } from './library-loader.js';
export async function initializeWidgets() {
  for (const url of [
    'https://cdn.jsdelivr.net/npm/bootstrap-select@1.13.18/dist/css/bootstrap-select.min.css',
    'https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css',
    'https://cdn.jsdelivr.net/npm/tom-select@2.3.1/dist/css/tom-select.css',
    'https://cdnjs.cloudflare.com/ajax/libs/chosen/1.8.7/chosen.min.css',
    'https://cdn.jsdelivr.net/npm/@yaireo/tagify@4.17.9/dist/tagify.css'
  ]) loadStyle(url);
  await loadScript('https://cdn.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.min.js');
  const ready = await initializeDemos([
    ['Bootstrap Select', async () => {
      await loadScript('https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js');
      await loadScript('https://cdn.jsdelivr.net/npm/bootstrap-select@1.13.18/dist/js/bootstrap-select.min.js');
      window.jQuery('#bootstrap').selectpicker();
    }],
    ['Select2', async () => {
      await loadScript('https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js');
      window.jQuery('#select2').select2({ width: '100%' });
    }],
    ['Tom Select', async () => {
      await loadScript('https://cdn.jsdelivr.net/npm/tom-select@2.3.1/dist/js/tom-select.complete.min.js');
      new window.TomSelect('#tom-select');
      new window.TomSelect('#tom-remote', { maxItems: 1, loadThrottle: null, load(query, callback) {
        setTimeout(() => callback([
          { value: 'taipei', text: 'Taipei' }, { value: 'london', text: 'London' }, { value: 'tokyo', text: 'Tokyo' }
        ]), 200);
      } });
      new window.TomSelect('#tom-input', { maxItems: 1, create(input, callback) { setTimeout(() => callback({ value: input, text: input }), 200); } });
    }],
    ['Chosen', async () => {
      await loadScript('https://cdnjs.cloudflare.com/ajax/libs/chosen/1.8.7/chosen.jquery.min.js');
      window.jQuery('#chosen').chosen({ width: '100%' });
    }],
    ['Tagify', async () => {
      await loadScript('https://cdn.jsdelivr.net/npm/@yaireo/tagify@4.17.9/dist/tagify.min.js');
      new window.Tagify(document.getElementById('tags'));
    }]
  ], null);
  if (!ready) throw new Error("Some select widgets could not load.");
}
if (document.body.classList.contains('demo-page')) void initializeDemos([['Widgets', initializeWidgets]]);
