export function mountInitListItem({ listID, primaryID, checkedItems, totalItems, name, date, list, }) {
    // add item to list
    list.addList({ listID, primaryID, checkedItems, totalItems, name, date });
    console.log(list.list);
}
