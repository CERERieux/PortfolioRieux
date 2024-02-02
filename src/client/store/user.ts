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
      setTimeout(() => {
        set({ error: null });
      }, 4000);
      return false;
    } else {
      // If it went well, assign the action to the state and notify it later
      set({
        action: createdUser.action,
        error: null,
      });
      setTimeout(() => {
        set({ action: null });
      }, 4000);
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
      setTimeout(() => {
        set({ error: null });
      }, 4000);
      return false;
    } else {
      // If it went well, assign the action to the state and notify it later
      set({
        token: loggedUser.token,
        username: loggedUser.username,
        action: `Successful login, ${loggedUser.username}.`,
        error: null,
      });
      setTimeout(() => {
        set({ action: null });
      }, 4000);
      // And save the token and username in the local storage
      window.localStorage.setItem(TOKEN_NAME, loggedUser.token);
      window.localStorage.setItem(USER_NAME, loggedUser.username);
      return true;
    }
  },
  /** Similar as login User, but we need to do it like this for a very few changes */
  loginAdmin: async ({ username, password }) => {
    // Login the admin through the service
    const loggedAdmin = await UserService.verifyAdmin({ username, password });
    // If there was an error, set it in the state to display it
    if ("error" in loggedAdmin) {
      /** The difference is the error we get from the service and the way
       * it verify the admin in the model, so we need to do it in another function
       * and not in the loginUser one */
      set({
        token: "",
        username: "",
        error: loggedAdmin.error,
        action: null,
      });
      setTimeout(() => {
        set({ error: null });
      }, 4000);
      return false;
    } else {
      // If it went well, assign the action to the state and notify it later
      set({
        token: loggedAdmin.token,
        username: loggedAdmin.username,
        action: `Successful login, ${loggedAdmin.username}.`,
        error: null,
      });
      setTimeout(() => {
        set({ action: null });
      }, 4000);
      // And save the token and username in the local storage
      window.localStorage.setItem(TOKEN_NAME, loggedAdmin.token);
      window.localStorage.setItem(USER_NAME, loggedAdmin.username);
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
  /** Function that verify a token, if needed return a new one */
  verifyToken: async token => {
    // Call the service to verify the user token
    const verifiedToken = await UserService.verifyToken(token);
    // If there is an error, send it to display an interface about it
    if ("error" in verifiedToken) {
      return verifiedToken.error;
    } else {
      // If we have a verified token, we get the old one
      const { token, username } = get();
      // If those are different, set the new one in the local storage
      if (verifiedToken.newToken !== token) {
        window.localStorage.setItem(TOKEN_NAME, verifiedToken.newToken);
      }
      // Put the username each time we verify the token, in case user knows how to change localstorage in dev settings
      window.localStorage.setItem(USER_NAME, username);
      // Return the result of it
      return "Your token was refreshed.";
    }
  },
}));
