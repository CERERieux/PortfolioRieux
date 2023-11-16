import { useEffect } from "react"
import { useBooks } from "../../hooks/useBooks"
import { isAxiosError } from "axios"

export default function Library() {
    const { data, errorAuth, errorBook } = useBooks()

    useEffect(() => {
        console.log(data)
    }, [data])
    return (
        <div>
            <div>
                {errorAuth.cause !== null && <h1>Error: You are not logged in to use this service </h1>}
                {errorBook !== null && isAxiosError(errorBook) && <h1>Error: {errorBook.response?.data.error}</h1>}
            </div>
            <div>
                {data !== undefined ?
                    <ul>
                        {data.map(book => {
                            const id = book._id.toString()
                            return <li key={id}>
                                <div>
                                    <h2>{book.title}</h2>
                                    <p>{book.status}</p>
                                    <p>{book.review}</p>
                                    <p>{book.recommend}</p>
                                </div>
                            </li>
                        })}
                    </ul>
                    : <p>Loading...</p>}
            </div>
        </div>
    )
}