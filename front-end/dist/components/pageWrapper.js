import { mountAddButton } from "./addButton.js";
import { mountNavBar } from "./navBar.js";
export function mountPageWrapper({ title, isIndexPage, onAddClick, onsuggestClick, showSuggested = true, user, list, }) {
    // create the top nav bar
    mountNavBar({ title, isIndexPage, user, list });
    // mount action button
    mountAddButton({
        isIndexPage,
        onAddClick: onAddClick, //   TODO: action
        onsuggestClick: onsuggestClick, //   TODO: action
        showSuggested,
    });
}
