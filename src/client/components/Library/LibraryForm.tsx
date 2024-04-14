import { useEffect, type ChangeEvent, type FormEvent, useState } from "react";
import Button from "../SystemDesign/Button";
import Form from "../SystemDesign/Form";
import Input from "../SystemDesign/Input";
import LabelForm from "../SystemDesign/LabelForm";
import SelectInput from "../SystemDesign/SelectInput";
import TitleForm from "../SystemDesign/TitleForm";
import TitleInput from "../SystemDesign/TitleInput";
import Dialog from "../SystemDesign/Dialog";
import type {
  BookStatus,
  CreateBookHook,
  CreateBookService,
  ResultCreateBook,
} from "../../types";
import type { UseMutationResult } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useNavigate } from "react-router-dom";

interface LibraryFormProps {
  idOpen: string;
  setAction: React.Dispatch<React.SetStateAction<string | null>>;
  setErrorLocal: React.Dispatch<React.SetStateAction<string | null>>;
  createNewBook: ({ status, title }: CreateBookHook) => void;
  createBook: UseMutationResult<
    | ResultCreateBook
    | {
        error: string;
      },
    Error,
    CreateBookService,
    unknown
  >;
}

export default function LibraryForm({
  createBook,
  createNewBook,
  idOpen,
  setAction,
  setErrorLocal,
}: LibraryFormProps) {
  // 3 states to handle the form in the dialog
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState<BookStatus>("Plan to Read");
  const [isBtnClosed, setIsBtnClosed] = useState(false);
  const navigate = useNavigate(); // Auxiliar to redirect the user to the new book
  // 2 auxiliars for IDs that Dialog needs
  const idClose = "closeLibraryDialog";
  const idDialog = "LibraryDialog";

  // Effect that activates each time user create a book
  useEffect(() => {
    // If the creation of a book was a complete, we check if it was an error or not
    if (createBook.isSuccess) {
      // If it was successful, put the form inputs to its default state
      if (!("error" in createBook.data)) {
        // Get the ID of the book to redirect user to it
        const bookID = createBook.data._id.toString();
        // Get dialog to close it
        const dialog = document.getElementById(idDialog) as HTMLDialogElement;
        dialog.close();
        setTitle(""); // Reset title
        setStatus("Plan to Read"); // And status
        setErrorLocal(null); // The error to null since it was a success
        setAction("New book added! Redirecting you to your new book...");
        // Show action for 2 seconds and redirect user to the new book
        setTimeout(() => {
          setAction(null);
        }, 2000);
        setTimeout(() => {
          navigate(`/my-profile/library/${bookID}`);
        }, 2000);
      }
    } else if (createBook.isError) {
      // If it wasn't a success, maybe was an error, if that is the case, show an error about it
      const { error } = createBook;
      if (isAxiosError(error)) {
        setErrorLocal(error.response?.data.error);
      } else {
        // Display a generic message if axios can't cover the error
        setErrorLocal("Something went wrong at creating your book");
      }
    }
  }, [createBook.isSuccess]);

  // 2 function to handle the user inputs
  const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleStatus = (e: ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value as BookStatus);
  };
  // function to handle the submit of the new book
  const handleBookSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default behavior
    // If the title isn't empty and it wasn't closed by the Cancel button
    if (title !== "" && !isBtnClosed) {
      createNewBook({ title, status }); // Create the book
    } else if (!isBtnClosed) {
      // If the title is empty, show an error for 3 seconds
      setErrorLocal("Please introduce a title if you want to add a book");
      setTimeout(() => {
        setErrorLocal(null);
      }, 3000);
    } else {
      // If the dialog was closed with the button, just reset the button
      setIsBtnClosed(false);
    }
  };

  // Return a Dialog with a Form element
  return (
    <Dialog
      idDialog={idDialog}
      idOpen={idOpen}
      idClose={idClose}
      colorBg="greenBlack"
    >
      <Form submitFn={handleBookSubmit}>
        <TitleForm firstColor="first-letter:text-lime-500">
          Add a new book!
        </TitleForm>
        <LabelForm>
          <TitleInput required>Title</TitleInput>
          <Input
            type="text"
            name="TitleBook"
            value={title}
            onChange={handleTitle}
            lineStyle
            required
            canBeTooLong
            size={25}
          />
        </LabelForm>
        <LabelForm>
          <TitleInput>Status</TitleInput>
          <SelectInput
            lineStyle
            name="StatusBook"
            value={status}
            onChange={handleStatus}
            extraStyles="dark:*:bg-slate-700 dark:*:text-white"
          >
            <option value="Plan to Read">Plan to Read</option>
            <option value="Current Reading">Current Reading</option>
            <option value="Completed">Completed</option>
            <option value="Dropped/Unfinish">Dropped/Unfinished</option>
          </SelectInput>
        </LabelForm>
        <div className="flex w-full gap-2">
          <Button
            color="bg-amber-300 border-amber-500 hover:bg-amber-500 hover:border-amber-200"
            disabled={createBook.isPending}
            id={idClose}
            xSize="w-40"
            onClick={() => {
              setIsBtnClosed(true);
            }}
          >
            Cancel
          </Button>
          <Button
            color="bg-blue-300 border-blue-500 hover:bg-blue-700 hover:border-blue-300"
            disabled={createBook.isPending}
            xSize="w-40"
          >
            Add My Book!
          </Button>
        </div>
      </Form>
    </Dialog>
  );
}
