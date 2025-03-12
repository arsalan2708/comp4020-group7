import { Icon, getImage } from "../utils/get-image.js";
import { createIconButton } from "./icon-button.js";
/**
 * populates the top navigation bar. Nav bar has to have class ".page-wrapper__top-bar"
 * @param title page title
 * @param isIndexPage true meaning its being called for the index.html page
 */
export function mountNavBar({ title, isIndexPage, }) {
    const nav = document.querySelector(".page-wrapper__top-bar");
    if (!nav)
        return;
    // create heading and append it to nav
    const heading = document.createElement("h1");
    heading.innerText = title;
    heading.classList.add("center", "height-full");
    nav.appendChild(heading);
    // create hamburger-icon
    const hamburgerIcon = createIconButton({
        src: getImage(Icon.Hamburger),
        onClick: () => onSideBarOpen(isIndexPage),
    });
    hamburgerIcon.classList.add("page-wrapper__icon");
    nav.appendChild(hamburgerIcon);
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
 * @param isIndexPage true meaning its being called for the index.html page
 * @param userName username to print at buttom of sidebar
 */
function mountSideBar({ isIndexPage, userName, }) {
    const body = document.getElementById("body");
    // get modal
    const modal = document.createElement("div");
    modal.classList.add("modal", "overflow-hidden");
    if (!body || !modal)
        return;
    // append modal to body
    body.appendChild(modal);
    // header text
    const h2 = document.createElement("h2");
    h2.innerText = "Options";
    // close button
    const closeButton = createIconButton({ src: "", onClick: onSideBarClose });
    closeButton.classList.add("side-bar__close-button", "close-button");
    closeButton.innerText = "X";
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
    // create sidebar and append list to it
    const sidebar = document.createElement("aside");
    sidebar.id = "side-bar";
    sidebar.classList.add("height-full", "page-wrapper__side-bar");
    // unmounts modal after close animation
    sidebar.onanimationend = (ev) => {
        if (sidebar.classList.contains("side-bar--close"))
            body.removeChild(modal);
    };
    // add elements to component
    sidebar.appendChild(h2);
    sidebar.appendChild(closeButton);
    sidebar.appendChild(ul);
    sidebar.appendChild(username);
    // append sidebar to modal window
    modal.appendChild(sidebar);
}
/**
 * Event Handler for opening the side bar
 */
function onSideBarOpen(isIndexPage) {
    // TODO: dynamic usernames
    //   mount the side ba component first
    mountSideBar({ isIndexPage, userName: "Sally" });
    const sidebar = document.getElementById("side-bar");
    const modal = document.querySelector(".modal");
    //   perform animation
    if (sidebar && modal) {
        sidebar.classList.remove("side-bar--close");
        sidebar.classList.add("side-bar--open");
        modal.classList.add("background-blur");
    }
}
/**
 * Event Handler for closing the side bar
 */
function onSideBarClose() {
    const sidebar = document.getElementById("side-bar");
    const modal = document.querySelector(".modal");
    if (sidebar && modal) {
        sidebar.classList.remove("side-bar--open");
        sidebar.classList.add("side-bar--close");
        modal.classList.remove("background-blur");
    }
}
