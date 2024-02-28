import { type ChangeEvent, useState, type FormEvent, useEffect } from "react";
import { isAxiosError } from "axios";
import type { UseMutationResult } from "@tanstack/react-query";
import type {
  BookStatus,
  CreateNoteHook,
  CreateNoteService,
  ResultCreateNote,
  ResultUpdateBook,
  SingleBook,
  UpdateBookHook,
  UpdateBookService,
} from "../../types";
import Form from "../SystemDesign/Form";
import TitleForm from "../SystemDesign/TitleForm";
import LabelForm from "../SystemDesign/LabelForm";
import TitleInput from "../SystemDesign/TitleInput";
import Input from "../SystemDesign/Input";
import TextArea from "../SystemDesign/TextArea";
import SelectInput from "../SystemDesign/SelectInput";
import Button from "../SystemDesign/Button";

interface BookAsideProps {
  data: SingleBook | undefined;
  isCreatePending: boolean;
  isUpdatePending: boolean;
  idBook: string;
  addNote: ({ note, id }: CreateNoteHook) => void;
  updateBook: ({
    id,
    recommend,
    status,
    review,
    title,
  }: UpdateBookHook) => void;
  isEmptyNotes: (data: SingleBook) => boolean;
  setEmptyNotes: React.Dispatch<React.SetStateAction<boolean>>;
  setAction: React.Dispatch<React.SetStateAction<string | null>>;
  setLocalError: React.Dispatch<React.SetStateAction<string | null>>;
  updateDataBook: UseMutationResult<
    | ResultUpdateBook
    | {
        error: string;
      },
    Error,
    UpdateBookService,
    unknown
  >;
  createNote: UseMutationResult<
    | ResultCreateNote
    | {
        error: string;
      },
    Error,
    CreateNoteService,
    unknown
  >;
}

