import { type ChangeEvent, type FormEvent } from "react";
import type {
  updateExerciseHook,
  StatusEx,
  ResultUpdate,
  updateExerciseService,
} from "../../types";
import type { AxiosResponse } from "axios";
import type { UseMutationResult } from "@tanstack/react-query";
import Form from "../SystemDesign/Form";
import LabelForm from "../SystemDesign/LabelForm";
import TitleInput from "../SystemDesign/TitleInput";
import Input from "../SystemDesign/Input";
import SelectInput from "../SystemDesign/SelectInput";
import Button from "../SystemDesign/Button";

interface UpdateExFormProps {
  updateUserExercise: UseMutationResult<
    | AxiosResponse<ResultUpdate, any>
    | {
        error: string;
      },
    Error,
    updateExerciseService,
    unknown
  >;
  isUpdate: {
    id: string;
    isUpdate: boolean;
  };
  setIsUpdate: React.Dispatch<
    React.SetStateAction<{
      id: string;
      isUpdate: boolean;
    }>
  >;
  changeLocalError: React.Dispatch<React.SetStateAction<string | null>>;
  changeAction: React.Dispatch<React.SetStateAction<string | null>>;
  isUpdating: boolean;
  description: string;
  changeDescription: React.Dispatch<React.SetStateAction<string>>;
  status: StatusEx;
  changeStatus: React.Dispatch<React.SetStateAction<StatusEx>>;
  updateExercise: ({ description, id, status }: updateExerciseHook) => void;
}

export default function UpdateExForm({
  description,
  changeDescription,
  status,
  changeStatus,
  isUpdate,
  setIsUpdate,
  changeLocalError,
  isUpdating,
  updateExercise,
}: UpdateExFormProps) {
  // Handler for form update
  const handleUpdateEx = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (description !== "")
      updateExercise({
        id: isUpdate.id,
        status,
        description,
      });
    else changeLocalError("Don't leave empty the Description field");
  };
  // Handlers for inputs fields for update
  const handleDescriptionUpdate = (e: ChangeEvent<HTMLInputElement>) => {
    changeDescription(e.target.value);
  };
  const handleStatusUpdate = (e: ChangeEvent<HTMLSelectElement>) => {
    changeStatus(e.target.value as StatusEx);
  };
  // Handler to cancel update
  const cancelUpdate = () => {
    setIsUpdate({ id: "", isUpdate: false });
  };
  // Component to display
  return (
    <div className="my-2 flex h-full w-full flex-col items-center justify-center gap-2 rounded-md bg-slate-50 py-2 shadow-inner shadow-black/20 ">
      <Form
        submitFn={handleUpdateEx}
        style="items-center justify-around lg:justify-around px-2 gap-4 lg:flex-row w-full h-full"
      >
        <LabelForm style="justify-start lg:justify-center">
          <TitleInput firstColor="first-letter:text-lime-500" required>
            Description
          </TitleInput>
          <Input
            type="text"
            value={description}
            onChange={handleDescriptionUpdate}
            lineStyle={true}
            name="Desc Update"
            required
            size={40}
          />
        </LabelForm>
        <LabelForm style="justify-start lg:justify-center">
          <TitleInput firstColor="first-letter:text-lime-500" required>
            Status
          </TitleInput>
          <SelectInput
            name="Select Update"
            value={status}
            onChange={handleStatusUpdate}
            lineStyle={true}
            required
          >
            <option value="Pending">Pending</option>
            <option value="Current">Current</option>
            <option value="Completed">Completed</option>
          </SelectInput>
        </LabelForm>
        <Button
          color="bg-lime-300 border-lime-500 hover:bg-lime-500 hover:border-lime-700 transition-all"
          disabled={isUpdating}
          xSize="w-1/3 lg:w-2/5"
        >
          Make update
        </Button>
      </Form>
      <Button
        onClick={cancelUpdate}
        color="bg-amber-200 border-amber-500 hover:bg-amber-500 hover:border-amber-600 transition-all"
        xSize="w-1/3 lg:w-1/5"
      >
        Cancel
      </Button>
    </div>
  );
}
