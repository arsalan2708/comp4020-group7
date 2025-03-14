/**
 * route to the list page for a give list with listID
 * @param listID id for list to route to
 */
export function routeToList(listID) {
    window.location.href = `/list.html?id=${listID}`;
}
/**
 * route to a page. Page without the .html
 * @param page page to route to
 */
export function routeToPage(page) {
    window.location.href = `/${page}${page.length ? ".html" : ""}`;
}
