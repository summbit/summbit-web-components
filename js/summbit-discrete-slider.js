const OrientationEnum = Object.freeze({
  LeftToRight: "left-to-right",
  RightToLeft: "right-to-left",
  TopToBottom: "top-to-bottom",
  BottomToTop: "bottom-to-top"
});

const webComponentName      = "summbit-discrete-slider";
const nameTrack             = "track";
const nameMinimum           = "min";
const nameMaximum           = "max";
const nameValue             = "value";
const nameOrientation       = "orientation";
const nameThumb             = "thumb";
const nameDot               = "dot";
const nameDotContainer      = "dot-container";
const arrowUp               = "ArrowUp";
const arrowDown             = "ArrowDown";
const arrowRight            = "ArrowRight";
const arrowLeft             = "ArrowLeft";
const keyGroup1             = [arrowUp  , arrowRight];
const keyGroup2             = [arrowUp  , arrowLeft];
const keyGroup3             = [arrowDown, arrowRight];
const keyGroup4             = [arrowDown, arrowLeft];
const keysToSetToMinimum    = ["Home"];
const keysToSetToMaximum    = ["End"];
const propertyTrackColor    = `--${webComponentName}-private-track-color`;
const propertyProgressColor = `--${webComponentName}-private-progress-color`;
const propertyThumbDiameter = `--${webComponentName}-private-thumb-diameter`;
const propertyThumbPosition = `--${webComponentName}-private-thumb-position`;
const propertyMinimumWidth  = "min-width";
const propertyMinimumHeight = "min-height";
const propertyWidth         = "width";
const propertyHeight        = "height";
const initialMinimum        = 0;
const initialMaximum        = 5;
const initialWidth          = "150px";
const initialHeight         = `var(${propertyThumbDiameter})`;
const minimumWidth          = `var(--${webComponentName}-private-minimum-width)`;
const minimumHeight         = `var(${propertyThumbDiameter})`;
const template              = document.createElement("template");
template.innerHTML          = `
<div id="${nameTrack}" class="${nameTrack}-${OrientationEnum.LeftToRight}" tabindex="0">
  <span id="${nameMinimum}" class="${nameMinimum}-${OrientationEnum.LeftToRight}" tabindex="-1"></span>
  <span id="${nameMaximum}" class="${nameMaximum}-${OrientationEnum.LeftToRight}" tabindex="-1"></span>
  <span id="${nameDotContainer}" class="${nameDotContainer}-${OrientationEnum.LeftToRight}" tabindex="-1"></span>
  <span id="${nameThumb}" class="${nameThumb}-${OrientationEnum.LeftToRight}" tabindex="-1">
    <span class="thumb-center-dot" tabindex="-1"></span>
  </span>
</div>
<style>
:host {
  ${propertyTrackColor}: var(--${webComponentName}-track-color, #a8bec9);
  ${propertyProgressColor}: var(--${webComponentName}-progress-color, #0079c9);
  ${propertyThumbDiameter}: var(--${webComponentName}-thumb-diameter, 20px);
  ${propertyThumbPosition}: 0px;
  --${webComponentName}-private-thumb-color: var(--${webComponentName}-thumb-color, #ffffff);
  --${webComponentName}-private-track-width: var(--${webComponentName}-track-width, 4px);
  --${webComponentName}-private-track-offset: calc(calc(100% - var(--${webComponentName}-private-track-width)) / 2);
  --${webComponentName}-private-thumb-stroke: calc(var(--${webComponentName}-private-track-width) / 2);
  --${webComponentName}-private-thumb-radius: calc(var(${propertyThumbDiameter}) / 2);
  --${webComponentName}-private-thumb-offset: calc(calc(100% - var(${propertyThumbDiameter})) / 2);
  --${webComponentName}-private-dot-diameter: calc(var(--${webComponentName}-private-track-width) * 2);
  --${webComponentName}-private-minimum-width: calc(var(${propertyThumbDiameter}) + var(--${webComponentName}-private-dot-diameter));
  --${webComponentName}-private-dot-container-offset-front-side: calc(calc(var(${propertyThumbDiameter}) - var(--${webComponentName}-private-dot-diameter)) / 2);
  --${webComponentName}-private-dot-container-offset-long-side: calc(calc(100% - var(--${webComponentName}-private-dot-diameter)) / 2);
  all: initial;
  touch-action: none;
  display: inline-block;
  ${propertyMinimumWidth}: ${minimumWidth};
  ${propertyMinimumHeight}: ${minimumHeight};
  ${propertyWidth}: ${initialWidth};
  ${propertyHeight}: ${initialHeight};
}

.${nameTrack}-${OrientationEnum.LeftToRight},
.${nameTrack}-${OrientationEnum.RightToLeft},
.${nameTrack}-${OrientationEnum.TopToBottom},
.${nameTrack}-${OrientationEnum.BottomToTop} {
  touch-action: none;
  position: relative;
  width: 100%;
  height: 100%;
}

.${nameTrack}-${OrientationEnum.LeftToRight},
.${nameTrack}-${OrientationEnum.RightToLeft} {
  ${propertyMinimumWidth}: ${minimumWidth};
  ${propertyMinimumHeight}: ${minimumHeight};
}

.${nameTrack}-${OrientationEnum.TopToBottom},
.${nameTrack}-${OrientationEnum.BottomToTop} {
  ${propertyMinimumWidth}: ${minimumHeight};
  ${propertyMinimumHeight}: ${minimumWidth};
}

.${nameMinimum}-${OrientationEnum.LeftToRight},
.${nameMinimum}-${OrientationEnum.RightToLeft},
.${nameMinimum}-${OrientationEnum.TopToBottom},
.${nameMinimum}-${OrientationEnum.BottomToTop} {
  touch-action: none;
  position: absolute;
  background-color: var(${propertyProgressColor});
}

.${nameMaximum}-${OrientationEnum.LeftToRight},
.${nameMaximum}-${OrientationEnum.RightToLeft},
.${nameMaximum}-${OrientationEnum.TopToBottom},
.${nameMaximum}-${OrientationEnum.BottomToTop} {
  touch-action: none;
  position: absolute;
  background-color: var(${propertyTrackColor});
}

.${nameMinimum}-${OrientationEnum.LeftToRight},
.${nameMaximum}-${OrientationEnum.RightToLeft} {
  top: var(--${webComponentName}-private-track-offset);
  left: var(--${webComponentName}-private-thumb-radius);
  width: var(${propertyThumbPosition});
  height: var(--${webComponentName}-private-track-width);
}

.${nameMinimum}-${OrientationEnum.RightToLeft},
.${nameMaximum}-${OrientationEnum.LeftToRight} {
  top: var(--${webComponentName}-private-track-offset);
  left: calc(var(${propertyThumbPosition}) + var(--${webComponentName}-private-thumb-radius));
  right: var(--${webComponentName}-private-thumb-radius);
  height: var(--${webComponentName}-private-track-width);
}

.${nameMinimum}-${OrientationEnum.TopToBottom},
.${nameMaximum}-${OrientationEnum.BottomToTop} {
  top: var(--${webComponentName}-private-thumb-radius);
  left: var(--${webComponentName}-private-track-offset);
  width: var(--${webComponentName}-private-track-width);
  height: var(${propertyThumbPosition});
}

.${nameMinimum}-${OrientationEnum.BottomToTop},
.${nameMaximum}-${OrientationEnum.TopToBottom} {
  top: calc(var(${propertyThumbPosition}) + var(--${webComponentName}-private-thumb-radius));
  left: var(--${webComponentName}-private-track-offset);
  width: var(--${webComponentName}-private-track-width);
  bottom: var(--${webComponentName}-private-thumb-radius);
}

.${nameDotContainer}-${OrientationEnum.LeftToRight},
.${nameDotContainer}-${OrientationEnum.RightToLeft},
.${nameDotContainer}-${OrientationEnum.TopToBottom},
.${nameDotContainer}-${OrientationEnum.BottomToTop} {
  touch-action: none;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.${nameDotContainer}-${OrientationEnum.LeftToRight},
.${nameDotContainer}-${OrientationEnum.RightToLeft} {
  top: var(--${webComponentName}-private-dot-container-offset-long-side);
  left: var(--${webComponentName}-private-dot-container-offset-front-side);
  right: var(--${webComponentName}-private-dot-container-offset-front-side);
  bottom: var(--${webComponentName}-private-dot-container-offset-long-side);
}

.${nameDotContainer}-${OrientationEnum.TopToBottom},
.${nameDotContainer}-${OrientationEnum.BottomToTop} {
  top: var(--${webComponentName}-private-dot-container-offset-front-side);
  left: var(--${webComponentName}-private-dot-container-offset-long-side);
  right: var(--${webComponentName}-private-dot-container-offset-long-side);
  bottom: var(--${webComponentName}-private-dot-container-offset-front-side);
}

.${nameDotContainer}-${OrientationEnum.LeftToRight} {
  flex-direction: row;
}

.${nameDotContainer}-${OrientationEnum.RightToLeft} {
  flex-direction: row-reverse;
}

.${nameDotContainer}-${OrientationEnum.TopToBottom} {
  flex-direction: column;
}

.${nameDotContainer}-${OrientationEnum.BottomToTop} {
  flex-direction: column-reverse;
}

.${nameDot} {
  touch-action: none;
  width: var(--${webComponentName}-private-dot-diameter);
  height: var(--${webComponentName}-private-dot-diameter);
  border-radius: 50%;
}

.${nameThumb}-${OrientationEnum.LeftToRight},
.${nameThumb}-${OrientationEnum.RightToLeft},
.${nameThumb}-${OrientationEnum.TopToBottom},
.${nameThumb}-${OrientationEnum.BottomToTop} {
  touch-action: none;
  position: absolute;
  width: var(${propertyThumbDiameter});
  height: var(${propertyThumbDiameter});
  border-radius: 50%;
  border: var(--${webComponentName}-private-thumb-stroke) solid var(${propertyProgressColor});
  box-sizing: border-box;
  background-color: var(--${webComponentName}-private-thumb-color);
  display: flex;
  align-items: center;
  justify-content: center;
}

.${nameThumb}-${OrientationEnum.LeftToRight},
.${nameThumb}-${OrientationEnum.RightToLeft} {
  top: var(--${webComponentName}-private-thumb-offset);
  left: var(${propertyThumbPosition});
}

.${nameThumb}-${OrientationEnum.TopToBottom},
.${nameThumb}-${OrientationEnum.BottomToTop} {
  top: var(${propertyThumbPosition});
  left: var(--${webComponentName}-private-thumb-offset);
}

.thumb-center-dot {
  touch-action: none;
  width: var(--${webComponentName}-private-dot-diameter);
  height: var(--${webComponentName}-private-dot-diameter);
  border-radius: 50%;
  background-color: var(${propertyProgressColor});
}

.${nameTrack}-${OrientationEnum.LeftToRight}:focus,
.${nameTrack}-${OrientationEnum.RightToLeft}:focus,
.${nameTrack}-${OrientationEnum.TopToBottom}:focus,
.${nameTrack}-${OrientationEnum.BottomToTop}:focus,
.${nameMinimum}-${OrientationEnum.LeftToRight}:focus,
.${nameMinimum}-${OrientationEnum.RightToLeft}:focus,
.${nameMinimum}-${OrientationEnum.TopToBottom}:focus,
.${nameMinimum}-${OrientationEnum.BottomToTop}:focus,
.${nameMaximum}-${OrientationEnum.LeftToRight}:focus,
.${nameMaximum}-${OrientationEnum.RightToLeft}:focus,
.${nameMaximum}-${OrientationEnum.TopToBottom}:focus,
.${nameMaximum}-${OrientationEnum.BottomToTop}:focus,
.${nameDotContainer}-${OrientationEnum.LeftToRight}:focus,
.${nameDotContainer}-${OrientationEnum.RightToLeft}:focus,
.${nameDotContainer}-${OrientationEnum.TopToBottom}:focus,
.${nameDotContainer}-${OrientationEnum.BottomToTop}:focus,
.${nameDot}:focus,
.${nameThumb}-${OrientationEnum.LeftToRight}:focus,
.${nameThumb}-${OrientationEnum.RightToLeft}:focus,
.${nameThumb}-${OrientationEnum.TopToBottom}:focus,
.${nameThumb}-${OrientationEnum.BottomToTop}:focus,
.thumb-center-dot:focus {
  outline: none;
}

.${nameTrack}-${OrientationEnum.LeftToRight}:focus-visible,
.${nameTrack}-${OrientationEnum.RightToLeft}:focus-visible,
.${nameTrack}-${OrientationEnum.TopToBottom}:focus-visible,
.${nameTrack}-${OrientationEnum.BottomToTop}:focus-visible {
  outline: 5px auto Highlight;
  outline: 5px auto -webkit-focus-ring-color;
}
</style>
`;

