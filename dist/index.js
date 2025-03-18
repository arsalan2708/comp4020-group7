import { ListModalMode, mountListModal } from "./components/createListModal.js";
import { InitializeInitList } from "./components/initList.js";
import { mountPageWrapper } from "./components/pageWrapper.js";
import { getUser } from "./utils/getUser.js";
const IS_INDEX_PAGE = true;
const user = getUser();
// list of lists
const list = InitializeInitList({
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
