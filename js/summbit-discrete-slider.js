export const OrientationEnum = Object.freeze({
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
const initialMinimum        = 0;
const initialMaximum        = 5;
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
  --${webComponentName}-private-dot-container-offset-front-side: calc(calc(var(${propertyThumbDiameter}) - var(--${webComponentName}-private-dot-diameter)) / 2);
  --${webComponentName}-private-dot-container-offset-long-side: calc(calc(100% - var(--${webComponentName}-private-dot-diameter)) / 2);
  all: initial;
  touch-action: none;
  display: inline-block;
  padding: 0;
  margin: 0;
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
  min-width: 150px;
  min-height: var(${propertyThumbDiameter});
}

.${nameTrack}-${OrientationEnum.TopToBottom},
.${nameTrack}-${OrientationEnum.BottomToTop} {
  min-height: 150px;
  min-width: var(${propertyThumbDiameter});
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
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this._minimum             = Number.NaN;
    this._maximum             = Number.NaN;
    this._value               = 0;
    this._startValue          = 0;
    this._orientation         = OrientationEnum.LeftToRight;
    this._trackElement        = this.shadowRoot.getElementById(nameTrack);
    this._minimumElement      = this.shadowRoot.getElementById(nameMinimum);
    this._maximumElement      = this.shadowRoot.getElementById(nameMaximum);
    this._dotContainerElement = this.shadowRoot.getElementById(nameDotContainer);
    this._thumbElement        = this.shadowRoot.getElementById(nameThumb);
    this._hostStyle           = this.shadowRoot.styleSheets[0].rules[0].style;
    this._resizeObserver      = new ResizeObserver(this._resizeHandler.bind(this));
    this._keysToIncrement     = keyGroup1;
    this._keysToDecrement     = keyGroup4;
    this.ondragstart          = () => false;
    this.addEventListener("pointerdown", this._pointerDownHandler.bind(this));
    this.addEventListener("keydown", this._keyDownHandler.bind(this));
  }

  static get observedAttributes() {
    return [nameMinimum, nameMaximum, nameValue, nameOrientation];
  }

  attributeChangedCallback(attributeName, oldValue, newValue) {
    if(newValue !== null) {
      switch(attributeName) {
        case nameMinimum:
          this._minimum = parseInt(newValue);
          this._createAllDots();
          this._updateThumbPosition();
          this._restrictValueToMinimum();
          break;
        case nameMaximum:
          this._maximum = parseInt(newValue);
          this._createAllDots();
          this._updateThumbPosition();
          this._restrictValueToMaximum();
          break;
        case nameValue:
          this._value = this._clampValue(parseInt(newValue));
          this._createAllDots();
          this._updateThumbPosition();
          this._updateDotColorsAndValues();
          break;
        case nameOrientation:
          this._orientation = newValue;
          this._assignIncrementAndDecrementKeys();
          this._updateElementStyle();
          this._createAllDots();
          this._updateThumbPosition();
          this._updateDotColorsAndValues();
          break;
      }
    }
  }

  connectedCallback() {
    this._createAllDots();
    this._resizeObserver.observe(this, { box: "content-box" });
  }

  set [nameMinimum](value) {
    this.setAttribute(nameMinimum, value);
  }

  get [nameMinimum]() {
    return this._minimum;
  }

  set [nameMaximum](value) {
    this.setAttribute(nameMaximum, value);
  }

  get [nameMaximum]() {
    return this._maximum;
  }

  set [nameValue](value) {
    this.setAttribute(nameValue, this._clampValue(value));
  }

  get [nameValue]() {
    return this._value;
  }

  set [nameOrientation](value) {
    this.setAttribute(nameOrientation, value);
  }

  get [nameOrientation]() {
    return this._orientation;
  }

  _resizeHandler(entries) {
    this._updateThumbPosition();
  }

  _pointerDownHandler(event) {
    this.setPointerCapture(event.pointerId);
    this.onpointermove = this._pointerMoveHandler.bind(this);
    this.onpointerup   = this._pointerUpHandler.bind(this);
    this._startValue   = this._value;
    this._updateValue(event);
  }

  _pointerMoveHandler(event) {
    this._updateValue(event);
  }

  _pointerUpHandler(event) {
    this.onpointermove = null;
    this.onpointerup   = null;
    if(this._startValue != this._value) {
      this._dispatchChangeEvent();
    }
  }

  _keyDownHandler(event) {
    if(this._keysToIncrement.includes(event.code)) {
      event.preventDefault();
      this._incrementValue();
    } else if(this._keysToDecrement.includes(event.code)) {
      event.preventDefault();
      this._decrementValue();
    } else if(keysToSetToMinimum.includes(event.code)) {
      event.preventDefault();
      this._setValueToMinimum();
    } else if(keysToSetToMaximum.includes(event.code)) {
      event.preventDefault();
      this._setValueToMaximum();
    }
  }

  _createAllDots() {
    this._initializeLimits();
    const currentDotCount  = this._dotContainerElement.childElementCount;
    const requiredDotCount = this._maximum - this._minimum + 1;
    if(currentDotCount != requiredDotCount) {
      const dots = document.createDocumentFragment();
      for(let i = 0; i < requiredDotCount; i++) {
        dots.appendChild(this._createDot());
      }
      this._dotContainerElement.replaceChildren(dots);
      this._updateDotColorsAndValues();
    }
  }

  _initializeLimits() {
    if(isNaN(this._minimum)) {
      this._minimum = initialMinimum;
    }
    if(isNaN(this._maximum)) {
      this._maximum = initialMaximum;
    }
  }

  _createDot() {
    const dot     = document.createElement("span");
    dot.className = nameDot;
    dot.tabIndex  = -1;
    return dot;
  }

  _updateDotColorsAndValues() {
    const computedStyle = window.getComputedStyle(this);
    const progressColor = computedStyle.getPropertyValue(propertyProgressColor);
    const trackColor    = computedStyle.getPropertyValue(propertyTrackColor);
    let dot, value;
    for(let i = 0; i < this._dotContainerElement.children.length; i++) {
      value                     = i + this._minimum;
      dot                       = this._dotContainerElement.children[i];
      dot.dataset.value         = value;
      dot.style.backgroundColor = value > this._value ? trackColor : progressColor;
    }
  }

  _updateThumbPosition() {
    for(const dot of this._dotContainerElement.children) {
      if(dot.dataset.value == this._value) {
        switch(this._orientation) {
          case OrientationEnum.LeftToRight:
          case OrientationEnum.RightToLeft:
            this._hostStyle.setProperty(propertyThumbPosition, `${dot.offsetLeft}px`, "");
            return;
          case OrientationEnum.TopToBottom:
          case OrientationEnum.BottomToTop:
            this._hostStyle.setProperty(propertyThumbPosition, `${dot.offsetTop}px`, "");
            return;
        }
      }
    }
  }

  _clampValue(value) {
    if(!isNaN(this._minimum) && value < this._minimum) {
      return this._minimum;
    } else if(!isNaN(this._maximum) && value > this._maximum) {
      return this._maximum;
    }
    return value;
  }

  _restrictValueToMinimum() {
    if(this._value < this._minimum) {
      this[nameValue] = this._minimum;
    }
  }

  _restrictValueToMaximum() {
    if(this._value > this._maximum) {
      this[nameValue] = this._maximum;
    }
  }

  _incrementValue() {
    if(this._value < this._maximum) {
      this[nameValue]++;
      this._dispatchInputEvent();
      this._dispatchChangeEvent();
    }
  }

  _decrementValue() {
    if(this._value > this._minimum) {
      this[nameValue]--;
      this._dispatchInputEvent();
      this._dispatchChangeEvent();
    }
  }

  _setValueToMinimum() {
    if(this._value != this._minimum) {
      this[nameValue] = this._minimum;
      this._dispatchInputEvent();
      this._dispatchChangeEvent();
    }
  }

  _setValueToMaximum() {
    if(this._value != this._maximum) {
      this[nameValue] = this._maximum;
      this._dispatchInputEvent();
      this._dispatchChangeEvent();
    }
  }

  _updateValue(event) {
    const index = Math.round(this._calculateProgress(event) * (this._maximum - this._minimum));
    const value = parseInt(this._dotContainerElement.children[index].dataset.value);
    if(this._value != value) {
      this[nameValue] = value;
      this._dispatchInputEvent();
    }
  }

  _calculateProgress(event) {
    const thumbDiameter = parseFloat(window.getComputedStyle(this).getPropertyValue(propertyThumbDiameter));
    const thumbRadius   = thumbDiameter / 2;
    let trackLength, position;
    switch(this._orientation) {
      case OrientationEnum.LeftToRight:
        trackLength = this._trackElement.offsetWidth - thumbDiameter;
        position    = event.clientX - thumbRadius - this._trackElement.getBoundingClientRect().left;
        break;
      case OrientationEnum.RightToLeft:
        trackLength = this._trackElement.offsetWidth - thumbDiameter;
        position    = this._trackElement.getBoundingClientRect().right - event.clientX - thumbRadius;
        break;
      case OrientationEnum.TopToBottom:
        trackLength = this._trackElement.offsetHeight - thumbDiameter;
        position    = event.clientY - thumbRadius - this._trackElement.getBoundingClientRect().top;
        break;
      case OrientationEnum.BottomToTop:
        trackLength = this._trackElement.offsetHeight - thumbDiameter;
        position    = this._trackElement.getBoundingClientRect().bottom - event.clientY - thumbRadius;
        break;
    }
    return Math.min(Math.max(position, 0), trackLength) / trackLength;
  }

  _assignIncrementAndDecrementKeys() {
    switch(this._orientation) {
      case OrientationEnum.LeftToRight:
      case OrientationEnum.BottomToTop:
        this._keysToIncrement = keyGroup1;
        this._keysToDecrement = keyGroup4;
        break;
      case OrientationEnum.RightToLeft:
        this._keysToIncrement = keyGroup2;
        this._keysToDecrement = keyGroup3;
        break;
      case OrientationEnum.TopToBottom:
        this._keysToIncrement = keyGroup3;
        this._keysToDecrement = keyGroup2;
        break;
    }
  }

  _updateElementStyle() {
    this._trackElement       .className = `${nameTrack}-${this._orientation}`;
    this._minimumElement     .className = `${nameMinimum}-${this._orientation}`;
    this._maximumElement     .className = `${nameMaximum}-${this._orientation}`;
    this._dotContainerElement.className = `${nameDotContainer}-${this._orientation}`;
    this._thumbElement       .className = `${nameThumb}-${this._orientation}`;
  }

  _dispatchInputEvent() {
    this.shadowRoot.dispatchEvent(new CustomEvent("input", { bubbles: true, composed: true, detail: { value: this._value }}));
  }

  _dispatchChangeEvent() {
    this.shadowRoot.dispatchEvent(new CustomEvent("change", { bubbles: true, composed: true, detail: { value: this._value }}));
  }
}

if(!customElements.get(webComponentName)) {
  customElements.define(webComponentName, SummbitDiscreteSlider);
}
