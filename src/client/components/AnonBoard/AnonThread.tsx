import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useState } from "react";
import type { CreateThread, ErrorQuery, ThreadQuery } from "../../types";

function getThreads(board: string) {
    return fetch(`/cYSvQmg9kR/advanced-misc/threads/${board}`).then(async (data) => {
        if (data.ok) return await data.json()
        return { error: "Request failed" }
    })
}

function createThread({ board, text, password }: CreateThread) {
    return fetch(`/cYSvQmg9kR/advanced-misc/threads/${board}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            board,
            text,
            delete_password: password
        })
    })
}

export default function AnonThread() {
    const [text, setText] = useState("")
    const [password, setPassword] = useState("")
    const [localError, setLocalError] = useState("")
    const { board } = useParams()
    const queryClient = useQueryClient()

    if (board == null) return <h1>Error: There is no board in url</h1>

    const threadQuery = useQuery<ThreadQuery[] | ErrorQuery, Error>({
        queryKey: ["thread", board],
        queryFn: () => getThreads(board),
    })

    const newThread = useMutation({
        mutationFn: createThread,
        onSuccess: () => {
            setText("")
            setPassword("")
            setLocalError("")
            queryClient.invalidateQueries({ queryKey: ["thread", board] })
        }
    })

    if (threadQuery.isLoading) return <h1>Loading...</h1>
    if (threadQuery.error !== null) return <h1>Error: {threadQuery.error.message}</h1>
    if (threadQuery.data != null && "error" in threadQuery.data) return <h2>Error: {threadQuery.data.error}</h2>

    const handleText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value)
    }
    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (text !== "" && password !== "")
            newThread.mutate({ board, text, password })
        else {
            setLocalError(`Please fill the required fields to create a new thread in ${board}`)
        }
    }


    return (<div>
        <h1>{board}</h1>
        <div>
            {newThread.isError && <p>{newThread.error.message}</p>}
            {localError !== "" && <p>{localError}</p>}
            <form onSubmit={handleSubmit}>
                <label htmlFor="">Thread text*: <input type="text"
                    onChange={handleText} value={text} /></label>
                <label htmlFor="">Delete password*: <input type="text"
                    onChange={handlePassword} value={password} /></label>
                <button disabled={newThread.isPending}>Send</button>
            </form>
        </div>
        <div>
            {threadQuery.data === undefined ? <p>There is no data in database</p> :
                threadQuery.data.map(thread => {
                    return (<div key={thread._id}>
                        <h2>{thread.text}</h2>
                        <p>Created on: {thread.created_on} Bumped on: {thread.bumped_on}</p>
                        {thread.replies.map(reply => {
                            return (<ul key={reply._id}>
                                <li>{reply.text}</li>
                                <li>Created on: {reply.created_on}</li>
                            </ul>)
                        })}
                    </div>)
                })}
        </div>

    </div>)
}