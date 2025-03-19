import { InitListItem, List, ListItem } from "../types/types";

let touchDirection: "horizontal" | "vertical" | undefined; //direction of movememnt
let startX: number; //starting X position
let startY: number; //starting Y position
const Y_OFFSET = 50; //offset before movement is registered as vertical
const X_OFFSET = 10; //offset before movement is registered as horizontal
const RECURRING_OFFSET = 25; //% offset to register swipe as a recurring item

export function onTouchStart(e: TouchEvent) {
  // get the start position of the touch event
  const touch = e.touches[0];
  startX = touch.clientX; // X coordinate relative to the viewport
  startY = touch.clientY;
}

/**
 * touch mouve event call back
 * @param e touch event
 * @param container item to be moved
 */
export function onTouchMove(
  e: TouchEvent,
  container: HTMLElement,
  swipeEnabled = false
) {
  // to calculate width of item when being dragged
  const pageWrapper = document.querySelector(".page-wrapper");
  if (!pageWrapper) return;

  // X and Y coordinate of touch
  const topPosition =
    e.changedTouches[0].pageY - document.documentElement.scrollTop;
  const leftPosition = e.changedTouches[0].pageX;

  // if touch movement passes threshold enable vertical/horizontal, once for every element until touch end/cancel
  if (!touchDirection && Math.abs(startY - topPosition) > Y_OFFSET) {
    touchDirection = "vertical";
  } else if (
    swipeEnabled &&
    !touchDirection &&
    Math.abs(startX - leftPosition) > X_OFFSET
  ) {
    touchDirection = "horizontal";
  }

  // perform verical movement
  if (touchDirection === "vertical") {
    // sort movement - move the current target with these
    container.style.position = "fixed";
    container.style.top = topPosition + "px";
    container.style.left = "50%";
    container.style.transform = "translateY(-50%) translateX(-50%)";
  } else if (touchDirection === "horizontal") {
    // swipe gesture
    container.style.position = "relative";
    container.style.transform = `translateX(${leftPosition - startX}px)`;
  }

  // container.style.left = e.changedTouches[0].pageX + "px";
  // container.style.transform = "translate(-50%, -50%)";

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
export function onTouchEnd(
  e: TouchEvent,
  container: HTMLElement,
  itemID: string,
  isInitList?: boolean,
  list?: List<ListItem>
) {
  // constants
  const isInitList_ = isInitList || false;
  const selector = isInitList_ ? ".initList__container" : ".item";
  const listElement = document.querySelector(
    ".page-wrapper__list"
  ) as HTMLElement;
  const listItemsArray = Array.from(document.querySelectorAll(selector));
  const firstItem = listItemsArray[0];
  const lastItem = listItemsArray[listItemsArray.length - 1];

  // find overlapped item
  const overlappedItem = listItemsArray
    .filter((element) => element.id !== itemID)
    .find((element) => isOverlapping(container, element as HTMLElement));

  if (touchDirection === "vertical") {
    if (overlappedItem) {
      // insert before the overlapping item
      listElement && listElement.insertBefore(container, overlappedItem);
    } else if (
      //insert after last item
      e.changedTouches[0].pageY - document.documentElement.scrollTop >
      lastItem.getBoundingClientRect().bottom
    ) {
      listElement.insertBefore(container, lastItem.nextSibling);
    } else if (
      // insert before first item
      e.changedTouches[0].pageY - document.documentElement.scrollTop <
      firstItem.getBoundingClientRect().bottom
    ) {
      listElement.insertBefore(container, firstItem);
    }
  } else if (touchDirection === "horizontal") {
    const leftPosition = e.changedTouches[0].pageX; //x coordinate of touch
    const totalWidth = listElement.getBoundingClientRect().width; //width of list element
    const percentageMoved =
      (Math.abs(leftPosition - startX) / totalWidth) * 100; //percentage moved by item

    // if percentage moved by item is greater than offset, toggle recurring
    if (percentageMoved > RECURRING_OFFSET && list) {
      const item = list.getItem(itemID);
      item && (item.isRecurring = !item.isRecurring);
      item && list.updateItem(item);
    }
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
export function onTouchCancel(e: TouchEvent, container: HTMLElement) {
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
 * checks if two nodes intersect using boundingRect()
 * @param el1 node 1
 * @param el2 node 2
 * @returns true if node 1 and node 2 intersect
 */
function isOverlapping(el1: HTMLElement, el2: HTMLElement) {
  const rect1 = el1.getBoundingClientRect();
  const rect2 = el2.getBoundingClientRect();

  return !(
    (
      rect1.right < rect2.left || // el1 is to the left of el2
      rect1.left > rect2.right || // el1 is to the right of el2
      rect1.bottom < rect2.top || // el1 is above el2
      rect1.top > rect2.bottom
    ) // el1 is below el2
  );
}
