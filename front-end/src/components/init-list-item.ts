import { InitList, InitListItem } from "../types/types";

interface ListItemProps extends InitListItem {
  list: InitList;
}

export function mountInitListItem({
  listID,
  primaryID,
  checkedItems,
  totalItems,
  name,
  date,
  list,
}: ListItemProps) {
  // add item to list
  list.addList({ listID, primaryID, checkedItems, totalItems, name, date });
  console.log(list.list);
}
