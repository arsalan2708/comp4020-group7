import { mountPageWrapper } from "./components/pageWrapper.js";

const IS_INDEX_PAGE = false;

// mount page wrapper
mountPageWrapper({
  title: "List 1",
  isIndexPage: IS_INDEX_PAGE,
  onAddClick: () => {
    const a = document.createElement("a");
    a.href = "/";
    a.click();
  },
  onsuggestClick: () => {},
});
