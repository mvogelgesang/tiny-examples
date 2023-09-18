import { LightningElement, api, wire } from "lwc";
import highlight from "@salesforce/resourceUrl/highlight";
import { loadStyle, loadScript } from "lightning/platformResourceLoader";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import {
  APPLICATION_SCOPE,
  subscribe,
  MessageContext
} from "lightning/messageService";
import CODEMC from "@salesforce/messageChannel/CodePromptMessageChannel__c";

export default class Highlight extends LightningElement {
  @api language = "javascript";
  @api themeValue = "default";
  title = "Highlight Input";
  code = `const hello = "hola";
console.log(x);
for (let i = 0; i < 10; i++) {
  // do a thing
}`;

  @wire(MessageContext)
  messageContext;

  connectedCallback() {
    this.subscribeMC();
    Promise.all([
      loadStyle(this, highlight + `/styles/${this.themeValue}.min.css`),
      loadScript(this, highlight + "/highlight.js"),
      loadScript(this, highlight + `/languages/${this.language}.min.js`)
    ])
      .then(() => {
        this.highlightCode();
      })
      .catch((error) => {
        console.error(error);
        this.dispatchEvent(
          new ShowToastEvent({
            title: "Error loading Highlight library",
            message: error.message,
            variant: "error"
          })
        );
      });
  }

  highlightCode() {
    this.code = hljs.highlight(this.code, {
      language: this.language
    }).value;
    this.template.querySelector("code div").innerHTML = this.code;
  }
  subscribeMC() {
    //template
    // local boatId must receive the recordId from the message
    this.subscription = subscribe(
      this.messageContext,
      CODEMC,
      (message) => {
        this.code = message.response.code;
        this.language = message.response.language;
        this.highlightCode();
      },
      { scope: APPLICATION_SCOPE }
    );
  }

