import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getReplies,
  createReply,
  deleteReply,
  reportReply,
} from "../services/anonboard";
import type { ThreadOperation } from "../types";

export function useAnonReply({ board, idThread }: ThreadOperation) {
  const client = useQueryClient();
  const getReplyThread = useQuery({
    queryKey: ["thread", "reply", idThread],
    queryFn: () => getReplies({ board, idThread }),
  });

  const addReply = useMutation({
    mutationFn: createReply,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["thread", "reply", idThread] });
    },
  });

  const report = useMutation({
    mutationFn: reportReply,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["thread", "reply", idThread] });
    },
  });

  const redactReply = useMutation({
    mutationFn: deleteReply,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["thread", "reply", idThread] });
    },
  });

  return {
    data: getReplyThread.data,
    error: getReplyThread.error,
    isLoading: getReplyThread.isLoading,
    addReply,
    reportReply: report,
    redactReply,
  };
}
