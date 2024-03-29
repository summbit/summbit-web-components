const webComponentName             = "summbit-dark-mode-switch";
const nameBackground               = "background";
const nameIcon                     = "icon";
const nameSun                      = "sun";
const nameMoon                     = "moon";
const nameThumb                    = "thumb";
const nameEnabled                  = "enabled";
const nameClass                    = "class";
const keysToToggle                 = ["Space", "Enter"];
const propertyThumbDiameter        = `--${webComponentName}-private-thumb-diameter`;
const propertyThumbOffset          = `--${webComponentName}-private-thumb-offset`;
const propertyThumbTranslation     = `--${webComponentName}-private-thumb-translation`;
const propertyDuration             = `--${webComponentName}-private-duration`;
const propertyInterpolation        = `--${webComponentName}-private-interpolation`;
const propertyLightColor           = `--${webComponentName}-private-light-color`;
const propertyDarkColor            = `--${webComponentName}-private-dark-color`;
const propertyMinimumWidth         = "min-width";
const propertyTransition           = "transition";
const propertyBackgroundTransition = `background-color var(${propertyDuration}) var(${propertyInterpolation})`;
const propertyThumbTransition      = `${propertyBackgroundTransition}, transform var(${propertyDuration}) var(${propertyInterpolation})`;
const propertyIconTransition       = `fill var(${propertyDuration}) var(${propertyInterpolation})`;
const template                     = document.createElement("template");
template.innerHTML                 = `
<div id="${nameBackground}" class="${nameBackground}-${nameEnabled}-false" tabindex="0">
  <svg id="${nameSun}" class="${nameIcon}-${nameEnabled}-false" tabindex="-1" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 20 20">
    <circle cx="10" cy="10" r="4"/>
    <path d="m7.513 16.01q1.487 1.932 2.487 3.995 1-2.063 2.487-3.995 2.418 0.3144 4.584 1.066-0.7515-2.166-1.066-4.584 1.932-1.487 3.995-2.487-2.063-1-3.995-2.487 0.3144-2.418 1.066-4.584-2.166 0.7515-4.584 1.066-1.487-1.932-2.487-3.995-1 2.063-2.487 3.995-2.418-0.3144-4.584-1.066 0.7515 2.166 1.066 4.584-1.932 1.487-3.995 2.487 2.063 1 3.995 2.487-0.3144 2.418-1.066 4.584 2.166-0.7515 4.584-1.066zm2.487-11.51a5.5 5.5 0 0 1 5.5 5.5 5.5 5.5 0 0 1-5.5 5.5 5.5 5.5 0 0 1-5.5-5.5 5.5 5.5 0 0 1 5.5-5.5z"/>
  </svg>
  <svg id="${nameMoon}" class="${nameIcon}-${nameEnabled}-false" tabindex="-1" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 20 20">
    <path d="m12.362 0.651a0.2 0.2 90 0 0-0.0355-0.377 10 10 90 1 0 5.708 15.68 0.2 0.2 90 0 0-0.2151-0.3116 8 8 90 0 1-5.458-14.99z"/>
  </svg>
  <span id="${nameThumb}" class="${nameThumb}-${nameEnabled}-false" tabindex="-1"></span>
</div>
<style>
:host {
  ${propertyThumbDiameter}: 20px;
  ${propertyThumbOffset}: 2px;
  ${propertyThumbTranslation}: 0px;
  ${propertyDuration}: var(--${webComponentName}-duration, 0.2s);
  ${propertyInterpolation}: var(--${webComponentName}-interpolation, cubic-bezier(0.66, 0, 0.33, 1));
  ${propertyLightColor}: var(--${webComponentName}-light-color, #f7f9fb);
  ${propertyDarkColor}: var(--${webComponentName}-dark-color, #1b1c1d);
  display: inline-block;
  cursor: pointer;
  ${propertyMinimumWidth}: 48px;
  min-height: 24px;
}

.${nameBackground}-${nameEnabled}-true,
.${nameBackground}-${nameEnabled}-false {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 100vmax;
  box-sizing: border-box;
  padding: var(${propertyThumbOffset});
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.${nameBackground}-${nameEnabled}-true {
  background-color: var(${propertyLightColor});
}

.${nameBackground}-${nameEnabled}-false {
  background-color: var(${propertyDarkColor});
}

.${nameIcon}-${nameEnabled}-true,
.${nameIcon}-${nameEnabled}-false {
  width: var(${propertyThumbDiameter});
  height: var(${propertyThumbDiameter});
  box-sizing: border-box;
  padding: 1px;
}

.${nameIcon}-${nameEnabled}-true {
  fill: var(${propertyDarkColor});
}

.${nameIcon}-${nameEnabled}-false {
  fill: var(${propertyLightColor});
}

.${nameThumb}-${nameEnabled}-true,
.${nameThumb}-${nameEnabled}-false {
  position: absolute;
  width: var(${propertyThumbDiameter});
  height: var(${propertyThumbDiameter});
  border-radius: 50%;
}

.${nameThumb}-${nameEnabled}-true {
  transform: translateX(var(${propertyThumbTranslation}));
  background-color: var(${propertyDarkColor});
}

.${nameThumb}-${nameEnabled}-false {
  transform: translateX(0px);
  background-color: var(${propertyLightColor});
}

.${nameBackground}-${nameEnabled}-true:focus,
.${nameBackground}-${nameEnabled}-false:focus,
.${nameIcon}-${nameEnabled}-true:focus,
.${nameIcon}-${nameEnabled}-false:focus,
.${nameThumb}-${nameEnabled}-true:focus,
.${nameThumb}-${nameEnabled}-false:focus {
  outline: none;
}

.${nameBackground}-${nameEnabled}-true:focus-visible,
.${nameBackground}-${nameEnabled}-false:focus-visible {
  outline: 5px auto Highlight;
  outline: 5px auto -webkit-focus-ring-color;
}
</style>
`;

