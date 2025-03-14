import { InitializeList } from "./components/list.js";
import { mountListItem } from "./components/listItem.js";
import { mountPageWrapper } from "./components/pageWrapper.js";
import { TemplateItem } from "./types/types.js";
import { ActionButtonType } from "./types/types";
import { mountCategoryFilter } from "./components/categoryFilter.js";

const IS_INDEX_PAGE = false;
const IS_EXPANDABLE = true;
const actionButtonType: ActionButtonType = "checkbox";

// mount page wrapper
mountPageWrapper({
  title: "List 1",
  isIndexPage: IS_INDEX_PAGE,
  onAddClick: () =>
    List.addItem({
      item: TemplateItem,
      expandable: IS_EXPANDABLE,
      list: List,
      actionButtonType,
    }),
  onsuggestClick: () => {},
});

// exportable to make it global
export const List = InitializeList();

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