export default function BookAside({
  data,
  isCreatePending,
  isUpdatePending,
  isEmptyNotes,
  idBook,
  addNote,
  updateBook,
  setEmptyNotes,
  setAction,
  setLocalError,
  createNote,
  updateDataBook,
}: BookAsideProps) {
  // 4 states for the form that updates the book
  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");
  const [status, setStatus] = useState<BookStatus>("Plan to Read");
  const [recommend, setRecommend] = useState<boolean | undefined>(undefined);
  const [note, setNote] = useState(""); // state to add notes to book
  // Effect that activates each time data changes
  useEffect(() => {
    // When data isn't undefined, put the default state to the form with data
    if (data !== undefined) {
      setTitle(data.title);
      setReview(data.review);
      setStatus(data.status as BookStatus);
      setRecommend(data.recommend);
      setEmptyNotes(isEmptyNotes(data));
    }
  }, [data]);

  // Effect that activates when user updates a book
  useEffect(() => {
    // If the update was com plete, we need to see if there was an error
    if (updateDataBook.isSuccess) {
      // If it was a success, then
      if (!("error" in updateDataBook.data)) {
        // Display the action for 2 seconds
        setLocalError(null);
        setAction("The book was updated successfully");
        setTimeout(() => {
          setAction(null);
        }, 2000);
      } else {
        // If an error happened, show error for 3 seconds
        setAction(null);
        setLocalError(updateDataBook.data.error);
        setTimeout(() => {
          setLocalError(null);
        }, 3000);
      }
    } else if (updateDataBook.isError) {
      // If updated couldn't complete due an error
      const { error } = updateDataBook; // Get the error and show it for 3 seconds
      if (isAxiosError(error)) {
        setLocalError(error.response?.data.error);
      } else {
        // Show generic message if axios can't cover the error
        setLocalError("Something went wrong at emptying your Library");
      }
      setTimeout(() => {
        setLocalError(null);
      }, 3000);
    }
  }, [updateDataBook.isSuccess]);

  // Similar as the past effect, this activates when user creates a note
  useEffect(() => {
    // If adding a note was completed, check if it was a success or not
    if (createNote.isSuccess) {
      if (!("error" in createNote.data)) {
        // If was good, check if book has empty notes to display info on that
        if (data !== undefined) {
          setEmptyNotes(isEmptyNotes(data));
        }
        setNote(""); // Reset the input field,
        setLocalError(null); // the error and show action for 2 seconds
        setAction("Your note was added to the book!");
        setTimeout(() => {
          setAction(null);
        }, 2000);
      } else {
        // If an error happened, show it for 3 seconds
        setAction(null);
        setLocalError(createNote.data.error);
        setTimeout(() => {
          setLocalError(null);
        }, 3000);
      }
    } else if (createNote.isError) {
      // If adding couldn't be done due an error, show it for 3 seconds
      const { error } = createNote;
      if (isAxiosError(error)) {
        setLocalError(error.response?.data.error);
      } else {
        // Show generic message if axios can't cover the error
        setLocalError("Something went wrong at emptying your Library");
      }
      setTimeout(() => {
        setLocalError(null);
      }, 3000);
    }
  }, [createNote.isSuccess]);

  // 4 auxiliar functions to handle user input in the update form
  const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleStatus = (e: ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value as BookStatus);
  };
  const handleRecommend = (e: ChangeEvent<HTMLSelectElement>) => {
    let recom: boolean | undefined;
    if (e.target.value === "Yes") recom = true;
    if (e.target.value === "No") recom = false;
    setRecommend(recom);
  };
  const handleReview = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setReview(e.target.value);
  };
  // Auxiliar function that handle the update of the book
  const handleUpdate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let recommendString = "I can't say";
    if (recommend === true) recommendString = "Yes";
    else if (recommend === false) recommendString = "No";
    if (title !== "") {
      updateBook({
        id: idBook,
        title,
        review,
        status,
        recommend: recommendString,
      });
    } else {
      // Show error if user left title empty
      setLocalError("Please don't leave the title field empty");
      setTimeout(() => {
        setLocalError(null);
      }, 3000);
    }
  };

  // Auxiliar function to handle user input to add a note
  const handleNote = (e: ChangeEvent<HTMLInputElement>) => {
    setNote(e.target.value);
  };
  // Auxiliar function to handle the addition of a note
  const handleNoteSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (note !== "") addNote({ id: idBook, note });
    else {
      // If note was empty, show an error for 3 seconds
      setLocalError("Please don't leave the note empty if you want to add it.");
      setTimeout(() => {
        setLocalError(null);
      }, 3000);
    }
  };

  // Component that show both forms on the left/top side of the screen
  return (
    <aside className="flex flex-col items-center justify-center gap-4 md:sticky md:top-0 md:h-full md:w-1/2">
      <section className="flex w-full flex-col gap-4 rounded-xl bg-slate-50/85 px-4 py-2 shadow-md shadow-black/30 sm:w-4/5 md:h-3/4 md:w-full md:items-center md:justify-center lg:w-4/5">
        <TitleForm firstColor="first-letter:text-lime-500">
          Update your book!
        </TitleForm>
        <Form submitFn={handleUpdate} mdMedia="">
          <LabelForm style="">
            <TitleInput firstColor="first-letter:text-red-500 italic" required>
              Title{" "}
            </TitleInput>
            <Input
              type="text"
              lineStyle
              name="InputUpdateBook"
              value={title}
              onChange={handleTitle}
              required
            />
          </LabelForm>
          <LabelForm style="">
            <TitleInput firstColor="first-letter:text-red-500 italic">
              Status:{" "}
            </TitleInput>
            <SelectInput
              name="StatusUpdateBook"
              lineStyle
              value={status}
              onChange={handleStatus}
            >
              <option value="Plan to Read">Plan to Read</option>
              <option value="Current Reading">Current Reading</option>
              <option value="Completed">Completed</option>
              <option value="Dropped/Unfinish">Dropped/Unfinish</option>
            </SelectInput>
          </LabelForm>
          <LabelForm style="[&_span]:w-2/5">
            <TitleInput firstColor="first-letter:text-red-500 italic text-sm">
              Do you recommend it?{" "}
            </TitleInput>
            <SelectInput
              value={
                recommend === undefined
                  ? "I can't say"
                  : recommend
                  ? "Yes"
                  : "No"
              }
              onChange={handleRecommend}
              lineStyle
              name="RecommendUpdateBook"
            >
              <option value="I can't say">I can&apos;t say</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </SelectInput>
          </LabelForm>
          <LabelForm style="justify-center items-center relative mt-6 lg:mt-4">
            <TitleInput firstColor="absolute -top-8 -left-0 first-letter:text-red-500 italic text-sm">
              Review{" "}
            </TitleInput>
            <TextArea
              name="TextAreaUpdateBook"
              value={review}
              onChange={handleReview}
              rows={5}
              cols={45}
              min={0}
              max={2000}
              lineStyle={false}
              placeHolder="Review for this book is empty."
              extraStyles="text-sm whitespace-pre-wrap"
            />
          </LabelForm>
          <Button
            color="bg-lime-300 border-lime-500 hover:bg-lime-600 hover:border-lime-300 transition-all"
            xSize="w-32"
            disabled={isUpdatePending}
          >
            Update!
          </Button>
        </Form>
      </section>
      <section className="flex w-2/3 flex-col items-center justify-center rounded-xl bg-slate-50/80 px-4 py-2 shadow-md shadow-black/30 sm:w-1/2 md:h-1/5 md:w-3/4 lg:w-3/5">
        <TitleForm firstColor="first-letter:text-sky-500">
          Add a note to your book
        </TitleForm>
        <Form submitFn={handleNoteSubmit}>
          <LabelForm style="md:justify-center items-center">
            <TitleInput firstColor="first-letter:text-sky-500 italic text-sm">
              Note:{" "}
            </TitleInput>
            <Input
              type="text"
              name="AddNoteInput"
              value={note}
              onChange={handleNote}
              lineStyle
              extraStyles="text-sm pb-1"
              size={25}
              canBeTooLong
            />
          </LabelForm>
          <Button
            color="bg-sky-300 border-sky-500 hover:bg-sky-600 hover:border-sky-300 transition-all"
            xSize="w-32"
            disabled={isCreatePending}
          >
            Add Note!
          </Button>
        </Form>
      </section>
    </aside>
  );
}
