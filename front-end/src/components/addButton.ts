/**
 * mounts the add button to the page wrapper
 * @param isIndexPage true if this is being initiated from index.html (displays the suggest item button if false)
 * @param onAddClick callback function on clicking the add button
 * @param onsuggestClick callback function on clicking the suggest button
 */
export function mountAddButton({
  isIndexPage,
  onAddClick,
  onsuggestClick,
  showSuggested,
}: {
  isIndexPage: boolean;
  onAddClick?: () => void;
  onsuggestClick?: () => void;
  showSuggested: boolean;
}) {
  const buttonContainer = document.querySelector(".add-button__container");

  if (!buttonContainer) return;

  //   create add button
  const addButton = document.createElement("button");
  addButton.classList.add("add-button");
  addButton.onclick = onAddClick ?? null;

  //   create icon that goes in add button
  const icon = document.createElement("img");
  icon.src = "../../public/addButtonIcon.png";
  icon.alt = "add button";
  icon.width = 42;
  icon.height = 42;

  //   append icon to button and button to container
  addButton.appendChild(icon);
  buttonContainer.appendChild(addButton);

  //   if its the index page stop here
  if (isIndexPage || !showSuggested) return;

  //   create suggest item button
  const suggestButton = document.createElement("button");
  suggestButton.classList.add("add-button__suggestion");
  suggestButton.innerText = "Suggested Items";
  suggestButton.onclick = onsuggestClick ?? null;

  buttonContainer.appendChild(suggestButton);
}
