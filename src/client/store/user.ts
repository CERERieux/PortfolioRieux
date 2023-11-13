import { create } from "zustand";
import type { UserState } from "../types";
import * as UserService from "../services/user";
const TOKEN_NAME = "CEREAppToken";
const USER_NAME = "CEREUser";

function setInitialToken() {
  const localToken = localStorage.getItem(TOKEN_NAME);
  if (localToken === null) return "";
  else {
    return localToken;
  }
}
function setInitialUser() {
  const localName = localStorage.getItem(USER_NAME);
  if (localName === null) return "";
  else {
    return localName;
  }
}

export const useUser = create<UserState>((set, get) => ({
  username: setInitialUser(),
  token: setInitialToken(),
  error: null,
  action: null,

  /** Function to create our user, take the credentials as parameters */
  createUser: async ({ username, password }) => {
    // Call to our service to create an user
    const createdUser = await UserService.createUser({ username, password });
    // If there was an error, set it in the state to display it
    if ("error" in createdUser) {
      set({
        error: createdUser.error,
        action: null,
      });
      return false;
    } else {
      // If it went well, assign the action to the state and notify it later
      set({
        action: createdUser.action,
        error: null,
      });
      return true;
    }
  },
  /** Function to login our user, take the credentials as parameters */
  loginUser: async ({ username, password }) => {
    // Login the user through the service
    const loggedUser = await UserService.loginUser({ username, password });
    // If there was an error, set it in the state to display it
    if ("error" in loggedUser) {
      set({
        token: "",
        username: "",
        error: loggedUser.error,
        action: null,
      });
      return false;
    } else {
      // If it went well, assign the action to the state and notify it later
      set({
        token: loggedUser.token,
        username: loggedUser.username,
        action: `Successful login, ${loggedUser.username}.`,
        error: null,
      });
      // And save the token and username in the local storage
      window.localStorage.setItem(TOKEN_NAME, loggedUser.token);
      window.localStorage.setItem(USER_NAME, loggedUser.username);
      return true;
    }
  },
  /** Function to lof off our user, deleting the token from localstorage */
  logoffUser: () => {
    window.localStorage.removeItem(TOKEN_NAME);
    window.localStorage.removeItem(USER_NAME);
    set({
      username: "",
      token: "",
      error: null,
      action: null,
    });
  },
}));
