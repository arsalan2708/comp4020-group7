import { InitList, InitListItem } from "../types/types";

/**
 * factory method for lists
 * @returns returns a list instance
 */
export function CreateList() {
  const list: InitList = {
    list: [],
    addItem: function (item: InitListItem): void {
      throw new Error("Function not implemented.");
    },
    getItem: function (itemID: string): InitListItem {
      throw new Error("Function not implemented.");
    },
    updateItem: function (itemID: string): void {
      throw new Error("Function not implemented.");
    },
    deleteItem: function (itemID: string): void {
      throw new Error("Function not implemented.");
    },
  };
  return list;
}
