# `summbit-discrete-slider`

## Test page
[`summbit-discrete-slider`](https://summbit.github.io/summbit-web-components/test/summbit-discrete-slider.html)

## Description
Comparable to the standard HTML range input element but designed to look the same in all web browsers. It can be configured to scroll from left to right, right to left, top to bottom and bottom to top. Visually, it clearly indicates the values that it can be set to which is where it derives its name from.

## Usage
````
<script type="module" src="./summbit-discrete-slider.js"></script>
<summbit-discrete-slider min="0" max="7" value="3" orientation="left-to-right"></summbit-discrete-slider>
````

The `summbit-discrete-slider` dispatches both the `input` and the `change` event just like the standard HTML range input element and both the `oninput` and `onchange` attributes / properties work the same way.

## Attributes / Properties
|Attribute / Property name|Meaning                                               |Default value|
|-------------------------|------------------------------------------------------|-------------|
|`min`                    |The minimum permitted value                           |0            |
|`max`                    |The maximum permitted value                           |5            |
|`value`                  |A positive or negative integer between `min` and `max`|0            |
|`orientation`            |`left-to-right`: `min` is on the left, `max` is on the right<br>`right-to-left`: `max` is on the left, `min` is on the right<br>`top-to-bottom`: `min` is at the top, `max` is at the bottom<br>`bottom-to-top`: `min` is at the bottom, `max` is at the top<br>In JavaScript, the below constants are available to set the value of this property.<br>`import SummbitDiscreteSlider from "./summbit-discrete-slider.js";`<br>`SummbitDiscreteSlider.Orientation.LeftToRight`<br>`SummbitDiscreteSlider.Orientation.RightToLeft`<br>`SummbitDiscreteSlider.Orientation.TopToBottom`<br>`SummbitDiscreteSlider.Orientation.BottomToTop`|`left-to-right`|

## CSS customization

|CSS property name                         |Effect  |Default value|
|------------------------------------------|--------|-------------|
|`width`                                   |For `orientation` `left-to-right` and `right-to-left` this is the length of the slider. For `orientation` `top-to-bottom` and `bottom-to-top` this is the overall thickness of the entire element.|Not set but for `orientation` `left-to-right` and `right-to-left` `min-width` is set to `150px` and for `orientation` `top-to-bottom` and `bottom-to-top` `min-width` is set to `--summbit-discrete-slider-thumb-diameter`.|
|`height`                                  |For `orientation` `top-to-bottom` and `bottom-to-top` this is the length of the slider. For `orientation` `left-to-right` and `right-to-left` this is the overall thickness of the entire element.|Not set but for `top-to-bottom` and `bottom-to-top` `min-width` is set to `150px` and for `orientation` `orientation` `left-to-right` and `right-to-left` `min-width` is set to `--summbit-discrete-slider-thumb-diameter`.|
|`background-color`                        |If set, fills the entire element with this background color|Not set|
|`--summbit-discrete-slider-track-color`   |The color of the track spanning from `max` to `value`      |#a8bec9|
|`--summbit-discrete-slider-track-width`   |The thickness of the track                                 |4px    |
|`--summbit-discrete-slider-thumb-color`   |The fill color of the thumb                                |#ffffff|
|`--summbit-discrete-slider-thumb-diameter`|The outer diameter of the thumb                            |20px   |
|`--summbit-discrete-slider-progress-color`|The color of the track spanning from `min` to `value`      |#0079c9|

## Examples
- `<summbit-discrete-slider></summbit-discrete-slider>`
- `<summbit-discrete-slider value="2"></summbit-discrete-slider>`
- `<summbit-discrete-slider min="-4" max="2" value="-2" orientation="top-to-bottom"></summbit-discrete-slider>`
- `<summbit-discrete-slider min="0" max="50" value="0" orientation="left-to-right" oninput="inputEventListener(event);" onchange="changeEventListener(event);"></summbit-discrete-slider>`
