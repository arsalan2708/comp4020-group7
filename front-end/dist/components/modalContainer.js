/**
 * mount a node to the document and return it
 * @returns modal node mounted to document
 */
export function mountModalContainer({ onModalClick, backgroundBlur = true, }) {
    const pageWrapper = document.querySelector(".page-wrapper");
    if (!pageWrapper)
        return;
    const modal = document.createElement("div"); //create the modal
    modal.classList.add("modal"); //add class name for styling
    backgroundBlur && modal.classList.add("background-blur");
    modal.onclick = (ev) => {
        // if the modal was clicked and not the window on it
        if (ev.currentTarget === ev.target) {
            onModalClick ? onModalClick() : pageWrapper.removeChild(modal);
        }
    };
    // insert the modal before the script tag
    pageWrapper.append(modal);
    return modal;
}
/**
 * unmounts a modal if one is mounted
 */
export function unmountModalContainer() {
    const pageWrapper = document.querySelector(".page-wrapper");
    const modal = document.querySelector(".modal");
    if (!modal || !pageWrapper)
        return;
    pageWrapper.removeChild(modal);
}
