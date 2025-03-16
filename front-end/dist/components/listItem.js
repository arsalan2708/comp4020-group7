import { addClasses } from "../utils/addClasses.js";
import { createInput } from "../utils/createInput.js";
import { Icon, getImage } from "../utils/getImage.js";
import { getUser } from "../utils/getUser.js";
import { onLongPress } from "../utils/longPress.js";
import { createIconButton } from "./iconButton.js";
/**
 * mounts a list item.
 * @param classNames classess to add to the container element
 * @param item item being mounted
 * @param onActionButtonClick call back function for clicking the action button
 * @param onClick call back function for clicking the list item iteself
 * @param actionButtonType type of action button to display, checkbox by default [checkbox]
 * @param expandable true if item is expandable
 * @param list list object for page this item is associated with
 * @param showInputDefault list object for page this item is associated with
 */
export function mountListItem({ classNames, item, onActionButtonClick, onClick, actionButtonType = "checkbox", expandable, list, showInputDefault = true, onAddItem, }) {
    // extract data
    const { itemID, label, isRecurring, amount, checked, description, categoryID: category, } = item;
    const isPrimaryShopper = item.posterID === getUser().userName;
    // label
    const label_ = document.createElement("p");
    label_.innerText = label;
    addClasses(label_, "item__label", "text-md");
    showInputDefault && addClasses(label_, "hidden");
    //   recurring
    const star = document.createElement("p");
    star.innerText = "⭐";
    addClasses(star, "item__recurring");
    showInputDefault && addClasses(star, "hidden");
    !isRecurring && star.remove(); // if its not a recurring item remove it
    //   text input for intering data
    const { inputNode: labelInput } = createInput({
        id: `label--input--${itemID}`,
        name: "label",
    });
    addClasses(labelInput, "item__labelInput", "input--subtle");
    !showInputDefault && addClasses(labelInput, "hidden");
    labelInput.autofocus = true;
    labelInput.tabIndex = 0;
    labelInput.placeholder = "Enter item name";
    if (category === "participant") {
        labelInput.placeholder = "Enter participant name";
    }
    labelInput.required = true;
    labelInput.maxLength = 50;
    //   prevent click from expanding item
    labelInput.addEventListener("click", (ev) => ev.stopPropagation());
    //   handle label submit
    let firstChange = false;
    labelInput.addEventListener("change", () => {
        const isValid = labelInput.checkValidity();
        if (!isValid) {
            labelInput.focus();
            return;
        }
        // update data structures
        if (labelInput.value) {
            label_.innerText = labelInput.value;
            item.label = labelInput.value;
        }
        // call call backs
        if (firstChange) {
            list.updateItem(item);
        }
        else {
            onAddItem(item);
            firstChange = !firstChange;
        }
        swapLabel();
    });
    // on blur if the input is invalid refocus the input
    labelInput.addEventListener("blur", () => {
        if (!labelInput.checkValidity()) {
            labelInput.focus();
            return;
        }
    });
    // swap label and input
    function swapLabel() {
        labelInput.classList.toggle("hidden");
        label_.classList.toggle("hidden");
        star.classList.toggle("hidden");
        if (expandable && !label_.classList.contains("hidden"))
            container.addEventListener("click", expandItem);
        else
            container.removeEventListener("click", expandItem);
    }
    // on long press of label, swap it with input
    onLongPress(label_, swapLabel);
    //   label container
    const labelContainer = document.createElement("div");
    addClasses(labelContainer, "item__labelContainer", "display-row", "align--center");
    labelContainer.append(label_, labelInput);
    isRecurring && labelContainer.append(star);
    // primary vs seconday participant option
    if (category === "participant") {
        const primaryButton = document.createElement("button");
        primaryButton.classList.add("role-button", "primary-role-button");
        primaryButton.innerText = "Primary";
        const secondaryButton = document.createElement("button");
        secondaryButton.classList.add("role-button", "secondary-role-button");
        secondaryButton.innerText = "Secondary";
        if (item.role === "primary") {
            primaryButton.classList.add("selected");
        }
        else {
            secondaryButton.classList.add("selected");
        }
        primaryButton.addEventListener("click", () => {
            item.role = "primary";
            primaryButton.classList.add("selected");
            secondaryButton.classList.remove("selected");
        });
        secondaryButton.addEventListener("click", () => {
            item.role = "secondary";
            secondaryButton.classList.add("selected");
            primaryButton.classList.remove("selected");
        });
        labelContainer.appendChild(primaryButton);
        labelContainer.appendChild(secondaryButton);
    }
    //   TODO: fix amounts
    // amount of item
    const amount_ = document.createElement("p");
    //   amount_.innerText = "x" + amount;
    addClasses(amount_, "item__amount");
    !amount && amount_.remove(); // if no amount remove the element
    //   get action button
    let actionButton;
    switch (actionButtonType) {
        case "default":
            actionButton = document.createElement("div");
            break;
        // delete case
        case "delete":
            actionButton = createIconButton({
                src: getImage(Icon.Delete),
                onClick: () => list.deleteItem(itemID),
            });
            addClasses(actionButton, "item__button--delete");
            break;
        // default action button is checkbox
        default:
            actionButton = document.createElement("input");
            actionButton.type = "checkbox";
            addClasses(actionButton, "item__button--checkbox");
            checked && (actionButton.checked = checked); //assigned checked
            actionButton.addEventListener("change", (ev) => {
                const input = ev.target;
                item.checked = input.checked;
                list.updateItem(item);
            });
            break;
    }
    actionButton.addEventListener("click", (ev) => {
        ev.stopPropagation();
    });
    onActionButtonClick &&
        actionButton.addEventListener("click", onActionButtonClick);
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
    const container = document.createElement("li");
    container.id = itemID;
    addClasses(container, "item", "border-radius", "display-col", ...(classNames || []));
    !isPrimaryShopper && addClasses(container, "item-sec");
    onClick && container.addEventListener("click", onClick);
    container.append(topContainer);
    //   if item is not expandle stop here
    if (!expandable)
        return { container };
    //   item description
    const description_ = document.createElement("p");
    description_.innerText = description || "Enter description...";
    addClasses(description_, "item__description", "hidden", "text-sm");
    // text area
    const textArea = document.createElement("textarea");
    textArea.value = description || "";
    textArea.placeholder = "Editing description...";
    addClasses(textArea, "item__descriptionInput", "hidden", "input--subtle");
    textArea.maxLength = 150;
    textArea.addEventListener("blur", (e) => {
        if (textArea.value) {
            description_.innerText = textArea.value;
            item.description = textArea.value;
            list.updateItem(item);
        }
        swapDescription();
    });
    // on longpress of description swap it out with text box
    onLongPress(description_, swapDescription);
    // handles long press action (swaps text area and description)
    function swapDescription() {
        textArea.classList.toggle("hidden");
        description_.classList.toggle("hidden");
    }
    // category area
    const category_ = document.createElement("p");
    category && (category_.innerText = category);
    addClasses(category_, "item__category", "text-sm");
    // edit category icon
    const editIcon = document.createElement("img");
    editIcon.src = getImage(Icon.Edit);
    addClasses(editIcon, "item__categoryIcon");
    // poster <p>
    const poster = document.createElement("p");
    poster.innerText = `Posted By: ${"sally"}`;
    addClasses(poster, "item__poster", "text-xs");
    // div containing category and its icon for flex
    const categoryIconContainer = document.createElement("div");
    addClasses(categoryIconContainer, "item__categoryIconContainer", "display-row", "align--center");
    categoryIconContainer.append(category_, editIcon);
    // div containing category and poster for flex
    const categoryContainer = document.createElement("div");
    addClasses(categoryContainer, "item__categoryContainer");
    categoryContainer.append(categoryIconContainer, poster);
    // TODO: add event for editing category
    categoryContainer.addEventListener("click", () => { });
    // options button for expanded displays
    const deleteButton = createIconButton({ src: getImage(Icon.Delete) });
    deleteButton.addEventListener("click", (ev) => {
        ev.stopPropagation();
        list.deleteItem(itemID);
    });
    addClasses(deleteButton, "item__bottomButton");
    // flex container for category/poster and button
    const buttomContainer = document.createElement("div");
    addClasses(buttomContainer, "item__bottomContainer", "display-row", "justify--between", "align--end", "hidden");
    buttomContainer.append(categoryContainer, deleteButton);
    // add description and buttom cont to container and add event listener
    container.append(description_, textArea, buttomContainer);
    !showInputDefault &&
        expandable &&
        container.addEventListener("click", expandItem);
    // expand the expandable item, revealing description and buttom container
    function expandItem() {
        description_.classList.toggle("hidden");
        buttomContainer.classList.toggle("hidden");
    }
    return { container };
}
