import { createIconButton } from "./icon-button.js";
const IS_INDEX_PAGE = true;
/**
 * populates the top navigation bar
 * @param title page title
 */
export function createNavBar(title) {
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
        hamburgerIcon.onclick = () => console.log("clicked");
        nav.appendChild(hamburgerIcon);
        // TODO: finish side bar and its animations
        // create the side bar
        // createSideBar(IS_INDEX_PAGE, "Sally");
    }
}
const sideBarItems = [
    { label: "Home", displayHome: false },
    { label: "Edit Recurring Items", displayHome: true },
    { label: "Edit Categories", displayHome: true },
    { label: "Edit Participants", displayHome: false },
    { label: "Notify Others", displayHome: false },
];
/**
 *creates the side bar component and pairs it to the top bar
 * @param isHome true meaning its being called for the index.html page
 */
function createSideBar(isHome, userName) {
    // get modal
    const modal = document.createElement("div");
    const body = document.getElementById("body");
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
            if ((isHome && displayHome) || !isHome) {
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
        aside.classList.add("height-full", "page-wrapper__side-bar");
        aside.appendChild(h2);
        aside.appendChild(ul);
        aside.appendChild(username);
        // append aside to modal window
        modal.appendChild(aside);
    }
}
