import { CreateList } from "./components/init-list.js";
import { mountPageWrapper } from "./components/page-wrapper.js";

const IS_INDEX_PAGE = true;

// mount page wrapper
mountPageWrapper({
  title: "Shared List",
  isIndexPage: IS_INDEX_PAGE,
  onAddClick: () => {
    const a = document.createElement("a");
    a.href = "/list.html";
    a.click();
  },
  onsuggestClick: () => {},
});

// list of lists
const list = CreateList();
