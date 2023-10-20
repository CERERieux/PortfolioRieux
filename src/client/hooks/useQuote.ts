import { fetchQuotes } from "../services/quotes"; // Import the function that fetches quotes
import { useEffect, useState } from "react"; // Hooks from React
import { type Quote } from "../types"; // The "Quote" type to initialize the state of the quotes

export function useQuote() {
  const [quotes, setQuotes] = useState<Quote[]>([]); // We create a state for the quotes
  const [quoteIndex, setQuoteIndex] = useState(0); // And a state for the index of the quote array

  // We create a function that gets the quotes from the API and set the state with the response
  const getQuotes = () => {
    fetchQuotes().then(quotes => {
      setQuotes(quotes);
    });
  };

  // We put an useEffect that only runs on the mount of the component
  // It invokes the function that fetches the data only once
  useEffect(getQuotes, []);

  // Then we have a function that changes the index of the array where we have our quotes,
  // Since it's a state, when it changes, it re renders the App displaying the new fact.
  const getNewQuote = () => {
    // The index is between 0 and the number of quotes we have stored
    setQuoteIndex(Math.floor(Math.random() * quotes.length));
  };

  // Finally we return a single quote and the function that manages the logic to display a new quote
  return { quote: quotes[quoteIndex], getNewQuote };
}
