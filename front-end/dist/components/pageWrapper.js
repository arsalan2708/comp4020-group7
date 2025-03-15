import { mountAddButton } from "./addButton.js";
import { mountNavBar } from "./navBar.js";
export function mountPageWrapper({ title, isIndexPage, onAddClick, onsuggestClick, showSuggested = true, userName, }) {
    // create the top nav bar
    mountNavBar({ title, isIndexPage, userName });
    // mount action button
    mountAddButton({
        isIndexPage,
        onAddClick: onAddClick, //   TODO: action
        onsuggestClick: onsuggestClick, //   TODO: action
        showSuggested,
    });
}
