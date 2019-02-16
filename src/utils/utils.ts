export function walkTextNodes (container: Node, callback: (node: Text) => void) {
  let recurse = (node = container) => {
    [...node.childNodes].forEach(recurse);
    if (isTextNode(node) && node.nodeValue !== '') {
      callback(node);
    }
  };
  return recurse;
}; 

function isTextNode(node: Node): node is Text {
  return node.nodeType === Node.TEXT_NODE;
}