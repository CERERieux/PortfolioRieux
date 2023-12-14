import { type FormEvent, useState } from "react"
import type { IIssueTracker, ReqBodyIssue } from "../../../server/types/advanced"
import type { StatusIssue } from "../../types"

interface PropsIssues {
    issues: IIssueTracker[]
    removeIssue: (id: string) => void
    updateIssue: ({ _id, project, status, text, title }: ReqBodyIssue) => void
}

export default function AdminIssues({ issues, removeIssue, updateIssue }: PropsIssues) {
    const [localError, setLocalError] = useState<null | string>(null)
    const [status, setStatus] = useState<StatusIssue>("Read")
    const [project, setProject] = useState("")
    const [text, setText] = useState("")
    const [title, setTitle] = useState("")
    const [isUpdating, setIsUpdating] = useState({
        isUpdating: false,
        id: ""
    })

    const handleRemove = (id: string) => {
        removeIssue(id)
    }
    const handleCancel = () => {
        setIsUpdating({ isUpdating: false, id: "" })
        setProject("")
        setTitle("")
        setText("")
        setStatus("Read")
    }
    const handleSubmitUpdate = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (title !== "" && project !== "" && text !== "") {
            updateIssue({ _id: isUpdating.id, project, status, text, title })
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
            <ul>
                {issues.length > 0 ?
                    issues.map(issue => {
                        const idIssue = issue._id.toString()
                        const created = new Date(issue.created_on).toLocaleDateString()
                        return (
                            <li key={idIssue}>
                                {
                                    isUpdating.isUpdating && isUpdating.id === idIssue ?
                                        <>
                                            <form onSubmit={handleSubmitUpdate}></form>
                                            <button onClick={handleCancel}>Cancel</button>
                                        </>
                                        : <>
                                            <h4>{issue.title}</h4>
                                            <p>{issue.text}</p>
                                            <p>By: {issue.created_by}</p>
                                            <p>Status: {issue.status}</p>
                                            <sub>Created On: {created}</sub>
                                            <button onClick={() => {
                                                setIsUpdating({ isUpdating: true, id: idIssue })
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