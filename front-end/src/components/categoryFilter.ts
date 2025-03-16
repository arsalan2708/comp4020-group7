import { Categories } from "../types/types.js";
import { addClasses } from "../utils/addClasses.js";
import { onLongPress } from "../utils/longPress.js";
import { mountRecurringItem } from "./recurringItem.js";

interface Props {}

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
    container.append(mountRecurringItem({ label: category }));
  });

  pageWrapper.prepend(container);
}
