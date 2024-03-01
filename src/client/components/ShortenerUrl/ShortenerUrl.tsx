import { useState } from "react";
import { useUser } from "../../store/user";
import FormUrlAll from "./FormUrlAll";
import CustomBackground from "../SystemDesign/CustomBackground";

export default function ShortenerUrl() {
  const [shortUrl, setShortUrl] = useState(""); // State to save the short url if adding was successful
  const [originalUrl, setOriginalUrl] = useState(""); // State to save the original url if adding was successful
  const [error, setError] = useState(""); // State to show an error if there is one
  const { token } = useUser(); // Token if user is logged in to save it into their user
  // Auxiliar to give style to almost all the boxes
  const bgStyle =
    "rounded-lg border border-x-2 border-y-2 border-slate-50 bg-black/70";

  // Return the component to shortener Links
  return (
    <CustomBackground
      bgImg="before:bg-[url('/bgLinks.jpg')] before:opacity-90"
      styles="flex h-full w-full flex-col items-center justify-start gap-8 px-4 py-2 font-digitalDisplay overflow-y-auto text-slate-50"
    >
      <header>
        <h1 className="text-3xl first-letter:text-4xl first-letter:text-yellow-200">
          Shortener URL
        </h1>
        <p>{`Here you can get a short link through my "service".`}</p>
      </header>
      <section className={`h-1/4 px-8 py-4 ${bgStyle}`}>
        <FormUrlAll
          setError={setError}
          setShortUrl={setShortUrl}
          setOriginalUrl={setOriginalUrl}
          token={token}
        />
      </section>
      {shortUrl !== "" && (
        <article className={`w-full md:w-1/2 ${bgStyle} break-words px-4 py-2`}>
          <h2 className="text-xl first-letter:text-2xl first-letter:text-yellow-200">
            Short URL:
            <span className="pl-4 text-lg text-lime-400">
              <b>{shortUrl}</b>
            </span>
          </h2>
          <p className="text-sm first-letter:text-lg first-letter:text-yellow-200">
            Original Url:
            <span className="pl-4 text-lime-400">{originalUrl}</span>
          </p>
        </article>
      )}
      {error !== "" && (
        <article className="rounded-lg border border-x-2 border-y-2 border-slate-50 bg-red-500/80 px-8 py-4">
          <h2 className="text-xl first-letter:text-2xl first-letter:text-red-100">
            Error:
          </h2>
          <p>
            <b>{error}</b>
          </p>
        </article>
      )}
    </CustomBackground>
  );
}
