import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useVerification } from "./useVerification";
import { useUser } from "../store/user";
import { updateIssue, getIssues } from "../services/issues";
import { useEffect, useState } from "react";

export function useProfileIssues() {
  const client = useQueryClient();
  const { token, validFetch, errorAuth } = useVerification();
  const { username } = useUser();
  const [enable, setEnable] = useState(false);

  const getIssuesProfile = useQuery({
    queryKey: ["Issues", username],
    queryFn: () => getIssues({ created_by: username, token }),
    enabled: validFetch || enable,
  });

  useEffect(() => {
    if (getIssuesProfile.isSuccess) setEnable(false);
  }, [getIssuesProfile.isFetching]);

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
    getNewSearch: setEnable,
    updateIssue: updateIssueProfile,
    token,
  };
}
