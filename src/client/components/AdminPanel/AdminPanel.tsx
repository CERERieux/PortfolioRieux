import { Link } from "react-router-dom";
import { useAdminListUser } from "../../hooks/useAdminListUser";
import UnauthorizedAccess from "../NotFound/AuthError";
import { isAxiosError } from "axios";
import ErrorMessage from "../SystemDesign/ErrorMessage";
import Button from "../SystemDesign/Button";

export default function AdminPanel() {
  const { data, error, errorAuth, isLoading } = useAdminListUser();
  const admin = import.meta.env.VITE_ADMIN;
  const routeAdmin = `/${import.meta.env.VITE_ROUTE_ADMIN}/admin/menu`;

  return errorAuth.cause !== null ? (
    <UnauthorizedAccess errorAuth={errorAuth} />
  ) : (
    <div className="flex h-full w-full flex-col items-center gap-8 overflow-y-auto bg-slate-700 px-6 py-2">
      {error !== null && isAxiosError(error) && (
        <ErrorMessage>{error.response?.data.error}</ErrorMessage>
      )}
      {data !== undefined ? (
        <>
          <header className="flex items-center gap-8 rounded-lg bg-slate-500 px-6 py-3">
            <h2 className="text-xl text-white first-letter:text-3xl first-letter:text-lime-300">
              Admin Panel
            </h2>
            <Link to={routeAdmin}>
              <Button
                color="border-yellow-500 hover:bg-sky-700 bg-sky-200"
                mediaSize="md:w-40"
              >
                Return
              </Button>
            </Link>
          </header>
          <ul className="flex w-96 flex-col items-center justify-center gap-4 rounded-lg bg-slate-500 px-6 py-4">
            {data.map(user => {
              const id = user._id !== admin ? user._id : "Anonymous";
              return (
                <Link
                  to={`/${import.meta.env.VITE_ROUTE_ADMIN}/admin/${id}/data`}
                  key={id}
                  state={id}
                  className="flex w-52 items-center justify-center rounded-md bg-slate-100 px-4 py-2 shadow-md shadow-black/70 transition-all hover:scale-110"
                >
                  <li>{id}</li>
                </Link>
              );
            })}
          </ul>
        </>
      ) : isLoading ? (
        <h2>Loading Users...</h2>
      ) : (
        <h2>Error: There is no data to administrate</h2>
      )}
    </div>
  );
}
