import { getUser } from "./getUser.js";
const prefix = "list--";
/**
 * gets list items with a listID from the local storage
 * @param listID listID to search for items in the local storage for
 * @returns items stored in the local storage
 */
export function getListItems(listID) {
    // if listID is undefined, stop here
    if (!listID)
        return;
    // if no list exists in local storage stop here
    const temp = localStorage.getItem(prefix + listID);
    if (!temp)
        return;
    // return list parsed to listItem array
    return JSON.parse(temp);
}
/**
 * adds an item to a list stored in local storage
 * @param listID listID to add item to
 * @param item item to add to list
 * @returns void
 */
export function addListItem(listID, item) {
    // if no list exists in local storage, stop here
    const temp = localStorage.getItem(prefix + listID);
    if (temp) {
        //if there is already data
        // add item to list
        const list = JSON.parse(temp);
        list.push(item);
        // update local storage
        localStorage.setItem(prefix + listID, JSON.stringify(list));
    }
    else {
        // create local storage
        localStorage.setItem(prefix + listID, JSON.stringify([item]));
    }
}
/**
 * deletes and item from a list stored in local storage
 * @param listID listID to delete item from
 * @param itemID itemID to delete from list
 * @returns void
 */
export function deleteListItem(listID, itemID) {
    // if no list exists in local storage, stop here
    const temp = localStorage.getItem(prefix + listID);
    if (!temp)
        return;
    // filter item out of list
    const list = JSON.parse(temp);
    const filteredList = list.filter((item) => {
        if ("itemID" in item)
            return item.itemID !== itemID;
        else
            return item.listID !== itemID;
    });
    // update local storage
    localStorage.setItem(prefix + listID, JSON.stringify(filteredList));
}
/**
 * updates a list item stored in local storage
 * @param listID listID to update
 * @param itemID itemID to update
 * @param item item data to update with
 * @returns void
 */
export function updateListItem(listID, itemID, item) {
    // if no list exists in local storage, stop here
    const temp = localStorage.getItem(prefix + listID);
    if (!temp)
        return;
    // add find list index of item
    const list = JSON.parse(temp);
    const ind = list.findIndex((item) => {
        if ("itemID" in item)
            return item.itemID === itemID;
        else
            return item.listID === itemID;
    });
    // update list index
    list[ind] = item;
    // update local storage
    localStorage.setItem(prefix + listID, JSON.stringify(list));
}
/**
 * gets the label associated with a list for the page wrapper
 * @param listID listID you want to get list label for
 * @returns return list label if one exists or none
 */
export function getListLabel(listID) {
    // stop if there is no list id
    if (!listID)
        return;
    // get all the list items associated with this user. stop if there is none
    const temp = getListItems(getUser().userID);
    if (!temp)
        return;
    // find the list if it exists
    const initList = temp.find((item) => item.listID === listID);
    if (!initList)
        return;
    // return the label
    return initList.label;
}
