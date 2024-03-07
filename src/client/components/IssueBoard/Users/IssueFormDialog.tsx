import { type ChangeEvent, type FormEvent, useEffect, useState } from "react";
import Button from "../../SystemDesign/Button";
import Dialog from "../../SystemDesign/Dialog";
import Form from "../../SystemDesign/Form";
import Input from "../../SystemDesign/Input";
import LabelForm from "../../SystemDesign/LabelForm";
import TextArea from "../../SystemDesign/TextArea";
import TitleForm from "../../SystemDesign/TitleForm";
import TitleInput from "../../SystemDesign/TitleInput";
import type { UseMutationResult } from "@tanstack/react-query";
import type { IIssueTracker } from "../../../../server/types/advanced";
import type { CreateIssueHook, CreateIssueService } from "../../../types";
import { isAxiosError } from "axios";

interface IssueFormDialogProps {
  setAction: React.Dispatch<React.SetStateAction<string | null>>;
  setLocalError: React.Dispatch<React.SetStateAction<string | null>>;
  addUserIssue: ({ project, text, title }: CreateIssueHook) => void;
  getNewSearch: (value: React.SetStateAction<boolean>) => void;
  idOpen: string;
  addIssue: UseMutationResult<
    | IIssueTracker
    | {
        error: string;
      },
    Error,
    CreateIssueService,
    unknown
  >;
}

export default function IssueFormDialog({
  addIssue,
  addUserIssue,
  getNewSearch,
  idOpen,
  setAction,
  setLocalError,
}: IssueFormDialogProps) {
  // 3 states to handle the user info to create a new Issue
  const [project, setProject] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  // State to handle if dialog was closed by a button, if so, then don't send the form
  const [closeByBtn, setCloseByBtn] = useState(false);
  // Auxiliar state to open again the dialog when 1 issue was already created
  const [creating, setCreating] = useState(true);
  // 2 id auxiliar for the dialog, id for the cancel button and the dialog itself
  const idClose = "idCloseDialogCreateIssue";
  const idDialog = "idDialogCreatePublicIssue";
  // Effect that activates when an issue is created
  useEffect(() => {
    // If the issue created was completed and user isn't creating a new one then
    if (addIssue.isSuccess && !creating) {
      // Check if the request was a success, if it was then
      if (!("error" in addIssue.data)) {
        // Get the dialog and close it,
        const dialog = document.getElementById(idDialog) as HTMLDialogElement;
        dialog.close();
        getNewSearch(true); // Indicate the hook we need a new search
        // Reset the form
        setProject("");
        setTitle("");
        setText("");
        setLocalError(null); // Remove the local error if there is one
        // And show that the issue was created, for 3s
        setAction(
          "Your issue/suggestion was sent successfully! I'll try to read it, later!",
        );
        setTimeout(() => {
          setAction(null);
        }, 3000);
      } else {
        // If it was completed but it was an error, show the error for 3s
        setAction(null);
        setLocalError(addIssue.data.error);
        setTimeout(() => {
          setLocalError(null);
        }, 3000);
      }
    } else if (addIssue.isError) {
      // If request couldn't be done by an error, get the error
      const { error } = addIssue;
      if (isAxiosError(error)) {
        // And show it
        setLocalError(error.response?.data.error);
      } else {
        // If the error can't be covered by axios, show a generic message
        setLocalError(
          "Something went wrong at creating your issue/suggestion, please try again later.",
        );
      }
      // for 3s
      setTimeout(() => {
        setLocalError(null);
      }, 3000);
    }
  }, [addIssue.isSuccess]);

  // 3 auxiliar functions to handle the info of user into the form
  const handleProject = (e: ChangeEvent<HTMLInputElement>) => {
    setProject(e.target.value);
  };
  const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };
  // Auxliar function to handle the creation of a new issue
  const handleNewIssue = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // If any of the fields is missing and wasn't closed by a button
    if (project !== "" && title !== "" && text !== "" && !closeByBtn) {
      setCreating(false); // Indicate that we ended the creation of the issue
      addUserIssue({ project, text, title }); // And create the issue
    } else if (!closeByBtn) {
      // If it wasn't closed by the button but any field is missing, then show an error for 3s
      setLocalError("Please don't leave required fields empty.");
      setTimeout(() => {
        setLocalError(null);
      }, 3000);
    } else setCloseByBtn(false); // If it was closed by a button, indicate it
  };
  // Auxiliar function to handle the close of the dialog by a button (cancel button)
  const handleCloseByBtn = () => {
    setCloseByBtn(true);
  };
  // Return the dialog that contains the form to create public issues or suggestions
  return (
    <Dialog
      colorBg="skyBlack"
      idClose={idClose}
      idDialog={idDialog}
      idOpen={idOpen}
      extraStyles="bg-slate-700 text-slate-100"
    >
      <article className="relative flex h-full w-full flex-col gap-4">
        <TitleForm firstColor="first-letter:text-lime-500">
          Send me your sugerence or issue here!
        </TitleForm>
        <Form submitFn={handleNewIssue}>
          <LabelForm>
            <TitleInput
              firstColor="first-letter:text-lime-500 text-sm"
              required
            >
              Project
            </TitleInput>
            <Input
              name="PublicIssueProjectName"
              type="text"
              value={project}
              onChange={handleProject}
              lineStyle
              required
              newCycle={addIssue.isPending}
            />
          </LabelForm>
          <LabelForm>
            <TitleInput
              firstColor="first-letter:text-lime-500 text-sm"
              required
            >
              Title
            </TitleInput>
            <Input
              name="PublicIssueTitleName"
              type="text"
              value={title}
              onChange={handleTitle}
              lineStyle
              required
              newCycle={addIssue.isPending}
            />
          </LabelForm>
          <LabelForm style="justify-center items-center relative mt-6 lg:mt-4">
            <TitleInput
              firstColor="absolute -top-8 left-0 first-letter:text-lime-500 text-sm"
              required
            >
              Description{" "}
            </TitleInput>
            <TextArea
              cols={50}
              rows={10}
              min={1}
              max={1000}
              name="PublicIssueDescriptionName"
              value={text}
              onChange={handleText}
              lineStyle={false}
              required
              extraStyles="text-sm bg-slate-500 text-slate-100"
              newCycle={addIssue.isPending}
              placeHolder="Description of your issue or suggestion here!"
            />
          </LabelForm>
          <div className="mt-2 flex items-center justify-center gap-2">
            <Button
              color="bg-lime-300 border-lime-500 hover:bg-lime-600 hover:border-lime-300"
              xSize="w-32"
              extraStyles="text-black"
            >
              Send it!
            </Button>
            <Button
              color="bg-amber-300 border-amber-500 hover:bg-red-600 hover:border-red-700"
              id={idClose}
              onClick={handleCloseByBtn}
              xSize="w-32"
              extraStyles="text-black"
            >
              Cancel
            </Button>
          </div>
        </Form>
        <p className="text-pretty text-xs italic">
          <span className="text-blue-500">Note: </span>
          Issues sent only can be deleted by me. And only I can update its
          status. <br />
          Have in mind this when you send your issue or suggestion!
        </p>
      </article>
    </Dialog>
  );
}
