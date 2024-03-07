import { isAxiosError } from "axios";
import { type ChangeEvent, type FormEvent, useEffect, useState } from "react";
import type {
  IIssueTracker,
  ReqBodyIssue,
} from "../../../../server/types/advanced";
import type { UseMutationResult } from "@tanstack/react-query";
import type { ResponseAction, UpdateIssueService } from "../../../types";
import LabelForm from "../../SystemDesign/LabelForm";
import Form from "../../SystemDesign/Form";
import TitleInput from "../../SystemDesign/TitleInput";
import Input from "../../SystemDesign/Input";
import TextArea from "../../SystemDesign/TextArea";
import Button from "../../SystemDesign/Button";
import TitleForm from "../../SystemDesign/TitleForm";

interface UpdateIssueProfileProps {
  issue: IIssueTracker;
  isUpdate: {
    isUpdate: boolean;
    id: string;
  };
  setAction: React.Dispatch<React.SetStateAction<string | null>>;
  setLocalError: React.Dispatch<React.SetStateAction<string | null>>;
  setIsUpdate: React.Dispatch<
    React.SetStateAction<{
      isUpdate: boolean;
      id: string;
    }>
  >;
  updateIssue: UseMutationResult<
    | ResponseAction
    | {
        error: string;
      },
    Error,
    UpdateIssueService,
    unknown
  >;
  updateOneIssue: ({ _id, project, text, title }: ReqBodyIssue) => void;
}

export default function UpdateIssueProfile({
  issue,
  isUpdate,
  setAction,
  setIsUpdate,
  setLocalError,
  updateIssue,
  updateOneIssue,
}: UpdateIssueProfileProps) {
  // 3 states to handle user info to update the issue
  const [project, setProject] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  // State to avoid the quick close of the editing component in case user already did an update before
  const [editing, setEditing] = useState(true);

  // Effect that activates when the state that manages the view of the editor changes
  useEffect(() => {
    // If is editing, set the state of the form with the data of the issue
    if (isUpdate.isUpdate) {
      setProject(issue.project);
      setTitle(issue.title);
      setText(issue.text);
    }
  }, [isUpdate.isUpdate]);

  // Effect that activates each time user updates an issue
  useEffect(() => {
    // If the issue was completed and isn't editing the issue then
    if (updateIssue.isSuccess && !editing) {
      // check if the update was a success or an error
      if (!("error" in updateIssue.data)) {
        // In case of success, reset the state of the form
        setProject("");
        setTitle("");
        setText("");
        setLocalError(null); // Remove the local error in case there is 1
        setIsUpdate({ isUpdate: false, id: "" }); // Put the view to the normal one
        setAction("Your issue was successfully updated"); // Indicate the action for 2s
        setTimeout(() => {
          setAction(null);
        }, 2000);
      } else {
        // If an error happened, indicate it for 3s
        setAction(null);
        setLocalError(updateIssue.data.error);
        setTimeout(() => {
          setLocalError(null);
        }, 3000);
      }
    } else if (updateIssue.isError) {
      // If update couldn't be completed by an error, get the error
      const { error } = updateIssue;
      if (isAxiosError(error)) {
        setLocalError(error.response?.data.error); // And show it
      } else {
        // Show a generic message if axios can't cover it
        setLocalError("Something went wrong at updating your issue");
      }
      // for 3s
      setTimeout(() => {
        setLocalError(null);
      }, 3000);
    }
  }, [updateIssue.isSuccess]);

  // 3 auxiliar function to handle user info about the update
  const handleProject = (e: ChangeEvent<HTMLInputElement>) => {
    setProject(e.target.value);
  };
  const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };
  // Auxiliar function to handle the update of the issue
  const handleUpdateIssue = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Only update this when issue have its fields filled
    if (project !== "" && title !== "" && text !== "") {
      setEditing(false); // Indicate that editing is done and update
      updateOneIssue({ _id: isUpdate.id, title, project, text });
    } else {
      // If a field is missing, show an error for 3s
      setLocalError("Please don't leave any field empty");
      setTimeout(() => {
        setLocalError(null);
      }, 3000);
    }
  };
  // Auxliar to handle the canceling of an issue
  const handleCancel = () => {
    setIsUpdate({ isUpdate: false, id: "" });
  };

  // Component that display the form to update the issue
  return (
    <section className="mx-auto flex flex-col gap-4 md:w-3/5 lg:w-1/2">
      <TitleForm firstColor="first-letter:text-blue-500">
        Enter your update in the fields
      </TitleForm>
      <Form submitFn={handleUpdateIssue} mdMedia="">
        <LabelForm>
          <TitleInput required firstColor="first-letter:text-blue-500">
            Project{" "}
          </TitleInput>
          <Input
            type="text"
            name="UpdateProjectIssueProfile"
            value={project}
            onChange={handleProject}
            lineStyle
            required
          />
        </LabelForm>
        <LabelForm>
          <TitleInput required firstColor="first-letter:text-blue-500">
            Title{" "}
          </TitleInput>
          <Input
            type="text"
            name="UpdateTitleIssueProfile"
            value={title}
            onChange={handleTitle}
            lineStyle
            required
          />
        </LabelForm>
        <LabelForm style="justify-center items-center relative mt-6 lg:mt-4">
          <TitleInput
            firstColor="absolute -top-8 left-4 sm:left-16 md:-left-0 first-letter:text-blue-500 text-sm"
            required
          >
            Description{" "}
          </TitleInput>
          <TextArea
            name="TextAreaUpdateBook"
            value={text}
            onChange={handleText}
            rows={5}
            cols={50}
            min={0}
            max={1000}
            lineStyle={false}
            placeHolder="Description of the issue."
            extraStyles="text-sm whitespace-pre-wrap"
            required
          />
        </LabelForm>
        <div className="flex w-full items-center justify-center gap-4">
          <Button
            color="bg-blue-300 border-blue-500 hover:bg-blue-600 hover:border-blue-300"
            xSize="w-40"
          >
            Update
          </Button>
          <Button
            color="bg-amber-300 border-amber-500 hover:bg-amber-600 hover:border-amber-100"
            xSize="w-40"
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </div>
      </Form>
    </section>
  );
}
