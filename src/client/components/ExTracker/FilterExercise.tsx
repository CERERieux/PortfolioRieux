import { type ChangeEvent, useState } from "react";
import type { ExerciseDataOptions } from "../../types";
import DateInput from "../SystemDesign/DateInput";
import Form from "../SystemDesign/Form";
import LabelForm from "../SystemDesign/LabelForm";
import NumericInput from "../SystemDesign/NumericInput";
import TitleInput from "../SystemDesign/TitleInput";

interface FilterExerciseProps {
  getNewList: React.Dispatch<React.SetStateAction<boolean>>;
  searchOptions: React.Dispatch<React.SetStateAction<ExerciseDataOptions>>;
}

export default function FilterExercise({
  getNewList,
  searchOptions,
}: FilterExerciseProps) {
  const [limit, setLimit] = useState("");
  const [toDate, setToDate] = useState("");
  const [fromDate, setFromDate] = useState("");

  const handleLimit = (e: ChangeEvent<HTMLInputElement>) => {
    setLimit(e.target.value);
  };
  const handleToDate = (e: ChangeEvent<HTMLInputElement>) => {
    setToDate(e.target.value);
  };
  const handleFromDate = (e: ChangeEvent<HTMLInputElement>) => {
    setFromDate(e.target.value);
  };
  return (
    <Form style="items-center justify-around lg:justify-around px-2 gap-4 lg:flex-row w-full h-full">
      <LabelForm>
        <TitleInput>Before </TitleInput>
        <DateInput
          name="from"
          lineStyle
          onChange={handleFromDate}
          value={fromDate}
        />
      </LabelForm>
      <LabelForm>
        <TitleInput>After </TitleInput>
        <DateInput name="to" lineStyle onChange={handleToDate} value={toDate} />
      </LabelForm>
      <LabelForm>
        <TitleInput>Limit </TitleInput>
        <NumericInput
          min={0}
          lineStyle={true}
          name="limit"
          onChange={handleLimit}
          value={limit}
        />
      </LabelForm>
      <button>Send </button>
    </Form>
  );
}
