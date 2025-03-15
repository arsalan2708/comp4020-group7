import { InitializeList } from "./components/list.js";
import { mountPageWrapper } from "./components/pageWrapper.js";
import { TemplateItem } from "./types/types.js";
import { getUser } from "./utils/getUser.js";
const IS_INDEX_PAGE = false;
const IS_EXPANDABLE = false;
const showSuggestedButton = false;
const actionButtonType = "delete";
const user = getUser();
// Mount page wrapper
mountPageWrapper({
    title: "Participants",
    isIndexPage: IS_INDEX_PAGE,
    onAddClick: () => {
        // Prompt the user to enter a participant name.
        const participantName = prompt("Enter participant name:");
        if (participantName && participantName.trim() !== "") {
            const newParticipant = Object.assign({}, TemplateItem);
            newParticipant.label = participantName;
            newParticipant.description = "Participant added by user";
            newParticipant.categoryID = "participant";
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
