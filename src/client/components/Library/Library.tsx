import { useEffect, useState } from "react";
import { useBooks } from "../../hooks/useBooks";
import { isAxiosError } from "axios";
import { ERROR_BOOKS } from "../../../server/schemas/advanced";
import { Link } from "react-router-dom";
import UnauthorizedAccess from "../NotFound/AuthError";
import ErrorMessage from "../SystemDesign/ErrorMessage";
import ActionMessage from "../SystemDesign/ActionMessage";
import Button from "../SystemDesign/Button";
import LibraryForm from "./LibraryForm";

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
  const [errorLocal, setErrorLocal] = useState<string | null>(null);
  const [action, setAction] = useState<string | null>(null);
  const idOpen = "openLibraryDialog";

  useEffect(() => {
    // If library was emptied successfully, show the action
    if (deleteLibrary.isSuccess) {
      setAction("You emptied all your Library!");
      setTimeout(() => {
        setAction(null);
      }, 5000);
    } else if (deleteLibrary.isError) {
      /* If it wasn't a success, then maybe is an error,
            Show it in case it is, ex: User maybe wants to delete
            An empty library and that can't be done */
      const { error } = deleteLibrary;
      if (isAxiosError(error)) {
        setErrorLocal(error.response?.data.error);
      } else {
        setErrorLocal("Something went wrong at emptying your Library");
      }
    }
  }, [deleteLibrary.isSuccess]);

  useEffect(() => {
    // If book was removed successfully, show the action
    if (removeBook.isSuccess) {
      setAction("Book removed!");
      setTimeout(() => {
        setAction(null);
      }, 2000);
    } else if (removeBook.isError) {
      /* If it wasn't a success, then maybe is an error,
            Show it in case it was one */
      const { error } = deleteLibrary;
      if (isAxiosError(error)) {
        setErrorLocal(error.response?.data.error);
      } else {
        setErrorLocal("Something went wrong at emptying your Library");
      }
    }
  }, [removeBook.isSuccess]);

  const handleDeleteLibrary = () => {
    if (data !== undefined && !("error" in data)) removeAllBooks();
    else {
      setErrorLocal(ERROR_BOOKS.DELETE_EMPTY_LIBRARY);
    }
  };
  const handleRemove = (id: string) => {
    removeOneBook(id);
  };

  return errorAuth.cause !== null ? (
    <UnauthorizedAccess errorAuth={errorAuth} />
  ) : (
    <main>
      <nav className="right-0 -order-2 md:absolute">
        <Link to="/my-profile">
          <Button
            color="bg-lime-300 border-lime-500 hover:bg-sky-600 hover:border-sky-500"
            xSize="w-full"
          >
            Return to My Profile
          </Button>
        </Link>
      </nav>
      {errorBook !== null && isAxiosError(errorBook) && (
        <ErrorMessage extraStyles="md:left-1/4 z-10">
          Error: {errorBook.response?.data.error}
        </ErrorMessage>
      )}
      {errorLocal !== null && (
        <ErrorMessage extraStyles="md:left-1/4 z-20">
          Error: {errorLocal}
        </ErrorMessage>
      )}
      {action !== null && (
        <ActionMessage extraStyles="md:left-1/4 z-10">{action}</ActionMessage>
      )}
      <h2>Add books to your library!</h2>
      <Button
        color="bg-lime-300 border-lime-500 hover:bg-lime-600 hover:border-lime-500"
        id={idOpen}
      >
        Add Books
      </Button>
      <LibraryForm
        idOpen={idOpen}
        createBook={createBook}
        createNewBook={createNewBook}
        setAction={setAction}
        setErrorLocal={setErrorLocal}
      />
      <button
        onClick={handleDeleteLibrary}
        disabled={
          (data !== undefined && "error" in data) || deleteLibrary.isPending
        }
      >
        Delete all your books!!!
      </button>
      {data !== undefined ? (
        <article>
          {!("error" in data) ? (
            <ul>
              {data.map(book => {
                const id = book._id.toString();
                return (
                  <li key={id}>
                    <div>
                      <Link to={`/my-profile/library/${id}`}>
                        <h2>{book.title}</h2>
                      </Link>
                      <p>{book.status}</p>
                      <p>{book.review}</p>
                      <p>{book.recommend}</p>
                      <button
                        onClick={() => {
                          handleRemove(id);
                        }}
                        disabled={removeBook.isPending}
                      >
                        Remove from my Library
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <h2>{data.error}</h2>
          )}
        </article>
      ) : (
        <p>Loading...</p>
      )}
    </main>
  );
}
