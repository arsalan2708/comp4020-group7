import { InitializeList } from "./components/list.js";
import { mountPageWrapper } from "./components/pageWrapper.js";
import { TemplateItem, Categories } from "./types/types.js";
import { ActionButtonType } from "./types/types";

const IS_INDEX_PAGE = false;
const IS_EXPANDABLE = false;
const showSuggestedButton = false;
const actionButtonType: ActionButtonType = "delete";

// mount page wrapper
mountPageWrapper({
  title: "Categories",
  isIndexPage: IS_INDEX_PAGE,
  onAddClick: () =>
    list.addItem({
      item: TemplateItem,
      expandable: IS_EXPANDABLE,
      list,
      actionButtonType,
    }),
  showSuggested: showSuggestedButton,
});

// exportable to make it global
const list = InitializeList({
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

// add the list of categories to the page
Categories.map((category) => category)
  .reverse()
  .forEach((category) => {
    const template = TemplateItem;
    template.label = category;
    list.addItem({
      item: TemplateItem,
      expandable: IS_EXPANDABLE,
      list,
      actionButtonType,
      showInputDefault: false,
    });
  });
