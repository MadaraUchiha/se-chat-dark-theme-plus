import { DOMObserver } from "../utils/observer";

export class InlineYouTubeModule {
  public constructor(
    private observer: DOMObserver,
  ) { }

  private youtubeInliner = (node: Node) => {
    const element = node as HTMLElement;
    if (
      !element.classList
      || !element.classList.contains('message')
      || element.classList.contains('pending')
    ) {
      return; // if not message node, exit
    }
    const yt = element.querySelector<HTMLDivElement>('.onebox.ob-youtube'); // grab youtube onebox
    if (!yt) { return; } // exit if not found
    const link = yt.querySelector<HTMLAnchorElement>('a'); // youtube link address
    if (!link) { return; }
    let videoHref: string;
    if (/(youtu\.?be)\/.+$/.test(link.href)) { // youtu.be links need to get extracted differently.
      videoHref = link.href.split('/').pop()!;
    } else {
      videoHref = link.href.match(/v\=(.*)&?/)!.pop()!.replace(/&/, '/?'); // ^  
    }
    const vid = document.createElement('iframe'); // new vidja element
    vid.setAttribute('height', '240'); // setting attributes ... properties would also work.
    vid.setAttribute('width', '320');
    vid.setAttribute('frameborder', '0');
    vid.setAttribute('allowfullscreen', 'true');
    vid.classList.add('youtube-onebox');
    const jsapi = videoHref.includes('?') ? '&enablejsapi=1' : '?enablejsapi=1';
    vid.src = '//youtube.com/embed/' + videoHref + jsapi; // new href
    vid.hidden = yt.hidden;
    yt.replaceWith(vid);
  }

  public init() {
    return this.observer.addParser(this.youtubeInliner, '.user-container .message');
  }

}