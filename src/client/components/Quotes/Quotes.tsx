import { useQuote } from "../../hooks/useQuote"; // Import a custom hook to manage the quotes

export default function Quote() {
  const { quote, getNewQuote, styles } = useQuote(); // Bring a quote and a function that returns a new quote from the hook

  // Function that handle the user's input when they do click in the button
  const handleChangeQuote = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent the default action of the button
    getNewQuote(); // Get a new quote to display
  };

  return (
    <main className={styles}>
      <section className="md: flex h-1/2 w-2/3 flex-col items-center justify-center gap-4 rounded-lg border border-slate-400 bg-slate-50 shadow-sm shadow-gray-400 md:h-[35%] md:w-1/2 md:justify-around md:gap-3 md:py-4 lg:w-5/12">
        <h4 className="h-2/5 w-5/6 text-pretty text-center md:h-1/2 md:w-11/12">
          {quote?.quote}
        </h4>
        <p className="pt-10 md:pt-0">{quote?.author}</p>
        <button
          onClick={handleChangeQuote}
          className="rounded-full bg-zinc-800 px-4 py-2 text-zinc-200 hover:bg-zinc-600 hover:brightness-110"
        >
          New Quote
        </button>
      </section>
    </main>
  );
}