export default class SummbitDiscreteSlider extends HTMLElement {
  #minimum;
  #maximum;
  #value;
  #startValue;
  #orientation;
  #trackElement;
  #minimumElement;
  #maximumElement;
  #dotContainerElement;
  #thumbElement;
  #resizeObserver;
  #keysToIncrement;
  #keysToDecrement;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.#minimum             = Number.NaN;
    this.#maximum             = Number.NaN;
    this.#value               = 0;
    this.#startValue          = 0;
    this.#orientation         = OrientationEnum.LeftToRight;
    this.#trackElement        = this.shadowRoot.getElementById(nameTrack);
    this.#minimumElement      = this.shadowRoot.getElementById(nameMinimum);
    this.#maximumElement      = this.shadowRoot.getElementById(nameMaximum);
    this.#dotContainerElement = this.shadowRoot.getElementById(nameDotContainer);
    this.#thumbElement        = this.shadowRoot.getElementById(nameThumb);
    this.#resizeObserver      = new ResizeObserver(this.#resizeHandler.bind(this));
    this.#keysToIncrement     = keyGroup1;
    this.#keysToDecrement     = keyGroup4;
    this.ondragstart          = () => false;
    this.addEventListener("pointerdown", this.#pointerDownHandler.bind(this));
    this.addEventListener("keydown", this.#keyDownHandler.bind(this));
  }

  static get observedAttributes() {
    return [nameMinimum, nameMaximum, nameValue, nameOrientation];
  }

  attributeChangedCallback(attributeName, oldValue, newValue) {
    if(newValue !== null) {
      switch(attributeName) {
        case nameMinimum:
          this.#minimum = parseInt(newValue, 10);
          this.#createAllDots();
          this.#updateThumbPosition();
          this.#restrictValueToMinimum();
          break;
        case nameMaximum:
          this.#maximum = parseInt(newValue, 10);
          this.#createAllDots();
          this.#updateThumbPosition();
          this.#restrictValueToMaximum();
          break;
        case nameValue:
          this.#value = this.#clampValue(parseInt(newValue, 10));
          this.#createAllDots();
          this.#updateThumbPosition();
          this.#updateDotColorsAndValues();
          break;
        case nameOrientation:
          this.#orientation = newValue;
          this.#assignIncrementAndDecrementKeys();
          this.#updateMinimumSize();
          this.#updateElementStyle();
          this.#createAllDots();
          this.#updateThumbPosition();
          this.#updateDotColorsAndValues();
          break;
      }
    }
  }

  connectedCallback() {
    this.#updateMinimumSize();
    this.#createAllDots();
    this.#updateDotColorsAndValues();
    this.#resizeObserver.observe(this, { box: "content-box" });
  }

  set [nameMinimum](value) {
    this.setAttribute(nameMinimum, value);
  }

  get [nameMinimum]() {
    return this.#minimum;
  }

  set [nameMaximum](value) {
    this.setAttribute(nameMaximum, value);
  }

  get [nameMaximum]() {
    return this.#maximum;
  }

  set [nameValue](value) {
    this.setAttribute(nameValue, this.#clampValue(value));
  }

  get [nameValue]() {
    return this.#value;
  }

  set [nameOrientation](value) {
    this.setAttribute(nameOrientation, value);
  }

  get [nameOrientation]() {
    return this.#orientation;
  }

  static get Orientation() {
    return OrientationEnum;
  }

  #resizeHandler(entries) {
    this.#updateThumbPosition();
  }

  #pointerDownHandler(event) {
    this.setPointerCapture(event.pointerId);
    this.onpointermove   = this.#pointerMoveHandler.bind(this);
    this.onpointerup     = this.#pointerUpHandler.bind(this);
    this.onpointercancel = this.#pointerUpHandler.bind(this);
    this.#startValue     = this.#value;
    this.#updateValue(event);
  }

