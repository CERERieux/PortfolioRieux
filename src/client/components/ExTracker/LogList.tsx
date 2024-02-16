import { useEffect, useState } from "react";
import { isAxiosError, type AxiosResponse } from "axios";
import DeleteButton from "./DeleteButton";
import Edit from "../Icons/Edit";
import ActionButton from "../SystemDesign/ActionButton";
import UpdateExForm from "./UpdateExForm";
import type { UseMutationResult } from "@tanstack/react-query";
import type {
  ResponseAction,
  ResultUpdate,
  SingleOperation,
  StatusEx,
  resGetExercise,
  updateExerciseHook,
  updateExerciseService,
} from "../../types";

const COLOR_LIST = {
  Pending: "first-letter:text-red-700",
  PendingBg:
    "[background:_linear-gradient(192deg,rgb(252_165_165)_5%,#f8fafc_30%)]",
  PendingBorder: "border border-red-300 shadow-red-800/30",
  Current: "first-letter:text-amber-600",
  CurrentBg:
    "[background:_linear-gradient(192deg,rgb(253_230_138)_5%,#f8fafc_30%)]",
  CurrentBorder: "border border-amber-300 shadow-amber-800/30",
  Completed: "first-letter:text-lime-700",
  CompletedBg:
    "[background:_linear-gradient(192deg,rgb(217_249_157)_5%,#f8fafc_30%)]",
  CompletedBorder: "border border-lime-300 shadow-lime-800/30",
};

