/**
 * mount a node to the document and return it
 * @returns modal node mounted to document
 */
export function mountModalContainer({ onModalClick }) {
    const body = document.getElementById("body");
    if (!body)
        return;
    const modal = document.createElement("div"); //create the modal
    modal.classList.add("modal", "background-blur"); //add class name for styling
    modal.onclick = (ev) => {
        // if the modal was clicked
        if (ev.currentTarget === ev.target) {
            onModalClick ? onModalClick() : body.removeChild(modal);
        }
    };
    body.appendChild(modal); // append it to the body
    return modal;
}
