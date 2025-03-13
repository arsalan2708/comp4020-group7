import { addClasses } from "../utils/addClasses.js";
/**
 * creates a recurring item component
 * @param label label for recurring item
 * @returns return recurring item component
 */
export function mountRecurringItem({ label }) {
    const button = document.createElement("button");
    button.type = "button";
    addClasses(button, "button", "recurring");
    button.innerText = label;
    button.addEventListener("click", () => {
        button.classList.toggle("recurring--selected");
    });
    return button;
}
