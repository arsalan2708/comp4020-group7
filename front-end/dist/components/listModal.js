import { createInput } from "../utils/createInput.js";
export var ListModalMode;
(function (ListModalMode) {
    ListModalMode[ListModalMode["Create"] = 0] = "Create";
    ListModalMode[ListModalMode["Edit"] = 1] = "Edit";
})(ListModalMode || (ListModalMode = {}));
export function mountListModal({ mode }) {
    // mount the modal and return it
    //   const modal = mountModalContainer({});
    //   modal?.classList.add("center");
    //   stop if the modal mounting failed
    //   if (!modal) return;
    //   TODO: temporary remove this after figureing out form
    const body = document.getElementById("body");
    if (!body)
        return;
    //   title for the component
    const title = document.createElement("p");
    title.classList.add("listModal__title");
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
    const buttonsContainer = document.createElement("div");
    const form = document.createElement("form");
    form.append(title, inputContainer, buttonsContainer);
    form.classList.add("listModal", "border-radius", "display-col", "align--center");
    //   append the form to the modal container
    body.appendChild(form);
    //   TODO: return modal
    return form;
}
