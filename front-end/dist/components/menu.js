import { addClasses } from "../utils/addClasses.js";
import { getImage } from "../utils/getImage.js";
import { mountModalContainer, unmountModalContainer, } from "./modalContainer.js";
const THRESHOLD = window.innerHeight - 250; // Threshold for switching position
/**
 * creates a menu
 * @param label the label to display
 * @param icon icon to display
 * @param onClick call back funciton for clicking menu item
 * @returns
 */
function createMenuItem({ label, icon, onClick }) {
    // the icon for the menu item
    const icon_ = document.createElement("img");
    icon && (icon_.src = getImage(icon));
    addClasses(icon_, "menu__icon");
    //   the label
    const label_ = document.createElement("p");
    label_.innerText = label;
    addClasses(label_);
    //   the button container
    const button = document.createElement("button");
    addClasses(button, "button", "menu__button", "display-row", "align--center");
    button.addEventListener("click", () => {
        onClick && onClick();
        unmountMenu();
    });
    button.addEventListener("click", () => console.log("clicked 2"));
    icon && button.append(icon_);
    button.append(label_);
    //   create a li and append button to it
    const li = document.createElement("li");
    li.append(button);
    return li;
}
/**
 * creates a menu with the parameters given
 * @param items list of menu item data to create menu for
 * @returns menu as a ul element
 */
function createMenu(items) {
    // create list
    const ul = document.createElement("ul");
    addClasses(ul, "menu", "border-radius");
    //   add all menu items to it
    items.forEach((item) => {
        ul.append(createMenuItem(Object.assign({}, item)));
    });
    return ul;
}
/**
 * mounts a menu at the trigger location
 * @param trigger html element that triggers the menu
 * @param items menu item data to display
 */
export function mountMenu({ trigger, items, }) {
    // get the page wrapper. we mount to this
    const modalContainer = mountModalContainer({
        onModalClick: unmountMenu,
        backgroundBlur: false,
    });
    if (!modalContainer)
        return;
    const rect = trigger.getBoundingClientRect();
    // Decide whether to position the square below or above
    const topPosition = rect.bottom + 4; // Default position (below)
    const adjustedTop = rect.top - 210; // Position above if near bottom
    //   create menu align it to the right of trigger
    const menu = createMenu(items);
    menu.style.right = `${window.innerWidth - rect.right}px`;
    //   if buttom of the trigger if below threshold
    if (rect.bottom > THRESHOLD) {
        menu.style.top = `${adjustedTop}px`;
    }
    else {
        menu.style.top = `${topPosition}px`;
    }
    modalContainer.append(menu);
}
/**
 * unmount the menu from the page if one exists
 */
function unmountMenu() {
    const menu = document.querySelector(".menu");
    menu && unmountModalContainer();
}