  #pointerMoveHandler(event) {
    this.#updateValue(event);
  }

  #pointerUpHandler(event) {
    this.onpointermove   = null;
    this.onpointerup     = null;
    this.onpointercancel = null;
    if(this.#startValue != this.#value) {
      this.#dispatchChangeEvent();
    }
  }

  #keyDownHandler(event) {
    if(this.#keysToIncrement.includes(event.code)) {
      event.preventDefault();
      this.#incrementValue();
    } else if(this.#keysToDecrement.includes(event.code)) {
      event.preventDefault();
      this.#decrementValue();
    } else if(keysToSetToMinimum.includes(event.code)) {
      event.preventDefault();
      this.#setValueToMinimum();
    } else if(keysToSetToMaximum.includes(event.code)) {
      event.preventDefault();
      this.#setValueToMaximum();
    }
  }

  #createAllDots() {
    this.#initializeLimits();
    const currentDotCount  = this.#dotContainerElement.childElementCount;
    const requiredDotCount = this.#maximum - this.#minimum + 1;
    if(currentDotCount != requiredDotCount) {
      const dots = document.createDocumentFragment();
      for(let i = 0; i < requiredDotCount; i++) {
        dots.appendChild(this.#createDot());
      }
      this.#dotContainerElement.replaceChildren(dots);
      this.#updateDotColorsAndValues();
    }
  }

  #initializeLimits() {
    if(isNaN(this.#minimum)) {
      this.#minimum = initialMinimum;
    }
    if(isNaN(this.#maximum)) {
      this.#maximum = initialMaximum;
    }
  }

  #createDot() {
    const dot     = document.createElement("span");
    dot.className = nameDot;
    dot.tabIndex  = -1;
    return dot;
  }

  #updateDotColorsAndValues() {
    const computedStyle = window.getComputedStyle(this);
    const progressColor = computedStyle.getPropertyValue(propertyProgressColor);
    const trackColor    = computedStyle.getPropertyValue(propertyTrackColor);
    for(let i = 0, dot, value; i < this.#dotContainerElement.children.length; i++) {
      value                     = i + this.#minimum;
      dot                       = this.#dotContainerElement.children[i];
      dot.dataset.value         = value;
      dot.style.backgroundColor = value > this.#value ? trackColor : progressColor;
    }
  }

  #updateThumbPosition() {
    if(this.shadowRoot.styleSheets.length > 0) {
      for(const dot of this.#dotContainerElement.children) {
        if(dot.dataset.value == this.#value) {
          const hostStyle = this.shadowRoot.styleSheets[0].cssRules[0].style;
          switch(this.#orientation) {
            case OrientationEnum.LeftToRight:
            case OrientationEnum.RightToLeft:
              hostStyle.setProperty(propertyThumbPosition, `${dot.offsetLeft}px`, "");
              return;
            case OrientationEnum.TopToBottom:
            case OrientationEnum.BottomToTop:
              hostStyle.setProperty(propertyThumbPosition, `${dot.offsetTop}px`, "");
              return;
          }
        }
      }
    }
  }

  #clampValue(value) {
    if(!isNaN(this.#minimum) && value < this.#minimum) {
      return this.#minimum;
    } else if(!isNaN(this.#maximum) && value > this.#maximum) {
      return this.#maximum;
    }
    return value;
  }

  #restrictValueToMinimum() {
    if(this.#value < this.#minimum) {
      this[nameValue] = this.#minimum;
    }
  }

  #restrictValueToMaximum() {
    if(this.#value > this.#maximum) {
      this[nameValue] = this.#maximum;
    }
  }

  #incrementValue() {
    if(this.#value < this.#maximum) {
      this[nameValue]++;
      this.#dispatchInputEvent();
      this.#dispatchChangeEvent();
    }
  }

  #decrementValue() {
    if(this.#value > this.#minimum) {
      this[nameValue]--;
      this.#dispatchInputEvent();
      this.#dispatchChangeEvent();
    }
  }

  #setValueToMinimum() {
    if(this.#value != this.#minimum) {
      this[nameValue] = this.#minimum;
      this.#dispatchInputEvent();
      this.#dispatchChangeEvent();
    }
  }

  #setValueToMaximum() {
    if(this.#value != this.#maximum) {
      this[nameValue] = this.#maximum;
      this.#dispatchInputEvent();
      this.#dispatchChangeEvent();
    }
  }

  #updateValue(event) {
    const index = Math.round(this.#calculateProgress(event) * (this.#maximum - this.#minimum));
    const value = parseInt(this.#dotContainerElement.children[index].dataset.value, 10);
    if(this.#value != value) {
      this[nameValue] = value;
      this.#dispatchInputEvent();
    }
  }

  #calculateProgress(event) {
    const computedStyle = window.getComputedStyle(this);
    const paddingLeft   = parseFloat(computedStyle.getPropertyValue("padding-left"));
    const paddingTop    = parseFloat(computedStyle.getPropertyValue("padding-top"));
    const thumbDiameter = parseFloat(computedStyle.getPropertyValue(propertyThumbDiameter));
    const thumbRadius   = thumbDiameter / 2;
    let trackLength, position;
    switch(this.#orientation) {
      case OrientationEnum.LeftToRight:
        trackLength = parseFloat(computedStyle.getPropertyValue("width")) - thumbDiameter;
        position    = event.offsetX - paddingLeft - thumbRadius;
        break;
      case OrientationEnum.RightToLeft:
        trackLength = parseFloat(computedStyle.getPropertyValue("width")) - thumbDiameter;
        position    = trackLength - (event.offsetX - paddingLeft - thumbRadius);
        break;
      case OrientationEnum.TopToBottom:
        trackLength = parseFloat(computedStyle.getPropertyValue("height")) - thumbDiameter;
        position    = event.offsetY - paddingTop - thumbRadius;
        break;
      case OrientationEnum.BottomToTop:
        trackLength = parseFloat(computedStyle.getPropertyValue("height")) - thumbDiameter;
        position    = trackLength - (event.offsetY - paddingTop - thumbRadius);
        break;
    }
    return Math.min(Math.max(position, 0), trackLength) / trackLength;
  }

  #assignIncrementAndDecrementKeys() {
    switch(this.#orientation) {
      case OrientationEnum.LeftToRight:
      case OrientationEnum.BottomToTop:
        this.#keysToIncrement = keyGroup1;
        this.#keysToDecrement = keyGroup4;
        break;
      case OrientationEnum.RightToLeft:
        this.#keysToIncrement = keyGroup2;
        this.#keysToDecrement = keyGroup3;
        break;
      case OrientationEnum.TopToBottom:
        this.#keysToIncrement = keyGroup3;
        this.#keysToDecrement = keyGroup2;
        break;
    }
  }

  #updateMinimumSize() {
    if(this.shadowRoot.styleSheets.length > 0) {
      const hostStyle = this.shadowRoot.styleSheets[0].cssRules[0].style;
      switch(this.#orientation) {
        case OrientationEnum.LeftToRight:
        case OrientationEnum.RightToLeft:
          hostStyle.setProperty(propertyMinimumWidth, minimumWidth);
          hostStyle.setProperty(propertyMinimumHeight, minimumHeight);
          hostStyle.setProperty(propertyWidth, initialWidth);
          hostStyle.setProperty(propertyHeight, initialHeight);
          break;
        case OrientationEnum.TopToBottom:
        case OrientationEnum.BottomToTop:
          hostStyle.setProperty(propertyMinimumWidth, minimumHeight);
          hostStyle.setProperty(propertyMinimumHeight, minimumWidth);
          hostStyle.setProperty(propertyWidth, initialHeight);
          hostStyle.setProperty(propertyHeight, initialWidth);
          break;
      }
    }
  }

  #updateElementStyle() {
    this.#trackElement       .className = `${nameTrack}-${this.#orientation}`;
    this.#minimumElement     .className = `${nameMinimum}-${this.#orientation}`;
    this.#maximumElement     .className = `${nameMaximum}-${this.#orientation}`;
    this.#dotContainerElement.className = `${nameDotContainer}-${this.#orientation}`;
    this.#thumbElement       .className = `${nameThumb}-${this.#orientation}`;
  }

  #dispatchInputEvent() {
    this.shadowRoot.dispatchEvent(new CustomEvent("input", { bubbles: true, composed: true, detail: { value: this.#value }}));
  }

  #dispatchChangeEvent() {
    this.shadowRoot.dispatchEvent(new CustomEvent("change", { bubbles: true, composed: true, detail: { value: this.#value }}));
  }
}

if(!customElements.get(webComponentName)) {
  customElements.define(webComponentName, SummbitDiscreteSlider);
}
