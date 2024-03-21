import { isAxiosError } from "axios";
import { useEffect, useState } from "react";
import { useUrlProfile } from "../../hooks/useUrlProfile";
import UnauthorizedAccess from "../NotFound/AuthError";
import NavMenu from "../MyProfile/NavMenu";
import ErrorMessage from "../SystemDesign/ErrorMessage";
import ActionMessage from "../SystemDesign/ActionMessage";
import AddUrlForm from "./AddUrlForm";
import Button from "../SystemDesign/Button";
import AddLink from "../Icons/AddLink";
import CustomBackground from "../SystemDesign/CustomBackground";
import UrlsTable from "./UrlsTable";
import FooterAttribution from "../SystemDesign/FooterAttribution";

export const SHORTURL = window.location.href.split("/")[2] + "/url/"; // Auxiliar to know the URL of the domain and use it

export default function Url() {
  const { addUrl, newLink, data, error, errorAuth, removeUrl, deleteLink } =
    useUrlProfile(); // Custom hook to get user short Links
  // 2 states to display results of user actions
  const [action, setAction] = useState<string | null>(null);
  const [localError, setLocalError] = useState<string | null>(null);
  const isError = errorAuth.cause !== null; // Auxiliar to be clearer on display condition at the start
  const idOpen = "OpenCreateUserLinkDialog"; // Auxiliar for id of the button that open a dialog

  // Effect that activates when user remove an url from the table
  useEffect(() => {
    // Check if removal was completed
    if (removeUrl.isSuccess) {
      // If it was completed, check if there wasn't an error
      if (!("error" in removeUrl.data)) {
        // If it was a success, display action for 2 seconds
        setLocalError(null);
        setAction("Your URL was removed from your list!");
        setTimeout(() => {
          setAction(null);
        }, 2000);
      } else {
        // If error happened, show it for 3 seconds
        setAction(null);
        setLocalError(removeUrl.data.error);
        setTimeout(() => {
          setLocalError(null);
        }, 3000);
      }
    } else if (removeUrl.isError) {
      // If removal was incomplete due an error, get the error
      const { error } = removeUrl;
      if (isAxiosError(error)) {
        setLocalError(error.response?.data.error);
      } else {
        // If axios can't cover the error, show a generic message
        setLocalError(
          "Something went wrong at removing your URL from the list...",
        );
      }
      // And show it for 3 seconds
      setTimeout(() => {
        setLocalError(null);
      }, 3000);
    }
  }, [removeUrl.isSuccess]);

  // Auxiliar function to remove a link from user table
  const handleDelete = (id: string) => {
    deleteLink(id);
  };

  // Component that display Unauthorized Access if user isn't logged in or the table that contains all the user links
  return isError ? (
    <UnauthorizedAccess errorAuth={errorAuth} />
  ) : (
    <CustomBackground
      bgImg="before:bg-[url('/bgLinks.webp')] before:opacity-90"
      styles="flex h-full w-full flex-col items-center justify-start gap-8 px-4 py-2 font-digitalDisplay overflow-y-auto text-slate-50"
    >
      <NavMenu flexCol />
      {error !== null && isAxiosError(error) && (
        <ErrorMessage>{error.response?.data.error}</ErrorMessage>
      )}
      {localError !== null && <ErrorMessage>{localError}</ErrorMessage>}
      {action !== null && <ActionMessage>{action}</ActionMessage>}
      <header className="bg- flex flex-col items-center justify-center gap-4">
        <h1 className="text-4xl first-letter:text-5xl first-letter:text-amber-500">
          Your short links!
        </h1>
        <Button
          color="bg-slate-300 border-slate-500 hover:bg-yellow-700 hover:border-yellow-300"
          xSize="w-44"
          extraStyles="flex gap-2 justify-center items-center text-black"
          id={idOpen}
        >
          <AddLink />
          Add a new Link
        </Button>
      </header>
      <main className="flex w-full flex-col items-center gap-4">
        <AddUrlForm
          addUrl={addUrl}
          idOpen={idOpen}
          newLink={newLink}
          setAction={setAction}
          setLocalError={setLocalError}
        />
        <p>
          <span className="text-lg text-yellow-300">Remember: </span>
          To use your short link, you have to add it at the end of{" "}
          <span className="text-lg italic text-yellow-300 underline">
            {SHORTURL}
          </span>
        </p>
        {data !== undefined ? (
          !("error" in data) ? (
            <UrlsTable data={data} handleDelete={handleDelete} />
          ) : (
            <h2 className="text-xl first-letter:text-2xl first-letter:text-amber-500">
              {data.error}
            </h2>
          )
        ) : (
          !isError && <p>Loading...</p>
        )}
      </main>
      <FooterAttribution
        placeRef="Pixabay."
        urlRef="https://www.pexels.com/photo/plants-under-starry-sky-355887/"
        whatIs="Photo by"
      />
    </CustomBackground>
  );
}
