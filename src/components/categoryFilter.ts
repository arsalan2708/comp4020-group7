import { Categories } from "../types/types.js";
import { addClasses } from "../utils/addClasses.js";
import { onLongPress } from "../utils/longPress.js";
import { useState } from "../utils/useState.js";
import { mountRecurringItem } from "./recurringItem.js";

//state management for the filter component
const filterStates = useState(new Set<string>());
const { state, setState } = filterStates;

/**
 * Singleton method to make the same instance of the filter states available throughout the app
 * @returns return the same instance of filter states
 */
export function FilterStates() {
  return filterStates;
}

export function mountCategoryFilter() {
  // page wrapper container
  const pageWrapper = document.querySelector(
    ".page-wrapper__page-content"
  ) as HTMLElement;

  if (!pageWrapper) return;

  // options button
  const options = mountRecurringItem({ label: "i" });
  addClasses(options, "filter__button");

  //   container for the button to give sticky effect
  const optContainer = document.createElement("div");
  addClasses(optContainer, "filter__buttonCont", "center");
  optContainer.append(options);

  // component container
  const container = document.createElement("div");
  addClasses(
    container,
    "filter",
    "display-row",
    "align--center",
    "hide-scrollbar"
  );
  container.append(optContainer);

  //   long press event handler
  onLongPress(container, () => {
    addClasses(container, "filter--expanded");
    addClasses(optContainer, "filter__buttonCont--expanded");
  });

  // close expanded form
  document.addEventListener("touchstart", closeExpandedContainer);
  document.addEventListener("click", closeExpandedContainer);

  function closeExpandedContainer(ev: Event) {
    const isExpenaded = container.classList.contains("filter--expanded");
    if (!container.contains(ev.target as Node) && isExpenaded) {
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
      const label = recurringItemButton.innerText;
      if (state.has(label)) state.delete(label);
      else state.add(label);
      setState(state);
    });

    container.append(recurringItemButton);
  });

  pageWrapper.prepend(container);
}
