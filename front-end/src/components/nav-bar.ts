import { createIconButton } from "./icon-button.js";

/**
 * populates the top navigation bar
 * @param title page title
 * @param isIndexPage true meaning its being called for the index.html page
 */
export function createNavBar(title: string, isIndexPage: boolean) {
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
    // TODO: configure event handlers
    hamburgerIcon.onclick = onModalOpen;
    nav.appendChild(hamburgerIcon);

    // TODO: finish side bar and its animations
    // create the side bar
    // createSideBar(isIndexPage, "Sally");
  }
}

type SideBarItemType = {
  label: string;
  displayHome: boolean;
};

const sideBarItems: SideBarItemType[] = [
  { label: "Home", displayHome: false },
  { label: "Edit Recurring Items", displayHome: true },
  { label: "Edit Categories", displayHome: true },
  { label: "Edit Participants", displayHome: false },
  { label: "Notify Others", displayHome: false },
];

/**
 *creates the side bar component and pairs it to the top bar
 * @param isIndexPage true meaning its being called for the index.html page
 */
function createSideBar(isIndexPage: boolean, userName: string) {
  console.log("creating side bar");
  const body = document.getElementById("body");

  // get modal
  const modal = document.createElement("div");
  modal.classList.add("modal");

  if (body && modal) {
    // append modal to body
    body.appendChild(modal);

    // header text
    const h2 = document.createElement("h2");
    h2.innerText = "Options";

    // create list
    const ul = document.createElement("ul");
    ul.classList.add("display-col");

    // add side bar items to list as li
    sideBarItems.forEach(({ label, displayHome }) => {
      if ((isIndexPage && displayHome) || !isIndexPage) {
        const li = document.createElement("li");
        li.innerText = label;
        ul.appendChild(li);
      }
    });

    // user name
    const username = document.createElement("h2");
    username.innerText = userName;
    username.classList.add("page-wrapper__username");

    // create aside and append list to it
    const aside = document.createElement("aside");
    aside.id = "side-bar";
    aside.classList.add("height-full", "page-wrapper__side-bar");
    aside.appendChild(h2);
    aside.appendChild(ul);
    aside.appendChild(username);

    // append aside to modal window
    modal.appendChild(aside);
  }
}

/**
 * Event Handler for opening the side bar
 */
function onModalOpen() {
  console.log("clicked");

  //   mount the side ba component first
  createSideBar(true, "Sally");
  const sidebar = document.getElementById("side-bar");

  if (sidebar) {
    sidebar.classList.remove("side-bar--close");
    sidebar.classList.add("side-bar--open");
  }
}

/**
 * Event Handler for closing the side bar
 */
function onModalClose() {
  const sidebar = document.getElementById("side-bar");

  if (sidebar) {
    sidebar.classList.remove("side-bar--open");
    sidebar.classList.add("side-bar--close");
  }
}
