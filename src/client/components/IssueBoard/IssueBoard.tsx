import { type ChangeEvent, useEffect, useState, type FormEvent } from "react"
import { useIssues } from "../../hooks/useIssues"
import { isAxiosError } from "axios"
import { type StatusIssue } from "../../types"

export default function IssueBoard() {

    const { data, error, addIssue, searchOptions, token, getNewSearch } = useIssues()
    const [project, setProject] = useState("")
    const [title, setTitle] = useState("")
    const [text, setText] = useState("")
    const [localError, setLocalError] = useState<null | string>(null)
    const [action, setAction] = useState<null | string>(null)
    const [id, setId] = useState("")
    const [projectS, setProjectS] = useState("")
    const [titleS, setTitleS] = useState("")
    const [textS, setTextS] = useState("")
    const [status, setStatus] = useState<StatusIssue>("Any")
    const [createdBy, setCreatedBy] = useState("")
    const [createdOn, setCreatedOn] = useState("")
    const [updatedOn, setUpdatedOn] = useState("")

    useEffect(() => {
        if (addIssue.isSuccess) {
            getNewSearch(true)
            setProject("")
            setTitle("")
            setText("")
            setLocalError(null)
            setAction("Your suggestion/issue was sent successfully! Later on maybe I read it.")
            setTimeout(() => { setAction(null) }, 3000)
        }
        else if (addIssue.isError) {
            const { error } = addIssue
            if (isAxiosError(error)) {
                setLocalError(error.response?.data.error)
                setTimeout(() => { setLocalError(null) }, 3000)
            }
            else {
                setLocalError("Something went wrong at creating your issue/suggestion, please try again later.")
                setTimeout(() => { setLocalError(null) }, 3000)
            }
        }
    }, [addIssue.isSuccess])

    const handleProject = (e: ChangeEvent<HTMLInputElement>) => {
        setProject(e.target.value)
    }
    const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }
    const handleText = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value)
    }

    const handleNewIssue = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (project !== "" && title !== "" && text !== "")
            addIssue.mutate({ project, text, title, token })
        else
            setLocalError("Please don't leave required fields empty.")
    }

    const handleId = (e: ChangeEvent<HTMLInputElement>) => {
        setId(e.target.value)
    }
    const handleProjectS = (e: ChangeEvent<HTMLInputElement>) => {
        setProjectS(e.target.value)
    }
    const handleTitleS = (e: ChangeEvent<HTMLInputElement>) => {
        setTitleS(e.target.value)
    }
    const handleTextS = (e: ChangeEvent<HTMLInputElement>) => {
        setTextS(e.target.value)
    }
    const handleCreatedBy = (e: ChangeEvent<HTMLInputElement>) => {
        setCreatedBy(e.target.value)
    }
    const handleStatus = (e: ChangeEvent<HTMLSelectElement>) => {
        setStatus(e.target.value as StatusIssue)
    }
    const handleCreatedOn = (e: ChangeEvent<HTMLInputElement>) => {
        setCreatedOn(e.target.value)
    }
    const handleUpdatedOn = (e: ChangeEvent<HTMLInputElement>) => {
        setUpdatedOn(e.target.value)
    }
    const handleSearch = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        searchOptions({
            token,
            _id: id === "" ? undefined : id,
            project: projectS === "" ? undefined : projectS.toLowerCase(),
            title: titleS === "" ? undefined : titleS.toLowerCase(),
            text: textS === "" ? undefined : textS.toLowerCase(),
            created_by: createdBy === "" ? undefined : createdBy.toLowerCase(),
            status: status === "Any" ? undefined : status.toLowerCase(),
            created_on: createdOn === "" ? undefined : createdOn,
            updated_on: updatedOn === "" ? undefined : updatedOn,
        })
        getNewSearch(true)

    }

    return (
        <div>
            <div>
                {error !== null && isAxiosError(error) && <h2>{error.response?.data.error}</h2>}
                {localError !== null && <h2>{localError}</h2>}
                {action !== null && <h2>{action}</h2>}
            </div>
            <h2>Corner of issues and suggestions!</h2>
            <h3>Send me your sugerence or issue here!</h3>
            <form onSubmit={handleNewIssue}>
                <label htmlFor="">
                    Project*: <input type="text" value={project} onChange={handleProject} />
                </label>
                <label htmlFor="">
                    Title*: <input type="text" value={title} onChange={handleTitle} />
                </label>
                <label htmlFor="">
                    Description*: <input type="text" value={text} onChange={handleText} />
                </label>
                <button>Send it!</button>
            </form>

            <h4>Filter:</h4>
            <form onSubmit={handleSearch}>
                <label htmlFor="">
                    ID: <input type="text" value={id} onChange={handleId} />
                </label>
                <label htmlFor=""></label>
                <label htmlFor="">
                    Project: <input type="text" value={projectS} onChange={handleProjectS} />
                </label>
                <label htmlFor="">
                    Title: <input type="text" value={titleS} onChange={handleTitleS} />
                </label>
                <label htmlFor="">
                    Description: <input type="text" value={textS} onChange={handleTextS} />
                </label>
                <label htmlFor="">
                    Created By: <input type="text" value={createdBy} onChange={handleCreatedBy} />
                </label>
                <label htmlFor="">
                    Status : <select name="" id="" value={status} onChange={handleStatus}>
                        <option value="Any">Any</option>
                        <option value="Pending">Pending</option>
                        <option value="Read">Read</option>
                        <option value="Trying to fix">Trying to fix</option>
                        <option value="Completed">Completed</option>
                        <option value="Ignored">Ignored</option>
                    </select>
                </label>
                <label htmlFor="">
                    Created On: <input type="date" value={createdOn} onChange={handleCreatedOn} />
                </label>
                <label htmlFor="">
                    Updated On: <input type="date" value={updatedOn} onChange={handleUpdatedOn} />
                </label>
                <button>Search!</button>
            </form>

            {
                data !== undefined ?
                    !("error" in data) ?
                        <div>
                            <ul>
                                {data.length > 0 ? data.map(issue => {
                                    const id = issue._id.toString()
                                    const created = new Date(issue.created_on).toLocaleDateString()
                                    const updated = new Date(issue.updated_on).toLocaleDateString()
                                    return (
                                        <li key={id}>
                                            <div>
                                                <h2>{issue.project}</h2>
                                                <h3>{issue.title}</h3>
                                                <p>{issue.text}</p>
                                                <p>Status: {issue.status}</p>
                                                <sub>Created By: {issue.created_by} at {created}</sub>
                                                <sub><br />{issue.created_on !== issue.updated_on && `Updated on: ${updated}`}</sub>
                                                <sub><br />ID: {id}</sub>
                                            </div>
                                        </li>
                                    )
                                })
                                    : <h2>There is no issues or suggestion that coincide with your search!</h2>}
                            </ul>
                        </div>
                        : <div>
                            <h2>{data.error}</h2>
                        </div>
                    : <p>Loading</p>}
        </div>
    )
}