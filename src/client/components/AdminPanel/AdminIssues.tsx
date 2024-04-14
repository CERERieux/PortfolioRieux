import { useState } from "react";
import type {
  IIssueTracker,
  ReqBodyIssue,
} from "../../../server/types/advanced";
import type { ResponseAction, UpdateIssueService } from "../../types";
import ErrorMessage from "../SystemDesign/ErrorMessage";
import ActionMessage from "../SystemDesign/ActionMessage";
import SingleIssueAdmin from "./SingleIssueAdmin";
import UpdateIssueAdmin from "./UpdateIssueAdmin";
import { type UseMutationResult } from "@tanstack/react-query";

interface PropsIssues {
  issues: IIssueTracker[];
  removeIssue: (id: string) => void;
  updateIssue: ({ _id, project, status, text, title }: ReqBodyIssue) => void;
  updateSuccess: boolean;
  actionDone: string | null;
  updateUserIssue: UseMutationResult<
    | ResponseAction
    | {
        error: string;
      },
    Error,
    UpdateIssueService,
    unknown
  >;
}

export default function AdminIssues({
  issues,
  removeIssue,
  updateIssue,
  actionDone,
  updateUserIssue,
}: PropsIssues) {
  const [localError, setLocalError] = useState<null | string>(null);
  const [action, setAction] = useState<null | string>(null);
  const [update, setUpdate] = useState({
    isUpdating: false,
    id: "",
  });

  const handleRemove = (id: string) => {
    removeIssue(id);
  };

  return (
    <section className="flex w-4/5 flex-col items-center justify-center gap-3 px-4 py-2">
      <h3 className="mx-auto mb-2 w-fit text-pretty rounded-lg bg-white px-4 text-center text-xl shadow-inner shadow-black/30 first-letter:text-2xl first-letter:text-lime-500">
        Issues and suggestions
      </h3>
      {localError !== null && <ErrorMessage>{localError}</ErrorMessage>}
      {action !== null && <ActionMessage>{action}</ActionMessage>}
      {actionDone !== null && <ActionMessage>{actionDone}</ActionMessage>}
      <ul className="flex h-full w-full flex-col items-center gap-2 overflow-y-auto rounded-xl bg-slate-50 px-4 py-2 shadow-inner shadow-red-900 md:w-3/4 lg:w-2/3 dark:bg-gray-700/80 dark:text-slate-100">
        {issues !== undefined && issues.length > 0 ? (
          issues.map(issue => {
            const id = issue._id.toString();
            const created = new Date(issue.created_on).toLocaleDateString();
            const updated = new Date(issue.updated_on).toLocaleDateString();
            return (
              <li key={id} className="w-full border-b-2 border-red-700 pb-4">
                {!(update.isUpdating && update.id === id) ? (
                  <SingleIssueAdmin
                    created={created}
                    id={id}
                    issue={issue}
                    setIsUpdate={setUpdate}
                    updated={updated}
                    removeIssue={() => {
                      handleRemove(id);
                    }}
                  />
                ) : (
                  <UpdateIssueAdmin
                    issue={issue}
                    isUpdate={update}
                    setAction={setAction}
                    setIsUpdate={setUpdate}
                    setLocalError={setLocalError}
                    updateIssue={updateUserIssue}
                    updateOneIssue={updateIssue}
                  />
                )}
              </li>
            );
          })
        ) : (
          <li>User has not submit any issue or suggestion</li>
        )}
      </ul>
    </section>
  );
}
