import { mountAddButton } from "./add-button.js";
import { mountNavBar } from "./nav-bar.js";
export function mountPageWrapper({ title, isIndexPage, onAddClick, onsuggestClick, }) {
    // create the top nav bar
    mountNavBar({ title, isIndexPage });
    // mount action button
    mountAddButton({
        isIndexPage,
        onAddClick: onAddClick, //   TODO: action
        onsuggestClick: onsuggestClick, //   TODO: action
    });
}
