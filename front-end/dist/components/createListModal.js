import { RecurringItems } from "../types/types.js";
import { addClasses } from "../utils/addClasses.js";
import { createInput } from "../utils/createInput.js";
import { extractFormData } from "../utils/extractFormData.js";
import { generateID } from "../utils/generateID.js";
import { mountConfirmationButton } from "./confirmationButtons.js";
import { mountModalContainer, unmountModalContainer, } from "./modalContainer.js";
import { mountRecurringItem } from "./recurringItem.js";
export var ListModalMode;
(function (ListModalMode) {
    ListModalMode[ListModalMode["Create"] = 0] = "Create";
    ListModalMode[ListModalMode["Edit"] = 1] = "Edit";
})(ListModalMode || (ListModalMode = {}));
export function mountListModal({ mode, list, userID, onRecurringItemsSubmit, }) {
    // mount the modal and return it
    const modal = mountModalContainer({});
    // stop if the modal mounting failed
    if (!modal)
        return;
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
    // summary for drop down
    const summary = document.createElement("summary");
    summary.innerText = "Show Recurring Items";
    addClasses(summary, "text-md");
    // generate recurring items
    let recurringItemsArray = [];
    const recurringItemsList = RecurringItems.map((label) => {
        const button = mountRecurringItem({ label });
        // toggle label in array on click
        button.addEventListener("click", () => {
            const isContained = recurringItemsArray.some((ll) => ll === label);
            if (isContained) {
                recurringItemsArray = recurringItemsArray.filter((ll) => ll !== label);
            }
            else
                recurringItemsArray.push(label);
        });
        return button;
    });
    // container for recurring items
    const summaryBody = document.createElement("div");
    addClasses(summaryBody, "listModal__recurringbody");
    summaryBody.append(...recurringItemsList);
    //   TODO: add recurring items
    const recurringItemsContainer = document.createElement("details");
    addClasses(recurringItemsContainer, "listModal__recurringContainer", "border-radius", "display-row", "align--center");
    recurringItemsContainer.append(summary, summaryBody);
    // toggling detail label
    recurringItemsContainer.addEventListener("toggle", (ev) => {
        const isOpen = recurringItemsContainer.open;
        const label = isOpen ? "Hide" : "Show";
        summary.innerText = `${label} Recurring Items`;
        recurringItemsContainer.classList.toggle("display-row");
        recurringItemsContainer.classList.toggle("align--center");
    });
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
    form.append(title, inputContainer, recurringItemsContainer, buttonsContainer);
    form.classList.add("listModal", "border-radius", "display-col", "align--center");
    form.onsubmit = (ev) => formSubmitHandler(ev, list, userID, recurringItemsArray, onRecurringItemsSubmit);
    //   append the form to the modal container
    modal.appendChild(form);
    return modal;
}
function formSubmitHandler(ev, list, userID, recurringItemsArray, onRecurringItemsSubmit) {
    ev.preventDefault(); //prevent default bahavior (dont route anywhere)
    // get the form element
    const form = ev.currentTarget;
    // stop if form element is unavailable
    if (!form)
        return;
    // extract data into the store
    const data = extractFormData(form);
    const listID = generateID();
    const template = {
        listID,
        primaryID: userID,
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
