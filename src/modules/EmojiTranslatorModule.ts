import { emojiData } from "../utils/emojiData";

export class EmojiTranslatorModule {
  public init() {
    const input = document.getElementById('input') as HTMLTextAreaElement;
    input.addEventListener('keyup', event => {
      // TODO: Restore cursor to where it was.
      if (event.which !== 32) return;
      input.value = input.value.split(' ').map(word => {
        const found = emojiData.find(item => item.triggers.includes(word));
        if (found) {
          return found.emoji;
        }
        return word;
      }).join(' ');
    });

  }
}