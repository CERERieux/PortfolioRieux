import { useEffect, useState } from "react";
import { useUser } from "../../store/user";
import FormUrlAll from "./FormUrlAll";
import CustomBackground from "../SystemDesign/CustomBackground";
import SimpleNavMenu from "../Menu/SimpleNavMenu";
import { SHORTURL } from "../Url/Url";

export default function ShortenerUrl() {
  const [shortUrl, setShortUrl] = useState(""); // State to save the short url if adding was successful
  const [originalUrl, setOriginalUrl] = useState(""); // State to save the original url if adding was successful
  const [error, setError] = useState(""); // State to show an error if there is one
  const [opacity, setOpacity] = useState("opacity-0 translate-x-32");
  const { token } = useUser(); // Token if user is logged in to save it into their user
  // Auxiliar to give style to almost all the boxes
  const bgStyle =
    "rounded-lg border border-x-2 border-y-2 border-slate-50 bg-black/70";

  useEffect(() => {
    setTimeout(() => {
      setOpacity("opacity-100 translate-x-0");
    }, 100);
  }, []);

  // Return the component to shortener Links
  return (
    <CustomBackground
      bgImg="before:bg-[url('/bgLinks.webp')] before:opacity-90"
      styles="flex h-full w-full flex-col items-center justify-start gap-8 px-4 py-2 font-digitalDisplay overflow-y-auto text-slate-50"
    >
      <h1
        className={`text-center text-3xl first-letter:text-4xl first-letter:text-yellow-200`}
      >
        Shortener URL
      </h1>
      <header
        className={`h-[230px] rounded-lg border border-slate-300 bg-black/50 p-4 text-sm backdrop-blur-sm transition-all ${opacity} duration-1000 ease-in-out`}
      >
        <p className="-mt-1 text-center text-yellow-100">
          <span className="text-base text-sky-200">
            Welcome to my shortener of links!
          </span>{" "}
          <br />
          Here you can send me your very <i>very</i> long link and I&apos;ll
          send you in return a short link. <br />
          The way to use it,{" "}
          <span className="text-red-100">
            you have to go to <b className="text-sky-100">{SHORTURL}</b> and add
            your short Link at the end!
          </span>
          <br />
          This way you can share those tedious and long links in a shorter way!
        </p>
        <p className="mt-2 text-center text-lime-100">
          Oh! And if you have an account in my portfolio and you are logged in,{" "}
          <br /> your can view all the short links you have made so you
          don&apos;t have to remember each one of them!
        </p>
        <p className="mt-2 text-center text-slate-50">
          Don&apos;t worry, I don&apos;t collect any personal data or I do not
          do any way of tracking with this tool. <br />I only did it because I
          thought would be nice to learn how to do my personal shortener link
          and use it from time to time. <br />
          Remeber to be careful with links on internet! <br />
        </p>
      </header>
      <SimpleNavMenu />
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
