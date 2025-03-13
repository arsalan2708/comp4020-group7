import { InitializeList } from "./components/list.js";
import { mountPageWrapper } from "./components/pageWrapper.js";
import { ListItem } from "./types/types";

const IS_INDEX_PAGE = false;

const temp: ListItem = {
  listID: "",
  itemID: "",
  label: "",
  isRecurring: false,
  amount: 3,
  checked: false,
  description: "",
  categoryID: "",
  posterID: "",
};

// mount page wrapper
mountPageWrapper({
  title: "List 1",
  isIndexPage: IS_INDEX_PAGE,
  onAddClick: () => List.addItem(temp, true),
  onsuggestClick: () => {},
});

const List = InitializeList();
