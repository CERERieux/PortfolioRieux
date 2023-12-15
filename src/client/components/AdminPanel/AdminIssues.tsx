import { type FormEvent, useState, useEffect, type ChangeEvent } from "react"
import type { IIssueTracker, ReqBodyIssue } from "../../../server/types/advanced"
import type { StatusIssue } from "../../types"

interface PropsIssues {
    issues: IIssueTracker[]
    removeIssue: (id: string) => void
    updateIssue: ({ _id, project, status, text, title }: ReqBodyIssue) => void
    updateSuccess: boolean
    actionDone: string | null
}

export default function AdminIssues({ issues, removeIssue, updateIssue, updateSuccess, actionDone }: PropsIssues) {
    const [localError, setLocalError] = useState<null | string>(null)
    const [action, setAction] = useState<null | string>(null)
    const [status, setStatus] = useState<StatusIssue>("Read")
    const [project, setProject] = useState("")
    const [text, setText] = useState("")
    const [title, setTitle] = useState("")
    const [update, setUpdate] = useState({
        isUpdating: false,
        id: ""
    })

    useEffect(() => {
        if (updateSuccess) {
            setUpdate({ isUpdating: false, id: "" })
            setProject("")
            setTitle("")
            setText("")
            setStatus("Read")
            setLocalError(null)
            setAction("Issue was successfully updated")
            setTimeout(() => { setAction(null) }, 3000)
        }
    }, [updateSuccess])

    const handleProject = (e: ChangeEvent<HTMLInputElement>) => {
        setProject(e.target.value)
    }
    const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }
    const handleText = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value)
    }
    const handleStatus = (e: ChangeEvent<HTMLSelectElement>) => {
        setStatus(e.target.value as StatusIssue)
    }

    const handleRemove = (id: string) => {
        removeIssue(id)
    }
    const handleCancel = () => {
        setUpdate({ isUpdating: false, id: "" })
        setProject("")
        setTitle("")
        setText("")
        setStatus("Read")
    }
    const handleSubmitUpdate = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (title !== "" && project !== "" && text !== "") {
            updateIssue({ _id: update.id, project, status, text, title })
        }
        else {
            setLocalError("Please don't leave empty requiered fields to update the issue or suggestion")
            setTimeout(() => { setLocalError(null) }, 3000)
        }
    }

    return (
        <section>
            <h3>Issues and suggestions</h3>
            {localError !== null && <h3>{localError}</h3>}
            {action !== null && <h3>{action}</h3>}
            {actionDone !== null && <h3>{actionDone}</h3>}
            <ul>
                {issues !== undefined && issues.length > 0 ?
                    issues.map(issue => {
                        const idIssue = issue._id.toString()
                        const created = new Date(issue.created_on).toLocaleDateString()
                        return (
                            <li key={idIssue}>
                                {
                                    update.isUpdating && update.id === idIssue ?
                                        <>
                                            <form onSubmit={handleSubmitUpdate}>
                                                <label htmlFor="">
                                                    Project: <input type="text" value={project} onChange={handleProject} />
                                                </label>
                                                <label htmlFor="">
                                                    Title: <input type="text" value={title} onChange={handleTitle} />
                                                </label>
                                                <label htmlFor="">
                                                    Text: <input type="text" value={text} onChange={handleText} />
                                                </label>
                                                <label htmlFor="">
                                                    Status: <select name="" id="" value={status} onChange={handleStatus}>
                                                        <option value="Pending">Pending</option>
                                                        <option value="Read">Read</option>
                                                        <option value="Completed">Completed</option>
                                                        <option value="Trying to fix">Trying to fix</option>
                                                        <option value="Ignored">Ignored</option>
                                                    </select>
                                                </label>
                                                <button>Update</button>
                                            </form>
                                            <button onClick={handleCancel}>Cancel</button>
                                        </>
                                        : <>
                                            <h4>{issue.title}</h4>
                                            <p>{issue.text}</p>
                                            <p>By: {issue.created_by}</p>
                                            <p>Status: {issue.status}</p>
                                            <sub>Created On: {created}</sub>
                                            <button onClick={() => {
                                                setUpdate({ isUpdating: true, id: idIssue })
                                                setProject(issue.project)
                                                setTitle(issue.title)
                                                setText(issue.text)
                                                setStatus(issue.status as StatusIssue)
                                            }}>Update</button>
                                            <button onClick={() => { handleRemove(idIssue) }}>Delete</button>
                                        </>
                                }
                            </li>
                        )
                    }) :
                    <li>
                        User has not submit any issue or suggestion
                    </li>
                }
            </ul>
        </section>
    )
}