import { useMarkdown } from "../../hooks/useMarkdown"; // Our custom hook that manages the users input and translate it
import Expand from "../Icons/Expand";
import Minimize from "../Icons/Minimize";
const STYLES = {
  BASE: "w-full overflow-y-auto p-4 bg-white shadow-inner shadow-gray-300",
  A: "[&_a]:border-b-[1px] [&_a]:border-blue-400 [&_a]:text-blue-400",
  BLOCKQUOTE:
    "[&_blockquote]:mx-4 [&_blockquote]:my-2 [&_blockquote]:border [&_blockquote]:border-blue-100 [&_blockquote]:bg-sky-100 [&_blockquote]:bg-[url('/Quote.svg')] [&_blockquote]:bg-no-repeat [&_blockquote]:py-2 [&_blockquote]:pl-10 [&_blockquote]:text-blue-700 [&_blockquote]:shadow-lg [&_blockquote]:[background-position:1%_5%] md:[&_blockquote]:mx-[10%]",
  CODE: "[&_code]:bg-gray-300 [&_code]:text-xs",
  HEADERS:
    "[&_h1]:mb-4 [&_h1]:text-5xl [&_h2]:mb-4 [&_h2]:text-4xl [&_h3]:mb-3 [&_h3]:text-3xl [&_h4]:mb-3 [&_h4]:text-2xl [&_h5]:mb-2 [&_h5]:text-xl [&_h6]:mb-2 [&_h6]:text-lg",
  IMG: "[&_img]:mx-auto [&_img]:my-4 [&_img]:shadow-sm [&_img]:shadow-black [&_img~em]:block [&_img~em]:w-full [&_img~em]:text-center",
  OL: "[&_ol]:list-inside [&_ol]:list-decimal [&_ol]:pl-8 [&_ol_ol]:list-[upper-roman] [&_ol_ol_ol]:list-[upper-alpha]",
  PRE: "[&_pre]:bg-gray-300 [&_pre]:px-4 [&_pre]:py-1 [&_pre]:shadow-inner [&_pre]:shadow-gray-600",
  STRONG: "[&_p>strong]:text-red-400 [&_blockquote_p_strong]:text-blue-600",
  UL: "[&_ul]:list-inside [&_ul]:list-disc [&_ul]:pl-8 [&_ul_ul]:list-[circle] [&_ul_ul_ul]:list-[square]",
};

export default function Markdown() {
  const {
    markdown,
    handleEditorChange,
    translateMarkdown,
    deleteContent,
    changeCurrentSize,
    size,
  } = useMarkdown();
  const hide = size === "max" ? "hidden" : "";
  const previewHeight =
    hide === "hidden" ? "h-full shadow-none" : "h-2/5 md:h-3/5";
  return (
    <div className="flex h-full w-full flex-col items-center justify-around gap-4 bg-gradient-to-b from-lime-100 to-60%">
      <header
        className={`flex h-3/5 w-full flex-col items-center justify-center gap-4 px-6 py-2 md:h-2/5 md:flex-row ${hide}`}
      >
        <section className="w-full bg-white px-4 py-2 shadow-md md:w-1/3">
          <h1 className="font-sketch text-2xl">Markdown parser</h1>
          <p className="text-pretty">
            Enter your content in the next area, the results will be shown below
          </p>
          <div className="flex w-full items-center justify-center">
            <button
              onClick={deleteContent}
              className="my-1 rounded-full border border-amber-600 bg-amber-200 px-4 py-1 hover:bg-red-400 hover:text-slate-50"
            >
              Delete Content
            </button>
          </div>
        </section>
        <textarea
          name="editor"
          cols={60}
          rows={8}
          value={markdown}
          onChange={handleEditorChange}
          className="my-2 w-full resize-none border-none md:w-2/3"
        ></textarea>
      </header>
      <div className={`${previewHeight} ${STYLES.BASE}`}>
        <button
          className="group/expand absolute right-8 rounded-full bg-lime-500 p-2 transition-all hover:scale-110 hover:shadow-lg hover:shadow-lime-200"
          onClick={changeCurrentSize}
        >
          {size === "min" ? (
            <>
              <p className="absolute -left-14 bottom-3 hidden rounded-md bg-black/60 px-1 text-[10px] text-white group-hover/expand:block">
                Expand
              </p>
              <Expand styles={"text-white"} />
            </>
          ) : (
            <>
              <p className="absolute -left-14 bottom-3 hidden rounded-md bg-black/60 px-1 text-[10px] text-white group-hover/expand:block">
                Minimize
              </p>
              <Minimize styles={"text-white"} />
            </>
          )}
        </button>
        <main
          className={`flex flex-col gap-2 ${STYLES.A} ${STYLES.BLOCKQUOTE} ${STYLES.CODE} ${STYLES.HEADERS} ${STYLES.IMG} ${STYLES.OL} ${STYLES.PRE} ${STYLES.STRONG} ${STYLES.UL}`}
          dangerouslySetInnerHTML={{ __html: translateMarkdown(markdown) }}
        ></main>
      </div>
    </div>
  );
}
