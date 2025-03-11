/**
 * factory method for lists
 * @returns returns a list instance
 */
export function CreateList() {
    const list = {
        list: [],
        addItem: function (item) {
            throw new Error("Function not implemented.");
        },
        getItem: function (itemID) {
            throw new Error("Function not implemented.");
        },
        updateItem: function (itemID) {
            throw new Error("Function not implemented.");
        },
        deleteItem: function (itemID) {
            throw new Error("Function not implemented.");
        },
    };
    return list;
}
