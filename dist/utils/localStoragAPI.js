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
    const temp = localStorage.getItem(`list--${listID}`);
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
    const temp = localStorage.getItem(`list--${listID}`);
    if (!temp)
        return;
    // add item to list
    const list = JSON.parse(temp);
    list.push(item);
    // update local storage
    localStorage.setItem(`list--${listID}`, JSON.stringify(list));
}
