import { InitializeList } from "./components/list.js";
import { mountPageWrapper } from "./components/pageWrapper.js";
import { TemplateItem } from "./types/types.js";
const IS_INDEX_PAGE = false;
const IS_EXPANDABLE = true;
// mount page wrapper
mountPageWrapper({
    title: "List 1",
    isIndexPage: IS_INDEX_PAGE,
    onAddClick: () => List.addItem(TemplateItem, IS_EXPANDABLE),
    onsuggestClick: () => { },
});
// exportable to make it global
export const List = InitializeList();
