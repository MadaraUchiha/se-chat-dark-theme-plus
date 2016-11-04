function emojiReplacer(node) {
  if (!node.classList || !node.classList.contains('message') || node.classList.contains('pending')) return;
  parseTextNodes(node, textNode => {
    textNode.textContent = textNode.textContent.replace(/\B:\w+:\B/g, match => {

      const found = emojiData.find(item => {
        if (item.triggers.includes(match.slice(1, -1))) {
          return item.emoji;
        }
      });
      if (found) return found.emoji;
      return match;
    })
  })();
}
watcher.addParser(emojiReplacer, '.user-container .message');
