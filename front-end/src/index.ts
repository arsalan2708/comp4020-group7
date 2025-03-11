import { mountAddButton } from "./components/add-button.js";
import { mountNavBar } from "./components/nav-bar.js";

const IS_INDEX_PAGE = true;

// create the top nav bar
mountNavBar("Shared List", IS_INDEX_PAGE);

// mount action button
mountAddButton(IS_INDEX_PAGE);
