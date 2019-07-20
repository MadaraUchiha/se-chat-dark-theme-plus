const DARK_THEME_SO_LOGO_BASE64 =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNDAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCAyNDAgNTAiPjxnIGZpbGw9IiNmZmYiPjxwYXRoIGQ9Ik00MS44IDQ1Yy0yLjMgMC00LjEtLjUtNS42LTJsMS4zLTEuM2MxLjEgMS4xIDIuNiAxLjYgNC4zIDEuNiAyLjMgMCAzLjctLjggMy43LTIuNCAwLTEuMi0uNy0xLjktMi4zLTJsLTIuMy0uMmMtMi43LS4yLTQuMS0xLjQtNC4xLTMuNyAwLTIuNSAyLjEtNCA1LTQgMiAwIDMuNy41IDQuOSAxLjVsLTEuMyAxLjNjLTEtLjgtMi4yLTEuMS0zLjctMS4xLTIgMC0zLjEuOS0zLjEgMi4zIDAgMS4yLjcgMS45IDIuNCAybDIuMi4yYzIuNC4yIDQgMS4xIDQgMy43LjIgMi42LTIuMSA0LjEtNS40IDQuMXpNNTMuNSA0NC44Yy0yLjMgMC0zLjUtMS42LTMuNS0zLjd2LTguNGgtMS43di0xLjVINTB2LTQuM2gydjQuM2gyLjl2MS41SDUydjguNGMwIDEuMy42IDIgMS45IDJINTV2MS43aC0xLjV6TTY1LjMgNDQuOHYtMS4zYy0xLjEgMS4xLTIuMSAxLjUtNCAxLjVzLTMtLjQtMy45LTEuM2MtLjctLjctMS0xLjctMS0yLjggMC0yLjQgMS43LTQgNC43LTRoNC4xdi0xLjNjMC0yLTEtMy0zLjUtMy0xLjggMC0yLjYuNC0zLjUgMS42TDU3IDMzYzEuMi0xLjYgMi42LTIgNC44LTIgMy43IDAgNS41IDEuNiA1LjUgNC42djkuM2wtMi0uMXptMC02LjNoLTMuOGMtMi4xIDAtMy4xLjgtMy4xIDIuNCAwIDEuNiAxIDIuMyAzLjEgMi4zIDEuMiAwIDIuMi0uMSAzLjEtLjkuNS0uNC43LTEuMi43LTIuNHYtMS40ek03NS4xIDQ1Yy0zLjUgMC02LjEtMi4zLTYuMS03czIuNi03IDYuMS03YzEuOSAwIDMuMS41IDQuNSAybC0xLjQgMS4zYy0xLTEuMS0xLjgtMS41LTMuMS0xLjVzLTIuNS41LTMuMiAxLjZjLS42LjktLjkgMi0uOSAzLjdzLjMgMi44LjkgMy43Yy43IDEgMS44IDEuNiAzLjIgMS42IDEuMyAwIDIuMS0uNCAzLjEtMS42bDEuNCAxLjNDNzguMiA0NC41IDc3IDQ1IDc1LjEgNDV6TTkwLjYgNDQuOGwtNC4zLTctMi43IDMuMXY0aC0yVjI1aDJ2MTMuM2w2LjItNy4xaDIuNWwtNC43IDUuMiA1LjUgOC41LTIuNS0uMXpNMTAzLjggNDMuM2MtLjguOS0yLjIgMS43LTQuMyAxLjctMiAwLTMuNC0uOC00LjMtMS43LTEuMi0xLjMtMS42LTIuOS0xLjYtNS40cy4zLTQgMS42LTUuM2MuOC0uOSAyLjItMS43IDQuMy0xLjcgMiAwIDMuNC44IDQuMyAxLjcgMS4yIDEuMyAxLjYgMi45IDEuNiA1LjMgMCAyLjYtLjQgNC4xLTEuNiA1LjR6bS0yLjctOC43Yy0uNC0uNC0uOS0uNi0xLjYtLjZzLTEuMi4yLTEuNi42Yy0uNy43LS44IDEuOS0uOCAzLjNzLjEgMi42LjggMy40Yy40LjQuOS42IDEuNi42czEuMi0uMiAxLjYtLjZjLjctLjcuOC0xLjkuOC0zLjQgMC0xLjQgMC0yLjYtLjgtMy4zek0xMTMuMSA0NC44aC0yLjdsLTUuMS0xMy43aDMuNmwyLjggOC41IDIuOC04LjVoMy42bC01IDEzLjd6TTEyMS40IDM5YzAgMS44IDEuMSAzLjEgMyAzLjEgMS41IDAgMi4yLS40IDMuMS0xLjNsMi4xIDJjLTEuNCAxLjQtMi43IDIuMi01LjIgMi4yLTMuMiAwLTYuNC0xLjUtNi40LTcuMSAwLTQuNSAyLjQtNyA2LTcgMy44IDAgNiAyLjggNiA2LjZWMzloLTguNnptNC45LTMuOGMtLjQtLjgtMS4xLTEuNC0yLjMtMS40LTEuMiAwLTEuOS42LTIuMyAxLjQtLjIuNS0uMy45LS4zIDEuNWg1LjJjMC0uNi0uMS0xLS4zLTEuNXpNMTM5LjIgMzQuOGMtLjUtLjUtMS0uOC0xLjgtLjgtMS4xIDAtMi4yLjgtMi4yIDIuNXY4LjNoLTMuNFYzMS4xaDMuNHYxLjNjLjctLjggMi0xLjUgMy41LTEuNSAxLjMgMCAyLjMuMyAzLjIgMS4zbC0yLjcgMi42ek0xNDcuNSAzMy43djExLjFoLTMuNFYzMy43aC0xLjR2LTIuNmgxLjR2LTEuN2MwLTIgMS4yLTMuOSA0LTMuOWgydjIuOWgtMS4zYy0uOCAwLTEuMi40LTEuMiAxLjJ2MS41aDIuNXYyLjZoLTIuNnptOC4xIDExLjFjLTIuOCAwLTQtMi00LTMuOVYyNS40aDMuNHYxNS4yYzAgLjguMyAxLjIgMS4yIDEuMmgxLjN2Mi45bC0xLjkuMXpNMTY4LjIgNDMuM2MtLjguOS0yLjIgMS43LTQuMyAxLjctMiAwLTMuNC0uOC00LjMtMS43LTEuMi0xLjMtMS42LTIuOS0xLjYtNS40cy4zLTQgMS42LTUuM2MuOC0uOSAyLjItMS43IDQuMy0xLjcgMiAwIDMuNC44IDQuMyAxLjcgMS4yIDEuMyAxLjYgMi45IDEuNiA1LjMtLjEgMi42LS40IDQuMS0xLjYgNS40em0tMi43LTguN2MtLjQtLjQtLjktLjYtMS42LS42cy0xLjIuMi0xLjYuNmMtLjcuNy0uOCAxLjktLjggMy4zcy4xIDIuNi44IDMuNGMuNC40LjkuNiAxLjYuNnMxLjItLjIgMS42LS42Yy43LS43LjgtMS45LjgtMy40IDAtMS40LS4xLTIuNi0uOC0zLjN6TTE4NS4xIDQ0LjhoLTIuOGwtMi45LTguNi0yLjkgOC42aC0yLjhsLTQuMi0xMy43aDMuNmwyLjIgOC41IDIuOC04LjVoMi41bDIuOCA4LjUgMi4yLTguNWgzLjZsLTQuMSAxMy43eiIvPjwvZz48cGF0aCBmaWxsPSIjODE4MTg1IiBkPSJNNiAzOC45aDE3djNINnoiLz48cGF0aCBmaWxsPSIjODE4MTg1IiBkPSJNMjYgMzAuOXYxNEgzdi0xNEgwdjE3aDI5di0xNyIvPjxwYXRoIGZpbGw9IiNBNjhBNkUiIGQ9Ik02LjM3IDMyLjczNmwxNi43MjggMS41NDQtLjI3NiAyLjk4OC0xNi43My0xLjU0NXoiLz48cGF0aCBmaWxsPSIjQkY5NDUyIiBkPSJNMjMuMiAzMi45bC0xNi4zLTQgLjctM0wyMy45IDMwIi8+PHBhdGggZmlsbD0iI0QyOEIyOSIgZD0iTTI0LjMgMjguMkw5LjYgMjAuN2wxLjQtMi41IDE0LjYgNy41Ii8+PHBhdGggZmlsbD0iI0Y2OEExRiIgZD0iTTI2LjcgMjQuN2wtMTMtMTAuOCAyLTIuMiAxMyAxMC43Ii8+PHBhdGggZmlsbD0iI0Y0NzkyMCIgZD0iTTI5LjYgMjFMMjAuMSA3LjYgMjIuNSA2bDkuNiAxMy40Ii8+PC9zdmc+';

export class ThemeDomManipulationModule {
  public init() {
    const containers = document.querySelectorAll<HTMLElement>(
      '#footer-logo, #header-logo',
    );
    this.replaceLogos([...containers]);
  }
  private replaceLogos(containers: HTMLElement[]) {
    for (const container of containers) {
      const link = container.querySelector<HTMLAnchorElement>('a');
      const img = container.querySelector<HTMLImageElement>('img');

      if (!link || !img) {
        return;
      }
      if (link.href.includes('stackoverflow')) {
        img.src = DARK_THEME_SO_LOGO_BASE64;
      }
    }
  }
}
