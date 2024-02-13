import { useState, type ChangeEvent, type FormEvent, useEffect } from "react";
import type { NewExercise, NewExerciseHook, StatusEx } from "../../types";
import { isAxiosError } from "axios";
import type { AxiosResponse } from "axios";
import type { IExTracker } from "../../../server/types/basic";
import type { UseMutationResult } from "@tanstack/react-query";

interface CreateExFormProps {
  createExercise: UseMutationResult<
    | AxiosResponse<IExTracker, any>
    | {
        error: string;
      },
    Error,
    NewExercise,
    unknown
  >;
  changeLocalError: React.Dispatch<React.SetStateAction<string | null>>;
  changeAction: React.Dispatch<React.SetStateAction<string | null>>;
  isCreating: boolean;
  newExercise: ({ description, date, status }: NewExerciseHook) => void;
}

export default function CreateExForm({
  createExercise,
  changeAction,
  changeLocalError,
  isCreating,
  newExercise,
}: CreateExFormProps) {
  useEffect(() => {
    if (createExercise.isSuccess) {
      setDescription("");
      setStatus("Pending");
      setDate(new Date(Date.now()));
      changeLocalError(null);
      changeAction("Your new exercise was created!");
      setTimeout(() => {
        changeAction(null);
      }, 2000);
    } else if (createExercise.isError) {
      const { error } = createExercise;
      if (isAxiosError(error)) {
        changeLocalError(error.response?.data.error);
      } else {
        changeLocalError("Something went wrong at creating your exercise...");
      }
      setTimeout(() => {
        changeLocalError(null);
      }, 3000);
    }
  }, [createExercise.isSuccess]);

  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<StatusEx>("Pending");
  const [date, setDate] = useState(new Date(Date.now()));

  const handleNewExercise = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (description !== "") {
      newExercise({ description, date, status });
    } else {
      changeLocalError("Please fill the description of your exercise");
    }
  };
  const handleDescription = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };
  const handleStatus = (e: ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value as StatusEx);
  };
  const handleDate = (e: ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(e.target.value);
    setDate(newDate);
  };

  return (
    <form onSubmit={handleNewExercise}>
      <label>
        Description:{" "}
        <input
          type="text"
          name="description"
          id="description"
          value={description}
          onChange={handleDescription}
        />
      </label>
      <label>
        Status:{" "}
        <select
          name="status"
          id="status"
          onChange={handleStatus}
          value={status}
        >
          <option value="Pending">Pending</option>
          <option value="Current">Current</option>
          <option value="Completed">Completed</option>
        </select>
      </label>
      <label>
        Date: <input type="date" name="" id="" onChange={handleDate} />
      </label>
      <button disabled={isCreating}>Create Exercise</button>
    </form>
  );
}
