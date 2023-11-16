import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useVerification } from "./useVerification";
import { useState } from "react";
import * as BookService from "../services/books";
import type { CreateNoteHook, DeleteNoteHook, UpdateBookHook } from "../types";

/** Custom hook that manages the actions that can be done for a single book
 * in the library. It verify if the user is logged in, if it is, then can be used
 *
 * It returns the functions to do operations with the books, the data from the book,
 *  if the session is valid and errors from the modifications or the session
 */
export function useSingleBook(id: string) {
  const client = useQueryClient();
  const { errorAuth, token, validFetch } = useVerification();
  const [successMutation, setSuccessMutation] = useState(false);

  /** Function that gets a book based on the id given by user from database */
  const singleBook = useQuery({
    queryKey: ["books", id],
    queryFn: () => BookService.singleBook({ id, token }),
    enabled: validFetch,
  });
  /** Function that can update the data in the book */
  const updateDataBook = useMutation({
    mutationFn: BookService.updateBook,
    onSuccess: () => {
      setSuccessMutation(true);
      client.invalidateQueries({ queryKey: ["books", id] });
    },
    onError: () => {
      setSuccessMutation(false);
    },
  });
  /** Function that can delete the book from database if needed */
  const deleteBook = useMutation({
    mutationFn: BookService.deleteBook,
    onSuccess: () => {
      setSuccessMutation(true);
      client.invalidateQueries({ queryKey: ["books", id] });
    },
    onError: () => {
      setSuccessMutation(false);
    },
  });
  /** Function that adds notes to the book */
  const createNote = useMutation({
    mutationFn: BookService.createNote,
    onSuccess: () => {
      setSuccessMutation(true);
      client.invalidateQueries({ queryKey: ["books", id] });
    },
    onError: () => {
      setSuccessMutation(false);
    },
  });
  /** Function that removes notes from the book */
  const deleteNote = useMutation({
    mutationFn: BookService.deleteNote,
    onSuccess: () => {
      setSuccessMutation(true);
      client.invalidateQueries({ queryKey: ["books", id] });
    },
    onError: () => {
      setSuccessMutation(false);
    },
  });

  // Return an object with the info needed to manipulate the books and show information about it
  return {
    data: singleBook.data,
    errorBook: singleBook.error,
    errorAuth,
    success: successMutation,
    updateBook: ({ id, title, status, review, recommend }: UpdateBookHook) => {
      updateDataBook.mutate({ id, token, title, status, review, recommend });
    },
    deleteThisBook: () => {
      deleteBook.mutate({ id, token });
    },
    addNote: ({ note }: CreateNoteHook) => {
      createNote.mutate({ note, id, token });
    },
    removeNote: ({ number }: DeleteNoteHook) => {
      deleteNote.mutate({ number, token, id });
    },
  };
}
