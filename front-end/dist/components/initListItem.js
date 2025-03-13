import { Icon, getImage } from "../utils/getImage.js";
import { routeToList } from "../utils/routing.js";
import { createIconButton } from "./iconButton.js";
import { mountMenu } from "./menu.js";
// options menu data
const menuItems = [
    { label: "edit" },
    { label: "share" },
    { label: "export" },
    { label: "select" },
    { label: "delete" },
];
export function mountInitListItem({ listID, primaryID, checkedItems, totalItems, label, date, }) {
    // label for init list item
    const labelElement = document.createElement("p");
    labelElement.innerText = label;
    labelElement.classList.add("initList__label");
    // current number of items in the list chekced
    const amountCurrent = document.createElement("p");
    amountCurrent.innerText = "" + checkedItems;
    // total number of items in the list
    const amountMax = document.createElement("p");
    amountMax.innerText = "" + totalItems;
    // [current/max] text
    const amountContainer = document.createElement("div");
    amountContainer.classList.add("initList__amountContainer", "display-row");
    amountContainer.append(amountCurrent, "/", amountMax);
    // TODO: figure out how to get primary vs secondary shoppers
    // primary vs secondary shopper
    const tag = document.createElement("p");
    tag.innerText = "Pri";
    // left buttom container [flex-row]
    const leftButtom = document.createElement("div");
    leftButtom.classList.add("initList__leftButtom", "display-row");
    leftButtom.append(amountContainer, tag);
    // left side container
    const leftSide = document.createElement("div");
    leftSide.classList.add("initList__leftSide", "display-col");
    leftSide.append(label, leftButtom);
    // date
    const dateElement = document.createElement("p");
    date && (dateElement.innerText = date);
    // options button
    const optionsButton = createIconButton({
        src: getImage(Icon.Options),
        onClick: (ev) => {
            ev.stopPropagation();
            mountMenu({ trigger: optionsButton, items: menuItems });
        },
    });
    // right side container
    const rightSide = document.createElement("div");
    rightSide.classList.add("initList__rightSide", "display-row");
    rightSide.append(dateElement, optionsButton);
    // create the container for the item
    const container = document.createElement("div");
    container.classList.add("initList__container", "display-row", "align--center", "justify--between", "border-radius");
    container.append(leftSide, rightSide);
    container.id = listID;
    container.onclick = () => routeToList(listID);
    container.tabIndex = 0;
    container.role = "button";
    return container;
}
