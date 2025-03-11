import { createIconButton } from "./components/icon-button.js";
const tempBody = document.getElementById("body");
if (tempBody) {
    //create button and add styling
    const component = createIconButton("/public/hamburgerIcon.png");
    tempBody.appendChild(component);
}
