import { useEffect } from "react"
import { isAxiosError } from "axios"
import { useSingleBook } from "../../hooks/useSingleBook"

export default function Book() {
    const { data, errorAuth, errorBook } = useSingleBook("654ab7a893cee4af8a535d54")

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
                        {
                            <li key={data._id.toString()}>
                                <div>
                                    <h2>{data.title}</h2>
                                    <p>{data.status}</p>
                                    <p>{data.review}</p>
                                    <p>{data.recommend}</p>
                                    <p>{data.notes}</p>
                                </div>
                            </li>
                        }
                    </ul>
                    : <p>Loading...</p>}
            </div>
        </div>
    )
}