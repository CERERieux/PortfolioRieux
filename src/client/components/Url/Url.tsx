import { isAxiosError } from "axios";
import { useUrlProfile } from "../../hooks/useUrlProfile";
import UnauthorizedAccess from "../NotFound/AuthError";
import { type ChangeEvent, type FormEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Url() {
    const { addUrl, data, error, errorAuth, removeUrl, token } = useUrlProfile()
    const [action, setAction] = useState<string | null>(null)
    const [localError, setLocalError] = useState<string | null>(null)
    const [isCreating, setIsCreating] = useState(false)
    const [url, setUrl] = useState("")
    const isError = errorAuth.cause !== null

    useEffect(() => {
        if (addUrl.isSuccess) {
            setUrl("")
            setIsCreating(false)
            setLocalError(null)
            setAction("Your new short URL was created successfully!")
            setTimeout(() => { setAction(null) }, 2000)
        }
        else if (addUrl.isError) {
            const { error } = addUrl
            if (isAxiosError(error)) {
                setLocalError(error.response?.data.error)
            }
            else {
                setLocalError("Something went wrong at creating your new short URL...")
            }
            setTimeout(() => { setLocalError(null) }, 3000)

        }
    }, [addUrl.isSuccess])

    useEffect(() => {
        if (removeUrl.isSuccess) {
            setLocalError(null)
            setAction("Your URL was removed from your list!")
            setTimeout(() => { setAction(null) }, 2000)
        }
        else if (removeUrl.isError) {
            const { error } = removeUrl
            if (isAxiosError(error)) {
                setLocalError(error.response?.data.error)
            }
            else {
                setLocalError("Something went wrong at removing your URL from the list...")
            }
            setTimeout(() => { setLocalError(null) }, 3000)
        }
    }, [removeUrl.isSuccess])

    const handleDelete = (id: string) => {
        removeUrl.mutate({ id, token })
    }
    const handleViewCreation = () => {
        setIsCreating(!isCreating)
    }
    const handleUrlText = (e: ChangeEvent<HTMLInputElement>) => {
        setUrl(e.target.value)
    }
    const handleNewUrl = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (url !== "")
            addUrl.mutate({ token, url })
        else {
            setLocalError("Please fill the URL field")
        }
    }

    return (
        <div>
            <Link to="/my-profile"><button>Return to My Profile</button></Link>
            {isError && <UnauthorizedAccess errorAuth={errorAuth} />}
            {error !== null && isAxiosError(error) && <h2>{error.response?.data.error}</h2>}
            {action !== null && <h2>{action}</h2>}
            {localError !== null && <h2>{localError}</h2>}
            <div>
                {!isCreating ?
                    <button onClick={handleViewCreation}>Create a new URL</button> :
                    <div>
                        <form onSubmit={handleNewUrl}>
                            <label htmlFor="">
                                Your url: <input type="text" onChange={handleUrlText} value={url} />
                            </label>
                            <button>Create!</button>
                        </form>
                        <button onClick={handleViewCreation}>Cancel</button>
                    </div>}
                {data !== undefined ?
                    !("error" in data) ?
                        <table>
                            <thead>
                                <tr>
                                    <th>Original URL</th>
                                    <th>Short URL</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map(url => {
                                    const id = url._id.toString()
                                    return (
                                        <tr key={id}>
                                            <td><a href={`${url.originalUrl}`} target="_blank" rel="noopener noreferrer">{url.originalUrl}</a></td>
                                            <td><a href={`/url/${url.shortUrl}`} target="_blank" rel="noopener noreferrer">{url.shortUrl}</a></td>
                                            <td><button onClick={() => { handleDelete(id); }}>Delete</button></td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                        : <h2>{data.error}</h2>
                    : !isError && <p>Loading...</p>
                }
            </div>

        </div>
    )
}