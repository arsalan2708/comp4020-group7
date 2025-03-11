import { mountAddButton } from "./components/add-button.js";
import { mountNavBar } from "./components/nav-bar.js";
const IS_INDEX_PAGE = true;
// create the top nav bar
mountNavBar({ title: "Shared List", isIndexPage: IS_INDEX_PAGE });
// mount action button
mountAddButton({
    isIndexPage: IS_INDEX_PAGE,
    //   TODO: action
    onAddClick: () => {
        const a = document.createElement("a");
        a.href = "/list.html";
        a.click();
    },
    onsuggestClick: () => { },
});
