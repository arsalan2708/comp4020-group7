import { ListModalMode, mountListModal } from "./components/createListModal.js";
import { InitializeInitList } from "./components/initList.js";
import { mountPageWrapper } from "./components/pageWrapper.js";
import { getUser } from "./utils/getUser.js";

const IS_INDEX_PAGE = true;

const user = getUser();

// mount page wrapper
mountPageWrapper({
  title: "Shared List",
  isIndexPage: IS_INDEX_PAGE,
  onAddClick: () =>
    mountListModal({
      mode: ListModalMode.Create,
      list,
      userID: user.userID,
      onRecurringItemsSubmit: (recurringItemsArray, listID) => {
        // event for when recurring items are added in a newly created list on submit
        console.log("recuring items added to list...", recurringItemsArray);
        console.log("listID they are added to...", listID);
      },
    }),
  onsuggestClick: () => {},
  user,
});

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

/** ------FOR TESTING  ---------------- */
// const listElement = document.querySelector(".page-wrapper__list");
// listElement && listElement.append(container); //container is the element you want to test
