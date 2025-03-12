import { mountModalContainer } from "./modalContainer.js";
export var ListModalMode;
(function (ListModalMode) {
    ListModalMode[ListModalMode["Create"] = 0] = "Create";
    ListModalMode[ListModalMode["Edit"] = 1] = "Edit";
})(ListModalMode || (ListModalMode = {}));
export function mountListModal({ mode }) {
    const modal = mountModalContainer({});
    return modal;
}
