import type { IBook } from "../../../server/types/advanced"
import type { DeleteOperationHook } from "../../types";

interface PropsLibrary {
    books: IBook[]
    user: string
    removeBook: ({ id, userId }: DeleteOperationHook) => void
    removeLibrary: (userId: string) => void
}

export default function AdminLibrary({ books, user, removeBook, removeLibrary }: PropsLibrary) {

    const handleRemoveBook = (id: string) => {
        removeBook({ id, userId: user })
    };
    const handleEmptyLibrary = () => {
        removeLibrary(user)
    };

    return (
        <section>
            <h3>Library</h3>
            <button onClick={handleEmptyLibrary}>Empty User Library</button>
            <ul>
                {books.length > 0 ? books.map(book => {
                    const idBook = book._id.toString()
                    return (
                        <li key={idBook}>
                            <div>
                                <h4>{book.title}</h4>
                                <p>{book.review}</p>
                            </div>
                            <button onClick={() => { handleRemoveBook(idBook) }}>Remove Book</button>
                        </li>
                    )
                })
                    : <li>
                        User has not add any book to the Library
                    </li>}
            </ul>
        </section>
    )
}