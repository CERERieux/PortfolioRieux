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
import FilterOptions from "../../Icons/FilterOptions";
import { useCloseNavButton } from "../../SystemDesign/CloseNavButton";

export default function IssueBoard() {
  const { data, error, addIssue, searchOptions, getNewSearch, addUserIssue } =
    useIssues(); // Auxiliars to display all the issues and suggestions of the portfolio
  const { handleOpacity, opacity } = useCloseNavButton(); // Hook to handle the opacity of the filter section
  // 2 states to display the result of user actions
  const [localError, setLocalError] = useState<null | string>(null);
  const [action, setAction] = useState<null | string>(null);
  const idOpen = "idOpenDialogCreateIssue"; // Auxiliar to give an ID to the button that open the dialog to create an issue

  // Return the component that display all the funcionality of Corner of Issues and Suggestions
  return (
    <main className="flex h-full w-full flex-col items-center gap-6 overflow-y-auto bg-gradient-to-t from-slate-700 to-slate-900 to-70% px-6 py-4 text-slate-50">
      {error !== null && isAxiosError(error) && (
        <ErrorMessage>{error.response?.data.error}</ErrorMessage>
      )}
      {localError !== null && <ErrorMessage>{localError}</ErrorMessage>}
      {action !== null && <ActionMessage>{action}</ActionMessage>}
      <h1 className="text-center font-sketch text-3xl first-letter:text-4xl first-letter:text-cyan-300">
        Corner of Issues and Suggestions
      </h1>
      <IssueFormDialog
        addIssue={addIssue}
        addUserIssue={addUserIssue}
        getNewSearch={getNewSearch}
        idOpen={idOpen}
        setAction={setAction}
        setLocalError={setLocalError}
      />
      <div className="flex w-full items-center justify-center gap-4">
        <Button
          color="bg-slate-300 text-black border-slate-50 hover:bg-lime-600 hover:border-slate-700"
          xSize="w-72"
          extraStyles="flex justify-center items-center gap-2 shadow-md shadow-black/90"
          id={idOpen}
        >
          <AddMessage />
          Add New Issue or Suggerence
        </Button>
        <Button
          color="bg-slate-300 text-black border-slate-50 hover:bg-cyan-600 hover:border-slate-700"
          xSize="w-40"
          extraStyles="flex justify-center items-center gap-2 shadow-md shadow-black/90"
          disabled={opacity.includes("opacity-100")}
          onClick={handleOpacity}
        >
          <FilterOptions />
          Filter
        </Button>
      </div>
      <FilterIssues
        getNewSearch={getNewSearch}
        searchOptions={searchOptions}
        handleOpacity={handleOpacity}
        opacity={opacity}
      />

      {data !== undefined ? (
        !("error" in data) ? (
          <article className="mx-auto w-full">
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
                    <li
                      key={id}
                      className="w-full border-b-2 border-dotted border-slate-300 pb-4 pt-2"
                    >
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
                <h2 className="text-center font-sketch text-xl underline first-letter:text-2xl first-letter:text-red-200">
                  There is no issue or suggestion that coincide with your
                  search!
                </h2>
              )}
            </ul>
          </article>
        ) : (
          <h2 className="text-center font-sketch text-xl underline first-letter:text-2xl first-letter:text-red-200">
            {data.error}
          </h2>
        )
      ) : (
        <p className="text-center font-sketch text-xl first-letter:text-2xl">
          Loading
        </p>
      )}
    </main>
  );
}
