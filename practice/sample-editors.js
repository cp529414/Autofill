import { loadStyle, loadScript, initializeDemos } from './library-loader.js';
import { renderRule } from './sample-ui.js';
export const editorNames = { quill: 'Quill', prosemirror: 'ProseMirror', lexical: 'Lexical', draft: 'Draft.js', slate: 'Slate', tinymce: 'TinyMCE', ckeditor: 'CKEditor class fixture', react: 'React controlled input' };
export const editorSelectors = {"quill": "div[id=\"quill-input\"]", "prosemirror": "div[id=\"prosemirror-editor\"]", "lexical": "div[id=\"lexical-editor\"][role=\"textbox\"]", "draft": "div[id=\"draft-input\"][role=\"textbox\"]", "slate": "div[id=\"slate-editor\"][role=\"textbox\"]", "react": "input[id=\"react-input\"]", "tinymce": "div[id=\"tiny-editor\"][role=\"textbox\"]", "ckeditor": "div[id=\"ckeditor-editor\"][role=\"textbox\"]"};
export async function initializeEditor(kind, root) {
  let read;
  const element = (tag, id) => { const node = document.createElement(tag); if (id) node.id = id; root.append(node); return node; };
  if (kind === 'quill') {
    loadStyle('https://cdn.jsdelivr.net/npm/quill@2.0.3/dist/quill.snow.css');
    await loadScript('https://cdn.jsdelivr.net/npm/quill@2.0.3/dist/quill.js');
    element('div', 'quill-editor');
    const editor = new window.Quill('#quill-editor', { theme: 'snow', modules: { toolbar: false } });
    editor.root.id = 'quill-input';
    editor.root.setAttribute('aria-label', 'Quill practice editor');
    editor.root.setAttribute('role', 'textbox');
    editor.root.setAttribute('aria-multiline', 'true');
    read = () => editor.getText();
  } else if (kind === 'prosemirror') {
    const { EditorState } = await import('https://esm.sh/prosemirror-state@1.4.3');
    const { EditorView } = await import('https://esm.sh/prosemirror-view@1.37.1');
    const { schema } = await import('https://esm.sh/prosemirror-schema-basic@1.2.3');
    const editor = new EditorView(root, { state: EditorState.create({ schema }), attributes: { id: 'prosemirror-editor', 'aria-label': 'ProseMirror practice editor', role: 'textbox', 'aria-multiline': 'true' } });
    read = () => editor.state.doc.textBetween(0, editor.state.doc.content.size, '\n');
  } else if (kind === 'lexical') {
    const { createEditor, $getRoot, $createParagraphNode } = await import('https://esm.sh/lexical@0.21.0');
    const { registerRichText, HeadingNode, QuoteNode } = await import('https://esm.sh/@lexical/rich-text@0.21.0?deps=lexical@0.21.0');
    const target = element('div', 'lexical-editor');
    target.contentEditable = 'true';
    target.className = 'editable editor-target';
    target.setAttribute('role', 'textbox');
    target.setAttribute('aria-label', 'Lexical practice editor');
    target.setAttribute('aria-multiline', 'true');
    const editor = createEditor({ namespace: 'AutofillPractice', nodes: [HeadingNode, QuoteNode], onError(error) { throw error; } });
    editor.setRootElement(target);
    registerRichText(editor);
    editor.update(() => $getRoot().append($createParagraphNode()));
    read = () => editor.getEditorState().read(() => $getRoot().getTextContent());
  } else if (kind === 'draft') {
    loadStyle('https://cdn.jsdelivr.net/npm/draft-js@0.11.7/dist/Draft.css');
    const { default: React } = await import('https://esm.sh/react@17.0.2');
    const { default: ReactDOM } = await import('https://esm.sh/react-dom@17.0.2?deps=react@17.0.2');
    const { Editor, EditorState, ContentState } = await import('https://esm.sh/draft-js@0.11.7?deps=react@17.0.2,react-dom@17.0.2');
    function App() {
      const [state, setState] = React.useState(() => EditorState.createWithContent(ContentState.createFromText('Replace this practice text.')));
      read = () => state.getCurrentContent().getPlainText();
      return React.createElement(Editor, { editorState: state, onChange: setState, ariaLabel: 'Draft.js practice editor' });
    }
    ReactDOM.render(React.createElement(App), root);
    root.querySelector('[contenteditable=true]').id = 'draft-input';
  } else if (kind === 'slate') {
    const { default: React } = await import('https://esm.sh/react@18.3.1');
    const { createRoot } = await import('https://esm.sh/react-dom@18.3.1/client?deps=react@18.3.1');
    const { createEditor, Node } = await import('https://esm.sh/slate@0.103.0');
    const { Slate, Editable, withReact } = await import('https://esm.sh/slate-react@0.108.0?deps=react@18.3.1,react-dom@18.3.1,slate@0.103.0');
    let markReady;
    const committed = new Promise(resolve => { markReady = resolve; });
    function App() {
      React.useLayoutEffect(() => { markReady(); }, []);
      const [editor] = React.useState(() => withReact(createEditor()));
      read = () => editor.children.map(node => Node.string(node)).join('\n');
      return React.createElement(Slate, { editor, initialValue: [{ type: 'paragraph', children: [{ text: '' }] }] }, React.createElement(Editable, { id: 'slate-editor', 'aria-label': 'Slate practice editor' }));
    }
    createRoot(root).render(React.createElement(App));
    await committed;
  } else if (kind === 'tinymce') {
    await loadScript('https://cdn.jsdelivr.net/npm/tinymce@6.8.6/tinymce.min.js');
    const target = element('div', 'tiny-editor');
    target.setAttribute('role', 'textbox');
    target.className = 'editable';
    const [editor] = await window.tinymce.init({ target, inline: true, forced_root_block: 'div', menubar: false, toolbar: false, statusbar: false, promotion: false, branding: false, setup(editor) { editor.on('init', () => target.setAttribute('aria-label', 'TinyMCE practice editor')); } });
    read = () => editor.getContent({ format: 'text' });
  } else if (kind === 'ckeditor') {
    const target = element('div', 'ckeditor-editor');
    target.className = 'cke_editable editable';
    target.contentEditable = 'true';
    target.setAttribute('role', 'textbox');
    target.setAttribute('aria-label', 'CKEditor class fixture');
    target.setAttribute('aria-multiline', 'true');
    read = () => target.innerText;
  } else if (kind === 'react') {
    const { default: React } = await import('https://esm.sh/react@18.3.1');
    const { createRoot } = await import('https://esm.sh/react-dom@18.3.1/client?deps=react@18.3.1');
    let markReady;
    const committed = new Promise(resolve => { markReady = resolve; });
    function App() {
      React.useLayoutEffect(() => { markReady(); }, []);
      const [value, setValue] = React.useState('');
      read = () => value;
      return React.createElement('input', { id: 'react-input', 'aria-label': 'React controlled input', value, onChange: event => setValue(event.target.value) });
    }
    createRoot(root).render(React.createElement(App));
    await committed;
  }
  return () => read();
}
const standaloneRoot = document.querySelector('#editor-root');
if (standaloneRoot) {
  const requested = new URLSearchParams(location.search).get('kind') || 'quill';
  const kind = Object.hasOwn(editorNames, requested) ? requested : 'quill';
  document.querySelector('#editor-name').textContent = editorNames[kind];
  document.querySelector('#editor-rule').replaceChildren(renderRule('text', editorSelectors[kind], ''));
  void initializeDemos([[editorNames[kind], async () => { window.practiceModel = await initializeEditor(kind, standaloneRoot); }]]);
}
