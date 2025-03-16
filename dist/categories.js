import { InitializeList } from "./components/list.js";
import { mountPageWrapper } from "./components/pageWrapper.js";
import { Categories } from "./types/types.js";
import { getUser } from "./utils/getUser.js";
import { createItemTemplate } from "./utils/createItemTemplate.js";
const IS_INDEX_PAGE = false;
const IS_EXPANDABLE = false;
const showSuggestedButton = false;
const actionButtonType = "delete";
const user = getUser();
// mount page wrapper
mountPageWrapper({
    title: "Categories",
    isIndexPage: IS_INDEX_PAGE,
    onAddClick: () => list.addItem({
        item: createItemTemplate(),
        expandable: IS_EXPANDABLE,
        list,
        actionButtonType,
    }),
    showSuggested: showSuggestedButton,
    user,
});
// exportable to make it global
const list = InitializeList({
    primaryID: user.userID,
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
    const template = createItemTemplate();
    template.label = category;
    list.addItem({
        item: template,
        expandable: IS_EXPANDABLE,
        list,
        actionButtonType,
        showInputDefault: false,
    });
});
