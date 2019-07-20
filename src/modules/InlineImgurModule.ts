import { DOMObserver } from '../utils/observer';

export class InlineImgurModule {
  public constructor(private observer: DOMObserver) {}

  private webmOneboxParser = (node: Node) => {
    const element = node as HTMLElement;
    if (
      element.classList.contains('message') &&
      !element.classList.contains('pending')
    ) {
      let content = element.querySelector<HTMLDivElement>('.content');
      if (!content) {
        return;
      }
      if (content.childNodes.length > 1) return; // https://github.com/rlemon/se-chat-dark-theme/issues/30
      let anchor = content.querySelector('a');
      if (!anchor || !/(webm|gifv|mp4)$/.test(anchor.href)) return; // failed to get anchor, or anchor isn't a webm/gifv
      if (anchor.rel === 'nofollow') return; // user changed the anchor text. [hello world](webm/gifv link) adds a nofollow to the link. this is the only way I could determine this.
      let vid = document.createElement('video');
      vid.controls = true;
      vid.src = anchor.href.replace(/(gifv|webm)$/, 'mp4');
      vid.width = 320;
      vid.height = 240;
      content.replaceChild(vid, anchor);
    }
  };

  public init() {
    this.observer.addParser(this.webmOneboxParser, '.user-container .message');
  }
}
