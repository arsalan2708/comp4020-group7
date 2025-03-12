export interface ListItem {
  listID: string;
  itemID: string;
  name: string;
  isRecurring: boolean;
  amount: number;
  isChecked: boolean;
  description: string;
  categoryID: string;
  posterID: string;
}

export interface InitListItem {
  listID: string;
  primaryID: string; //id for who created the list (automatically gets added to the list of contributors for this list)
  checkedItems: number;
  totalItems: number;
  label: string;
  date?: string;
}

export interface ListContributors {
  listID: string;
  shopperID: string; //primary and secondary shoppers are stored here
}

export interface CategoryType {
  categoryID: string;
  name: string;
}

export interface InitList {
  list: InitListItem[];
  addList: (initListItem: InitListItem) => void;
  getList: (listID: string) => InitListItem | undefined;
  updateList: (initListItem: InitListItem) => boolean;
  deleteList: (listID: string) => boolean;
}

export const RecurringItems = [
  "Milk",
  "Eggs",
  "Bread",
  "Butter",
  "Cheese",
  "Chicken",
  "Ground Beef",
  "Lettuce",
  "Tomatoes",
  "Cucumbers",
  "Apples",
  "Bananas",
  "Oranges",
  "Potatoes",
  "Onions",
  "Rice",
  "Pasta",
  "Cereal",
  "Yogurt",
  "Toilet Paper",
] as const;

export type RecurringItemType = (typeof RecurringItems)[number];
