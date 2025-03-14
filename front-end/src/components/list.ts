import { ActionButtonType, List, ListItem } from "../types/types";
import { generateID } from "../utils/generateID.js";
import { mountListItem } from "./listItem.js";

/**
 * factory method for lists. Creates a new instance for every call. should be called once per page
 * @returns returns a list instance
 */
export function InitializeList() {
  const LIST: List<ListItem> = {
    list: [],
    addItem,
    getItem,
    updateItem,
    deleteItem,
  };
  return LIST;
}

// get <ul> from page wrapper
const listElement = document.querySelector(".page-wrapper__list");

//   list instance returned

// add item to list
function addItem(
  this: List<ListItem>,
  {
    item,
    expandable,
    list,
    actionButtonType,
    onActionButtonClick,
    onClick,
  }: {
    item: ListItem;
    expandable?: boolean;
    list?: List<ListItem>;
    actionButtonType: ActionButtonType;
    onActionButtonClick?: () => void;
    onClick?: () => void;
  }
) {
  // if there if no list element or the list obj isnt passed, end here
  if (!list || !listElement) return;

  const id = generateID();
  item.itemID = id;
  this.list.push(item);

  const { container: li } = mountListItem({
    itemID: item.itemID,
    label: item.label,
    isRecurring: item.isRecurring,
    amount: item.amount,
    checked: item.checked,
    description: item.description,
    category: "Category",
    onActionButtonClick,
    onClick,
    actionButtonType,
    expandable: expandable || false,
    list,
  });
  listElement.appendChild(li);
}

// get item from list
function getItem(this: List<ListItem>, itemID: string) {
  return this.list.find((item) => item.itemID === itemID);
}

// TODO: handle updating the list. only the html is getting uptdated rn
//(use getItem to get the item to pass to this)
// update list item
function updateItem(this: List<ListItem>, item: ListItem): boolean {
  //   find the index of the list
  const index = this.list.findIndex((item_) => item_.itemID === item.itemID);

  //   if it doesnt exists end it here and return false
  if (index < 0) return false;

  //   update item and return true
  this.list[index] = item;
  return true;
}

/**
 * deletes an item from the list
 * @param itemID item ID to delete from list
 * @returns true if item was deleted false otherwise
 */
function deleteItem(this: List<ListItem>, itemID: string): boolean {
  this.list = this.list.filter((item) => item.itemID !== itemID);

  // get list item element
  const li = document.getElementById(itemID);

  if (!li) return false;
  li.remove();

  return true;
}
