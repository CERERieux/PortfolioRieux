import { type ChangeEvent, type FormEvent, useState } from "react";
import type { SetUserOptions, StatusIssue } from "../../../types";

interface FilterIssuesProps {
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
}

export default function FilterIssues({
  getNewSearch,
  searchOptions,
}: FilterIssuesProps) {
  const [id, setId] = useState("");
  const [projectS, setProjectS] = useState("");
  const [titleS, setTitleS] = useState("");
  const [textS, setTextS] = useState("");
  const [status, setStatus] = useState<StatusIssue>("Any");
  const [createdBy, setCreatedBy] = useState("");
  const [createdOn, setCreatedOn] = useState("");
  const [updatedOn, setUpdatedOn] = useState("");

  const handleId = (e: ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };
  const handleProjectS = (e: ChangeEvent<HTMLInputElement>) => {
    setProjectS(e.target.value);
  };
  const handleTitleS = (e: ChangeEvent<HTMLInputElement>) => {
    setTitleS(e.target.value);
  };
  const handleTextS = (e: ChangeEvent<HTMLInputElement>) => {
    setTextS(e.target.value);
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
  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    searchOptions({
      _id: id === "" ? undefined : id,
      project: projectS === "" ? undefined : projectS,
      title: titleS === "" ? undefined : titleS,
      text: textS === "" ? undefined : textS,
      createdBy: createdBy === "" ? undefined : createdBy,
      status: status === "Any" ? undefined : status,
      createdOn: createdOn === "" ? undefined : createdOn,
      updatedOn: updatedOn === "" ? undefined : updatedOn,
    });
    getNewSearch(true);
  };
  return (
    <section>
      <h3 className="text-">Filter:</h3>
      <form onSubmit={handleSearch}>
        <label htmlFor="">
          ID: <input type="text" value={id} onChange={handleId} />
        </label>
        <label htmlFor=""></label>
        <label htmlFor="">
          Project:{" "}
          <input type="text" value={projectS} onChange={handleProjectS} />
        </label>
        <label htmlFor="">
          Title: <input type="text" value={titleS} onChange={handleTitleS} />
        </label>
        <label htmlFor="">
          Description:{" "}
          <input type="text" value={textS} onChange={handleTextS} />
        </label>
        <label htmlFor="">
          Created By:{" "}
          <input type="text" value={createdBy} onChange={handleCreatedBy} />
        </label>
        <label htmlFor="">
          Status :{" "}
          <select name="" id="" value={status} onChange={handleStatus}>
            <option value="Any">Any</option>
            <option value="Pending">Pending</option>
            <option value="Read">Read</option>
            <option value="Trying to fix">Trying to fix</option>
            <option value="Completed">Completed</option>
            <option value="Ignored">Ignored</option>
          </select>
        </label>
        <label htmlFor="">
          Created On:{" "}
          <input type="date" value={createdOn} onChange={handleCreatedOn} />
        </label>
        <label htmlFor="">
          Updated On:{" "}
          <input type="date" value={updatedOn} onChange={handleUpdatedOn} />
        </label>
        <button>Search!</button>
      </form>
    </section>
  );
}
