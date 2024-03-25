import { marked } from "marked"; // Library that translate text to HTML
import { useEffect, useState } from "react"; // Function to save our App state
import { sanitizeInput } from "../utils/sanitize";

// An example of markdown that displays at the start
const PREVIEW_TEXT = `# Markdown Parser
## A preview of what you can do with Markdown!

You can put a link that send you to a Youtube video: [OMORI - Forest Frenzy](https://www.youtube.com/watch?v=r4XqG6nnvkY).
(**Note:** This link will not open a new window...)  

You can put a bit of code, look: \`let x = 9\`.

\`\`\`
// You can also do a multi-line code:
function anotherExample(firstLine, lastLine) {
    if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
        return multiLineCode;
    }
}
\`\`\`

An unordered list item:
- Flowers
- Sugar
  - Brown
  - Refined
  - Colored
- Eggs

An ordered list item:
1. Please break the egg and separate the yolk.
2. Mix with flour until you have a solid dough.

A blockquote:
>A person who never made a mistake never tried anything new 
*-Albert Einstein*

An image of mountains:
![The Everest](https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Everest_North_Face_toward_Base_Camp_Tibet_Luca_Galuzzi_2006.jpg/1024px-Everest_North_Face_toward_Base_Camp_Tibet_Luca_Galuzzi_2006.jpg)*A stunning view of a mountain.*`;

// Options for the parser, it makes carriage returns appear as <br/>
marked.use({
  gfm: true,
  breaks: true,
});

// Our custom hook that makes the work of manage the user input and translate it
export function useMarkdown() {
  const [markdown, setMarkdown] = useState(PREVIEW_TEXT); // Our initial state is the example markdown
  const [size, setSize] = useState<"min" | "max">("min");

  // Use effect to change the title of the page
  useEffect(() => {
    document.title = "Markdown Parser";
  }, []);

  const handleEditorChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdown(e.target.value); // Each time the user changes the textarea in the app, we save the change
  };
  const deleteContent = () => {
    setMarkdown("");
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
