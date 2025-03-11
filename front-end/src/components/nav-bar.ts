import { createIconButton } from "./icon-button.js";

/**
 * populates the top navigation bar
 * @param title page title
 */
export function createNavBar(title: string) {
  const nav = document.querySelector(".page-wrapper__top-bar");

  if (nav) {
    // create heading and append it to nav
    const heading = document.createElement("h1");
    heading.innerText = title;
    heading.classList.add("center", "height-full");
    nav.appendChild(heading);

    // create hamburger-icon
    const hamburgerIcon = createIconButton("../public/hamburgerIcon.png");
    hamburgerIcon.classList.add("page-wrapper__icon");
    nav.appendChild(hamburgerIcon);
  }
}
