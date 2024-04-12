import { type ChangeEvent, useState, useCallback, useEffect } from "react";
import type { SetUserOptions, StatusIssue } from "../../../types";
import TitleForm from "../../SystemDesign/TitleForm";
import LabelForm from "../../SystemDesign/LabelForm";
import TitleInput from "../../SystemDesign/TitleInput";
import Input from "../../SystemDesign/Input";
import SelectInput from "../../SystemDesign/SelectInput";
import DateInput from "../../SystemDesign/DateInput";
import debounce from "just-debounce-it";
import Button from "../../SystemDesign/Button";
import { CloseNavButton } from "../../SystemDesign/CloseNavButton";
import { useLanguage } from "../../../hooks/useLanguage";
import { useSettingStore } from "../../../store/settingPortfolio";

interface FilterIssuesProps {
  opacity: string;
  searchOptions: ({
    _id,
    createdBy,
    createdOn,
    open,
    project,
    status,
    text,
    title,
    updatedOn,
  }: SetUserOptions) => void;
  getNewSearch: (value: React.SetStateAction<boolean>) => void;
  handleOpacity: () => void;
}
// Interface for debouncer function
interface DebounceIssueFilter {
  id: string;
  project: string;
  title: string;
  text: string;
  status: StatusIssue;
  createdBy: string;
  createdOn: string;
  updatedOn: string;
}

