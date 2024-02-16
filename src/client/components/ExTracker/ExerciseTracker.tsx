import { useState } from "react";
import { isAxiosError } from "axios";
import { useExercise } from "../../hooks/useExercise";
import { Link } from "react-router-dom";
import CreateExForm from "./CreateExForm";
import ErrorMessage from "../SystemDesign/ErrorMessage";
import ActionMessage from "../SystemDesign/ActionMessage";
import UnauthorizedAccess from "../NotFound/AuthError";
import LogList from "./LogList";
import FilterExercise from "./FilterExercise";

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
    getNewList,
    searchOptions,
  } = useExercise();
  const [localError, setLocalError] = useState<string | null>(null);
  const [action, setAction] = useState<string | null>(null);

  return (
    <>
      {errorAuth.cause !== null ? (
        <UnauthorizedAccess errorAuth={errorAuth} />
      ) : (
        <div className="flex h-full w-full flex-col md:grid md:grid-cols-4 md:grid-rows-4">
          {localError !== null && (
            <ErrorMessage extraStyles="left-1/4 shadow-md">
              {localError}
            </ErrorMessage>
          )}
          {errorEx !== null && isAxiosError(errorEx) && (
            <ErrorMessage extraStyles="left-1/4 shadow-md">
              Error: {errorEx.response?.data.error}
            </ErrorMessage>
          )}
          {action !== null && (
            <ActionMessage extraStyles="left-1/4 shadow-md">
              {action}
            </ActionMessage>
          )}
          <header className="col-span-3 col-start-1 row-span-1 bg-slate-200">
            <Link to="/my-profile">
              <button>Return to My Profile</button>
            </Link>
            <FilterExercise
              getNewList={getNewList}
              searchOptions={searchOptions}
            />
          </header>
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
            <main className="col-span-3 col-start-1 row-span-3 row-start-2 flex flex-col gap-4 overflow-y-auto">
              <h2 className="text-center text-xl first-letter:text-2xl">
                Note{data.count > 1 && "s"}
              </h2>
              <LogList
                data={data}
                deleteExercise={deleteExercise}
                deleteUserExercise={deleteUserExercise}
                isDeleting={isDeleting}
                isUpdating={isUpdating}
                setAction={setAction}
                setLocalError={setLocalError}
                updateExercise={updateExercise}
                updateUserExercise={updateUserExercise}
              />
            </main>
          ) : (
            <h1>Loading...</h1>
          )}
        </div>
      )}
    </>
  );
}
