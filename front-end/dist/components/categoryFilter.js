import { Categories } from "../types/types.js";
import { addClasses } from "../utils/addClasses.js";
import { mountRecurringItem } from "./recurringItem.js";
export function mountCategoryFilter() {
    // page wrapper container
    const pageWrapper = document.querySelector(".page-wrapper__page-content");
    if (!pageWrapper)
        return;
    // options button
    const options = mountRecurringItem({ label: "i" });
    addClasses(options, "filter__button");
    //   container for the button to give sticky effect
    const optContainer = document.createElement("div");
    addClasses(optContainer, "filter__buttonCont");
    optContainer.append(options);
    // component container
    const container = document.createElement("div");
    addClasses(container, "filter", "display-row", "align--center");
    container.append(optContainer);
    //   add categories
    Categories.forEach((category) => {
        container.append(mountRecurringItem({ label: category }));
    });
    pageWrapper.prepend(container);
}
