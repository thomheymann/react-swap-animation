# React Swap Animation

Swap animation for React. Useful to smoothly swap blocks of content with varying heights. 

Note: Due to the nature of the effect `SwapAnimation` only animates a single child. If you want to animate items in a list use [react-slide-animation](https://github.com/cyberthom/react-slide-animation) instead. 


## Installation

```
npm install --save react-swap-animation
```


## Usage

```JavaScript
import SwapAnimation from 'react-swap-animation';

const Message = ({ message }) => (
    <SwapAnimation animationEnterTimeout={300} animationLeaveTimeout={300}>
        {!message ? <Spinner key="spinner" /> : <Text key="message">{message}</Text>}
    </SwapAnimation>
);

export default Message;
```



## Build

Import styles using [PostCSS Import Plugin](https://github.com/postcss/postcss-import) (e.g. in your `main.css`):

```CSS
@import "react-swap-animation";
```

Or manually add `react-swap-animation/lib/index.css` to your webpack entry config.


## Reference

* `children` - **Required.** Single child that animates when swapped. 

    **You must provide the `key` attribute for all children of `SwapAnimation`.** This is how React determines which child has entered, left, or stayed.

* `animationEnterTimeout` - **Required.** Duration of transition for child entering.

* `animationLeaveTimeout` - **Required.** Duration of transition for child leaving.

* `component` - Component used for rendering. *(default: 'div')*

    Can be a string (DOM component) or any user defined component:

    ```
    <SwapAnimation component={CustomContainer}>
        {/* ... */}
    </SwapAnimation>
    ```

    Additional properties to `SwapAnimation` will become properties of the rendered component:

    ```
    <SwapAnimation className="example" style={{ border: '1px solid black' }}>
        {/* ... */}
    </SwapAnimation>
    ```

* `animationName` - Prefix used to construct CSS class names. *(default: 'swap-animation')*

    Can be used to create custom animation effects:

    - `{animationName}` - Applied to container when child is swapped
    - `{animationName}-active` - Applied to container on next tick
    - `{animationName}-enter` - Applied to entering child during swap
    - `{animationName}-enter-active` - Applied to entering child on next tick
    - `{animationName}-leave` - Applied to leaving child during swap
    - `{animationName}-leave-active` - Applied to leaving child on next tick
