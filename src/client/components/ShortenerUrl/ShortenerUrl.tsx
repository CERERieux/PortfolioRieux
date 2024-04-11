import { useEffect, useState } from "react";
import { useUser } from "../../store/user";
import FormUrlAll from "./FormUrlAll";
import CustomBackground from "../SystemDesign/CustomBackground";
import SimpleNavMenu from "../Menu/SimpleNavMenu";
import { SHORTURL } from "../Url/Url";
import { useLanguage } from "../../hooks/useLanguage";

export default function ShortenerUrl() {
  const [shortUrl, setShortUrl] = useState(""); // State to save the short url if adding was successful
  const [originalUrl, setOriginalUrl] = useState(""); // State to save the original url if adding was successful
  const [error, setError] = useState(""); // State to show an error if there is one
  const [opacity, setOpacity] = useState("opacity-0 translate-x-32");
  const { token } = useUser(); // Token if user is logged in to save it into their user
  // Auxiliar to give style to almost all the boxes
  const bgStyle =
    "rounded-lg border border-x-2 border-y-2 border-slate-50 bg-black/70";
  const text = useLanguage({ project: "Shortener" });

  // Use effect to change the title of the page
  useEffect(() => {
    document.title = "Shortener URL";
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setOpacity("opacity-100 translate-x-0");
    }, 100);
  }, []);

  // Return the component to shortener Links
  return (
    <CustomBackground
      bgImg="before:bg-[url('/bgLinks.webp')] before:opacity-90"
      styles="flex h-full w-full flex-col items-center justify-start gap-6 px-4 py-2 font-digitalDisplay overflow-y-auto text-slate-50"
    >
      <h1
        className={`text-center text-3xl first-letter:text-4xl first-letter:text-yellow-200`}
      >
        {text[0]}
      </h1>
      <header
        className={`rounded-lg border border-slate-300 bg-black/50 p-4 text-sm backdrop-blur-sm transition-all ${opacity} duration-1000 ease-in-out`}
      >
        <p className="-mt-1 whitespace-pre-wrap text-center text-yellow-100">
          <span className="text-base text-sky-200">{text[1]}</span> <br />
          {text[2]}
          <i>{text[3]}</i>
          {text[4]}
          <span className="text-red-100">
            {text[5]}
            <b className="text-sky-100">{SHORTURL}</b>
            {text[6]}
          </span>
          <br />
          {text[7]}
        </p>
        <p className="mt-2 whitespace-pre-wrap text-center text-lime-100">
          {text[8]}
        </p>
        <p className="mt-2 whitespace-pre-wrap text-center text-slate-50">
          {text[9]}
        </p>
      </header>
      <SimpleNavMenu positionNav="top-0 right-4 absolute" />
      <section className={` px-8 py-4 ${bgStyle}`}>
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
            {text[10]}
            <span className="pl-4 text-lg text-lime-400">
              <b>{shortUrl}</b>
            </span>
          </h2>
          <p className="text-sm first-letter:text-lg first-letter:text-yellow-200">
            {text[11]}
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
