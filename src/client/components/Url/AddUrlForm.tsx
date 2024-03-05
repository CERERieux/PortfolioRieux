import { isAxiosError } from "axios";
import { type ChangeEvent, type FormEvent, useEffect, useState } from "react";
import type { UseMutationResult } from "@tanstack/react-query";
import type { CreateShortUrl, ShortUrlResult } from "../../types";
import Dialog from "../SystemDesign/Dialog";
import Form from "../SystemDesign/Form";
import LabelForm from "../SystemDesign/LabelForm";
import TitleForm from "../SystemDesign/TitleForm";
import Button from "../SystemDesign/Button";
import TitleInput from "../SystemDesign/TitleInput";
import Input from "../SystemDesign/Input";

interface AddUrlFormProps {
  addUrl: UseMutationResult<
    | ShortUrlResult
    | {
        error: string;
      },
    Error,
    CreateShortUrl,
    unknown
  >;
  idOpen: string;
  newLink: (url: string) => void;
  setAction: React.Dispatch<React.SetStateAction<string | null>>;
  setLocalError: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function AddUrlForm({
  addUrl,
  idOpen,
  newLink,
  setAction,
  setLocalError,
}: AddUrlFormProps) {
  // 2 states to handle the dialog and form that add a link to the table
  const [url, setUrl] = useState("");
  const [isBtnClosed, setIsBtnClosed] = useState(false);
  // 2 auxiliars for id of the close button and the dialog
  const idCloseCreate = "CloseCreateLinkDialog";
  const idDialogCreateLink = "CreateLinkUserDialog";

  // Effect that activates when user add a link to table
  useEffect(() => {
    // If adding was completed, do next
    if (addUrl.isSuccess) {
      // Get the dialog by its ID
      const dialogCreate = document.getElementById(
        idDialogCreateLink,
      ) as HTMLDialogElement;
      dialogCreate.close(); // And close it
      // Check if adding was a success
      if (!("error" in addUrl.data)) {
        // If it was, reset the form and show the action for 2 seconds
        setUrl("");
        setLocalError(null);
        setAction("Your new short URL was created successfully!");
        setTimeout(() => {
          setAction(null);
        }, 2000);
      } else {
        // If it was an error, show the error for 3 seconds
        setAction(null);
        setLocalError(addUrl.data.error);
        setTimeout(() => {
          setLocalError(null);
        }, 3000);
      }
    } else if (addUrl.isError) {
      // If adding couldn't be completed by an error, show it
      const { error } = addUrl;
      if (isAxiosError(error)) {
        setLocalError(error.response?.data.error);
      } else {
        // If axios can't cover the error, give a generic message
        setLocalError("Something went wrong at creating your new short URL...");
        setTimeout(() => {
          setLocalError(null);
        }, 3000);
      }
      // For 3 seconds
      setTimeout(() => {
        setLocalError(null);
      }, 3000);
    }
  }, [addUrl.isSuccess]);

  // Auxiliar function to signal that dialog was closed by a button
  const handleCloseByBtn = () => {
    setIsBtnClosed(true);
  };
  // Auxliar function to handle user input
  const handleUrlText = (e: ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };
  // Function that handles the adding of the link to table
  const handleNewUrl = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Only do it if url field isn't empty and the dialog wasn't closed by the button
    if (url !== "" && !isBtnClosed) newLink(url);
    else if (!isBtnClosed) {
      // Show an error if url is empty
      setLocalError("Please fill the Link field");
      setTimeout(() => {
        setLocalError(null);
      }, 2000);
    } else {
      // Put the signal in false if dialog was close by a button
      setIsBtnClosed(false);
    }
  };

  // Component show the dialog that contains the form that add a link to the user table
  return (
    <Dialog
      colorBg="amberBlack"
      idClose={idCloseCreate}
      idDialog={idDialogCreateLink}
      idOpen={idOpen}
    >
      <Form submitFn={handleNewUrl} mdMedia="">
        <TitleForm firstColor="first-letter:text-amber-500 first-letter:text-2xl">
          Add a new link to the table.
        </TitleForm>
        <LabelForm>
          <TitleInput firstColor="first-letter:text-amber-500 first-letter:text-xl">
            Your link:{" "}
          </TitleInput>
          <Input
            name="ProfileCreateUserLinkInput"
            type="text"
            onChange={handleUrlText}
            value={url}
            lineStyle
            size={30}
            canBeTooLong
          />
        </LabelForm>
        <div className="flex gap-2">
          <Button
            color="bg-amber-300 border-amber-500 hover:bg-red-500 hover:border-red-200 transition-all"
            xSize="w-32"
            onClick={handleCloseByBtn}
            id={idCloseCreate}
          >
            Cancel
          </Button>
          <Button
            color="bg-blue-300 border-blue-500 hover:bg-lime-700 hover:border-lime-300 transition-all"
            xSize="w-32"
          >
            Create!
          </Button>
        </div>
      </Form>
    </Dialog>
  );
}
