import { mountInitListItem } from "./initListItem.js";
// get <ul> from page wrapper
const LIST_ELEMENT = document.querySelector(".page-wrapper__list");
/**
 * factory method for lists. call once
 * @param onAddItem call back for when an item is added successfully
 * @param onupdateItem call back for when an item is updated
 * @param ondeleteItem call back for when an item is deleted
 * @returns returns a list instance
 */
export function InitializeInitList({ onAddItem, onupdateItem, ondeleteItem, }) {
    return {
        list: [],
        addItem: addList,
        getItem: getList,
        updateItem: updateList,
        deleteItem: deleteList,
        onAddItem,
        onupdateItem,
        ondeleteItem,
    };
}
// add item to list
function addList({ item, isFromBackEnd = false, }) {
    this.list.push(item);
    if (!LIST_ELEMENT)
        return;
    LIST_ELEMENT.appendChild(mountInitListItem(Object.assign({}, item)));
    !isFromBackEnd && this.onAddItem(item);
}
// get item from list
function getList(listID) {
    return this.list.find((list) => list.listID === listID);
}
// update list item
function updateList(item, isFromBackEnd) {
    const runOnUpdate = !isFromBackEnd || true;
    //   find the index of the list
    const index = this.list.findIndex((list) => list.listID === item.listID);
    //   if it doesnt exists end it here and return false
    if (index < 0)
        return false;
    //   update item and return true
    this.list[index] = item;
    runOnUpdate && this.onupdateItem(item);
    return true;
}
// delete item from list
function deleteList(listID, isFromBackEnd) {
    const runOnUpdate = !isFromBackEnd || true;
    this.list = this.list.filter((list) => list.listID !== listID);
    const element = document.getElementById(listID);
    if (!element)
        return false;
    element.remove();
    runOnUpdate && this.ondeleteItem(listID);
    return true;
}
