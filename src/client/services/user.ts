import axios from "axios";
import type {
  User,
  ResponseAction,
  responseLogin,
  UserInfo,
  UpdateUserService,
  BookService,
  EmptyData,
  AllUsers,
  SingleOperation,
} from "../types";

export function getAllUsers(token: string) {
  return axios<AllUsers[]>({
    url: `/${import.meta.env.VITE_ROUTE_API}/global/${
      import.meta.env.VITE_ROUTE_ADMIN
    }/admin`,
    method: "get",
    headers: { Authorization: `Bearer ${token}` },
  }).then(({ data }) => data);
}

export function getUserInfo(user: string) {
  return axios<UserInfo>({
    url: `/${import.meta.env.VITE_ROUTE_API}/global/user/${user}`,
    method: "get",
  }).then(({ data }) => data);
}

export async function createUser({ username, password }: User) {
  const resultCreateUser = await axios<ResponseAction>({
    url: `/${import.meta.env.VITE_ROUTE_API}/global/user`,
    method: "post",
    data: {
      _id: username,
      password,
    },
  })
    .then(res => {
      return { action: res.data.action };
    })
    .catch(err => {
      console.error(err);
      return { error: err.response.data.error as string };
    });
  return resultCreateUser;
}

export function updateInfoUser({ token, bio, img }: UpdateUserService) {
  return axios<ResponseAction>({
    url: `/${import.meta.env.VITE_ROUTE_API}/global/user`,
    method: "put",
    headers: { Authorization: `Bearer ${token}` },
    data: {
      bio,
      img,
    },
  })
    .then(({ data }) => data)
    .catch(err => {
      console.error(err);
      return { error: err.response.data.error as string };
    });
}

export async function loginUser({ username, password }: User) {
  const resultLoginUser = await axios<responseLogin>({
    url: `/${import.meta.env.VITE_ROUTE_API}/global/verify-user`,
    method: "post",
    data: {
      _id: username,
      password,
    },
  })
    .then(({ data }) => {
      return {
        token: data.token,
        username: data.username,
      };
    })
    .catch(err => {
      console.error(err);
      return { error: err.response.data.error as string };
    });
  return resultLoginUser;
}

export async function verifyToken(token: string) {
  const resultVerifyToken = await axios<{ newToken: string }>({
    url: `/${import.meta.env.VITE_ROUTE_API}/global/verify-token`,
    method: "post",
    data: { token },
  })
    .then(({ data }) => {
      return data;
    })
    .catch(err => {
      console.error(err);
      return { error: err.response.data.error as string };
    });
  return resultVerifyToken;
}

export async function verifyAdmin({ username, password }: User) {
  const resultVerifyAdmin = await axios<responseLogin>({
    url: `/${import.meta.env.VITE_ROUTE_API}/global/verify-admin`,
    method: "post",
    data: {
      _id: username,
      password,
    },
  })
    .then(({ data }) => {
      return data;
    })
    .catch(err => {
      console.error(err);
      return { error: err.response.data.error as string };
    });

  return resultVerifyAdmin;
}

export function getUserBooks(user: string) {
  return axios<BookService[] | EmptyData>({
    url: `/${import.meta.env.VITE_ROUTE_API}/advanced/books/external/${user}`,
    method: "get",
  }).then(({ data }) => data);
}

export function getUserInfoAdmin({ id, token }: SingleOperation) {
  return axios<AllUsers>({
    url: `/${import.meta.env.VITE_ROUTE_API}/global/${
      import.meta.env.VITE_ROUTE_ADMIN
    }/admin/${id}`,
    method: "get",
    headers: { Authorization: `Bearer ${token}` },
  }).then(({ data }) => data);
}
