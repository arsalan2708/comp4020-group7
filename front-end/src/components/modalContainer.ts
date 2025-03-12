interface Props {
  onModalClick?: () => void;
}

/**
 * mount a node to the document and return it
 * @returns modal node mounted to document
 */
export function mountModalContainer({ onModalClick }: Props) {
  const body = document.getElementById("body");
  const scriptTag = document.getElementById("script");

  if (!body || !scriptTag) return;

  const modal = document.createElement("div"); //create the modal
  modal.classList.add("modal", "background-blur"); //add class name for styling
  modal.onclick = (ev) => {
    // if the modal was clicked and not the window on it
    if (ev.currentTarget === ev.target) {
      onModalClick ? onModalClick() : body.removeChild(modal);
    }
  };

  // insert the modal before the script tag
  body.insertBefore(modal, scriptTag);

  return modal;
}

/**
 * unmounts a modal if one is mounted
 */
export function unmountModalContainer() {
  const body = document.getElementById("body");
  const modal = document.querySelector(".modal");

  if (!modal || !body) return;

  body.removeChild(modal);
}
