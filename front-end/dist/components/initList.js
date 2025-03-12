import { mountInitListItem } from "./initListItem.js";
/**
 * factory method for lists. Uses the same instance no matter where this is called from
 * @returns returns a list instance
 */
export function InitializeList() {
    return LIST;
}
// get <ul> from page wrapper
const listElement = document.querySelector(".page-wrapper__list");
//   list instance returned
const LIST = {
    list: [],
    addList,
    getList,
    updateList,
    deleteList,
};
// add item to list
function addList(list) {
    this.list.push(list);
    if (!listElement)
        return;
    listElement.appendChild(mountInitListItem(Object.assign({}, list)));
}
// get item from list
function getList(listID) {
    return this.list.find((list) => list.listID === listID);
}
// update list item
function updateList(initListItem) {
    //   find the index of the list
    const index = this.list.findIndex((list) => list.listID === initListItem.listID);
    //   if it doesnt exists end it here and return false
    if (index < 0)
        return false;
    //   update item and return true
    this.list[index] = initListItem;
    return true;
}
// delete item from list
function deleteList(listID) {
    this.list = this.list.filter((list) => list.listID !== listID);
    return this.list.some((list) => list.listID === listID);
}
