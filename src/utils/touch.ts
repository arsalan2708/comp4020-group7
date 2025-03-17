/**
 * touch mouve event call back
 * @param e touch event
 * @param container item to be moved
 */
export function onTouchMove(e: TouchEvent, container: HTMLElement) {
  // to calculate width of item when being dragged
  const pageWrapper = document.querySelector(".page-wrapper");
  if (!pageWrapper) return;

  // move the current target with these
  container.style.position = "fixed";
  container.style.top =
    e.changedTouches[0].pageY - document.documentElement.scrollTop + "px";
  container.style.left = e.changedTouches[0].pageX + "px";
  container.style.transform = "translate(-50%, -50%)";
  container.style.backgroundColor = "white";
  container.style.zIndex = "1";
  container.style.touchAction = "none";
  container.style.width =
    pageWrapper.getBoundingClientRect().width * 0.9 + "px";
}

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
  isInitList?: boolean
) {
  // constants
  const isInitList_ = isInitList || false;
  const selector = isInitList_ ? ".initList__container" : ".item";
  const list = document.querySelector(".page-wrapper__list") as HTMLElement;
  const listItemsArray = Array.from(document.querySelectorAll(selector));
  const firstItem = listItemsArray[0];
  const lastItem = listItemsArray[listItemsArray.length - 1];

  // find overlapped item
  const overlappedItem = listItemsArray
    .filter((element) => element.id !== itemID)
    .find((element) => isOverlapping(container, element as HTMLElement));

  // insert before the overlapping item
  if (overlappedItem) {
    list && list.insertBefore(container, overlappedItem);
  } else if (
    //insert after last item
    e.changedTouches[0].pageY - document.documentElement.scrollTop >
    lastItem.getBoundingClientRect().bottom
  ) {
    list.insertBefore(container, lastItem.nextSibling);
  } else if (
    // insert before first item
    e.changedTouches[0].pageY - document.documentElement.scrollTop <
    firstItem.getBoundingClientRect().bottom
  ) {
    list.insertBefore(container, firstItem);
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
