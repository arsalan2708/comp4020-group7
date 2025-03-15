import { generateID } from "../utils/generateID.js";
import { mountListItem } from "./listItem.js";
/**
 * factory method for lists. Creates a new instance for every call. should be called once per page
 * @returns returns a list instance
 */
export function InitializeList({ onAddItem, onupdateItem, ondeleteItem, }) {
    const LIST = {
        list: [],
        addItem,
        getItem,
        updateItem,
        deleteItem,
        onAddItem,
        onupdateItem,
        ondeleteItem,
    };
    return LIST;
}
// get <ul> from page wrapper
const listElement = document.querySelector(".page-wrapper__list");
//   list instance returned
// add item to list
function addItem({ item, expandable, list, actionButtonType, onActionButtonClick, onClick, showInputDefault, isFromBackEnd = false, }) {
    // if there if no list element or the list obj isnt passed, end here
    if (!list || !listElement)
        return;
    const id = generateID();
    item.itemID = id;
    this.list.push(item);
    const { container: li } = mountListItem({
        item,
        onActionButtonClick,
        onClick,
        actionButtonType,
        expandable: expandable || false,
        list,
        showInputDefault,
        onAddItem: !isFromBackEnd ? this.onAddItem : () => { },
    });
    listElement.prepend(li);
}
// get item from list
function getItem(itemID) {
    return this.list.find((item) => item.itemID === itemID);
}
// TODO: handle updating the list. only the html is getting uptdated rn
//(use getItem to get the item to pass to this)
// update list item
function updateItem(item, isFromBackEnd) {
    const runOnUpdate = !isFromBackEnd || true;
    //   find the index of the list
    const index = this.list.findIndex((item_) => item_.itemID === item.itemID);
    //   if it doesnt exists end it here and return false
    if (index < 0)
        return false;
    //   update item and return true
    this.list[index] = item;
    runOnUpdate && this.onupdateItem(item);
    return true;
}
/**
 * deletes an item from the list
 * @param itemID item ID to delete from list
 * @returns true if item was deleted false otherwise
 */
function deleteItem(itemID, isFromBackEnd) {
    const runOnUpdate = !isFromBackEnd || true;
    this.list = this.list.filter((item) => item.itemID !== itemID);
    // get list item element
    const li = document.getElementById(itemID);
    if (!li)
        return false;
    li.remove();
    runOnUpdate && this.ondeleteItem(itemID);
    return true;
}
