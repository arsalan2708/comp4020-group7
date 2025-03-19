import { addClasses } from "./addClasses.js";
let touchDirection; //direction of movememnt
let startX; //starting X position
let startY; //starting Y position
const Y_OFFSET = 50; //offset before movement is registered as vertical
const X_OFFSET = 10; //offset before movement is registered as horizontal
const RECURRING_OFFSET = 0.25; //% offset to register swipe as a recurring item
let maxSwipe; //max swipe distance
export function onTouchStart(e) {
    // get the start position of the touch event
    const touch = e.touches[0];
    startX = touch.clientX; // X coordinate relative to the viewport
    startY = touch.clientY;
    maxSwipe = e.currentTarget.offsetWidth * 0.25; // 25% of item width
}
/**
 * touch mouve event call back
 * @param e touch event
 * @param container item to be moved
 */
export function onTouchMove(e, container, swipeEnabled = false) {
    // to calculate width of item when being dragged
    const pageWrapper = document.querySelector(".page-wrapper");
    if (!pageWrapper)
        return;
    // X and Y coordinate of touch
    const topPosition = e.changedTouches[0].pageY - document.documentElement.scrollTop;
    const leftPosition = e.changedTouches[0].pageX;
    // container for swipe background
    const swipebackground = document.createElement("div");
    // if touch movement passes threshold enable vertical/horizontal, once for every element until touch end/cancel
    if (!touchDirection && Math.abs(startY - topPosition) > Y_OFFSET) {
        touchDirection = "vertical";
    }
    else if (swipeEnabled &&
        !touchDirection &&
        Math.abs(startX - leftPosition) > X_OFFSET) {
        touchDirection = "horizontal";
        // add background for swipe
        const draggedItemRect = container.getBoundingClientRect();
        swipebackground.style.top = draggedItemRect.top + "px";
        swipebackground.style.left = draggedItemRect.left + "px";
        swipebackground.style.width = draggedItemRect.width + "px";
        swipebackground.style.height = draggedItemRect.height + "px";
        addClasses(swipebackground, "item__swipeBckg", "border-radius");
        // add icon
        const swipeIcon = document.createElement("p");
        swipeIcon.innerText = "⭐";
        addClasses(swipeIcon, "item_swipeIcon", "display-row", "align--center", "text-xl");
        // add icon to background and add bacground to page
        swipebackground.append(swipeIcon);
        pageWrapper.append(swipebackground);
    }
    // perform verical movement
    if (touchDirection === "vertical") {
        // sort movement - move the current target with these
        container.style.position = "fixed";
        container.style.top = topPosition + "px";
        container.style.left = "50%";
        container.style.transform = "translateY(-50%) translateX(-50%)";
    }
    else if (touchDirection === "horizontal") {
        // swipe gesture
        container.style.position = "relative";
        // current X coordinate
        let currentX = leftPosition - startX;
        // Limit swipe within 25% of width
        if (currentX > maxSwipe)
            currentX = maxSwipe;
        if (currentX < 0)
            currentX = 0; // Optional: Prevent left swipe
        container.style.transform = `translateX(${currentX}px)`;
    }
    // overlapped items enlarged
    if (touchDirection === "vertical") {
        // get all items from list
        const selector = ".item";
        const listItemsArray = Array.from(document.querySelectorAll(selector));
        // find overlapped item
        const overlappedItem = listItemsArray
            .filter((element) => element.id !== container.id)
            .find((element) => isOverlapping(container, element));
        // first time an item overlaps, apply overlapping styles
        overlappedItem &&
            !overlappedItem.classList.contains("item--overlapped") &&
            addClasses(overlappedItem, "item--overlapped");
        // for all other items appart from dragged item and overlapped item,
        // remove overlapped styling if applied previusly
        listItemsArray
            .filter((element) => element.id !== container.id)
            .filter((element) => overlappedItem ? element.id !== overlappedItem.id : true)
            .forEach((element) => {
            element.classList.contains("item--overlapped") &&
                element.classList.remove("item--overlapped");
        });
    }
    if (touchDirection) {
        container.style.backgroundColor = "white";
        container.style.zIndex = "1";
        container.style.touchAction = "none";
        container.style.width =
            pageWrapper.getBoundingClientRect().width * 0.9 + "px";
    }
}
// how do i get the element to move by the distance moved during the on move without the element jumping or snapping to the point of contact.
// basically, when i move an element, say a rectangle from its right most part, the entire rectangle jumps so that the right side is now the point of contact and movements happen in relationto that. i want the element to stay in its current position but still move by the distance moved
/**
 * touch end call back. swap overlapping item or place at top or buttom respectively depending on
 * if item is placed above or below all other items
 * @param e touch event
 * @param container item being moved
 * @param itemID ID for item beingg moved
 */
