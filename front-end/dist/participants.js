import { InitializeList } from "./components/list.js";
import { mountPageWrapper } from "./components/pageWrapper.js";
import { createItemTemplate } from "./utils/createItemTemplate.js";
import { getUser } from "./utils/getUser.js";
const IS_INDEX_PAGE = false;
const IS_EXPANDABLE = true;
const showSuggestedButton = false;
const actionButtonType = "default";
const user = getUser();
function addParticipant() {
    const newParticipant = createItemTemplate();
    newParticipant.label = "";
    newParticipant.description = "New participant";
    newParticipant.categoryID = "participant";
    newParticipant.role = "primary";
    list.addItem({
        item: newParticipant,
        expandable: false,
        list,
        actionButtonType: "delete",
        showInputDefault: true,
    });
}
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
            newParticipant.description = "Participant added by user";
            newParticipant.categoryID = "participant";
            list.addItem({
                item: newParticipant,
                expandable: IS_EXPANDABLE,
                list,
                actionButtonType,
                showInputDefault: true,
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
