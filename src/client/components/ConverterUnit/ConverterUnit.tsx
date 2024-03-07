import useConverter from "../../hooks/useConverter";

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

  return (
    <main className="flex h-full w-full flex-col items-center justify-center gap-6 bg-red-50">
      <div className="border border-x-0 border-red-200 bg-slate-50 py-10 shadow-inner shadow-red-200 md:w-2/3 md:border-x-[1px]">
        <form
          onSubmit={handleConversion}
          className="flex w-full flex-col items-center gap-4"
        >
          <section className="flex w-full flex-wrap items-end justify-center gap-5">
            <h2 className="w-full text-center text-lg">
              What you want to convert?
            </h2>
            <p className="-mt-2 mb-2 w-full text-center text-sm">
              (If input is left empty, it will be taken as the base unit.)
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
                className="border-x-0 border-b-2 border-t-0 border-blue-600 py-0 text-center"
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
            Convert
          </button>
        </form>
        <div className="mt-8 flex w-full items-center justify-center px-4">
          <section className="w-full md:w-2/3 lg:w-1/2">
            <h3 className="w-full text-lg">Result:</h3>
            {conversion !== "" ? (
              <p className="px-2 text-sm text-lime-700">
                <b>{conversion}</b>
              </p>
            ) : error === "" ? (
              <p className="px-2 text-sm text-lime-700">
                Your result will be shown here!
              </p>
            ) : (
              <div className="w-full bg-blue-200">
                <p className="px-4 py-1 text-center text-sm text-blue-800">
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
