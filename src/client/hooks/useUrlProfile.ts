import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useVerification } from "./useVerification";
import { createUrl, deleteUrl, getUserUrl } from "../services/urls";

export function useUrlProfile() {
  const client = useQueryClient();
  const { errorAuth, token, validFetch } = useVerification();
  const urls = useQuery({
    queryKey: ["urls"],
    queryFn: () => getUserUrl({ token }),
    enabled: validFetch,
  });

  const addUrl = useMutation({
    mutationFn: createUrl,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["urls"] });
    },
  });

  const removeUrl = useMutation({
    mutationFn: deleteUrl,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["urls"] });
    },
  });

  return {
    addUrl,
    data: urls.data,
    error: urls.error,
    errorAuth,
    removeUrl,
    token,
  };
}
