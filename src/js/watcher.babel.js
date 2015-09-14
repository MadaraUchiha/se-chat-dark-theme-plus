class Watcher {
    constructor(container) {
        this.parsers = [];
        this.container = container;
        this.observer = new MutationObserver(record => this.defaultParser(record)).observe(container, {
            childList: true,
            subtree: true
        });
    }
    defaultParser(records) {
        records.forEach(record => this.force(record.addedNodes));
    }
    addParser(parser, nodes) {
        this.parsers.push(parser);
        if( nodes ) {
            this.force(nodes);
        }
    }
    force(nodes) {
        [...nodes].forEach(node => node.classList && (this.parsers.forEach(parser => parser(node))));
    }
}
let watcher = new Watcher(chat);