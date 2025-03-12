import { mountInitListItem } from "./init-list-item.js";
/**
 * factory method for lists. (ONLY USE ONCE)
 * @returns returns a list instance
 */
export function CreateList() {
    // get <ul> from page wrapper
    const listElement = document.querySelector(".page-wrapper__list");
    //   list instance returned
    const list = {
        list: [],
        addList: function (list) {
            this.list.push(list);
            if (!listElement)
                return;
            listElement.appendChild(mountInitListItem(Object.assign({}, list)));
        },
        getList: function (listID) {
            return this.list.find((list) => list.listID === listID);
        },
        updateList: function (initListItem) {
            //   find the index of the list
            const index = this.list.findIndex((list) => list.listID === initListItem.listID);
            //   if it doesnt exists end it here and return false
            if (index < 0)
                return false;
            //   update item and return true
            this.list[index] = initListItem;
            return true;
        },
        deleteList: function (listID) {
            this.list = this.list.filter((list) => list.listID !== listID);
            return this.list.some((list) => list.listID === listID);
        },
    };
    return list;
}
