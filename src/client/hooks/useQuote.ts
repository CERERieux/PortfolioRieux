import { fetchQuotes } from "../services/quotes"; // Import the function that fetches quotes
import { useEffect, useState } from "react"; // Hooks from React
import { type Quote } from "../types"; // The "Quote" type to initialize the state of the quotes

export function useQuote() {
  const baseStyle =
    "grid h-full w-full grid-cols-1 place-items-center transition-colors duration-500"; // Base style for quote demo
  const [quotes, setQuotes] = useState<Quote[]>([]); // We create a state for the quotes
  const [styles, setStyles] = useState(baseStyle + "bg-rose-100"); // Full styles for the demo
  const [quoteIndex, setQuoteIndex] = useState(0); // And a state for the index of the quote array
  const colors = [
    "bg-stone-500",
    "bg-zinc-400",
    "bg-red-300",
    "bg-orange-300",
    "bg-amber-400",
    "bg-yellow-200",
    "bg-lime-300",
    "bg-green-300",
    "bg-teal-200",
    "bg-cyan-200",
    "bg-sky-300",
    "bg-indigo-300",
    "bg-purple-300",
    "bg-fuchsia-300",
    "bg-pink-300",
  ]; // Option color for background

  // We create a function that gets the quotes from the API and set the state with the response
  const getQuotes = () => {
    fetchQuotes().then(quotes => {
      setQuotes(quotes);
    });
  };

  // We put an useEffect that only runs on the mount of the component
  // It invokes the function that fetches the data only once
  useEffect(getQuotes, []);

  // We change the color each time we get a new quote from the array
  useEffect(() => {
    const indexColor = Math.floor(Math.random() * colors.length);
    setStyles(`${baseStyle} ${colors[indexColor]}`);
  }, [quoteIndex]);

  // Then we have a function that changes the index of the array where we have our quotes,
  // Since it's a state, when it changes, it re renders the App displaying the new fact.
  const getNewQuote = () => {
    // The index is between 0 and the number of quotes we have stored
    setQuoteIndex(Math.floor(Math.random() * quotes.length));
  };

  // Finally we return a single quote and the function that manages the logic to display a new quote
  return { quote: quotes[quoteIndex], getNewQuote, styles };
}
