import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import * as IssueService from "../services/issues";
import { useUser } from "../store/user";
import type {
  CreateIssueHook,
  GetIssuesService,
  SetUserOptions,
} from "../types";

export function useIssues() {
  const { token } = useUser();
  const [options, setOptions] = useState<GetIssuesService>({
    token: undefined,
    _id: undefined,
    project: undefined,
    title: undefined,
    text: undefined,
    created_by: undefined,
    status: undefined,
    created_on: undefined,
    updated_on: undefined,
  });
  const [enableSearch, setEnabledSearch] = useState(true);
  const client = useQueryClient();

  const setUserOptions = ({
    _id,
    createdBy,
    createdOn,
    open,
    project,
    status,
    text,
    title,
    updatedOn,
  }: SetUserOptions) => {
    setOptions({
      _id,
      created_by: createdBy,
      created_on: createdOn,
      open,
      project,
      status,
      text,
      title,
      token,
      updated_on: updatedOn,
    });
  };
  useEffect(() => {
    client.invalidateQueries({ queryKey: ["issues"] });
  }, [options]);

  const getIssues = useQuery({
    queryKey: ["issues"],
    queryFn: () => IssueService.getIssues(options),
    enabled: enableSearch,
  });

  useEffect(() => {
    if (getIssues.isSuccess) {
      setEnabledSearch(false);
    }
  }, [getIssues.isFetching]);

  const createIssue = useMutation({
    mutationFn: IssueService.createIssue,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["issues"], exact: true });
    },
  });

  return {
    data: getIssues.data,
    error: getIssues.error,
    isFetching: getIssues.isFetching,
    isCreating: getIssues.isPending,
    getNewSearch: setEnabledSearch,
    searchOptions: setUserOptions,
    addIssue: createIssue,
    addUserIssue: ({ project, text, title }: CreateIssueHook) => {
      createIssue.mutate({ project, text, title, token });
    },
  };
}
