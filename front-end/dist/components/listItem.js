import { addClasses } from "../utils/addClasses.js";
import { Icon, getImage } from "../utils/getImage.js";
import { createIconButton } from "./iconButton.js";
/**
 * mounts a list item.
 * @param classNames classess to add to the container element
 * @param label label for the item
 * @param isRecurring true if its a recurring item
 * @param amount amount of item
 * @param checked true if item is checked
 * @param description item description
 * @param category item category
 * @param onActionButtonClick call back function for clicking the action button
 * @param onClick call back function for clicking the list item iteself
 * @param actionButtonType type of action button to display, checkbox by default [checkbox]
 * @param expandable true if item is expandable
 */
export function mountListItem({ classNames, label, isRecurring, amount, checked, description, category, onActionButtonClick, onClick, actionButtonType = "checkbox", expandable, }) {
    // label
    const label_ = document.createElement("p");
    label_.innerText = label;
    addClasses(label_, "item__label");
    //   recurring
    const star = document.createElement("p");
    star.innerText = "⭐";
    addClasses(star, "item__recurring");
    !isRecurring && star.remove(); // if its not a recurring item remove it
    //   label container
    const labelContainer = document.createElement("div");
    addClasses(labelContainer, "item__labelContainer", "display-row", "align--center");
    isRecurring
        ? labelContainer.append(label_, star)
        : labelContainer.append(label_); // if its a recurring item add star or else only label
    // amount of item
    const amount_ = document.createElement("p");
    amount_.innerText = "x" + amount;
    addClasses(amount_, "item__amount");
    !amount && amount_.remove(); // if no amount remove the element
    //   get action button
    let actionButton;
    switch (actionButtonType) {
        // default action button is checkbox
        default:
            actionButton = document.createElement("input");
            actionButton.type = "checkbox";
            addClasses(actionButton, "item__button--checkbox");
            checked && (actionButton.checked = checked); //assigned checked
            onActionButtonClick &&
                actionButton.addEventListener("click", onActionButtonClick);
            break;
    }
    actionButton.addEventListener("click", (ev) => {
        ev.stopPropagation();
    });
    //   container for action button
    const actionButtonContainer = document.createElement("div");
    addClasses(actionButtonContainer, "item__buttonContainer", "display-row", "align--center");
    amount
        ? actionButtonContainer.append(amount_, actionButton)
        : actionButtonContainer.append(actionButton);
    // top contaner for label and action button
    const topContainer = document.createElement("div");
    addClasses(topContainer, "item__topContainer", "display-row", "align--center", "justify--between");
    topContainer.append(labelContainer, actionButtonContainer);
    //   container for the item component
    const container = document.createElement("div");
    addClasses(container, "item", "border-radius", "display-col", ...(classNames || []));
    onClick && container.addEventListener("click", onClick);
    container.append(topContainer);
    //   if item is not expandle stop here
    if (!expandable)
        return { container };
    //   item description
    const description_ = document.createElement("p");
    description && (description_.innerText = description);
    addClasses(description_, "item__description", "hidden");
    //   category area
    const category_ = document.createElement("p");
    category && (category_.innerText = category);
    addClasses(category_, "item__category");
    //   options button for expanded displays
    const optionsButton = createIconButton({ src: getImage(Icon.Options) });
    optionsButton.addEventListener("click", (ev) => {
        ev.stopPropagation();
    });
    const buttomContainer = document.createElement("div");
    addClasses(buttomContainer, "item__bottomContainer", "display-row", "justify--between", "align--end", "hidden");
    buttomContainer.append(category_, optionsButton);
    //   add description and buttom cont to container and add event listener
    container.append(description_, buttomContainer);
    container.addEventListener("click", (ev) => {
        description_.classList.toggle("hidden");
        buttomContainer.classList.toggle("hidden");
    });
    return { container };
}