export default function FilterIssues({
  getNewSearch,
  searchOptions,
  handleOpacity,
  opacity,
}: FilterIssuesProps) {
  // 8 status to handle the filter, so you can filter white any data of the issue
  const [id, setId] = useState("");
  const [project, setProject] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [status, setStatus] = useState<StatusIssue>("Any");
  const [createdBy, setCreatedBy] = useState("");
  const [createdOn, setCreatedOn] = useState("");
  const [updatedOn, setUpdatedOn] = useState("");
  const textFiller = useLanguage({ project: "SugAndIssues" });
  const { i18n } = useSettingStore();
  const ml = i18n === "English" ? "-ml-[4.5rem]" : "-ml-3";
  // Auxiliar function to debounce user filter, each 300ms after user stop will call the filter
  const filterInfo = useCallback(
    debounce(
      ({
        createdBy,
        createdOn,
        id,
        project,
        status,
        text,
        title,
        updatedOn,
      }: DebounceIssueFilter) => {
        searchOptions({
          _id: id === "" ? undefined : id,
          project: project === "" ? undefined : project,
          title: title === "" ? undefined : title,
          text: text === "" ? undefined : text,
          createdBy: createdBy === "" ? undefined : createdBy,
          status: status === "Any" ? undefined : status,
          createdOn: createdOn === "" ? undefined : createdOn,
          updatedOn: updatedOn === "" ? undefined : updatedOn,
        });
        getNewSearch(true);
      },
      300,
    ),
    [],
  );
  // Effect that call the filters when 1 of them change
  useEffect(() => {
    filterInfo({
      createdBy,
      createdOn,
      id,
      project,
      status,
      text,
      title,
      updatedOn,
    });
  }, [createdBy, createdOn, id, project, status, text, title, updatedOn]);

  // 8 Auxliars to handle the user inputs into the filter
  const handleId = (e: ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };
  const handleProject = (e: ChangeEvent<HTMLInputElement>) => {
    setProject(e.target.value);
  };
  const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleText = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  const handleCreatedBy = (e: ChangeEvent<HTMLInputElement>) => {
    setCreatedBy(e.target.value);
  };
  const handleStatus = (e: ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value as StatusIssue);
  };
  const handleCreatedOn = (e: ChangeEvent<HTMLInputElement>) => {
    setCreatedOn(e.target.value);
  };
  const handleUpdatedOn = (e: ChangeEvent<HTMLInputElement>) => {
    setUpdatedOn(e.target.value);
  };
  // Auxliar to reset the filter
  const resetFilter = () => {
    setId("");
    setProject("");
    setTitle("");
    setText("");
    setCreatedBy("");
    setStatus("Any");
    setCreatedOn("");
    setUpdatedOn("");
  };

  // Component that return the filter
  return (
    <section
      className={`absolute right-0 top-0 h-full w-full bg-cyan-700/70 backdrop-blur-sm md:w-1/2 lg:w-1/3 ${opacity} flex flex-col items-center justify-center gap-4 shadow-xl shadow-black/40 transition-all duration-500 ease-in-out`}
    >
      <TitleForm firstColor="first-letter:text-lime-300 font-sketch">
        {textFiller[3]}
      </TitleForm>
      <div className="flex h-3/4 w-full flex-col items-center justify-around gap-4 [&_span]:w-1/4 [&_span]:text-right [&_span]:md:w-1/5">
        <LabelForm>
          <span className={``}>ID</span>
          <Input
            name="FilterPublicIssuesByID"
            type="text"
            value={id}
            onChange={handleId}
            lineStyle
            extraStyles="border-b-slate-200 focus:border-b-cyan-200"
          />
        </LabelForm>
        <LabelForm>
          <TitleInput>{textFiller[6]}</TitleInput>
          <Input
            name="FilterPublicIssuesByProject"
            type="text"
            value={project}
            onChange={handleProject}
            lineStyle
            extraStyles="border-b-slate-200 focus:border-b-cyan-200"
          />
        </LabelForm>
        <LabelForm>
          <TitleInput>{textFiller[7]}</TitleInput>
          <Input
            name="FilterPublicIssuesByTitle"
            type="text"
            value={title}
            onChange={handleTitle}
            lineStyle
            extraStyles="border-b-slate-200 focus:border-b-cyan-200"
          />
        </LabelForm>
        <LabelForm>
          <TitleInput>{textFiller[8]}</TitleInput>
          <Input
            name="FilterPublicIssuesByDescription"
            type="text"
            value={text}
            onChange={handleText}
            lineStyle
            extraStyles="border-b-slate-200 focus:border-b-cyan-200"
          />
        </LabelForm>
        <LabelForm>
          <TitleInput>{textFiller[9]}</TitleInput>
          <Input
            name="FilterPublicIssuesByCreator"
            type="text"
            value={createdBy}
            onChange={handleCreatedBy}
            lineStyle
            extraStyles="border-b-slate-200 focus:border-b-cyan-200"
          />
        </LabelForm>
        <LabelForm style={`items-center justify-center ${ml}`}>
          <TitleInput>{textFiller[10]}</TitleInput>
          <SelectInput
            name="FilterPublicIssuesByStatus"
            value={status}
            onChange={handleStatus}
            lineStyle
            extraStyles="border-b-slate-200 focus:border-b-cyan-200 *:bg-slate-700"
          >
            <option value="Any">{textFiller[11]}</option>
            <option value="Pending">{textFiller[12]}</option>
            <option value="Read">{textFiller[13]}</option>
            <option value="Trying to fix">{textFiller[14]}</option>
            <option value="Completed">{textFiller[15]}</option>
            <option value="Ignored">{textFiller[16]}</option>
          </SelectInput>
        </LabelForm>
        <LabelForm style="items-center justify-center -ml-16">
          <TitleInput>{textFiller[17]}</TitleInput>
          <DateInput
            name="FilterPublicIssuesByCreationDate"
            value={createdOn}
            onChange={handleCreatedOn}
            max={"2099-12-31"}
            min={"1990-01-01"}
            lineStyle
            extraStyles="border-b-slate-200 focus:border-b-cyan-200"
          />
        </LabelForm>
        <LabelForm style="items-center justify-center -ml-16">
          <TitleInput>{textFiller[18]}</TitleInput>
          <DateInput
            name="FilterPublicIssuesByUpdateDate"
            value={updatedOn}
            onChange={handleUpdatedOn}
            max={"2099-12-31"}
            min={"1990-01-01"}
            lineStyle
            extraStyles="border-b-slate-200 focus:border-b-cyan-200"
          />
        </LabelForm>
        <CloseNavButton handleOpacity={handleOpacity} />
        <Button
          color="bg-slate-50 border-slate-700 hover:bg-slate-600 hover:text-slate-100 active:bg-blue-500 active:border-slate-100"
          xSize="w-40"
          extraStyles="active:shadow-none text-black shadow-md shadow-black/20"
          onClick={resetFilter}
        >
          {textFiller[19]}
        </Button>
      </div>
    </section>
  );
}
