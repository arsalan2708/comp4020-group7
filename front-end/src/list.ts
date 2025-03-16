import { InitializeList } from "./components/list.js";
import { mountListItem } from "./components/listItem.js";
import { mountPageWrapper } from "./components/pageWrapper.js";
import { ActionButtonType } from "./types/types";
import { mountCategoryFilter } from "./components/categoryFilter.js";
import { getUser } from "./utils/getUser.js";
import { createItemTemplate } from "./utils/createItemTemplate.js";
import { itemIteratorNext } from "./utils/listItemIterator.js";
import { generateID } from "./utils/generateID.js";

const MAX_SUGGESTED_ITEMS = 4;
const IS_INDEX_PAGE = false;
const IS_EXPANDABLE = true;
const actionButtonType: ActionButtonType = "checkbox";

const user = getUser();

// generate the suggested items
let isSuggesting = false;
const NUM_SEGGESTED_ITEMS = new Array(MAX_SUGGESTED_ITEMS).fill(0);
const suggestedItems = NUM_SEGGESTED_ITEMS.map((_) => {
  const template = createItemTemplate();
  template.label = itemIteratorNext();
  template.itemID = generateID();
  template.posterID = generateID();
  template.listID = "";
  return template;
});

// mount page wrapper
mountPageWrapper({
  title: "List 1",
  isIndexPage: IS_INDEX_PAGE,
  onAddClick: () => {
    const template = createItemTemplate();
    template.itemID = generateID();
    template.posterID = user.userID;
    template.listID = "";
    list.addItem({
      item: template,
      expandable: IS_EXPANDABLE,
      list: list,
      actionButtonType,
    });
  },
  onsuggestClick: () => {
    // toggle is suggested
    isSuggesting = !isSuggesting;

    // add or delete items accordingly
    suggestedItems.forEach((itm) => {
      if (isSuggesting) {
        list.addItem({
          item: itm,
          expandable: IS_EXPANDABLE,
          list: list,
          actionButtonType: "accept",
          showInputDefault: false,
        });
      } else {
        list.deleteItem(itm.itemID);
      }
    });
  },
  user,
});

// exportable to make it global
const list = InitializeList({
  primaryID: user.userID,
  listID: "", //TODO: pass through URL
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

mountCategoryFilter();

/** ------FOR TESTING  ---------------- */
// const { container } = mountListItem({
//   itemID: TemplateItem.itemID,
//   label: TemplateItem.label,
//   isRecurring: TemplateItem.isRecurring,
//   amount: TemplateItem.amount,
//   checked: TemplateItem.checked,
//   description: TemplateItem.description,
//   category: "Category",
//   //   onActionButtonClick?: () => void,
//   //   onClick?: () => void,
//   actionButtonType: "checkbox",
//   expandable: true,
//   list: List,
// });

// const listElement = document.querySelector(".page-wrapper__list");
// listElement && listElement.append(container);
