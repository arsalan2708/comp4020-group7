import { InitListItem, ListItem } from "../types/types";

/**
 * gets list items with a listID from the local storage
 * @param listID listID to search for items in the local storage for
 * @returns items stored in the local storage
 */
export function getListItems(listID: string | undefined) {
  // if listID is undefined, stop here
  if (!listID) return;

  // if no list exists in local storage stop here
  const temp = localStorage.getItem(`list--${listID}`);
  if (!temp) return;

  // return list parsed to listItem array
  return JSON.parse(temp) as ListItem[];
}

/**
 * adds an item to a list stored in local storage
 * @param listID listID to add item to
 * @param item item to add to list
 * @returns void
 */
export function addListItem<T>(listID: string, item: T) {
  // if no list exists in local storage, stop here
  const temp = localStorage.getItem(`list--${listID}`);
  if (!temp) return;

  // add item to list
  const list = JSON.parse(temp) as T[];
  list.push(item);

  // update local storage
  localStorage.setItem(`list--${listID}`, JSON.stringify(list));
}

/**
 * deletes and item from a list stored in local storage
 * @param listID listID to delete item from
 * @param itemID itemID to delete from list
 * @returns void
 */
export function deleteListItem<T extends ListItem | InitListItem>(
  listID: string,
  itemID: string
) {
  // if no list exists in local storage, stop here
  const temp = localStorage.getItem(`list--${listID}`);
  if (!temp) return;

  // filter item out of list
  const list = JSON.parse(temp) as T[];
  // if ("itemID" in list) list as ListItem[]

  const filteredList = list.filter((item) => {
    if ("itemID" in item) return (item as ListItem).itemID !== itemID;
    else return (item as InitListItem).listID !== itemID;
  });

  // update local storage
  localStorage.setItem(`list--${listID}`, JSON.stringify(filteredList));
}
