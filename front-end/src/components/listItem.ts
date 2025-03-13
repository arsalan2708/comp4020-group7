import { ActionButtonType, ItemMode } from "../types/types";
import { addClasses } from "../utils/addClasses.js";

interface Props {
  classNames?: string[];
  label: string;
  isRecurring?: boolean;
  amount?: number;
  checked?: boolean;
  description?: string;
  category?: string;
  onActionButtonClick?: () => void;
  onClick?: () => void;
  mode: ItemMode;
  actionButtonType?: ActionButtonType;
}

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
 * @param mode "compact" for compact mode | "expanded" for expand mode, compact by default
 * @param actionButtonType type of action button to display, checkbox by default [checkbox]
 */
export function mountListItem({
  classNames,
  label,
  isRecurring,
  amount,
  checked,
  description,
  category,
  onActionButtonClick,
  onClick,
  mode = "compact",
  actionButtonType = "checkbox",
}: Props) {
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
  addClasses(
    labelContainer,
    "item__labelContainer",
    "display-row",
    "align--center"
  );
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
  const container = document.createElement("div");
  addClasses(container, "item", "border-radius", ...(classNames || []));
  onClick && container.addEventListener("click", onClick);
  container.append(topContainer);

  //   if compact mode go no further
  //   if (mode === "compact") return { container };
  return container;
}
