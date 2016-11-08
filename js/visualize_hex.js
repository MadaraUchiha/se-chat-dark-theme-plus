// I do not always work. Entire plugin needs re-writing. 
// see app.js line 3
const visualHexParser = node => {
    if (node.classList.contains('message') && !node.classList.contains('pending')) {
        let re = /\B#(?:[0-9a-f]{3}){1,2}\b/i;
        parseTextNodes(node, textNode => {
            if (!re.test(textNode.textContent)) return;
            let df = document.createDocumentFragment();
            let words = textNode.nodeValue.split(' ');
            words.forEach(word => {
                if (!re.test(word)) return df.appendChild(document.createTextNode(word + ' '));
                let wrapped = document.createElement('span');
                wrapped.style.borderBottom = `solid 3px ${word}`;
                wrapped.textContent = word;
                df.appendChild(wrapped);
                df.appendChild(document.createTextNode(' '));
            });
            textNode.parentNode.replaceChild(df, textNode);
        })();
    }
};
DOMObserver.addParser(visualHexParser, '.user-container .message');