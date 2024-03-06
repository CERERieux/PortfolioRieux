import { useState } from "react";
import { useIssues } from "../../../hooks/useIssues";
import { isAxiosError } from "axios";
import IssueFormDialog from "./IssueFormDialog";
import Button from "../../SystemDesign/Button";
import ErrorMessage from "../../SystemDesign/ErrorMessage";
import ActionMessage from "../../SystemDesign/ActionMessage";
import AddMessage from "../../Icons/AddMessage";
import FilterIssues from "./FilterIssues";
import SinglePublicIssue from "./SinglePublicIssue";

export default function IssueBoard() {
  const { data, error, addIssue, searchOptions, getNewSearch, addUserIssue } =
    useIssues();
  const [localError, setLocalError] = useState<null | string>(null);
  const [action, setAction] = useState<null | string>(null);
  const idOpen = "idOpenDialogCreateIssue";

  return (
    <div className="flex h-full w-full flex-col items-center gap-4 overflow-y-auto bg-slate-700 px-6 py-4 text-slate-50">
      {error !== null && isAxiosError(error) && (
        <ErrorMessage extraStyles="md:left-1/4 shadow-md z-10">
          {error.response?.data.error}
        </ErrorMessage>
      )}
      {localError !== null && (
        <ErrorMessage extraStyles="md:left-1/4 shadow-md z-10">
          {localError}
        </ErrorMessage>
      )}
      {action !== null && (
        <ActionMessage extraStyles="md:left-1/4 shadow-md z-10">
          {action}
        </ActionMessage>
      )}
      <h1>Corner of issues and suggestions!</h1>
      <IssueFormDialog
        addIssue={addIssue}
        addUserIssue={addUserIssue}
        getNewSearch={getNewSearch}
        idOpen={idOpen}
        setAction={setAction}
        setLocalError={setLocalError}
      />
      <Button
        color="bg-slate-300 text-black border-slate-50 hover:bg-lime-600 hover:border-slate-700 transition-all"
        xSize="w-72 flex justify-center items-center gap-2 shadow-md shadow-black/90"
        id={idOpen}
      >
        <AddMessage />
        Add New Issue or Suggerence
      </Button>
      <FilterIssues getNewSearch={getNewSearch} searchOptions={searchOptions} />

      {data !== undefined ? (
        !("error" in data) ? (
          <div>
            <ul>
              {data.length > 0 ? (
                data.map(issue => {
                  const id = issue._id.toString();
                  const created = new Date(
                    issue.created_on,
                  ).toLocaleDateString();
                  const updated = new Date(
                    issue.updated_on,
                  ).toLocaleDateString();
                  return (
                    <li key={id}>
                      <SinglePublicIssue
                        created={created}
                        id={id}
                        issue={issue}
                        updated={updated}
                      />
                    </li>
                  );
                })
              ) : (
                <h2>
                  There is no issues or suggestion that coincide with your
                  search!
                </h2>
              )}
            </ul>
          </div>
        ) : (
          <div>
            <h2>{data.error}</h2>
          </div>
        )
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
}
