import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useVerification } from "./useVerification";
import { getUserInfo, updateInfoUser } from "../services/user";
import type { UpdateUserHook, UserProfileHook } from "../types";

/** Custom hook to manage profile from user, validate if token is good.
 * It gets the profile info and return the data and a function to
 * update user profile
 */
export function useProfile({ externalUser }: UserProfileHook) {
  const { errorAuth, validFetch, token, username } = useVerification();
  const currentUser = externalUser ?? username;
  const client = useQueryClient();

  const getUser = useQuery({
    queryKey: ["user", currentUser],
    queryFn: () => getUserInfo(currentUser),
    enabled: validFetch || currentUser !== "",
  });

  const updateInfo = useMutation({
    mutationFn: ({ img, bio }: UpdateUserHook) =>
      updateInfoUser({ img, bio, token }),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["user", currentUser] });
    },
  });

  return {
    data: getUser.data,
    error: getUser.error,
    errorAuth,
    updateInfo,
  };
}
