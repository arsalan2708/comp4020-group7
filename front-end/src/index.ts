import { CreateList } from "./components/init-list.js";
import { mountPageWrapper } from "./components/page-wrapper.js";
import { generateID } from "./utils/generateID.js";

const IS_INDEX_PAGE = true;

// TODO: temporary
const createListItem = () => ({
  listID: generateID(),
  primaryID: generateID(),
  checkedItems: 3,
  totalItems: 5,
  label: "label",
  date: new Date().toJSON().substring(0, 10),
});

// mount page wrapper
mountPageWrapper({
  title: "Shared List",
  isIndexPage: IS_INDEX_PAGE,
  onAddClick: () => {
    list.addList(createListItem());
  },
  onsuggestClick: () => {},
});

// list of lists
const list = CreateList();
