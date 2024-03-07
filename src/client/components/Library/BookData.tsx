import type { SingleBook } from "../../types";
import TrashCan from "../Icons/TrashCan";
import ActionButton from "../SystemDesign/ActionButton";

interface BookDataProps {
  data: SingleBook;
  emptyNotes: boolean;
  isDeletePending: boolean;
  handleDeleteNote: (number: string) => void;
}

export default function BookData({
  data,
  emptyNotes,
  handleDeleteNote,
  isDeletePending,
}: BookDataProps) {
  const cRecommend =
    data.recommend === undefined
      ? "text-black"
      : data.recommend
      ? "text-sky-500"
      : "text-red-500"; // Auxiliar to give color to recommendation
  // Return the main info that is in the right side
  return (
    <section className="flex flex-col justify-center gap-2">
      <h2 className="text-pretty text-center font-elegant text-3xl first-letter:text-5xl first-letter:text-red-500">
        {data.title}
      </h2>
      <p className="text-center italic first-letter:text-xl first-letter:text-red-500">
        {data.status}
      </p>
      <p className="first-letter:text-xl first-letter:text-red-500">Review: </p>
      <p
        className={`whitespace-pre-wrap text-pretty border border-black/25 bg-white/70 px-3 py-2 text-sm shadow-sm shadow-black/30`}
      >
        {data.review !== "" ? data.review : "You haven't review this book."}
      </p>
      <p className="first-letter:text-xl first-letter:text-red-500">
        Do you recommend it?{" "}
        <span className={`ml-3 text-lg italic underline ${cRecommend}`}>
          {data.recommend === undefined
            ? "I can't say"
            : data.recommend
            ? "Yes"
            : "No"}
        </span>
      </p>
      <p className="first-letter:text-xl first-letter:text-red-500">Notes: </p>
      <ul className="mb-6 flex flex-col gap-2 rounded-xl bg-white px-4 py-2 shadow-inner shadow-black/40">
        {emptyNotes && "Here will appear the notes you add to your book!"}
        {data.notes.map((note, i) => {
          if (note !== "")
            return (
              <li
                key={i}
                className="relative rounded-md border border-black/25 px-2 py-1 pr-10 shadow-sm shadow-black/25"
              >
                {note}
                <ActionButton
                  coverColor="bg-slate-200 shadow-slate-100"
                  hoverColor="hover:bg-red-400 hover:shadow-red-400/30 hover:text-white"
                  groupName={["group/delete", "group-hover/delete:block"]}
                  position="top-0.5 right-2"
                  tooltipText="Delete"
                  tooltipPos="-left-10 bottom-1.5"
                  onClick={() => {
                    handleDeleteNote(`${i}`);
                  }}
                  disabled={isDeletePending}
                >
                  <TrashCan size="20" />
                </ActionButton>
              </li>
            );
          return null;
        })}
      </ul>
    </section>
  );
}
