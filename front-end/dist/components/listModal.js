import { createInput } from "../utils/createInput.js";
import { extractFormData } from "../utils/extractFormData.js";
import { generateID } from "../utils/generateID.js";
import { mountConfirmationButton } from "./confirmationButtons.js";
import { InitializeList } from "./initList.js";
import { mountModalContainer, unmountModalContainer, } from "./modalContainer.js";
export var ListModalMode;
(function (ListModalMode) {
    ListModalMode[ListModalMode["Create"] = 0] = "Create";
    ListModalMode[ListModalMode["Edit"] = 1] = "Edit";
})(ListModalMode || (ListModalMode = {}));
export function mountListModal({ mode }) {
    // mount the modal and return it
    const modal = mountModalContainer({});
    modal === null || modal === void 0 ? void 0 : modal.classList.add("center"); //center the window inside
    // stop if the modal mounting failed
    if (!modal)
        return;
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
    const { labelNode: dateLabel, inputNode: dateInput, container: dateContainer, } = createInput({
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
    inputContainer.classList.add("listModal__inputContainer", "display-col", "border-radius");
    inputContainer.append(labelContainer, dateContainer);
    //   TODO: add recurring items
    //   const recurringItemsContainer = document.createElement("div");
    //   confirmation buttons
    const { cancelButton, confirmButton, buttonsContainer } = mountConfirmationButton({
        onCancelClick: unmountModalContainer,
        onConfirmClick: () => { },
    });
    // button types
    cancelButton.type = "button";
    confirmButton.type = "submit";
    //   styling for button container
    buttonsContainer.classList.add("listModal__buttonsContainer", "display-row");
    //   form element
    const form = document.createElement("form");
    form.append(title, inputContainer, buttonsContainer);
    form.classList.add("listModal", "border-radius", "display-col", "align--center");
    form.onsubmit = formSubmitHandler;
    //   append the form to the modal container
    modal.appendChild(form);
    return modal;
}
function formSubmitHandler(ev) {
    ev.preventDefault(); //prevent default bahavior (dont route anywhere)
    // get the form element
    const form = ev.currentTarget;
    // stop if form element is unavailable
    if (!form)
        return;
    // extract data into the store
    const data = extractFormData(form);
    // list of lists
    const list = InitializeList();
    list.addList({
        listID: generateID(),
        primaryID: generateID(),
        checkedItems: 0,
        totalItems: 0,
        label: data.label,
        date: data.date,
    });
    // unmount the modal
    unmountModalContainer();
    // log form data
    console.log(data);
}
