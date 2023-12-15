import { useVerification } from "./useVerification";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUserInfoAdmin } from "../services/user";
import { deleteUrl } from "../services/urls";
import { deleteIssue, updateIssue } from "../services/issues";
import { deleteBook, deleteLibrary } from "../services/books";
import type { DeleteOperationHook, ErrorAuth } from "../types";
import type { ReqBodyIssue } from "../../server/types/advanced";
import { useEffect, useState } from "react";

export function useUserDataAdmin(id: string) {
  const client = useQueryClient();
  const adminName = import.meta.env.VITE_ADMIN;
  const { errorAuth, token, validFetch, username } = useVerification();
  const errorAdminAuth: ErrorAuth =
    username !== adminName
      ? {
          message: "Please don't try to access here, you are not an admin!",
          cause: "NotAdmin",
        }
      : { message: "", cause: null };
  const [actionUrl, setActionUrl] = useState<null | string>(null);
  const [actionBook, setActionBook] = useState<null | string>(null);
  const [actionIssue, setActionIssue] = useState<null | string>(null);

  const getUserInfo = useQuery({
    queryKey: ["users", id],
    queryFn: () => getUserInfoAdmin({ id, token }),
    enabled: validFetch && username === adminName,
  });

  const removeUrl = useMutation({
    mutationFn: deleteUrl,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["users", id] });
    },
  });

  const removeIssue = useMutation({
    mutationFn: deleteIssue,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["users", id] });
    },
  });

  const removeBook = useMutation({
    mutationFn: deleteBook,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["users", id] });
    },
  });

  const removeLibrary = useMutation({
    mutationFn: deleteLibrary,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["users", id] });
    },
  });

  const updateUserIssue = useMutation({
    mutationFn: updateIssue,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["users", id] });
    },
  });

  useEffect(() => {
    if (removeUrl.isSuccess) {
      setActionUrl("Url was successfully deleted!");
      setTimeout(() => {
        setActionUrl(null);
      }, 2000);
    }
  }, [removeUrl.isSuccess]);
  useEffect(() => {
    if (removeBook.isSuccess) {
      setActionBook("Book was successfully removed from Library!");
      setTimeout(() => {
        setActionBook(null);
      }, 2000);
    }
  }, [removeBook.isSuccess]);
  useEffect(() => {
    if (removeLibrary.isSuccess) {
      setActionBook("Library was successfully emptied!");
      setTimeout(() => {
        setActionBook(null);
      }, 2000);
    }
  }, [removeLibrary.isSuccess]);
  useEffect(() => {
    if (removeIssue.isSuccess) {
      setActionIssue("Issue was successfully deleted!");
      setTimeout(() => {
        setActionIssue(null);
      }, 2000);
    }
  }, [removeIssue.isSuccess]);

  return {
    actionBook,
    actionIssue,
    actionUrl,
    data: getUserInfo.data,
    error: getUserInfo.error,
    errorAuth: errorAdminAuth.cause === null ? errorAuth : errorAdminAuth,
    isLoading: getUserInfo.isLoading,
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
    updateSuccessIssue: updateUserIssue.isSuccess,
  };
}
