import { ListModalMode, mountListModal } from "./components/listModal.js";
import { mountPageWrapper } from "./components/pageWrapper.js";
const IS_INDEX_PAGE = true;
// mount page wrapper
mountPageWrapper({
    title: "Shared List",
    isIndexPage: IS_INDEX_PAGE,
    onAddClick: () => mountListModal({ mode: ListModalMode.Create }),
    onsuggestClick: () => { },
});
