import { useParams } from "react-router-dom";
import { useProfile } from "../../hooks/useProfile";
import { useBooks } from "../../hooks/useBooks";
import { isAxiosError } from "axios";

export default function ExternalProfile() {
    const { id } = useParams()
    const externalUser = id ?? ""
    const { data, error } = useProfile({ externalUser })
    const { getExternalUserBooks } = useBooks({ externalUser })
    const books = getExternalUserBooks.data
    const errorBooks = getExternalUserBooks.error

    return (
        <div>
            {error !== null && isAxiosError(error) && <h2>{error.response?.data.error}</h2>}
            {errorBooks !== null && isAxiosError(errorBooks) && <h2>{errorBooks.response?.data.error}</h2>}
            {data !== undefined ?
                <div>
                    <h4>Replace later with current img profile here</h4>
                    <h2>{data.username}&apos;s Profile</h2>
                    <p>About me: <br />{data.bio !== "" ? data.bio : "It looks this user hasn't write anything, we can't share anything about them."}</p>
                    <div>
                        {books !== undefined ?
                            !("error" in books) ?
                                books.map(book => {
                                    const id = book._id.toString()
                                    return (
                                        <section key={id}>
                                            <h3>{book.title}</h3>
                                            <p>{book.status}</p>
                                            <p>{book.review}</p>
                                            <p>{book.recommend}</p>
                                        </section>
                                    )
                                })
                                : <h2> Looks like this user hasn&apos;t put any book in their library.</h2>
                            : errorBooks === null && <p>Loading user library...</p>}
                    </div>
                </div>
                : error === null && <p>Loading user...</p>}
        </div>
    )
}