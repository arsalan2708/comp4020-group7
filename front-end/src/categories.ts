import { InitializeList } from "./components/list.js";
import { mountPageWrapper } from "./components/pageWrapper.js";
import { TemplateItem, Categories } from "./types/types.js";
import { ActionButtonType } from "./types/types";

const IS_INDEX_PAGE = false;
const IS_EXPANDABLE = false;
const showSuggestedButton = false;
const actionButtonType: ActionButtonType = "delete";

// mount page wrapper
mountPageWrapper({
  title: "Categories",
  isIndexPage: IS_INDEX_PAGE,
  onAddClick: () =>
    List.addItem({
      item: TemplateItem,
      expandable: IS_EXPANDABLE,
      list: List,
      actionButtonType,
    }),
  showSuggested: showSuggestedButton,
});

// exportable to make it global
export const List = InitializeList();

// add the list of categories to the page
Categories.forEach((category) => {
  const template = TemplateItem;
  template.label = category;
  List.addItem({
    item: TemplateItem,
    expandable: IS_EXPANDABLE,
    list: List,
    actionButtonType,
    showInputDefault: false,
  });
});
