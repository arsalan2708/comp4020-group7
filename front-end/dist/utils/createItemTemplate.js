/**
 *  template of the list item
 * @returns template of the list item for adding to lists
 */
export function createItemTemplate() {
    return {
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
}
