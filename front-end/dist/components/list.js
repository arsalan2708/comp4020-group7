import { generateID } from "../utils/generateID.js";
import { mountListItem } from "./listItem.js";
/**
 * factory method for lists. Creates a new instance for every call. should be called once per page
 * @returns returns a list instance
 */
export function InitializeList() {
    const LIST = {
        list: [],
        addItem,
        getItem,
        updateItem,
        deleteItem,
    };
    return LIST;
}
// get <ul> from page wrapper
const listElement = document.querySelector(".page-wrapper__list");
//   list instance returned
// add item to list
function addItem(item, expandable) {
    const id = generateID();
    item.itemID = id;
    this.list.push(item);
    if (!listElement)
        return;
    const { container: li } = mountListItem({
        itemID: item.itemID,
        label: item.label,
        isRecurring: item.isRecurring,
        amount: item.amount,
        checked: item.checked,
        description: item.description,
        category: "Category",
        //   onActionButtonClick?: () => void,
        //   onClick?: () => void,
        actionButtonType: "checkbox",
        expandable: expandable || false,
    });
    listElement.appendChild(li);
}
// get item from list
function getItem(itemID) {
    return this.list.find((item) => item.itemID === itemID);
}
// TODO: handle updating the list. only the html is getting uptdated rn
//(use getItem to get the item to pass to this)
// update list item
function updateItem(item) {
    //   find the index of the list
    const index = this.list.findIndex((item_) => item_.itemID === item.itemID);
    //   if it doesnt exists end it here and return false
    if (index < 0)
        return false;
    //   update item and return true
    this.list[index] = item;
    return true;
}
/**
 * deletes an item from the list
 * @param itemID item ID to delete from list
 * @returns true if item was deleted false otherwise
 */
function deleteItem(itemID) {
    this.list = this.list.filter((item) => item.itemID !== itemID);
    // get list item element
    const li = document.getElementById(itemID);
    if (!li)
        return false;
    li.remove();
    return true;
}
