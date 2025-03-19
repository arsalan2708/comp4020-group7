import { addClasses } from "../utils/addClasses.js";
import { Icon, getImage } from "../utils/getImage.js";
import { getUser } from "../utils/getUser.js";
import { routeToList } from "../utils/routing.js";
import { sendEmail } from "../utils/sendInvite.js";
import { onTouchCancel, onTouchEnd, onTouchMove, onTouchStart, } from "../utils/touch.js";
import { createIconButton } from "./iconButton.js";
import { mountMenu } from "./menu.js";
// options menu data
const menuItems = [
    { label: "edit" },
    { label: "share", onClick: sendEmail },
    { label: "delete" },
];
export function mountInitListItem({ listID, primaryID, checkedItems, totalItems, label, date, }) {
    const { userID } = getUser();
    const isPrimaryShopper = primaryID === userID;
    const isInitItem = true;
    // label for init list item
    const labelElement = document.createElement("p");
    labelElement.innerText = label;
    labelElement.classList.add("initList__label", "item__label", "text-lg");
    // current number of items in the list chekced
    const amountCurrent = document.createElement("p");
    amountCurrent.innerText = "" + checkedItems;
    // total number of items in the list
    const amountMax = document.createElement("p");
    amountMax.innerText = "" + totalItems;
    // [current/max] text
    const amountContainer = document.createElement("div");
    amountContainer.classList.add("initList__amountContainer", "display-row", "text-md");
    amountContainer.append(amountCurrent, "/", amountMax);
    // TODO: figure out how to get primary vs secondary shoppers
    // primary vs secondary shopper
    const tag = document.createElement("p");
    tag.innerText = isPrimaryShopper ? "Pri" : "Sec";
    addClasses(tag, "initList__tag", "text-xs", "center");
    !isPrimaryShopper && addClasses(tag, "initList__tag--sec");
    // left buttom container [flex-row]
    const leftButtom = document.createElement("div");
    leftButtom.classList.add("initList__leftButtom", "display-row", "align--center");
    leftButtom.append(amountContainer, tag);
    // left side container
    const leftSide = document.createElement("div");
    leftSide.classList.add("initList__leftSide", "display-col");
    leftSide.append(labelElement, leftButtom);
    // date
    const dateElement = document.createElement("p");
    date && (dateElement.innerText = date);
    addClasses(dateElement, "initList__date");
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
    // touch events (drag and drop)
    container.addEventListener("touchstart", onTouchStart);
    container.addEventListener("touchmove", (e) => {
        const swippable = false;
        const initListItem = true;
        onTouchMove(e, container, swippable, initListItem);
    });
    container.addEventListener("touchend", (e) => onTouchEnd(e, container, listID, isInitItem));
    container.addEventListener("touchcancel", (e) => onTouchCancel(e, container));
    return container;
}
