import { useVerification } from "./useVerification";
import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../services/user";
import type { ErrorAuth } from "../types";

export function useAdminListUser() {
  const adminName = import.meta.env.VITE_ADMIN;
  const { errorAuth, token, validFetch, username } = useVerification();
  const errorAdminAuth: ErrorAuth =
    username !== adminName
      ? {
          message: "Please don't try to access here, you are not an admin!",
          cause: "NotAdmin",
        }
      : { message: "", cause: null };

  const getUsers = useQuery({
    queryKey: ["users", username],
    queryFn: () => getAllUsers(token),
    enabled: validFetch && username === adminName,
  });

  return {
    data: getUsers.data,
    error: getUsers.error,
    errorAuth: errorAdminAuth.cause === null ? errorAuth : errorAdminAuth,
    isLoading: getUsers.isLoading,
  };
}
