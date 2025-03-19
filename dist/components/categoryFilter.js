import { Categories } from "../types/types.js";
import { addClasses } from "../utils/addClasses.js";
import { onLongPress } from "../utils/longPress.js";
import { useState } from "../utils/useState.js";
import { mountRecurringItem } from "./recurringItem.js";
//state management for the filter component
const filterStates = useState(new Set());
const { getState, setState } = filterStates;
/**
 * Singleton method to make the same instance of the filter states available throughout the app
 * @returns return the same instance of filter states
 */
export function FilterStates() {
    return filterStates;
}
export function mountCategoryFilter() {
    // page wrapper container
    const pageWrapper = document.querySelector(".page-wrapper__page-content");
    if (!pageWrapper)
        return;
    // options button
    const options = mountRecurringItem({ label: "i" });
    addClasses(options, "filter__button");
    options.addEventListener("click", () => {
        // update state
        setState(new Set());
        setTimeout(() => {
            options.classList.remove("recurring--selected");
        }, 300);
        // get all selected recurring items
        const selectedRec = pageWrapper.querySelectorAll(".recurring--selected");
        // remove selection styling for selected recurring items
        selectedRec.forEach((element) => element.innerText !== options.innerText &&
            element.classList.remove("recurring--selected"));
    });
    //   container for the button to give sticky effect
    const optContainer = document.createElement("div");
    addClasses(optContainer, "filter__buttonCont", "center");
    optContainer.append(options);
    // component container
    const container = document.createElement("div");
    addClasses(container, "filter", "display-row", "align--center", "hide-scrollbar");
    container.append(optContainer);
    //   long press event handler
    onLongPress(container, () => {
        addClasses(container, "filter--expanded");
        addClasses(optContainer, "filter__buttonCont--expanded");
    });
    // close expanded form
    document.addEventListener("touchstart", closeExpandedContainer);
    document.addEventListener("click", closeExpandedContainer);
    function closeExpandedContainer(ev) {
        const isExpenaded = container.classList.contains("filter--expanded");
        if (!container.contains(ev.target) && isExpenaded) {
            container.classList.toggle("filter--expanded");
            optContainer.classList.toggle("filter__buttonCont--expanded");
        }
    }
    //   add categories
    Categories.forEach((category) => {
        // mount recurring items
        const recurringItemButton = mountRecurringItem({ label: category });
        // add event listener to filter list on category click
        recurringItemButton.addEventListener("click", () => {
            // get the label
            const label = recurringItemButton.innerText;
            // check if its contained or not
            if (getState().has(label))
                getState().delete(label);
            else
                getState().add(label);
            // update state accordingly
            setState(getState());
        });
        container.append(recurringItemButton);
    });
    pageWrapper.prepend(container);
}
