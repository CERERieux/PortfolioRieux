import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteBoard, getBoards } from "../services/anonboard";
import { useVerification } from "./useVerification";
import { type ErrorAuth } from "../types";

export function useAdminBoards() {
  const client = useQueryClient();
  const { errorAuth, token, validFetch, username } = useVerification();
  const adminName = import.meta.env.VITE_ADMIN;
  const isAdmin = adminName === username;
  const errorAdmin: ErrorAuth = !isAdmin
    ? {
        cause: "NotAdmin",
        message: "Please don't try to access here, you are not an admin!",
      }
    : { cause: null, message: "" };
  const boardInfo = useQuery({
    queryKey: ["boards", "admin"],
    queryFn: () => getBoards(),
    enabled: validFetch && isAdmin,
  });
  const removeBoard = useMutation({
    mutationFn: deleteBoard,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["boards", "admin"] });
    },
  });

  return {
    data: boardInfo.data,
    error: boardInfo.error,
    errorAuth: isAdmin ? errorAuth : errorAdmin,
    isLoading: boardInfo.isLoading,
    deleteBoard: (id: string) => {
      removeBoard.mutate({ id, token });
    },
  };
}
