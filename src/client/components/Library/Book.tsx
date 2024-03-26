import { useEffect, useState, useCallback } from "react";
import { isAxiosError } from "axios";
import { useSingleBook } from "../../hooks/useSingleBook";
import { Link, useParams } from "react-router-dom";
import type { SingleBook } from "../../types";
import UnauthorizedAccess from "../NotFound/AuthError";
import ErrorMessage from "../SystemDesign/ErrorMessage";
import Button from "../SystemDesign/Button";
import CustomBackground from "../SystemDesign/CustomBackground";
import BookAside from "./BookAside";
import BookData from "./BookData";
import FooterAttribution from "../SystemDesign/FooterAttribution";
import ActionMessage from "../SystemDesign/ActionMessage";
import LoaderText from "../NotFound/LoaderText";

export default function Book() {
  const { id } = useParams(); // Get the id of the book from the params of the page
  const idBook = id ?? ""; // Get the id as string for the custom hook
  const {
    data,
    errorAuth,
    errorBook,
    updateBook,
    updateDataBook,
    addNote,
    createNote,
    removeNote,
    deleteNote,
  } = useSingleBook(idBook); // Get the info of the book
  // 2 states to manage the result of the user actions
  const [action, setAction] = useState<string | null>(null);
  const [localError, setLocalError] = useState<string | null>(null);
  const [emptyNotes, setEmptyNotes] = useState(true); // state to see if we have have notes or not

  // Use effect to change the title of the page
  useEffect(() => {
    document.title = "Book - Library";
  }, []);

  // Auxiliar to know if the notes are empty or not
  const isEmptyNotes = useCallback((data: SingleBook) => {
    // Go through the notes, if those don't have text, then don't "exist"
    const isEmpty = data.notes.map(note => {
      if (note !== "") return true;
      return false;
    });
    // Find if a note with text exist, return the result of this
    if (isEmpty.find(note => note) !== undefined) {
      return false;
    } else return true;
  }, []);

  // Effect that activates each time user deletes a note
  useEffect(() => {
    // If the petition was completed, we need to see if it's success or an error
    if (deleteNote.isSuccess) {
      // If it was a success then
      if (!("error" in deleteNote.data)) {
        // Check if notes is empty or not
        if (data !== undefined) {
          setEmptyNotes(isEmptyNotes(data));
        }
        // and show the action for 2 seconds
        setLocalError(null);
        setAction("Your note was removed from the book.");
        setTimeout(() => {
          setAction(null);
        }, 2000);
      } else {
        // It was completed but there was an error at remove the note so show error for 3s
        setAction(null);
        setLocalError(deleteNote.data.error);
        setTimeout(() => {
          setLocalError(null);
        }, 3000);
      }
    } else if (deleteNote.isError) {
      // If petition was incomplete due an error, show it for 3 seconds
      const { error } = deleteNote;
      if (isAxiosError(error)) {
        setLocalError(error.response?.data.error);
      } else {
        // Show a generic error if axios can't cover it
        setLocalError("Something went wrong at emptying your Library");
      }
      setTimeout(() => {
        setLocalError(null);
      }, 3000);
    }
  }, [deleteNote.isSuccess]);

  // Auxiliar function to remove a note from the book based on the 1 of the book and note
  const handleDeleteNote = (number: string) => {
    removeNote({ id: idBook, number });
  };

  // Component that show the book, return Unauthorized Access if user isn't logged in
  return errorAuth.cause !== null ? (
    <UnauthorizedAccess errorAuth={errorAuth} />
  ) : (
    <CustomBackground
      bgImg="before:bg-[url('/bookBG.webp')] before:opacity-50"
      styles="w-full h-full flex flex-col md:items-center md:justify-center gap-2 md:flex-row overflow-y-auto"
    >
      {errorBook !== null && isAxiosError(errorBook) && (
        <ErrorMessage>Error: {errorBook.response?.data.error}</ErrorMessage>
      )}
      {localError !== null && <ErrorMessage>{localError}</ErrorMessage>}
      {action !== null && <ActionMessage>{action}</ActionMessage>}
      <nav className="right-6 top-2 -order-2 md:absolute">
        <Link to="/my-profile/library">
          <Button
            color="bg-lime-300 border-lime-500 hover:bg-sky-600 hover:border-sky-500"
            xSize="w-full"
          >
            Return to Library
          </Button>
        </Link>
      </nav>
      <BookAside
        data={data}
        idBook={idBook}
        addNote={addNote}
        createNote={createNote}
        updateBook={updateBook}
        updateDataBook={updateDataBook}
        isCreatePending={createNote.isPending}
        isUpdatePending={updateDataBook.isPending}
        isEmptyNotes={isEmptyNotes}
        setEmptyNotes={setEmptyNotes}
        setAction={setAction}
        setLocalError={setLocalError}
      />
      <main className="mt-2 flex flex-col gap-2 rounded-xl bg-slate-50/85 px-4 py-2 md:mt-0 md:h-full md:w-1/2 md:rounded-none md:bg-transparent">
        {data !== undefined ? (
          <BookData
            data={data}
            emptyNotes={emptyNotes}
            handleDeleteNote={handleDeleteNote}
            isDeletePending={deleteNote.isPending}
          />
        ) : (
          <LoaderText />
        )}
      </main>

      <FooterAttribution
        placeRef="freepik"
        urlRef="https://www.freepik.com/free-photo/top-view-books-with-copy-space_12151841.htm#fromView=search&page=1&position=7&uuid=0437f0c6-99a6-4acf-805c-fdfc26ddba3b"
        whatIs="Image by"
        size="md:w-1/6"
      />
    </CustomBackground>
  );
}
