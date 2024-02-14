import {
  useState,
  type ChangeEvent,
  type FormEvent,
  useEffect,
  useRef,
} from "react";
import type { NewExercise, NewExerciseHook, StatusEx } from "../../types";
import { isAxiosError } from "axios";
import type { AxiosResponse } from "axios";
import type { IExTracker } from "../../../server/types/basic";
import type { UseMutationResult } from "@tanstack/react-query";
import Form from "../SystemDesign/Form";
import LabelForm from "../SystemDesign/LabelForm";
import { TextInput } from "../SystemDesign/Input";
import TitleInput from "../SystemDesign/TitleInput";
import Button from "../SystemDesign/Button";
import DateInput from "../SystemDesign/DateInput";

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
      newCycle.current = true;
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
  const valueDate = date.toJSON().slice(0, 10);
  const newCycle = useRef(true);

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
    const year = newDate.getFullYear();
    if (year < 10000) setDate(newDate);
  };

  return (
    <Form
      submitFn={handleNewExercise}
      style="items-center gap-6 justify-start"
      mdMedia="[&_span]:md:w-1/4"
    >
      <LabelForm style="justify-start items-center">
        <TitleInput
          firstColor="text-sm first-letter:text-sky-400"
          required={true}
        >
          Description
        </TitleInput>
        <TextInput
          type="text"
          name="description"
          value={description}
          onChange={handleDescription}
          lineStyle={true}
          autoComplete="off"
          required={true}
          newCycle={isCreating}
        />
      </LabelForm>
      <LabelForm style="justify-start items-center">
        <TitleInput
          firstColor="text-sm first-letter:text-sky-400"
          required={true}
        >
          Status
        </TitleInput>
        <select
          name="status"
          onChange={handleStatus}
          value={status}
          className=""
        >
          <option value="Pending">Pending</option>
          <option value="Current">Current</option>
          <option value="Completed">Completed</option>
        </select>
      </LabelForm>
      <LabelForm style="justify-start items-center">
        <TitleInput firstColor="text-sm first-letter:text-sky-400">
          Date
        </TitleInput>
        <DateInput
          name="date"
          onChange={handleDate}
          value={valueDate}
          lineStyle={true}
          max={"2099-12-31"}
          min={"1990-01-01"}
        />
      </LabelForm>
      <Button
        disabled={isCreating}
        color="bg-sky-300 hover:bg-sky-700"
        xSize="w-36"
      >
        Create Exercise
      </Button>
    </Form>
  );
}
