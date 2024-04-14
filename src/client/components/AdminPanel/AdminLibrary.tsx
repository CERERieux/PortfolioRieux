import type { IBook } from "../../../server/types/advanced";
import type { BookStatus, DeleteOperationHook } from "../../types";
import BookOff from "../Icons/BookOff";
import { COLOR_LIST_BOOK } from "../Library/BookList";
import ActionButton from "../SystemDesign/ActionButton";
import ActionMessage from "../SystemDesign/ActionMessage";
import Button from "../SystemDesign/Button";

interface PropsLibrary {
  books: IBook[];
  user: string;
  removeBook: ({ id, userId }: DeleteOperationHook) => void;
  removeLibrary: (userId: string) => void;
  actionDone: string | null;
}

export default function AdminLibrary({
  books,
  user,
  removeBook,
  removeLibrary,
  actionDone,
}: PropsLibrary) {
  const handleRemoveBook = (id: string) => {
    removeBook({ id, userId: user });
  };
  const handleEmptyLibrary = () => {
    removeLibrary(user);
  };

  return (
    <section className="flex w-4/5 flex-col gap-6 p-4">
      <header className="flex flex-col items-center justify-center gap-4">
        <h3 className="mx-auto w-fit text-pretty rounded-lg bg-white px-4 text-center text-xl shadow-inner shadow-black/30 first-letter:text-2xl first-letter:text-lime-500">
          Library
        </h3>
        {actionDone !== null && <ActionMessage>{actionDone}</ActionMessage>}
        <Button
          color="bg-red-300 border-red-500 hover:bg-red-600 hover:border-red-300 flex justify-center items-center gap-2"
          xSize="w-48 h-10"
          onClick={handleEmptyLibrary}
        >
          <BookOff />
          <span className="pt-2 font-elegant text-2xl">Empty Library</span>
        </Button>
      </header>
      <ul className="flex h-full w-full flex-col gap-2 px-6 py-4 text-slate-50">
        {books !== undefined && books.length > 0 ? (
          books.map(book => {
            const idBook = book._id.toString();
            // For each book we need
            const status = book.status as BookStatus; // The status
            const recText =
              book.recommend == null
                ? "I can't say"
                : book.recommend
                ? "Yes"
                : "No"; // And the recommend for styles
            return (
              <li
                key={idBook}
                className={`relative rounded-sm border px-4 py-2 ${COLOR_LIST_BOOK[recText][status]} ${COLOR_LIST_BOOK[status]} dark:bg-transparent/40`}
              >
                <section>
                  <h2 className="text-xl text-blue-500 underline dark:text-blue-200">
                    {book.title}
                  </h2>
                  <p className="pl-4 text-sm italic first-letter:text-lg first-letter:text-red-400 dark:first-letter:text-yellow-400">
                    {status}
                  </p>
                  <p className="pl-4 italic first-letter:text-lg first-letter:text-red-400 dark:first-letter:text-yellow-400">
                    Review:{" "}
                  </p>
                  <p className="-mt-1 mb-2 whitespace-pre-wrap text-pretty pl-6 text-sm">
                    {book.review === ""
                      ? "Review for this book is empty."
                      : `${book.review}`}
                  </p>
                  <p className="pl-4 text-sm italic first-letter:text-lg first-letter:text-red-400 dark:first-letter:text-yellow-400">
                    Recommended:{" "}
                    <span className="pl-2 not-italic">{recText}</span>
                  </p>
                  <ActionButton
                    coverColor="bg-slate-200 shadow-slate-100 text-slate-700"
                    hoverColor="hover:bg-red-400 hover:shadow-red-400/30 hover:text-white"
                    groupName={["group/delete", "group-hover/delete:block"]}
                    position="top-4 right-4"
                    tooltipText="Remove book"
                    tooltipPos="-left-1 -bottom-9"
                    onClick={() => {
                      handleRemoveBook(idBook);
                    }}
                  >
                    <BookOff />
                  </ActionButton>
                </section>
              </li>
            );
          })
        ) : (
          <li className="text-center">
            User has not add any book to the Library
          </li>
        )}
      </ul>
    </section>
  );
}
