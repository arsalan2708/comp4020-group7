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
  addItem: ({
    item,
    expandable,
    list,
    actionButtonType,
    onActionButtonClick,
    onClick,
    showInputDefault,
  }: {
    item: T;
    expandable?: boolean;
    list?: List<T>;
    actionButtonType?: ActionButtonType;
    onActionButtonClick?: () => void;
    onClick?: () => void;
    showInputDefault?: boolean;
  }) => void;
  getItem: (itemID: string) => T | undefined;
  updateItem: (item: T) => boolean;
  deleteItem: (itemID: string) => boolean;
  onAddItem: (item: T) => void;
  onupdateItem: (item: T) => void;
  ondeleteItem: (itemID: string) => void;
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

export type ActionButtonType = "default" | "checkbox" | "delete";

export const TemplateItem: ListItem = {
  listID: "",
  itemID: "",
  label: "",
  isRecurring: false,
  amount: 0,
  checked: false,
  description: "",
  categoryID: "category",
  posterID: "",
};

export const Categories = [
  "Produce",
  "Meat & Poultry",
  "Seafood",
  "Deli",
  "Bakery",
  "Dairy",
  "Canned Goods",
  "Baking Supplies",
  "Breakfast Foods",
  "Snacks",
  "Condiments",
  "Spices & Seasonings",
  "International Foods",
  "Frozen Foods",
  "Ice Cream & Desserts",
  "Beverages",
  "Health & Wellness",
  "Household Essentials",
  "Pet Supplies",
  "Baby & Childcare",
  "Home & Kitchen",
  "Seasonal Items",
];

export type Category = (typeof Categories)[number];

export type SideBarItemType = {
  label: string;
  displayHome: boolean;
  onClick?: () => void;
};

export type Page = "" | "categories" | "recurring";
