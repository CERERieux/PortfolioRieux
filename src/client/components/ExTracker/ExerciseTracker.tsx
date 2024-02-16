import { useEffect, useState } from "react";
import { isAxiosError } from "axios";
import { useExercise } from "../../hooks/useExercise";
import { Link, useSearchParams } from "react-router-dom";
import type { StatusEx } from "../../types";
import CreateExForm from "./CreateExForm";
import ErrorMessage from "../SystemDesign/ErrorMessage";
import ActionMessage from "../SystemDesign/ActionMessage";
import UnauthorizedAccess from "../NotFound/AuthError";
import LogList from "./LogList";
import FilterExercise from "./FilterExercise";
import Button from "../SystemDesign/Button";

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
  // States for the local info updates
  const [localError, setLocalError] = useState<string | null>(null);
  const [action, setAction] = useState<string | null>(null);
  // States for 2 of the filters
  const [textFilter, setTextFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusEx | "All">("All");
  // "State" for the search params and the 3 we are interested in
  const [searchParams, setSearchParams] = useSearchParams();
  const limit = searchParams.get("limit");
  const to = searchParams.get("to");
  const from = searchParams.get("from");

  // Effect that will activate at the start and have the options in case user use a link with query params
  useEffect(() => {
    searchOptions({
      from: from ?? undefined,
      to: to ?? undefined,
      limit: limit ?? undefined,
    });
    getNewList(true);
  }, []);

  // Structure for the main component of exercises
  return (
    <>
      {errorAuth.cause !== null ? (
        <UnauthorizedAccess errorAuth={errorAuth} />
      ) : (
        <div className="relative flex h-full w-full flex-col overflow-y-auto bg-sky-100 md:grid md:grid-cols-4 md:grid-rows-4  md:overflow-hidden">
          {localError !== null && (
            <ErrorMessage extraStyles="md:left-1/4 shadow-md z-10">
              {localError}
            </ErrorMessage>
          )}
          {errorEx !== null && isAxiosError(errorEx) && (
            <ErrorMessage extraStyles="md:left-1/4 shadow-md z-10">
              Error: {errorEx.response?.data.error}
            </ErrorMessage>
          )}
          {action !== null && (
            <ActionMessage extraStyles="md:left-1/4 shadow-md z-10">
              {action}
            </ActionMessage>
          )}
          {/** TODO Better nav bar and make it fit in the structure correctly */}
          <nav className="-order-2 col-start-4 row-span-1 md:absolute">
            <Link to="/my-profile">
              <Button
                color="bg-lime-300 border-lime-500 hover:bg-sky-600 hover:border-sky-500"
                xSize="w-full"
              >
                Return to My Profile
              </Button>
            </Link>
          </nav>
          <header className="col-span-3 col-start-1 row-span-1 mb-4 md:mb-0">
            <FilterExercise
              getNewList={getNewList}
              searchOptions={searchOptions}
              setSearchParams={setSearchParams}
              searchParams={searchParams}
              limit={limit}
              from={from}
              to={to}
              statusFilter={statusFilter}
              textFilter={textFilter}
              setStatusFilter={setStatusFilter}
              setTextFilter={setTextFilter}
            />
          </header>
          <aside className="-order-1 col-start-4 row-span-2 row-start-2 px-4 py-3">
            <CreateExForm
              changeAction={setAction}
              changeLocalError={setLocalError}
              createExercise={createExercise}
              isCreating={isCreating}
              newExercise={newExercise}
            />
          </aside>
          {data !== undefined ? (
            <main className="relative col-span-3 col-start-1 row-span-3 row-start-2 mt-2 flex flex-col gap-4 rounded-lg bg-slate-50 shadow-inner shadow-black/30 md:overflow-y-auto">
              <h2 className="sticky top-0 z-10 pt-2 text-center font-digitalDisplay text-xl backdrop-blur-sm first-letter:text-2xl first-letter:text-sky-400">
                Note{data.count > 1 && "s"}
              </h2>
              <LogList
                data={data}
                statusFilter={statusFilter}
                textFilter={textFilter}
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
