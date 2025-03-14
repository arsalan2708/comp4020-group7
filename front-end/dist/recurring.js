import { InitializeList } from "./components/list.js";
import { mountPageWrapper } from "./components/pageWrapper.js";
import { TemplateItem, RecurringItems } from "./types/types.js";
const IS_INDEX_PAGE = false;
const IS_EXPANDABLE = true;
const showSuggestedButton = false;
const actionButtonType = "checkbox";
// mount page wrapper
mountPageWrapper({
    title: "Recurring Items",
    isIndexPage: IS_INDEX_PAGE,
    onAddClick: () => List.addItem({
        item: TemplateItem,
        expandable: IS_EXPANDABLE,
        list: List,
        actionButtonType,
    }),
    showSuggested: showSuggestedButton,
});
// exportable to make it global
export const List = InitializeList();
// add the list of recurring items to the page
RecurringItems.forEach((recurringItems) => {
    const template = TemplateItem;
    template.label = recurringItems;
    List.addItem({
        item: TemplateItem,
        expandable: IS_EXPANDABLE,
        list: List,
        actionButtonType,
        showInputDefault: false,
    });
});
