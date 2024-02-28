import { Link } from "react-router-dom";
import type {
  BookRecommend,
  BookService,
  BookStatus,
  EmptyData,
} from "../../types";
import ActionButton from "../SystemDesign/ActionButton";
import BookOff from "../Icons/BookOff";
import { useCallback, useEffect } from "react";
import debounce from "just-debounce-it";

// Auxiliar to give color to each element in the list, depending if its recommended and the status
const COLOR_LIST_BOOK = {
  Yes: {
    "Plan to Read":
      "[background:_linear-gradient(15deg,rgba(103,232,249,.8),rgba(103,232,249,0)_10%),_linear-gradient(192deg,rgba(216,180,254,.8),rgba(216,180,254,0)_30%)]",
    "Current Reading":
      "[background:_linear-gradient(15deg,rgba(103,232,249,.8),rgba(103,232,249,0)_10%),_linear-gradient(192deg,rgba(252,211,77,.8),rgba(252,211,77,0)_30%)]",
    Completed:
      "[background:_linear-gradient(15deg,rgba(103,232,249,.8),rgba(103,232,249,0)_10%),_linear-gradient(192deg,rgba(190,242,100,.8),rgba(190,242,100,0)_30%)]",
    "Dropped/Unfinish":
      "[background:_linear-gradient(15deg,rgba(103,232,249,.8),rgba(103,232,249,0)_10%),_linear-gradient(192deg,rgba(87,83,78,.8),rgba(87,83,78,0)_30%)]",
  },
  No: {
    "Plan to Read":
      "[background:_linear-gradient(15deg,rgba(252,165,165,.8),rgba(252,165,165,0)_10%),_linear-gradient(192deg,rgba(216,180,254,.8),rgba(216,180,254,0)_30%)]",
    "Current Reading":
      "[background:_linear-gradient(15deg,rgba(252,165,165,.8),rgba(252,165,165,0)_10%),_linear-gradient(192deg,rgba(252,211,77,.8),rgba(252,211,77,0)_30%)]",
    Completed:
      "[background:_linear-gradient(15deg,rgba(252,165,165,.8),rgba(252,165,165,0)_10%),_linear-gradient(192deg,rgba(190,242,100,.8),rgba(190,242,100,0)_30%)]",
    "Dropped/Unfinish":
      "[background:_linear-gradient(15deg,rgba(252,165,165,.8),rgba(252,165,165,0)_10%),_linear-gradient(192deg,rgba(87,83,78,.8),rgba(87,83,78,0)_30%)]",
  },
  "I can't say": {
    "Plan to Read":
      "[background:_linear-gradient(15deg,rgba(120,53,15,.8),rgba(120,53,15,0)_10%),_linear-gradient(192deg,rgba(216,180,254,.8),rgba(216,180,254,0)_30%)]",
    "Current Reading":
      "[background:_linear-gradient(15deg,rgba(120,53,15,.8),rgba(120,53,15,0)_10%),_linear-gradient(192deg,rgba(252,211,77,.8),rgba(252,211,77,0)_30%)]",
    Completed:
      "[background:_linear-gradient(15deg,rgba(120,53,15,.8),rgba(120,53,15,0)_10%),_linear-gradient(192deg,rgba(190,242,100,.8),rgba(190,242,100,0)_30%)]",
    "Dropped/Unfinish":
      "[background:_linear-gradient(15deg,rgba(120,53,15,.8),rgba(120,53,15,0)_10%),_linear-gradient(192deg,rgba(87,83,78,.8),rgba(87,83,78,0)_30%)]",
  },
  "Plan to Read": "border-purple-300 shadow-md shadow-purple-500/30",
  "Current Reading": "border-amber-300 shadow-md shadow-amber-500/30",
  Completed: "border-lime-300 shadow-md shadow-lime-500/30",
  "Dropped/Unfinish": "border-stone-300 shadow-md shadow-stone-500/30",
};

