import { useParams } from "react-router-dom";
import { useProfile } from "../../hooks/useProfile";
import { useBooks } from "../../hooks/useBooks";
import { isAxiosError } from "axios";
import CustomBackground from "../SystemDesign/CustomBackground";
import ErrorMessage from "../SystemDesign/ErrorMessage";
import HeaderExternalProfile from "./HeaderExternalProfile";
import ExternalBookList from "./ExternalBookList";
import SimpleNavMenu from "../Menu/SimpleNavMenu";
import FooterAttributionMultiple from "../SystemDesign/FooterAttributionMultiple";
import { ATTRIBUTION_PFP } from "../MyProfile/MyProfile";
import { useEffect } from "react";

export default function ExternalProfile() {
  const { id } = useParams(); // Get the ID from the parameters
  const externalUser = id ?? ""; // And get it as string for the custom hook
  const { data, error } = useProfile({ externalUser }); // Get the data of the user
  const { getExternalUserBooks } = useBooks({ externalUser }); // And the books
  const books = getExternalUserBooks.data;
  const errorBooks = getExternalUserBooks.error;

  // Use effect to change the title of the page
  useEffect(() => {
    document.title = `${externalUser}'s Profile - Code Dandelion`;
  }, []);

  // Return the profile of the user
  return (
    <CustomBackground
      styles="flex h-full w-full flex-col items-center justify-center gap-10 md:gap-0"
      bgImg="before:bg-[url('/profileBG.webp')] before:opacity-5 relative"
    >
      {error !== null && isAxiosError(error) && (
        <ErrorMessage>{error.response?.data.error}</ErrorMessage>
      )}
      {errorBooks !== null && isAxiosError(errorBooks) && (
        <ErrorMessage>{errorBooks.response?.data.error}</ErrorMessage>
      )}
      {data !== undefined ? (
        <>
          <header className="flex h-2/5 w-full gap-6 shadow-md shadow-black/20 lg:h-2/5">
            <HeaderExternalProfile data={data} />
          </header>
          <SimpleNavMenu positionNav="absolute left-16 top-[30%] sm:top-[25%] md:top-[30%] lg:top-[19.5%] md:right-2 z-20" />
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
          <FooterAttributionMultiple
            samePlace
            whatIsFrom1="Background Image by"
            placeRef1="on Freepik"
            extra1=" NACreative"
            urlRef1="https://www.freepik.com/free-vector/halftone-background-abstract-black-white-dots-shape_25976232.htm#query=dot%20pattern&position=3&from_view=search&track=ais&uuid=587b59f3-6554-41ba-8e64-dd0cab7d17ae"
            whatIsFrom2={
              ATTRIBUTION_PFP[data.img as keyof typeof ATTRIBUTION_PFP]
                .whatIsFrom2
            }
            placeRef2={
              ATTRIBUTION_PFP[data.img as keyof typeof ATTRIBUTION_PFP]
                .placeRef2
            }
            extra2={
              ATTRIBUTION_PFP[data.img as keyof typeof ATTRIBUTION_PFP].extra2
            }
            urlRef2={
              ATTRIBUTION_PFP[data.img as keyof typeof ATTRIBUTION_PFP]
                .whatIsFrom2
            }
          />
        </>
      ) : (
        error === null && <p>Loading user...</p>
      )}
    </CustomBackground>
  );
}
