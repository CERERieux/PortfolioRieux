import axios from "axios";
import type {
  BookService,
  CreateBookService,
  CreateNoteService,
  DeleteNoteService,
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
  return axios<BookService[]>({
    url: "/cYSvQmg9kR/advanced/books",
    method: "get",
    headers: { Authorization: `Bearer ${token}` },
  }).then(({ data }) => {
    return data;
  });
}

export function deleteLibrary({ token }: Token) {
  return axios<ResponseAction>({
    url: "/cYSvQmg9kR/advanced/books",
    method: "delete",
    headers: { Authorization: `Bearer ${token}` },
  });
}

export function singleBook({ id, token }: SingleOperation) {
  return axios<SingleBook>({
    url: `/cYSvQmg9kR/advanced/books/${id}`,
    method: "get",
    headers: { Authorization: `Bearer ${token}` },
  }).then(({ data }) => {
    return data;
  });
}

export function createBook({ token, title, status }: CreateBookService) {
  return axios<ResultCreateBook>({
    url: "/cYSvQmg9kR/advanced/books",
    method: "post",
    data: { title, status },
    headers: { Authorization: `Bearer ${token}` },
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
    url: `/cYSvQmg9kR/advanced/books/${id}`,
    method: "put",
    data: { title, status, review, recommend },
    headers: { Authorization: `Bearer ${token}` },
  });
}

export function deleteBook({ id, token }: SingleOperation) {
  return axios<ResponseAction>({
    url: `/cYSvQmg9kR/advanced/books/${id}`,
    method: "delete",
    headers: { Authorization: `Bearer ${token}` },
  });
}

export function createNote({ id, token, note }: CreateNoteService) {
  return axios<ResultCreateNote>({
    url: `/cYSvQmg9kR/advanced/books/note/${id}`,
    method: "post",
    data: { note },
    headers: { Authorization: `Bearer ${token}` },
  });
}

export function deleteNote({ id, token, number }: DeleteNoteService) {
  return axios<ResultDeleteNote>({
    url: `/cYSvQmg9kR/advanced/books/note/${id}`,
    method: "put",
    data: {
      note_number: number,
    },
    headers: { Authorization: `Bearer ${token}` },
  });
}
