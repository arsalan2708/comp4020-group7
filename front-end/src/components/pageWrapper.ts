import { InitListItem, List, User } from "../types/types";
import { mountAddButton } from "./addButton.js";
import { mountNavBar } from "./navBar.js";

interface PageWrapperProps {
  title: string;
  isIndexPage: boolean;
  onAddClick?: () => void;
  onsuggestClick?: () => void;
  showSuggested?: boolean; //false and suggested items button doesnt show. TRUE on default
  user: User;
  list?: List<InitListItem>;
}

export function mountPageWrapper<T>({
  title,
  isIndexPage,
  onAddClick,
  onsuggestClick,
  showSuggested = true,
  user,
  list,
}: PageWrapperProps) {
  // create the top nav bar
  mountNavBar({ title, isIndexPage, user, list });

  // mount action button
  mountAddButton({
    isIndexPage,
    onAddClick: onAddClick, //   TODO: action
    onsuggestClick: onsuggestClick, //   TODO: action
    showSuggested,
  });
}
