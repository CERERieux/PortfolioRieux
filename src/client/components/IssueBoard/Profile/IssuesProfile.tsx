import { isAxiosError } from "axios";
import { useEffect, useState } from "react";
import { useProfileIssues } from "../../../hooks/useProfileIssues";
import UnauthorizedAccess from "../../NotFound/AuthError";
import ErrorMessage from "../../SystemDesign/ErrorMessage";
import ActionMessage from "../../SystemDesign/ActionMessage";
import NavMenu from "../../MyProfile/NavMenu";
import UpdateIssueProfile from "./UpdateIssueProfile";
import SingleIssue from "./SingleIssue";

export default function IssueProfile() {
  const { data, error, errorAuth, updateOneIssue, updateIssue } =
    useProfileIssues(); // Auxliars to display issue info and update it
  // 2 states to display user actions
  const [localError, setLocalError] = useState<null | string>(null);
  const [action, setAction] = useState<null | string>(null);
  // State to display the form to update or the issue
  const [isUpdate, setIsUpdate] = useState({ isUpdate: false, id: "" });
  const isError = errorAuth.cause !== null; // Auxliar to know if there is an error with the user token

  // Use effect to change the title of the page
  useEffect(() => {
    document.title = "Your Issues and Suggestions!";
  }, []);

  // Component that display the entire corner of issues of user
  return isError ? (
    <UnauthorizedAccess errorAuth={errorAuth} />
  ) : (
    <main className="flex h-full w-full flex-col items-center gap-4 bg-gradient-to-b from-red-700/90 to-red-50 p-4">
      <h1 className="rounded-sm bg-slate-50/95 px-3 py-1 text-3xl shadow-lg shadow-red-900 first-letter:text-4xl first-letter:text-red-800">
        Your Corner of Issues
      </h1>
      <NavMenu />
      {error !== null && isAxiosError(error) && (
        <ErrorMessage>{error.response?.data.error}</ErrorMessage>
      )}
      {localError !== null && <ErrorMessage>{localError}</ErrorMessage>}
      {action !== null && <ActionMessage>{action}</ActionMessage>}
      {data !== undefined ? (
        !("error" in data) ? (
          data.length > 0 ? (
            <ul className="flex h-full w-full flex-col items-center gap-2 overflow-y-auto rounded-xl bg-slate-50/95 px-4 py-2 shadow-inner shadow-red-900 md:w-3/4 lg:w-2/3">
              {data.map(issue => {
                const id = issue._id.toString();
                const created = new Date(issue.created_on).toLocaleDateString();
                const updated = new Date(issue.updated_on).toLocaleDateString();
                return (
                  <li
                    key={id}
                    className="w-full border-b-2 border-red-700 pb-4"
                  >
                    {!(isUpdate.id === id && isUpdate.isUpdate) ? (
                      <SingleIssue
                        created={created}
                        id={id}
                        issue={issue}
                        setIsUpdate={setIsUpdate}
                        updated={updated}
                      />
                    ) : (
                      <UpdateIssueProfile
                        issue={issue}
                        isUpdate={isUpdate}
                        setAction={setAction}
                        setIsUpdate={setIsUpdate}
                        setLocalError={setLocalError}
                        updateIssue={updateIssue}
                        updateOneIssue={updateOneIssue}
                      />
                    )}
                  </li>
                );
              })}
            </ul>
          ) : (
            <h2 className="mt-8 text-pretty rounded-xl bg-slate-50/90 px-4 py-2 text-center text-2xl shadow-lg shadow-red-900">
              There is no issues or suggestion that coincide with your search!
            </h2>
          )
        ) : (
          <h2 className="mt-8 text-pretty rounded-xl bg-slate-50/90 px-4 py-2 text-center text-2xl shadow-lg shadow-red-900">
            {data.error}
          </h2>
        )
      ) : (
        !isError && (
          <p className="mt-8 text-pretty rounded-xl bg-slate-50/90 px-4 py-2 text-center text-lg shadow-lg shadow-red-900">
            Loading
          </p>
        )
      )}
    </main>
  );
}
