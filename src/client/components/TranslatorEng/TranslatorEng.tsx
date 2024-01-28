import { type FormEvent, type ChangeEvent, useState } from "react";
import type { TranslateResult } from "../../types";
import { sanitizeInput } from "../../utils/sanitize";

const AME_TO_BRIT = "american-to-british";
const BRIT_TO_AME = "british-to-american";
type mode = "american-to-british" | "british-to-american";

export default function TranslatorEng() {
  const [mode, setMode] = useState<mode>(AME_TO_BRIT);
  const [userInput, setUserInput] = useState("");
  const [error, setError] = useState("");
  const [translation, setTranslation] = useState("");
  const stylesFrom = "h-1/3 w-full bg-contain bg-left transition-all";
  const stylesTo = "h-1/3 w-full bg-contain bg-right transition-all";
  const usaFlag = "bg-[url('/USAFlag.svg')]";
  const ukFlag = "bg-[url('/UKFlag.svg')]";

  const handleForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const resultTranslation = await fetch("/cYSvQmg9kR/advanced/translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        locale: mode,
        text: userInput,
      }),
    }).then(async data => {
      if (data.ok) {
        const resultData: TranslateResult = await data.json();
        return resultData;
      }
      return { error: "Can't translate your text right now" };
    });

    if ("error" in resultTranslation) {
      setError(resultTranslation.error);
      setTranslation("");
    } else {
      setError("");
      setTranslation(resultTranslation.translation);
    }
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const handleMode = () => {
    if (mode === AME_TO_BRIT) setMode(BRIT_TO_AME);
    else setMode(AME_TO_BRIT);
  };

  return (
    <main className="flex h-full w-full flex-col place-items-center gap-6 overflow-y-scroll bg-slate-50 py-6">
      <h2 className="text-2xl">Translator American - British</h2>

      <label className="relative inline-flex cursor-pointer items-center">
        <input
          type="checkbox"
          className="peer sr-only"
          checked={mode !== AME_TO_BRIT}
          onChange={handleMode}
        />
        <div className="flex h-6 w-44 justify-between rounded-full bg-gray-200 pl-2.5 pr-[1.3rem] *:z-10 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-[5.4rem] after:rounded-full after:border after:border-gray-300 after:bg-slate-50 after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800 rtl:peer-checked:after:-translate-x-full [&:nth-child(1)]:[&_p]:opacity-100 peer-checked:[&:nth-child(1)]:[&_p]:opacity-60 [&:nth-child(2)]:[&_p]:opacity-60 peer-checked:[&:nth-child(2)]:[&_p]:opacity-100">
          <p className="">American</p>
          <p className="">British</p>
        </div>
        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
          Current mode
        </span>
      </label>

      <div className="flex h-full w-full flex-col gap-4 lg:flex-row lg:flex-wrap lg:px-4">
        <div
          className={`${stylesFrom} ${
            mode === AME_TO_BRIT ? usaFlag : ukFlag
          } shadow-sm lg:w-[49%]`}
        >
          <form
            onSubmit={handleForm}
            className="h-full w-full bg-gradient-to-r from-transparent to-white to-30% px-4 pt-3"
          >
            <label className="flex flex-col gap-4">
              <span className="ml-40 text-pretty px-2 py-1 lg:ml-48">
                Introduce the {mode === AME_TO_BRIT ? "american " : "british "}
                sentence you want to translate
                {mode === AME_TO_BRIT ? " (to british)" : " (to american)"}:
              </span>
              <input
                type="text"
                value={userInput}
                onChange={handleInput}
                name="translator"
                className="form-input mx-4 border-gray-300 bg-white/80"
                autoComplete="off"
              />
            </label>
          </form>
        </div>
        {error === "" && (
          <p className="order-1 w-full bg-red-100 px-4 py-2 text-center text-sm text-red-900 empty:hidden lg:h-10 lg:text-base">
            {error}
          </p>
        )}
        <section
          className={`${stylesTo} ${
            mode !== AME_TO_BRIT ? usaFlag : ukFlag
          } lg:w-[49%]`}
        >
          <div className="flex h-full w-full flex-col gap-2 bg-gradient-to-l from-transparent to-white to-30% px-5 py-8 shadow-sm">
            <h3 className="text-lg">Translated text:</h3>
            {translation !== "" ? (
              <p
                className="border border-gray-300 bg-gradient-to-l from-white/85 from-10% px-4 py-1 [-webkit-text-stroke:0.05px_white] lg:my-4 [&_span]:text-lime-600"
                dangerouslySetInnerHTML={{ __html: sanitizeInput(translation) }}
              ></p>
            ) : (
              <p className="mx-3 border border-gray-300 bg-gradient-to-l from-white/85 from-10% px-4 py-1 [-webkit-text-stroke:0.05px_white] lg:my-5 ">
                Your result will be shown here!
              </p>
            )}
          </div>
        </section>
        <article className="order-2 h-1/3 w-full px-2 md:px-4 lg:order-none">
          <h3 className="mb-2 bg-gradient-to-r from-zinc-800 pl-3 italic text-slate-50">
            Examples:
          </h3>
          <div className="flex flex-col justify-around gap-4 pl-3 md:flex-row">
            <article className="">
              <h4 className="mb-1 bg-gradient-to-r from-amber-200 pl-3">
                American to British
              </h4>
              <ul className="list-inside text-pretty px-2 text-sm [list-style-type:'-_'] *:[&_span]:text-lime-600">
                <li>
                  Mangoes are my favorite fruit. <b className="text-lg"> → </b>{" "}
                  Mangoes are my{" "}
                  <span>
                    <b>favourite</b>
                  </span>{" "}
                  fruit.
                </li>
                <li>
                  Like a high tech Rube Goldberg machine.{" "}
                  <b className="text-lg"> → </b> Like a high tech{" "}
                  <span>
                    <b>Heath Robinson device</b>
                  </span>
                  .
                </li>
                <li>
                  To play hooky means to skip class or work.{" "}
                  <b className="text-lg"> → </b> To{" "}
                  <span>
                    <b>bunk off</b>{" "}
                  </span>
                  means to skip class or work.
                </li>
              </ul>
            </article>
            <article className="">
              <h4 className="mb-1 bg-gradient-to-r from-amber-200 pl-3">
                British to American
              </h4>
              <ul className="list-inside text-pretty px-2 text-sm [list-style-type:'-_'] *:[&_span]:text-lime-600">
                <li>
                  We watched the footie match for a while.{" "}
                  <b className="text-lg"> → </b> We watched the{" "}
                  <span>
                    <b>soccer</b>
                  </span>{" "}
                  match for a while.
                </li>
                <li>
                  I had a bicky then went to the chippy.{" "}
                  <b className="text-lg"> → </b> I had a{" "}
                  <span>
                    <b>cookie </b>
                  </span>
                  then went to the{" "}
                  <span>
                    <b>fish-and-chip shop</b>
                  </span>
                  .
                </li>
                <li>
                  I&apos;ve just got bits and bobs in my bum bag.{" "}
                  <b className="text-lg"> → </b> I&apos;ve just got{" "}
                  <span>
                    <b>odds and ends </b>
                  </span>
                  in my{" "}
                  <span>
                    <b>fanny pack</b>
                  </span>
                  .
                </li>
              </ul>
            </article>
          </div>
        </article>
      </div>
    </main>
  );
}
