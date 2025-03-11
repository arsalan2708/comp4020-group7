export function mountInitListItem({ listID, primaryID, checkedItems, totalItems, name, date, list, }) {
    // add item to list
    list.addItem({ listID, primaryID, checkedItems, totalItems, name, date });
    console.log(list.list);
}
