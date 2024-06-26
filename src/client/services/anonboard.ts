import axios from "axios";
import type {
  BoardData,
  CreateReplyService,
  CreateThreadService,
  DeleteReply,
  DeleteThread,
  EmptyData,
  ReplyOperation,
  ResponseAction,
  ResponseCreate,
  SingleOperation,
  ThreadOperation,
} from "../types";
import type { IThread, IThreadFiltered } from "../../server/types/advancedMisc";

export function getBoards() {
  return axios<BoardData[] | EmptyData>({
    url: `/${import.meta.env.VITE_ROUTE_API}/advanced-misc/boards`,
    method: "get",
  }).then(({ data }) => data);
}

export function getThreads(board: string) {
  return axios<IThreadFiltered[]>({
    url: `/${import.meta.env.VITE_ROUTE_API}/advanced-misc/threads/${board}`,
    method: "get",
  }).then(({ data }) => data);
}

export function createThread({ board, text, password }: CreateThreadService) {
  return axios<ResponseCreate>({
    url: `/${import.meta.env.VITE_ROUTE_API}/advanced-misc/threads/${board}`,
    method: "post",
    data: {
      board,
      text,
      delete_password: password,
    },
  }).then(({ data }) => data);
}

export function reportThread({ board, idThread }: ThreadOperation) {
  return axios<ResponseAction>({
    url: `/${import.meta.env.VITE_ROUTE_API}/advanced-misc/threads/${board}`,
    method: "put",
    data: {
      thread_id: idThread,
    },
  }).then(({ data }) => data);
}

export function deleteThread({ board, idThread, password }: DeleteThread) {
  return axios<ResponseAction>({
    url: `/${
      import.meta.env.VITE_ROUTE_API
    }/advanced-misc/threads/${board}?thread_id=${idThread}&password=${password}`,
    method: "delete",
  })
    .then(({ data }) => data)
    .catch(err => {
      console.error(err);
      const errorRequest = { error: err.response.data.error as string };
      return errorRequest;
    });
}

export function getReplies({ board, idThread }: ThreadOperation) {
  return axios<IThread>({
    url: `/${
      import.meta.env.VITE_ROUTE_API
    }/advanced-misc/replies/${board}?thread_id=${idThread}`,
    method: "get",
  }).then(({ data }) => data);
}

export function createReply({
  board,
  idThread,
  password,
  text,
}: CreateReplyService) {
  return axios({
    url: `/${import.meta.env.VITE_ROUTE_API}/advanced-misc/replies/${board}`,
    method: "post",
    data: {
      delete_password: password,
      id_thread: idThread,
      text,
    },
  }).then(({ data }) => data);
}

export function reportReply({ board, idReply }: ReplyOperation) {
  return axios<ResponseAction>({
    url: `/${import.meta.env.VITE_ROUTE_API}/advanced-misc/replies/${board}`,
    method: "put",
    data: {
      reply_id: idReply,
    },
  }).then(({ data }) => data);
}

export function deleteReply({ board, idReply, password }: DeleteReply) {
  return axios<ResponseAction>({
    url: `/${
      import.meta.env.VITE_ROUTE_API
    }/advanced-misc/replies/${board}?password=${password}&reply_id=${idReply}`,
    method: "delete",
  })
    .then(({ data }) => data)
    .catch(err => {
      console.error(err);
      const errorRequest = { error: err.response.data.error as string };
      return errorRequest;
    });
}

export function deleteBoard({ id, token }: SingleOperation) {
  return axios<ResponseAction>({
    url: `/${import.meta.env.VITE_ROUTE_API}/advanced-misc/board/${id}`,
    method: "delete",
    headers: { Authorization: `Bearer ${token}` },
  }).then(({ data }) => data);
}
