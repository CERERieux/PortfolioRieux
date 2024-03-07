import { useParams } from "react-router-dom";
import { useProfile } from "../../hooks/useProfile";
import { useBooks } from "../../hooks/useBooks";
import { isAxiosError } from "axios";
import CustomBackground from "../SystemDesign/CustomBackground";
import ErrorMessage from "../SystemDesign/ErrorMessage";
import HeaderExternalProfile from "./HeaderExternalProfile";
import ExternalBookList from "./ExternalBookList";

export default function ExternalProfile() {
  const { id } = useParams(); // Get the ID from the parameters
  const externalUser = id ?? ""; // And get it as string for the custom hook
  const { data, error } = useProfile({ externalUser }); // Get the data of the user
  const { getExternalUserBooks } = useBooks({ externalUser }); // And the books
  const books = getExternalUserBooks.data;
  const errorBooks = getExternalUserBooks.error;

  // Return the profile of the user
  return (
    <CustomBackground
      styles="flex h-full w-full flex-col items-center justify-center gap-10 md:gap-0"
      bgImg="before:bg-[url('/profileBG.jpg')] before:opacity-5"
    >
      {error !== null && isAxiosError(error) && (
        <ErrorMessage extraStyles="md:left-1/4 z-10">
          {error.response?.data.error}
        </ErrorMessage>
      )}
      {errorBooks !== null && isAxiosError(errorBooks) && (
        <ErrorMessage extraStyles="md:left-1/4 z-10">
          {errorBooks.response?.data.error}
        </ErrorMessage>
      )}
      {data !== undefined ? (
        <>
          <header className="flex h-2/5 w-full gap-6 shadow-md shadow-black/20 lg:h-2/5">
            <HeaderExternalProfile data={data} />
          </header>
          <main className="relative flex h-full w-full flex-col gap-4 overflow-y-auto px-6 py-4">
            {books !== undefined ? (
              !("error" in books) ? (
                <ExternalBookList data={books} />
              ) : (
                <h2 className="rounded-sm px-4 py-1 text-center font-elegant text-4xl first-letter:text-5xl first-letter:text-red-500">
                  Looks like this user hasn&apos;t put any book in their
                  library.
                </h2>
              )
            ) : (
              errorBooks === null && (
                <p className="rounded-sm px-4 py-1 text-center font-elegant text-4xl first-letter:text-5xl first-letter:text-red-500">
                  Loading user library...
                </p>
              )
            )}
          </main>
        </>
      ) : (
        error === null && <p>Loading user...</p>
      )}
    </CustomBackground>
  );
}