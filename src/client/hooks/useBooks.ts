import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useVerification } from "./useVerification";
import * as BookService from "../services/books";
import { getUserBooks } from "../services/user";
import type { CreateBookHook, UserProfileHook } from "../types";

/** Custom hook that manages the operations of the library, from getting all the
 * user books, add a new one or deleting all the library.
 *
 * It returns the functions to perform those operations and information
 * about if user session still valid or need to login to use this service.
 */
export function useBooks({ externalUser }: UserProfileHook) {
  const client = useQueryClient();
  const currentUser = externalUser ?? "";
  // console.log(externalUser);
  const { errorAuth, token, validFetch } = useVerification();

  /** Function that brings all the user books from database */
  const getBooks = useQuery({
    queryKey: ["books"],
    queryFn: () => BookService.getAllBooks({ token }),
    enabled: validFetch,
  });
  /** Function that brings all the user books from database */
  const getExternalUserBooks = useQuery({
    queryKey: ["books"],
    queryFn: () => getUserBooks(currentUser),
    enabled: currentUser !== "",
  });
  /** Function that adds a new book to the library */
  const createBook = useMutation({
    mutationFn: BookService.createBook,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["books"], exact: true });
    },
  });
  /** Function that remove all books from the user library */
  const deleteBooks = useMutation({
    mutationFn: BookService.deleteLibrary,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["books"], exact: true });
    },
  });
  /** Function that can delete the book from database if needed */
  const deleteBook = useMutation({
    mutationFn: BookService.deleteBook,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["books"], exact: true });
    },
  });

  // Return the data needed to perform those operations and display the info that user needs and wants from the service
  return {
    data: getBooks.data,
    errorBook: getBooks.error,
    errorAuth,
    createBook,
    createNewBook: ({ status, title }: CreateBookHook) => {
      createBook.mutate({ status, title, token });
    },
    removeBook: deleteBook,
    removeOneBook: (id: string) => {
      deleteBook.mutate({ id, token });
    },
    deleteLibrary: deleteBooks,
    removeAllBooks: () => {
      deleteBooks.mutate({ token });
    },
    getExternalUserBooks,
  };
}
