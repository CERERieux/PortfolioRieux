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
    ResultCreateBook,
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
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState<BookStatus>("Plan to Read");
  const [isBtnClosed, setIsBtnClosed] = useState(false);
  const navigate = useNavigate();
  const idClose = "closeLibraryDialog";
  const idDialog = "LibraryDialog";

  useEffect(() => {
    // If the creation of a book was a success, put the form inputs to its default state
    if (createBook.isSuccess) {
      const bookID = createBook.data._id.toString();
      const dialog = document.getElementById(idDialog) as HTMLDialogElement;
      dialog.close();
      setTitle("");
      setStatus("Plan to Read");
      setErrorLocal(null);
      setAction("New book added! Redirecting you to your new book added..."); // Later change this to redirect to new book
      setTimeout(() => {
        setAction(null);
      }, 2000);
      setTimeout(() => {
        navigate(`/my-profile/library/${bookID}`);
      }, 2000);
    } else if (createBook.isError) {
      // If it wasn't a success, maybe was an error, if that is the case
      // Show an error about it
      const { error } = createBook;
      if (isAxiosError(error)) {
        setErrorLocal(error.response?.data.error);
      } else {
        setErrorLocal("Something went wrong at creating your book");
      }
    }
  }, [createBook.isSuccess]);
  const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleStatus = (e: ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value as BookStatus);
  };
  const handleBookSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title !== "") {
      createNewBook({ title, status });
    } else if (!isBtnClosed) {
      setErrorLocal("Please introduce a title if you want to add a book");
      setTimeout(() => {
        setErrorLocal(null);
      }, 3000);
    } else {
      setIsBtnClosed(false);
    }
  };

  return (
    <Dialog
      idDialog={idDialog}
      idOpen={idOpen}
      idClose={idClose}
      colorBg="greenWhite"
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
          >
            <option value="Plan to Read">Plan to Read</option>
            <option value="Current Reading">Current Reading</option>
            <option value="Completed">Completed</option>
            <option value="Dropped/Unfinish">Dropped/Unfinish</option>
          </SelectInput>
        </LabelForm>
        <div className="flex w-full gap-2">
          <Button
            color="bg-amber-300 border-amber-500 hover:bg-amber-500 hover:border-amber-300"
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
