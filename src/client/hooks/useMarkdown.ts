import { marked } from "marked"; // Library that translate text to HTML
import { useState } from "react"; // Function to save our App state

// An example of markdown that displays at the start
const PREVIEW_TEXT = `# Header size H1
## Header size H2
A link that send you to a [Youtube page](https://www.youtube.com/watch?v=r4XqG6nnvkY).
We put a bit of code, look: \`let x = 9\`.

\`\`\`
// this is multi-line code:
function anotherExample(firstLine, lastLine) {
    if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
        return multiLineCode;
    }
}
\`\`\`

A list item:
- 1 item
- 2 items

A blockquote:
>Look, I'm  inside a **blockquote**

An image of mountains:
![The Everest](https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Everest_North_Face_toward_Base_Camp_Tibet_Luca_Galuzzi_2006.jpg/1024px-Everest_North_Face_toward_Base_Camp_Tibet_Luca_Galuzzi_2006.jpg)`;

// Options for the parser, it makes carriage returns appear as <br/>
marked.use({
  gfm: true,
  breaks: true,
});

// Our custom hook that makes the work of manage the user input and translate it
export function useMarkdown() {
  const [markdown, setMarkdown] = useState(PREVIEW_TEXT); // Our initial state is the example markdown
  const handleEditorChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdown(e.target.value); // Each time the user changes the textarea in the app, we save the change
  };

  // Function that accepts a string and parse it to HTML Elements
  // TODO: Clean the user's input so it can't do malicious stuff
  function translateMarkdown(input: string) {
    return marked.parse(input);
  }

  // Return the markdown, the parser and the function that change the markdown when textarea changes
  return { markdown, handleEditorChange, translateMarkdown };
}
