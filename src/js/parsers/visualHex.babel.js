const visualHexParser = node => {
	if( node.classList.contains('message') && !node.classList.contains('pending') ) {
		let re = /\B#(?:[0-9a-f]{3}){1,2}\b/ig;
		console.log('here');
		parseTextNodes(node, textNode => {
			if( re.test(textNode.textContent) ) {
				let wrapper = document.createElement('span');
				let match = textNode.textContent.match(/\B#(?:[0-9a-f]{3}){1,2}\b/ig);
				wrapper.style.borderBottom = `solid 3px ${match[0]}`;
				wrapper.textContent = node.textContent;
				textNode.parentNode.replaceChild(wrapper, textNode);
			}
		})();
	}
};

watcher.addParser(visualHexParser, document.querySelectorAll('.user-container .message'));