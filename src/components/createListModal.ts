import { RecurringListItems } from "../types/recurringItems.js";
import { InitListItem, List, ListItem } from "../types/types";
import { addClasses } from "../utils/addClasses.js";
import { createInput } from "../utils/createInput.js";
import { extractFormData } from "../utils/extractFormData.js";
import { generateID } from "../utils/generateID.js";
import { getUser } from "../utils/getUser.js";
import { mountConfirmationButton } from "./confirmationButtons.js";
import {
  mountModalContainer,
  unmountModalContainer,
} from "./modalContainer.js";
import { mountRecurringItem } from "./recurringItem.js";

export enum ListModalMode {
  Create,
  Edit,
}

interface ListModalProps {
  mode: ListModalMode;
  list: List<InitListItem>;
  onRecurringItemsSubmit: (
    recurringItemsArray: ListItem[],
    listID: string
  ) => void;
}

export function mountListModal({
  mode,
  list,
  onRecurringItemsSubmit,
}: ListModalProps) {
  // mount the modal and return it
  const modal = mountModalContainer({});

  // stop if the modal mounting failed
  if (!modal) return;

  addClasses(modal, "listModal__modal");

  //   title for the component
  const title = document.createElement("p");
  title.classList.add("listModal__title", "text-lg");
  title.innerText = mode === ListModalMode.Create ? "Create List" : "Edit List";

  //   create label input
  const { inputNode: labelInput, container: labelContainer } = createInput({
    id: "input-label",
    label: "List Name",
    name: "label",
  });

  //   input for list label additional options
  labelInput.required = true;
  labelInput.maxLength = 20;
  labelInput.placeholder = "Enter List Name";

  //   create label date
  const {
    labelNode: dateLabel,
    inputNode: dateInput,
    container: dateContainer,
  } = createInput({
    id: "input-date",
    label: "Shopping Date",
    name: "date",
    type: "date",
  });

  //   add optional class
  dateLabel.classList.add("label__optional");

  //   input for list date additional options
  dateInput.placeholder = "MM/DD/YYYY";

  //   container for inputs
  const inputContainer = document.createElement("div");
  inputContainer.classList.add(
    "listModal__inputContainer",
    "display-col",
    "border-radius"
  );
  inputContainer.append(labelContainer, dateContainer);

  // summary for drop down
  const summary = document.createElement("summary");
  summary.innerText = "Show Recurring Items";
  addClasses(summary, "text-md");

  // generate recurring items
  let recurringItemsArray: ListItem[] = [];
  const recurringItemsList = RecurringListItems.map((item) => {
    const button = mountRecurringItem({ label: item.label });

    // toggle label in array on click
    button.addEventListener("click", () => {
      const isContained = recurringItemsArray.some(
        (item_) => item_.label === item.label
      );

      if (isContained) {
        recurringItemsArray = recurringItemsArray.filter(
          (item_) => item_.label !== item.label
        );
      } else {
        item.posterID = getUser().userID;
        item.itemID = generateID();
        recurringItemsArray.push(item);
      }
    });

    return button;
  });

  // container for recurring items
  const summaryBody = document.createElement("div");
  addClasses(summaryBody, "listModal__recurringbody");
  summaryBody.append(...recurringItemsList);

  //   TODO: add recurring items
  const recurringItemsContainer = document.createElement("details");
  addClasses(
    recurringItemsContainer,
    "listModal__recurringContainer",
    "border-radius",
    "display-row",
    "align--center"
  );
  recurringItemsContainer.append(summary, summaryBody);

  // toggling detail label
  recurringItemsContainer.addEventListener("toggle", (ev: Event) => {
    const isOpen = recurringItemsContainer.open;
    const label = isOpen ? "Hide" : "Show";
    summary.innerText = `${label} Recurring Items`;
    recurringItemsContainer.classList.toggle("display-row");
    recurringItemsContainer.classList.toggle("align--center");
  });

  //   confirmation buttons
  const { cancelButton, confirmButton, buttonsContainer } =
    mountConfirmationButton({
      onCancelClick: unmountModalContainer,
      onConfirmClick: () => {},
    });

  // button types
  cancelButton.type = "button";
  confirmButton.type = "submit";

  //   styling for button container
  buttonsContainer.classList.add("listModal__buttonsContainer", "display-row");

  //   form element
  const form = document.createElement("form");
  form.append(title, inputContainer, recurringItemsContainer, buttonsContainer);
  form.classList.add(
    "listModal",
    "border-radius",
    "display-col",
    "align--center"
  );
  form.onsubmit = (ev) =>
    formSubmitHandler(ev, list, recurringItemsArray, onRecurringItemsSubmit);

  //   append the form to the modal container
  modal.appendChild(form);

  return modal;
}

type FormValues = {
  label: string; //list label
  date?: string; //date for shopping
};

/**
 * form submit handler for creating a new form. fired when a user taps submit on a valid form
 * @param ev form submission event
 * @param list list to add the init list item to
 * @param recurringItemsArray recurring items that are to be added to the list
 * @param onRecurringItemsSubmit function called if recuring items are added to a newly created list
 * @returns void
 */
function formSubmitHandler(
  ev: SubmitEvent,
  list: List<InitListItem>,
  recurringItemsArray: ListItem[],
  onRecurringItemsSubmit: (
    recurringItemsArray: ListItem[],
    listID: string
  ) => void
) {
  ev.preventDefault(); //prevent default bahavior (dont route anywhere)

  // get the form element
  const form = ev.currentTarget as HTMLFormElement;

  // stop if form element is unavailable
  if (!form) return;

  // extract data into the store
  const data = extractFormData(form) as FormValues;

  // generate listID for the new list
  const listID = generateID();

  // set list ID for recurring items
  recurringItemsArray.forEach((item) => (item.listID = listID));

  const template = {
    listID,
    primaryID: getUser().userID,
    checkedItems: 0,
    totalItems: recurringItemsArray.length,
    label: data.label,
    date: data.date,
  };

  // list of lists
  list.addItem({
    item: template,
  });

  // for call back function
  recurringItemsArray.length &&
    onRecurringItemsSubmit(recurringItemsArray, listID);

  // unmount the modal
  unmountModalContainer();
}
