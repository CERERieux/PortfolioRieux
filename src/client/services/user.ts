import axios from "axios";
import type { User } from "../types";
import { type responseCreate, type responseLogin } from "../types";

export async function createUser({ username, password }: User) {
  const resultCreateUser = await axios<responseCreate>({
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
