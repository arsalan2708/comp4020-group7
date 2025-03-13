const LONG_PRESS_TIMER = 500; //ms
// call back function for handling the long press of a HTMLELEMENT
export function onLongPress(elem, handleLongPress) {
    // set time out for long press
    let longPressTimeout;
    elem.addEventListener("touchstart", touchStartCallback);
    function touchStartCallback() {
        longPressTimeout = setTimeout(() => {
            console.log("long pressed");
            handleLongPress();
        }, LONG_PRESS_TIMER); // 500ms long press
    }
    // Clean up if the user lifts the finger or moves off the item
    document.addEventListener("touchmove", () => clearTimeout(longPressTimeout));
    document.addEventListener("touchend", () => clearTimeout(longPressTimeout));
    document.addEventListener("touchcancel", () => clearTimeout(longPressTimeout));
}
