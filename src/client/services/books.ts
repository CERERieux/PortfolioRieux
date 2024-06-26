import axios from "axios";
import type {
  BookService,
  CreateBookService,
  CreateNoteService,
  DeleteLibraryService,
  DeleteNoteService,
  DeleteOperation,
  EmptyData,
  ResponseAction,
  ResultCreateBook,
  ResultCreateNote,
  ResultDeleteNote,
  ResultUpdateBook,
  SingleBook,
  SingleOperation,
  Token,
  UpdateBookService,
} from "../types";
// Here belongs all the fetches needed to do operations with books in db

export function getAllBooks({ token }: Token) {
  return axios<BookService[] | EmptyData>({
    url: `/${import.meta.env.VITE_ROUTE_API}/advanced/books`,
    method: "get",
    headers: { Authorization: `Bearer ${token}` },
  }).then(({ data }) => {
    return data;
  });
}

export function deleteLibrary({ token, userId }: DeleteLibraryService) {
  const adminData = userId !== undefined ? `?user_id=${userId}` : "";
  return axios<ResponseAction>({
    url: `/${import.meta.env.VITE_ROUTE_API}/advanced/books${adminData}`,
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

export function singleBook({ id, token }: SingleOperation) {
  return axios<SingleBook>({
    url: `/${import.meta.env.VITE_ROUTE_API}/advanced/books/${id}`,
    method: "get",
    headers: { Authorization: `Bearer ${token}` },
  }).then(({ data }) => {
    return data;
  });
}

export function createBook({ token, title, status }: CreateBookService) {
  return axios<ResultCreateBook>({
    url: `/${import.meta.env.VITE_ROUTE_API}/advanced/books`,
    method: "post",
    data: { title, status },
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

export function updateBook({
  id,
  token,
  title,
  status,
  review,
  recommend,
}: UpdateBookService) {
  return axios<ResultUpdateBook>({
    url: `/${import.meta.env.VITE_ROUTE_API}/advanced/books/${id}`,
    method: "put",
    data: { title, status, review, recommend },
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

export function deleteBook({ id, token, userId }: DeleteOperation) {
  const adminData = userId !== undefined ? `?user_id=${userId}` : "";
  return axios<ResponseAction>({
    url: `/${import.meta.env.VITE_ROUTE_API}/advanced/books/${id}${adminData}`,
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

export function createNote({ id, token, note }: CreateNoteService) {
  return axios<ResultCreateNote>({
    url: `/${import.meta.env.VITE_ROUTE_API}/advanced/books/${id}`,
    method: "post",
    data: { note },
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

export function deleteNote({ id, token, number }: DeleteNoteService) {
  return axios<ResultDeleteNote>({
    url: `/${import.meta.env.VITE_ROUTE_API}/advanced/books/note/${id}`,
    method: "put",
    data: {
      note_number: number,
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
