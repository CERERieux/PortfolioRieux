import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useVerification } from "./useVerification";
import { useUser } from "../store/user";
import { updateIssue, getIssues } from "../services/issues";
import type { ReqBodyIssue } from "../../server/types/advanced";

export function useProfileIssues() {
  const client = useQueryClient();
  const { token, validFetch, errorAuth } = useVerification();
  const { username } = useUser();

  const getIssuesProfile = useQuery({
    queryKey: ["Issues", username],
    queryFn: () => getIssues({ created_by: username, token }),
    enabled: validFetch,
  });

  const updateIssueProfile = useMutation({
    mutationFn: updateIssue,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["Issues", username] });
    },
  });

  return {
    data: getIssuesProfile.data,
    error: getIssuesProfile.error,
    errorAuth,
    updateOneIssue: ({ _id, project, text, title }: ReqBodyIssue) => {
      updateIssueProfile.mutate({ token, _id, project, text, title });
    },
    updateIssue: updateIssueProfile,
  };
}
