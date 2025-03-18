import { ListModalMode, mountListModal } from "./components/createListModal.js";
import { InitializeInitList } from "./components/initList.js";
import { mountPageWrapper } from "./components/pageWrapper.js";
import { getUser } from "./utils/getUser.js";
import { addListItem, deleteListItem, getListItems, updateListItem, } from "./utils/localStoragAPI.js";
const IS_INDEX_PAGE = true;
const prefix = "list--";
// list of lists
const list = InitializeInitList({
    primaryID: getUser().userID,
    onAddItem: (list) => {
        console.log("list added...", list);
        addListItem(getUser().userID, list);
    },
    ondeleteItem: (listID) => {
        console.log("list deleted...", listID);
        localStorage.removeItem(prefix + listID);
        deleteListItem(getUser().userID, listID);
    },
    onupdateItem: (list) => {
        console.log("list updated...", list);
        updateListItem(getUser().userID, list.listID, list);
    },
});
// mount page wrapper
mountPageWrapper({
    title: "Shared List",
    isIndexPage: IS_INDEX_PAGE,
    onAddClick: () => mountListModal({
        mode: ListModalMode.Create,
        list,
        onRecurringItemsSubmit: (recurringItemsArray, listID) => {
            // save recurring items to local storage to be pulled back if needed
            localStorage.setItem(prefix + listID, JSON.stringify(recurringItemsArray));
        },
    }),
    onsuggestClick: () => { },
    user: getUser(),
    list,
});
// get list items that may be stored in local storage and add them to the list
const localList = getListItems(getUser().userID);
localList === null || localList === void 0 ? void 0 : localList.forEach((item) => {
    list.addItem({
        item,
        isFromBackEnd: true,
    });
});
/** ------FOR TESTING  ---------------- */
// const listElement = document.querySelector(".page-wrapper__list");
// listElement && listElement.append(container); //container is the element you want to test
