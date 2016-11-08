window.hljs.initHighlightingOnLoad();
const highlightParser = node => {
    if (node.classList.contains('message')) {
    	let pres = node.querySelectorAll('pre');
    	[...pres].forEach(pre => {
    		window.hljs.highlightBlock(pre);
    	});
    }
};
DOMObserver.addParser(highlightParser, '.user-container .message');