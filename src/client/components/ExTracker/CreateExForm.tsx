import {
  useState,
  type ChangeEvent,
  type FormEvent,
  useEffect,
  useRef,
} from "react";
import { isAxiosError } from "axios";
import type { NewExercise, NewExerciseHook, StatusEx } from "../../types";
import type { AxiosResponse } from "axios";
import type { IExTracker } from "../../../server/types/basic";
import type { UseMutationResult } from "@tanstack/react-query";
import Form from "../SystemDesign/Form";
import LabelForm from "../SystemDesign/LabelForm";
import Input from "../SystemDesign/Input";
import TitleInput from "../SystemDesign/TitleInput";
import Button from "../SystemDesign/Button";
import DateInput from "../SystemDesign/DateInput";
import SelectInput from "../SystemDesign/SelectInput";
import convertTodayDate from "../../utils/convertTodayDate";

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
  // 3 states to manage the input from user
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<StatusEx>("Pending");
  const [date, setDate] = useState(
    convertTodayDate(new Date(Date.now()).toDateString()),
  );
  const newCycle = useRef(true); // Flag to help the inputs to detect the start of a new execise data

  // Effect that activates each time we create a new exercise
  useEffect(() => {
    // If was successful
    if (createExercise.isSuccess) {
      newCycle.current = true; // Indicate we start a new exercise
      setDescription(""); // Reset the description
      setStatus("Pending"); // The status
      setDate(convertTodayDate(new Date(Date.now()).toDateString())); // And date from the form
      // We check if data is a good response or an error, if isn't an error
      if (!("error" in createExercise.data)) {
        changeLocalError(null); // The error is null since its successful
        changeAction("Your new exercise was created!"); // Let user know that it was good
        // And remove it after 2 seconds
        setTimeout(() => {
          changeAction(null);
        }, 2000);
      } else {
        changeLocalError(createExercise.data.error); // Else, it's an error and display it
        changeAction(null); // And keep the action empty
        // And remove it after 3 seconds
        setTimeout(() => {
          changeLocalError(null);
        }, 3000);
      }
    } else if (createExercise.isError) {
      // If it was an error, get the error
      const { error } = createExercise;
      // If it's an error from axios give the error
      if (isAxiosError(error)) {
        changeLocalError(error.response?.data.error);
      } else {
        // If for some reason isn't axios error, give a generic message
        changeLocalError("Something went wrong at creating your exercise...");
      }
      // Remove the error after 3 seconds
      setTimeout(() => {
        changeLocalError(null);
      }, 3000);
    }
  }, [createExercise.isSuccess]);

  // Function that handle the form, create a new exercise
  const handleNewExercise = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newDate = new Date(date);
    if (description !== "") {
      newExercise({ description, date: newDate, status });
    } else {
      changeLocalError("Please fill the description of your exercise");
      setTimeout(() => {
        changeLocalError(null);
      }, 3000);
    }
  };
  // Handlers for the inputs
  const handleDescription = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };
  const handleStatus = (e: ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value as StatusEx);
  };
  const handleDate = (e: ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  // The form that we return
  return (
    <Form
      submitFn={handleNewExercise}
      style="items-center gap-6 justify-start bg-slate-50 pb-6 h-full md:h-[80%] pl-24 md:pl-5 pt-6 rounded-md shadow-lg shadow-black/10"
      mdMedia="[&_span]:md:w-1/4"
    >
      <LabelForm style="justify-start items-center">
        <TitleInput
          firstColor="text-sm first-letter:text-sky-400"
          required={true}
        >
          Description
        </TitleInput>
        <Input
          type="text"
          name="description"
          value={description}
          onChange={handleDescription}
          lineStyle={true}
          autoComplete="off"
          required={true}
          newCycle={isCreating}
          canBeTooLong
          size={18}
        />
      </LabelForm>
      <LabelForm style="justify-start items-center">
        <TitleInput
          firstColor="text-sm first-letter:text-sky-400"
          required={true}
        >
          Status
        </TitleInput>
        <SelectInput
          name="status"
          onChange={handleStatus}
          value={status}
          lineStyle={true}
        >
          <option value="Pending">Pending</option>
          <option value="Current">Current</option>
          <option value="Completed">Completed</option>
        </SelectInput>
      </LabelForm>
      <LabelForm style="justify-start items-center">
        <TitleInput firstColor="text-sm first-letter:text-sky-400" required>
          End Date
        </TitleInput>
        <DateInput
          name="date"
          onChange={handleDate}
          value={date}
          lineStyle={true}
          max={"2099-12-31"}
          min={"1990-01-01"}
          newCycle={isCreating}
          required={true}
        />
      </LabelForm>
      <Button
        disabled={isCreating}
        color="bg-sky-200 hover:bg-sky-700 border-sky-500 hover:border-sky-900 text-sky-700 shadow-sm shadow-black/10 active:scale-90 active:shadow-none transition-all -ml-16 md:ml-0"
        xSize="w-36"
      >
        Create Exercise
      </Button>
    </Form>
  );
}
