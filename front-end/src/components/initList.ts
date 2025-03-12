import { InitList, InitListItem } from "../types/types";
import { mountInitListItem } from "./initListItem.js";

/**
 * factory method for lists. (ONLY USE ONCE)
 * @returns returns a list instance
 */
export function InitializeList() {
  return LIST;
}

// get <ul> from page wrapper
const listElement = document.querySelector(".page-wrapper__list");

//   list instance returned
const LIST: InitList = {
  list: [],
  addList,
  getList,
  updateList,
  deleteList,
};

// add item to list
function addList(this: InitList, list: InitListItem) {
  this.list.push(list);

  if (!listElement) return;

  listElement.appendChild(mountInitListItem({ ...list }));
}

// get item from list
function getList(this: InitList, listID: string) {
  return this.list.find((list) => list.listID === listID);
}

// update list item
function updateList(this: InitList, initListItem: InitListItem): boolean {
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
function deleteList(this: InitList, listID: string): boolean {
  this.list = this.list.filter((list) => list.listID !== listID);
  return this.list.some((list) => list.listID === listID);
}
