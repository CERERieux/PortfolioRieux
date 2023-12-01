import { useMutation, useQuery } from "@tanstack/react-query";
import { createThread, deleteThread, getBoards } from "../services/anonboard";
import { useEffect, useState } from "react";
import { isAxiosError } from "axios";

export function useAnonBoard() {
  const boardInfo = useQuery({
    queryKey: ["boards"],
    queryFn: () => getBoards(),
  });

  return {
    data: boardInfo.data,
    error: boardInfo.error,
    isLoading: boardInfo.isLoading,
  };
}

export function useCreateBoard() {
  const [board, setBoard] = useState("");
  const [createError, setCreateError] = useState<null | string>(null);
  const password = "test";

  const addThread = useMutation({
    mutationFn: createThread,
  });
  const removeThread = useMutation({
    mutationFn: deleteThread,
  });

  useEffect(() => {
    if (board !== "") addThread.mutate({ board, password, text: password });
  }, [board]);

  useEffect(() => {
    if (addThread.isSuccess) {
      const idThread = addThread.data._id.toString();
      removeThread.mutate({ board, idThread, password });
    } else if (addThread.isError) {
      const { error } = addThread;
      if (isAxiosError(error)) setCreateError(error.response?.data.error);
      else
        setCreateError(
          "We can't create the board you asked for, please try again later.",
        );
    }
  }, [addThread.isSuccess]);

  return {
    removedThread: removeThread.isSuccess,
    createError,
    createBoard: setBoard,
  };
}
