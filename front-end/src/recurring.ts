import { InitializeList } from "./components/list.js";
import { mountPageWrapper } from "./components/pageWrapper.js";
import { TemplateItem, RecurringItems } from "./types/types.js";
import { ActionButtonType } from "./types/types";
import { getUser } from "./utils/getUser.js";

const IS_INDEX_PAGE = false;
const IS_EXPANDABLE = true;
const showSuggestedButton = false;
const actionButtonType: ActionButtonType = "default";

const user = getUser();

// mount page wrapper
mountPageWrapper({
  title: "Recurring Items",
  isIndexPage: IS_INDEX_PAGE,
  onAddClick: () =>
    list.addItem({
      item: TemplateItem,
      expandable: IS_EXPANDABLE,
      list,
      actionButtonType,
    }),
  showSuggested: showSuggestedButton,
  user,
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

// add the list of recurring items to the page
RecurringItems.map((item) => item)
  .reverse()
  .forEach((item) => {
    const template = TemplateItem;
    template.label = item;
    list.addItem({
      item: TemplateItem,
      expandable: IS_EXPANDABLE,
      list,
      actionButtonType,
      showInputDefault: false,
    });
  });
