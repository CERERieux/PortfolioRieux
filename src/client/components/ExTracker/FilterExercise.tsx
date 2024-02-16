import { type ChangeEvent, useState, useEffect, useCallback } from "react";
import type { ExerciseDataOptions, StatusEx } from "../../types";
import DateInput from "../SystemDesign/DateInput";
import LabelForm from "../SystemDesign/LabelForm";
import NumericInput from "../SystemDesign/NumericInput";
import TitleInput from "../SystemDesign/TitleInput";
import type { SetURLSearchParams } from "react-router-dom";
import SelectInput from "../SystemDesign/SelectInput";
import Input from "../SystemDesign/Input";
import debounce from "just-debounce-it";

interface DebounceFilter {
  toDate: string;
  fromDate: string;
  limitEx: string;
}

interface FilterExerciseProps {
  getNewList: React.Dispatch<React.SetStateAction<boolean>>;
  searchOptions: React.Dispatch<React.SetStateAction<ExerciseDataOptions>>;
  setSearchParams: SetURLSearchParams;
  searchParams: URLSearchParams;
  limit: string | null;
  to: string | null;
  from: string | null;
  setTextFilter: React.Dispatch<React.SetStateAction<string>>;
  setStatusFilter: React.Dispatch<React.SetStateAction<StatusEx | "All">>;
  textFilter: string;
  statusFilter: StatusEx | "All";
}

export default function FilterExercise({
  getNewList,
  searchOptions,
  searchParams,
  setSearchParams,
  limit,
  to,
  from,
  setStatusFilter,
  setTextFilter,
  statusFilter,
  textFilter,
}: FilterExerciseProps) {
  // 3 states to filter the number of exercise and end dates
  const [limitEx, setLimitEx] = useState("");
  const [toDate, setToDate] = useState("");
  const [fromDate, setFromDate] = useState("");

  // Effect that activates at the start to modify the inputs in case user enter query params
  useEffect(() => {
    if (limit != null) setLimitEx(limit);
    if (to != null) setToDate(to);
    if (from != null) setFromDate(from);
  }, []);

  // 3 handlers, each one for 1 input
  const handleLimit = (e: ChangeEvent<HTMLInputElement>) => {
    const limitValue = e.target.value; // Get the value
    setLimitEx(limitValue); // Set it to the state so it display to user
    // Depending on the value, delete it or add it to the query params
    if (limitValue === "") searchParams.delete("limit");
    else searchParams.set("limit", limitValue);
    setSearchParams(searchParams);
  };
  // Same for the other 2
  const handleToDate = (e: ChangeEvent<HTMLInputElement>) => {
    const toValue = e.target.value;
    setToDate(toValue);
    if (toValue === "") searchParams.delete("to");
    else searchParams.set("to", toValue);
    setSearchParams(searchParams);
  };
  const handleFromDate = (e: ChangeEvent<HTMLInputElement>) => {
    const fromValue = e.target.value;
    setFromDate(fromValue);
    if (fromValue === "") searchParams.delete("from");
    else searchParams.set("from", fromValue);
    setSearchParams(searchParams);
  };

  // Function to debounce the user input, each 100ms will do it
  const getList = useCallback(
    debounce(({ fromDate, toDate, limitEx }: DebounceFilter) => {
      searchOptions({
        from: fromDate === "" ? undefined : fromDate,
        to: toDate === "" ? undefined : toDate,
        limit: limitEx === "" ? undefined : limitEx,
      });
      getNewList(true);
    }, 100),
    [],
  );

  // Each time user interact with 1 filter, get a new list
  useEffect(() => {
    getList({ fromDate, limitEx, toDate });
  }, [fromDate, toDate, limitEx]);

  // Handlers for the inputs that are from the parent component
  const handleTextFilter = (e: ChangeEvent<HTMLInputElement>) => {
    setTextFilter(e.target.value);
  };
  const handleStatusFilter = (e: ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value as StatusEx);
  };

  // Return a section which will contain the 5 filters
  return (
    <section className="mx-auto mt-3 flex w-3/4 flex-col items-center justify-center gap-2 rounded-md bg-slate-50 px-4 py-2 pb-6 shadow-md shadow-black/20">
      <h2 className="-order-1 font-digitalDisplay text-xl first-letter:text-2xl first-letter:text-sky-400">
        Filter
      </h2>
      <div className="mb-0 flex w-full flex-col items-center justify-start gap-2 self-start pl-6 md:mb-2 md:flex-row md:gap-6 md:pl-0">
        <LabelForm style="items-center">
          <TitleInput firstColor="text-sm first-letter:text-sky-400 w-20 text-right">
            After{" "}
          </TitleInput>
          <DateInput
            name="from"
            lineStyle
            onChange={handleFromDate}
            value={fromDate}
          />
        </LabelForm>
        <LabelForm style="items-center">
          <TitleInput firstColor="text-sm first-letter:text-sky-400 w-20 text-right">
            Before{" "}
          </TitleInput>
          <DateInput
            name="to"
            lineStyle
            onChange={handleToDate}
            value={toDate}
          />
        </LabelForm>
        <LabelForm style="items-center">
          <TitleInput firstColor="text-sm first-letter:text-sky-400 w-20 text-right">
            Limit{" "}
          </TitleInput>
          <NumericInput
            min={0}
            lineStyle={true}
            name="limit"
            onChange={handleLimit}
            value={limitEx}
          />
        </LabelForm>
      </div>
      <div className="-order-1 flex w-full flex-col items-center justify-center gap-4 self-start pl-6 md:order-1 md:flex-row md:pl-16">
        <LabelForm style="justify-start md:justify-center items-center">
          <TitleInput firstColor="text-sm first-letter:text-sky-400 w-20 text-right">
            Description
          </TitleInput>
          <Input
            type="text"
            name="filterDesc"
            value={textFilter}
            onChange={handleTextFilter}
            lineStyle={true}
            autoComplete="off"
            canBeTooLong
            size={22}
          />
        </LabelForm>
        <LabelForm style="justify-start items-center">
          <TitleInput firstColor="text-sm first-letter:text-sky-400 w-20 text-right">
            Status
          </TitleInput>
          <SelectInput
            name="filterStatus"
            onChange={handleStatusFilter}
            value={statusFilter}
            lineStyle={true}
          >
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Current">Current</option>
            <option value="Completed">Completed</option>
          </SelectInput>
        </LabelForm>
      </div>
    </section>
  );
}
