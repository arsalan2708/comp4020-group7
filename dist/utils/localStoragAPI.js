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
