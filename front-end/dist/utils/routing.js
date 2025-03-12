/**
 *route to the list page for a give list with listID
 * @param listID id for list to route to
 */
export function routeToList(listID) {
    window.location.href = `/list.html?id=${listID}`;
}
