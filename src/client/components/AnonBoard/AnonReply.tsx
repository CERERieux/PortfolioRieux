import { Link, useParams } from "react-router-dom"
import { useAnonReply } from "../../hooks/useAnonReply"
import { isAxiosError } from "axios"
import { type ChangeEvent, type FormEvent, useState, useEffect } from "react"

export default function AnonReply() {
    const [replyText, setReplyText] = useState("")
    const [passwordReply, setPasswordReply] = useState("")
    const [passwordDeleteReply, setPasswordDeleteReply] = useState("")
    const [localError, setLocalError] = useState<null | string>(null)
    const [action, setAction] = useState<null | string>(null)
    const [isDeleting, setIsDeleting] = useState({ idReply: "", isDeleting: false })
    const { board, thread } = useParams()
    const idBoard = board ?? ""
    const idThread = thread ?? ""
    const { addReply, data, error, isLoading, redactReply, reportReply } = useAnonReply({ board: idBoard, idThread })

    useEffect(() => {
        if (addReply.isSuccess) {
            setLocalError(null)
            setReplyText("")
            setPasswordReply("")
            setAction("Your reply was sent successfully!")
            setTimeout(() => { setAction(null) }, 2000)
        }
        else if (addReply.isError) {
            const { error } = addReply
            if (isAxiosError(error))
                setLocalError(error.response?.data.error)
            else
                setLocalError("Something went wrong at adding your reply to this thread, please try again later")
            setTimeout(() => { setLocalError(null) }, 4000)
        }
    }, [addReply.isSuccess])

    useEffect(() => {
        if (redactReply.isSuccess) {
            const { data } = redactReply
            console.log(data)
            setPasswordDeleteReply("")
            setIsDeleting({ isDeleting: false, idReply: "" })
            if ("error" in data) {
                setLocalError(data.error)
                setTimeout(() => { setLocalError(null) }, 4000)
            } else {
                setLocalError(null)
                setAction(data.action)
                setTimeout(() => { setAction(null) }, 3000)
            }
        }
        else if (redactReply.isError) {
            const { error } = redactReply
            if (isAxiosError(error)) setLocalError(error.response?.data.error)
            else setLocalError("Something went wrong at reporting this reply, please try again later")
            setTimeout(() => { setLocalError(null) }, 3000)
        }
    }, [redactReply.isSuccess])

    useEffect(() => {
        if (reportReply.isSuccess) {
            setLocalError(null)
            setAction(reportReply.data.action)
            setTimeout(() => { setAction(null) }, 3000)
        }
        else if (reportReply.isError) {
            const { error } = reportReply
            if (isAxiosError(error)) setLocalError(error.response?.data.error)
            else setLocalError("Something went wrong at reporting this reply, please try again later")
            setTimeout(() => { setLocalError(null) }, 3000)
        }
    }, [reportReply.isSuccess])

    const handleReplyText = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setReplyText(e.target.value)
    }
    const handlePasswordReply = (e: ChangeEvent<HTMLInputElement>) => {
        setPasswordReply(e.target.value)
    }
    const handlePasswordDeleteReply = (e: ChangeEvent<HTMLInputElement>) => {
        setPasswordDeleteReply(e.target.value)
    }
    const handleAddReply = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (replyText === "" || passwordReply === "")
            setLocalError("Please fill the required fields before send it")
        else {
            addReply.mutate({ board: idBoard, idThread, text: replyText, password: passwordReply })
        }
    }
    const handleRedactReply = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (passwordDeleteReply === "") {
            setLocalError("Please fill the password field before deleting")
        }
        else {
            redactReply.mutate({ board: idBoard, idReply: isDeleting.idReply, password: passwordDeleteReply })
        }
    }
    const handleReport = (idReply: string) => {
        reportReply.mutate({ board: idBoard, idReply })
    }


    return (
        <div>
            <Link to={`/anon-board/${idBoard}/thread`}><button>Return to Thread of {idBoard}</button></Link>
            {localError !== null && <h2>{localError}</h2>}
            {action !== null && <h2>{action}</h2>}
            {
                error !== null ? isAxiosError(error) ?
                    <h2>{error.response?.data.error}</h2>
                    : <h2>{"Something went wrong at getting the replies of this thread, please try again later."}</h2>
                    : data !== undefined ?
                        <div>
                            <h2>{data.text}</h2>
                            <p>Created on: {data.created_on} </p>
                            <p>Bumped on: {data.bumped_on}</p>
                            <form onSubmit={handleAddReply}>
                                <label htmlFor="">
                                    Add Reply: <textarea name="" id="" cols={50} rows={1} onChange={handleReplyText} value={replyText}></textarea>
                                </label>
                                <label htmlFor="">
                                    Password: <input type="text" value={passwordReply} onChange={handlePasswordReply} />
                                </label>
                                <button>Send</button>
                            </form>
                            <button onClick={() => {
                                setReplyText("")
                                setPasswordReply("")
                            }} disabled={replyText === "" && passwordReply === ""}>Empty reply fields</button>
                            <ul>
                                {data.replies.map(reply => {
                                    const idReply = reply._id.toString()
                                    const redacted = reply.text === "[Deleted]"
                                    return (
                                        <li key={idReply}>
                                            {!(isDeleting.isDeleting && isDeleting.idReply === idReply) ?
                                                <div>
                                                    <p>{reply.text}</p>
                                                    <sub>Created at: {reply.created_on}</sub>
                                                    <button onClick={() => { handleReport(idReply) }} disabled={redacted} >Report</button>
                                                    <button onClick={() => {
                                                        setIsDeleting({ isDeleting: true, idReply })
                                                    }} disabled={redacted}>Delete</button>
                                                </div>
                                                :
                                                <>
                                                    <form onSubmit={handleRedactReply}>
                                                        <label htmlFor="">
                                                            Password: <input type="text" value={passwordDeleteReply} onChange={handlePasswordDeleteReply} />
                                                        </label>
                                                        <button>Delete</button>
                                                    </form>
                                                    <button onClick={() => {
                                                        setIsDeleting({ isDeleting: false, idReply: "" })
                                                        setPasswordDeleteReply("")
                                                        setLocalError(null)
                                                    }}>Cancel</button>
                                                </>
                                            }

                                        </li>
                                    )
                                })}
                            </ul>

                        </div>
                        : isLoading ? <h2>Loading...</h2> : <h2>{"Looks like this thread doesn't exist, please visit another one."}</h2>
            }
        </div >
    )
}