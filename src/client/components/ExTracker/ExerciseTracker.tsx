import { useEffect, useState } from "react";
import { isAxiosError } from "axios";
import { useExercise } from "../../hooks/useExercise";
import { useSearchParams } from "react-router-dom";
import type { StatusEx } from "../../types";
import type { IExTracker } from "../../../server/types/basic";
import CreateExForm from "./CreateExForm";
import ErrorMessage from "../SystemDesign/ErrorMessage";
import ActionMessage from "../SystemDesign/ActionMessage";
import UnauthorizedAccess from "../NotFound/AuthError";
import LogList from "./LogList";
import FilterExercise from "./FilterExercise";
import NavMenu from "../MyProfile/NavMenu";
import LoaderText from "../NotFound/LoaderText";

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
  // States for 3 of the filters
  const [textFilter, setTextFilter] = useState("");
  const [limitEx, setLimitEx] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusEx | "All">("All");
  // State to save filtered data of user
  const [filteredData, setFilteredData] = useState<IExTracker[]>([]);
  // "State" for the search params and the 3 we are interested in
  const [searchParams, setSearchParams] = useSearchParams();
  const limit = searchParams.get("limit");
  const to = searchParams.get("to");
  const from = searchParams.get("from");
  const desc = searchParams.get("desc");
  const status = searchParams.get("status");

  // Effect that will activate at the start and have the options in case user use a link with query params
  useEffect(() => {
    if (limit != null) setLimitEx(limit);
    if (desc != null) setTextFilter(desc);
    if (status != null) setStatusFilter(status as StatusEx | "All");
    searchOptions({
      from: from ?? undefined,
      to: to ?? undefined,
    });
    getNewList(true);
  }, []);
  useEffect(() => {
    if (data !== undefined) setFilteredData(data.log);
  }, [data]);

  // Structure for the main component of exercises
  return errorAuth.cause !== null ? (
    <UnauthorizedAccess errorAuth={errorAuth} />
  ) : (
    <div className="relative flex h-full w-full flex-col overflow-y-auto bg-gradient-to-b from-sky-100 from-20% to-sky-600 lg:grid lg:grid-cols-4 lg:grid-rows-4 lg:overflow-hidden">
      {localError !== null && <ErrorMessage>{localError}</ErrorMessage>}
      {errorEx !== null && isAxiosError(errorEx) && (
        <ErrorMessage>Error: {errorEx.response?.data.error}</ErrorMessage>
      )}
      {action !== null && <ActionMessage>{action}</ActionMessage>}
      <NavMenu />
      <header className="col-span-4 col-start-1 row-span-1 mb-4 md:mb-0 xl:col-span-3">
        <FilterExercise
          getNewList={getNewList}
          searchOptions={searchOptions}
          setSearchParams={setSearchParams}
          searchParams={searchParams}
          from={from}
          to={to}
          statusFilter={statusFilter}
          textFilter={textFilter}
          limitEx={limitEx}
          setStatusFilter={setStatusFilter}
          setTextFilter={setTextFilter}
          setLimitEx={setLimitEx}
        />
      </header>
      <aside className="col-start-4 row-span-3 row-start-2 mx-auto h-4/5 px-4 py-3">
        <CreateExForm
          getNewList={getNewList}
          changeAction={setAction}
          changeLocalError={setLocalError}
          createExercise={createExercise}
          isCreating={isCreating}
          newExercise={newExercise}
        />
      </aside>
      <main className="relative col-span-3 col-start-1 row-span-3 row-start-2 mt-2 flex flex-col gap-4 rounded-lg bg-slate-50 shadow-inner shadow-black/30 lg:overflow-y-auto">
        {data !== undefined ? (
          <>
            <h2 className="sticky top-0 z-10 pt-2 text-center font-digitalDisplay text-xl backdrop-blur-sm">
              <span className="text-2xl text-sky-400">
                {filteredData.length} N
              </span>
              ote{filteredData.length > 1 && "s"}
            </h2>
            <LogList
              getNewList={getNewList}
              data={data}
              statusFilter={statusFilter}
              textFilter={textFilter}
              limit={limitEx}
              filteredData={filteredData}
              deleteExercise={deleteExercise}
              deleteUserExercise={deleteUserExercise}
              isDeleting={isDeleting}
              isUpdating={isUpdating}
              setAction={setAction}
              setLocalError={setLocalError}
              setFilteredData={setFilteredData}
              updateExercise={updateExercise}
              updateUserExercise={updateUserExercise}
            />
          </>
        ) : (
          <LoaderText />
        )}
      </main>
    </div>
  );
}
