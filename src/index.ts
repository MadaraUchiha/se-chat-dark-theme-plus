import { DOMObserver } from "./utils/observer";
import { CollapseOneboxModule } from "./modules/CollapseOneboxModule";
import { FishSpinnerModule } from "./modules/FishSpinnerModule";
import { DisableBaseCssModule } from "./modules/DisableBaseCssModule";
import { EmojiTranslatorModule } from "./modules/EmojiTranslatorModule";
import { InlineImgurModule } from "./modules/InlineImgurModule";
import { waitForDocumentReady } from "./utils/utils";
import { CodeModeEditorModule } from "./modules/CodeModeEditorModule";

const defaultSettings = {
  baseCss: true,            // the base dark theme css
  inlineYoutube: true,        // makes youtube videos play inline the chat
  collapseOnebox: true,         // can collapse
  collapseOneboxDefault: false,   // default option for collapse
  pauseYoutubeOnCollapse: true,   // default option for pausing youtube on collapse
  userColorBars: true,        // show colored bars above users message blocks
  fishSpinner: true,          // fish spinner is best spinner
  inlineImgur: true,          // inlines webm,gifv,mp4 content from imgur
  visualizeHex: true,        // underlines hex codes with their colour values
  syntaxHighlightCode: true,    // guess at language and highlight the code blocks
  emojiTranslator: true,        // emoji translator for INPUT area
  codeModeEditor: true,        // uses CodeMirror for your code inputs
  betterImageUploads: true      // use the drag & drop and paste api for image uploads
}

const observer = new DOMObserver();

class ModuleRunner {
  public constructor(
    private observer: DOMObserver,
    private settings = defaultSettings,
  ) { }

  public async init() {
    console.log('SE Chat Dark Theme++ Initializing');

    if (!this.settings.baseCss) {
      const disableBaseCssModule = new DisableBaseCssModule();
      disableBaseCssModule.init();
    }
    if (this.settings.collapseOnebox) {
      const collapseOneboxModule = new CollapseOneboxModule(this.observer, this.settings);
      collapseOneboxModule.init();
    }
    if (this.settings.fishSpinner) {
      const fishSpinnerModule = new FishSpinnerModule(this.observer);
      fishSpinnerModule.init();
    }
    if (this.settings.emojiTranslator) {
      const emojiTranslatorModule = new EmojiTranslatorModule();
      emojiTranslatorModule.init();
    }
    if (this.settings.inlineImgur) {
      const inlineImgurModule = new InlineImgurModule(this.observer);
      inlineImgurModule.init();
    }
    if (this.settings.codeModeEditor) {
      const codeModeEditorModule = new CodeModeEditorModule();
      codeModeEditorModule.init();
    }

    await this.drainObserverWhenDocumentIsReady(observer)
  }

  private async drainObserverWhenDocumentIsReady(observer: DOMObserver) {
    await waitForDocumentReady()
    return observer.drain();
  }
}

const runner = new ModuleRunner(observer, defaultSettings);

runner.init();