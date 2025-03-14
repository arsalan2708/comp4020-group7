import { InitializeList } from "./components/list.js";
import { mountListItem } from "./components/listItem.js";
import { mountPageWrapper } from "./components/pageWrapper.js";
import { TemplateItem } from "./types/types.js";

const IS_INDEX_PAGE = false;
const IS_EXPANDABLE = true;

// mount page wrapper
mountPageWrapper({
  title: "List 1",
  isIndexPage: IS_INDEX_PAGE,
  onAddClick: () => List.addItem(TemplateItem, IS_EXPANDABLE),
  onsuggestClick: () => {},
});

// exportable to make it global
export const List = InitializeList();

/** ------FOR TESTING  ---------------- */
const { container } = mountListItem({
  itemID: TemplateItem.itemID,
  label: TemplateItem.label,
  isRecurring: TemplateItem.isRecurring,
  amount: TemplateItem.amount,
  checked: TemplateItem.checked,
  description: TemplateItem.description,
  category: "Category",
  //   onActionButtonClick?: () => void,
  //   onClick?: () => void,
  actionButtonType: "checkbox",
  expandable: true,
});

const listElement = document.querySelector(".page-wrapper__list");
listElement && listElement.append(container);
