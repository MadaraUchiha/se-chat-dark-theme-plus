export function walkTextNodes(container: Node, callback: (node: Text) => void) {
  let recurse = (node = container) => {
    [...node.childNodes].forEach(recurse);
    if (isTextNode(node) && node.nodeValue !== '') {
      callback(node);
    }
  };
  return recurse;
}

function isTextNode(node: Node): node is Text {
  return node.nodeType === Node.TEXT_NODE;
}

export async function waitForDocumentReady() {
  return await new Promise(resolve => {
    if (document.readyState === 'complete') {
      return resolve();
    }
    window.addEventListener('load', resolve);
  });
}

export function stopEvent(event: Event) {
  event.stopImmediatePropagation();
  event.preventDefault();
}
