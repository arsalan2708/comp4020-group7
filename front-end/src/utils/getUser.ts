import { mountUserNameModal } from "../components/userNameModal.js";
import { generateID } from "./generateID.js";

/**
 * get the user information for this session
 * @returns username and userID of user
 */
export function getUser() {
  // check if user info is stored in local storage
  let userName = localStorage.getItem("username") || "";
  let userID = localStorage.getItem("userID") || "";

  // if its not create a new one
  if (!userName.length || !userID.length) {
    userID = generateID(); //generate userID

    // mount modal to collect user name
    mountUserNameModal({
      // when the user clicks subit
      onSubmit: (user) => {
        localStorage.setItem("username", user);
        localStorage.setItem("userID", userID);
        userName = user;
      },
    });
  }

  return { userName, userID };
}
