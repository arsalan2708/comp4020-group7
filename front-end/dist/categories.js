import { InitializeList } from "./components/list.js";
import { mountPageWrapper } from "./components/pageWrapper.js";
import { TemplateItem } from "./types/types.js";
const IS_INDEX_PAGE = false;
const IS_EXPANDABLE = false;
const showSuggestedButton = false;
const actionButtonType = "delete";
// mount page wrapper
mountPageWrapper({
    title: "Categories",
    isIndexPage: IS_INDEX_PAGE,
    onAddClick: () => List.addItem({
        item: TemplateItem,
        expandable: IS_EXPANDABLE,
        list: List,
        actionButtonType,
    }),
    showSuggested: showSuggestedButton,
});
// exportable to make it global
export const List = InitializeList();
/** ------FOR TESTING  ---------------- */
// const { container } = mountListItem({
//   itemID: TemplateItem.itemID,
//   label: TemplateItem.label,
//   //   isRecurring: TemplateItem.isRecurring,
//   //   amount: TemplateItem.amount,
//   //   checked: TemplateItem.checked,
//   //   description: TemplateItem.description,
//   //   category: "",
//   //   onActionButtonClick?: () => void,
//   //   onClick?: () => void,
//   actionButtonType: actionButtonType,
//   expandable: IS_EXPANDABLE,
//   list: List,
// });
// const listElement = document.querySelector(".page-wrapper__list");
// listElement && listElement.append(container);
