import { initializeDemos } from './library-loader.js';
import { initializeWidgets } from './widgets.js';
import { initializePickers } from './pickers.js';
import { initializeEditor, editorNames, editorSelectors } from './sample-editors.js';
import { renderRule } from './sample-ui.js';
window.practiceModels = {};
const demos = [['Select widgets', initializeWidgets], ['Pickers', initializePickers]];
for (const kind of Object.keys(editorNames)) {
  const root = document.querySelector('#library-editor-' + kind);
  if (!root) continue;
  document.querySelector('[data-editor-rule="' + kind + '"]').append(renderRule('text', editorSelectors[kind], ''));
  demos.push([editorNames[kind], async () => { window.practiceModels[kind] = await initializeEditor(kind, root); }]);
}
void initializeDemos(demos, document.querySelector('#library-status'));
