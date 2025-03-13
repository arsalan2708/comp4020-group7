export interface ListItem {
  listID: string;
  itemID: string;
  label: string;
  isRecurring: boolean;
  amount: number;
  checked: boolean;
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

export interface List<T> {
  list: T[];
  addItem: (item: T, expandable?: boolean) => void;
  getItem: (itemID: string) => T | undefined;
  updateItem: (item: T) => boolean;
  deleteItem: (itemID: string) => boolean;
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

export type ActionButtonType = "checkbox";
