import { Link, useNavigate, useParams } from "react-router-dom";
import { type FormEvent, useEffect, useState } from "react";
import { useAnonThread } from "../../hooks/useAnonThread";
import NotFound from "../NotFound/NotFound";
import { isAxiosError } from "axios";


export default function AnonThread() {
    const navigate = useNavigate()
    const [text, setText] = useState("")
    const [password, setPassword] = useState("")
    const [passwordDelete, setPasswordDelete] = useState("")
    const [isDeleting, setIsDeleting] = useState({ isDeleting: false, idThread: "" })
    const [localError, setLocalError] = useState<null | string>(null)
    const [action, setAction] = useState<null | string>(null)
    const { board } = useParams()
    const boardId = board ?? ""
    if (boardId === "") return <NotFound />
    const { addThread, data, error, isLoading, removeThread, report } = useAnonThread(boardId)

    useEffect(() => {
        if (addThread.isSuccess) {
            const { data } = addThread
            const id = data._id.toString()
            setText("")
            setPassword("")
            setLocalError(null)
            setAction("Your thread was successfully created, redirecting you to its page...")
            setTimeout(() => { setAction(null) }, 3000)
            setTimeout(() => {
                navigate(`/anon-board/${boardId}/${id}/reply`)
            }, 3000)
        }
        else if (addThread.isError) {
            const { error } = addThread
            if (isAxiosError(error)) {
                setLocalError(error.response?.data.error)
            }
            else {
                setLocalError("Something went wrong at creating your thread...")
            }
            setTimeout(() => { setLocalError(null) }, 3000)
        }
    }, [addThread.isSuccess])

    useEffect(() => {
        if (report.isSuccess) {
            setLocalError(null)
            setAction(report.data.action)
            setTimeout(() => { setAction(null) }, 2000)
        }
        else if (report.isError) {
            const { error } = report
            if (isAxiosError(error)) {
                setLocalError(error.response?.data.error)
            }
            else {
                setLocalError("We can't report this thread right now, please try again later.")
            }
            setTimeout(() => { setLocalError(null) }, 3000)
        }
    }, [report.isSuccess])

    useEffect(() => {
        setIsDeleting({ isDeleting: false, idThread: "" })
        if (removeThread.isSuccess) {
            setPasswordDelete("")
            if (!("error" in removeThread.data)) {
                setLocalError(null)
                setAction(removeThread.data.action)
                setTimeout(() => { setAction(null) }, 2000)

            }
            else {
                setLocalError(removeThread.data.error)
                setTimeout(() => { setLocalError(null) }, 4000)
            }
        }
        else if (removeThread.isError) {
            const { error } = removeThread
            if (isAxiosError(error)) {
                setLocalError(error.response?.data.error)
            }
            else {
                setLocalError("We can't delete this thread right now, please try again later.")
            }
            setTimeout(() => { setLocalError(null) }, 3000)
        }
    }, [removeThread.isSuccess])

    const handleText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value)
    }
    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }
    const handlePasswordDelete = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordDelete(e.target.value)
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (text !== "" && password !== "")
            addThread.mutate({ board: boardId, text, password })
        else {
            setLocalError(`Please fill the required fields to create a new thread in ${boardId}`)
        }
    }
    const handleReport = (idThread: string) => {
        // Todo put a modal that confirm that user is sure to report this thread
        report.mutate({ board: boardId, idThread })
    }
    const handleDeleteThread = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (passwordDelete === "") {
            setLocalError("Please fill the password field")
        } else {
            removeThread.mutate({ board: boardId, idThread: isDeleting.idThread, password: passwordDelete })
        }
    }

    return (<div>
        <h1>{boardId}</h1> <Link to="/anon-board"><button>Return to boards</button></Link>
        {error !== null && isAxiosError(error) ? <h2>Error: {error.response?.data.error}</h2> :
            <div>
                {action !== null && <h2>{action}</h2>}
                {localError !== "" && <h2>{localError}</h2>}
                <div>
                    {addThread.isError && isAxiosError(addThread.error) && <h2>{addThread.error.response?.data.error}</h2>}
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="">Thread text*: <input type="text"
                            onChange={handleText} value={text} /></label>
                        <label htmlFor="">Delete password*: <input type="text"
                            onChange={handlePassword} value={password} /></label>
                        <button disabled={addThread.isPending || action !== null || isLoading}>Create Thread</button>
                    </form>
                </div>
                <div>
                    {data === undefined ? isLoading && <h2>Loading...</h2>
                        :
                        data.length === 0 ? <h2>Feel free to create a new thread! This board is empty...</h2> :
                            data.map(thread => {
                                const idThread = thread._id.toString()
                                return (
                                    <div key={idThread}>
                                        {!(isDeleting.isDeleting && isDeleting.idThread === idThread) ?
                                            <>
                                                <Link to={`/anon-board/${boardId}/${idThread}/reply`}>
                                                    <h2>{thread.text}</h2>
                                                </Link>
                                                <p>Created on: {thread.created_on} Bumped on: {thread.bumped_on}</p>
                                                {thread.replies.map(reply => {
                                                    const idReply = reply._id.toString()
                                                    return (<ul key={idReply}>
                                                        <li>{reply.text}</li>
                                                        <li>Created on: {reply.created_on}</li>
                                                    </ul>)
                                                })}
                                                <button onClick={() => { handleReport(idThread) }}>Report</button>
                                                <button onClick={() => { setIsDeleting({ isDeleting: true, idThread }) }}>Delete</button>
                                            </> :
                                            <>
                                                <form onSubmit={handleDeleteThread}>
                                                    <label htmlFor="">
                                                        Password: <input type="text" name="" id="" value={passwordDelete} onChange={handlePasswordDelete} />
                                                    </label>
                                                    <button>Delete</button>
                                                </form>
                                                <button onClick={() => { setIsDeleting({ isDeleting: false, idThread: "" }) }}>Cancel</button>
                                            </>
                                        }
                                    </div>
                                )
                            })}
                </div>
            </div>
        }
    </div >)
}