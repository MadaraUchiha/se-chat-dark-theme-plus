const IMAGE_TYPE = /image.*/;

declare global {
  function fkey(): { fkey: string };
  interface Window {
    fkey(): { fkey: string };
    eval(js: string): unknown;
  }
}

export class BetterImageUploadsModule {
  private inputElement = document.querySelector<HTMLTextAreaElement>('#input');
  private container = document.querySelector<HTMLDivElement>('#bubble');
  private loading = document.createElement('span');

  public init() {
    window.addEventListener('paste', this.handlePaste.bind(this));
    window.addEventListener(
      'dragover',
      event => event.target !== this.inputElement && event.preventDefault(),
    );
    window.addEventListener('drop', this.handleDrop.bind(this));
    if (this.container) {
      this.container.appendChild(this.loading);
      this.loading.classList.add('dark-theme-loading');
    }
  }

  private async handlePaste(e: Event) {
    const event = e as ClipboardEvent;

    const file = this.extractFile(() => event.clipboardData!);

    if (!file) {
      return;
    }

    const url = await this.uploadFile(file);
    this.appendToInput(url);
  }

  private appendToInput(substring: string) {
    if (!this.inputElement) {
      return;
    }
    this.inputElement.value += substring;
  }

  private async uploadFile(file: File) {
    // This lovely piece of work is due to how Firefox handles global variables.
    // A content script cannot normally access global variables, however, eval works.
    // eval() will be executed in the context of the script, and window.eval(), in the context of the page.
    // The following will access the global fkey() function on the page.
    const fkey = window.eval('fkey().fkey') as string;

    const form = new FormData();

    form.append('filename', file);
    form.append('fkey', fkey);

    this.setLoadingState(true);
    try {
      const resp = await fetch('https://chat.stackoverflow.com/upload/image', {
        method: 'post',
        body: form,
      });

      const html = await resp.text();

      return this.parseResponse(html);
    } finally {
      this.setLoadingState(false);
    }
  }

  private parseResponse(htmlResponse: string) {
    const match = htmlResponse.match(/var result = '(.+)'/);

    if (!match) {
      console.error("Failed to parse the response. Tell Madara he's an idiot.");
      throw new Error(
        "Failed to parse the response. Tell Madara he's an idiot",
      );
    }

    return match[1];
  }

  private setLoadingState(isLoading: boolean) {
    this.loading.textContent = isLoading ? 'Uploading...' : '';
  }

  private extractFile(dataTransferAccessor: () => DataTransfer) {
    const dataTransfer = dataTransferAccessor.call(this);
    const items = [...dataTransfer.items];
    const types = [...dataTransfer.types];

    const item = items.find(
      (item, i) => item.type.match(IMAGE_TYPE) || types[i].match(IMAGE_TYPE),
    );

    if (!item) {
      return;
    }

    const file = item.getAsFile();

    if (!file) {
      return;
    }

    return file;
  }

  private async handleDrop(e: DragEvent) {
    const file = this.extractFile(() => e.dataTransfer!);

    if (!file) {
      return;
    }
    e.preventDefault();

    const url = await this.uploadFile(file);
    this.appendToInput(url);
  }
}
