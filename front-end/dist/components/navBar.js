import { addClasses } from "../utils/addClasses.js";
import { generateID } from "../utils/generateID.js";
import { Icon, getImage } from "../utils/getImage.js";
import { nameIteratorNext } from "../utils/iterator.js";
import { routeToPage } from "../utils/routing.js";
import { createIconButton } from "./iconButton.js";
import { mountUserNameModal } from "./userNameModal.js";
/**
 * populates the top navigation bar. Nav bar has to have class ".page-wrapper__top-bar"
 * @param title page title
 * @param isIndexPage true meaning its being called for the index.html page
 */
export function mountNavBar({ title, isIndexPage, user, list, }) {
    const nav = document.querySelector(".page-wrapper__top-bar");
    if (!nav)
        return;
    // create heading and append it to nav
    const heading = document.createElement("h1");
    heading.innerText = title;
    heading.classList.add("center", "height-full", "text-xl");
    nav.appendChild(heading);
    // create hamburger-icon
    const hamburgerIcon = createIconButton({
        src: getImage(Icon.Hamburger),
        onClick: () => onSideBarOpen(isIndexPage, user, list),
    });
    hamburgerIcon.classList.add("page-wrapper__icon");
    nav.appendChild(hamburgerIcon);
}
/**
 *creates the side bar component and pairs it to the top bar
 * @param isIndexPage true meaning its being called for the index.html page
 * @param userName username to print at buttom of sidebar
 */
function mountSideBar({ isIndexPage, user, list, }) {
    // side bar items
    const sideBarItems = [
        { label: "Home", displayHome: false, onClick: () => routeToPage("") },
        {
            label: "Edit Recurring Items",
            displayHome: true,
            onClick: () => routeToPage("recurring"),
        },
        {
            label: "Edit Categories",
            displayHome: true,
            onClick: () => routeToPage("categories"),
        },
        {
            label: "Edit Participants",
            displayHome: false,
            onClick: () => routeToPage("participants"),
        },
        {
            label: "Join List",
            id: "join",
            displayHome: true,
            onClick: () => {
                mountUserNameModal({
                    mode: "invite",
                    onSubmit: (id) => {
                        const total = Math.round(Math.random() * 100);
                        const current = Math.round(Math.random() * total);
                        const item = {
                            listID: id,
                            primaryID: generateID(),
                            checkedItems: current,
                            totalItems: total,
                            label: nameIteratorNext(),
                        };
                        list === null || list === void 0 ? void 0 : list.addItem({ item });
                        console.log("invite-link", id);
                    },
                });
                onSideBarClose();
            },
        },
        { label: "Notify Others", displayHome: false },
    ];
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
    addClasses(h2, "text-md");
    // close button
    const closeButton = createIconButton({ src: "", onClick: onSideBarClose });
    closeButton.classList.add("side-bar__close-button", "close-button", "text-xs");
    closeButton.innerText = "X";
    // create list
    const ul = document.createElement("ul");
    ul.classList.add("display-col");
    // add side bar items to list as li
    sideBarItems.forEach(({ label, displayHome, onClick, id }) => {
        if ((isIndexPage && displayHome) || !isIndexPage) {
            const li = document.createElement("li");
            li.innerText = label;
            li.id = `sidebar--${id}`;
            addClasses(li, "text-md");
            ul.appendChild(li);
            onClick && li.addEventListener("click", onClick);
        }
    });
    // user name
    const username = document.createElement("p");
    username.innerText = user.userName || "sally";
    username.classList.add("page-wrapper__username", "text-xl");
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
    sidebar.append(h2, closeButton, ul, username);
    // append sidebar to modal window
    modal.appendChild(sidebar);
}
/**
 * Event Handler for opening the side bar
 */
function onSideBarOpen(isIndexPage, user, list) {
    // TODO: dynamic usernames
    //   mount the side ba component first
    mountSideBar({ isIndexPage, user, list });
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
