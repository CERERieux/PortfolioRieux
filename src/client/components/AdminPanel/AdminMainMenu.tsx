import { Link } from "react-router-dom";
import Panel from "../SystemDesign/Panel";
import UserIcon from "../Icons/UserIcon";
import Book from "../Icons/Book";
import UnauthorizedAccess from "../NotFound/AuthError";
import { useAdminMenu } from "../../hooks/useAdminMenu";

export default function AdminMainMenu() {
  const { errorAuth } = useAdminMenu();

  const routeAdmin = `/${import.meta.env.VITE_ROUTE_ADMIN}/admin`;
  const svgStyle =
    "absolute scale-[0.3] -top-10 right-20 md:scale-100 md:opacity-30 md:right-0 md:top-2";
  const headerStyle =
    "py-1 text-center text-3xl md:pl-4 md:pt-12 md:text-left lg:pl-12";
  return errorAuth.cause !== null ? (
    <UnauthorizedAccess errorAuth={errorAuth} />
  ) : (
    <main className="flex h-full w-full flex-col gap-4 bg-slate-700 md:grid md:grid-cols-2 md:grid-rows-2 md:gap-10">
      <Panel
        bgColor="bg-lime-300 hover:bg-lime-200 transition-all duration-500"
        borderColor="border-lime-600 hover:border-lime-700"
        extraStyle="md:col-start-1 md:row-start-1 md:absolute md:bottom-0 right-0 hover:brightness-105 hover:drop-shadow-xl hover:shadow-lime-500"
      >
        <Link
          to={`${routeAdmin}/anonboard`}
          className="relative h-full w-full md:block"
        >
          <h2 className={`${headerStyle} text-center text-lime-800`}>
            Administrate Boards
          </h2>
          <Book size="128" styles={`${svgStyle} text-lime-800`} />
        </Link>
      </Panel>
      <Panel
        bgColor="bg-sky-300 hover:bg-sky-200 transition-all duration-500"
        borderColor="border-sky-600 hover:border-sky-700"
        extraStyle="md:col-start-2 md:row-start-1 md:absolute md:bottom-0 md:left-0 hover:brightness-105 hover:drop-shadow-xl hover:shadow-sky-500"
      >
        <Link
          to={`${routeAdmin}/users`}
          className="relative h-full w-full md:block"
        >
          <h2 className={`${headerStyle} text-center text-sky-800`}>
            Administrate Users
          </h2>
          <UserIcon size="128" styles={`${svgStyle} text-sky-800`} />
        </Link>
      </Panel>
    </main>
  );
}
