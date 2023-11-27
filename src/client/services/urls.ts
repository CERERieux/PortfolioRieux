import axios from "axios";
import type {
  CreateShortUrl,
  EmptyData,
  ResponseAction,
  SingleOperation,
  Token,
  UserUrls,
} from "../types";

export function getUserUrl({ token }: Token) {
  return axios<UserUrls[] | EmptyData>({
    url: "/cYSvQmg9kR/basic/shorturl",
    method: "get",
    headers: { Authorization: `Bearer ${token}` },
  }).then(({ data }) => {
    return data;
  });
}

export function createUrl({ token, url }: CreateShortUrl) {
  return axios({
    url: "/cYSvQmg9kR/basic/shorturl",
    method: "post",
    data: {
      url,
    },
    headers: { Authorization: `Bearer ${token}` },
  }).then(({ data }) => {
    return data;
  });
}

export function deleteUrl({ token, id }: SingleOperation) {
  return axios<ResponseAction>({
    url: `/cYSvQmg9kR/basic/shorturl/${id}`,
    method: "delete",
    headers: { Authorization: `Bearer ${token}` },
  }).then(({ data }) => {
    return data;
  });
}
