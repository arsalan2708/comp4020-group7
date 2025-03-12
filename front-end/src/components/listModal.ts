import { createInput } from "../utils/createInput.js";
import { mountConfirmationButton } from "./confirmationButtons.js";
import {
  mountModalContainer,
  unmountModalContainer,
} from "./modalContainer.js";

export enum ListModalMode {
  Create,
  Edit,
}

interface ListModalProps {
  mode: ListModalMode;
}

export function mountListModal({ mode }: ListModalProps) {
  // mount the modal and return it
  const modal = mountModalContainer({});
  modal?.classList.add("center"); //center the window inside

  // stop if the modal mounting failed
  if (!modal) return;

  //   title for the component
  const title = document.createElement("p");
  title.classList.add("listModal__title", "text--xl");
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

  //   TODO: add recurring items
  //   const recurringItemsContainer = document.createElement("div");

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
  form.append(title, inputContainer, buttonsContainer);
  form.classList.add(
    "listModal",
    "border-radius",
    "display-col",
    "align--center"
  );

  //   append the form to the modal container
  modal.appendChild(form);

  return modal;
}
