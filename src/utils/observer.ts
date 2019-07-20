type Consumer<T> = (node: T) => void;

export class DOMObserver {
  private parsers: Consumer<Node>[] = [];
  private watchers: Consumer<Node>[] = [];
  private queue: string[] = [];
  private observer: MutationObserver;

  public constructor() {
    this.observer = new MutationObserver(records => {
      for (const record of records) {
        this.force(record);
      }
    });

    this.observer.observe(document.body, {
      subtree: true,
      childList: true,
    });
  }

  public addParser(parser: Consumer<Node>, selector?: string) {
    if (selector) {
      this.queue.push(selector);
    }
    this.parsers.push(parser);
  }

  public addWatcher(watcher: Consumer<Node>) {
    this.watchers.push(watcher);
  }

  public drain() {
    for (const selector of this.queue) {
      this.force({ addedNodes: document.querySelectorAll(selector) });
    }
    this.queue = [];
  }

  public force({
    addedNodes,
    removedNodes,
  }: {
    addedNodes?: NodeList;
    removedNodes?: NodeList;
  }) {
    if (addedNodes) {
      for (const addedNode of Array.from(addedNodes)) {
        if (!(addedNode as HTMLElement).classList) return;
        this.parsers.forEach(parser => parser(addedNode));
      }
    }
    if (removedNodes) {
      for (const removedNode of Array.from(removedNodes)) {
        this.watchers.forEach(watcher => watcher(removedNode));
      }
    }
  }
}
