import { useVerification } from "./useVerification";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllUsers } from "../services/user";
import { deleteUrl } from "../services/urls";
import { deleteIssue, updateIssue } from "../services/issues";
import { deleteBook, deleteLibrary } from "../services/books";
import type { DeleteOperationHook, ErrorAuth } from "../types";
import type { ReqBodyIssue } from "../../server/types/advanced";

export function useAdmin() {
  const client = useQueryClient();
  const { errorAuth, token, validFetch, username } = useVerification();
  const errorAdminAuth: ErrorAuth =
    username !== process.env.ADMIN
      ? {
          message: "Please don't try to access here, you are not an admin!",
          cause: "NotAdmin",
        }
      : { message: "", cause: null };
  //   const [userProfile, setUserProfile] = useState<null | string>(null);
  const getUsers = useQuery({
    queryKey: ["users", username],
    queryFn: () => getAllUsers(token),
    enabled: validFetch && username === process.env.ADMIN,
  });

  const removeUrl = useMutation({
    mutationFn: deleteUrl,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["users", username] });
    },
  });

  const removeIssue = useMutation({
    mutationFn: deleteIssue,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["users", username] });
    },
  });

  const removeBook = useMutation({
    mutationFn: deleteBook,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["users", username] });
    },
  });

  const removeLibrary = useMutation({
    mutationFn: deleteLibrary,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["users", username] });
    },
  });

  const updateUserIssue = useMutation({
    mutationFn: updateIssue,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["users", username] });
    },
  });

  return {
    data: getUsers.data,
    error: getUsers.error,
    errorAuth: errorAdminAuth.cause === null ? errorAuth : errorAdminAuth,
    isLoading: getUsers.isLoading,
    removeBook: ({ id, userId }: DeleteOperationHook) => {
      removeBook.mutate({ token, id, userId });
    },
    removeIssue: (id: string) => {
      removeIssue.mutate({ id, token });
    },
    removeLibrary: (userId: string) => {
      removeLibrary.mutate({ token, userId });
    },
    removeUrl: ({ id, userId }: DeleteOperationHook) => {
      removeUrl.mutate({ token, id, userId });
    },
    updateIssue: ({ _id, project, status, text, title }: ReqBodyIssue) => {
      updateUserIssue.mutate({ token, _id, project, status, text, title });
    },
  };
}
