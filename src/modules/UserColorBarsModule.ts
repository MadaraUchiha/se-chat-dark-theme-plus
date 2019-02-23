import { DOMObserver } from "../utils/observer";

export class UserColorBarsModule {
  private userColorSheet?: HTMLStyleElement;
  private foundColorUsers: Set<string> = new Set();

  public constructor(
    private observer: DOMObserver,
  ) { }

  private colorUserParser = (node: Node) => {
    const element = node as HTMLElement;

    if (!element.classList.contains('user-container')) { return; }

    const sig = element.querySelector<HTMLAnchorElement>('a.signature');
    if (!sig) { return; }

    const user = sig.getAttribute('href')!.split('/')[2];
    if (this.foundColorUsers.has(user)) { return; }

    this.foundColorUsers.add(user);
    const color = colorCode(hashCode(user));
    this.writeToSheet({ user, color });
  }

  private writeToSheet({ user, color }: { user: string, color: string }) {
    if (!this.userColorSheet) { return; }
    this.userColorSheet.textContent += `div.user-${user} .messages { border-top: solid .25em ${color} !important; }`;
  }

  public init() {
    this.userColorSheet = document.createElement('style');
    document.head.appendChild(this.userColorSheet);
    this.observer.addParser(this.colorUserParser, '.user-container');
  }
}

export function hashCode(str: string) {
  let hash = 0;
  str += '!salty';
  for (const char of str) {
    hash = char.charCodeAt(0) + (hash << 5) - hash;
  }
  return hash;
}

export function colorCode(hash: number) {
  const hue = Math.abs(hash) % 360;
  return `hsl(${hue}, 50%, 50%)`;
}