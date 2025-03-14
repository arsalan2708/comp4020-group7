import { Page } from "../types/types";

/**
 * route to the list page for a give list with listID
 * @param listID id for list to route to
 */
export function routeToList(listID: string) {
  window.location.href = `/list.html?id=${listID}`;
}

/**
 * route to a page. Page without the .html
 * @param page page to route to
 */
export function routeToPage(page: Page) {
  window.location.href = `/${page}${page.length ? ".html" : ""}`;
}
