import { type ChangeEvent, useEffect, useState, type FormEvent } from "react"
import { useBooks } from "../../hooks/useBooks"
import { isAxiosError } from "axios"
import { type BookStatus } from "../../types"
import { ERROR_BOOKS } from "../../../server/schemas/advanced"
import { useNavigate, Link } from "react-router-dom"

export default function Library() {
    const { data, errorAuth, errorBook, createNewBook, deleteLibrary, removeBook, token } = useBooks({})
    const [title, setTitle] = useState("")
    const [status, setStatus] = useState<BookStatus>("Plan to Read")
    const [errorLocal, setErrorLocal] = useState<string | null>(null)
    const [action, setAction] = useState<string | null>(null)
    const navigate = useNavigate()


    useEffect(() => {
        // If the creation of a book was a success, put the form inputs to its default state
        if (createNewBook.isSuccess) {
            const bookID = createNewBook.data._id.toString()
            setTitle("")
            setStatus("Plan to Read")
            setErrorLocal(null)
            setAction("New book added! Redirecting you to your new book added...")// Later change this to redirect to new book
            setTimeout(() => { setAction(null) }, 2000)
            setTimeout(() => { navigate(`/my-profile/library/${bookID}`) }, 2000)
        }
        else if (createNewBook.isError) {
            // If it wasn't a success, maybe was an error, if that is the case
            // Show an error about it
            const { error } = createNewBook
            if (isAxiosError(error)) {
                setErrorLocal(error.response?.data.error)
            }
            else {
                setErrorLocal("Something went wrong at creating your book")
            }
        }
    }, [createNewBook.isSuccess])

    useEffect(() => {
        // If library was emptied successfully, show the action
        if (deleteLibrary.isSuccess) {
            setAction("You emptied all your Library!")
            setTimeout(() => { setAction(null) }, 5000)
        }
        else if (deleteLibrary.isError) {
            /* If it wasn't a success, then maybe is an error,
            Show it in case it is, ex: User maybe wants to delete
            An empty library and that can't be done */
            const { error } = deleteLibrary
            if (isAxiosError(error)) {
                setErrorLocal(error.response?.data.error)
            }
            else {
                setErrorLocal("Something went wrong at emptying your Library")
            }
        }
    }, [deleteLibrary.isSuccess])

    useEffect(() => {
        // If book was removed successfully, show the action
        if (removeBook.isSuccess) {
            setAction("Book removed!")
            setTimeout(() => { setAction(null) }, 2000)
        }
        else if (removeBook.isError) {
            /* If it wasn't a success, then maybe is an error,
            Show it in case it was one */
            const { error } = deleteLibrary
            if (isAxiosError(error)) {
                setErrorLocal(error.response?.data.error)
            }
            else {
                setErrorLocal("Something went wrong at emptying your Library")
            }
        }
    }, [removeBook.isSuccess])

    const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }
    const handleStatus = (e: ChangeEvent<HTMLSelectElement>) => {
        setStatus(e.target.value as BookStatus)
    }
    const handleBookSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (title !== "") {
            createNewBook.mutate({ title, status, token })
        }
        else {
            setErrorLocal("Please introduce a title if you want to add a book")
        }

    }
    const handleDeleteLibrary = () => {
        if (data !== undefined && !("error" in data))
            deleteLibrary.mutate({ token })
        else {
            setErrorLocal(ERROR_BOOKS.DELETE_EMPTY_LIBRARY)
        }
    }
    const handleRemove = (id: string) => {
        removeBook.mutate({ id, token })
    }

    return (
        <div>
            <Link to="/my-profile"><button>Return to My Profile</button></Link>
            <div>
                {errorAuth.cause !== null && <h1>Error: You are not logged in to use this service </h1>}
                {errorBook !== null && isAxiosError(errorBook) && <h1>Error: {errorBook.response?.data.error}</h1>}
                {errorLocal !== null && <h2>Error: {errorLocal}</h2>}
                {action !== null && <h2>{action}</h2>}
            </div>
            <h2>Add books to your library!</h2>
            <form onSubmit={handleBookSubmit}>
                <label htmlFor="">
                    Title: <input type="text" name="title" value={title} onChange={handleTitle} />
                </label>
                <label htmlFor="">
                    Status: <select name="" id="" value={status} onChange={handleStatus}>
                        <option value="Plan to Read">Plan to Read</option>
                        <option value="Current Reading">Current Reading</option>
                        <option value="Completed">Completed</option>
                        <option value="Dropped/Unfinish">Dropped/Unfinish</option>
                    </select>
                </label>
                <button disabled={createNewBook.isPending}>Put it in the Library!</button>
            </form>
            <button onClick={handleDeleteLibrary} disabled={(data !== undefined && ("error" in data))
                || deleteLibrary.isPending}>Delete all your books!!!</button>
            {data !== undefined ?
                <div>
                    {!("error" in data) ?
                        <ul>
                            {data.map(book => {
                                const id = book._id.toString()
                                return <li key={id}>
                                    <div>
                                        <Link to={`/my-profile/library/${id}`}><h2>{book.title}</h2></Link>
                                        <p>{book.status}</p>
                                        <p>{book.review}</p>
                                        <p>{book.recommend}</p>
                                        <button onClick={() => { handleRemove(id) }}
                                            disabled={removeBook.isPending}>Remove from my Library</button>
                                    </div>
                                </li>
                            })}
                        </ul>
                        : <h2>{data.error}</h2>
                    }
                </div>
                : <p>Loading...</p>}

        </div>
    )
}