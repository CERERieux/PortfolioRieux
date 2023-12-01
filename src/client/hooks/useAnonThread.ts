import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createThread,
  deleteThread,
  getThreads,
  reportThread,
} from "../services/anonboard";

export function useAnonThread(board: string) {
  const client = useQueryClient();
  const threadInfo = useQuery({
    queryKey: ["thread", board],
    queryFn: () => getThreads(board),
  });

  const addThread = useMutation({
    mutationFn: createThread,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["thread", board] });
    },
  });

  const report = useMutation({
    mutationFn: reportThread,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["thread", board] });
    },
  });

  const removeThread = useMutation({
    mutationFn: deleteThread,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["thread", board] });
    },
  });

  return {
    data: threadInfo.data,
    error: threadInfo.error,
    isLoading: threadInfo.isLoading,
    addThread,
    report,
    removeThread,
  };
}
