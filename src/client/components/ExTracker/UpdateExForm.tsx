import { type ChangeEvent, type FormEvent } from "react";
import type {
  updateExerciseHook,
  StatusEx,
  ResultUpdate,
  updateExerciseService,
} from "../../types";
import type { AxiosResponse } from "axios";
import type { UseMutationResult } from "@tanstack/react-query";

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
  const handleDescriptionUpdate = (e: ChangeEvent<HTMLInputElement>) => {
    changeDescription(e.target.value);
  };
  const handleStatusUpdate = (e: ChangeEvent<HTMLSelectElement>) => {
    changeStatus(e.target.value as StatusEx);
  };
  return (
    <>
      <form onSubmit={handleUpdateEx}>
        <label>
          Description:{" "}
          <input
            type="text"
            value={description}
            onChange={handleDescriptionUpdate}
          />
        </label>
        <label>
          Status:{" "}
          <select name="" id="" value={status} onChange={handleStatusUpdate}>
            <option value="Pending">Pending</option>
            <option value="Current">Current</option>
            <option value="Completed">Completed</option>
          </select>
        </label>
        <button disabled={isUpdating}>Make update</button>
      </form>
      <button
        onClick={() => {
          setIsUpdate({ id: "", isUpdate: false });
        }}
      >
        Cancel
      </button>
    </>
  );
}
