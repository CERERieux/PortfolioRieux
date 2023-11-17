import { type ChangeEvent, useEffect, useState, type FormEvent } from "react"
import { isAxiosError } from "axios"
import { useSingleBook } from "../../hooks/useSingleBook"
import { Link, useParams } from "react-router-dom"
import type { SingleBook, BookStatus } from "../../types"

function isEmptyNotes(data: SingleBook) {
    const isEmpty = data.notes.map(note => {
        if (note !== "") return true
        return false
    })
    console.log(isEmpty)
    if (isEmpty.find(note => note) !== undefined) {
        return false
    } else
        return true
}

export default function Book() {
    const { id } = useParams()
    const idBook = id ?? ""
    const { data, errorAuth, errorBook, updateBook, addNote, removeNote, token } = useSingleBook(idBook)
    const [title, setTitle] = useState("")
    const [review, setReview] = useState("")
    const [status, setStatus] = useState<BookStatus>("Plan to Read")
    const [recommend, setRecommend] = useState<boolean | undefined>(undefined)
    const [localError, setLocalError] = useState<string | null>(null)
    const [note, setNote] = useState("")
    const [emptyNotes, setEmptyNotes] = useState(true)

    useEffect(() => {
        if (data !== undefined) {
            setTitle(data.title)
            setReview(data.review)
            setStatus(data.status as BookStatus)
            setRecommend(data.recommend)
            setEmptyNotes(isEmptyNotes(data))
        }
    }, [data])

    useEffect(() => {
        if (updateBook.isSuccess) {
            setLocalError("")
        }
        else if (updateBook.isError) {
            const { error } = updateBook
            if (isAxiosError(error)) {
                setLocalError(error.response?.data.error)
            }
            else {
                setLocalError("Something went wrong at emptying your Library")
            }
        }
    }, [updateBook.isSuccess])

    useEffect(() => {
        if (addNote.isSuccess) {
            if (data !== undefined) {
                setEmptyNotes(isEmptyNotes(data))
            }
            setNote("")
            setLocalError("")
        }
        else if (addNote.isError) {
            const { error } = addNote
            if (isAxiosError(error)) {
                setLocalError(error.response?.data.error)
            }
            else {
                setLocalError("Something went wrong at emptying your Library")
            }
        }
    }, [addNote.isSuccess])

    useEffect(() => {
        if (removeNote.isSuccess) {
            if (data !== undefined) {
                setEmptyNotes(isEmptyNotes(data))
            }
            setLocalError("")
        }
        else if (removeNote.isError) {
            const { error } = removeNote
            if (isAxiosError(error)) {
                setLocalError(error.response?.data.error)
            }
            else {
                setLocalError("Something went wrong at emptying your Library")
            }
        }
    }, [removeNote.isSuccess])

    const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }
    const handleStatus = (e: ChangeEvent<HTMLSelectElement>) => {
        setStatus(e.target.value as BookStatus)
    }
    const handleRecommend = (e: ChangeEvent<HTMLSelectElement>) => {
        let recom: (boolean | undefined)
        if (e.target.value === "Yes") recom = true
        if (e.target.value === "No") recom = false
        setRecommend(recom)
    }
    const handleReview = (e: ChangeEvent<HTMLInputElement>) => {
        setReview(e.target.value)
    }

    const handleUpdate = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        let recommendString = "I can't say"
        if (recommend === true) recommendString = "Yes"
        if (recommend === false) recommendString = "No"
        if (title !== "") {
            updateBook.mutate({ id: idBook, token, title, review, status, recommend: recommendString })
        }
        else {
            setLocalError("Please don't leave the title field empty")
        }

    }


    const handleNote = (e: ChangeEvent<HTMLInputElement>) => {
        setNote(e.target.value)
    }
    const handleNoteSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (note !== "")
            addNote.mutate({ id: idBook, token, note })
        else {
            setLocalError("Please don't leave the note field empty")
        }
    }
    const handleDeleteNote = (number: string) => {
        removeNote.mutate({ id: idBook, token, number })
    }

    return (
        <div>
            <div>
                {errorAuth.cause !== null && <h1>Error: You are not logged in to use this service </h1>}
                {errorBook !== null && isAxiosError(errorBook) && <h1>Error: {errorBook.response?.data.error}</h1>}
                {localError !== null && <h2>{localError}</h2>}
            </div>
            <Link to="/services/library"><button>Return to Library</button></Link>
            <h2>Update your book!</h2>
            <form onSubmit={handleUpdate}>
                <label htmlFor="">
                    Title: <input type="text" value={title} onChange={handleTitle} />
                </label>
                <label htmlFor="">
                    Review: <input type="text" value={review} onChange={handleReview} />
                </label>
                <label htmlFor="">
                    Status: <select name="" id="" value={status} onChange={handleStatus}>
                        <option value="Plan to Read">Plan to Read</option>
                        <option value="Current Reading">Current Reading</option>
                        <option value="Completed">Completed</option>
                        <option value="Dropped/Unfinish">Dropped/Unfinish</option>
                    </select>
                </label>
                <label htmlFor="">
                    Do you recommend it? <select
                        value={recommend === undefined ? "I can't say" : recommend ? "Yes" : "No"}
                        onChange={handleRecommend}>
                        <option value="I can't say">I can&apos;t say</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                </label>
                <button>Update book!</button>
            </form>
            <h2>Add a note to your book</h2>

            <form onSubmit={handleNoteSubmit}>
                <label htmlFor="">
                    Note: <input type="text" value={note} onChange={handleNote} />
                </label>
                <button>Add Note!</button>
            </form>
            <div>
                {data !== undefined ?
                    <div>
                        <h2>Title: {data.title}</h2>
                        <p>Status: {data.status}</p>
                        <p>Review: {data.review !== "" ? data.review : "You haven't review this book."}</p>
                        <p>Do you recommend it? {data.recommend === undefined ? "I can't say" : data.recommend ? "Yes" : "No"}</p>
                        <p>Notes: {emptyNotes && "Here will appear the notes you add to your book!"}</p>
                        <ul>
                            {data.notes.map((note, i) => {
                                if (note !== "")
                                    return (
                                        <li key={i}>
                                            {note}
                                            <button onClick={() => { handleDeleteNote(`${i}`) }}>Remove note</button>
                                        </li>
                                    )
                                return null
                            })}
                        </ul>
                    </div>
                    : <p>Loading...</p>}
            </div>
        </div>
    )
}