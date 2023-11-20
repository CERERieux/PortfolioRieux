import axios from "axios";
import type { User, ResponseAction, responseLogin } from "../types";

export async function createUser({ username, password }: User) {
  const resultCreateUser = await axios<ResponseAction>({
    url: "/cYSvQmg9kR/global/user",
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

export async function loginUser({ username, password }: User) {
  const resultLoginUser = await axios<responseLogin>({
    url: "/cYSvQmg9kR/global/verify-user",
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
    url: "/cYSvQmg9kR/global/verify-token",
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
    url: "/cYSvQmg9kR/global/verify-admin",
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
