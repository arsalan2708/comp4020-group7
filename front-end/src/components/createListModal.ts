import { RecurringItems } from "../types/types.js";
import { InitListItem, List } from "../types/types";
import { addClasses } from "../utils/addClasses.js";
import { createInput } from "../utils/createInput.js";
import { extractFormData } from "../utils/extractFormData.js";
import { generateID } from "../utils/generateID.js";
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
}

export function mountListModal({ mode, list }: ListModalProps) {
  // mount the modal and return it
  const modal = mountModalContainer({});

  // stop if the modal mounting failed
  if (!modal) return;

  // TODO: address expanded modal buttom page bug
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
  labelInput.maxLength = 150;
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
  const recurringItemsList = RecurringItems.map((label) =>
    mountRecurringItem({ label })
  );

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
  form.onsubmit = (ev) => formSubmitHandler(ev, list);

  //   append the form to the modal container
  modal.appendChild(form);

  return modal;
}

type FormValues = {
  label: string;
  date?: string;
};

function formSubmitHandler(ev: SubmitEvent, list: List<InitListItem>) {
  ev.preventDefault(); //prevent default bahavior (dont route anywhere)

  // get the form element
  const form = ev.currentTarget as HTMLFormElement;

  // stop if form element is unavailable
  if (!form) return;

  // extract data into the store
  const data = extractFormData(form) as FormValues;

  const template = {
    listID: generateID(),
    primaryID: generateID(),
    checkedItems: 0,
    totalItems: 0,
    label: data.label,
    date: data.date,
  };

  // list of lists
  list.addItem({
    item: template,
  });

  // unmount the modal
  unmountModalContainer();

  // log form data
  console.log(data);
}
