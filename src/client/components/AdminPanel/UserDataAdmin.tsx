import { Link, useLocation } from "react-router-dom";
import AdminUrls from "./AdminUrls";
import AdminLibrary from "./AdminLibrary";
import AdminIssues from "./AdminIssues";
import { useUserDataAdmin } from "../../hooks/useUserDataAdmin";
import { isAxiosError } from "axios";
import UnauthorizedAccess from "../NotFound/AuthError";
import Button from "../SystemDesign/Button";

export default function UserDataAdmin() {
  const { state: userId }: { state: string } = useLocation();
  const {
    actionBook,
    actionIssue,
    actionUrl,
    data,
    error,
    errorAuth,
    isLoading,
    removeBook,
    removeIssue,
    removeLibrary,
    removeUrl,
    updateIssue,
    updateSuccessIssue,
    updateUserIssue,
  } = useUserDataAdmin(userId);

  return errorAuth.cause !== null ? (
    <UnauthorizedAccess errorAuth={errorAuth} />
  ) : (
    <div className="flex h-full w-full flex-col items-center gap-8 overflow-y-auto bg-slate-700 p-4">
      {error !== null && isAxiosError(error) && (
        <h2>{error.response?.data.error}</h2>
      )}
      {data !== undefined ? (
        <>
          <header className="flex items-center gap-8 rounded-lg bg-slate-500 px-6 py-3">
            <h2 className="text-xl text-white first-letter:text-3xl first-letter:text-lime-300">
              {data._id}&apos;s data
            </h2>
            <Link to={`/${import.meta.env.VITE_ROUTE_ADMIN}/admin/users`}>
              <Button
                color="border-yellow-500 hover:bg-sky-700 bg-sky-200"
                mediaSize="md:w-40"
              >
                Return
              </Button>
            </Link>
          </header>
          <AdminUrls
            shortUrl={data.shortUrl}
            user={data._id}
            removeUrl={removeUrl}
            actionDone={actionUrl}
          />
          <AdminLibrary
            books={data.books}
            user={data._id}
            removeBook={removeBook}
            removeLibrary={removeLibrary}
            actionDone={actionBook}
          />
          <AdminIssues
            issues={data.issues}
            removeIssue={removeIssue}
            updateIssue={updateIssue}
            updateSuccess={updateSuccessIssue}
            actionDone={actionIssue}
            updateUserIssue={updateUserIssue}
          />
        </>
      ) : isLoading ? (
        <h2>Loading...</h2>
      ) : (
        <h2>There is no data related to this user.</h2>
      )}
    </div>
  );
}
