import axios from "axios";
import type {
  CreateShortUrl,
  DeleteOperation,
  EmptyData,
  ResponseAction,
  ShortUrlResult,
  Token,
  UserUrls,
} from "../types";

export function getUserUrl({ token }: Token) {
  return axios<UserUrls[] | EmptyData>({
    url: `/${import.meta.env.VITE_ROUTE_API}/basic/shorturl`,
    method: "get",
    headers: { Authorization: `Bearer ${token}` },
  }).then(({ data }) => {
    return data;
  });
}

export function createUrl({ token, url }: CreateShortUrl) {
  return axios<ShortUrlResult>({
    url: `/${import.meta.env.VITE_ROUTE_API}/basic/shorturl`,
    method: "post",
    data: {
      url,
    },
    headers: { Authorization: `Bearer ${token}` },
  })
    .then(({ data }) => {
      return data;
    })
    .catch(err => {
      console.error(err);
      return { error: err.response.data.error as string };
    });
}

export function deleteUrl({ token, id, userId }: DeleteOperation) {
  const adminData = userId !== undefined ? `?user_id=${userId}` : "";
  return axios<ResponseAction>({
    url: `/${import.meta.env.VITE_ROUTE_API}/basic/shorturl/${id}${adminData}`,
    method: "delete",
    headers: { Authorization: `Bearer ${token}` },
  })
    .then(({ data }) => {
      return data;
    })
    .catch(err => {
      console.error(err);
      return { error: err.response.data.error as string };
    });
}
