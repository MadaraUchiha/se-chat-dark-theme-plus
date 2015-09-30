class Watcher {
    constructor(container) {
        this.parsers = [];
        this.queue = [];
        this.container = container;
        this.observer = new MutationObserver(record => this.defaultParser(record)).observe(container, {
            childList: true,
            subtree: true
        });
    }
    defaultParser(records) {
        records.forEach(record => this.force(record.addedNodes));
    }
    addParser(parser, selector) {
        this.parsers.push(parser);
        if( selector ) {
            this.queue.push(selector);
        }
    }
    drain () {
        console.log('draining');
        this.queue.forEach(selector => this.force(document.querySelectorAll(selector)));
    }
    force(nodes) {
        [...nodes].forEach(node => node.classList && (this.parsers.forEach(parser => parser(node))));
    }
}
let watcher = new Watcher(chat);
