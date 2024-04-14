import { useVerification } from "./useVerification";
import { type ErrorAuth } from "../types";

export function useAdminMenu() {
  const { errorAuth, username } = useVerification();
  const adminName = import.meta.env.VITE_ADMIN;
  const isAdmin = adminName === username;
  const errorAdmin: ErrorAuth = !isAdmin
    ? {
        cause: "NotAdmin",
        message: "Please don't try to access here, you are not an admin!",
      }
    : { cause: null, message: "" };

  return {
    errorAuth: isAdmin ? errorAuth : errorAdmin,
  };
}
