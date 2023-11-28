import { isAxiosError } from "axios"
import { type FormEvent, useState, type ChangeEvent, useEffect } from "react"
import { useProfileIssues } from "../../hooks/useProfileIssues"
import UnauthorizedAccess from "../NotFound/AuthError"
import { Link } from "react-router-dom"


export default function IssueProfile() {
    const { data, error, errorAuth, token, updateIssue } = useProfileIssues()
    const [localError, setLocalError] = useState<null | string>(null)
    const [action, setAction] = useState<null | string>(null)
    const [isUpdate, setIsUpdate] = useState({ isUpdate: false, id: "" })
    const [project, setProject] = useState("")
    const [title, setTitle] = useState("")
    const [text, setText] = useState("")
    const isError = errorAuth.cause !== null

    useEffect(() => {
        if (updateIssue.isSuccess) {
            setProject("")
            setTitle("")
            setText("")
            setLocalError("")
            setIsUpdate({ isUpdate: false, id: "" })
            setAction("Your Issue/Suggestion was successfully updated!")
            setTimeout(() => { setAction(null) }, 2000)
        } else if (updateIssue.isError) {
            const { error } = updateIssue
            if (isAxiosError(error)) {
                setLocalError(error.response?.data.error)
            }
            else {
                setLocalError("Something went wrong at updating your issue/suggestion")
            }
            setTimeout(() => { setLocalError(null) }, 3000)
        }
    }, [updateIssue.isSuccess])

    const handleProject = (e: ChangeEvent<HTMLInputElement>) => {
        setProject(e.target.value)
    }
    const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }
    const handleText = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value)
    }
    const handleUpdateIssue = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (project !== "" && title !== "" && text !== "")
            updateIssue.mutate({ token, _id: isUpdate.id, title, project, text })
        else {
            setLocalError("Please don't leave any field empty")
        }
    }

    return (
        <div>
            <Link to="/my-profile"><button>Return to My Profile</button></Link>
            <div>
                {isError && <UnauthorizedAccess errorAuth={errorAuth} />}
                {error !== null && isAxiosError(error) && <h2>{error.response?.data.error}</h2>}
                {localError !== null && <h2>{localError}</h2>}
                {action !== null && <h2>{action}</h2>}
            </div>
            {data !== undefined ?
                !("error" in data) ?
                    data.length > 0 ?
                        <ul>
                            {data.map(issue => {
                                const id = issue._id.toString()
                                const created = new Date(issue.created_on).toLocaleDateString()
                                const updated = new Date(issue.updated_on).toLocaleDateString()
                                return (
                                    <li key={id}>
                                        {!(isUpdate.id === id && isUpdate.isUpdate) ?
                                            <div>
                                                <h2>{issue.project}</h2>
                                                <h3>{issue.title}</h3>
                                                <p>{issue.text}</p>
                                                <p>Status: {issue.status}</p>
                                                <sub>Created By: {issue.created_by} at {created}</sub>
                                                <sub><br />{issue.created_on !== issue.updated_on && `Updated on: ${updated}`}</sub>
                                                <sub><br />ID: {id}</sub>
                                                <button onClick={() => {
                                                    setIsUpdate({ isUpdate: true, id })
                                                    setProject(issue.project)
                                                    setTitle(issue.title)
                                                    setText(issue.text)
                                                }
                                                }>Modify Issue</button>
                                            </div>
                                            :
                                            <div>
                                                <h3>Enter your update in the fields</h3>
                                                <form onSubmit={handleUpdateIssue}>
                                                    <label htmlFor="">
                                                        Project*: <input type="text" name="" id="" value={project} onChange={handleProject} />
                                                    </label>
                                                    <label htmlFor="">
                                                        Title*: <input type="text" name="" id="" value={title} onChange={handleTitle} />
                                                    </label>
                                                    <label htmlFor="">
                                                        Description*: <input type="text" name="" id="" value={text} onChange={handleText} />
                                                    </label>
                                                    <button>Update my Issue!</button>
                                                </form>
                                                <button onClick={() => { setIsUpdate({ isUpdate: false, id: "" }) }}>Cancel</button>
                                            </div>
                                        }
                                    </li>
                                )
                            })}
                        </ul>
                        : <h2>There is no issues or suggestion that coincide with your search!</h2>
                    : <h2>{data.error}</h2>
                : !isError && <p>Loading</p>}
        </div >
    )
}