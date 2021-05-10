# `summbit-dark-mode-switch`

## Test page
[`summbit-dark-mode-switch`](https://summbit.github.io/summbit-web-components/test/summbit-dark-mode-switch.html)

## Description
An interactive switch to change between a dark and light theme.

## Usage
````
<script type="module" src="./summbit-dark-mode-switch.js"></script>
<summbit-dark-mode-switch></summbit-dark-mode-switch>
````

The `summbit-dark-mode-switch` dispatches the `change` event whenever it is enabled or disabled.

## Attributes / Properties

|Attribute / Property name|Meaning|Default value|
|-------------------------|------------------------------------------------------|-------------|
|`enabled`                |A `bool` property / attribute that decides whether the dark theme is switched on or not. Just adding that attribute enables the dark mode, i.e. it's value is irrelevant and preferably not set at all.|`false`|

## CSS customization

|CSS property name                          |Effect  |Default value|
|-------------------------------------------|--------|-------------|
|`width`                                    |Defines the width of the switch. Note that the width cannot be smaller than `48px` and it is enforced that it is at least twice the `height`.|`48px`|
|`height`                                   |Defines the height of the switch. Note that the height cannot be smaller than `24px`.|`24px`|
|`--summbit-dark-mode-switch-duration`      |The duration of the animation that plays if the switch is enabled or disabled.| `0.2s`|
|`--summbit-dark-mode-switch-interpolation` |The [interpolation](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-timing-function) of the animation that plays if the switch is enabled or disabled.|`cubic-bezier(0.66, 0, 0.33, 1)`|
| `--summbit-dark-mode-switch-light-color`  |The color that is used for the background of the switch if it is disabled and for the foreground of it if it is enabled.|`#f7f9fb`|
| `--summbit-dark-mode-switch-dark-color`   |The color that is used for the foreground of the switch if it is disabled and for the background of it if it is enabled.|`#1b1c1d`|

## Examples
- `<summbit-dark-mode-switch></summbit-dark-mode-switch>`
- `<summbit-dark-mode-switch enabled></summbit-dark-mode-switch>`
- `<summbit-dark-mode-switch enabled=""></summbit-dark-mode-switch>`
- `<summbit-dark-mode-switch onchange="changeEventListener(event);"></summbit-dark-mode-switch>`
- `<summbit-dark-mode-switch enabled onchange="changeEventListener(event);"></summbit-dark-mode-switch>`
