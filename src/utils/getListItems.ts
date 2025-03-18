import { ListItem } from "../types/types";

/**
 * gets list items with a listID from the local storage
 * @param listID listID to search for items in the local storage for
 * @returns items stored in the local storage
 */
export function getListItems(listID: string | undefined) {
  if (!listID) return;

  const temp = localStorage.getItem(`list--${listID}`);
  if (!temp) return;

  return JSON.parse(temp) as ListItem[];
}
