import CodeMirror, { Editor } from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';

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
import { stopEvent } from '../utils/utils';

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
  private storageKey = `se-dark-chat-codemirror-mode-${Number(/\d+/.exec(location.href)![0])}`;
  private input = document.getElementById('input') as HTMLTextAreaElement;
  private select?: HTMLSelectElement;
  private btnSubmit = document.querySelector<HTMLButtonElement>('#sayit-button')!;
  public init() {
    this.codeMirror = CodeMirror(el => {
      el.hidden = true;
      this.input.insertAdjacentElement('beforebegin', el);
    }, {
        value: this.input.value,
        theme: 'monokai',
        mode: 'text/typescript'
      });

    this.select = this.makeSelect(modeMap);
    document.getElementById('chat-buttons')!.appendChild(this.select);

    this.btnSubmit.addEventListener('click', _ => this.submit(), true)

    this.codeMirror.on('change', _ => this.syncInput())

    window.addEventListener('keydown', e => this.parseKeyDown(e), true);

  }

  private makeSelect(modeMap: Map<string, string>) {
    const select = document.createElement('select');
    for (const [name, mode] of modeMap) {
      const option = document.createElement('option');
      option.textContent = name;
      option.value = mode;
      select.appendChild(option);
    }
    select.addEventListener('change', e => this.changeMode(e));
    select.hidden = true;
    return select;
  }

  private changeMode(e: Event) {
    const select = e.target as HTMLSelectElement;
    const mode = select.value;
    this.codeMirror!.setOption('mode', mode);
    window.localStorage.setItem(this.storageKey, mode);
  }

  private submit() {
    this.codeMirror!.setValue('');
    this.hideCodeMirror();
  }

  private toggleCodeMode() {
    if (this.isCodeModeActive) {
      this.hideCodeMirror()
    } else {
      this.showCodeMirror();
    }
  }

  private hideCodeMirror() {
    this.syncInput();
    this.input.hidden = false;
    this.input.focus();
    if (this.input.value) {
      this.input.value = this.input.value
        .split(/\r\n|\n/g)
        .map(line => line.substr(0, 4) === '    ' ? line.slice(4) : line)
        .join('\r\n');
    }

    this.select!.hidden = true;
    this.codeMirror!.getWrapperElement().hidden = true;

  }

  private showCodeMirror() {
    this.input.hidden = true;
    this.codeMirror!.getWrapperElement().hidden = false;
    this.codeMirror!.setValue(this.input.value);
    this.codeMirror!.focus();
    this.select!.hidden = false;
  }

  private syncInput() {
    const content = this.codeMirror!.getValue();
    if (content) {
      return this.input.value = content
        .split(/\r\n|\n/g)
        .map(line => `    ${line}`)
        .join('\r\n');
    }
    return this.input.value = '';
  }

  private parseKeyDown(event: KeyboardEvent) {
    const isCtrlK = event.ctrlKey && event.which === 75
    const isCtrlEnter = event.ctrlKey && event.which === 13;
    const isEsc = event.which === 27;
    if (isCtrlK) {
      this.toggleCodeMode();
      return stopEvent(event);
    }
    if (isCtrlEnter && this.isCodeModeActive) {
      return this.btnSubmit.click(); // triggers send and flushing of CM
    }
    if (isEsc && this.isCodeModeActive) {
      this.codeMirror!.setValue('');
      this.toggleCodeMode();
      return stopEvent(event);
    }
  }

  private get isCodeModeActive() {
    return this.input.hidden;
  }
}
