import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useVerification } from "./useVerification";
import * as BookService from "../services/books";

/** Custom hook that manages the actions that can be done for a single book
 * in the library. It verify if the user is logged in, if it is, then can be used
 *
 * It returns the functions to do operations with the books, the data from the book,
 *  if the session is valid and errors from the modifications or the session
 */
export function useSingleBook(id: string) {
  const client = useQueryClient();
  const { errorAuth, token, validFetch } = useVerification();

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
      client.invalidateQueries({ queryKey: ["books", id], exact: true });
    },
  });

  /** Function that adds notes to the book */
  const createNote = useMutation({
    mutationFn: BookService.createNote,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["books", id], exact: true });
    },
  });
  /** Function that removes notes from the book */
  const deleteNote = useMutation({
    mutationFn: BookService.deleteNote,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["books", id], exact: true });
    },
  });

  // Return an object with the info needed to manipulate the books and show information about it
  return {
    data: singleBook.data,
    errorBook: singleBook.error,
    errorAuth,
    updateBook: updateDataBook,
    addNote: createNote,
    removeNote: deleteNote,
    token,
  };
}
