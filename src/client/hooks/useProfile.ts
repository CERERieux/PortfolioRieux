import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useVerification } from "./useVerification";
import { getUserInfo, updateInfoUser } from "../services/user";
import type { UpdateUserHook } from "../types";

export function useProfile() {
  const { errorAuth, validFetch, token, username } = useVerification();
  const client = useQueryClient();

  const getUser = useQuery({
    queryKey: ["user", username],
    queryFn: () => getUserInfo({ token }),
    enabled: validFetch,
  });

  const updateInfo = useMutation({
    mutationFn: ({ img, bio }: UpdateUserHook) =>
      updateInfoUser({ img, bio, token }),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["user", username] });
    },
  });

  return {
    data: getUser.data,
    error: getUser.error,
    errorAuth,
    updateInfo,
  };
}