export default class SummbitDarkModeSwitch extends HTMLElement {
  #backgroundElement;
  #thumbElement;
  #moonElement;
  #sunElement;
  #isEnabled;
  #resizeObserver;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.#backgroundElement = this.shadowRoot.getElementById(nameBackground);
    this.#thumbElement      = this.shadowRoot.getElementById(nameThumb);
    this.#moonElement       = this.shadowRoot.getElementById(nameMoon);
    this.#sunElement        = this.shadowRoot.getElementById(nameSun);
    this.#isEnabled         = false;
    this.#resizeObserver    = new ResizeObserver(this.#resizeHandler.bind(this));
    this.#moonElement.addEventListener("transitionend", this.#disableAnimations.bind(this));
    this.addEventListener("pointerdown", this.#pointerDownHandler.bind(this));
    this.addEventListener("keydown", this.#keyDownHandler.bind(this));
  }

  static get observedAttributes() {
    return [nameEnabled];
  }

  attributeChangedCallback(attributeName, oldValue, newValue) {
    if(attributeName == nameEnabled) {
      this.#isEnabled = this.hasAttribute(nameEnabled);
      const iconClass = `${nameIcon}-${nameEnabled}-${this.#isEnabled}`;
      this.#backgroundElement.setAttribute(nameClass, `${nameBackground}-${nameEnabled}-${this.#isEnabled}`);
      this.#thumbElement     .setAttribute(nameClass, `${nameThumb}-${nameEnabled}-${this.#isEnabled}`);
      this.#moonElement      .setAttribute(nameClass, iconClass);
      this.#sunElement       .setAttribute(nameClass, iconClass);
    }
  }

  connectedCallback() {
    this.#resizeObserver.observe(this, { box: "content-box" });
  }

  set [nameEnabled](value) {
    if(value) {
      this.setAttribute(nameEnabled, "");
    } else {
      this.removeAttribute(nameEnabled);
    }
  }

  get [nameEnabled]() {
    return this.#isEnabled;
  }

  #resizeHandler(entries) {
    const computedStyle = window.getComputedStyle(this);
    const width         = parseFloat(computedStyle.getPropertyValue("width"));
    const height        = parseFloat(computedStyle.getPropertyValue("height"));
    const minimumWidth  = height * 2;
    const offset        = height / 12;
    const thumbDiameter = offset * 10;
    const hostStyle     = this.shadowRoot.styleSheets[0].cssRules[0].style;
    hostStyle.setProperty(propertyMinimumWidth, `${minimumWidth}px`);
    hostStyle.setProperty(propertyThumbOffset, `${offset}px`);
    hostStyle.setProperty(propertyThumbDiameter, `${thumbDiameter}px`);
    hostStyle.setProperty(propertyThumbTranslation, `${Math.max(minimumWidth, width) - thumbDiameter - 2 * offset}px`);
  }

  #pointerDownHandler(event) {
    event.stopPropagation();
    this.#toggleState();
  }

  #keyDownHandler(event) {
    if(keysToToggle.includes(event.code)) {
      event.preventDefault();
      this.#toggleState();
    }
  }

  #toggleState() {
    this.#enableAnimations();
    this[nameEnabled] = !this.#isEnabled;
    this.#dispatchChangeEvent();
  }

  #enableAnimations() {
    const rules = this.shadowRoot.styleSheets[0].cssRules;
    rules[1].style.setProperty(propertyTransition, propertyBackgroundTransition);
    rules[4].style.setProperty(propertyTransition, propertyIconTransition);
    rules[7].style.setProperty(propertyTransition, propertyThumbTransition);
  }

  #disableAnimations() {
    const rules = this.shadowRoot.styleSheets[0].cssRules;
    rules[1].style.removeProperty(propertyTransition);
    rules[4].style.removeProperty(propertyTransition);
    rules[7].style.removeProperty(propertyTransition);
  }

  #dispatchChangeEvent() {
    this.shadowRoot.dispatchEvent(new CustomEvent("change", { bubbles: true, composed: true, detail: { enabled: this.#isEnabled }}));
  }
}

if(!customElements.get(webComponentName)) {
  customElements.define(webComponentName, SummbitDarkModeSwitch);
}
