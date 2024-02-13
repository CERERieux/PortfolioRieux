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

  return (
    <>
      {errorAuth.cause !== null ? (
        <UnauthorizedAccess errorAuth={errorAuth} />
      ) : (
        <div className="grid h-full w-full grid-cols-4 grid-rows-4">
          <Link to="/my-profile">
            <button>Return to My Profile</button>
          </Link>
          <section>
            {localError !== null && <ErrorMessage>{localError}</ErrorMessage>}

            {errorEx !== null && isAxiosError(errorEx) && (
              <h1>Error: {errorEx.response?.data.error}</h1>
            )}
            {action !== null && <ActionMessage>{action}</ActionMessage>}
          </section>
          <aside className="col-start-4 row-span-4 bg-amber-50">
            <CreateExForm
              changeAction={setAction}
              changeLocalError={setLocalError}
              createExercise={createExercise}
              isCreating={isCreating}
              newExercise={newExercise}
            />
          </aside>
          {data !== undefined ? (
            <main className="col-span-3 col-start-1 row-span-3 row-start-2 bg-green-50">
              <h2>{data.username}</h2>
              <h3>Number of exercises: {data.count}</h3>
              <ul>
                {data.log.map(ex => {
                  const date = new Date(ex.date).toDateString();
                  const id = ex._id.toString();
                  return (
                    <li key={id}>
                      {!(isUpdate.isUpdate && id === isUpdate.id) ? (
                        <article>
                          <p>Description: {ex.description}</p>
                          <p>Status: {ex.status}</p>
                          <p>Date of creation: {date}</p>
                          <DeleteButton
                            changeAction={setAction}
                            changeLocalError={setLocalError}
                            deleteExercise={deleteExercise}
                            deleteUserExercise={deleteUserExercise}
                            id={id}
                            isDeleting={isDeleting}
                          />
                          <button
                            onClick={() => {
                              setIsUpdate({ id, isUpdate: true });
                              setDescriptionUpdate(ex.description);
                              setStatusUpdate(ex.status as StatusEx);
                            }}
                          >
                            Update
                          </button>
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