interface BookListProps {
  isPending: boolean;
  data: EmptyData | BookService[];
  dataFiltered: EmptyData | BookService[];
  handleRemove: (id: string) => void;
  title: string;
  status: BookStatus | "All";
  recommend: BookRecommend | "All";
  setFilteredData: React.Dispatch<
    React.SetStateAction<EmptyData | BookService[]>
  >;
}
type FilterUserData = Pick<
  BookListProps,
  "data" | "recommend" | "status" | "title"
>;

export default function BookList({
  data,
  isPending,
  handleRemove,
  recommend,
  status,
  title,
  dataFiltered,
  setFilteredData,
}: BookListProps) {
  /** Auxiliar function to debounce each 300ms the user inputs in the filter.
   * It needs the data, and the recommend, status and title info from the filter
   */
  const filterData = useCallback(
    debounce(({ data, recommend, status, title }: FilterUserData) => {
      // If the filter info is empty ana there is no books, just set the data
      if (
        (title === "" && status === "All" && recommend === "All") ||
        "error" in data
      )
        setFilteredData(data);
      else {
        // If there is books and the filter isn't empty
        let newListBook: EmptyData | BookService[] = data;
        // Check if the title isn't empty, get the books that match with the info
        if (title !== "") {
          newListBook = newListBook.filter(book =>
            book.title.toLowerCase().includes(title.toLowerCase()),
          );
        } else if (status !== "All" && newListBook.length > 0) {
          // Same for the status of the book
          newListBook = newListBook.filter(book => book.status === status);
        } else if (recommend !== "All" && newListBook.length > 0) {
          // And if its recommended
          const recomBool =
            recommend === "I can't say" ? undefined : recommend === "Yes";
          newListBook = newListBook.filter(
            book => book.recommend === recomBool,
          );
        }
        // If we got 0 matches, display the "error"
        if (newListBook.length === 0) {
          setFilteredData({
            category: "book",
            error: "There is no books that match your search",
          });
        } else {
          // Otherwise, display books filtered by user
          setFilteredData(newListBook);
        }
      }
    }, 300),
    [],
  );

  // Activate the filter each time the data or info from the filter changes
  useEffect(() => {
    filterData({ data, recommend, status, title });
  }, [data, recommend, status, title]);

  // A component that returns the list of books
  return (
    <article className="flex h-full w-full items-center justify-center overflow-y-auto rounded-md bg-white shadow-inner shadow-black/40 md:w-2/3">
      {!("error" in dataFiltered) ? (
        <ul className="flex h-full w-full flex-col gap-2 px-6 py-4">
          {dataFiltered.map(book => {
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
                  <h2 className="text-xl text-blue-500 underline">
                    <Link to={`/my-profile/library/${id}`}>{book.title}</Link>
                  </h2>
                  <p className="pl-4 text-sm italic first-letter:text-lg first-letter:text-red-400">
                    {status}
                  </p>
                  <p className="pl-4 italic first-letter:text-lg first-letter:text-red-400">
                    Review:{" "}
                  </p>
                  <p className="-mt-1 mb-2 text-pretty pl-6 text-sm">
                    {book.review === ""
                      ? "Review for this book is empty."
                      : `${book.review}`}
                  </p>
                  <p className="pl-4 text-sm italic first-letter:text-lg first-letter:text-red-400">
                    Recommended:{" "}
                    <span className="pl-2 not-italic">{recText}</span>
                  </p>
                  <ActionButton
                    coverColor="bg-slate-200 shadow-slate-100"
                    hoverColor="hover:bg-red-400 hover:shadow-red-400/30 hover:text-white"
                    groupName={["group/delete", "group-hover/delete:block"]}
                    position="top-4 right-4"
                    tooltipText="Remove book"
                    tooltipPos="-left-1 -bottom-9"
                    onClick={() => {
                      handleRemove(id);
                    }}
                    disabled={isPending}
                  >
                    <BookOff />
                  </ActionButton>
                </section>
              </li>
            );
          })}
        </ul>
      ) : (
        <h2 className="rounded-sm px-4 py-1 text-center font-elegant text-4xl first-letter:text-5xl first-letter:text-red-500">
          {dataFiltered.error}
        </h2>
      )}
    </article>
  );
}
