import { marked } from "marked"; // Library that translate text to HTML
import { useEffect, useRef, useState } from "react"; // Function to save our App state
import { sanitizeInput } from "../utils/sanitize";
import { useLanguage } from "./useLanguage";

// Options for the parser, it makes carriage returns appear as <br/>
marked.use({
  gfm: true,
  breaks: true,
});

// Our custom hook that makes the work of manage the user input and translate it
export function useMarkdown() {
  // An example of markdown that displays at the start
  const sample = useLanguage({ project: "Markdown" })[22];
  const [markdown, setMarkdown] = useState(""); // Our initial state is the example markdown
  const [size, setSize] = useState<"min" | "max">("min");
  const modified = useRef(false);

  // Use effect to change the title of the page
  useEffect(() => {
    document.title = "Markdown Parser";
  }, []);
  // Use effect to set the example to user depending on what language they are
  useEffect(() => {
    // Only do it when user haven't modify it
    if (!modified.current) setMarkdown(sample);
  }, [sample]);

  const handleEditorChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdown(e.target.value); // Each time the user changes the textarea in the app, we save the change
    if (!modified.current) modified.current = true; // Indicate user modified the markdown
  };
  const deleteContent = () => {
    setMarkdown("");
    if (!modified.current) modified.current = true; // Indicate user modified the markdown
  };
  const changeCurrentSize = () => {
    if (size === "min") setSize("max");
    else setSize("min");
  };
  // Function that accepts a string and parse it to HTML Elements
  function translateMarkdown(input: string) {
    // But before parsing, sanitize the input
    const cleanInput = sanitizeInput(input);
    return marked.parse(cleanInput);
  }

  // Return the markdown, the parser and the function that change the markdown when textarea changes
  return {
    markdown,
    handleEditorChange,
    translateMarkdown,
    deleteContent,
    size,
    changeCurrentSize,
  };
}
