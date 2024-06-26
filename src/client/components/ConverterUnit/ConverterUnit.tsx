import useConverter from "../../hooks/useConverter";
import { useLanguage } from "../../hooks/useLanguage";
import SimpleNavMenu from "../Menu/SimpleNavMenu";

export default function ConverterUnit() {
  const {
    conversion,
    error,
    handleConversion,
    handleUserInput,
    handleUserUnit,
    userInput,
    userUnit,
  } = useConverter();
  const text = useLanguage({ project: "Converter" });
  return (
    <main className="flex h-full w-full flex-col items-center justify-center gap-6 [background:_linear-gradient(110deg,rgba(250,248,142,.8),rgba(250,248,142,0)_35%),_linear-gradient(15deg,rgba(103,232,249,.8),rgba(103,232,249,0)_20%),_linear-gradient(192deg,rgba(216,180,254,.8),rgba(216,180,254,0)_30%),_linear-gradient(298deg,rgba(207,250,142,.8),rgba(207,250,142,0)_20%),_linear-gradient(325deg,rgba(207,207,207,.8),rgba(207,207,207,0)_50%),_linear-gradient(120deg,rgba(252,212,213,.8),rgba(252,212,213,0)_50%)]">
      <div className="absolute h-full w-full dark:bg-black/20"></div>
      <SimpleNavMenu />
      <div className="border bg-slate-50/30 py-10 shadow-lg shadow-black/10 backdrop-blur-md md:w-2/3 md:border-x-[1px] dark:bg-slate-900/40">
        <form
          onSubmit={handleConversion}
          className="flex w-full flex-col items-center gap-4"
        >
          <section className="flex w-full flex-wrap items-end justify-center gap-5">
            <h2 className="w-full text-center text-xl first-letter:text-2xl first-letter:text-lime-600 dark:text-slate-100 dark:first-letter:text-lime-300">
              {text[0]}
            </h2>
            <p className="-mt-2 mb-2 w-full text-center text-sm text-orange-500 dark:text-orange-200">
              {text[1]}
            </p>
            <label className="">
              <input
                type="text"
                name="Converter"
                value={userInput}
                onChange={handleUserInput}
                className="border-x-0 border-b-2 border-t-0 border-blue-600 py-0 pb-0 text-center"
                autoComplete="off"
              />
            </label>
            <label className="">
              <select
                name="ConvertOptions"
                value={userUnit}
                onChange={handleUserUnit}
                className="border-x-0 border-b-2 border-t-0 border-blue-600 py-0 text-center dark:*:bg-slate-700 dark:*:text-white"
              >
                <option value="l">L → Gal</option>
                <option value="gal">Gal → L</option>
                <option value="km">Km → Mi</option>
                <option value="mi">Mi → Km</option>
                <option value="kg">Kg → Lbs</option>
                <option value="lbs">Lbs → Kg</option>
              </select>
            </label>
          </section>
          <button className="w-2/5 border border-sky-500 bg-gradient-to-b from-sky-100 from-10% via-sky-300 via-65% to-sky-500 py-1 hover:border-blue-600 hover:from-blue-100 hover:from-10% hover:via-blue-300 hover:via-65% hover:to-blue-500 hover:brightness-95 md:w-1/4">
            {text[2]}
          </button>
        </form>
        <div className="mt-8 flex w-full items-center justify-center px-4">
          <section className="w-full md:w-2/3 lg:w-1/2">
            <h3 className="w-full text-lg dark:text-slate-100">{text[3]}</h3>
            {conversion !== "" ? (
              <p className="px-2 text-sm text-lime-700 dark:text-lime-200">
                <b>{conversion}</b>
              </p>
            ) : error === "" ? (
              <p className="px-2 text-sm text-lime-700 dark:text-lime-200">
                {text[4]}
              </p>
            ) : (
              <div className="w-full bg-blue-200 dark:bg-blue-800">
                <p className="px-4 py-1 text-center text-sm text-blue-800 dark:text-blue-200">
                  <b>{error}</b>
                </p>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
