const parseTextNodes = (container, callback) => {
	let recurse = (node = container) => {
		for( let n of node.childNodes ) {
			recurse(n);
		}
		if( node.nodeType === Node.TEXT_NODE && node.nodeValue !== '' ) {
			callback(node);
		}
	};
	return recurse;
};