import { type Quote } from "../types"; // Type to define the data from the API response

// Function that fetch the quotes from the API
export async function fetchQuotes() {
  const quotes: Quote[] = await fetch("https://dummyjson.com/quotes") // First we send a petition to fetch the data
    .then(res => {
      // Then if the response isn't ok, we send an error
      if (!res.ok) throw new Error("Error connecting to the API");
      return res.json(); // If it was successful, then we get the JSON from the response
    })
    .then(quoteJSON => {
      return quoteJSON.quotes; // Then we get the quotes from the JSON
    })
    .catch(err => {
      // If an error happens while fetching, we display that we can't find quotes
      throw new Error("Can't find quotes " + err);
    });

  return quotes; // Return the quotes to the component/hook that needs it
}
