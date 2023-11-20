import { useMarkdown } from "../../hooks/useMarkdown"  // Our custom hook that manages the users input and translate it

export default function Markdown() {
    const { markdown, handleEditorChange, translateMarkdown } = useMarkdown()

    return (
        <div className="marked">
            <header className="input-markdown">
                <textarea
                    name="editor"
                    id="editor"
                    cols={60}
                    rows={10}
                    value={markdown}
                    onChange={handleEditorChange}></textarea>
            </header>
            <main
                className="preview"
                id='preview'
                dangerouslySetInnerHTML={{ __html: translateMarkdown(markdown) }}>
            </main>
        </div >
    )
}