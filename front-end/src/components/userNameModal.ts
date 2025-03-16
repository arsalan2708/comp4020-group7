import { addClasses } from "../utils/addClasses.js";
import { createInput } from "../utils/createInput.js";
import {
  mountModalContainer,
  unmountModalContainer,
} from "./modalContainer.js";

type ModalMode = "default" | "invite";

interface Props {
  onSubmit?: (value: string) => void;
  mode?: ModalMode;
}

/**
 * modal to collect user names
 * @param onSubmit call back for a successfull submit
 * @returns the container container the input and button
 */
export function mountUserNameModal({ onSubmit, mode = "default" }: Props) {
  const isInviteMode = mode === "invite";

  // mount modal
  const modal = mountModalContainer({
    onModalClick: () => {
      isInviteMode && unmountModalContainer();
    },
  });
  if (!modal) return;

  // Create the container div
  const container = document.createElement("div");
  addClasses(
    container,
    "listModal",
    "username",
    "display-col",
    "border-radius"
  );

  // Create the input element
  const { inputNode: input, container: inputContainer } = createInput({
    id: "username",
    name: "username",
    label: isInviteMode ? "Invite Link" : "User Name",
  });
  addClasses(input, "username__input");
  input.placeholder = isInviteMode ? "Enter invite link" : "Enter a User Name";
  input.required = true;
  input.tabIndex = 0;
  input.autofocus = true;
  input.maxLength = 20;

  input.addEventListener("change", () => button.click());

  // Create the button element
  const button = document.createElement("button");
  addClasses(button, "username__button", "button");
  button.textContent = "Submit";
  button.addEventListener("click", () => {
    if (input.checkValidity()) {
      onSubmit && onSubmit(input.value);
      unmountModalContainer();
    } else input.focus();
  });

  // Append the input and button to the container
  container.append(inputContainer, button);

  // Append the container to the body
  modal.append(container);

  return container;
}
