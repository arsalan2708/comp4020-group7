import { InitializeList } from "./components/list.js";
import { mountPageWrapper } from "./components/pageWrapper.js";
import { ActionButtonType } from "./types/types";
import { createItemTemplate } from "./utils/createItemTemplate.js";
import { generateID } from "./utils/generateID.js";
import { getUser } from "./utils/getUser.js";

const IS_INDEX_PAGE = false;
const IS_EXPANDABLE = false;
const showSuggestedButton = false;
const actionButtonType: ActionButtonType = "participants";

const user = getUser();

// Mount page wrapper
mountPageWrapper({
  title: "Participants",
  isIndexPage: IS_INDEX_PAGE,
  onAddClick: () => {
    // Prompt the user to enter a participant name.
    const participantName = prompt("Enter participant name:");
    if (participantName && participantName.trim() !== "") {
      const newParticipant = createItemTemplate();
      newParticipant.label = participantName;
      newParticipant.categoryID = "participant";
      newParticipant.role = "secondary";
      newParticipant.itemID = generateID();
      newParticipant.posterID = getUser().userID;

      list.addItem({
        item: newParticipant,
        expandable: IS_EXPANDABLE,
        list,
        actionButtonType,
        showInputDefault: false,
      });
    }
  },
  showSuggested: showSuggestedButton,
  user,
});

// Initialize the list
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

// add a secondary shopper
const secondaryShopper = createItemTemplate();
secondaryShopper.label = "Sally";
secondaryShopper.itemID = generateID();
secondaryShopper.posterID = getUser().userID;
secondaryShopper.categoryID = "participant";
secondaryShopper.role = "secondary";
list.addItem({
  item: secondaryShopper,
  expandable: IS_EXPANDABLE,
  list,
  showInputDefault: false,
  isFromBackEnd: true,
  actionButtonType: "participants",
});

// add the primary shopper
const primaryShopper = createItemTemplate();
primaryShopper.label = getUser().userName;
primaryShopper.itemID = getUser().userID;
primaryShopper.posterID = getUser().userID;
primaryShopper.categoryID = "participant";
list.addItem({
  item: primaryShopper,
  expandable: IS_EXPANDABLE,
  list,
  showInputDefault: false,
  isFromBackEnd: true,
  actionButtonType: "participants",
});
