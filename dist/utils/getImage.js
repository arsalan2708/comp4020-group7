// available icons
export var Icon;
(function (Icon) {
    Icon["AddButton"] = "addButtonIcon";
    Icon["Hamburger"] = "hamburgerIcon";
    Icon["Options"] = "optionsIcon";
    Icon["Delete"] = "deleteIcon";
    Icon["Edit"] = "editIcon";
})(Icon || (Icon = {}));
// TODO: make this work for any starting directory
/**
 * return the path to an icon for components in the components folder
 * @param icon icon href you want of type Icon
 * @returns path to icon png
 */
export function getImage(icon) {
    return `../../public/${icon}.png`;
}
