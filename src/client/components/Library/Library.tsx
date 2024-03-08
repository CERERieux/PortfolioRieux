import { useEffect, useState } from "react";
import { useBooks } from "../../hooks/useBooks";
import { isAxiosError } from "axios";
import { ERROR_BOOKS } from "../../../server/schemas/advanced";
import UnauthorizedAccess from "../NotFound/AuthError";
import ErrorMessage from "../SystemDesign/ErrorMessage";
import ActionMessage from "../SystemDesign/ActionMessage";
import LibraryForm from "./LibraryForm";
import BookList from "./BookList";
import HeaderLibrary from "./HeaderLibrary";
import FilterBooks from "./FilterBooks";
import type {
  BookStatus,
  BookRecommend,
  EmptyData,
  BookService,
} from "../../types";
import NavMenu from "../MyProfile/NavMenu";
import CustomBackground from "../SystemDesign/CustomBackground";

export default function Library() {
  const {
    data,
    errorAuth,
    errorBook,
    createBook,
    createNewBook,
    deleteLibrary,
    removeBook,
    removeOneBook,
    removeAllBooks,
  } = useBooks({});
  // 2 states to handle the actions from user
  const [errorLocal, setErrorLocal] = useState<string | null>(null);
  const [action, setAction] = useState<string | null>(null);
  // 3 states to handle the filter
  const [title, setTitle] = useState("");
  const [recommend, setRecommend] = useState<BookRecommend | "All">("All");
  const [status, setStatus] = useState<BookStatus | "All">("All");
  // state to handle the info filtered
  const [filteredData, setFilteredData] = useState<EmptyData | BookService[]>(
    [],
  );
  const idOpen = "openLibraryDialog"; // Auxiliar for the id of the Add book Dialog
  const idDialogDelete = "DeleteLibraryDialog"; // Auxiliar for the id of the Delete book Dialog

  // Effect that activates each time data changes
  useEffect(() => {
    // Will assign to the state the data when data exist
    if (data != null) {
      setFilteredData(data);
    }
  }, [data]);

  // Effect that activates when user empty the library
  useEffect(() => {
    // If library was emptied, do next
    if (deleteLibrary.isSuccess) {
      // Get the dialog element
      const dialogDelete = document.getElementById(
        idDialogDelete,
      ) as HTMLDialogElement;
      dialogDelete.close(); // And close it
      // Verify that empty the library was successful, if it was
      if (!("error" in deleteLibrary.data)) {
        setErrorLocal(null); // Remove the error if there was 1
        // And show the action for 4 seconds
        setAction("You emptied all your Library!");
        setTimeout(() => {
          setAction(null);
        }, 4000);
      } else {
        // It an error happened show it for 3 seconds
        setErrorLocal(deleteLibrary.data.error);
        setAction(null);
        setTimeout(() => {
          setErrorLocal(null);
        }, 3000);
      }
    } else if (deleteLibrary.isError) {
      /* If it wasn't completed, then maybe is an error, show it in case it is, 
      ex: User maybe wants to delete an empty library and that can't be done */
      const { error } = deleteLibrary;
      if (isAxiosError(error)) {
        setErrorLocal(error.response?.data.error);
      } else {
        // Show a generic message if axios can't cover the error
        setErrorLocal("Something went wrong at emptying your Library");
      }
      // Only show error for 3 seconds
      setAction(null);
      setTimeout(() => {
        setErrorLocal(null);
      }, 3000);
    }
  }, [deleteLibrary.isSuccess]);

  // Effect that activates when user removes a book, similar as the last effect
  useEffect(() => {
    // If book was removed
    if (removeBook.isSuccess) {
      // Show action if it was successful for 2 seconds
      if (!("error" in removeBook.data)) {
        setErrorLocal(null);
        setAction("Book removed!");
        setTimeout(() => {
          setAction(null);
        }, 2000);
      } else {
        // If an error happened, show it for 3 seconds
        setAction(null);
        setErrorLocal(removeBook.data.error);
        setTimeout(() => {
          setAction(null);
        }, 3000);
      }
    } else if (removeBook.isError) {
      // If it was an error at completing, show it in case it was one
      const { error } = deleteLibrary;
      if (isAxiosError(error)) {
        setErrorLocal(error.response?.data.error);
      } else {
        // Show a generic message if axios can't cover the error
        setErrorLocal("Something went wrong at emptying your Library");
      }
      // Only show error for 3 seconds
      setAction(null);
      setTimeout(() => {
        setErrorLocal(null);
      }, 3000);
    }
  }, [removeBook.isSuccess]);

  // Auxiliar function to delete library
  const handleDeleteLibrary = () => {
    // Only do it when there is books on it
    if (data !== undefined && !("error" in data)) removeAllBooks();
    else {
      // Else, show an error for 3 seconds
      setErrorLocal(ERROR_BOOKS.DELETE_EMPTY_LIBRARY);
      setAction(null);
      setTimeout(() => {
        setErrorLocal(null);
      }, 3000);
    }
  };
  // Auxiliar function to remove a book based on it ID
  const handleRemove = (id: string) => {
    removeOneBook(id);
  };

  // Component of the Library, if there is an error with user, return Unauthorized Access
  return errorAuth.cause !== null ? (
    <UnauthorizedAccess errorAuth={errorAuth} />
  ) : (
    <CustomBackground
      bgImg="before:bg-[url('/libraryBG.webp')] before:opacity-30"
      styles="w-full h-full"
    >
      <main className="relative flex h-full w-full flex-col gap-4 overflow-y-auto px-6 py-4">
        <NavMenu />
        {errorBook !== null && isAxiosError(errorBook) && (
          <ErrorMessage>Error: {errorBook.response?.data.error}</ErrorMessage>
        )}
        {errorLocal !== null && (
          <ErrorMessage>Error: {errorLocal}</ErrorMessage>
        )}
        {action !== null && <ActionMessage>{action}</ActionMessage>}
        <HeaderLibrary
          disabled={
            (data !== undefined && "error" in data) || deleteLibrary.isPending
          }
          handleDeleteLibrary={handleDeleteLibrary}
          idOpen={idOpen}
        />
        <LibraryForm
          idOpen={idOpen}
          createBook={createBook}
          createNewBook={createNewBook}
          setAction={setAction}
          setErrorLocal={setErrorLocal}
        />
        <FilterBooks
          recommend={recommend}
          setRecommend={setRecommend}
          setStatus={setStatus}
          setTitle={setTitle}
          status={status}
          title={title}
        />
        {data !== undefined ? (
          <BookList
            data={data}
            dataFiltered={filteredData}
            handleRemove={handleRemove}
            isPending={removeBook.isPending}
            recommend={recommend}
            status={status}
            title={title}
            setFilteredData={setFilteredData}
          />
        ) : (
          <p>Loading...</p>
        )}
      </main>
    </CustomBackground>
  );
}
