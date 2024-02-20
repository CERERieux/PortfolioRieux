import { Link } from "react-router-dom";
import LinkUrl from "../Icons/LinkUrl";
import Panel from "../SystemDesign/Panel";
import Note from "../Icons/Note";
import MessageReport from "../Icons/MessageReport";
import Book from "../Icons/Book";

export default function ProfileMenu() {
  // Auxiliars to save the styles that all the headers and svg need
  const headerStyle =
    "py-1 text-center text-3xl md:pl-4 md:pt-12 md:text-left lg:pl-12";
  const svgStyle =
    "absolute scale-[0.3] -top-10 right-20 md:scale-100 md:opacity-30 md:right-0 md:top-2";
  // Return the main panel that will redirect user to the corresponding service
  return (
    <main className="flex h-full w-full flex-col gap-4 md:grid md:grid-cols-2 md:grid-rows-2 md:gap-10">
      <Panel
        bgColor="bg-lime-300"
        borderColor="border-lime-600"
        extraStyle="md:col-start-1 md:row-start-1 md:absolute md:bottom-0 right-0"
      >
        <Link
          to="/my-profile/library"
          className="relative h-full w-full md:block"
        >
          <h2 className={`${headerStyle} text-lime-800`}>Library</h2>
          <Book size="128" styles={`${svgStyle} text-lime-800`} />
        </Link>
      </Panel>
      <Panel
        bgColor="bg-sky-300"
        borderColor="border-sky-600"
        extraStyle="md:col-start-2 md:row-start-1 md:absolute md:bottom-0 md:left-0"
      >
        <Link
          to="/my-profile/exercises"
          className="relative h-full w-full md:block"
        >
          <h2 className={`${headerStyle} text-sky-800`}>Notes</h2>
          <Note size="128" styles={`${svgStyle} text-sky-800`} />
        </Link>
      </Panel>
      <Panel
        bgColor="bg-amber-300"
        borderColor="border-amber-600"
        extraStyle="md:col-start-1 md:row-start-2 md:absolute md:top-0 md:right-0"
      >
        <Link to="/my-profile/urls" className="relative h-full w-full md:block">
          <h2 className={`${headerStyle} text-amber-800`}>URLs</h2>
          <LinkUrl size="128" styles={`${svgStyle} text-amber-800`} />
        </Link>
      </Panel>
      <Panel
        bgColor="bg-red-300"
        borderColor="border-red-600"
        extraStyle="md:col-start-2 md:row-start-2 md:absolute md:top-0 md:left-0"
      >
        <Link
          to="/my-profile/issues"
          className="relative h-full w-full md:block"
        >
          <h2 className={`${headerStyle} text-red-800`}>Issues</h2>
          <MessageReport size="128" styles={`${svgStyle} text-red-800`} />
        </Link>
      </Panel>
    </main>
  );
}
