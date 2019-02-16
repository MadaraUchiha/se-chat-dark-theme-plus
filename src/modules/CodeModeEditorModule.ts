import CodeMirror, { Editor } from 'codemirror';

import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/php/php';
import 'codemirror/mode/go/go';
import 'codemirror/mode/commonlisp/commonlisp';
import 'codemirror/mode/clojure/clojure';
import 'codemirror/mode/python/python';
import 'codemirror/mode/css/css';
import 'codemirror/mode/jsx/jsx';
import 'codemirror/mode/ruby/ruby';
import 'codemirror/mode/sass/sass';

const tuple: [string, string][] = [
  ['HTML', 'htmlmixed'],
  ['JavaScript', 'javascript'],
  ['JSX', 'jsx'],
  ['TypeScript', 'text/typescript'],
  ['CSS', 'css'],
  ['Less', 'text/x-less'],
  ['SCSS', 'text/x-scss'],
  ['PHP', 'php'],
  ['Go', 'go'],
  ['Common Lisp', 'commonlisp'],
  ['Clojure', 'clojure'],
  ['Python', 'python'],
  ['Ruby', 'ruby'],
  ['SASS', 'sass'],
];

const modeMap = new Map(tuple);

export class CodeModeEditorModule {
  private codeMirror?: Editor;
  public init() {
    const input = document.getElementById('input') as HTMLTextAreaElement;
    this.codeMirror = CodeMirror(el => {
      el.hidden = true;
      input.insertAdjacentElement('beforebegin', el);
    }, {
        value: input.value,
        theme: 'monokai',
        mode: 'text/typescript'
      });
    
    const select = this.makeSelect(modeMap);
  }

  private makeSelect(modeMap: Map<string, string>) {
    const select = document.createElement('select');
    for (const [name, mode] of modeMap) {
      const option = document.createElement('option');
      option.textContent = name;
      option.value = mode;
      select.appendChild(option);
    }
    return select;
  }
}