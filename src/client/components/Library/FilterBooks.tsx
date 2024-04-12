import { type ChangeEvent } from "react";
import type { BookRecommend, BookStatus } from "../../types";
import Input from "../SystemDesign/Input";
import LabelForm from "../SystemDesign/LabelForm";
import TitleInput from "../SystemDesign/TitleInput";
import SelectInput from "../SystemDesign/SelectInput";

interface FilterBooksProps {
  recommend: BookRecommend | "All";
  status: BookStatus | "All";
  title: string;
  setRecommend: React.Dispatch<React.SetStateAction<BookRecommend | "All">>;
  setStatus: React.Dispatch<React.SetStateAction<BookStatus | "All">>;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
}

export default function FilterBooks({
  recommend,
  status,
  title,
  setRecommend,
  setStatus,
  setTitle,
}: FilterBooksProps) {
  // 3 auxiliar functions to handle inputs from user
  const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleRecommend = (e: ChangeEvent<HTMLSelectElement>) => {
    setRecommend(e.target.value as BookRecommend);
  };
  const handleStatus = (e: ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value as BookStatus);
  };
  // Return the component that display the filter
  return (
    <section className="flex w-full flex-col items-center gap-2 rounded-md bg-white px-4 py-2 shadow-md shadow-black/20 dark:bg-slate-800/80 dark:text-slate-100 md:absolute md:right-2 md:top-1/3 md:w-[32%] lg:right-8 lg:w-[28%] xl:right-12 xl:w-[25%]">
      <h2 className="font-elegant text-4xl first-letter:text-lime-400">
        Filter
      </h2>
      <div className="mb-2 flex w-full flex-col gap-4">
        <LabelForm>
          <TitleInput firstColor="first-letter:text-lime-500 italic md:w-1/4 md:text-end">
            Title{" "}
          </TitleInput>
          <Input
            lineStyle
            name="filterBookTitle"
            type="text"
            onChange={handleTitle}
            value={title}
            size={17}
          />
        </LabelForm>
        <LabelForm>
          <TitleInput firstColor="first-letter:text-lime-500 italic md:w-1/4 md:text-end">
            Status{" "}
          </TitleInput>
          <SelectInput
            lineStyle
            name="statusBookFilter"
            onChange={handleStatus}
            value={status}
            extraStyles="*:text-black"
          >
            <option value="All">All</option>
            <option value="Plan to Read">Plan to Read</option>
            <option value="Current Reading">Current Reading</option>
            <option value="Completed">Completed</option>
            <option value="Dropped/Unfinish">Dropped/Unfinish</option>
          </SelectInput>
        </LabelForm>
        <LabelForm style="md:justify-start justify-center items-center">
          <TitleInput firstColor="first-letter:text-lime-500 italic md:w-1/3 md:text-end">
            Recommend{" "}
          </TitleInput>
          <SelectInput
            lineStyle
            name="recommendBookFilter"
            onChange={handleRecommend}
            value={recommend}
          >
            <option value="All">All</option>
            <option value="I can't say">I can&apos;t say</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </SelectInput>
        </LabelForm>
      </div>
    </section>
  );
}
