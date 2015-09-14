const parseTextNodes = (container, callback) => {
	let recurse = (node = container) => {
		[...node.childNodes].forEach(recurse);
		if( node.nodeType === Node.TEXT_NODE && node.nodeValue !== '' ) {
			callback(node);
		}
	};
	return recurse;
};