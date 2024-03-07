import { COLOR_LIST_BOOK } from "../Library/BookList";
import type { BookService, BookStatus } from "../../types";

interface ExternalBookListProps {
  data: BookService[];
}

export default function ExternalBookList({ data }: ExternalBookListProps) {
  // A component that returns the list of books
  return (
    <article className="flex w-full items-center justify-center">
      <ul className="flex h-full w-full flex-col gap-2 px-6 py-4">
        {data.map(book => {
          // For each book we need
          const id = book._id.toString(); // the ID for the list
          const status = book.status as BookStatus; // The status
          const recText =
            book.recommend == null
              ? "I can't say"
              : book.recommend
              ? "Yes"
              : "No"; // And the recommend for styles
          return (
            <li
              key={id}
              className={`relative rounded-sm border px-4 py-2 ${COLOR_LIST_BOOK[recText][status]} ${COLOR_LIST_BOOK[status]}`}
            >
              <section>
                <h2 className="text-xl text-blue-800 first-letter:text-2xl first-letter:text-red-400">
                  {book.title}
                </h2>
                <p className="pl-4 text-sm italic first-letter:text-lg first-letter:text-red-400">
                  {status}
                </p>
                <p className="pl-4 italic first-letter:text-lg first-letter:text-red-400">
                  Review:{" "}
                </p>
                <p className="-mt-1 mb-2 whitespace-pre-wrap text-pretty pl-6 text-sm">
                  {book.review === "" ? (
                    <span className="italic">
                      Review for this book is empty.
                    </span>
                  ) : (
                    `${book.review}`
                  )}
                </p>
                <p className="pl-4 text-sm italic first-letter:text-lg first-letter:text-red-400">
                  Recommended:{" "}
                  <span className="pl-2 not-italic">{recText}</span>
                </p>
              </section>
            </li>
          );
        })}
      </ul>
    </article>
  );
}
