// available icons
export enum Icon {
  AddButton = "addButtonIcon",
  Hamburger = "hamburgerIcon",
  Options = "optionsIcon",
  Delete = "deleteIcon",
  Edit = "editIcon",
}

// TODO: make this work for any starting directory
/**
 * return the path to an icon for components in the components folder
 * @param icon icon href you want of type Icon
 * @returns path to icon png
 */
export function getImage(icon: Icon) {
  return `../../public/${icon}.png`;
}
