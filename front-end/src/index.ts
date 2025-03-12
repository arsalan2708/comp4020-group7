import { CreateList } from "./components/init-list.js";
import { mountPageWrapper } from "./components/page-wrapper.js";
import { InitListItem } from "./types/types.js";

const IS_INDEX_PAGE = true;

// TODO: temporary
const templateList: InitListItem = {
  listID: "hi",
  primaryID: "hi",
  checkedItems: 3,
  totalItems: 5,
  label: "label",
  date: new Date().toJSON().substring(0, 10),
};

// mount page wrapper
mountPageWrapper({
  title: "Shared List",
  isIndexPage: IS_INDEX_PAGE,
  onAddClick: () => {
    list.addList(templateList);
  },
  onsuggestClick: () => {},
});

// list of lists
const list = CreateList();
