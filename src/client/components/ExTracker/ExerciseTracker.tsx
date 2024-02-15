import { useState, useEffect } from "react";
import type { StatusEx } from "../../types";
import { isAxiosError } from "axios";
import { useExercise } from "../../hooks/useExercise";
import { Link } from "react-router-dom";
import CreateExForm from "./CreateExForm";
import ErrorMessage from "../SystemDesign/ErrorMessage";
import ActionMessage from "../SystemDesign/ActionMessage";
import UpdateExForm from "./UpdateExForm";
import DeleteButton from "./DeleteButton";
import UnauthorizedAccess from "../NotFound/AuthError";
import ActionButton from "../SystemDesign/ActionButton";
import Edit from "../Icons/Edit";

export default function ExerciseTracker() {
  const {
    data,
    errorEx,
    errorAuth,
    isCreating,
    isDeleting,
    isUpdating,
    createExercise,
    newExercise,
    deleteExercise,
    deleteUserExercise,
    updateExercise,
    updateUserExercise,
  } = useExercise();
  const [localError, setLocalError] = useState<string | null>(null);
  const [action, setAction] = useState<string | null>(null);
  const [isUpdate, setIsUpdate] = useState({ id: "", isUpdate: false });
  const [descriptionUpdate, setDescriptionUpdate] = useState("");
  const [statusUpdate, setStatusUpdate] = useState<StatusEx>("Pending");

  useEffect(() => {
    if (updateUserExercise.isSuccess) {
      setIsUpdate({ id: "", isUpdate: false });
      setLocalError(null);
      setAction("Your exercise was updated!");
      setTimeout(() => {
        setAction(null);
      }, 2000);
      setDescriptionUpdate("");
      setStatusUpdate("Pending");
    } else if (updateUserExercise.isError) {
      const { error } = updateUserExercise;
      if (isAxiosError(error)) {
        setLocalError(error.response?.data.error);
      } else {
        setLocalError("Something went wront at updating your exercise...");
      }
      setTimeout(() => {
        setLocalError(null);
      }, 3000);
    }
  }, [updateUserExercise.isSuccess]);

  useEffect(() => {
    if (deleteUserExercise.isSuccess) {
      setLocalError(null);
      setAction("Your exercise was deleted successfully!");
      setTimeout(() => {
        setAction(null);
      }, 2000);
    } else if (deleteUserExercise.isError) {
      const { error } = deleteUserExercise;
      if (isAxiosError(error)) {
        setLocalError(error.response?.data.error);
      } else {
        setLocalError("Something went wrong at deleting your exercise...");
      }
      setTimeout(() => {
        setLocalError(null);
      }, 3000);
    }
  }, [deleteUserExercise.isSuccess]);

  return (
    <>
      {errorAuth.cause !== null ? (
        <UnauthorizedAccess errorAuth={errorAuth} />
      ) : (
        <div className="flex h-full w-full flex-col md:grid md:grid-cols-4 md:grid-rows-4">
          <Link to="/my-profile">
            <button>Return to My Profile</button>
          </Link>
          {localError !== null && <ErrorMessage>{localError}</ErrorMessage>}
          {errorEx !== null && isAxiosError(errorEx) && (
            <ErrorMessage>Error: {errorEx.response?.data.error}</ErrorMessage>
          )}
          {action !== null && <ActionMessage>{action}</ActionMessage>}
          <aside className="col-start-4 row-span-2 px-4 py-6">
            <CreateExForm
              changeAction={setAction}
              changeLocalError={setLocalError}
              createExercise={createExercise}
              isCreating={isCreating}
              newExercise={newExercise}
            />
          </aside>
          {data !== undefined ? (
            <main className="col-span-3 col-start-1 row-span-3 row-start-2 ">
              <h2>{data.username}</h2>
              <h3>Number of exercises: {data.count}</h3>
              <ul>
                {data.log.map(ex => {
                  const date = new Date(ex.date).toISOString().slice(0, 10);
                  const id = ex._id.toString();
                  const handleUpdateChange = () => {
                    setIsUpdate({ id, isUpdate: true });
                    setDescriptionUpdate(ex.description);
                    setStatusUpdate(ex.status as StatusEx);
                  };
                  return (
                    <li key={id}>
                      {!(isUpdate.isUpdate && id === isUpdate.id) ? (
                        <article className="relative">
                          <p>Description: {ex.description}</p>
                          <p>Status: {ex.status}</p>
                          <p>Finish before of: {date}</p>
                          <DeleteButton
                            deleteExercise={deleteExercise}
                            id={id}
                            isDeleting={isDeleting}
                          />
                          <ActionButton
                            onClick={handleUpdateChange}
                            coverColor="bg-slate-200 shadow-slate-100"
                            hoverColor="hover:bg-blue-200 hover:shadow-blue-400/30 hover:text-blue-600"
                            groupName={[
                              "group/update",
                              "group-hover/update:block",
                            ]}
                            position="right-20 top-0"
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
            </main>
          ) : (
            <h1>Loading...</h1>
          )}
        </div>
      )}
    </>
  );
}
