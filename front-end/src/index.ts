import { ListModalMode, mountListModal } from "./components/createListModal.js";
import { InitializeInitList } from "./components/initList.js";
import { mountPageWrapper } from "./components/pageWrapper.js";

const IS_INDEX_PAGE = true;

// mount page wrapper
mountPageWrapper({
  title: "Shared List",
  isIndexPage: IS_INDEX_PAGE,
  onAddClick: () => mountListModal({ mode: ListModalMode.Create, list }),
  onsuggestClick: () => {},
});

// list of lists
const list = InitializeInitList({
  onAddItem: (item) => {
    console.log("item added...", item);
  },
  ondeleteItem: (itemID) => {
    console.log("item deleted...", itemID);
  },
  onupdateItem: (item) => {
    console.log("item updated...", item);
  },
});
