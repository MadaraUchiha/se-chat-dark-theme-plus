export class DisableBaseCssModule {
  public init() {
    document.documentElement.classList.add('nocss');
  }
}