interface LogListProps {
  deleteUserExercise: UseMutationResult<
    | AxiosResponse<ResponseAction, any>
    | {
        error: string;
      },
    Error,
    SingleOperation,
    unknown
  >;
  updateUserExercise: UseMutationResult<
    | AxiosResponse<ResultUpdate, any>
    | {
        error: string;
      },
    Error,
    updateExerciseService,
    unknown
  >;
  data: resGetExercise;
  deleteExercise: (id: string) => void;
  updateExercise: ({ description, id, status }: updateExerciseHook) => void;
  isDeleting: boolean;
  isUpdating: boolean;
  setAction: React.Dispatch<React.SetStateAction<string | null>>;
  setLocalError: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function LogList({
  data,
  deleteUserExercise,
  updateUserExercise,
  isDeleting,
  isUpdating,
  deleteExercise,
  updateExercise,
  setAction,
  setLocalError,
}: LogListProps) {
  // 3 states to manage the update form, 1 for the view, 2 for the inputs
  const [isUpdate, setIsUpdate] = useState({ id: "", isUpdate: false });
  const [descriptionUpdate, setDescriptionUpdate] = useState("");
  const [statusUpdate, setStatusUpdate] = useState<StatusEx>("Pending");

  // Effect that activates each time we update an exercise
  useEffect(() => {
    // If it was a completed petition
    if (updateUserExercise.isSuccess) {
      // We need to verify if there wasn't an error
      if (!("error" in updateUserExercise.data)) {
        // If it was successful, reset the 2 states of the form and change the view
        setIsUpdate({ id: "", isUpdate: false });
        setDescriptionUpdate("");
        setStatusUpdate("Pending");
        // And notify to user the action, remove it after 2 seconds
        setLocalError(null);
        setAction("Your exercise was updated!");
        setTimeout(() => {
          setAction(null);
        }, 2000);
      } else {
        // If it was an error, then show the error to user for 3 seconds
        setLocalError(updateUserExercise.data.error);
        setAction(null);
        setTimeout(() => {
          setLocalError(null);
        }, 3000);
      }
    } else if (updateUserExercise.isError) {
      // If an error occur in the petition, get the error and show it
      const { error } = updateUserExercise;
      if (isAxiosError(error)) {
        setLocalError(error.response?.data.error);
      } else {
        // If it was an error I can't cover, show a generic message
        setLocalError("Something went wront at updating your exercise...");
      }
      // For 3 seconds
      setTimeout(() => {
        setLocalError(null);
      }, 3000);
    }
  }, [updateUserExercise.isSuccess]);

  // An effect that activates each time we delete something
  useEffect(() => {
    // If the petition was successful
    if (deleteUserExercise.isSuccess) {
      // If an error didn't happen while deleting
      if (!("error" in deleteUserExercise.data)) {
        // Show to user the action for 2 seconds
        setLocalError(null);
        setAction("Your exercise was deleted successfully!");
        setTimeout(() => {
          setAction(null);
        }, 2000);
      } else {
        // If an error happened, show it for 3 seconds
        setLocalError(deleteUserExercise.data.error);
        setAction(null);
        setTimeout(() => {
          setLocalError(null);
        }, 2000);
      }
    } else if (deleteUserExercise.isError) {
      // If the petition resulted in error, get the error and show it
      const { error } = deleteUserExercise;
      if (isAxiosError(error)) {
        setLocalError(error.response?.data.error);
      } else {
        // Display generic message if error can't be cover by the fetcher
        setLocalError("Something went wrong at deleting your exercise...");
      }
      // For 3 seconds
      setTimeout(() => {
        setLocalError(null);
      }, 3000);
    }
  }, [deleteUserExercise.isSuccess]);

  // Component return an unordered list where the content will be each exercise
  return (
    <ul className="flex flex-col gap-4 overflow-y-auto px-2 py-4">
      {data.log.map(ex => {
        // Map over each exercise of the user to get
        const date = new Date(ex.date).toISOString().slice(0, 10); // The date of end
        const id = ex._id.toString(); // The ID to use it as key
        // Auxiliars to give a color to each element of the list depending on its state
        const color = COLOR_LIST[`${ex.status}Bg` as keyof typeof COLOR_LIST];
        const border =
          COLOR_LIST[`${ex.status}Border` as keyof typeof COLOR_LIST];
        const text = `${
          COLOR_LIST[ex.status as keyof typeof COLOR_LIST]
        }  first-letter:text-lg`;

        const handleUpdateChange = () => {
          setIsUpdate({ id, isUpdate: true });
          setDescriptionUpdate(ex.description);
          setStatusUpdate(ex.status as StatusEx);
        };
        // For each element of the list, show the data we need, or show the update form if needed
        return (
          <li
            key={id}
            className={`${color} ${border} rounded-md px-4 py-2 shadow-lg`}
          >
            {!(isUpdate.isUpdate && id === isUpdate.id) ? (
              <article className="relative">
                <p className={`${text}`}>
                  Description: <span className="text-sm">{ex.description}</span>
                </p>
                <p className={`${text}`}>
                  Status: <span className="text-sm">{ex.status}</span>
                </p>
                <p className={`${text}`}>
                  Finish Date: <span className="text-sm underline">{date}</span>
                </p>
                <DeleteButton
                  deleteExercise={deleteExercise}
                  id={id}
                  isDeleting={isDeleting}
                />
                <ActionButton
                  onClick={handleUpdateChange}
                  coverColor="bg-slate-200 shadow-slate-100"
                  hoverColor="hover:bg-blue-200 hover:shadow-blue-400/30 hover:text-blue-600"
                  groupName={["group/update", "group-hover/update:block"]}
                  position="right-12 bottom-2"
                  tooltipText="Edit"
                  tooltipPos="left-1 -bottom-5"
                >
                  <Edit size="24" />
                </ActionButton>
              </article>
            ) : (
              <div>
                <UpdateExForm
                  changeAction={setAction}
                  changeLocalError={setLocalError}
                  changeDescription={setDescriptionUpdate}
                  changeStatus={setStatusUpdate}
                  description={descriptionUpdate}
                  isUpdate={isUpdate}
                  isUpdating={isUpdating}
                  setIsUpdate={setIsUpdate}
                  status={statusUpdate}
                  updateExercise={updateExercise}
                  updateUserExercise={updateUserExercise}
                />
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}