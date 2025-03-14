import { mountAddButton } from "./addButton.js";
import { mountNavBar } from "./navBar.js";

interface PageWrapperProps {
  title: string;
  isIndexPage: boolean;
  onAddClick?: () => void;
  onsuggestClick?: () => void;
  showSuggested?: boolean; //false and suggested items button doesnt show. TRUE on default
}

export function mountPageWrapper({
  title,
  isIndexPage,
  onAddClick,
  onsuggestClick,
  showSuggested = true,
}: PageWrapperProps) {
  // create the top nav bar
  mountNavBar({ title, isIndexPage });

  // mount action button
  mountAddButton({
    isIndexPage,
    onAddClick: onAddClick, //   TODO: action
    onsuggestClick: onsuggestClick, //   TODO: action
    showSuggested,
  });
}
