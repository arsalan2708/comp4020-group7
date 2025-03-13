import { List } from "../list.js";
import { ActionButtonType } from "../types/types";
import { addClasses } from "../utils/addClasses.js";
import { createInput } from "../utils/createInput.js";
import { Icon, getImage } from "../utils/getImage.js";
import { onLongPress } from "../utils/longPress.js";
import { createIconButton } from "./iconButton.js";
import { mountMenu } from "./menu.js";

interface Props {
  itemID: string;
  classNames?: string[];
  label: string;
  isRecurring?: boolean;
  amount?: number;
  checked?: boolean;
  description?: string;
  category?: string;
  onActionButtonClick?: () => void;
  onClick?: () => void;
  actionButtonType?: ActionButtonType;
  expandable: boolean;
}

/**
 * mounts a list item.
 * @param itemID id for the item
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
export function mountListItem({
  itemID,
  classNames,
  label,
  isRecurring,
  amount,
  checked,
  description,
  category,
  onActionButtonClick,
  onClick,
  actionButtonType = "checkbox",
  expandable,
}: Props) {
  // label
  const label_ = document.createElement("p");
  label_.innerText = label;
  addClasses(label_, "item__label", "hidden");

  //   recurring
  const star = document.createElement("p");
  star.innerText = "⭐";
  addClasses(star, "item__recurring", "hidden");
  !isRecurring && star.remove(); // if its not a recurring item remove it

  //   text input for intering data
  const { inputNode: labelInput } = createInput({
    id: "label--input",
    name: "label",
  });
  addClasses(labelInput, "item__labelInput");
  labelInput.autofocus = true;
  labelInput.placeholder = "Enter item name";
  labelInput.required = true;
  labelInput.maxLength = 150;

  //   prevent click from expanding item
  labelInput.addEventListener("click", (ev) => ev.stopPropagation());

  //   handle label submit
  labelInput.addEventListener("change", () => {
    labelInput.value && (label_.innerText = labelInput.value);
    swapLabel();
  });

  // swap label and input
  function swapLabel() {
    labelInput.classList.toggle("hidden");
    label_.classList.toggle("hidden");
    star.classList.toggle("hidden");
  }

  // on long press of label, swap it with input
  onLongPress(label_, swapLabel);

  //   label container
  const labelContainer = document.createElement("div");
  addClasses(
    labelContainer,
    "item__labelContainer",
    "display-row",
    "align--center"
  );
  labelContainer.append(label_, labelInput);
  isRecurring && labelContainer.append(star);

  //   TODO: fix amounts
  // amount of item
  const amount_ = document.createElement("p");
  //   amount_.innerText = "x" + amount;
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
  addClasses(
    actionButtonContainer,
    "item__buttonContainer",
    "display-row",
    "align--center"
  );
  amount
    ? actionButtonContainer.append(amount_, actionButton)
    : actionButtonContainer.append(actionButton);

  // top contaner for label and action button
  const topContainer = document.createElement("div");
  addClasses(
    topContainer,
    "item__topContainer",
    "display-row",
    "align--center",
    "justify--between"
  );
  topContainer.append(labelContainer, actionButtonContainer);

  //   container for the item component
  const container = document.createElement("li");
  container.id = itemID;
  addClasses(
    container,
    "item",
    "border-radius",
    "display-col",
    ...(classNames || [])
  );
  onClick && container.addEventListener("click", onClick);
  container.append(topContainer);

  //   if item is not expandle stop here
  if (!expandable) return { container };

  //   item description
  const description_ = document.createElement("p");
  description_.innerText = description || "Enter description...";
  addClasses(description_, "item__description", "hidden");

  // text area
  const textArea = document.createElement("textarea");
  textArea.value = description || "";
  textArea.placeholder = "Editing description...";
  addClasses(textArea, "item__descriptionInput", "hidden");

  textArea.addEventListener("blur", (e) => {
    textArea.value && (description_.innerText = textArea.value);
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
  addClasses(category_, "item__category");

  // options menu data
  const menuItems = [
    { label: "edit" },
    {
      label: "delete",
      onClick: () => List.deleteItem(itemID),
    },
  ];

  // options button for expanded displays
  const optionsButton = createIconButton({ src: getImage(Icon.Options) });
  optionsButton.addEventListener("click", (ev) => {
    ev.stopPropagation();
    mountMenu({ trigger: optionsButton, items: menuItems });
  });

  const buttomContainer = document.createElement("div");
  addClasses(
    buttomContainer,
    "item__bottomContainer",
    "display-row",
    "justify--between",
    "align--end",
    "hidden"
  );
  buttomContainer.append(category_, optionsButton);

  // add description and buttom cont to container and add event listener
  container.append(description_, textArea, buttomContainer);
  container.addEventListener("click", expandItem);

  // expand the expandable item, revealing description and buttom container
  function expandItem() {
    description_.classList.toggle("hidden");
    buttomContainer.classList.toggle("hidden");
  }

  return { container };
}