export function onTouchEnd(e, container, itemID, isInitList, list) {
    // constants
    const isInitList_ = isInitList || false;
    const selector = isInitList_ ? ".initList__container" : ".item";
    const listElement = document.querySelector(".page-wrapper__list");
    const listItemsArray = Array.from(document.querySelectorAll(selector));
    const firstItem = listItemsArray[0];
    const lastItem = listItemsArray[listItemsArray.length - 1];
    // find overlapped item
    const overlappedItem = listItemsArray
        .filter((element) => element.id !== itemID)
        .find((element) => isOverlapping(container, element));
    if (touchDirection === "vertical") {
        if (overlappedItem) {
            // insert before the overlapping item
            listElement && listElement.insertBefore(container, overlappedItem);
            overlappedItem.classList.remove("item--overlapped");
        }
        else if (
        //insert after last item
        e.changedTouches[0].pageY - document.documentElement.scrollTop >
            lastItem.getBoundingClientRect().bottom) {
            listElement.insertBefore(container, lastItem.nextSibling);
        }
        else if (
        // insert before first item
        e.changedTouches[0].pageY - document.documentElement.scrollTop <
            firstItem.getBoundingClientRect().bottom) {
            listElement.insertBefore(container, firstItem);
        }
    }
    else if (touchDirection === "horizontal") {
        const leftPosition = e.changedTouches[0].pageX; //x coordinate of touch
        const totalWidth = listElement.getBoundingClientRect().width; //width of list element
        const percentageMoved = (leftPosition - startX) / totalWidth; //percentage moved by item
        // if percentage moved by item is greater than offset, toggle recurring
        if (percentageMoved > RECURRING_OFFSET && list) {
            const item = list.getItem(itemID);
            item && (item.isRecurring = !item.isRecurring);
            item && list.updateItem(item);
        }
        // remove swipe background if there is one
        const swipebackground = document.querySelector(".item__swipeBckg");
        swipebackground && swipebackground.remove();
    }
    // reset styles
    container.style.position = "static";
    container.style.top = "unset";
    container.style.left = "unset";
    container.style.transform = "unset";
    container.style.zIndex = "initial";
    container.style.backgroundColor = "inherit";
    container.style.width = "initial";
    container.style.touchAction = "initial";
    touchDirection = undefined; //unset movement direction
    if (container.classList.contains("item--sec"))
        container.style.backgroundColor = "grey";
}
/**
 *  touch cancel call back
 * @param e touch event
 * @param container item being moved
 */
export function onTouchCancel(e, container) {
    // reset styles
    container.style.position = "static";
    container.style.top = "unset";
    container.style.left = "unset";
    container.style.transform = "unset";
    container.style.zIndex = "initial";
    container.style.backgroundColor = "inherit";
    container.style.width = "initial";
    container.style.touchAction = "initial";
    touchDirection = undefined; //unset movement direction
    // remove swipe background if there is one
    const swipebackground = document.querySelector(".item__swipeBckg");
    swipebackground && swipebackground.remove();
    if (container.classList.contains("item--sec"))
        container.style.backgroundColor = "grey";
}
/**
 * checks if two nodes intersect using boundingRect()
 * @param el1 node 1
 * @param el2 node 2
 * @returns true if node 1 and node 2 intersect
 */
function isOverlapping(el1, el2) {
    const rect1 = el1.getBoundingClientRect();
    const rect2 = el2.getBoundingClientRect();
    return !((rect1.right < rect2.left || // el1 is to the left of el2
        rect1.left > rect2.right || // el1 is to the right of el2
        rect1.bottom < rect2.top || // el1 is above el2
        rect1.top > rect2.bottom) // el1 is below el2
    );
}
