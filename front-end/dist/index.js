import { ListModalMode, mountListModal } from "./components/createListModal.js";
import { InitializeInitList } from "./components/initList.js";
import { mountPageWrapper } from "./components/pageWrapper.js";
import { mountUserNameModal } from "./components/userNameModal.js";
import { generateID } from "./utils/generateID.js";
const IS_INDEX_PAGE = true;
const USERNAME = localStorage.getItem("username");
// get user name
if (!USERNAME) {
    mountUserNameModal({
        onSubmit: (username) => {
            console.log("submited user name", username);
            localStorage.setItem("username", username);
            localStorage.setItem("userID", generateID());
        },
    });
}
console.log("username", USERNAME);
// mount page wrapper
mountPageWrapper({
    title: "Shared List",
    isIndexPage: IS_INDEX_PAGE,
    onAddClick: () => mountListModal({ mode: ListModalMode.Create, list }),
    onsuggestClick: () => { },
});
// list of lists
const list = InitializeInitList({
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
/** ------FOR TESTING  ---------------- */
// const listElement = document.querySelector(".page-wrapper__list");
// listElement && listElement.append(container); //container is the element you want to test
