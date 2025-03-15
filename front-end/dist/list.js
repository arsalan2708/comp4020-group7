import { InitializeList } from "./components/list.js";
import { mountPageWrapper } from "./components/pageWrapper.js";
import { mountCategoryFilter } from "./components/categoryFilter.js";
import { getUser } from "./utils/getUser.js";
import { createItemTemplate } from "./utils/createItemTemplate.js";
const IS_INDEX_PAGE = false;
const IS_EXPANDABLE = true;
const actionButtonType = "checkbox";
const user = getUser();
// mount page wrapper
mountPageWrapper({
    title: "List 1",
    isIndexPage: IS_INDEX_PAGE,
    onAddClick: () => list.addItem({
        item: createItemTemplate(),
        expandable: IS_EXPANDABLE,
        list: list,
        actionButtonType,
    }),
    onsuggestClick: () => { },
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