  handleChangeTheme(event) {
    this.themeValue = event.detail.value;
    Promise.all([
      loadStyle(this, highlight + `/styles/${this.themeValue}.min.css`),
      loadScript(this, highlight + `/languages/${this.language}.min.js`)
    ])
      .then(() => {
        // this.highlightCode();
      })
      .catch((error) => {
        console.error(error);
        this.dispatchEvent(
          new ShowToastEvent({
            title: `Error loading Highlight library for ${this.themeValue} theme`,
            message: error.message,
            variant: "error"
          })
        );
      });
  }
  get themeOptions() {
    return [
      { label: "Default", value: "default" },
      { label: "A 11 Y Dark", value: "a11y-dark" },
      { label: "A 11 Y Light", value: "a11y-light" },
      { label: "Agate", value: "agate" },
      { label: "An Old Hope", value: "an-old-hope" },
      { label: "Androidstudio", value: "androidstudio" },
      { label: "Arduino Light", value: "arduino-light" },
      { label: "Arta", value: "arta" },
      { label: "Ascetic", value: "ascetic" },
      { label: "Atom One Dark", value: "atom-one-dark-reasonable" },
      { label: "Atom One Dark Reasonable", value: "atom-one-dark" },
      { label: "Atom One Light", value: "atom-one-light" },
      { label: "Base16 / 3024", value: "base16/3024" },
      { label: "Base16 / Apathy", value: "base16/apathy" },
      { label: "Base16 / Apprentice", value: "base16/apprentice" },
      { label: "Base16 / Ashes", value: "base16/ashes" },
      { label: "Base16 / Atelier Cave", value: "base16/atelier-cave-light" },
      { label: "Base16 / Atelier Cave Light", value: "base16/atelier-cave" },
      { label: "Base16 / Atelier Dune", value: "base16/atelier-dune-light" },
      { label: "Base16 / Atelier Dune Light", value: "base16/atelier-dune" },
      {
        label: "Base16 / Atelier Estuary",
        value: "base16/atelier-estuary-light"
      },
      {
        label: "Base16 / Atelier Estuary Light",
        value: "base16/atelier-estuary"
      },
      {
        label: "Base16 / Atelier Forest",
        value: "base16/atelier-forest-light"
      },
      {
        label: "Base16 / Atelier Forest Light",
        value: "base16/atelier-forest"
      },
      { label: "Base16 / Atelier Heath", value: "base16/atelier-heath-light" },
      { label: "Base16 / Atelier Heath Light", value: "base16/atelier-heath" },
      {
        label: "Base16 / Atelier Lakeside",
        value: "base16/atelier-lakeside-light"
      },
      {
        label: "Base16 / Atelier Lakeside Light",
        value: "base16/atelier-lakeside"
      },
      {
        label: "Base16 / Atelier Plateau",
        value: "base16/atelier-plateau-light"
      },
      {
        label: "Base16 / Atelier Plateau Light",
        value: "base16/atelier-plateau"
      },
      {
        label: "Base16 / Atelier Savanna",
        value: "base16/atelier-savanna-light"
      },
      {
        label: "Base16 / Atelier Savanna Light",
        value: "base16/atelier-savanna"
      },
      {
        label: "Base16 / Atelier Seaside",
        value: "base16/atelier-seaside-light"
      },
      {
        label: "Base16 / Atelier Seaside Light",
        value: "base16/atelier-seaside"
      },
      {
        label: "Base16 / Atelier Sulphurpool",
        value: "base16/atelier-sulphurpool-light"
      },
      {
        label: "Base16 / Atelier Sulphurpool Light",
        value: "base16/atelier-sulphurpool"
      },
      { label: "Base16 / Atlas", value: "base16/atlas" },
      { label: "Base16 / Bespin", value: "base16/bespin" },
      { label: "Base16 / Black Metal", value: "base16/black-metal-bathory" },
      {
        label: "Base16 / Black Metal Bathory",
        value: "base16/black-metal-burzum"
      },
      {
        label: "Base16 / Black Metal Burzum",
        value: "base16/black-metal-dark-funeral"
      },
      {
        label: "Base16 / Black Metal Dark Funeral",
        value: "base16/black-metal-gorgoroth"
      },
      {
        label: "Base16 / Black Metal Gorgoroth",
        value: "base16/black-metal-immortal"
      },
      {
        label: "Base16 / Black Metal Immortal",
        value: "base16/black-metal-khold"
      },
      {
        label: "Base16 / Black Metal Khold",
        value: "base16/black-metal-marduk"
      },
      {
        label: "Base16 / Black Metal Marduk",
        value: "base16/black-metal-mayhem"
      },
      {
        label: "Base16 / Black Metal Mayhem",
        value: "base16/black-metal-nile"
      },
      { label: "Base16 / Black Metal Nile", value: "base16/black-metal-venom" },
      { label: "Base16 / Black Metal Venom", value: "base16/black-metal" },
      { label: "Base16 / Brewer", value: "base16/brewer" },
      { label: "Base16 / Bright", value: "base16/bright" },
      { label: "Base16 / Brogrammer", value: "base16/brogrammer" },
      { label: "Base16 / Brush Trees", value: "base16/brush-trees-dark" },
      { label: "Base16 / Brush Trees Dark", value: "base16/brush-trees" },
      { label: "Base16 / Chalk", value: "base16/chalk" },
      { label: "Base16 / Circus", value: "base16/circus" },
      { label: "Base16 / Classic Dark", value: "base16/classic-dark" },
      { label: "Base16 / Classic Light", value: "base16/classic-light" },
      { label: "Base16 / Codeschool", value: "base16/codeschool" },
      { label: "Base16 / Colors", value: "base16/colors" },
      { label: "Base16 / Cupcake", value: "base16/cupcake" },
      { label: "Base16 / Cupertino", value: "base16/cupertino" },
      { label: "Base16 / Danqing", value: "base16/danqing" },
      { label: "Base16 / Darcula", value: "base16/darcula" },
      { label: "Base16 / Dark Violet", value: "base16/dark-violet" },
      { label: "Base16 / Darkmoss", value: "base16/darkmoss" },
      { label: "Base16 / Darktooth", value: "base16/darktooth" },
      { label: "Base16 / Decaf", value: "base16/decaf" },
      { label: "Base16 / Default Dark", value: "base16/default-dark" },
      { label: "Base16 / Default Light", value: "base16/default-light" },
      { label: "Base16 / Dirtysea", value: "base16/dirtysea" },
      { label: "Base16 / Dracula", value: "base16/dracula" },
      { label: "Base16 / Edge Dark", value: "base16/edge-dark" },
      { label: "Base16 / Edge Light", value: "base16/edge-light" },
      { label: "Base16 / Eighties", value: "base16/eighties" },
      { label: "Base16 / Embers", value: "base16/embers" },
      { label: "Base16 / Equilibrium Dark", value: "base16/equilibrium-dark" },
      {
        label: "Base16 / Equilibrium Gray Dark",
        value: "base16/equilibrium-gray-dark"
      },
      {
        label: "Base16 / Equilibrium Gray Light",
        value: "base16/equilibrium-gray-light"
      },
      {
        label: "Base16 / Equilibrium Light",
        value: "base16/equilibrium-light"
      },
      { label: "Base16 / Espresso", value: "base16/espresso" },
      { label: "Base16 / Eva", value: "base16/eva-dim" },
      { label: "Base16 / Eva Dim", value: "base16/eva" },
      { label: "Base16 / Flat", value: "base16/flat" },
      { label: "Base16 / Framer", value: "base16/framer" },
      { label: "Base16 / Fruit Soda", value: "base16/fruit-soda" },
      { label: "Base16 / Gigavolt", value: "base16/gigavolt" },
      { label: "Base16 / Github", value: "base16/github" },
      { label: "Base16 / Google Dark", value: "base16/google-dark" },
      { label: "Base16 / Google Light", value: "base16/google-light" },
      { label: "Base16 / Grayscale Dark", value: "base16/grayscale-dark" },
      { label: "Base16 / Grayscale Light", value: "base16/grayscale-light" },
      { label: "Base16 / Green Screen", value: "base16/green-screen" },
      {
        label: "Base16 / Gruvbox Dark Hard",
        value: "base16/gruvbox-dark-hard"
      },
      {
        label: "Base16 / Gruvbox Dark Medium",
        value: "base16/gruvbox-dark-medium"
      },
      {
        label: "Base16 / Gruvbox Dark Pale",
        value: "base16/gruvbox-dark-pale"
      },
      {
        label: "Base16 / Gruvbox Dark Soft",
        value: "base16/gruvbox-dark-soft"
      },
      {
        label: "Base16 / Gruvbox Light Hard",
        value: "base16/gruvbox-light-hard"
      },
      {
        label: "Base16 / Gruvbox Light Medium",
        value: "base16/gruvbox-light-medium"
      },
      {
        label: "Base16 / Gruvbox Light Soft",
        value: "base16/gruvbox-light-soft"
      },
      { label: "Base16 / Hardcore", value: "base16/hardcore" },
      { label: "Base16 / Harmonic 16 Dark", value: "base16/harmonic16-dark" },
      { label: "Base16 / Harmonic 16 Light", value: "base16/harmonic16-light" },
      { label: "Base16 / Heetch Dark", value: "base16/heetch-dark" },
      { label: "Base16 / Heetch Light", value: "base16/heetch-light" },
      { label: "Base16 / Helios", value: "base16/helios" },
      { label: "Base16 / Hopscotch", value: "base16/hopscotch" },
      { label: "Base16 / Horizon Dark", value: "base16/horizon-dark" },
      { label: "Base16 / Horizon Light", value: "base16/horizon-light" },
      { label: "Base16 / Humanoid Dark", value: "base16/humanoid-dark" },
      { label: "Base16 / Humanoid Light", value: "base16/humanoid-light" },
      { label: "Base16 / Ia Dark", value: "base16/ia-dark" },
      { label: "Base16 / Ia Light", value: "base16/ia-light" },
      { label: "Base16 / Icy Dark", value: "base16/icy-dark" },
      { label: "Base16 / Ir Black", value: "base16/ir-black" },
      { label: "Base16 / Isotope", value: "base16/isotope" },
      { label: "Base16 / Kimber", value: "base16/kimber" },
      { label: "Base16 / London Tube", value: "base16/london-tube" },
      { label: "Base16 / Macintosh", value: "base16/macintosh" },
      { label: "Base16 / Marrakesh", value: "base16/marrakesh" },
      { label: "Base16 / Materia", value: "base16/materia" },
      { label: "Base16 / Material", value: "base16/material-darker" },
      { label: "Base16 / Material Darker", value: "base16/material-lighter" },
      {
        label: "Base16 / Material Lighter",
        value: "base16/material-palenight"
      },
      { label: "Base16 / Material Palenight", value: "base16/material-vivid" },
      { label: "Base16 / Material Vivid", value: "base16/material" },
      { label: "Base16 / Mellow Purple", value: "base16/mellow-purple" },
      { label: "Base16 / Mexico Light", value: "base16/mexico-light" },
      { label: "Base16 / Mocha", value: "base16/mocha" },
      { label: "Base16 / Monokai", value: "base16/monokai" },
      { label: "Base16 / Nebula", value: "base16/nebula" },
      { label: "Base16 / Nord", value: "base16/nord" },
      { label: "Base16 / Nova", value: "base16/nova" },
      { label: "Base16 / Ocean", value: "base16/ocean" },
      { label: "Base16 / Oceanicnext", value: "base16/oceanicnext" },
      { label: "Base16 / One Light", value: "base16/one-light" },
      { label: "Base16 / Onedark", value: "base16/onedark" },
      { label: "Base16 / Outrun Dark", value: "base16/outrun-dark" },
      { label: "Base16 / Papercolor Dark", value: "base16/papercolor-dark" },
      { label: "Base16 / Papercolor Light", value: "base16/papercolor-light" },
      { label: "Base16 / Paraiso", value: "base16/paraiso" },
      { label: "Base16 / Pasque", value: "base16/pasque" },
      { label: "Base16 / Phd", value: "base16/phd" },
      { label: "Base16 / Pico", value: "base16/pico" },
      { label: "Base16 / Pop", value: "base16/pop" },
      { label: "Base16 / Porple", value: "base16/porple" },
      { label: "Base16 / Qualia", value: "base16/qualia" },
      { label: "Base16 / Railscasts", value: "base16/railscasts" },
      { label: "Base16 / Rebecca", value: "base16/rebecca" },
      { label: "Base16 / Ros Pine", value: "base16/ros-pine-dawn" },
      { label: "Base16 / Ros Pine Dawn", value: "base16/ros-pine-moon" },
      { label: "Base16 / Ros Pine Moon", value: "base16/ros-pine" },
      { label: "Base16 / Sagelight", value: "base16/sagelight" },
      { label: "Base16 / Sandcastle", value: "base16/sandcastle" },
      { label: "Base16 / Seti Ui", value: "base16/seti-ui" },
      { label: "Base16 / Shapeshifter", value: "base16/shapeshifter" },
      { label: "Base16 / Silk Dark", value: "base16/silk-dark" },
      { label: "Base16 / Silk Light", value: "base16/silk-light" },
      { label: "Base16 / Snazzy", value: "base16/snazzy" },
      { label: "Base16 / Solar Flare", value: "base16/solar-flare-light" },
      { label: "Base16 / Solar Flare Light", value: "base16/solar-flare" },
      { label: "Base16 / Solarized Dark", value: "base16/solarized-dark" },
      { label: "Base16 / Solarized Light", value: "base16/solarized-light" },
      { label: "Base16 / Spacemacs", value: "base16/spacemacs" },
      { label: "Base16 / Summercamp", value: "base16/summercamp" },
      { label: "Base16 / Summerfruit Dark", value: "base16/summerfruit-dark" },
      {
        label: "Base16 / Summerfruit Light",
        value: "base16/summerfruit-light"
      },
      {
        label: "Base16 / Synth Midnight Terminal Dark",
        value: "base16/synth-midnight-terminal-dark"
      },
      {
        label: "Base16 / Synth Midnight Terminal Light",
        value: "base16/synth-midnight-terminal-light"
      },
      { label: "Base16 / Tango", value: "base16/tango" },
      { label: "Base16 / Tender", value: "base16/tender" },
      { label: "Base16 / Tomorrow", value: "base16/tomorrow-night" },
      { label: "Base16 / Tomorrow Night", value: "base16/tomorrow" },
      { label: "Base16 / Twilight", value: "base16/twilight" },
      { label: "Base16 / Unikitty Dark", value: "base16/unikitty-dark" },
      { label: "Base16 / Unikitty Light", value: "base16/unikitty-light" },
      { label: "Base16 / Vulcan", value: "base16/vulcan" },
      { label: "Base16 / Windows 10", value: "base16/windows-10-light" },
      { label: "Base16 / Windows 10 Light", value: "base16/windows-10" },
      { label: "Base16 / Windows 95", value: "base16/windows-95-light" },
      { label: "Base16 / Windows 95 Light", value: "base16/windows-95" },
      {
        label: "Base16 / Windows High Contrast",
        value: "base16/windows-high-contrast-light"
      },
      {
        label: "Base16 / Windows High Contrast Light",
        value: "base16/windows-high-contrast"
      },
      { label: "Base16 / Windows Nt", value: "base16/windows-nt-light" },
      { label: "Base16 / Windows Nt Light", value: "base16/windows-nt" },
      { label: "Base16 / Woodland", value: "base16/woodland" },
      { label: "Base16 / Xcode Dusk", value: "base16/xcode-dusk" },
      { label: "Base16 / Zenburn", value: "base16/zenburn" },
      { label: "Brown Paper", value: "brown-paper" },
      { label: "Codepen Embed", value: "codepen-embed" },
      { label: "Color Brewer", value: "color-brewer" },
      { label: "Dark", value: "dark" },
      { label: "Devibeans", value: "devibeans" },
      { label: "Docco", value: "docco" },
      { label: "Far", value: "far" },
      { label: "Felipec", value: "felipec" },
      { label: "Foundation", value: "foundation" },
      { label: "Github", value: "github-dark-dimmed" },
      { label: "Github Dark", value: "github-dark" },
      { label: "Github Dark Dimmed", value: "github" },
      { label: "Gml", value: "gml" },
      { label: "Googlecode", value: "googlecode" },
      { label: "Gradient Dark", value: "gradient-dark" },
      { label: "Gradient Light", value: "gradient-light" },
      { label: "Grayscale", value: "grayscale" },
      { label: "Hybrid", value: "hybrid" },
      { label: "Idea", value: "idea" },
      { label: "Intellij Light", value: "intellij-light" },
      { label: "Ir Black", value: "ir-black" },
      { label: "Isbl Editor Dark", value: "isbl-editor-dark" },
      { label: "Isbl Editor Light", value: "isbl-editor-light" },
      { label: "Kimbie Dark", value: "kimbie-dark" },
      { label: "Kimbie Light", value: "kimbie-light" },
      { label: "Lightfair", value: "lightfair" },
      { label: "Lioshi", value: "lioshi" },
      { label: "Magula", value: "magula" },
      { label: "Mono Blue", value: "mono-blue" },
      { label: "Monokai", value: "monokai-sublime" },
      { label: "Monokai Sublime", value: "monokai" },
      { label: "Night Owl", value: "night-owl" },
      { label: "Nnfx Dark", value: "nnfx-dark" },
      { label: "Nnfx Light", value: "nnfx-light" },
      { label: "Nord", value: "nord" },
      { label: "Obsidian", value: "obsidian" },
      { label: "Panda Syntax Dark", value: "panda-syntax-dark" },
      { label: "Panda Syntax Light", value: "panda-syntax-light" },
      { label: "Paraiso Dark", value: "paraiso-dark" },
      { label: "Paraiso Light", value: "paraiso-light" },
      { label: "Pojoaque", value: "pojoaque" },
      { label: "Purebasic", value: "purebasic" },
      { label: "Qtcreator Dark", value: "qtcreator-dark" },
      { label: "Qtcreator Light", value: "qtcreator-light" },
      { label: "Rainbow", value: "rainbow" },
      { label: "Routeros", value: "routeros" },
      { label: "School Book", value: "school-book" },
      { label: "Shades Of Purple", value: "shades-of-purple" },
      { label: "Srcery", value: "srcery" },
      { label: "Stackoverflow Dark", value: "stackoverflow-dark" },
      { label: "Stackoverflow Light", value: "stackoverflow-light" },
      { label: "Sunburst", value: "sunburst" },
      { label: "Tokyo Night Dark", value: "tokyo-night-dark" },
      { label: "Tokyo Night Light", value: "tokyo-night-light" },
      { label: "Tomorrow Night Blue", value: "tomorrow-night-blue" },
      { label: "Tomorrow Night Bright", value: "tomorrow-night-bright" },
      { label: "Vs", value: "vs" },
      { label: "Vs 2015", value: "vs2015" },
      { label: "Xcode", value: "xcode" },
      { label: "Xt 256", value: "xt256" }
    ];
  }
}
