import axios from "axios";
import type {
  CreateIssueService,
  EmptyData,
  GetIssuesService,
  ResponseAction,
  SingleOperation,
  UpdateIssueService,
} from "../types";
import type { IIssueTracker } from "../../server/types/advanced";

export function getIssues(QueryOptions: GetIssuesService) {
  const userToken = QueryOptions.token ?? "";
  let options = "";
  let key: keyof typeof QueryOptions;
  for (key in QueryOptions) {
    if (QueryOptions[key] !== undefined && key !== "token") {
      options += `${key}=${QueryOptions[key]}&`;
    }
  }
  if (options.endsWith("&")) options = options.slice(0, options.length - 1);
  return axios<IIssueTracker[] | EmptyData>({
    url: `/cYSvQmg9kR/advanced/issue-tracker/?${options}`,
    method: "get",
    headers: { Authorization: `Bearer ${userToken}` },
  }).then(({ data }) => {
    return data;
  });
}

export function createIssue({
  project,
  text,
  title,
  token,
}: CreateIssueService) {
  const userToken = token ?? "";
  return axios<IIssueTracker>({
    url: "/cYSvQmg9kR/advanced/issue-tracker",
    method: "post",
    headers: { Authorization: `Bearer ${userToken}` },
    data: { project, text, title },
  }).then(({ data }) => {
    return data;
  });
}

export function updateIssue({
  token,
  _id,
  open,
  project,
  status,
  text,
  title,
}: UpdateIssueService) {
  return axios({
    url: "/cYSvQmg9kR/advanced/issue-tracker",
    method: "put",
    headers: { Authorization: `Bearer ${token}` },
    data: { _id, open, project, status, text, title },
  });
}

export function deleteIssue({ id, token }: SingleOperation) {
  return axios<ResponseAction>({
    url: `/cYSvQmg9kR/advanced/issue-tracker/${id}`,
    method: "delete",
    headers: { Authorization: `Bearer ${token}` },
  }).then(({ data }) => {
    return data;
  });
}
