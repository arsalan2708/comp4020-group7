import { List, InitListItem } from "../types/types";
import { mountInitListItem } from "./initListItem.js";

/**
 * factory method for lists. Uses the same instance no matter where this is called from
 * @returns returns a list instance
 */
export function InitializeInitList() {
  return LIST;
}

// get <ul> from page wrapper
const listElement = document.querySelector(".page-wrapper__list");

//   list instance returned
const LIST: List<InitListItem> = {
  list: [],
  addItem: addList,
  getItem: getList,
  updateItem: updateList,
  deleteItem: deleteList,
};

// add item to list
function addList(
  this: List<InitListItem>,
  {
    item,
    list,
  }: {
    item: InitListItem;
    list?: List<InitListItem>;
  }
) {
  this.list.push(item);

  if (!listElement) return;

  listElement.appendChild(mountInitListItem({ ...item }));
}

// get item from list
function getList(this: List<InitListItem>, listID: string) {
  return this.list.find((list) => list.listID === listID);
}

// update list item
function updateList(
  this: List<InitListItem>,
  initListItem: InitListItem
): boolean {
  //   find the index of the list
  const index = this.list.findIndex(
    (list) => list.listID === initListItem.listID
  );

  //   if it doesnt exists end it here and return false
  if (index < 0) return false;

  //   update item and return true
  this.list[index] = initListItem;
  return true;
}

// delete item from list
function deleteList(this: List<InitListItem>, listID: string): boolean {
  this.list = this.list.filter((list) => list.listID !== listID);
  return this.list.some((list) => list.listID === listID);
}
