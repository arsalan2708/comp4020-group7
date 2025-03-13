import { addClasses } from "../utils/addClasses.js";
import { getImage } from "../utils/getImage.js";
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
    addClasses(icon_);
    //   the label
    const label_ = document.createElement("p");
    label_.innerText = label;
    addClasses(label_);
    //   the button container
    const button = document.createElement("button");
    addClasses(button);
    onClick && button.addEventListener("click", onClick);
    button.append(icon_, label_);
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
export function createMenu(items) {
    // create list
    const ul = document.createElement("ul");
    addClasses(ul);
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
export function mountMenu({ trigger, items, }) { }
