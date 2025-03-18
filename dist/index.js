import { ListModalMode, mountListModal } from "./components/createListModal.js";
import { InitializeInitList } from "./components/initList.js";
import { mountPageWrapper } from "./components/pageWrapper.js";
import { getUser } from "./utils/getUser.js";
const IS_INDEX_PAGE = true;
const user = getUser();
// list of lists
const list = InitializeInitList({
    primaryID: user.userID,
    onAddItem: (list) => {
        console.log("list added...", list);
    },
    ondeleteItem: (listID) => {
        console.log("list deleted...", listID);
        localStorage.removeItem(`list--${listID}`);
    },
    onupdateItem: (list) => {
        console.log("list updated...", list);
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
            localStorage.setItem(`list--${listID}`, JSON.stringify(recurringItemsArray));
        },
    }),
    onsuggestClick: () => { },
    user,
    list,
});
/** ------FOR TESTING  ---------------- */
// const listElement = document.querySelector(".page-wrapper__list");
// listElement && listElement.append(container); //container is the element you want to test
