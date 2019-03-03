export class BetterImageUploadsModule {
  private inputElement = document.querySelector<HTMLTextAreaElement>('#input');

  public init() {
    window.addEventListener('paste', this.handlePaste);
    window.addEventListener('dragover', event => event.target !== this.inputElement && event.preventDefault());
    window.addEventListener('drop', this.handleDrop);
  }

  private handlePaste(e: Event) {
    const event = e as ClipboardEvent;
    const item = event.clipboardData.items[0];
    if (event.target === this.inputElement && item.type === 'text/plain') { return; }
    console.info({ item });
  }

  private handleDrop(e: DragEvent) {
    return true;
  }
}